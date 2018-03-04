const CommandUtil = require('../../common/command/CommandUtil')
module.exports = class HashCommand {

    constructor(dest, udpClient) {
        this.dest = dest
        this.udpClient = udpClient
    }

    exec(data) {
        const message = CommandUtil.makeCommandData('hash', Buffer.from(data))
        this._send(message)
    }

    _send(buf) {
        this.udpClient.sendBuffer(buf, this.dest, (err, nrOfBytesSent) => {
            if (err) return console.log(err);
            console.log('UDP message sent to ' + this.dest.address + ':' + this.dest.port);
        });
    }
}
