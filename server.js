var net = require('net');
var config = require('./config');
var Parser = require('./parser');


var APP_PATH = __dirname + '/app';
var FILE_PATH = __dirname + '/public';

config.app_path = APP_PATH;
config.file_path = FILE_PATH;

var sdata = {};


var ds = net.Server(function(socket){
	socket.id = Math.random();
	socket.parser = new Parser();
	socket.parser.on('request', function(body){
		console.log(body.toString());

	});
	socket.on('data', function(buffer){
		//console.log(buffer.toString());
		var id = this.id;
		this.parser.pushData(buffer);
	});
});

ds.listen(config.serverinfo.port);

