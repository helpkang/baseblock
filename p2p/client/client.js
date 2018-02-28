
const _ = require("underscore")

const FileRandomRmd160 = require('./file/FileRandomRmd160')

const CommandUtil = require('./utils/CommandUtil')

const config = require('./config')

const UdpClient = require('../common/UdpClient')
const udpClient = new UdpClient()

const Command = require('../common/Command')
const ClientStore = require('./ClientStore')
const clientStore = new ClientStore()


const svrRegCommand = new Command(config)
udpClient.onMessage(function (buf, remote) {
	if (isServerMessage(remote)) {
		const message = buf.toString()
		if (!message) return
		clientStore.addAll(message)
		console.log(message, clientStore.getArray())
		sendMessage()
	} else {
		try {
			const { command, data } = CommandUtil.paseCommandData(buf)
			console.log('receive', command, data.toString())
		} catch (e) {
			console.log(e)
		}
	}
})

function registerToServer() {

	svrRegCommand.exec('')
	// udpClient.send('', config, function (err, nrOfBytesSent) {
	// 	if (err) return console.log(err);
	// 	console.log('UDP message sent to ' + config.address + ':' + config.port);
	// });

}

const command = process.argv.slice(2)[0] ? process.argv.slice(2)[0] : ''

console.log('command', command)

registerToServer()
setInterval(registerToServer, config.interval * 1000)




//TODO: tracekr에서 온걸 확인 하기 위해서 인증서 기반으로 처리 하다록 변경
function isServerMessage(remote) {
	return config.address === remote.address && config.port === remote.port
}


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


			const data = Buffer.from(JSON.stringify(hashes))
			const message = CommandUtil.makeCommandData('hash', data)
			console.log(message.toString())
			// udpClient.sendBuffer(message, clientInfo, () => { })
			new Command(clientInfo).execBuffer(message)

		}
	)
}
