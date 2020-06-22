const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

const ingredient = document.querySelector('.ul.ingredient')
const preparation = document.querySelector('.ul.preparation')
const information = document.querySelector('.information__text')


function buttonAction(show = true, type, button) {
  document.querySelector(button).addEventListener("click", function() {
    if(show) {
      type.classList.add('active')
      document.querySelector(button+' p').textContent = 'MOSTRAR'
      show = false;
    } else {
      type.classList.remove('active')
      document.querySelector(button+' p').textContent = 'ESCONDER'
      show = true;
    }
  })
}

buttonAction(show = true, ingredient, '.button.ingredients')
buttonAction(show = true, preparation, '.button.preparation')
buttonAction(show = true, information, '.button.information')

