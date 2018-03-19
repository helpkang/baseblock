const CommandHandler = require('../../common/command/CommandHandler')
const FileRandomRmd160 = require('../file/FileRandomRmd160')
const udpFactory = require('../../common/udp/udpFactory')
const SendHashCommand = require('../command/SendHashCommand')

module.exports = class SendHashHandler extends CommandHandler {

    constructor(blockFolder) {
        super()
        this.blockFolder = blockFolder
    }
    async handle(commandStr, buffer, remote) {
        const frr = new FileRandomRmd160()
        console.log('this.blockFolder', this.blockFolder)
        const hashes = await frr.makeHash({
            encoding: 'base64',
            fileName: this.blockFolder,
            split: 2 * 1024
        })
        const data = JSON.stringify(hashes)
        console.log('hashdata', data)

        new SendHashCommand(remote, udpFactory.get()).exec(data)
    }


}