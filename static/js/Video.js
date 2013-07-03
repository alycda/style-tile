/**
	This is a class that lets you hook into the Vimeo player api. 
	It will be notified of various events that happen when you
	interact with the player, and will trigger the appropriate callback 
	when necessary. 
	
	There is a odd issue with Vimeo's "Froogaloop" JS class where, 
	when trying to interact with multiple videos on the same page, 
	events are only sent to one of the videos. That being the case, 
	this is a bit of a hack. 
	
	To use, just pass in a object with a series of callbacks for the 
	events you want to listen to. 
	
	You can find the list of possible events at 
	http://developer.vimeo.com/player/js-api
	
	To set up your HTML, you can just use the embed code on every Vimeo video
	but remember to add "?api=1" to the end of the src url as well as give the 
	iframe a id, as that gets passed back to your callback functions in order 
	to differentiate one video from another.
	
	by Joseph Chow
*/


var Video = function(_params){
	
	/**
		Standard params to look for
	*/
	var _standards = {
		iframeSelector:"vimeo-video",
		container:"video",
		events:["play","pause","finish"]
	}
	
	//prep the params object
	this.params = {};
		
	//reference to the Video object needed as you'll see below	
	var parent = this;
	
	
	//build the params object
	if(_params !== undefined){
		
		for(var i in _standards){
		
		   //if _params already specified something, ignore it.
		   if(_params[i] !== _standards[i]){
				_params[i] = _standards[i];
		   }
		}
		
		//build params
		this.params = _params;
		
	}
	
	//look in page for all iframes with the specific classname mentioned in params, otherwise just grab every iframe.
	this.data = document.getElementsByClassName(this.params.iframeSelector) ? document.getElementsByClassName(this.params.iframeSelector) : document.getElementsByTagName("iframe");
	
	
	//set the window to listen for messages passed back by Vimeo
	window.addEventListener("message",function(e){
		var data = JSON.parse(e.data);
		parent.onMessage(data,parent);
		
	},false);
	

	

}

Video.prototype = {
	
	onMessage:function(e,_class){
		
		switch(e.event){
		
			/**	
				Normally we would need to have cases set up for 
				all the other events but since we've included 
				FroogaLoop lib, we just need to have something
				for the "ready" case as the lib will take 
				care of everything else.
			*/
			
		
			case "ready":
				 //fire ready callback, for testing
				_class.params.ready(e.player_id);
				
				//setup the other event listeners
				for(var i = 0;i<this.data.length;++i){
				    var play = _class.params.play !== undefined ? _class.params.play : undefined;
				    var pause = _class.params.pause !== undefined ? _class.params.pause : undefined;
				    var finish = _class.params.finish !== undefined ? _class.params.finish : undefined;
				    
				    if(play !== undefined){
				    	$f(this.data[i]).addEvent("play",function(){
				    		play(e.player_id)
				    	});
				    }	
				    
				    if(pause !== undefined){
				    	$f(this.data[i]).addEvent("pause",function(){
				    		pause(e.player_id)
				    	});
				    }
				    
				    
				    if(finish !== undefined){
				    	$f(this.data[i]).addEvent("finish",function(){
				    		finish(e.player_id)
				    	});
				    }	
				}
	
				
			break;
			
		}
	
	},
	
	
	getVideo:function(_params,_anchor){
		var params = _params !== undefined || _params.id !== undefined ? _params : false;
		
		if(params === false){
			alert("No video id is available ");
			return;
		}
		
		var ele = document.createElement("iframe");
		
		//baseurl 
		var base = "http://player.vimeo.com/video";
		var id = params.id;
		var options = "?api=1";
		var additionalOptions = {};
		for(var i in params){
			if(params[i] === false){
				additionalOptions[i] = "&" + i + "=" + 0;
			}
		}
		
		//build query
		var url = base + "/" + id + "/" +options;
		
		
	}		
};

/**
	Some static functions.
*/
Video.getQuote = function(_id){
	var video = document.getElementById(_id);
		var parent = video.parentNode;
		var quote = parent.getElementsByClassName("video-quote")[0];
		
		return quote;
}