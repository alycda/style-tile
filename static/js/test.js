var item = new WorkItem({
	src:"/static/img/work/work.jpg"
})

item.append("work-items");

item.setImage(function(buffer){
	console.log(buffer);
})