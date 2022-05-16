async function reqLogger(req, res, next){
    console.log(`[INFO] ${req.method} request to ${req.path} from ${req.ip}`)
    next();
}
async function errorHandle(error, req, res, next){
    res.status(error.status).json({'error':error.msg})
}
async function databaseLogger(data, req, res, next){
    if(data.method == 'error') next(data)

    console.log(`[INFO] ${data.method} ${data.coulmns} from table ${data.table} limited by ${data.limit}`)
}

module.exports = {
    logger: reqLogger, 
    dbLogger: databaseLogger,
    errHandle: errorHandle
};