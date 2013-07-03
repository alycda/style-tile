/*
	Mobile Debugger
	
	Hopefully can one day resize the browser automatically.
*/

(function(window){
	
	//load webfont
	WebFontConfig = {
    	google: { families: [ 'Raleway:400,200,300:latin' ] }
	};
  
	var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
   
	
	
	/*========================
		SET ELEMENTS
	========================*/
	
	var size = document.createElement("div")
	size.style.position = "absolute";
	size.style.top = 100 + "px";
	size.style.fontFamily = "Raleway";
	size.style.fontWeight = 200;
	size.style.right = 0;
	size.style.zIndex = 99999;
	size.style.padding = "20px";
	size.id = "SIZE";
	size.style.background = "#333";
	size.style.color = "#fff";
	var height = document.createElement("p");
	height.style.lineHeight = 10 + "px";
	height.innerHTML = "Current window height : " + window.innerHeight;
	
	var width = document.createElement("p");
		width.style.lineHeight = 10 + "px";
	width.innerHTML = "Current window width : " + window.innerWidth;
	
	
	
	/**
		General Phone sizes
	*/
	var phonesizes = {
		iphone:{
			height:768,
			width:1024,
		},
		
		"Retina Iphone":{
			height:100,
			width:100
		}
	}
	
	var p = document.createElement("p");
	p.style.fontFamily = "Raleway";
	p.style.fontWeight = 200;
	p.innerHTML = "Pick a common phone size";
	p.style.lineHeight = 10 + "px"
	p.style.borderTop = "solid 1px #d1d1d1";
	p.style.paddingTop = 20 + "px";
	var sizes = document.createElement("select");
	for(var i in phonesizes){
		var option = document.createElement("option");
		option.setAttribute("value", i);
		option.innerHTML = i;
		sizes.appendChild(option);
	}
	
	
	//window.mobileDebug = true;
	size.appendChild(width);
	size.appendChild(height);
	size.appendChild(p);
	size.appendChild(sizes);
	if(window.mobileDebug){
			document.getElementsByTagName("body")[0].appendChild(size);		
	}

	
	window.addEventListener("resize",function(){	
		height.innerHTML = "Current window height : " + window.innerHeight;
		width.innerHTML = "Current window width : " + window.innerWidth;
	
	})
	
	sizes.addEventListener("change",function(e){
	
	});
})(window)



/**
	This creates the designed hover animation for various elements in the site.
	
	Your HTML should be in this format. You can swap the class names out if need be.


	<div class="leader creative" id="alastair_green" data-name="Alastair Green" data-title="Exectutive Creative Director" data-twitter="helvetacor">
			<img src="{{STATIC_URL}}/img/leaders/bw/alastair_green_bw.jpg"/>
			<img class="color" src="{{STATIC_URL}}/img/leaders/alastair_green.jpg"/>
			<div class="content">
						 I have over 13 years of digital advertising experience working for top Agencies in San Francisco, New York and London. This includes acting as lead creative on large websites and advertising campaigns for companies like Marriott, Lexus, Microsoft, Nortel, Cisco, American Express, GlaxoSmithKline, Kodak and Nestlé. My work has included pioneering efforts in social marketing, digital outdoor and digital video.
			</div>
			
			<div class="caption">
				<div>
					<h1 class="caption-title">Alastair Green</h1>
					<h2 class="italic subheader caption-subtitle">Executive Creative Director</h2>
				</div>
			</div>
		
		</div>

*/

var TOneHover = {
	init:function(_selector){
		if(!_selector){
			var leaders = document.getElementsByClassName("leader");
		}else{
			var leaders = $(_selector);			
		}
		
		
		
		for(var i = 0;i<leaders.length;++i){
			var leader = leaders[i];
			
			//var caption = leader.getElementsByClassName("caption")[0];
			var images = leader.getElementsByTagName("img");
			
			var color = images[1];
			var gray = images[0]
			
		
			
			color.addEventListener("mouseover",function(){
				var caption = this.parentNode.getElementsByClassName("caption")[0];		
			
			
				$(caption.children[0]).addClass("hover");	
				$(caption.children[0].children[1]).addClass("hover");	
				$(caption).addClass("hover");
			
				$(leader).addClass("active");
			});
			
			
			
			color.addEventListener("mouseout",function(e){
				
				var caption = this.parentNode.getElementsByClassName("caption")[0];		
				
				
	
			
				$(caption.children[0]).removeClass("hover");
						$(caption.children[0].children[1]).removeClass("hover");			
				$(caption).removeClass("hover");	
			
			
			})
							
				
		}

	}
				
				
				
}

