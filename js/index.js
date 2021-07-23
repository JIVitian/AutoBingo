import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';

// Espero hasta que todo el contenido de la págoina haya cargado antes de ejecutar los scripts
document.addEventListener('DOMContentLoaded', () => {
  // const model = new Model();
  // const view = new View();
  // model.setView(view);
  // view.setModel(model);
  // view.render();

  const newBtn = document.getElementById("new-btn");

  newBtn.onclick = (e) =>{
    e.preventDefault();
    $("#modal").modal("toggle");
  }
});