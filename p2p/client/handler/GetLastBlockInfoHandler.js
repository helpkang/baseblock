const Promise = require("bluebird")
const fs = Promise.promisifyAll(require("fs"))


const CommandHandler = require('../../common/command/CommandHandler')

const LastBlockInfoCommand = require('../command/LastBlockInfoCommand')


module.exports = class GetLastBlockInfoHandler extends CommandHandler {

    constructor(udpClient, blockFolder){
        super()
        this.udpClient = udpClient
        this.blockFolder = blockFolder
    }

    async handle(commandStr, buffer, remote) {
        console.log('getLastBlockInfoHandler', buffer.toString())

        const max = await this.getMax()

        new LastBlockInfoCommand(remote, this.udpClient).exec(max)

    }

    async getMax(){
        createDir(this.blockFolder)
        const max =  await fs.readdirAsync(this.blockFolder)
        .map((v)=>parseInt(v))
        .reduce(function(a, b) {
            return Math.max(a, b);
        }, -1)

        return max + ""
    }

}

function createDir(dir) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
}
