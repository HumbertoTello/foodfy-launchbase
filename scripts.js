const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
  card.addEventListener("click", function() {
    const recipeImg = card.querySelector("img").src
    modalOverlay.classList.add("active")
    modalOverlay.querySelector("img").src = recipeImg
  })
}

document.querySelector('.modal__close').addEventListener("click", function() {
  modalOverlay.classList.remove('active')
})