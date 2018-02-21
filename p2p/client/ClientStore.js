const NodeCache = require("node-cache")
const _ = require("underscore")

class ClientStore {
    constructor() {
        this.clients = new Set()
        this.cache = new NodeCache({ stdTTL: 100, checkperiod: 10 });
        this.cache.on("expired",  (key, value) => this.clients.delete(key) )
    }

    addAll(clients){
        clients.split('|')
        .forEach(client=>this.add(client))
    }

    add(client){
        this.clients.add(client)
        this.cache.set(client)
    }

    getArray(){
        return Array.from(this.clients)
    }

    getArrayFilterRandom(length){
        let arrClients = this.getArray()
        return _.sample(arrClients, length)
    }


}

module.exports = ClientStore