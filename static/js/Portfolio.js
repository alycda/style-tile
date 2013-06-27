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
	{
		width:178,
		height:78
	},
	
	{
		width:290,
		height:206
		
	}
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

var bigcount = 0;


for(var a = 0;a<featured.length;++a){

	var big = Math.floor(Math.random() * featured.length);
	var rand = Math.floor(Math.random() * 2);
	var work = featured[big].children[0].cloneNode(true);
	
	
	if((rand == 1) && (bigcount < 2)){
	
		work.style.height = sizes[1].height + "px";
		work.style.width = sizes[1].width + "px";	
		work.style.background = "#ffa600";		
		bigcount++;
	}else{
			work.style.height = sizes[0].height + "px";
	work.style.width = sizes[0].width + "px";	
	work.style.background = "#ffa600";	
	}
	
	//append to featured div
	document.getElementById("featured-work").appendChild(work);
	
};//end outter for loop


//take the first 2, those will be giant
//var one = featured[0].children[0].cloneNode(true);
//var two = featured[1].children[0].cloneNode(true);



/*========================== SETUP REGULAR===========================*/
var regularlen = regular.length;
var works = document.createElement("div");
works.style.width = 1024 + "px";
works.style.marginLeft = 50 + "px"

for(var b = 0;b<regularlen;++b){
	var work = regular[b].children[0].cloneNode(true);
	
	
	
	//get a size to use
	var size = 180;
	

	//set the size of each featured work
	work.style.height = size + "px";
	work.style.width = size + "px";
	work.style.background = "#ffa600";
	
	
	works.appendChild(work);


	
};//end outter for loop

	
	//append to regular div
	document.getElementById("regular-work").appendChild(works);


//init isotope
$("#featured-work").isotope({
	itemSelector:".work"
});

$("#featured-work").isotope("reLayout");

/*========================== Utility Function ============================*/
function getSize(){
	return sizes[Math.floor(Math.random()*sizes.length)];
}

function clone(_el){
	return _el.cloneNode(true);
}