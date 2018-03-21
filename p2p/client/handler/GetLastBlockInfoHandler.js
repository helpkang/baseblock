const Promise = require("bluebird")
const fs = Promise.promisifyAll(require("fs"))


const CommandHandler = require('../../common/command/CommandHandler')

const LastBlockInfoCommand = require('../command/LastBlockInfoCommand')


module.exports = class GetLastBlockInfoHandler extends CommandHandler {

    constructor(udpClient){
        super()
        this.udpClient = udpClient
    }

    async handle(commandStr, buffer, remote) {
        console.log('getLastBlockInfoHandler', buffer.toString())

        const max = await this.getMax()

        new LastBlockInfoCommand(remote, this.udpClient).exec(max)

    }

    async getMax(){

        const list = await fs.readdirAsync('./sample')
        const max = list
        .map((v)=>parseInt(v))
        .reduce(function(a, b) {
            return Math.max(a, b);
        })

        return max + ""
    }

}