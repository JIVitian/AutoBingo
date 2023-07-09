export default class Bingo {
  constructor() {
    // Get the bingos from the local storage
    this.bingos = JSON.parse(localStorage.getItem('bingos'));
    // if the list not exists or is undefined, create one element from it
    if (!this.bingos || this.bingos.length < 1) {
      this.bingos = [
        // Default first element of the list
        {
          id: 0,
          numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          // Matrix represents each bingo's cell
          checks: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          ],

          // [[1, 0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0], [9,0], [10,0]]
        },
      ];
    }
  }

  // Save changes in local Storage
  save() {
    localStorage.setItem('bingos', JSON.stringify(this.bingos));
    return this;
  }

  setBingos(bingos) {
    this.bingos = bingos;
    return this.save;
  }

  // Retunrs a copy bingo's list
  getBingos() {
    return this.bingos.map((bingo) => ({ ...bingo }));
  }

  // Add a new bingo in the list and return it
  addBingo(id, numbers) {
    const checks = [];

    for (let i = 0; i < 10; i++) {
      checks.push([]);
      for (let j = 0; j < 10; j++) {
        checks[i].push(0);
      }
    }

    const bingo = {
      id,
      numbers,
      checks,
    };

    this.bingos.push(bingo);
    this.save();

    return { ...bingo };
  }

  findBingo(id) {
    return this.bingos.findIndex((bingo) => bingo.id === id);
  }

  checkCell(id, round, position) {
    const index = this.findBingo(id);
    this.bingos[index].checks[round][position] = 1;
    this.save();
  }

  removeBingo(id) {
    const index = this.findBingo(id);
    this.bingos.splice(index, 1);
    return this.save();
  }

  removeAllBingos() {
    this.bingos = [];
    return this.save();
  }
}
