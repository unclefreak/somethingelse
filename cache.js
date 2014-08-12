var CacheItem = function(key, value, ttl){
	this.key = key;
	this.value = value;
	this.ttl = ttl;
};

CacheItem.prototype = {
	_initCacheItem: function(){
		
	},
	
	canExpire: function(){
		return this.ttl && (typeof this.ttl == 'number');
	}
};

var Cache = {
	itemsTable: {},
	orderByStamp: {},
	add: function(key, value, ttl){
		var now = new Date().getTime();
		if(ttl > 0){
			var expire = ttl + parseInt(now / 1000);
			if(!this.orderByStamp[expire]){
				this.orderByStamp[expire] = [];
			}
			this.orderByStamp[expire].push(key);
		}
		
		var ci = new CacheItem(key, value, expire);
		this.itemsTable[key] = ci;
		
	},
	
	countDown: function(){
		var self = this;
		setInterval(function(){
			var now = parseInt(new Date().getTime() / 1000);
			if(self.orderByStamp[now]){
				var list = self.orderByStamp[now];
				for(var i = 0, len = list.length; i < len; i++){
					self.itemsTable[list[i]] && (delete self.itemsTable[list[i]]);
				}
				
				delete self.orderByStamp[now];
			}
		}, 1000);
	},
	
	remove: function(key){
		delete this.itemsTable[key];
	},
	
	get: function(key){
		if(this.itemsTable[key]){
			return this.itemsTable[key].value;
		}else{
			return null;
		}
		
	}
};

Cache.countDown();


module.exports = Cache;