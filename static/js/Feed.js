var items = $("#items");
var item = $(".item");

var checkboxes = $(".custom.checkbox");

items.isotope({
	itemSelector:".item",
	  masonry : {
          columnWidth : 5
        },
        masonryHorizontal : {
          rowHeight: 120
        },
        cellsByRow : {
          columnWidth : 240,
          rowHeight : 240
        },
        cellsByColumn : {
          columnWidth : 240,
          rowHeight : 240
        }
})


//set some random values for the items

item.each(function(i,obj){
	
	//set height and width
	if((obj.className.search("news") !== -1)||(obj.className.search("blog") !== -1)){
		$(this).height(305);
		$(this).width(513);
	}else{
		$(this).height(147);
		$(this).width(256);
	}
	
	
	
	//set colors
	if((obj.className.search("news") !== -1)||(obj.className.search("blog") !== -1)){
		$(this).css("background","red");
	}else{
		
		if(obj.className.search("press") !== -1){
			$(this).css("background","#00aced");
		}
		if(obj.className.search("thinking") !== -1){
			$(this).css("background", "aqua" );
		}
		if(obj.className.search("social") !== -1){
			$(this).css("background","#437197");
		}
	}
	
	
})



//this is used to store the current checked selections
var newsort = [];
checkboxes.on("click",function(e){
	




	//get to the very beginning of the node
	var alpha = e.target.parentNode.parentNode.parentNode;

	//grab the text associated with the checkbox
	var filter = alpha.children[1].innerHTML.toLowerCase();
	
	//get "checked" or "not checked" status
	var checked = e.target.className.search("checked");
	
	//get all the checkboxes that aren't the all button
	var group = $(".checkbox-group").children();
	
	//item we clicked on
	var target = e.target;
	
	//if item is checked
	if(checked !== -1){
		/*
			If Filter != all, 
			then we do something, otherwise just 
			stop propagation
		*/
		if(filter == "all"){
			e.stopPropagation();
		}else{
			//loop through the group to see if any other items are checked
			for(var i = 0;i<group.length;++i){
				var status = group[i].getElementsByClassName("checkbox")[0];
				var _filter = group[i].getElementsByClassName("dropdown-title")[0].innerHTML.toLowerCase();
				
				
				if(status.className.search("checked") !== -1){
					if(_filter != filter){
						newsort.push("." + _filter)
					}
				}
				
				
			}
			
			if(newsort.length == 0){
				//remove "checked" status from all
				$("#allbox")[0].className = $("#allbox")[0].className + "checked"			
				//push newsort w/ item
				newsort.push(".item");
			}
			
		}
		
			
	
	//if item is not checked
	}else if(checked === -1){
	
		if(filter == "all"){
			//loop through the group and clear out any checkboxes
				
			//loop through the group to see if any other items are checked
			for(var i = 0;i<group.length;++i){
				var item = group[i].getElementsByClassName("checkbox")[0];
				
				
				item.className = item.className.replace("checked");
				
				
			}
			//push newsort w/ item
			newsort.push(".item");

			
		}else{
			//remove "checked" status from all
			$("#allbox")[0].className = $("#allbox")[0].className.replace("checked", "");
			
			
			//loop through the group to see if any other items are checked
			for(var i = 0;i<group.length;++i){
				var status = group[i].getElementsByClassName("checkbox")[0];
				var _filter = group[i].getElementsByClassName("dropdown-title")[0].innerHTML.toLowerCase();
				
				
				if(status.className.search("checked") !== -1){
					newsort.push("." + _filter)
				}
				
				
			}
			newsort.push("." + getFilter(e.target));
			
		}
		
		
		
		
	}
	
	if(newsort.length > 1){
		newsort = newsort.join(",");
	}else{
		newsort = newsort[0]
	}
	console.log(newsort);
	
	items.isotope({
		filter:newsort
	})
	
	items.isotope("reLayout");
	
	//reset the sorting array
	newsort = [];
	
	
	
})


function getFilter(target){
	return target.parentNode.parentNode.parentNode.children[1].innerHTML.toLowerCase()
}

	items.isotope({
		filter:".item"
	})
	
	items.isotope("reLayout");
	
