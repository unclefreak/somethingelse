var net = require('net');
var client = net.connect({
	port: 8001
}, function(){
	client.write('你好');
})