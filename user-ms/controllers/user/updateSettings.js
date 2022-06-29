const pool = require('../../model/database')

async function updateSettings(req, res, next){
    let {address, storeIt} = req.body;
    if(typeof storeIt !== 'boolean') next({method:'error',status:400,msg:'storeIt should be a boolean'})

    //query payload
    let query = {
        method: 'UPDATE',
        table: 'users',
        column: 'store_messages',
        columnValue: storeIt,
        conditionAddress: `address = '${address}'`
    }

    //updating user data
    try{
        const update = await pool.query(`${query.method} ${query.table} SET ${query.column} = ${query.columnValue} WHERE ${query.conditionAddress}`)
        
        if(update.rowCount == 1){ //if there's a row has been changed
            res.json({address:address, store_messages:storeIt})
        }
    }catch(err){
        console.error(err)
        req.error = {status:500, msg:'there was an error updating your data'}
        next()
    }
}

module.exports = updateSettings;