var search = document.getElementById("search-field");
var search_field = $("#autocomplete");

var terms = [];

var dataurl = "/getdata";

$.getJSON(dataurl,function(e){

	var work = e.work;
	var work_length = work.length;

	var blog = e.blog;
	var blog_length = blog.length;

	var team = e.team;
	var team_length = team.length;


	for(var a = 0;a<work_length;++a){
		terms.push(work[a]);
	}


	for(var b = 0;b<blog_length;++b){
		terms.push(blog[b]);
	}

	for(var c = 0;c<team_length;++c){
		terms.push(team[c]);
	}
});


$("#autocomplete").autocomplete({
	source:terms,
	appendTo:"#search"
})


search_field.onchange = function(e){
	console.log("typing");
	
	console.log(e);
};