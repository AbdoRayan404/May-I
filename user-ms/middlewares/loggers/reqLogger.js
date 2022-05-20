async function reqLogger(req, res, next){
    console.log(`[INFO] ${req.ip} [${new Date().toDateString()}] "${req.method} ${req.path} ${req.protocol}"`)
    next();
}

module.exports =  reqLogger;