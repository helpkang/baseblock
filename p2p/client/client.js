const commandArg = process.argv.slice(2)[0] ? process.argv.slice(2)[0] : ''
console.log('commandArg', commandArg)

const CommandUtil = require('../common/command/CommandUtil')

const config = require('./config')

const udpFactory = require('../common/udp/udpFactory')

const RegisterCommand = require('./command/RegisterCommand')


setupHandler()
registerToServer()



function registerToServer() {
	new RegisterCommand(config, udpFactory.get()).exec('')
	setTimeout(registerToServer, config.interval * 1000)
}

function setupHandler() {
	const ClientStore = require('./ClientStore')
	const clientStore = new ClientStore()

	const CommandHandlerRegister = require('../common/command/CommandHandlerRegister')
	const commandHandlerRegister = new CommandHandlerRegister(udpFactory.get())

	const ClientListHandler = require('./handler/ClientListHandler')
	const HashHandler = require('./handler/HashHandler')
	commandHandlerRegister.add('register', new ClientListHandler(clientStore, config, commandArg))
	commandHandlerRegister.add('hash', new HashHandler())
	commandHandlerRegister.start()
}