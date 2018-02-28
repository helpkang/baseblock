const dgram = require('dgram')
const _ = require("underscore")
const socket = dgram.createSocket('udp4');

class UdpClinet {

    constructor() {
    }


    onMessage(fn) {
        socket.on('message', (message, remote) => {
            fn(message, remote)
        })
    }

    send(text, remote, fn) {
        const buffer = new Buffer(text)
        socket.send(buffer, 0, buffer.length, remote.port, remote.address,
            function (err, nrOfBytesSent) {
                fn(err, nrOfBytesSent)
            }
        );
    }
    
    sendBuffer(buffer, remote, fn) {
        socket.send(buffer, 0, buffer.length, remote.port, remote.address,
            function (err, nrOfBytesSent) {
                fn(err, nrOfBytesSent)
            }
        );
    }

}

module.exports = UdpClinet