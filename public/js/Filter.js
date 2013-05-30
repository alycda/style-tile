/**
	Builds out a Filtering system using 
	Packery 
	
	packery.metafizzy.co	
*/



/**
	Constructor.
	@param{String} _el id of the container element to put Packery onto.
	@param{String} _itemselector the classname ( jquery style) of the items to initiate 
	with Packery.
	
*/
var Filterer = function(_el,_itemselector){
	this.container = document.getElementById(_el);
    this.packery = new Packery(this.container,{
    	itemSelector:_itemselector,
 
    });
    this.selector = _itemselector.replace(".","");
    window.Packery = this.packery;


};


Filterer.prototype = {

	/**
		Makes each item selectable.
		@param{Function} _callback the callback function you want to occur when 
		user clicks
		
		_callback will receive the event as well as a refernce to the packery var
	*/
	selectableItems:function(_callback){
		var items = document.getElementsByClassName(this.selector);
		var itemslen = items.length;
		var parent = this;
		for(var i = 0;i<itemslen;++i){
			var item = items[i];
			//add event listneer to each item
			item.addEventListener("click",function(e){
				
				_callback(e,parent.packery)
			});
			
		}
	},
	
	
	/**
		Builds out a select box
		@params{Object} _items a object with the key indicating the innerHTML and a value indicating 
		the value for that <option> tag. Can also be the id of a select box on the page
		
		@params{String} _anchor id of the element to append the select box to.
	*/
	selectBox:function(_items,_anchor){
		//reference to the object
		var parent = this;
		
		//get all the elements that Packery is acting on
		var elements = document.getElementsByClassName(this.selector);
		
		//if _items is a object, assume we want to build out a select box and append later
		if(typeof _items === "object"){
			/*
			var selectbox = document.createElement("select");
			selectbox.className = "Filterer-selectbox";
		
			var itemslen = _items.length;
			for(var i in _items){
			    var option = document.createElement("option");
			    option.setAttribute("value",_items[i]);
			    option.innerHTML = _i;
			    selectbox.appendChild(option);
			}
			document.getElementById(_anchor).appendChild(selectbox);*/
		}else{
			
			//get all the elements Packery is manipulating
			var filter = document.getElementById(_items);
			
			//add a event listener for the change event
			filter.addEventListener("change",function(e){
				
				//figure out which category was selected
				var selected = e.target.options[e.target.selectedIndex].value;
				
				
				for(var i = 0;i<elements.length;i++){
				    el = elements[i];
				    
				    //hide all the elements that don't match the selected class
				    if(el.className.search(selected) === -1){
				    	  classie.toggle( el, 'hide' );
				    	  classie.toggle( el.children[0], 'hide' );
				    }
				    
				    //restore any elements that may have been hidden but match
				    if((el.className.search(selected) !== -1)&&(el.className.search("hide") !== -1)){
				        classie.toggle( el, 'hide' );
				        classie.toggle( el.children[0], 'hide' );
				    	
				    }
				    
				    //restore all
				    if(e.target.selectedIndex === 0){
						classie.removeClass( el, 'hide' );
						classie.removeClass( el.children[0], 'hide' );
				    }
				    
				}
				
				//re-layout 
				parent.packery.layout();
		
			
			})
			
			
		}
	},//end selectbox
	
	/**
		This adds sorting functionality to a 
		set of checkboxes
	*/
	checkBox:function(_sectionid){
		//get all the elements Packery is acting on
		var elements = document.getElementsByClassName(this.selector);
		
		
		//get the checkbox group
		var filter2 = document.getElementById(_sectionid);
		
		//get all the checkboxes within the group
		var inputs = filter2.getElementsByTagName("input");
		
		//children of checkbox group
		var children = filter2.children;
		
		//lenths for loop interation
		var inputslen = inputs.length;
		var elementslen = elements.length;
		var childrenlen = children.length;
		
			
		//reference to the main object
		var parent = this;
		
		//loop through the checkbox group, adding a event listener to each checkbox.
		for(var i = 0;i<childrenlen;++i){
			var child = children[i];
			
			child.addEventListener("click",function(e){
			
				//store selected checkboxes
				var selected = [];
				//var not_selected = [];
				
				//loop through the inputs and see if any are checked. If they are add to selected array
				for(var i = 0;i<inputslen;++i){
					if(inputs[i].checked === true){
						//var selected = inputs[i].parentNode.innerHTML.split(">")[1].toLowerCase().replace(/[\n\r]/g,"");
						var selected_item = inputs[i].value;
						
						selected.push(selected_item);		
										
						
					}
				}
				
				
				
				/*
					Check to see how many boxes are 
					checked. 
					
					If it's > 0, do some sorting, 
					otherwise re-show everything.
				*/				
					if(selected.length > 0){
						
						//stores the elements that were found
						var found = [];
						
					
					/**
						Run thru all the elements, 
						if we find a element classname that matches
						the selected checkbox, add it to the "found" 
						array
					*/
					for(var i = 0;i<selected.length;++i){
								
						for(var a = 0;a<elementslen; ++a){
							
							
								el = elements[a];
								var classname = el.className.split(" ").join("");;
								
								if(classname.search(selected[i]) !== -1){
									found.push(el);	
								}
						}
						
					}
						
						
					/**
						Hide Everything first
					*/
					for(var a = 0;a<elementslen; ++a){
					    el = elements[a];
					    if(el.className.search(" hide" === -1)){
					    	  classie.toggle( el, 'hide' );
					    	  classie.toggle( el.children[0], 'hide' );
					    	
					    }
					    
					}				
					
					/*
						Reveal the ones in the "found" 
						array
					*/
					for(var z = 0;z<found.length;z++){
					    classie.removeClass( found[z], 'hide' );
					    classie.removeClass( found[z].children[0], 'hide' );
					}
					
					
					/**
						If nothing is selected, 
						restore everything
					*/
					}else if(selected.length === 0){				
						for(var a = 0;a<elementslen; ++a){
							el = elements[a];
							if(el.className.search(" hide" !== -1)){
								classie.removeClass( el, 'hide' );
								classie.removeClass( el.children[0], 'hide' );
								
							}
							
						}
						
						
					}
				
				
				parent.packery.layout();
			
				
				
				
			})//end child click
		}
		
		
	}
	
		
	
};
