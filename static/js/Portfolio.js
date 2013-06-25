var all = document.getElementsByClassName("content");
var alllen = all.length;



/*========================== SETUP ============================*/

//arrays to store Featured and non Featured work
var featured = [];
var regular = [];

// possible sizes for each piece of work
// note: assuming square shape, hence the one value
// All based on values from 1024px
var sizes = [
	128,
	256,
	//512,
	//1024
]

//first split into Feature and non Featured work
for(var i = 0;i<alllen;++i){
	if(all[i].getAttribute("data-featured") == "true"){
		featured.push(all[i]);
	}else{
		regular.push(all[i]);
	}
}




/*========================== SETUP FEATURED ============================*/
var featuredlen = featured.length;
for(var a = 0;a<featuredlen;++a){
	var work = featured[a].children[0].cloneNode(true);
	
	
	
	//get a size to use
	var size = getSize();
	

	//set the size of each featured work
	work.style.height = size + "px";
	work.style.width = size + "px";
	work.style.background = "#ffa600";
	

	
	//append to featured div
	document.getElementById("featured-work").appendChild(work);
	
};//end outter for loop



/*========================== SETUP REGULAR===========================*/
var regularlen = regular.length;
for(var b = 0;b<regularlen;++b){
	var work = regular[b].children[0].cloneNode(true);
	
	
	
	//get a size to use
	var size = 190;
	

	//set the size of each featured work
	work.style.height = size + "px";
	work.style.width = size + "px";
	work.style.background = "#ffa600";
	

	
	//append to featured div
	document.getElementById("regular-work").appendChild(work);
	
};//end outter for loop




//init isotope
$("#featured-work").isotope({
	itemSelector:".work"
});



/*========================== Utility Function ============================*/
function getSize(){
	return sizes[Math.floor(Math.random()*sizes.length)];
}

function clone(_el){
	return _el.cloneNode(true);
}