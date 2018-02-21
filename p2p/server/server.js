const log = require('debug')('server/index')

const config = require('./config')


const ServerStore = require('./ServerStore')
const serverStore = new ServerStore()

const UdpServer = require('./UdpServer')
const udpServer = new UdpServer(config.address, config.port)

udpServer.onMessage(function (message, remote) {

    const client = remote.address + "," + remote.port
    log(client, ': message', message.toString('utf-8'))
    log('client list:', serverStore.getArray())
    serverStore.add(client)

    sendClients(client, remote)
});

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