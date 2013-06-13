var works = $("#works");
var workarray = works[0].children;

works.isotope({
	itemSelector:".work-in-a-box",
})



$(".work-in-a-box").each(function(i,obj){
	obj.setAttribute("data-index", i);
	
	obj.addEventListener("click",function(e){

		e.preventDefault();
		console.log(i);
		var open = obj.getAttribute("data-open");
		
		if(open){
			var el = document.getElementsByClassName("work-in-a-box data")[0];
			works.isotope("remove",$(el));
			
			obj.removeAttribute("data-open");
			works.isotope("reLayout")
		
		
		}else{
			var elements = [];
			for(var a = 0;a<workarray.length;++a){
				elements.push(workarray[a]);
			}
			
			var div = document.createElement("div");
			div.className = "work-in-a-box mini-work data";
	
			//div.className = "mini-work";
			
			var loc = parseInt(obj.getAttribute("data-index"));
			loc += 1;
		
			elements.splice(loc ,0,div);
			works[0].innerHTML = ""
			
			works.isotope("insert",$(elements));		
			
			
			works.isotope("reLayout")
			
			obj.setAttribute("data-open", true)
		}
	})
})


