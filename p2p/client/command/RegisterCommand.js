const Command = require("../../common/command/Command")

const CommandUtil = require('../../common/command/CommandUtil')

module.exports = class RegisterCommand extends Command {

    constructor(dest, udpClient) {
        super(dest, udpClient)
    }

    exec(data) {
        const buf = (data instanceof Buffer) ? data : Buffer.from(data)
        const message = CommandUtil.makeCommandData('setNode', buf)
        this._send(message)
    }

}
