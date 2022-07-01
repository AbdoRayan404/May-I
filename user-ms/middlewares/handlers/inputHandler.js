async function check(req, res, next){
    let {username, password, public_key} = req.body
    let badinput = false;

    if(!username.match(/^[A-z0-9]{4,36}$/g) || !password.match(/^.{8,32}$/gi) || public_key.length > 145){
        res.status(400).json({"error":"too long, too short input"})
        badinput = true
        return 
        }
    
    if(badinput == false) next()
}

module.exports = check