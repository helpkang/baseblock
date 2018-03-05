module.exports = class Command {

    constructor(dest, udpClient) {
        this.dest = dest
        this.udpClient = udpClient
    }

    exec(message) {
        throw new Error('exec function must implmented.')
    }

    _send(buf){
        this.udpClient.sendBuffer(buf, this.dest, (err, nrOfBytesSent) => {
            if (err) return console.log(err);
            console.log('UDP message sent to ' + this.dest.address + ':' + this.dest.port);
        });
    }
}
