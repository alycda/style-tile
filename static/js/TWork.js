/**
	This bit of code was used in a project involving isotope. 
	It was for a portfolio page and the idea was that when you 
	click on a particular piece of work, a little mini-profile would 
	pop out.
	
	To do that, I needed to figure out a good point to insert that
	new content, logically speaking it would go nicely at the end of that
	item's row. 
	
	This figured out what index that was.
*/

var works = $("#works");
var work = document.getElementsByClassName("work");


works.isotope({
	itemSelector:".work",
})

//get a array of all the elements within the list
var all = toArray(document.getElementsByClassName("work"));
	
//helps to make sure only one piece can be seen at a time.
var contentopen = false;


/**======================================================
	Gonna try to position the appended container 
	underneath the one clicked on. 
	
	To do that, we need some values from the stylesheet
======================================================*/
var stylesheet = getStylesheet("style")[0].rules || getStylesheet("style")[0].cssRules;


//get the width of each work thumb
var style = getStyle(stylesheet,".work");
var work_width = findRule("width",style).split(":")[1];
var work_height = findRule("height",style).split(":")[1];
work_height = parseInt(work_height);
work_width = parseInt(work_width);

box_width = works.width();
box_height = works[0].style.height;


$(window).on("resize",function(){
	box_width = works.width();
	orderIndex(true);
});





orderIndex();





/*============== START LOGIC ======================*/
$(".work").on("click",function(e){
	var item = e.target;
	var index = e.target.getAttribute("data-index");
	
	
	//get the point of insertion of the content div
	var insert_point = getRow(index);
	insert_point+=1;
	
	var open = item.getAttribute("data-open");

			//see if the object we clicked on is "open"
		//var open = obj.getAttribute("data-open");
		
		//if it's open and contentopen is not false, init closing process.
		if((open)&&(contentopen)){
			//get the elment
			var el = document.getElementsByClassName("work mini-work")[0];
			works.isotope("remove",$(el));
			item.removeAttribute("data-open");
			works.isotope("reLayout")
		
			//recent contentopen
			contentopen = false;
			
			console.log("closing item "+ item.getAttribute("data-index"));
			
		//otherwise start oepn process
		}else if(contentopen == false){
			contentopen = true;
			console.log("opening item "+ item.getAttribute("data-index"));
			
		//build the content box
		var content = document.createElement("div");
		content.style.width = "1024px";
		content.style.height = "500px";
		content.style.background = "red";
		content.className = "work mini-work";
		
		
		//make a copy of the content and make it visible
		var list = item.children[0].cloneNode(true);
		list.style.display = "block";
		list.setAttribute("data-orbit", "");

		
	
		//set the content box's html
		content.appendChild(list);
		
		
		
		all.splice(insert_point,0,content);
		works[0].innerHTML = "";
		works.isotope("insert",$(all));				
		works.isotope("reLayout")
	
	
		//init orbit
		$(document).foundation("orbit")
			item.setAttribute("data-open", true)
			
			
		}

});


function toArray(_nodelist){
	var arr = [];
	for(var i = 0;i<_nodelist.length;++i){
		arr.push(_nodelist[i]);
	}
	
	return arr;
}

/*============== UTILITY FUNCTIONS ======================*/
function getStylesheet(_indexorname){
	var index = _indexorname != undefined ? _indexorname : 0;

	if(typeof _indexorname == "Number"){
		var sheet = document.styleSheets[index].rules || document.styleSheets[index].cssRules;
		if(sheet == null){
			return false;
		}else{
			return sheet;
		}
	}else{
		var css = document.styleSheets;
		var sheet = [];
		for(var i = 0;i<css.length;++i){
			
			if(css[i].href !== null){
				if(css[i].href.search(index) !== -1){
					sheet.push(css[i]);
				}
			}
		}
		
		if(sheet.length > 0){
			return sheet;
		}else{
			return false;
		}
	}
	//var sheet = document.styleSheets[index].rules || document.styleSheets[index].cssRules;
	
	console.log(sheet);
}

function getStyle(_stylesheet,_classname){
	var style = [];
	for(var i = 0;i<_stylesheet.length;++i){
		if(_stylesheet[i].selectorText == _classname){
			style.push(_stylesheet[i]);
			
		}
	}
	
	//next try to parse styles out into more useable array format
	var text = style[0].cssText.replace("{", "");
	text = text.replace(_classname, "")
	.replace(" ","")
	.replace(" ","")
	.replace("}","")
	.replace(" ","")
	.split(";");
	
	return text;
}


function findRule(_rule,_style){
	for(var i = 0;i<_style.length;++i){
	
		
		if(_style[i].search(_rule) !== -1){
			return _style[i];
		}
	}
}


/*

	Based on the item you click on, this function
	figures out the ending index of that particular item's row.
*/

function getRow(index){
	//this is the number of items that can fit in a row
	var row = Math.floor(box_width / work_width);
	//var insertpoint = index + row;
	
	//this is the number of rows that the contents go vertically
	var v_row = Math.floor(parseInt(works[0].style.height) / work_height);
	
	// figure out which indicies mark the end of a row, this will
	// be the index to insert the "open" view for a item
	var ends = [];
	for(var i = 0;i<v_row;++i){
		ends.push(((row * i) + row) -1 );
	}
	
	
	//get the row we clicked on(Just take the first indice
	var possible = [];
	//now figure out what row we're on.
	for(var a = 0;a<ends.length;++a){
		if(index < ends[a]){
			possible.push(a+=1);
		}else if(index == ends[a]){
			//console.log(ends[a]);
			return ends[a];
			//possible.push(ends[a]);
		}
	}
	var end = ends[possible[0]-1];
	
	
	return end;
	//loop through to see if our value m
	
/*	
	//get the point where we attach the minibox
	if(possible[0] !== undefined){
		var end = ends[possible[0]-1];
	
	
		
	
	
		
				
	}else{
		console.log(ends[ends.length-1]);
		return ends[ends.length-1];
	}*/
}

function orderIndex(_clear){
	//set a index for each item
	$(".work").each(function(i,obj){
		
		if(_clear){
			obj.removeAttribute("data-index");
			obj.setAttribute("data-index", i);
		}else{
			//set the index as a attribute as it'll play into things later
			obj.setAttribute("data-index", i);
		}
	
		
	//	obj.innerHTML = i;
		
	});


}

function makeBox(){
	var div = document.createElement("div");
	div.style.width = box_width + "px";
	div.style.height = 400 + "px";
	div.style.background = "#ffa600";
	return div;
}