const CommandHandler = require("../../common/command/CommandHandler");

module.exports = class SetNodeHandler extends CommandHandler {
  constructor(serverStore, udpServer) {
    super();
    this.serverStore = serverStore;
    this.udpServer = udpServer;
  }

  handle(commandStr, buffer, remote) {
    console.log("sendhash", buffer.toString());

    const client = remote.address + "," + remote.port;
    console.log("client list:", this.serverStore.getArray());
    this.serverStore.add(client);

    this.sendClients(client, remote);
  }

  sendClients(client, remote){
    const NodesCommand = require('../command/NodesCommand')
    const text = this.serverStore.getArrayFilterRandom(client, 3).join("|");
    new NodesCommand(remote, this.udpServer).exec(text)
  }

  // sendClients(client, remote) {
  //   let text = this.serverStore.getArrayFilterRandom(client, 3).join("|");
  //   this.udpServer.send(text, remote, function(err, nrOfBytesSent) {
  //     if (err) return log(err);
  //     console.log("> send ", text, remote.address, remote.port);
  //   });
  // }
};
