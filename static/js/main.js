/*================================
	For the Isotope Page
================================*/
$(function(){
  
  
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


