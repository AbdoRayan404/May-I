async function reqLogger(req, res, next){
    console.log(`[INFO] ${req.method} request to ${req.path} from ${req.ip}`)
    next();
}
async function errorHandle(error, req, res, next){
    res.status(error.status).json({'error':error.msg})
}
async function databaseLogger(data, req, res, next){
    if(data.method == 'error') next(data)


    if(data.method == 'SELECT' && data.condition == 'WHERE'){
        console.log(`[INFO] ${data.method} ${data.coulmns} from ${data.table} table where ${data.conditionKey} equal ${data.conditionValue}`)
    }
    else if(data.method == 'SELECT'){
        console.log(`[INFO] ${data.method} ${data.coulmns} from table ${data.table} limited by ${data.limit}`)
    }
    else if(data.method == 'INSERT'){
        console.log(`[INFO] ${data.method} into ${data.table} table where coulmns (${data.coulmns}) is (${data.values})`)
    }
    
}

module.exports = {
    logger: reqLogger, 
    dbLogger: databaseLogger,
    errHandle: errorHandle
};