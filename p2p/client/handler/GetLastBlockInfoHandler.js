const CommandHandler = require('../../common/command/CommandHandler')

module.exports = class GetLastBlockInfoHandler extends CommandHandler {

    handle(commandStr, buffer, remote) {
        console.log('getLstBlockInfoHandler', buffer.toString())
    }


}