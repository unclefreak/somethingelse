var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var net = require('net');

var HOST = '127.0.0.1';
var PORT = 8001;

var client = new net.Socket();
client.connect(PORT, HOST, function() {
	//rl.setPrompt('OHAI> ');
	rl.prompt();
	rl.on('line', function(line){
		//console.log(line.trim());
		client.write(line.trim());
	});
});

// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
client.on('data', function(data) {
    console.log(data.toString());
});

// 为客户端添加“close”事件处理函数
client.on('close', function() {
    console.log('Connection closed');
});
