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
        //if is user api key
        if(!this.getHeader(BaseController.U_API_KEY) && !this.getHeader(BaseController.P_API_KEY)){
            this.exit({error: 'Miss Api Key'}, 406);
            return;
        }

        if(this.getHeader(BaseController.U_API_KEY)){
            user.existsByAPIKey(this.getHeader(BaseController.U_API_KEY), function(status, row){
                if(status){
                    self.member = row;
                    self.emit('dispatchAction', {status: true});
                }else{
                    self.exit({message: "Api Key Incorrect"}, 403);
                }
            });
        }

        //if is product api key
        if(this.getHeader(BaseController.P_API_KEY)){
            this.emit('dispatchAction', {status: true});
            return;
        }
        user.existsByAPIKey(this._getAPIKey(), function(status, row){
            if(!status){
                self.exit({message: "U-ApiKey Incorrect"}, 403);
            }else{
                self.member = row;
                dispatchActionCallback(true);
            }
        });
	},

    getHeader: function(key){
        return this.request.getHeader(key);
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

BaseController.U_API_KEY = 'u-apikey';
BaseController.P_API_KEY = 'p-apikey';

module.exports = BaseController;