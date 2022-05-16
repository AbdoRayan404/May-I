async function errorHandle(error, req, res, next){
    res.status(error.status).json({'error':error.msg})
}

module.exports = errorHandle;