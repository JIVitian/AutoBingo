import Controller from "./controller.js";

export default class View {
    constructor ()
    {
        this.Controller = null;
    }

    setController(controller)
    {
        this.controller = controller;
    }

    render()
    {
        const bingos = this.controller.getBingos();
        bingos.forEach((bingo) => {
            this.controller.createBingo(bingo);
        });
    }

    
}
