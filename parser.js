var util = require('./oo');
var EventEmitter = require('events').EventEmitter;

var Parser = function(){
	this.inputStack = [];
	this.outputStack = [];
	this.prev = '';
	this.current = '';
	this._initParser();
};


Parser.prototype = {
	
	_initParser: function(){
		EventEmitter.call(this);
	},

	ps: "{}\\\"",
	os: "{}\"",
	pushData: function(data){
		for(var i = 0, len = data.length; i < len; i++){
			this.current = data[i];
			this.outputStack.push(this.current);
			if(this.prev == ''){
				if(this.current == this.ps.charCodeAt(0)){
					this.inputStack.push(this.current);
				}else{
					//throw "ERROR FORMAT";
					console.log('Wrong char, drop it.');
					this.outputStack.shift();
					continue;
				}
			}else{
				if(this.os.indexOf(String.fromCharCode(this.current)) > -1 && this.prev != this.ps.charCodeAt(2)){
					if(this.inputStack[this.inputStack.length - 1] == this.current && this.current == this.ps.charCodeAt(3)){
						this.inputStack.pop();
					}else if(this.inputStack[this.inputStack.length - 1] == this.ps.charCodeAt(0) && this.current == this.ps.charCodeAt(1)){
						this.inputStack.pop();
					}else{
						this.inputStack.push(this.current);
					}

					if(this.inputStack.length == 0 && this.outputStack.length != 0){
						this.emit('request', new Buffer(this.outputStack));
						this.outputStack = [];
						this.prev = '';
						//break;
					}
				}
			}

			this.prev = this.current;
		}
	}
};
util.extend(Parser, EventEmitter);

module.exports = Parser;

