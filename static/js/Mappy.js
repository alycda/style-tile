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
	
	
	//load the map	
	var parent = this;
	this.addEvent("load",function(){
		var options = {
		  	center:new google.maps.LatLng(33.918589, -118.393719),
		  	zoom:15,
		  	mapTypeId:google.maps.MapTypeId.ROADMAP
	  	}
		  this.map = new google.maps.Map(document.getElementById(parent.params.mapAnchor), options);	
		  
	})
}

Mappy.prototype = {
	setOptions:function(_options){
		this.options = _options;
	},
	
	addEvent:function(_type,_callback){
		google.maps.event.addDomListener(window,_type,function(){
			_callback();
		})
	},
	
	/**
		NOTE: THESE CAN ONLY BE CALLED AFTER THE LOAD EVENT
	*/
	addMarker:function(_address){
		var address = _address;
		var parent = this;
			console.log(this.map);	
		
		this.getAddress(_address,function(results){
			
			var marker = new google.maps.Marker({
				map:parent.map,
				position:results[0].geometry.location
			});
			
		})
	},
	
	
	getAddress:function(_address,_callback){
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({
			"address":_address
		},function(results,status){
			
			if(status == google.maps.GeocoderStatus.OK){
				_callback(results);
			}else{
				console.log("problem getting address coords");
				return;
			}
		})
	}
};