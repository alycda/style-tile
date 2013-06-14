
var test = [];



var People = function(_params,_callback){

	/*
		Params:
		pretty straightforward. 
		Ajax image loading is false by default, but
		can either be set to true or 
		just pass in a callback
	*/
	this.params = _params !== undefined ? _params :{
		className:"leader",
		height:257,
		width:215,
		anchor:"people",
		people:[],
		currentFilter:"none",
		ajax:false
	}
	

	
	if((this.params.ajax) || (_callback !== undefined)){
		this.init(_callback);
	}else{
		this.init();
	}
	
};


People.prototype = {
	init:function(_callback){
		var people = document.getElementsByClassName(this.params.className);
		var peoplelen = people.length;
		
		
		
		for(var i = 0;i<peoplelen;++i){
			
			var person = people[i];
					var parent = this;
			if(!_callback){
				var image = person.children[0];
				var canvas = document.createElement("canvas");
				var ctx = canvas.getContext("2d");
			
				canvas.setAttribute("width",parent.params.width);
				canvas.setAttribute("height",parent.params.height);
			
				ctx.drawImage(image,0,0);
				document.getElementById(parent.params.anchor).appendChild(canvas);
				
				parent.params.people.push({
					name:person.getAttribute("data-name"),
					ctx:ctx
				})
				
			}else{
				var image = new Image();
				img.src = person.getAttribute("data-image");
		
				img.onload = function(){
					var canvas = document.createElement("canvas");
					var ctx = canvas.getContext("2d");
					
					canvas.setAttribute("width",parent.params.width);
					canvas.setAttribute("height",parent.params.height);
					
					ctx.drawImage(img,0,0);
					document.getElementById(parent.params.anchor).appendChild(canvas);
					
					parent.params.people.push({
					    name:person.getAttribute("data-name"),
					    canvas:canvas,
					    ctx:ctx
					})
					
					//call callback and pass in main Object as the param.
					_callback(parent);
				}
			}
			
			
			/*
				var canvas = document.createElement("canvas");
				var ctx = canvas.getContext("2d");
			
				canvas.setAttribute("width",parent.params.width);
				canvas.setAttribute("height",parent.params.height);
			
				ctx.drawImage(img,0,0);
				document.getElementById(parent.params.anchor).appendChild(canvas);
				
				parent.params.people.push({
					name:person.getAttribute("data-name"),
					canvas:canvas,
					ctx:ctx
				})
*/			

		}
		
		
	}, //end init
	
	
	addFilter:function(_filtername,_params){
		if(this.params.people.length <= 0){
		
			var cats = document.getElementsByClassName("test-div");
			catslen = cats.length;
			for(var i = 0;i<catslen;i+=1){
				var person = cats[i];
				
				var ctx = person.ctx;
				
				
				switch(_filtername){
					case "grayscale":
						gray(ctx);
					break;		
				};
			
			}
		}else{
			
			//re-alias some variable names to make things easier
			var peoplelen = this.params.people.length;
			var people = this.params.people;
			var width = this.params.width;
			var height = this.params.height;
			
			for(var i = 0;i<peoplelen;i+=1){
				var person = people[i];
				
				var ctx = person.ctx;
				
				
				switch(_filtername){
					case "grayscale":
						gray(ctx);
					break;		
				};
			
			}

		}	
		
		/**=====================
			Filters
		=======================*/
	
		//grayscale
		function gray(ctx){
			var imagedata = ctx.getImageData(0,0,500,500);
			var pixels = imagedata.data;
			
			for(var i = 0;i< (500 * 500) * 4; i += 4){
				var red = pixels[i];
				var green = pixels[i + 1];
				var blue = pixels[i + 2];
				
				var gray = (pixels[i] * .3) + (pixels[i + 1] * .59) + (pixels[i + 2] * .11);
				
				pixels[i] = gray;
				pixels[i + 1] = gray;
				pixels[i + 2] = gray;
				pixels[i + 3] = 255;
			}
			ctx.putImageData(imagedata,0,0)
					
		}
		
		
	},
	
	
	testDivs:function(_num,_code){
		for(var i = 0;i<_num;++i){
			var div = document.createElement("div");
			div.style.height = 257 + "px";
			div.style.width = 215 + "px";
			div.style.display = "inline-block";
			div.className = "test-div";
			if(!_code){
				div.innerHTML = [
				//"<div class=\"leader creative\" id=\"elizabeth_brownsen\" data-name=\"Elizabeth Brownsen\" data-title=\"Exectutive Director\">",
				"<img src=\"http://placekitten.com/215/257\"/>",
				//"</div>"].join("");]
				];
		
			}else{
				div.innerHTML = _code;
			}
			
			
			var parent = this;
			document.getElementById(parent.params.anchor).appendChild(div);
					
		}
		
		
	}
};







var p = new People();
//p.testDivs(100);
p.addFilter("grayscale");
