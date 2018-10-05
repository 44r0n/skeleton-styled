var shownModal;

function openModal(modalName){
    shownModal = document.getElementById(modalName);
    shownModal.style.display = "block";
}

function closeModal(modalName) {
    shownModal = document.getElementById(modalName);
    shownModal.style.display = "none";
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
        shownModal.style.display = "none";
    }
}