import Bingo from './bingo.js'
// import some functions
import Utils from "./utils.js";

// Wait until the document has loaded before run the scripts.
document.addEventListener("DOMContentLoaded", () => {
  const newBtn = document.getElementById("new-btn");
  const modalBtn = document.getElementById("save-btn");
  const jugada = document.getElementById("jugada");
  const container = document.querySelector(".grid-container");
  const numBingo = document.getElementById("num-bingo");
  const modalCells = document.querySelector(".modal-row").children;
  const round = document.getElementById("ronda");
  const model = new Bingo();
  const utils = new Utils();

  /******************************** FUNCTIONTS ********************************/

  // Render a new bingo in the DOM
  const renderBingo = (numBingo, numbers) => {
    let htmlCode = new DocumentFragment();
    const cardboard = document.createElement("div");
    cardboard.classList.add('bingo');

    htmlCode.innerHTML = `
    <table class="table table-bordered">
    <caption class="caption-top text-center bg-dark text-white">
      <div>
        ${numBingo}
        <i class="fas fa-trash text-danger float-end pe-3 pt-1"></i>
      </div>
    </caption>
    <thead class="table-light">
    <tr class="text-center">`;

    // Add the numbers to the table head
    numbers.forEach(
      (number) => (htmlCode.innerHTML += `<th scope="col">${number}</th>`)
    );

    htmlCode.innerHTML += `</tr></thead><tbody>`;

    // Add 10 rows of empty cells
    for (let i = 0; i < 10; i++) {
      htmlCode.innerHTML += `<tr id="n${numBingo}r${i + 1}">`;
      for (let j = 0; j < 10; j++) htmlCode.innerHTML += `<td></td>`;
      htmlCode.innerHTML += `</tr>`;
    }

    htmlCode.innerHTML += `</tr></tbody></table>`;

    // Add the contain into the cardboard
    cardboard.innerHTML += htmlCode.innerHTML;
    // Add the event to delete the cardboard
    cardboard.querySelector('.fa-trash').addEventListener('click', () => {
      cardboard.remove();
      model.removeBingo(numBingo);
    });
    // Add the new cardBoard
    container.appendChild(cardboard);
  };

  // Render all the bingos stored in Local Storage
  const init = () => {
    model.getBingos().forEach((bingo) => renderBingo(bingo.id, bingo.numbers));
  };

  init();

  // Locate the number in the stored bingos.
  const locateNumber = (value) => {
    return model.getBingos().map(bingo => utils.binarySearch(bingo.numbers, parseInt(value)));
  };

  // Check the cell that contains the entered value, in the bingo entered, in the entered round.
  const renderChecked = (numBingo, round = 1, occurrence) => {
    const row = document.querySelector(`#n${numBingo}r${round}`).children;
    if (row[occurrence]) row[occurrence].textContent = "X";
  };

  /******************************** EVENTS ********************************/

  // Show the modal when press the "Nuevo" button.
  newBtn.addEventListener("click", (e) => {
    e.preventDefault();
    numBingo.textContent = "N° de Bingo";
    for (let cell of modalCells) cell.textContent = "-";
    $("#modal").modal("toggle");
  });

  // Save and render the new bingo.
  modalBtn.addEventListener("click", () => {
    let id = numBingo.textContent.trim();
    let numbers = [];

    for (let cell of modalCells) numbers.push(cell.textContent.trim());
    renderBingo(id, numbers);
    model.addBingo(id, numbers);

    // Close the modal.
    $("#modal").modal("toggle");
  });

  // When the modal's caption is clicked, its content will be emptied.
  numBingo.addEventListener("click", () => (numBingo.textContent = ""));

  document.getElementById("random-btn").addEventListener("click", () => {
    const randomId = Math.round(Math.random() * 10000);
    let randomNumbers = [];
    for (let i = 0; i < 10; i++) randomNumbers.push(Math.round(Math.random() * 89 + 1));
    randomNumbers = utils.quickSort(randomNumbers);
    model.addBingo(randomId, randomNumbers);
    renderBingo(randomId, randomNumbers);
  });

  // When a modal's cell is clicked, its content will be emptied.
  for (let cell of modalCells)
    cell.addEventListener("click", () => (cell.textContent = ""));

  // By pressing enter, search in all the lists the entered number.
  jugada.addEventListener("keypress", (e) => {
    const bingos = model.getBingos();
    const occurrencies = locateNumber(jugada.value);

    // When entering a number pressing Enter, check the corresponding cell in each bingo.
    if (e.key === "Enter" && !e.shiftKey) {
      for (let index in bingos)
        renderChecked(
          bingos[index].id,
          round.value ? round.value : 1,
          occurrencies[index]
        );

      // Empty the input
      jugada.value = "";
    }
  });
});
