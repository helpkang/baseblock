
const _ = require("underscore")


const config = require('./config')

const UdpClient = require('./UdpClient')
const udpClient = new UdpClient()

const ClientStore = require('./ClientStore')
const clientStore = new ClientStore()

udpClient.onMessage(function (buf, remote) {
	if (isServerMessage(remote)) {
		const message = buf.toString()
		if(!message) return
		clientStore.addAll(message)
		console.log(clientStore.getArray())
		sendRandom()
	} else {
		try {
			const message = buf.toString()
			console.log('receive', message)
		} catch (e) { 
			console.log(e)
		}
	}
})

function registerToServer() {

	var message = new Buffer('');
	udpClient.send(message, config, function (err, nrOfBytesSent) {
		if (err) return console.log(err);
		console.log('UDP message sent to ' + config.address + ':' + config.port);
	});

}
registerToServer()
setInterval(registerToServer, 2000)





function isServerMessage(remote) {
	return config.address === remote.address && config.port === remote.port
}

function sendRandom(){
	const rand = Math.floor((Math.random() * 2) + 1)
	if(rand !== 2) return
	const clients = clientStore.getArrayFilterRandom(1)
	if(clients.length !== 1) return
	const client = clients[0].split(',')
	const clientInfo = {address: client[0], port: parseInt(client[1])}
	udpClient.send(rand+" random hello message!!!", clientInfo, ()=>{})
}
