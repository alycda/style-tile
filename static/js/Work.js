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
			var content = obj.parentNode.children[0].children[1];
			
			//add a arrow indicating which item was clicked "open"
			var arrow = content.getElementsByClassName("arrow")[0];
			arrow.style.marginLeft = e.x - works.offset().left + "px";
			div.innerHTML = content.innerHTML;
			
			
			
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


