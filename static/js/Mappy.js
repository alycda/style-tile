var Mappy = function(_params,_options){
	this.options = _options !== undefined ? _options : {}
	this.params = _params !== undefined ? _params :{
		mapAnchor:"map"
	}
	
	for(var i in this.params){
		if((this.params[i] == undefined) || (this.params[i] == null) || (this.params[i] == "")){
			this.params[i] == _params[i];
		}
	}
	
	
	//this.map = new google.maps.Map(this.params.mapAnchor, this.options);	
}

Mappy.prototype = {
	setOptions:function(_options){
		this.options = _options;
	},
	
	addEvent:function(_type,_callback){
		google.maps.event.addDomListener(window,_type,function(){
			_callback();
		})
	}
};