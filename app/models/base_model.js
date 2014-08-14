var oo = require('mvc/utils/oo'),
	AbstractModel = require('mvc/lib/abstract_model');

var ModelBase = function(options){
    this._initModelBase(options);
};

ModelBase.prototype = {
    _initModelBase: function(options){
	    AbstractModel.call(this, options);
	    this.tableName = '';
    },

	retrieveData: function(pairs){
		var sql = "select * from " + this.tableName + " where ";
		this.getDb().fetchAll(sql, function(err, rows){
			this.emit('retrieveData', {err: err, rows: rows});
		});
		this.emit('retrieveData');
	},

    getTableInfo: function(tableName){

    },

    loadRawData: function(data){

    },

    cleanData: function(data){

    }
};

oo.extend(ModelBase, AbstractModel);

module.exports = ModelBase;