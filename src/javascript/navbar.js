var  defaultSidebarWidth = document.getElementsByClassName("navbar side")[0].currentStyle || window.getComputedStyle(document.getElementsByClassName("navbar side")[0]);


function showTopNavBar(id) {
    var x = document.getElementById(id);
    
    if (x.className === "navbar top") {
        x.className = "navbar top responsive";
        document.getElementsByClassName("navbar side")[0].style.marginTop = "0px";
    } else {
        x.className = "navbar top";
        document.getElementsByClassName("navbar side")[0].removeAttribute("style");
    }
} 