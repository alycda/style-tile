/**
	This controls the subnav
*/
$("header#desktop nav ul li a").on("click",function(e){

	var link = e.target;
	
	var subnav = $("#subnav");
	var parent = link.parentNode.children;

	if(parent.length > 1){
		var link = $(link);
		
		if(subnav.hasClass("active")){
			//do a check to see if the link we click on is the same link. If it is,
			//hide the subnav, otherwise animate close, append new content, then re-show
			var sub = parent[1];
			
			//the subnav associated with the currently clicked on link
			var linksub = sub.getElementsByTagName("ul")[0].innerHTML;
			
			//current subnav being shown
			var currentsub = subnav[0].getElementsByTagName("ul")[0].innerHTML;
			
					
			/*
				If the current set of sublinks matches the set associated 
				with the link that was clicked on, 
				just hide the sub nav
			*/
			if(linksub == currentsub){
				subnav.animate({
					marginTop:-120
				},function(){
					subnav[0].innerHTML = "";
				})
				subnav.removeClass("active");
			//otherwise animate close and then re-open with new info	
			}else{
				subnav.animate({
				marginTop:-120
			},function(){
				var box = setContent(link);		
				subnav.append(box);
			})
			
				subnav.animate({
					marginTop:0
				})
			}
			
		}else{
			var box = setContent(link);
			
			subnav.append(box);
			
			subnav.animate({
				marginTop:0
			})
			
			subnav.addClass("active");
			
		}
	}
	
	function setContent(link){
		//grab the links that need to be shown
			var sublinks = link[0].parentNode.children[1];
			subnav[0].innerHTML = "";
			var box = document.createElement("div");
			box.innerHTML = sublinks.innerHTML;
			
			box.style.width = 960 + "px";
			box.style.margin = "0 auto";
			box.className = "desktop-sub-navigation";
			
			return box;
	}
	
});

/**
	this controls the navigation for the mobile view
*/

document.getElementById("hamburger").addEventListener("click",function(){
		  $mobilenav = $("#mobile-menu");
		  $site = $("#SITE");
		  var sublinks = $(".link-wrap");
	  
		  if($mobilenav.hasClass("active")){
		  				  $mobilenav.removeClass("active");
			  $(".post").removeClass("orange");
			   $mobilenav.animate({
			   top:"-999px",
			   height:0
			   },500)
			    $("body").css("overflow","scroll");
			 //  document.getElementsByTagName("content")[0].style.display = "block";
			  
			  //reset sub nav links in case any have been open
			  for(var i = 0;i<sublinks.length;++i){
				  var sublink = sublinks[i];
				  var parent = sublink.parentNode;
				  var sublinkitems = parent.children;
				  
				  $(sublinkitems[1]).animate({
				   	height:0
				   })

		 

			  }
			  
		  }else{
		
			   $mobilenav.animate({
			  	 top:$(window).scrollTop()-35,
			  	 height:window.innerHeight + 40 + "px"
			   },500,function(){
				     // $mobilenav.css("padding-top","110px");
			   
					 
					 $("body").css("overflow","hidden");
			   })
			   
			   $mobilenav.addClass("active");
			   $(".post").addClass("orange");
			   
			     
			//   document.getElementsByTagName("content")[0].style.display = "none";			  
			  
		  }
		  
	  });
	  
	  $(".link-wrap").bind("click",function(e){
	  	 var children = e.target.parentNode.parentNode.children;
	  	 

		  if($(children[1]).hasClass("active")){
			  $(children[1]).removeClass("active");
			 
			   $(children[1]).animate({
				   height:0
			   })
		 
			   
			 //  document.getElementsByTagName("content")[0].style.display = "block";
			  
		  }else{
			   $(children[1]).animate({
				    height:62 * 3 + "px"
				})
		 
			  
			    $(children[1]).addClass("active");
			   
			     
			//   document.getElementsByTagName("content")[0].style.display = "none";			  
			  
		  }
	  });
