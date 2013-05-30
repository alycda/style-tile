/**
	Builds out a Filtering system using 
	Packery 
	
	packery.metafizzy.co	
*//**
	Constructor.
	@param{String} _el id of the container element to put Packery onto.
	@param{String} _itemselector the classname ( jquery style) of the items to initiate 
	with Packery.
	
*/var Filterer=function(e,t){this.container=document.getElementById(e);this.packery=new Packery(this.container,{itemSelector:t});this.selector=t.replace(".","");Filterer.packerey=this.packery};Filterer.prototype={selectableItem:function(){var e=document.getElementsByClassName(this.selector)},selectBox:function(e,t){var n=this,r=document.getElementsByClassName(this.selector);if(typeof e!="object"){var i=document.getElementById(e);i.addEventListener("change",function(e){var t=e.target.options[e.target.selectedIndex].value;for(var i=0;i<r.length;i++){el=r[i];if(el.className.search(t)===-1){classie.toggle(el,"hide");classie.toggle(el.children[0],"hide")}if(el.className.search(t)!==-1&&el.className.search("hide")!==-1){classie.toggle(el,"hide");classie.toggle(el.children[0],"hide")}if(e.target.selectedIndex===0){classie.removeClass(el,"hide");classie.removeClass(el.children[0],"hide")}}n.packery.layout()})}},checkBox:function(e){var t=document.getElementsByClassName(this.selector),n=document.getElementById(e),r=n.getElementsByTagName("input"),i=n.children,s=r.length,o=t.length,u=i.length,a=this;for(var f=0;f<u;++f){var l=i[f];l.addEventListener("click",function(e){var n=[];for(var i=0;i<s;++i)if(r[i].checked===!0){var u=r[i].value;n.push(u)}if(n.length>0){var f=[];for(var i=0;i<n.length;++i)for(var l=0;l<o;++l){el=t[l];var c=el.className.split(" ").join("");c.search(n[i])!==-1&&f.push(el)}for(var l=0;l<o;++l){el=t[l];if(el.className.search(!1)){classie.toggle(el,"hide");classie.toggle(el.children[0],"hide")}}for(var h=0;h<f.length;h++){classie.removeClass(f[h],"hide");classie.removeClass(f[h].children[0],"hide")}}else if(n.length===0)for(var l=0;l<o;++l){el=t[l];if(el.className.search(!0)){classie.removeClass(el,"hide");classie.removeClass(el.children[0],"hide")}}a.packery.layout()})}}};