async function reqLogger(req, res, next){
    console.log(`[INFO] ${req.method} request to ${req.path} from ${req.ip}`)
    next();
}
async function errorHandle(error, req, res, next){
    res.status(error.status).json({'error':error.msg})
}

module.exports = {
    logger: reqLogger, 
    errHandle: errorHandle
};