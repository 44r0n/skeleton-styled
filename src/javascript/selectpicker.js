var selectclass='selectpicker'; 					// class to identify selects
var searchSelectClass='search';						// class to identify searchSelectClass
var listclass='turnintoselect';						// class to identify ULs
var boxclass='dropcontainer'; 						// parent element
var triggeron='selectpicker-dropdown-trigger-on'; 	// class for the active trigger link
var triggeroff='selectpicker-dropdown-trigger-off';	// class for the inactive trigger link
var dropdownclosed='dropdown-selectpicker'; 		// closed dropdown
var dropdownopen='dropdown-selectpicker-visible';	// open dropdown
var disabledClass = 'disabled'
var opened;

function check(element,className) {
    return className === element.className;
}

function addclass(element,newClass) {
	if(!check(element,newClass)){element.className+=element.className==''?newClass:' '+newClass;}
}

function swapclass(element,oldClass,newClass) {
	var className=element.className;
	element.className=!check(element,oldClass)?className.replace(newClass,oldClass):className.replace(oldClass,newClass);
}

function addInput(select){
	//create an input that contains the selected option
	var hiddenfield=document.createElement('input');
	hiddenfield.name=select.name;
	hiddenfield.type='hidden';
	hiddenfield.id=select.id;
	if(select.hasAttribute("multiple")) {
		hiddenfield.value = "";
	} else {
		hiddenfield.value=select.options[0].value;
	}
	
	select.parentNode.insertBefore(hiddenfield,select)
	return hiddenfield;
}

function addAnchor(select) {
	var anchor=document.createElement('a');
	addclass(anchor,triggeroff);
	anchor.href='#';
	if (select.hasAttribute(disabledClass)) {
		anchor.className += " " + disabledClass;
	}
	anchor.text = select.getAttribute('placeholder') ? select.getAttribute('placeholder') : "";
	anchor.onclick=function(){
		if (this.classList.contains(disabledClass)) return false;
		closeAllSelectPickers();
		swapclass(this,triggeroff,triggeron);
		swapclass(this.parentNode.getElementsByTagName('ul')[0],dropdownclosed,dropdownopen);
		if(check(this,triggeron) && this.nextElementSibling.getElementsByTagName('input').length == 1) {
			this.nextElementSibling.getElementsByTagName('input')[0].focus();
		}
		opened = true;
		return false;
	}
	select.parentNode.insertBefore(anchor,select);
	return anchor;
}

function addList(select, hiddenfield, trigger, replaceUL) {

	for(var i=0;i<select.getElementsByTagName('option').length;i++) {
		addElementToList(select.getElementsByTagName('option')[i],replaceUL,hiddenfield,trigger,select.hasAttribute("multiple"),select.getAttribute("placeholder"));
	}
}

function addElementToList(opt,replaceUL,hiddenfield,trigger, multiple, placeholderText) {
	var newli=document.createElement('li');
	var newa=document.createElement('a');
	newli.v=opt.value;
	newli.elm=hiddenfield;
	newli.istrigger=trigger;
	newa.href='#';
	newa.appendChild(document.createTextNode(opt.text));
	if (multiple) {
		newli.onclick = function () {			
			if(this.getElementsByTagName('i').length == 0) {
				if(this.elm.value === "") {
					this.elm.value = this.v;
				} else {
					this.elm.value += ", " + this.v;
				}
				var newIcon = document.createElement('i');
				newIcon.className = "fas fa-check";		
				this.appendChild(newIcon);

				//TODO: better control structure.
				if (this.istrigger.firstChild == null) {
					this.istrigger.appendChild(document.createTextNode(this.firstChild.firstChild.nodeValue));
					return false;
				} 
				if (this.istrigger.firstChild.nodeValue === placeholderText) {
					this.istrigger.firstChild.nodeValue=this.firstChild.firstChild.nodeValue;
					return false;
				} 
				
				this.istrigger.firstChild.nodeValue += ", " + this.firstChild.firstChild.nodeValue;
				return false;
				
			} else {
				this.elm.value = this.elm.value.replace(", " + this.v,"");
				this.elm.value = this.elm.value.replace(this.v+", ","");
				this.elm.value = this.elm.value.replace(this.v,"");
				this.removeChild(this.getElementsByTagName('i')[0]);
				this.istrigger.firstChild.nodeValue = this.istrigger.firstChild.nodeValue.replace(", " + this.firstChild.firstChild.nodeValue, "");
				this.istrigger.firstChild.nodeValue = this.istrigger.firstChild.nodeValue.replace(this.firstChild.firstChild.nodeValue+", ", "");
				this.istrigger.firstChild.nodeValue = this.istrigger.firstChild.nodeValue.replace(this.firstChild.firstChild.nodeValue,"");
				if(this.istrigger.firstChild.nodeValue == "") this.istrigger.firstChild.nodeValue = placeholderText;
			}
			
			
			
			return false;
		}
	} else {
		newli.onclick=function(){
			this.elm.value=this.v;
			swapclass(this.istrigger,triggeron,triggeroff);
			swapclass(this.parentNode,dropdownopen,dropdownclosed);
			this.istrigger.firstChild.nodeValue=this.firstChild.firstChild.nodeValue;
			return false;
		}
	}
	newli.appendChild(newa);
	replaceUL.appendChild(newli);
}

function addSearchableList(select, hiddenfield, trigger, replaceUL) {
	// add search input
	var newDivInput = document.createElement('div');
	newDivInput.setAttribute("style","text-align:center;");

	var newSearchInput = document.createElement('input');
	newSearchInput.type = 'text';
	newSearchInput.placeholder = 'Search';
	newSearchInput.setAttribute("style","width: 90%;");
	newSearchInput.onkeyup = function (e) {
		var caller = e.target || e.srcElement;
    	var filter =  caller.value.toUpperCase();
		// Declare variables
		var ul, li, a, i;
		ul = caller.parentNode.parentNode;
		li = ul.getElementsByTagName('li');

		// Loop through all list items, and hide those who don't match the search query
		for (i = 0; i < li.length; i++) {
		    a = li[i].getElementsByTagName("a")[0];
		    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
		        li[i].style.display = "";
		    } else {
		        li[i].style.display = "none";
		    }
		}
	}
	newDivInput.appendChild(newSearchInput);
	replaceUL.appendChild(newDivInput);

	for(var i=0;i<select.getElementsByTagName('option').length;i++) {
		addElementToList(select.getElementsByTagName('option')[i],replaceUL,hiddenfield,trigger,select.hasAttribute("multiple"),select.getAttribute("placeholder"));
	}
}

function createSelectpickers(sels) {
	if(!document.getElementById && !document.createTextNode) {return;}
/*
	Turn all selects into DOM dropdowns
*/
	var count=0;
	var toreplace=new Array();
	for(var i=0;i<sels.length;i++){ // for each select in the document
		if (sels[i].classList.contains(selectclass)) {
			createSelectpicker(sels[i]);
			toreplace[count]=sels[i];
			count++;
		}
	}

	//TODO: better way for remove elements instead other loop
	//Remove all old select elements
	for(i=0;i<count;i++){
		toreplace[i].parentNode.removeChild(toreplace[i]);
	}
}

function createSelectpicker(sel) {
	var hiddenfield = addInput(sel);
	var trigger = addAnchor(sel);

	var replaceUL=document.createElement('ul');
	var width = sel.parentElement.offsetWidth+"px";
	replaceUL.setAttribute("style","width:"+width);
	if (sel.classList.contains(searchSelectClass)) {
		addSearchableList(sel,hiddenfield,trigger,replaceUL);
	} else {
		addList(sel,hiddenfield,trigger,replaceUL);
	}

	addclass(replaceUL,dropdownclosed);
	var div=document.createElement('div');
	div.appendChild(replaceUL);
	addclass(div,boxclass);
	sel.parentNode.insertBefore(div,sel)
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showContent(element) {
    document.getElementById(element).classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
document.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  if(opened) {
	  opened = false;
	  return false;
  }
  
  if(!event.target.matches('.'+triggeron) && !event.target.parentElement.matches('.'+dropdownopen) && !event.target.parentElement.parentElement.matches('.'+dropdownopen)) {
	closeAllSelectPickers();
  }
} 

function closeAllSelectPickers() {
	var selectpickers = document.getElementsByClassName(triggeron);
	for(var i = 0; i < selectpickers.length; i++) {
		swapclass(selectpickers[i].nextElementSibling.getElementsByTagName('ul')[0],dropdownopen,dropdownclosed);
		swapclass(selectpickers[i],triggeron,triggeroff);
		
		
	}
}