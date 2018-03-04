class CommandHandlerRegister {
    constructor(){
        this.commands = {}
    }

    add(command, handler){
        this.commands[command] = handler
    }

    get(command) {
        return this.commands[command]
    }

    parseCommand(buf){
        const { commandStr, dataBuffer } = {} //CommandUtil.
        const command = get(cmdStr)
        return { commandStr, command, dataBuffer }
    }
}

module.exports = new CommandHandlerRegister()