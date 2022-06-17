const WebSocket = require('ws');

class MayIWebSocket extends WebSocket.WebSocket {
    constructor(address, protocols, options){
        super(address, protocols, options);

        this._verified = false
        this._ACCaddress = ""
    }

    /*
        return @type {Boolean}
    */
    get verified(){
        return this._verified
    }

    /*
        arg @type {Boolean}
    */
    set verified(state){
        this._verified = state
    }

    /*
        return @type {String}
    */
    get ACCaddress(){
        return this._ACCaddress;
    }

    /*
        arg @type {Boolean}
    */
    set ACCaddress(address){
        this._ACCaddress = address
    }
}

module.exports = MayIWebSocket