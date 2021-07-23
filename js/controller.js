import Model from "./model.js";
import View from "./view.js";

export default class Controller {
  constructor() {
    this.model = null;
    this.view = null;
  }

  setModel(model) {
    this.model = model;
  }

  setView(view) {
    this.view = view;
  }

  addBingo(bingo) {
    
  }

  getBingos()
  {

  }

  

  updateBingo() {}

  deleteBingo() {}
}
