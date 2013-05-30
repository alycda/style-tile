module.exports = function(router){
	var fs = require("fs");	
	/*================= MAIN APP ROUTES ===================*/
	router.get("/",function(){
		this.res.writeHead(200,{
			'Content-Type':'text/html'
		});
		
		var content = loadTemplate("index");
		
		this.res.end(content);
	});
	
	
	
		

function loadTemplate(template){
	if(template == "index"){
		var content = fs.readFileSync("./public/index.html","utf-8");
	}else{
		var content = fs.readFileSync("./public/"+ template +".html","utf-8");
	}
	
	return content;
}
	
};