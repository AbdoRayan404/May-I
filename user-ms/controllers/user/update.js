const pool = require('../../model/database')

async function updatePubKey(req, res, next){
    let {address, public_key} = req.body;

    //query payload
    let query = { 
        method: "UPDATE",
        table: "users",
        column: 'public_key',
        columnValue: public_key,
        conditionAddress: `address = '${address}'`,
    }

    //updating user public key
    try{ 
        const updatedData = await pool.query(`${query.method} ${query.table} SET ${query.column} = '${query.columnValue}' WHERE ${query.conditionAddress}`)
        
        if(updatedData.rowCount == 1){
            res.json({'address': address, 'public_key': public_key})
        }else{
            req.error = {status:500, msg:'your data didnt update successfuly'}
            next()
        }
    }catch(err){
        console.error(err)
        req.error = {status:500, msg:'there was error updating your data'}
        next()
    }
}

module.exports = updatePubKey;