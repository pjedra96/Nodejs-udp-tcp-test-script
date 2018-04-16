var dgram = require('dgram');
var net = require('net');

var udp = null;

// Instantiate a TCP server to listen for POLL messages
var tcpServer = net.createServer(function(socket){
	socket.on('data', function (data) {
		// Check if the sRequestingId variable has a value and whether it matches the ID of the "Requested" VT
		message = data.toString();

		tcp = parseIPv6(socket);
		tcpMessage = message;

		console.log('TCP Data received: ' + message + ' from: ' + tcp);

		udpServer.send(messageToSend, 0, messageToSend.length, 47473, 'IP_ADDRESS', function(error){
			if(error){ udpServer.close(); }
			else{ console.log('UDP Messsage Sent !!!'); }
		});
	});
	socket.on('close', function(){
		console.log('Socket closed');
	});
	socket.on('error', function(e){
		console.log(e);
	});
});
tcpServer.listen(47474, function() {
		console.log('Socket server for POLL messages instantiated');
});

// Instantiate a UDP datatgram server to receive UDP-transmitted data
var udpServer = dgram.createSocket("udp4");
var messageToSend = Buffer.from('STREAM');
udpServer.bind(47473);

udpServer.on("message", function (msg, rinfo) {
	console.log('UDP message: ' + msg);
	udp = rinfo.address;
});

udpServer.on("listening", function(){
	var address = udpServer.address();
	console.log('UDP Server listening on: ' + address.address + ':' + address.port);
});

udpServer.on("close",function(){
	console.log('Socket is closed !');
});

udpServer.on("error", function(e) {
    console.log(e);
});


function parseIPv6(socket){
	var iPArray = socket.remoteAddress.split('.');
	if(iPArray[0].length > 3){
		iPArray[0] = iPArray[0].split(':')[3];
	}
	return iPArray[0] + '.' + iPArray[1] + '.' + iPArray[2] + '.' + iPArray[3];
}
