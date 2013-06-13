var works = $("#works");
var workarray = works[0].children;

works.isotope({
	itemSelector:".work-in-a-box",
})


$(".work-in-a-box").each(function(i,obj){
	obj.addEventListener("click",function(e){
		
		var elements = [];
		for(var a = 0;a<workarray.length;++a){
			elements.push(workarray[a]);
		}
		
		var div = document.createElement("div");
		div.className = "work-in-a-box";

	
		elements.splice(i,0,div);


		works[0].innerHTML = ""
	
		for(var b = 0;b<elements.length;++b){
			works.append(elements[b]);
		
		works.isotope("reLayout",function(){
			console.log("re-doing");
		});
		}		
		
		
	})
})

