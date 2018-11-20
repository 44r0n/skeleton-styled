function setupAccordions(accordions) {  
  var i;

  for (i = 0; i < accordions.length; i++) {
    setupAccordion(accordions[i]);
  }
}

function setupAccordion(accordion) {
  accordion.addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    var icon = this.firstElementChild;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
      icon.className = 'fas fa-plus';
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      icon.className = 'fas fa-minus';
    }
  });
}