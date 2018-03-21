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
        const maxStr = buffer.toString()
        const max = maxStr ? parseInt(maxStr) : -1

        console.log('lastBlockInfoHandler', maxStr)
        console.log('lastBlockInfoHandler parseInt', max)
    }

}