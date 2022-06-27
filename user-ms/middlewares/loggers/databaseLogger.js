async function databaseLogger(data, req, res, next){
    if(data.method == 'error') next(data)


    if(data.method == 'SELECT' && data.condition == 'WHERE'){
        console.log(`[INFO] ${data.method} ${data.columns} from ${data.table} table where ${data.conditionKey} equal ${data.conditionValue}`)
    }
    else if(data.method == 'SELECT'){
        console.log(`[INFO] ${data.method} ${data.columns} from table ${data.table} where address is ${data.address}`)
    }
    else if(data.method == 'INSERT'){
        console.log(`[INFO] ${data.method} into ${data.table} table where column (${data.columns}) is (${data.values})`)
    }
    else if(data.method == 'UPDATE'){
        console.log(`[INFO] ${data.method} ${data.table} table, column ${data.column} changed to ${data.columnValue} WHERE ${data.conditionUsername || data.conditionAddress} AND ${data.conditionPassword}`)
    }
    
}

module.exports = databaseLogger;