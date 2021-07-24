// Espero hasta que todo el contenido de la págoina haya cargado antes de ejecutar los scripts
document.addEventListener("DOMContentLoaded", () => {
  // const model = new Model();
  // const view = new View();
  // model.setView(view);
  // view.setModel(model);
  // view.render();

  const newBtn = document.getElementById("new-btn");
  const modalBtn = document.getElementById("save-btn");

  newBtn.addEventListener("click", (e) => {
    e.preventDefault();
    $("#modal").modal("toggle");
  });

  modalBtn.addEventListener("click", () => {
    const numBingo = document.getElementById("num-bingo");
    const modalCells = document.querySelector(".modal-row").children;
    const container = document.querySelector(".grid-container");

    let htmlCode = new DocumentFragment();
    htmlCode.innerHTML = `<div class="bingo">
        <table class="table table-bordered">
        <caption class="caption-top text-center bg-dark text-white">
            ${numBingo.textContent}
        </caption>
        <thead class="table-light">
            <tr class="text-center">`;

    // Add the numbers to the table head
    for (let cell of modalCells)
      htmlCode.innerHTML += `<th scope="col">${cell.textContent}</th>`;
    
    htmlCode.innerHTML += `</tr></thead><tbody>`;

    // Add 10 empty cells
    for (let i = 0; i < 10; i++){
      htmlCode.innerHTML += `<tr>`;
      for (let j = 0; j < 10; j++)
        htmlCode.innerHTML += `<td></td>`;
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
});
