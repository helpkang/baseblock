const dgram = require('dgram')

const _ = require("underscore")
const CommandUtil = require('../common/command/CommandUtil')

class UdpServer {
    constructor(address, port) {
        this.address = address
        this.port = port
        this.socket = dgram.createSocket('udp4');
    }

    bind() {
        return this.socket.bind(this.port, this.address);
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
        const commandBuffer = CommandUtil.makeCommandData('register', clientBuffer)
        console.log('client reg=',commandBuffer.slice(1).toString())
        this.socket.send(commandBuffer, 0, commandBuffer.length, remote.port, remote.address,
            function (err, nrOfBytesSent) {
                fn(err, nrOfBytesSent)
            }
        );
    }

}

module.exports = UdpServer