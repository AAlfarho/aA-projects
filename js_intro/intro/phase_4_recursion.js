const fibonacci = function fibonacci(n){
  if (n === 0)
    return [];
  else if (n === 1)
    return [0];
  else if (n === 2)
    return [0, 1];

  let fb1 = fibonacci(n - 1);

  return fb1.concat(fb1[fb1.length - 1] + fb1[fb1.length - 2]);
};

const range = function range(start, end) {
  /*if (start === end) {
    return [];
  }*/
  return [start].concat( start === end ? [] : range(start + 1, end));
};

const sumRec = function sumRec(arr) {
  if(arr.length === 0){
    return 0;
  }
  return arr[0] + sumRec(arr.slice(1, arr.length));
};

const exp1 = function exp1(base, power) {
  if (!power) {
    return 1;
  }
  return base * exp1(base, power - 1);
};

const exp2 = function exp2(base, power) {
  if (!power) {
    return 1;
  } else if ( power === 1) {
    return base;
  } else if (power % 2 === 0) {
    return exp2(base, power / 2) * exp2(base, power / 2);
  } else {
    return base *  exp2(exp2(base, (power - 1) / 2), 2);
  }
};

const bSearch = function bSearch(arr, target) {
  if(arr.length === 0){
    return -1;
  }

  let middleIndex = Math.floor((arr.length - 1) / 2);
  let midValue = arr[middleIndex];
  console.log(arr);
  if (midValue > target) {
    return bSearch(arr.slice(0, middleIndex), target);
  } else if (midValue < target) {
      let res = bSearch(arr.slice(middleIndex + 1, arr.length), target);
      if(res !== -1) {
        return middleIndex + res + 1;
      } else {
        return -1;
      }
  } else {
    return middleIndex;
  }
};

function mergeSort(arr){
  if(arr.length < 2){
    return arr;
  }
  let midPoint = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, midPoint));
  let right = mergeSort(arr.slice(midPoint, arr.length));

  return merge(left, right);

}

function merge(left, right){
  let merged = [];
  while(left.length && right.length){
    if(left[0] < right[0]){
      merged.push(left.shift());
    } else {
      merged.push(right.shift());
    }
  }
  return merged.concat(left).concat(right);
}

function subsets(arr){
  if (arr.length === 0) {
    return [[]];
  }
  let sugar = arr.shift();
  let subs = subsets(arr.slice());
  return subs.concat(subs.map((s) => {
      let newSub = s.slice();
      newSub.push(sugar);
      console.log(newSub);
      return newSub;
  }));
}
