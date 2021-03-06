/*================================
	For leadership page
================================*/
var leaders = $(".leader");
var leaderlen = leaders.length;
var pageMode = "grid";
			  
			  
$(".grid").css("background-color","#ffa600");
$(".segmented-button").bind("click",function(e){

	var parent = e.target.parentNode;
	var children = parent.children;
	
  var list = buildList();
	   
   //temporary measure
    $("#leader-list-view").html("");
    $("#leader-list-view").append(list);
	
	//take care of the "toggle" effect"
	for(var i = 0;i<children.length;++i){
		if($(children[i]).hasClass("selected")){
			$(children[i]).removeClass("selected");
			$(e.target).addClass("selected");
		}else{
			$(e.target).addClass("selected");
		}
	}
	console.log(e.target);
	var newMode = e.target.getAttribute("data-type");
	$(e.target.children[0]).removeClass("hover");
		$(e.target.children[1]).removeClass("hover");
	if(newMode === "list"){
		$(e.target.children[1]).addClass("hover");
		goToList();
	}else if(newMode == "grid"){
		$(e.target.children[0]).addClass("hover");
		goToGrid();
	}
	
	
	function goToGrid(){
		//set the background of the grid icon to orange
		$(".grid").css("background-color","#ffa600");
		$(".list").css("background-color","#c8cbc7");
		$("#leader-list-view").fadeOut("slow",function(){
			$("#leader-grid-view").fadeIn("slow");
		});
		
	
	
	}
	
	
	function goToList(){
		$(".list").css("background-color","#ffa600");
		$(".grid").css("background-color","#c8cbc7");
		$("#leader-grid-view").fadeOut("slow",function(){
			$("#leader-list-view").fadeIn("slow");		
		});
		
	}
	
	
	function buildList(){
	
		
		var ul = document.createElement("ul");
		
		
			
	
		
		for(var i = 0;i<leaderlen;++i){
				var leader = leaders[i];
				//console.log(leader.children[1]);
				//take the template we have, copy it, and build out a list using those elements
				var box = $("#content-box");
				var copy = box.clone()[0];
				copy.id = "";
				copy.className = "leaderbox";
				
				/*
				    Need to swap out ID's for class names.
				    Since everything is the same format, we 
				    can just grab specific indices without 
				    too much trouble
				*/
				
				//all the children within a "mini-profile"
				var children = copy.children[1].children[1].children;
				
				
				var title = children[0];
				title.id = "";
				title.className = "mini-profile-title"
				
				
				var subtitle = children[2];
				subtitle.id = "";
				subtitle.className = "mini-profile-subtitle";
				
				
				var content = children[3];
				content.id = "";
				content.className = "mini-profile-content";
		
				    
				//set the content 
				title.innerHTML = leader.getAttribute("data-name");
				subtitle.innerHTML = leader.getAttribute("data-title");
				content.innerHTML = leader.children[2].innerHTML;
				
				//set profile image
				var largeProfile = leader.children[1].cloneNode(true);
				largeProfile.id = leader.id;
				
				copy.children[1].getElementsByClassName("large thumb")[0].appendChild(largeProfile);
				
				//remove close button
				var close = children[1];
				close.style.display = "none";
				//largeProfile.style.borderRadius = "100px";
				//largeProfile.style.borderRadius = "100px";
				
					
				var li = document.createElement("li");
				li.appendChild(copy);
				
				ul.appendChild(li);
		}
		
		return ul;
	}
	
	
	
	/*var title = document.getElementById("mini-profile-title");
			var subtitle = document.getElementById("mini-profile-subtitle");
			var content = document.getElementById("mini-profile-content");
		
			//set content
			title.innerHTML = leader.getAttribute("data-name");
			subtitle.innerHTML = leader.getAttribute("data-title");
			content.innerHTML = leader.children[0].innerHTML;
			
			//set profile image
			var largeProfile = document.getElementsByClassName("large thumb")[0];
			largeProfile.id = leader.id;
			
			var box = document.createElement("div");
	
		<div class="row">
			<div class="large-3 columns">
				<div class="large thumb"></div>
			
			</div><!--end image nad title-->
			
			<div class="large-9 columns">
				<h1 id="mini-profile-title"></h1>
					<div class="close-button"></div>
				<h3 id="mini-profile-subtitle" class="subheader">Subheader</h3>
		
				<p id="mini-profile-content">
					blha blhabl liahoihfoisehfoseifhsoiefhoisf
				</p>
				
				<div class="row">
					<div class="large-3 columns">
						<ul class="social-media">
							<li class="twitter">
								
									
							</li>
							
							<li class="facebook">
								<a href="#">
								
									
									
								</a>
							</li>
							
							<li class="instagram">
		
							</li>
						</ul>
					</div>
					
					<div class="large-4 columns view-more">
						<div class="button">View Full Profile</div>
					</div>
					
				</div><!--end social media and view more button-->
			</div><!--end image nad title-->
	</div>
*/
});

for(var i = 0;i<leaderlen;++i){
	leaders[i].addEventListener("click",function(e){
		var leader = e.target.parentNode;	
	
		var title = document.getElementById("mini-profile-title");
		var subtitle = document.getElementById("mini-profile-subtitle");
		var content = document.getElementById("mini-profile-content");
		var profilelink = document.getElementById("profilelink");
		
		//grab aspects from content box
		var box = $("#content-box");
		
	
		
		if(!box.hasClass("active")){
			//set content
			title.innerHTML = leader.getAttribute("data-name");
			subtitle.innerHTML = leader.getAttribute("data-title");
			content.innerHTML = leader.children[2].innerHTML;
			profilelink.onclick = function() { window.location = leader.getAttribute("data-permalink"); }
			
			//set profile image
			var largeProfile = document.getElementsByClassName("large thumb")[0];
			largeProfile.id = leader.id;
		
	
			var val = getHeight(box);
			
			box.animate({
				height:val
			})
			
			box.addClass("active");
		}else{
			box.animate({
				height:0
			},function(){
				//set content
				title.innerHTML = leader.getAttribute("data-name");
				subtitle.innerHTML = leader.getAttribute("data-title");
				content.innerHTML = leader.children[2].innerHTML;
				profilelink.onclick = function() { window.location = leader.getAttribute("data-permalink"); }

				
				//set profile image
				var largeProfile = document.getElementsByClassName("large thumb")[0];
				largeProfile.id = leader.id;
				
			var val = getHeight(box);
			
			box.animate({
				height:val
			})	
				
			})
			
			box.addClass("active");
			
		}
		
		
		//var val = 1.0 * $("#content-box").height(100) + "px";
		//console.log(val);
	});
}
/*
    Need to figure out what 100% of the content-box would be
    because some people might write more content, 
    thus, throwing off the offsets and height already set
    
    Idea : make dummy element and set it to be 
    what 100% would be.
    
    Then animate to whatever that amount is.
*/

		
function getHeight(_box){
	var dummy = document.createElement("div");
	dummy.id = "content-box";
	dummy.style.position = "relative";
	dummy.style.zIndex = -9;
	dummy.style.bottom = 1000000;
	dummy.innerHTML = _box[0].innerHTML;
	dummy.style.height = "100%";
	$("body").append(dummy);
	
	var val = 1.0 * $(dummy).height() + "px";
	
	return val;

		
}

$(".close-button").bind("click",function(){
	$("#content-box").animate({
		height:0
	},function(){
		$(this).removeClass("active");
		document.getElementById("profilelink").removeAttribute('onclick');
	});
})


/*==========================================================================================*/
/*================================
	controls subnav
================================*/
/*
var nav = document.getElementById("desktop").getElementsByTagName("nav")[0].children[0].children;
var navlength = nav.length;

for(var i = 0;i<navlength;++i){
	var li = nav[i];
	var a = li.getElementsByTagName("a")[0];
	
	if(a !== undefined){
		
		if(window.location.search(a.innerHTML) !== -1){
			var sublinks = a.parentNode.children[1];
			
			//if we have sublinks, amke sure to show them
			if(sublinks !== undefined){
				$(sublinks).css("display","block");
			}
			
		}
	}

}
*/

/*
	Subnav should only show if the parent of the link that
	was clicked on has a second child
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



var Leader = {
	init:function(_selector){
		if(!_selector){
			var leaders = document.getElementsByClassName("leader");
		}else{
			var leaders = $(_selector);			
		}
		
		
		
		for(var i = 0;i<leaders.length;++i){
			var leader = leaders[i];
			
			//var caption = leader.getElementsByClassName("caption")[0];
			var images = leader.getElementsByTagName("img");
			
			var color = images[1];
			var gray = images[0]
			
		
			
			color.addEventListener("mouseover",function(){
				var caption = this.parentNode.getElementsByClassName("caption")[0];		
			
			
				$(caption.children[0]).addClass("hover");	
				$(caption.children[0].children[1]).addClass("hover");	
				$(caption).addClass("hover");
			
				$(leader).addClass("active");
			});
			
			
			
			color.addEventListener("mouseout",function(e){
				
				var caption = this.parentNode.getElementsByClassName("caption")[0];		
				
				
	
			
				$(caption.children[0]).removeClass("hover");
						$(caption.children[0].children[1]).removeClass("hover");			
				$(caption).removeClass("hover");	
			
			
			})
							
				
		}

	}
				
				
				
}

Leader.init();