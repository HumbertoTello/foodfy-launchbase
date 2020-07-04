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

function addIngredient() {
  const ingredients = document.querySelector("#ingredients");
  const fieldContainer = document.querySelectorAll(".ingredient");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  ingredients.appendChild(newField);
  console.log('b')
}

function addPreparation() {
  const preparations = document.querySelector("#preparations");
  const fieldContainer = document.querySelectorAll(".preparation");

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if (newField.children[0].value == "") return false;

  newField.children[0].value = "";
  preparations.appendChild(newField);
}

document
  .querySelector(".add-preparation")
  .addEventListener("click", addPreparation);

document
  .querySelector(".add-ingredient")
  .addEventListener("click", addIngredient);