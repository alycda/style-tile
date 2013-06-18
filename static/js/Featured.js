/**
	Need to init foundation out side of the normal methods 
	because we need access to the slider later on for 
	clickable thumbnails.
	
	Needs either foundation.min.js or the seperate components of
	foundation and foundation.orbit.min
*/


var Slider = {
	eventTypes:["click","touchesmoved"],
	init:function(_options){
		if(_options !== undefined){
			var slider = Foundation.libs.orbit.init("data-orbit",_options);
		}else{
			var slider =  Foundation.libs.orbit.init("data-orbit",function(_slides){
				console.log(_slides);
			});
		}
	
		this.slider = slider;
		return this;
		
		
	},
	
	getSlides:function(){
		var el = document.getElementsByClassName("slider")[0];
		var slides = el.children;
		var cloned = [];
		
		var container = [];
		for(var i = 0;i<slides.length;++i){
			container.push(slides[i]);
			
		}
		container.reverse();
		for(var i = 0;i<container.length;++i){
			
			var clone = container[i].cloneNode(true);
			clone.className = "slide-thumb";
			clone.setAttribute("data-index", i);
			cloned.push(clone);	
		}
		this.slides = cloned;
	
		return this;
	},
	
	setThumbnails:function(_anchor){
		if(typeof _anchor === "object"){
			for(var i = 0;i<this.slides.length;++i){
				_anchor.append(this.slides[i]);
			}
		}else{
			var box = document.getElementById(_anchor);
			for(var i = 0;i<this.slides.length;++i){
				box.appendChild(this.slides[i]);
			}
		}	
	},
	
	addEvent:function(_type,_callback){
		var eventTypes = this.eventTypes;
		var parent = this;
	
		for(var i = 0;i<eventTypes.length;++i){
			if(_type == eventTypes[i]){
				for(var a = 0;a<this.slides.length;++a){
					this.slides[a].addEventListener(eventTypes[i],function(e){
						_callback(e.target.parentNode,parent.slider);
					});
					
				}
			}
		}	
	},
	
	goTo:function(_index){
		this.slider._goto($("slider"),_index);
	}	
	
};




Slider.init();
Slider.getSlides();
Slider.setThumbnails("slider-nav");
Slider.addEvent("click",function(_slide,_slider){
	_slider._goto($(".slider"),$(_slide).index());
})
/*================================
	For the featured case studies
================================*/

var slidernav = document.getElementById("slider-nav");
slidernav.addEventListener("click",function(e){
	

	if(($(slidernav).hasClass("active")) && (e.target.tagName === "DIV")){
		$(slidernav).animate({
			bottom:-155
		})
		$(".orbit-bullets").fadeIn("slow");
		$(slidernav).removeClass("active")
	}else{
		if(e.target.tagName === "DIV"){
			$(slidernav).animate({
				bottom:-40
			})
			$(".orbit-bullets").fadeOut("slow");
			$(slidernav).addClass("active");
		}
	}
	
	
});