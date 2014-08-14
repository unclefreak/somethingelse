var BaseModel = require('./base_model');

var Product = function(options){
	this._initProduct(options);
};

Product.prototype = {
	_initProduct: function(options){
		BaseModel.call(this, options);
		this.tableName = Product.tableName;
	}
};

Product.tableName = 'yl_products';