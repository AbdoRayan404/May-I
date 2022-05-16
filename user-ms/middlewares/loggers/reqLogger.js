async function reqLogger(req, res, next){
    console.log(`[INFO] ${req.method} request to ${req.path} from ${req.ip}`)
    next();
}

module.exports =  reqLogger;