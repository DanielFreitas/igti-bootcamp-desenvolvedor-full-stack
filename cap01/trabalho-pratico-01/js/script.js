let sliderRed = null;
let sliderGreen = null;
let sliderBlue = null;
let textboxRed = null;
let divColor = null;

// Garantindo que o JavaScript será processado somente após o total carregamento do HTML
window.addEventListener('load', start);

// Função de inicialização, a ser executada após o total carregamento da página
function start() {
  // Carrega elementos da página
  loadElements();
  // Inicia cor da div com valores padrão
  showColor();

  // Adiciona eventos nos controles deslizantes de cor
  activateInput();

  // Inicia valores dos textboxes de cores com valores padrão
  showOutput();
}

function activateInput() {  
  function handleInput(event) {
    showColor();
    showOutput();
  }

  document.querySelectorAll('.input-range').forEach((item) => {
    item.addEventListener('input', handleInput);
  });
}

// Carrega e mostra nos textboxes os valores dos controles deslizantes
function showOutput() {
  textboxRed.value = sliderRed.value;
  textboxGreen.value = sliderGreen.value;
  textboxBlue.value = sliderBlue.value;
}

// Mostrar cores na div
function showColor() {
  divColor.style.backgroundColor = `rgb(${sliderRed.value}, ${sliderGreen.value}, ${sliderBlue.value})`;
}

// Carrega elementos da página
function loadElements()
{  
  sliderRed = document.querySelector('#sliderRed');
  sliderGreen = document.querySelector('#sliderGreen');
  sliderBlue = document.querySelector('#sliderBlue');
  textboxRed = document.querySelector('#textboxRed');
  textboxGreen = document.querySelector('#textboxGreen');
  textboxBlue = document.querySelector('#textboxBlue');
  divColor = document.querySelector('#divColor');
}
