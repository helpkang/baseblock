const CommandHandler = require('../../common/command/CommandHandler')

const FileRandomRmd160 = require('../file/FileRandomRmd160')
const HashCommand = require('../command/HashCommand')
const udpFactory = require('../../common/udp/udpFactory')
module.exports = class ClientListHandler extends CommandHandler {
    constructor(clientStore, config, commandArg) {
        super()
        this.clientStore = clientStore
        this.config = config
        this.commandArg = commandArg
    }

    handle(commandStr, buffer, remote) {
        if (!this.isServerMessage(remote)) return

        const message = buffer.toString()
        if (!message) return
        this.clientStore.addAll(message)
        console.log(message, this.clientStore.getArray())
        this.sendMessage()
    }

    async sendMessage() {
        console.log('commandArg', this.commandArg)
        if (!this.commandArg) return

        const frr = new FileRandomRmd160()
        const hashes = await frr.makeHash(
            {
                encoding: 'base64',
                fileName: './sample/sample.txt',
                split: 2 * 1024
            }
        )
        const data = JSON.stringify(hashes)

        const clients = this.clientStore.getArray()
        clients.forEach(
            (clientData) => {

                const client = clientData.split(',')
                const clientInfo = { address: client[0], port: parseInt(client[1]) }
                new HashCommand(clientInfo, udpFactory.get()).exec(data )

            }
        )
    }
    //TODO: tracekr에서 온걸 확인 하기 위해서 인증서 기반으로 처리 하다록 변경
    isServerMessage(remote) {
        return this.config.address === remote.address && this.config.port === remote.port
    }

}