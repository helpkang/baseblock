const dgram = require('dgram')

const _ = require("underscore")

class UdpServer {
    constructor(host, port) {
        this.host = host
        this.port = port
        this.socket = dgram.createSocket('udp4');
    }

    bind() {
        return this.socket.bind(this.port, this.host);
    }

    listening(fn) {
        this.socket.on('listening', () => {
            fn(this.socket.address())
        });
    }

    onMessage(fn) {
        this.socket.on('message', (message, remote) => {
            fn(message, remote)
        })
    }

    send(text, remote, fn) {
        const clientBuffer = new Buffer(text)
        this.socket.send(clientBuffer, 0, clientBuffer.length, remote.port, remote.address,
            function (err, nrOfBytesSent) {
                fn(err, nrOfBytesSent)
            }
        );
    }

}

module.exports = UdpServer