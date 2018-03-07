const blockFolder = process.argv.slice(2)[0] ? process.argv.slice(2)[0] : ''


const config = require('./config')

const udpFactory = require('../common/udp/udpFactory')



setupHandler()
registerToServer()



function registerToServer() {
	const RegisterCommand = require('./command/RegisterCommand')
	new RegisterCommand(config, udpFactory.get()).exec('')
	setTimeout(registerToServer, config.interval * 1000)
}

function setupHandler() {
	const ClientStore = require('./ClientStore')
	const clientStore = new ClientStore()

	const CommandHandlerRegister = require('../common/command/CommandHandlerRegister')
	const commandHandlerRegister = new CommandHandlerRegister(udpFactory.get())

	const ClientListHandler = require('./handler/ClientListHandler')
	const SendHashHandler = require('./handler/SendHashHandler')
	commandHandlerRegister.add('register', new ClientListHandler(clientStore, config, blockFolder))
	commandHandlerRegister.add('sendhash', new SendHashHandler())
	commandHandlerRegister.start()
}