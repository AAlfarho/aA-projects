function sum(...args) {
  return args.reduce((acc, el) => {
    acc = acc + el;
    return acc;
  });
}

Function.prototype.myBind = function() {
  let args = [].slice.call(arguments);
  let context = args.shift();
  let that = this;
  return function() {
    // console.log(`args: ${arguments}`);
    let curriedArgs = [].slice.call(arguments);
    // console.log(`curriedArgs: ${curriedArgs}`);
    let allArgs = args.concat(curriedArgs);
    // console.log(allArgs);
    return that.apply(context, allArgs);
  };
};

Function.prototype.myBind2 = function(thisArg, ...bindArgs) {
  return (...curriedArgs) => {
    return this.apply(thisArg, bindArgs.concat(curriedArgs));
  };
};

// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//
//   says(sound, person) {
//     console.log(`${this.name} says ${sound} to ${person}!`);
//     return true;
//   }
// }
//
// const markov = new Cat("Markov");
// const breakfast = new Cat("Breakfast");
//
// markov.says("meow", "Ned");
// markov.says.myBind(breakfast, "meow", "Kush")();
// markov.says.myBind(breakfast)("meow", "a tree");
// markov.says.myBind(breakfast, "meow")("Markov");
// const notMarkovSays = markov.says.myBind(breakfast);
// notMarkovSays("meow", "me");

Function.prototype.curry2 = function (numArgs) {
  let numbers = [];
  let that = this;
  function _curriedSum (arg) {
    numbers.push(arg);
    if (numbers.length === numArgs) {
      return that(...numbers);
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
};

Function.prototype.curry = function (numArgs) {
  let numbers = [];
  let _curriedSum = (arg) => {
    numbers.push(arg);
    if (numbers.length === numArgs) {
      return this.apply(null,numbers);
    } else {
      return _curriedSum;
    }
  };
  return _curriedSum;
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

sumThree(4, 20, 6); // == 30

// you'll write `Function#curry`!
let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30

// or more briefly:
sumThree.curry(3)(4)(20)(6); // == 30
