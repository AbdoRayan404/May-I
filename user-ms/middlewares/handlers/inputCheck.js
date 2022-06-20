async function miscCheck(req, res, next){
    const regex = /[^a-zA-Z\d\s:]/
    let hasMisc = false

    /////register check/////
    if(regex.test(req.body.username) == true) hasMisc = true
    if(regex.test(req.body.password) == true) hasMisc = true
    if(regex.test(req.body.public_key) == true) hasMisc = true

    /////login check/////
    if(regex.test(req.body.address) == true) hasMisc = true

    /////record check/////
    if(regex.test(req.params.address) == true) hasMisc = true

    if(hasMisc == true){
        res.status(400).json({'error':'miscellaneous characters has been found.'})
    }else{
        next()
    }
}

module.exports = miscCheck;