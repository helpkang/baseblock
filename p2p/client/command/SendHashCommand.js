const Command = require("../../common/command/Command")

const CommandUtil = require('../../common/command/CommandUtil')

module.exports = class SendHashCommand extends Command {

    constructor(dest, udpClient) {
        super(dest, udpClient)
    }

    exec(data) {
        const message = CommandUtil.makeCommandData('sendhash', Buffer.from(data))
        this._send(message)
    }

}
