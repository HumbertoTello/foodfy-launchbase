const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')
console.log(cards)

for (let card of cards) {
  card.addEventListener("click", function() {
    const recipeImg = card.querySelector("img").src
    const title = card.querySelector(".card__title p").textContent
    const author = card.querySelector(".card__author p").textContent

    modalOverlay.classList.add("active")
    modalOverlay.querySelector("img").src = recipeImg
    modalOverlay.querySelector(".modal__title").innerHTML = title
    modalOverlay.querySelector(".modal__author").innerHTML = author
  })
}

document.querySelector('.modal__close').addEventListener("click", function() {
  modalOverlay.classList.remove('active')
})