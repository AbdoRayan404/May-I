async function check(req, res, next){
    
    let {username, password, public_key} = req.body
    
    if(!username.match(/^[A-z0-9]{4,36}$/g)) next({
        method: 'error',
        status: 401,
        msg:'username should be between 4-36 A-Z'
    })

    if(!password.match(/^.{8,32}$/gi)) next({
        method: 'error',
        status: 401,
        msg: 'password should be between 8-32'
    })

    if(public_key.length > 145) next({
        method: 'error',
        status: 401,
        msg: 'public key cannot be more than 145 chars'
    })

    next()
}

module.exports = check