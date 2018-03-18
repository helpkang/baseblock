const dgram = require("dgram");

const _ = require("underscore");
const CommandUtil = require("../common/command/CommandUtil");

class UdpServer {
  constructor(address, port) {
    this.address = address;
    this.port = port;
    this.socket = dgram.createSocket("udp4");
  }

  bind() {
    return this.socket.bind(this.port, this.address);
  }

  listening(fn) {
    this.socket.on("listening", () => {
      fn(this.socket.address());
    });
  }

  onMessage(fn) {
    this.socket.on("message", (message, remote) => {
      fn(message, remote);
    });
  }

  // send(text, remote, fn) {
  //     const clientBuffer = new Buffer(text)
  //     const commandBuffer = CommandUtil.makeCommandData('register', clientBuffer)
  //     this.socket.send(commandBuffer, 0, commandBuffer.length, remote.port, remote.address,
  //         function (err, nrOfBytesSent) {
  //             fn(err, nrOfBytesSent)
  //         }
  //     );
  // }
  send(text, remote, fn) {
    const buf = new Buffer(text);
    this.sendBuffer(buf);
  }

  sendBuffer(buffer, remote, fn) {
    this.socket.send(buffer, 0, buffer.length, remote.port, remote.address, function(
      err,
      nrOfBytesSent
    ) {
      fn(err, nrOfBytesSent);
    });
  }
}

module.exports = UdpServer;
