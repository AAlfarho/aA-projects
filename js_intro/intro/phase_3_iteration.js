String.prototype.subStrings = function(){
  let substrings = [];

  for (let i = 0; i < this.length; i++){
    for (let j = i + 1; j <= this.length; j++){
      substrings.push(this.slice(i, j));
    }
  }

  return substrings;
};

Array.prototype.bubbleSort = function(){
  let sorted = this.slice();

  for (let i = 0; i < sorted.length; i++){
    for (let j = i + 1; j < sorted.length; j++){
      if (sorted[i] > sorted[j]){
        [sorted[i], sorted[j]] = [sorted[j], sorted[i]]; // swap!
      }
    }
  }

  return sorted;
};
