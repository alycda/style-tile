/*================================
	For the Isotope Page
================================*/
$(function(){
  
  if(window.location.href.search("leadership") === -1){
  
  var $container = $('#leadership');
  
  $container.isotope({
    itemSelector: '.leader',
    masonry: {
      columnWidth: 60
    },
   })
  
  $('.leader').click(function(){
    var $this = $(this),
        tileStyle = $this.hasClass('big') ? { width: 50, height: 50} : { width: 170, height: 110};
    $this.toggleClass('big');
    
    $this.find('.leader-content').stop().animate( tileStyle );
	 
    $container.isotope( 'reLayout' )
    

	    //$container.isotope( {filter:".creative"})
 
  });
  
  $("#controls select").on("change",function(e){
  	var val = e.target.options[e.target.selectedIndex].getAttribute("value");
  	 
  	if(val === ""){
	  	 $container.isotope( {filter:".leader"})
  	}else{
	  	 $container.isotope( {filter:"." + val});
  	}
  });
  $("header").on("click",function(){
 
	   	    $container.isotope( {filter:".leader"})
	   	       $container.isotope( 'reLayout' )
  })
  }
    

});
/*==========================================================================================*/
/*================================
	For any video pages
================================*/
var v = new Video({
	ready:function(_id){
		console.log("read" + _id);	
		
	},
	play:function(_id){
		var video = document.getElementById(_id);
		var parent = video.parentNode;
		var quote = parent.getElementsByClassName("video-quote")[0];
		
		$(quote).animate({
			opacity:0
		});
	},
	
	pause:function(_id){
		var video = document.getElementById(_id);
		var parent = video.parentNode;
		var quote = parent.getElementsByClassName("video-quote")[0];
		
		$(quote).animate({
			opacity:1
		});
	},
	
	finish:function(_id){
		
		var video = document.getElementById(_id);
		var parent = video.parentNode;
		var quote = parent.getElementsByClassName("video-quote")[0];
		
		$(quote).animate({
			opacity:1
		});
	}
});

/*==========================================================================================*/
/*================================
	For leadership page
================================*/
var leaders = $(".leader");
var leaderlen = leaders.length;




for(var i = 0;i<leaderlen;++i){
	leaders[i].addEventListener("click",function(e){
		var leader = e.target;
		
	
		var title = document.getElementById("mini-profile-title");
		var subtitle = document.getElementById("mini-profile-subtitle");
		var content = document.getElementById("mini-profile-content");
		
		//grab aspects from content box
		var box = $("#content-box");
		
	
		
		
		if(!box.hasClass("active")){
			//set content
			title.innerHTML = leader.getAttribute("data-name");
			subtitle.innerHTML = leader.getAttribute("data-title");
			content.innerHTML = leader.children[0].innerHTML;
			
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
				content.innerHTML = leader.children[0].innerHTML;
				
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
	});
})