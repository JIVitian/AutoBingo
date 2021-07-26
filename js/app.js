import Utils from "./utils.js";

// Wait until the document has loaded before run the scripts.
document.addEventListener("DOMContentLoaded", () => {
  const newBtn = document.getElementById("new-btn");
  const modalBtn = document.getElementById("save-btn");
  const jugada = document.getElementById("jugada");
  const container = document.querySelector(".grid-container");
  const numBingo = document.getElementById("num-bingo");
  const modalCells = document.querySelector(".modal-row").children;
  const utils = new Utils();

  /******************************** FUNCTIONTS ********************************/

  // Get the bingos from the local storage
  const getBingos = () => {
    let bingos = JSON.parse(localStorage.getItem("bingos"));
    if (!bingos || bingos.length < 1) {
      bingos = [
        {
          id: 0,
          numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
      ];
    }
    return bingos;
  };

  // Add new bingo to Local Storage
  const addBingo = (id, numbers) => {
    let bingos = getBingos();

    bingos.push({ id, numbers });

    localStorage.setItem("bingos", JSON.stringify(bingos));
  };

  const renderBingo = (numBingo, numbers) => {
    let htmlCode = new DocumentFragment();

    htmlCode.innerHTML = `<div class="bingo">
    <table class="table table-bordered">
    <caption class="caption-top text-center bg-dark text-white">
    ${numBingo}
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

    htmlCode.innerHTML += `</tr></tbody></table></div>`;

    // Add the new bingo in DOM
    container.innerHTML += htmlCode.innerHTML;
  };

  // Render all the bingos stored in Local Storage
  const init = () => {
    const bingos = getBingos();
    bingos.forEach((bingo) => renderBingo(bingo.id, bingo.numbers));
  };

  init();

  // Locate the number in the stored bingos.
  const locateNumber = (value) => {
    const bingos = getBingos();
    let occurrencies = [];
    bingos.forEach((bingo) =>
      occurrencies.push(utils.binarySearch(bingo.numbers, parseInt(value)))
    );
    return occurrencies;
  };

  // Check the cell that contains the entered value, in the bingo entered, in the entered round.
  const renderChecked = (numBingo, round = 1, occurrence) => {
    let row = document.querySelector(`#n${numBingo}r${round}`).children;
    if (row[occurrence]) row[occurrence].textContent = "X";
  };

  // renderChecked("Pepi", undefined, 4);

  /******************************** EVENTS ********************************/

  // Show the modal when press the "Nuevo" button.
  newBtn.addEventListener("click", (e) => {
    e.preventDefault();
    numBingo.textContent = "N° de Bingo";
    for (let cell of modalCells) cell.textContent = "-";
    $("#modal").modal("toggle");
  });

  modalBtn.addEventListener("click", () => {
    let id = numBingo.textContent.trim();
    let numbers = [];

    for (let cell of modalCells) numbers.push(cell.textContent.trim());

    renderBingo(id, numbers);

    addBingo(id, numbers);
    console.log(getBingos());

    // Close the modal
    $("#modal").modal("toggle");
  });

  numBingo.addEventListener("click", () => (numBingo.textContent = ""));

  for (let cell of modalCells)
    cell.addEventListener("click", () => (cell.textContent = ""));

  // By pressing enter, search in all the lists the entered number.
  jugada.addEventListener("keypress", (e) => {
    const bingos = getBingos();
    const occurrencies = locateNumber(jugada.value);

    if (e.key === "Enter" && !e.shiftKey) {
      for (let index in bingos)
        renderChecked(bingos[index].id, 1, occurrencies[index]);

      // Empty the input
      jugada.value = "";
    }
  });
});
