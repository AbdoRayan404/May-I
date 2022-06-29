const pool = require('../../model/database')

async function login(req, res, next){
    let {address} = req.body;

    let query = {
        method: 'SELECT',
        columns: `address, username, public_key`,
        table: 'users',
        condition: 'WHERE',
        conditionKey: 'address',
        conditionValue: `'${address}'`
    }

    try{
        const userData = await pool.query(`${query.method} ${query.columns} FROM ${query.table} WHERE ${query.conditionKey} = ${query.conditionValue}`)

        res.status(200).json({'address': userData.rows[0]['address'], 'username': userData.rows[0]['username'], 'public_key': userData.rows[0]['public_key']})
    }catch(err){
        console.error(err)
        req.error = {status:500, msg:'there was an error retreving your data'}
        next()
    }
}

module.exports = login;