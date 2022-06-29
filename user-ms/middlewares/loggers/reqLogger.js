async function reqLogger(req, res, next){
    console.log(`[${req.protocol.toUpperCase()}] ${req.ip} [${new Date().toDateString()}] "${req.method} ${req.path}"`)
    next();
}

module.exports =  reqLogger;