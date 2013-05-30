//randomize item sizes
var elements = document.getElementsByClassName("item");
for(var i = 0;i<elements.length;i++){
	el = elements[i];
	
	var r = Math.floor(Math.random() * 255);
	var g = Math.floor(Math.random() * 255);
	var b = Math.floor(Math.random() * 255);
	
	//el.style.width = Math.floor(Math.random()*300) + "px";
//	el.style.height = Math.floor(Math.random()*300) + "px";
	el.children[0].style.background = "rgba(" + r + "," + g + "," + b + ",1.0)";
}


//setup Packery
var container = document.getElementById("container");
var packery = new Packery(container,{
	itemSelector:".item",
});






var filter = document.getElementById("filter");
filter.addEventListener("change",function(e){

	var selected = e.target.options[e.target.selectedIndex].value;
	
	for(var i = 0;i<elements.length;i++){
		el = elements[i];
		
		//hide all the elements that don't match the selected class
		if(el.className.search(selected) === -1){
			  classie.toggle( el, 'hide' );
			  classie.toggle( el.children[0], 'hide' );
		}
		
		//restore any elements that may have been hidden but match
		if((el.className.search(selected) !== -1)&&(el.className.search("hide") !== -1)){
		    classie.toggle( el, 'hide' );
		    classie.toggle( el.children[0], 'hide' );
			console.log("need to restore");
		}
		
		//restore all
		if(e.target.selectedIndex === 0){
			  classie.removeClass( el, 'hide' );
			    classie.removeClass( el.children[0], 'hide' );
		}
		
	}
	
	packery.layout();
		packery.layout();
	packery.reloadItems();
	
})


function Hexagon(_image,_radius,_bordercolor){
	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");
	
	this.domElement = this.canvas;
	
	this.radius = _radius || "";
	this.border = _bordercolor || "#333"
	this.image = _image || "";
	this.init();
	
}


Hexagon.prototype = {
	init:function(){
		var ctx = this.ctx;
		
		
	},
	
	draw:function(){
		
	},
	
	pushMatrix:function(){
		this.ctx.save();
	},
	
	popMatrix:function(){
		this.ctx.restore();
		
	}
};