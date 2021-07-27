export default class Bingo {
  constructor() {
    // Get the bingos from the local storage
    this.bingos = JSON.parse(localStorage.getItem("bingos"));
    // if the list not exists or is undefined, create one element from it
    if (!this.bingos || this.bingos.length < 1) {
      this.bingos = [
        // Default first element of the list
        {
          id: 0,
          numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
      ];
    //   this.currentId = 1;
    } 
    // else {
    //   this.currentId = this.bingos[this.bingos.length - 1].id + 1;
    // }
  }

  // Save changes in local Storage
  save() {
    localStorage.setItem("bingos", JSON.stringify(this.bingos));
  }

  getBingos() {
    return this.bingos.map((bingo) => ({ ...bingo }));
  }

  addBingo(id, numbers) {
    const bingo = {
      id,
      numbers
    };

    this.bingos.push(bingo);
    this.save();

    return { ...bingo };
  }

  findBingo(id) {
    return this.bingos.findIndex((bingo) => bingo.id === id);
  }

  removeBingo(id) {
    const index = this.findBingo(id);
    this.bingos.splice(index, 1);
    this.save();
  }
}
