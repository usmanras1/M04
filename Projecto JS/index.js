document.addEventListener("DOMContentLoaded", function() {
  
  const secretNumber = generateSecretNumber();

  console.log("Número secreto a adivinar:", secretNumber);

  const maxIteracion = 5;
  let currentIteracion = 0;

  const secretNumber = generateSecretNumber();

  const inputField = document.getElementById("inputSecuencia");
  const comprobarButton = document.querySelector(".btnComprobar");
  const infoParagraph = document.querySelector("#info");

  comprobarButton.addEventListener("click", function() {
    const userGuess = inputField.value;

    if (currentIteracion >= maxIteracion) {
      infoParagraph.textContent = "¡Has agotado tus 5 intentos!";
      inputField.disabled = true;
      comprobarButton.disabled = true;
      return;
    }

    if (userGuess.length !== 5 || isNaN(userGuess)) {
      infoParagraph.textContent = "Ingresa un número de 5 dígitos válido.";
      return;
    }

    currentIteracion++;

    const resultRow = document.querySelector(".result-row:nth-child(" + currentIteracion + ")");
    const userGuessArray = userGuess.split("");
    const secretNumberArray = secretNumber.toString().split("");

    for (let i = 0; i < 5; i++) {
      const cell = resultRow.querySelector(".result-cell:nth-child(" + (i + 1) + ")");
      cell.textContent = userGuessArray[i];

      if (userGuessArray[i] === secretNumberArray[i]) {
        cell.style.backgroundColor = "green";
      } else if (secretNumberArray.includes(userGuessArray[i])) {
        cell.style.backgroundColor = "yellow";
      } else {
        cell.style.backgroundColor = "darkgray";
      }
    }

    if (userGuess === secretNumber.toString()) {
      infoParagraph.textContent = `¡Felicidades! Has adivinado el número secreto en ${currentIteracion} intentos.`;
      inputField.disabled = true;
      comprobarButton.disabled = true;
    } else if (currentIteracion >= maxIteracion) {
      infoParagraph.textContent = `¡Has agotado tus 5 intentos! El número secreto era ${secretNumber}.`;
      inputField.disabled = true;
      comprobarButton.disabled = true;
    } else {
      inputField.value = "";
      inputField.focus();
      infoParagraph.textContent = `Intento ${currentIteracion} de 5.`;
    }
  });

  function generateSecretNumber() {
    const min = 10000;
    const max = 99999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});
