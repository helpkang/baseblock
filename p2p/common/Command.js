const UdpClient = require('./UdpClient')

const udpClient = new UdpClient()
module.exports = class Command {

    constructor(dest) {
        this.dest = dest
    }

    exec(message) {
        udpClient.send(message, this.dest, (err, nrOfBytesSent)=> {
            if (err) return console.log(err);
            console.log('UDP message sent to ' + this.dest.address + ':' + this.dest.port);
        });
    }
    execBuffer(message) {
        udpClient.sendBuffer(message, this.dest, (err, nrOfBytesSent)=> {
            if (err) return console.log(err);
            console.log('UDP message sent to ' + this.dest.address + ':' + this.dest.port);
        });
    }
}
