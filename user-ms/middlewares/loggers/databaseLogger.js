async function databaseLogger(data, req, res, next){
    if(data.method == 'error') next(data)


    if(data.method == 'SELECT' && data.condition == 'WHERE'){
        console.log(`[INFO] ${data.method} ${data.coulmns} from ${data.table} table where ${data.conditionKey} equal ${data.conditionValue}`)
    }
    else if(data.method == 'SELECT'){
        console.log(`[INFO] ${data.method} ${data.coulmns} from table ${data.table} where address is ${data.address}`)
    }
    else if(data.method == 'INSERT'){
        console.log(`[INFO] ${data.method} into ${data.table} table where coulmns (${data.coulmns}) is (${data.values})`)
    }
    else if(data.method == 'UPDATE'){
        console.log(`[INFO] ${data.method} ${data.table} table, coulmns ${data.coulmn} changed to ${data.coulmnValue} WHERE ${data.conditionUsername} AND ${data.conditionPassword}`)
    }
    
}

module.exports = databaseLogger;