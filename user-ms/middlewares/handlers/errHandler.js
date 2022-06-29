async function errorHandle(req, res, next){
    let {status, msg} = req.error || {status:null, msg:null}

    if(status && msg){
        res.status(status).json({'error':msg})
        console.error(`[HTTP] [ERROR] ${req.ip} [${new Date().toDateString()}] "${req.method} ${req.path}"`)
    }else{
        next()
    }
}

module.exports = errorHandle;