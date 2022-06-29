async function errorHandle(req, res, next){
    res.status(req.error.status).json({'error':req.error.msg})
    console.error(`[HTTP] [ERROR] ${req.ip} [${new Date().toDateString()}] "${req.method} ${req.path}"`)
}

module.exports = errorHandle;