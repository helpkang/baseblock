const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

const CommandHandler = require("../../common/command/CommandHandler");

module.exports = class BlockInfoHandler extends CommandHandler {
  constructor(udpClient) {
    super();
    this.udpClient = udpClient;
  }

  async handle(commandStr, buffer, remote) {
    console.log("blockInfoHandler", buffer.toString())
  }
};
