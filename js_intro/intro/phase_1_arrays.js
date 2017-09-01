Array.prototype.transpose = function uniq(){
  let matrix = [];

  for (let i = 0; i < this.length; i++){
    matrix.push([]);

    for (let j = 0; j < this[i].length; j++){
      matrix[i].push(this[j][i]);
    }
  }

  return matrix;
};

Array.prototype.twoSum = function uniq(){
  let sums = [];

  for (let i = 0; i < this.length; i++){
    for (let j = i + 1; j < this.length; j++){
      if (this[i] + this[j] === 2){
        sums.push([i, j]);
      }
    }
  }

  return sums;
};

Array.prototype.uniq = function uniq(){
  let uniques = [];

  this.forEach(function(el, i, a){
    if (!uniques.includes(el)){
      uniques.push(el);
    }
  });

  return uniques;
};
