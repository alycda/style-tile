var works = $("#works");
var workarray = works[0].children;

works.isotope({
	itemSelector:".work-in-a-box",
})

//helps to make sure only one piece can be seen at a time.
var contentopen = false;

$(".work-in-a-box").each(function(i,obj){

	//set the index as a attribute as it'll play into things later
	obj.setAttribute("data-index", i);
	
	obj.addEventListener("click",function(e){
		
		

		//see if the object we clicked on is "open"
		var open = obj.getAttribute("data-open");
		
		//if it's open and contentopen is not false, init closing process.
		if((open)&&(contentopen)){
			//get the elment
			var el = document.getElementsByClassName("work-in-a-box data")[0];
			works.isotope("remove",$(el));
			obj.removeAttribute("data-open");
			works.isotope("reLayout")
		
			//recent contentopen
			contentopen = false;
			
		//otherwise start oepn process
		}else if(contentopen == false){
			contentopen = true;
			var elements = [];
			for(var a = 0;a<workarray.length;++a){
				elements.push(workarray[a]);
			}
			
			var div = document.createElement("div");
			div.className = "work-in-a-box mini-work data";
			
			//get content
			/**
				Within each work item, set just ONE div and inside of that
				put all the content/markup you want
			*/
		
			var content = obj.children[0].children[0];
	
			console.log(content);
			//add a arrow indicating which item was clicked "open"
			if(content !== undefined){
				var arrow = content.getElementsByClassName("arrow")[0];
				console.log(arrow);
				/**
				    Chrome has acess to a "x" property, 
				    but may not exist in all browsers. 
				    First set to clientX if "x" doesn't exist
				*/
				var offset = e.x !== undefined ? e.x : e.clientX;
				
				//if clientX doesn't exist, then use pageX
				if(offset == undefined){
				    ofset = e.pageX;
				}
				
				arrow.style.marginLeft = offset - works.offset().left + "px";
				arrow.style.marginTop = -20 + "px"
				div.innerHTML = content.innerHTML;
			
			
			
			}
			
			
		
			
			
			
			var loc = parseInt(obj.getAttribute("data-index"));
			loc += 1;
			
		
			elements.splice(loc,0,div);
			works[0].innerHTML = "";
			
			works.isotope("insert",$(elements));				
			works.isotope("reLayout")
			obj.setAttribute("data-open", true)
		}
	})
})


