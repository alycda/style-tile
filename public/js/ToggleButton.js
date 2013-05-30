

var ToggleButton = function(_params){
	this.params = _params !== undefined ? _params : {};	
	
	this.itemSelector = this.params.itemSelector;
	this.container = this.params.container;
	this.selectClass = this.params.selectClass;

	this.setListeners();
};

ToggleButton.prototype = {
	
	setListeners:function(){
		var parentNode = this;
		var parent = document.getElementById(this.container);
		var items = document.getElementsByClassName(this.itemSelector);
		var itemslen = items.length;
		
		
		
		for(var i = 0;i<itemslen;++i){
			var item = items[i];
			
			item.addEventListener("click",function(){
				
				setStyle(this,parent,parentNode);
				
				//make the item we clicked on "selected"
				this.className = parentNode.selectClass;
				
				//shift mode if necessary
				var mode = getMode();
				console.log(window.Packery);
				switch(mode){
					case "List":
						document.getElementById("leadership").style.width = "100px";
						$(".leader").addClass("large")
						window.Packery.layout();
					break;
					
					case "Grid":
						document.getElementById("leadership").style.width = "100%";
							$(".leader").removeClass("large")
						window.Packery.layout();
					break;
				}
				
			});
		}
		

		function setStyle(_item,_parent,_class){
			var children = _parent.children;
			var childrenlen = children.length;
			//clear the selected class from all children
			for(var i = 0;i<childrenlen;++i){
			
			
				children[i].className = _class.itemSelector;
				
				//set a reference in body tag so we know what mode we're in
				document.getElementsByTagName("body")[0].setAttribute("data-mode", _item.innerHTML);
			}
				
		}
		
		
		function getMode(){
			return document.getElementsByTagName("body")[0].getAttribute("data-mode");
		}

	}	//end setListeners


};


