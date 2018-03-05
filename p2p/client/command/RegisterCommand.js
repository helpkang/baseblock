const Command = require("../../common/command/Command")


module.exports = class RegisterCommand extends Command {

    constructor(dest, udpClient) {
        super(dest, udpClient)
    }

    exec(message) {
        const buf = (message instanceof Buffer) ? message : Buffer.from(message)
        this._send(buf)
    }

}
