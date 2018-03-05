
const _ = require("underscore")

const FileRandomRmd160 = require('./file/FileRandomRmd160')

const CommandUtil = require('../common/command/CommandUtil')

const config = require('./config')

const udpFactory = require('../common/udp/udpFactory')

const Command = require('../common/command/Command')
const HashCommand = require('./command/HashCommand')
const RegisterCommand = require('./command/RegisterCommand')
const ClientStore = require('./ClientStore')
const clientStore = new ClientStore()

const commandHandlerRegister = require('../common/command/CommandHandlerRegister')


const registerCommand = new RegisterCommand(config, udpFactory.get())

udpFactory.get().onMessage(function (buf, remote) {
	if (isServerMessage(remote)) {
		const message = buf.toString()
		if (!message) return
		clientStore.addAll(message)
		console.log(message, clientStore.getArray())
		sendMessage()
	} else {
		try {
			//TODO: command 클라이언트 처리 필요
			//TODO: handler에 register 필요
			//TODO md에 만들고 아이들 연결 할 수 있도록 한다.
			const { commandStr, data } = CommandUtil.paseCommandData(buf)
			console.log('receive', commandStr, data.toString())
		} catch (e) {
			console.log(e)
		}
	}
})

function registerToServer() {
	registerCommand.exec('')
}

const commandArg = process.argv.slice(2)[0] ? process.argv.slice(2)[0] : ''

console.log('commandArg', commandArg)

registerToServer()
setInterval(registerToServer, config.interval * 1000)




//TODO: tracekr에서 온걸 확인 하기 위해서 인증서 기반으로 처리 하다록 변경
function isServerMessage(remote) {
	return config.address === remote.address && config.port === remote.port
}


async function sendMessage() {

	if(!commandArg) return
	
	const frr = new FileRandomRmd160()
	const hashes = await frr.makeHash(
		{
			encoding: 'base64',
			fileName: './sample/sample.txt',
			split: 2 * 1024
		}
	)
	const data = JSON.stringify(hashes)

	const clients = clientStore.getArray()
	clients.forEach(
		(clientData) => {

			const client = clientData.split(',')
			const clientInfo = { address: client[0], port: parseInt(client[1]) }

			new HashCommand(clientInfo, udpFactory.get()).exec(data)

		}
	)
}
