// import the bingo's model
import Bingo from "./bingo.js";
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
  const iRound = document.getElementById("ronda");
  const alert = document.getElementById("modal-alert");
  const model = new Bingo();
  const utils = new Utils();

  /******************************** FUNCTIONTS ********************************/

  // Render a new bingo in the DOM
  const renderBingo = (numBingo, numbers) => {
    let htmlCode = new DocumentFragment();
    const cardboard = document.createElement("div");
    cardboard.classList.add("bingo");

    htmlCode.innerHTML = `
    <table class="table table-bordered">
    <caption class="caption-top text-center bg-dark text-white">
      <div>
        N° ${numBingo}
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
    cardboard.querySelector(".fa-trash").addEventListener("click", () => {
      // window.alert("Are you sure you want to delete?");
      $("#deleteModal").modal("toggle");
      document.getElementById("deleteButton").onclick = () => {
        cardboard.remove();
        model.removeBingo(numBingo);
        $("#deleteModal").modal("toggle");
      };
    });
    // Add the new cardBoard
    container.appendChild(cardboard);
  };

  // Locate the number in the stored bingos.
  const locateNumber = (value) => {
    return model
      .getBingos()
      .map((bingo) => utils.binarySearch(bingo.numbers, parseInt(value)));
  };

  // Check the cell that contains the entered value, in the bingo entered, in the entered round.
  const renderChecked = (numBingo, round = 1, position) => {
    const row = document.querySelector(`#n${numBingo}r${round}`).children;
    // const occurrencies = locateNumber(jugada.value);
    if (row[position]) {
      row[position].textContent = "X";
    }
  };

  const orderControl = () => {
    let bingos = model.getBingos();
    for (let bingo in bingos) {
      let rows = bingos[bingo].checks;
      let count = rows[iRound.value - 1].reduce(
        (count, check) => count + check
      );
      container.children[bingo].style = `order: -${count};`;
    }
  };

  // Render all the bingos stored in Local Storage
  const init = () => {
    model.getBingos().forEach((bingo) => {
      renderBingo(bingo.id, bingo.numbers);
      // Render all the checked cells
      for (let round in bingo.checks) {
        for (let position in bingo.checks[round]) {
          if (bingo.checks[round][position] !== 0)
            renderChecked(bingo.id, parseInt(round) + 1, position);
        }
      }
    });
    orderControl();
  };

  init();

  const inputControls = (event, element) => {
    event.preventDefault();
    // if (element.value === "" || (element.value < element.max.slice(0,0) && event.key === "0")) {
    if (
      (element.value === "" && event.key !== "0") ||
      (parseInt(element.value + event.key) <= element.max &&
        parseInt(element.value + event.key) >= element.min)
    ) {
      element.value += event.key;
    }
  };

  const modalCellControls = (event, element) => {
    event.preventDefault();
    // if (element.value === "" || (element.value < element.max.slice(0,0) && event.key === "0")) {
    if (
      (element.textContent === "" && event.key !== "0") ||
      (parseInt(element.textContent + event.key) <= 90 &&
        parseInt(element.textContent + event.key) >= 1)
    ) {
      element.textContent += event.key;
    }
  };

  const newBingoControls = () => {
    const regex = /\d{1,4}/;
    const numbers = [];

    if (!regex.test(numBingo.textContent))
      return { condition: false, message: "Solo puede ingresar números!" };
    if (model.getBingos().filter(bingo => bingo.id == numBingo.textContent).length > 0)
      return { condition : false , message: "El numero de ese bingo ya existe!"}
    for (let cell of modalCells) {
      if (!regex.test(cell.textContent))
        return { condition: false, message: "Solo puede ingresar números!" };
      // Check that there are no repeated numbers
      if (numbers.filter((number) => number == cell.textContent).length > 0)
        return {
          condition: false,
          message: "No pueden haber numeros repetidos repetidos!",
        };
      numbers.push(cell.textContent);
    }

    return { condition : true };
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

    const controls = newBingoControls();

    if (controls.condition) {
      for (let cell of modalCells) numbers.push(parseInt(cell.textContent));
      numbers = utils.quickSort(numbers);
      renderBingo(id, numbers);
      model.addBingo(id, numbers);

      alert.classList.add("d-none");
      // Close the modal.
      $("#modal").modal("toggle");
    } else {
      alert.classList.remove("d-none");
      alert.innerText = controls.message;
    }
  });

  // When the modal's caption is clicked, its content will be emptied.
  numBingo.addEventListener("click", () => (numBingo.textContent = ""));

  // The 'Aleatorio' button create a random bingo
  document.getElementById("random-btn").addEventListener("click", () => {
    const randomId = Math.round(Math.random() * 9999 + 1);
    let randomNumbers = [];
    for (let i = 0; i < 10; i++)
      randomNumbers.push(Math.round(Math.random() * 89 + 1));
    randomNumbers = utils.quickSort(randomNumbers);
    model.addBingo(randomId, randomNumbers);
    renderBingo(randomId, randomNumbers);
  });

  document.getElementById("decrease").addEventListener("click", () => {
    if (iRound.value > 1) iRound.value--;
  });

  document.getElementById("increase").addEventListener("click", () => {
    if (iRound.value < 10) iRound.value++;
  });

  iRound.addEventListener("keypress", (e) => {
    inputControls(e, iRound);
  });

  // When a modal's cell is clicked, its content will be emptied.
  for (let cell of modalCells) {
    cell.addEventListener("click", () => (cell.textContent = ""));
    cell.addEventListener("keypress", (e) => {
      modalCellControls(e, cell);
      if (e.key === "Enter");
    });
  }

  // By pressing enter, search in all the lists the entered number.
  jugada.addEventListener("keypress", (e) => {
    const bingos = model.getBingos();
    const occurrencies = locateNumber(jugada.value);

    // When entering a number pressing Enter, the corresponding cell in each bingo will be checked.
    if (e.key === "Enter" && !e.shiftKey) {
      for (let index in bingos) {
        renderChecked(
          bingos[index].id,
          iRound.value ? iRound.value : 1,
          occurrencies[index]
        );
        model.checkCell(
          bingos[index].id,
          iRound.value ? iRound.value - 1 : 0,
          occurrencies[index]
        );
        orderControl();
      }

      // Empty the input
      jugada.value = "";
    } else {
      inputControls(e, jugada);
    }
  });

  // jugada.addEventListener();
});
