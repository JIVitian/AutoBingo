// Wait until the document has loaded before run the scripts.
document.addEventListener("DOMContentLoaded", () => {
  const newBtn = document.getElementById("new-btn");
  const modalBtn = document.getElementById("save-btn");
  const jugada = document.getElementById("jugada");
  const container = document.querySelector(".grid-container");

  
  /******************************** FUNCTIONTS ********************************/

  // Show the modal when press the "Nuevo" button.
  newBtn.addEventListener("click", (e) => {
    e.preventDefault();
    $("#modal").modal("toggle");
  });
  
  // Get the bingos from the local storage
  const getBingos = () => {
    let bingos = JSON.parse(localStorage.getItem("bingos"));
    if (!bingos || bingos.length < 1) {
      bingos = [{
        id: 0,
        numbers: [0,1,2,3,4,5,6,7,8,9]
      }]
    }
    return bingos;
  }

  // Add new bingo to Local Storage
  const addBingo = (id, numbers) => {
    const bingo = { id, numbers }

    let bingos = getBingos();

    bingos.push(bingo);

    localStorage.setItem("bingos", JSON.stringify(bingos));
  }

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
    numbers.forEach(number => htmlCode.innerHTML += `<th scope="col">${number}</th>`)
    
    htmlCode.innerHTML += `</tr></thead><tbody>`;
    
    // Add 10 rows of empty cells
    for (let i = 0; i < 10; i++) {
      htmlCode.innerHTML += `<tr>`;
      for (let j = 0; j < 10; j++) htmlCode.innerHTML += `<td></td>`;
      htmlCode.innerHTML += `</tr>`;
    }
    
    htmlCode.innerHTML += `</tr></tbody></table></div>`;
    
    // Add the new bingo in DOM
    container.innerHTML += htmlCode.innerHTML;

    // Another way to do, need to prove
    // let bingo = document.createElement('div');
    // let table = document.createElement('table');
    // let caption = document.createElement('caption');
    // let thead = document.createElement('thead');
    // let tbody = document.createElement('tbody');
    // let numbers = document.createElement('tr');

    // caption.textContent = 'jsjsjsj'
    // table.appendChild(caption);

    // for(let cell of modalCells){
    //   let th = document.createElement('th');
    //   th.textContent = cell.textContent;
    //   numbers.appendChild(th);
    // }
  
    // thead.appendChild(numbers);
    // table.appendChild(thead);
    // container.appendChild(bingo);
    // bingo.appendChild(table);

    // bingo.className = 'bingo';
  }

  const init = () => {
    const bingos = getBingos();
    bingos.forEach(bingo => renderBingo(bingo.id, bingo.numbers));
  }

  init();

  /******************************** EVENTS ********************************/

  modalBtn.addEventListener("click", () => {
    let numBingo = document.getElementById("num-bingo");
    numBingo = numBingo.textContent.trim();
    const modalCells = document.querySelector(".modal-row").children;
    let numbers = [];

    for (let cell of modalCells) numbers.push(cell.textContent.trim());

    renderBingo(numBingo, numbers);
    
    addBingo(numBingo, numbers);
    console.log(getBingos());
    
    // Close the modal
    $("#modal").modal("toggle");
  });

  // By pressing enter, search in all the lists the entered number.
  jugada.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log(e);
      // Empty the input
      jugada.value = "";
    }
  });
});
