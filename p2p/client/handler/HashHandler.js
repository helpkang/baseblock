const CommandHandler = require('../../common/command/CommandHandler')

module.exports = class HashHandler extends CommandHandler {

    handle(commandStr, buffer, remote) {
        console.log('hash', buffer.toString())
    }


}