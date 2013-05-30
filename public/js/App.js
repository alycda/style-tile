
var f = new Filterer("leadership",".leader");
var leaders = document.getElementsByClassName("leader");

for(var i = 0;i<leaders.length;i++){
	var leader = leaders[i];
	
	var choices = ["341","256","204"];
	
	var choice = Math.floor(Math.random() * choices.length);

	//leader.style.width = choices[choice] + "px";
	//leader.style.height = choices[choice] + "px";
	leader.setAttribute("data-width", choices[choice]);
	leader.setAttribute("data-height", choices[choice]);
	var r = Math.floor(Math.random() * 255);
	var g = Math.floor(Math.random() * 255);
	var b = Math.floor(Math.random() * 255);
	
	//el.style.width = Math.floor(Math.random()*300) + "px";
//	el.style.height = Math.floor(Math.random()*300) + "px";
	leader.style.background = "rgba(" + r + "," + g + "," + b + ",1.0)";
}
f.packery.layout();
f.selectableItems(function(e,packery){

	//swap long variable names for shortter ones
	var target = e.target.parentNode;
	var content = target.getElementsByClassName("content");
	
	
	if($(target).hasClass("large")){
		$(target).removeClass("large");
		$(target).removeClass("active");
	}else{
		$(target).addClass("large");
		$(target).addClass("active");
	}
	
	$("#leadership").animate({
		marginTop:100 + "px"
	})
	
	packery.layout();
	
	
});

function profileOpen(){
	document.getElementsByTagName("body")[0].setAttribute("profile-open", true);
}

function profileClose(){
	document.getElementsByTagName("body")[0].removeAttribute("profile-open");
}

function getProfileStatus(){
	return document.getElementsByTagName("body")[0].getAttribute("profile-open");
}

var buttons = new ToggleButton({
	container:"toggle-buttons",
	itemSelector:"toggle-button",
	selectClass:"toggle-selected"
})
