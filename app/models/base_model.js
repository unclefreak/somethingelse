var oo = require('mvc/utils/oo');

var ModelBase = function(options){
    this._initModelBase(options);
};

ModelBase.prototype = {
    _initModelBase: function(options){
		this.options = oo.mix({

		}, this.options);
	    this.options = oo.mix(this.options, options);
    },

	retrieveData: function(pairs){

	},

    getTableInfo: function(tableName){

    },

    loadRawData: function(data){

    },

    cleanData: function(data){

    }
};