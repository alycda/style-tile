var Social = function(_params){
	this.params = _params !== undefined ? _params : {};
	
	this.twitter = this.params.twitter;
	this.instagram = this.params.instagram;
	this.facebook = this.params.facebook;
	this.google = this.params.google;
	this.keys = {};
};



Social.Prototype = {
	/*=================	
		General
	==================*/
	getKeys:function(){
		$.ajax({
			//ideally this gets placed in a sandboxed folder
			url:"/settings.json",
			success:function(data){
				
			},
			
			error:function(e){
				console.log(e)
			}
		})	
	},
		
};