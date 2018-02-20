const dgram = require('dgram');

const _ = require("underscore")

const socket = dgram.createSocket('udp4');

const config = require('./config')

socket.on('message', function (buf, remote) {
	const message = buf.toString()
    console.log( 'server message: ' + message)
	if(isServerMessage(remote)){
		const log =parsingClient(message)
		console.log(log)
	} else {
		try{ 
			const publicEndpointA = JSON.parse(message)
			sendMessageToA(publicEndpointA.address, publicEndpointA.port)
		} catch(err) {}
	}
});

function sendMessageToS () {

	var message = new Buffer('');
	socket.send(message, 0, message.length, config.port, config.host, function (err, nrOfBytesSent) {
	    if (err) return console.log(err);
	    console.log('UDP message sent to ' + config.host +':'+ config.port);
	    // socket.close();
	});
}
sendMessageToS()
setInterval(sendMessageToS, 2000)








function isServerMessage(remote){
	return config.host === remote.address && config.port === remote.port
}

function parsingClient(message){
	if(_.isEmpty(message)){
		return []
	}
	return message.split('|').map((item)=>item.split(','))
}