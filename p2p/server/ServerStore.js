const NodeCache = require("node-cache")
const _ = require("underscore")

class ClientStore {
    constructor() {
        this.clients = new Set()
        this.cache = new NodeCache({ stdTTL: 6, checkperiod: 1 });
        this.cache.on("expired",  ( value) => this.clients.delete(value) )
    }

    add(client){
        this.clients.add(client)
        this.cache.set(client)
    }

    getArray(){
        return Array.from(this.clients)
    }

    getArrayFilterRandom(client, length=3){
        let arrClients = this.getArray().filter((value)=> value !== client)
        return _.sample(arrClients, length)
    }


}

module.exports = ClientStore