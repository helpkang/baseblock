const dgram = require('dgram')
const _ = require("underscore")

class UdpClinet {

    constructor() {
        this.socket = dgram.createSocket('udp4');
    }


    onMessage(fn) {
        this.socket.on('message', (message, remote) => {
            fn(message, remote)
        })
    }

    send(text, remote, fn) {
        const buffer = new Buffer(text)
        this.socket.send(buffer, 0, buffer.length, remote.port, remote.address,
            function (err, nrOfBytesSent) {
                fn(err, nrOfBytesSent)
            }
        );
    }
    
    sendBuffer(buffer, remote, fn) {
        this.socket.send(buffer, 0, buffer.length, remote.port, remote.address,
            function (err, nrOfBytesSent) {
                fn(err, nrOfBytesSent)
            }
        );
    }

}

module.exports = UdpClinet