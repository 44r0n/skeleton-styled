var selectclass='selectpicker'; 					// class to identify selects
var searchSelectClass='search';						// class to identify searchSelectClass
var listclass='turnintoselect';						// class to identify ULs
var boxclass='dropcontainer'; 						// parent element
var triggeron='selectpicker-dropdown-trigger-on'; 	// class for the active trigger link
var triggeroff='selectpicker-dropdown-trigger-off';	// class for the inactive trigger link
var dropdownclosed='dropdown-selectpicker'; 		// closed dropdown
var dropdownopen='dropdown-selectpicker-visible';	// open dropdown

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
	hiddenfield.value=select.options[0].value;
	select.parentNode.insertBefore(hiddenfield,select)
	return hiddenfield;
}

function addAnchor(select) {
	var anchor=document.createElement('a');
	addclass(anchor,triggeroff);
	anchor.href='#';	
	anchor.text = select.getAttribute('placeholder');
	anchor.onclick=function(){
		swapclass(this,triggeroff,triggeron);
		swapclass(this.parentNode.getElementsByTagName('ul')[0],dropdownclosed,dropdownopen);
		if(check(this,triggeron) && this.nextElementSibling.getElementsByTagName('input').length == 1) {
			this.nextElementSibling.getElementsByTagName('input')[0].focus();
		}
		return false;		
	}
	select.parentNode.insertBefore(anchor,select);
	return anchor;
}

function addList(select, hiddenfield, trigger, replaceUL) {

	for(var i=0;i<select.getElementsByTagName('option').length;i++) {
		addElementToList(select.getElementsByTagName('option')[i],replaceUL,hiddenfield,trigger);		
	}
}

function addElementToList(opt,replaceUL,hiddenfield,trigger) {
	var newli=document.createElement('li');
	var newa=document.createElement('a');
	newli.v=opt.value;
	newli.elm=hiddenfield;
	newli.istrigger=trigger;
	newa.href='#';
	newa.appendChild(document.createTextNode(opt.text));
	newli.onclick=function(){ 
		this.elm.value=this.v;
		swapclass(this.istrigger,triggeron,triggeroff);
		swapclass(this.parentNode,dropdownopen,dropdownclosed)
		this.istrigger.firstChild.nodeValue=this.firstChild.firstChild.nodeValue;
		return false;
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
		addElementToList(select.getElementsByTagName('option')[i],replaceUL,hiddenfield,trigger);
	}
}

function turnListToDropdown(ul) {
	if(check(ul,listclass))
	{
		var newform=document.createElement('form');
		var newselect=document.createElement('select');
		for(i=0;ul.getElementsByTagName('a').length;i++)
		{
			var newopt=document.createElement('option');
			newopt.value=ul.getElementsByTagName('a')[i].href;	
			newopt.appendChild(document.createTextNode(ul.getElementsByTagName('a')[i].innerHTML));	
			newselect.appendChild(newopt);
		}
		newselect.onchange=function()
		{
			window.location=this.options[this.selectedIndex].value;
		}
		newform.appendChild(newselect);
		ul.parentNode.insertBefore(newform,ul);
	}
}

function createSelectpickers() {
	if(!document.getElementById && !document.createTextNode){return;}
	

/*
	Turn all selects into DOM dropdowns
*/
	var count=0;
	var toreplace=new Array();
	var sels=document.getElementsByTagName('select');
	for(var i=0;i<sels.length;i++){ // for each select in the document
		if (sels[i].classList.contains(selectclass)) {
			var hiddenfield = addInput(sels[i]);
			var trigger = addAnchor(sels[i]);
			
            var replaceUL=document.createElement('ul');
            var width = sels[i].parentElement.offsetWidth+"px";
			replaceUL.setAttribute("style","width:"+width);
			if (sels[i].classList.contains(searchSelectClass)) {
				addSearchableList(sels[i],hiddenfield,trigger,replaceUL);
			} else {
				addList(sels[i],hiddenfield,trigger,replaceUL);
			}

			addclass(replaceUL,dropdownclosed);
			var div=document.createElement('div');
			div.appendChild(replaceUL);
			addclass(div,boxclass);
			sels[i].parentNode.insertBefore(div,sels[i])
			toreplace[count]=sels[i];
			count++;
		}
	}
	
/*
	Turn all ULs with the class defined above into dropdown navigations
*/	

	var uls=document.getElementsByTagName('ul');
	for(var i=0;i<uls.length;i++){
		turnListToDropdown(uls[i]);
	}
	for(i=0;i<count;i++){
		toreplace[i].parentNode.removeChild(toreplace[i]);
	}
	
}

createSelectpickers();