function miscCheck(object){
    const regex = /[^a-zA-Z\d\s:]/

    /////login check/////
    if(regex.test(object.address) == true) return true
    if(regex.test(object.password) == true) return true

    /////message check/////
    if(regex.test(object.message) == true) return true
}

module.exports = miscCheck;