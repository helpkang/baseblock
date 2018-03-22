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

        // const max = await this.getMax()

        // new BlockInfoCommand(remote, this.udpClient).exec(max)

    }

    async getMax(){

        const max =  await fs.readdirAsync(this.blockFolder)
        .map((v)=>parseInt(v))
        .reduce(function(a, b) {
            return Math.max(a, b);
        }, -1)

        return max + ""
    }

}