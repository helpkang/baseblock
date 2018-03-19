const log = require('debug')('server/index')

const config = require('./config')


const ServerStore = require('./ServerStore')
const serverStore = new ServerStore()

const UdpServer = require('./UdpServer')
const udpServer = new UdpServer(config.address, config.port)

const CommandHandlerRegister = require('../common/command/CommandHandlerRegister')

const commandHandlerRegister = new CommandHandlerRegister(udpServer)

const SetNodeHandler = require('./handler/SetNodeHandler')
commandHandlerRegister.add('setNode', new SetNodeHandler(serverStore, udpServer))
commandHandlerRegister.start()


udpServer.listening(
    addr => log('UDP Server listening on ' + addr.address + ":" + addr.port)
)

udpServer.bind()


function sendClients(client, remote) {

    let text = serverStore.getArrayFilterRandom(client, 3).join("|")
    udpServer.send(text, remote, function (err, nrOfBytesSent) {
        if (err) return log(err);
        log('> send ', text, remote.address, remote.port);
    });
}