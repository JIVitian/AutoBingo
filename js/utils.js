export default class Utils {
  // Quicksort algorithm from https://www.etnassoft.com/2017/03/24/algoritmos-de-ordenacion-en-javascript-revision-es6/
  quickSort([x = [], ...xs]) {
    return x.length === 0
      ? []
      : [
          ...quickSort(xs.filter((y) => y <= x)),
          x,
          ...quickSort(xs.filter((y) => y > x)),
        ];
  }

  // Binary Search, assuming the arrangement is ordered, return the index a entered value
  binarySearch(array, value) {
    let min = 0;
    let max = array.length - 1;
    while (min <= max) {
      var guess = Math.floor((min + max) / 2);
      if (array[guess] == value) return guess;
      array[guess] < value ? (min = guess + 1) : (max = guess - 1);
    }
    return -1;
  }
}
