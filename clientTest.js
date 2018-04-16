var PORT = 47473;
var TCP_PORT = 47474;
var HOST = 'IP_ADDRESS';
var dgram = require('dgram');
var net = require('net');

// TCP Client - POLL client
var client = new net.Socket();
client.connect(TCP_PORT, 'IP_ADDRESS', function() {
	console.log('TCP Connected');
	client.write('POLL');
});
client.on('data', function(data) {
	console.log('TCP Message Received: ' + data);
	//client.destroy();
});
client.on('close', function() {
	console.log('Logger Connection closed');
});

// UDP Client Example
var message = 'Hello World';
//new Buffer('UDP Message');
var udpClient = dgram.createSocket('udp4');
udpClient.bind(47485);
udpClient.on("message", function(msg, rinfo){
	console.log("UDP Message received: " + msg);

	udpClient.send(message, 0, message.length, rinfo.port, rinfo.address, function(err, bytes) {
		if (err){ console.log(err); }
	});
});
udpClient.on("listening", function(){
	console.log("Listening:");
});
