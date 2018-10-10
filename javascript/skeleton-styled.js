var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
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
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showContent(element) {
    document.getElementById(element).classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
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
} 
var shownModal;

function openModal(modalName){
    shownModal = document.getElementById(modalName);
    shownModal.style.display = "block";
}

function closeModal(modalName) {
    shownModal = document.getElementById(modalName);
    animationCloseModal(shownModal);
}

function animationCloseModal(elem) {    
    elem.getElementsByClassName("modal-content")[0].className += ' close-modal-content';
    setTimeout(hideModal,700);
}

function hideModal() {
    shownModal.style.display = "none";
    shownModal.getElementsByClassName("modal-content")[0].classList.remove("close-modal-content");
}

function openImageModal(elem, modalName) {
    shownModal = document.getElementById(modalName);
    
    shownModal.style.display = "block";
    document.getElementById("modalImage").src = elem.src;
    document.getElementById("modalCaption").innerHTML = elem.alt;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == shownModal) {
        animationCloseModal(shownModal);
    }
}
var elms = document.querySelectorAll('input[type=range]');

elms.forEach(function(elm) {
    var container = elm.parentNode;
    var dataValues = elm.getAttribute('data-values');
    if (dataValues != null) {
        var values = elm.getAttribute('data-values').split(' ');

        values.forEach(function (value, i, values) {
        var rangePart = elm.cloneNode();
        rangePart.type = 'range';
        rangePart.removeAttribute('data-values');
        rangePart.value = value;
        rangePart = container.insertBefore(rangePart, elm);
        });
        
        elm.remove();
    }
});

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
function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function currentSlide(n, no) {
    showSlides(slideIndex[no] = n, no);    
}

var intervalSet = false;
var timeInterval = 2000;

function showSlides(n, no) {
  var i;
  var x = document.getElementsByClassName(slideId[no]);
  var dots = document.getElementsByClassName(dotId[no]);
  if (n > x.length) {slideIndex[no] = 1}
  if (n < 1) {slideIndex[no] = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
    dots[i].className = dots[i].className.replace(" active", "");
  }
  x[slideIndex[no]-1].style.display = "block";
  dots[slideIndex[no]-1].className += " active";
  if(!intervalSet) {
    setInterval(function() { plusSlides(1,0); },timeInterval);
    intervalSet = true;
  }
} 