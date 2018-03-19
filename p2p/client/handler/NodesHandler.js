const CommandHandler = require('../../common/command/CommandHandler')


const SendHashCommand = require('../command/SendHashCommand')
const udpFactory = require('../../common/udp/udpFactory')
module.exports = class NodesHandler extends CommandHandler {
    constructor(clientStore, config, blockFolder) {
        super()
        this.clientStore = clientStore
        this.config = config
        this.blockFolder = blockFolder
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
        console.log('folder', this.blockFolder)
        const clients = this.clientStore.getArray()
            clients.forEach(
                (clientData) => {
                    const client = clientData.split(',')
                    const clientInfo = { address: client[0], port: parseInt(client[1]) }
                    
                    const GetLastBlockInfoCommand = require('../command/GetLastBlockInfoCommand')
                    new GetLastBlockInfoCommand(clientInfo, udpFactory.get()).exec()
                }
            )
  
        if (this.notExist()) {
            const clients = this.clientStore.getArray()
            clients.forEach(
                (clientData) => {
                    const client = clientData.split(',')
                    const clientInfo = { address: client[0], port: parseInt(client[1]) }
                    // const GetHashCommand = require('../command/GetHashCommand')
                    // new GetHashCommand(clientInfo, udpFactory.get()).exec()
                }
            )
            return
        }

      
    }
    //TODO: tracker 에서 온걸 확인 하기 위해서 인증서 기반 으로 처리 하다록 변경
    isServerMessage(remote) {
        return this.config.address === remote.address && this.config.port === remote.port
    }
    //TODO: temp file not exist check
    notExist() {
        return this.blockFolder !== './sample/sample.txt'
    }

}