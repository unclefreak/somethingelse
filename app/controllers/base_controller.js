var AbstractController = require('mvc/lib/abstract_controller'),
	oo = require('mvc/lib/utils/oo'),
    util = require('util'),
    User = require('../models/user');

var BaseController = function(intent){
	this._initBaseController(intent);
};

BaseController.prototype = {
	_initBaseController: function(intent){
		AbstractController.call(this, intent);
	},
	_init: function(dispatchActionCallback){
        var self = this;
        var user = new User();
        user.existsByAPIKey(this._getAPIKey(), function(status, row){
            if(!status){
                self.exit({message: "U-ApiKey Incorrect"}, 403);
            }else{
                self.member = row;
                dispatchActionCallback(true);
            }
        });
	},

	_getAPIKey: function(){
		return this.request.getHeader('U-ApiKey'.toLowerCase());
	},

	_getMethod: function(){
		var method = this.intent.body.method;
		return method;
	},
	/**
	 * 未定义操作
	 * @private
	 */
	_undefinedAction:function(){
		var self = this;
        self.exit("Undefined Operation", 405);
	}
}

oo.extend(BaseController, AbstractController);

module.exports = BaseController;