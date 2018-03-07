const CommandHandler = require('../../common/command/CommandHandler')

module.exports = class SendHashHandler extends CommandHandler {

    handle(commandStr, buffer, remote) {
        console.log('sendhash', buffer.toString())
    }


}