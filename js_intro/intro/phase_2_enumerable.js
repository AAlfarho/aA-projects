Array.prototype.myEach = function(cb) {
  for(let i = 0; i < this.length; i++) {
    cb(this[i], i, this);
  }
};

Array.prototype.map = function(cb) {
  let mapped = [];
  this.myEach(function(el, i){
    mapped.push(cb(el, i ,this));
  }.bind(this));

  return mapped;
};

Array.prototype.myReduce = function(cb, accum = 0) {
  this.myEach((el, i, a) => (accum = cb(accum, el)));
  return accum;
};
