
const _ = require("underscore")


const config = require('./config')

const UdpClient = require('./UdpClient')
const udpClient = new UdpClient()

const ClientStore = require('./ClientStore')
const clientStore = new ClientStore()



udpClient.onMessage(function (buf, remote) {
	if (isServerMessage(remote)) {
		const message = buf.toString()
		if (!message) return
		clientStore.addAll(message)
		console.log(message, clientStore.getArray())
		sendMessage()
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

const command = process.argv.slice(2)[0] ? process.argv.slice(2)[0] : ''

console.log('command', command)

registerToServer()
setInterval(registerToServer, config.interval * 1000)





function isServerMessage(remote) {
	return config.address === remote.address && config.port === remote.port
}

const FileRandomRmd160 = require('./file/FileRandomRmd160')

function sendMessage() {
	if (!command) return

	const clients = clientStore.getArray()
	clients.forEach(
		async (clientData) => {
			const client = clientData.split(',')
			const clientInfo = { address: client[0], port: parseInt(client[1]) }
			const frr = new FileRandomRmd160()
			const hashes = await frr.makeHash(
				{
					encoding: 'base64',
					fileName: './sample/sample.txt',
					split: 2 * 1024
				}
			)
			hashes.forEach((hash)=>{
				console.log('send')
				udpClient.send(hash, clientInfo, () => { })
			})
		}
	)
}


// (async () => {
//     const frr = new FileRandomRead()
//     const hashes = await frr.makeHash(
//         {
//             encoding: 'base64',
//             fileName: './sample/sample.txt',
//             split: 2*1024
//         }
//     )
//     console.log(hashes)
// })()
