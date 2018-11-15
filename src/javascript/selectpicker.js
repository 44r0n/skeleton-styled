var selectclass='selectpicker'; 	// class to identify selects
var listclass='turnintoselect';		// class to identify ULs
var boxclass='dropcontainer'; 		// parent element
var triggeron='selectpicker-dropdown-trigger-on'; 		// class for the active trigger link
var triggeroff='selectpicker-dropdown-trigger-off';			// class for the inactive trigger link
var dropdownclosed='dropdown-selectpicker'; // closed dropdown
var dropdownopen='dropdown-selectpicker-visible';	// open dropdown

function check(element,className)
{
    return className === element.className;
	// return new RegExp('\\b'+className+'\\b').test(element.className);
}

function addclass(element,newClass)
{
	if(!check(element,newClass)){element.className+=element.className==''?newClass:' '+newClass;}
}	

function swapclass(element,oldClass,newClass)
{
	var className=element.className
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
	anchor.onclick=function(){
		swapclass(this,triggeroff,triggeron)
		swapclass(this.parentNode.getElementsByTagName('ul')[0],dropdownclosed,dropdownopen);
		return false;
	}
	anchor.appendChild(document.createTextNode(select.options[0].text));
	select.parentNode.insertBefore(anchor,select);
	return anchor;
}

function addList(select, hiddenfield, trigger, replaceUL) {
	for(var i=0;i<select.getElementsByTagName('option').length;i++)
	{
		var newli=document.createElement('li');
		var newa=document.createElement('a');
		newli.v=select.getElementsByTagName('option')[i].value;
		newli.elm=hiddenfield;
		newli.istrigger=trigger;
		newa.href='#';
		newa.appendChild(document.createTextNode(
		select.getElementsByTagName('option')[i].text));
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
}

function turnListToDropdown(ul) {
	if(check(ul,listclass))
	{
		var newform=document.createElement('form');
		var newselect=document.createElement('select');
		for(i=0;jul.getElementsByTagName('a').length;i++)
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

function createSelectpickers()
{
	if(!document.getElementById && !document.createTextNode){return;}
	

/*
	Turn all selects into DOM dropdowns
*/
	var count=0;
	var toreplace=new Array();
	var sels=document.getElementsByTagName('select');
	for(var i=0;i<sels.length;i++){ // for each select in the document
		if (check(sels[i],selectclass)) // check if the select is of class to transform
		{
			var hiddenfield = addInput(sels[i]);
			var trigger = addAnchor(sels[i]);
			
			var replaceUL=document.createElement('ul');
			addList(sels[i],hiddenfield,trigger,replaceUL);

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
	for(var i=0;i<uls.length;i++)
	{
		turnListToDropdown(uls[i]);
	}
	for(i=0;i<count;i++){
		toreplace[i].parentNode.removeChild(toreplace[i]);
	}
	
}

createSelectpickers();