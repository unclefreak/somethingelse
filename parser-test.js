var fs = require('fs');
var Parser = require('./parser');
fs.readFile("./sample.js", function(err, data){
	var parser = new Parser();
	parser.on('request', function(body){
		console.log(body.toString());
		console.log('\r\n--------------\r\n')
	});
	parser.pushData(data);
});