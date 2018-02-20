const NodeCache = require("node-cache")
const _ = require("underscore")

class ClientStore {
    constructor() {
        this.clients = new Set()
        this.cache = new NodeCache({ stdTTL: 3, checkperiod: 1 });
        this.cache.on("expired",  (key, value) => this.clients.delete(key) )
    }

    add(client){
        this.clients.add(client)
        this.cache.set(client)
    }

    getArray(){
        return Array.from(this.clients)
    }

    getArrayFilterRandom(client, length=3){
        let arrClients = Array.from(this.clients).filter((value)=> value !== client)
        return _.sample(arrClients, length)
    }


}

module.exports = ClientStore