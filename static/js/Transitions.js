var WorkItem = function(_params){
	this.domElement = document.createElement("canvas");
	this.ctx = this.domElement.getContext("2d");
	
	this.params = _params !== undefined ? _params : undefined;
	
	this.domElement.style.height = _params.height !== undefined ? _params.height : "200px";
	this.domElement.style.width = _params.width !== undefined ? _params.width : "200px";
	
	
	
	
	
	
};


WorkItem.prototype = {

	//NOTE THIS GETS CALLED LAST!!!! 
	setImage:function(_callback,_src){
		var img = new Image();
		var parent = this;
		if(!_src){
			var src = this.params.src;
		}else{
			var src = _src;
		}
		console.log(src);
		img.src = src;
		
		img.onload = function(){
			console.log("image loaded");	
			parent.ctx.drawImage(this,0,0);
			buffer = parent.ctx.getImageData(0,0,200,200);
			_callback(buffer);
			
		}
	},
	//please - jquery or id only
	append:function(_element){
	
	}
};//end prototype;