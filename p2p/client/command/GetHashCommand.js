const Command = require("../../common/command/Command")

const CommandUtil = require('../../common/command/CommandUtil')

module.exports = class GetHashCommand extends Command {

    constructor(dest, udpClient) {
        super(dest, udpClient)
    }

    exec(data) {
        const message = CommandUtil.makeCommandData('gethash')
        this._send(message)
    }

}
