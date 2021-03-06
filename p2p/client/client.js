const Promise = require("bluebird")
const fs = Promise.promisifyAll(require("fs"))

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

	const NodesHandler = require('./handler/NodesHandler')
	// const GetHashHandler = require('./handler/GetHashHandler')
	// const SendHashHandler = require('./handler/SendHashHandler')
	const GetLastBlockInfoHandler = require('./handler/GetLastBlockInfoHandler')
	const LastBlockInfoHandler = require('./handler/LastBlockInfoHandler')
	const GetBlockInfoHandler = require('./handler/GetBlockInfoHandler')
	const BlockInfoHandler = require('./handler/BlockInfoHandler')


	commandHandlerRegister.add('nodes', new NodesHandler(clientStore, config, blockFolder))
	commandHandlerRegister.add('getLastBlockInfo', new GetLastBlockInfoHandler(udpFactory.get(), blockFolder))
	commandHandlerRegister.add('lastBlockInfo', new LastBlockInfoHandler(udpFactory.get()))
	commandHandlerRegister.add('getBlockInfo', new GetBlockInfoHandler(udpFactory.get(), blockFolder))
	commandHandlerRegister.add('blockInfo', new BlockInfoHandler(udpFactory.get()))
	commandHandlerRegister.start()
}
