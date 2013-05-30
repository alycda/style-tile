//for running the thing
var flatiron = require("flatiron");
var PORT = process.env.port || 5000;
var app = flatiron.app;
var connect = require("connect").static;
var fs = require("fs");


/*==================================
	SETUP PUBLIC/STATIC FOLDERS
===================================*/
//use functions
app.use(flatiron.plugins.http,{});


//setup static files
app.http.before.push(connect(__dirname + "/public/"));
app.http.before.push(connect(__dirname + "/public/components"));
app.http.before.push(connect(__dirname + "/public/work"));


app.http.before.push(function(req,res){
	var found = app.router.dispatch(req,res);
	if(!found){
		res.emit("next");
	}
});

/*==================================
	APP START
===================================*/
//start app
app.start(PORT);
var routes = require("./Routes")(app.router);

	
