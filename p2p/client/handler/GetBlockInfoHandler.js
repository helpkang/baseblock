const Promise = require("bluebird")
const fs = Promise.promisifyAll(require("fs"))


const CommandHandler = require('../../common/command/CommandHandler')

const BlockInfoCommand = require('../command/BlockInfoCommand')


module.exports = class GetBlockInfoHandler extends CommandHandler {

    constructor(udpClient, blockFolder){
        super()
        this.udpClient = udpClient
        this.blockFolder = blockFolder
    }

    async handle(commandStr, buffer, remote) {
        console.log('getBlockInfoHandler', buffer.toString())


        new BlockInfoCommand(remote, this.udpClient).exec(Buffer.from("ret:"+buffer.toString()))

    }


}