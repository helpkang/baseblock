const CommandUtil = require('./CommandUtil')

module.exports= class CommandHandlerRegister {
    constructor(udpClient){
        this.udpClient = udpClient
        this.commands = {}
    }

    start(){
        this.udpClient.onMessage((buf, remote)=>{
            const {commandStr, command, dataBuffer} = this.parseCommand(buf)
            console.log('commandStr', commandStr)
            command && command.handle(commandStr, dataBuffer, remote)
        })
    }

    add(command, handler){
        this.commands[command] = handler
    }

    get(command) {
        return this.commands[command]
    }

    parseCommand(buf) {
        const { commandStr, data } = CommandUtil.paseCommandData(buf)
        const command = this.get(commandStr)
        
        return { commandStr, command, dataBuffer: data }
    }
}
