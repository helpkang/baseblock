const Promise = require("bluebird")
const fs = Promise.promisifyAll(require("fs"))


const CommandHandler = require('../../common/command/CommandHandler')

const LastBlockInfoCommand = require('../command/LastBlockInfoCommand')


module.exports = class LastBlockInfoHandler extends CommandHandler {

    constructor(udpClient){
        super()
        this.udpClient = udpClient
    }

    async handle(commandStr, buffer, remote) {
        console.log('lastBlockInfoHandler', buffer.toString())
    }

}