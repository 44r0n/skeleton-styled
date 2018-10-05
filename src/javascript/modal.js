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