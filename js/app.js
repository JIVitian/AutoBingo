// Espero hasta que todo el contenido de la págoina haya cargado antes de ejecutar los scripts
document.addEventListener("DOMContentLoaded", () => {
  // const model = new Model();
  // const view = new View();
  // model.setView(view);
  // view.setModel(model);
  // view.render();

  const newBtn = document.getElementById("new-btn");
  const modalBtn = document.getElementById("save-btn");
  const jugada = document.getElementById("jugada");
  
  newBtn.addEventListener("click", (e) => {
    e.preventDefault();
    $("#modal").modal("toggle");
  });
  
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
    
  const addBingo = (id, numbers) => {
    const bingo = { id, numbers}

    let bingos = getBingos();

    bingos.push(bingo);

    localStorage.setItem("bingos", JSON.stringify(bingos));
  }

  modalBtn.addEventListener("click", () => {
    let numBingo = document.getElementById("num-bingo");
    numBingo = numBingo.textContent.trim();
    const modalCells = document.querySelector(".modal-row").children;
    const container = document.querySelector(".grid-container");
    let numbers = [];
    
    let htmlCode = new DocumentFragment();
    htmlCode.innerHTML = `<div class="bingo">
    <table class="table table-bordered">
    <caption class="caption-top text-center bg-dark text-white">
    ${numBingo}
    </caption>
    <thead class="table-light">
    <tr class="text-center">`;
    
    // Add the numbers to the table head
    for (let cell of modalCells){
      htmlCode.innerHTML += `<th scope="col">${cell.textContent}</th>`;
      numbers.push(cell.textContent);
    }
    
    // Save the bingo in Local Storage
    addBingo(numBingo, numbers);
    console.log(getBingos());
    
    htmlCode.innerHTML += `</tr></thead><tbody>`;

    // Add 10 empty cells
    for (let i = 0; i < 10; i++) {
      htmlCode.innerHTML += `<tr>`;
      for (let j = 0; j < 10; j++) htmlCode.innerHTML += `<td></td>`;
      htmlCode.innerHTML += `</tr>`;
    }

    htmlCode.innerHTML += `</tr></tbody></table></div>`;
    

    // Add the new bingo in DOM
    container.innerHTML += htmlCode.innerHTML;

    // Close the modal
    $("#modal").modal("toggle");

    // Otra forma de hacerlo
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
