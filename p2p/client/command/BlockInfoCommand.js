const Command = require("../../common/command/Command")

const CommandUtil = require('../../common/command/CommandUtil')

module.exports = class BlockInfoCommand extends Command {

    constructor(dest, udpClient) {
        super(dest, udpClient)
    }

    exec(data) {
        const message = CommandUtil.makeCommandData('blockInfo', data)
        this._send(message)
    }

}
