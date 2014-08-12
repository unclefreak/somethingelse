var fs = require('fs');
var parseString = "{}\\\"";
var os = "{}\"";

var inputStack = [];
var outputStack = [];
fs.readFile("./sample.js", function(err, data){
	console.log(JSON.stringify(data.toString()));
	var prev = '';
	for(var i = 0, len = data.length; i < len; i++){
		var current = data[i];
		outputStack.push(current);
		if(prev == ''){
			if(current == parseString.charCodeAt(0)){
				inputStack.push(current);
			}else{
				console.log(current, parseString.charCodeAt(0));
				throw "ERROR FORMAT";
			}
		}else{
			if(os.indexOf(String.fromCharCode(current)) > -1 && prev != parseString.charCodeAt(2)){
				console.log(current);
				if(inputStack[inputStack.length - 1] == current && current == parseString.charCodeAt(3)){
					inputStack.pop();
				}else if(inputStack[inputStack.length - 1] == parseString.charCodeAt(0) && current == parseString.charCodeAt(1)){
					inputStack.pop();
				}else{
					inputStack.push(current);
				}
				if(inputStack.length == 0){
					console.log('complete', i, data.length);
					break;
				}
			}
		}
		
		prev = current;
	}

	console.log(inputStack);
	console.log(new Buffer(outputStack).toString());
});