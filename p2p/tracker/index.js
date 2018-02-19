const dgram = require('dgram');

const config = require('./config')
const socket = dgram.createSocket('udp4');

const _ = require("underscore")

const clients = new Set()


socket.bind(config.port, config.host);


socket.on('listening', function () {
    console.log('UDP Server listening on ' + socket.address().address + ":" + socket.address().port);
});

socket.on('message', function (message, remote) {

    const client = remote.address + "," + remote.port
    console.log(client)
    clients.add(client)

    sendPublicDataToClients(client, remote)
});


function sendPublicDataToClients(sendClient, remote) {

    let arrClients = Array.from(clients).filter((value)=> value !== sendClient)
    const clientsText = _.sample(arrClients, 3).join("|")

    const clientBuffer = new Buffer(clientsText);
    socket.send(clientBuffer, 0, clientBuffer.length, remote.port, remote.address, function (err, nrOfBytesSent) {
        if (err) return console.log(err);
        console.log('> send ', remote.address, remote.port);
    });
}