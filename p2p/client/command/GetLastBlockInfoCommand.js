const Command = require("../../common/command/Command")

const CommandUtil = require('../../common/command/CommandUtil')

module.exports = class GetLastBlockInfoCommand extends Command {

    constructor(dest, udpClient) {
        super(dest, udpClient)
    }

    exec(data) {
        const message = CommandUtil.makeCommandData('getLastBlockInfo')
        this._send(message)
    }

}
