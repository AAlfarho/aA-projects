function Cat(name, owner){
  this.name = name;
  this.owner = owner;
}

Cat.prototype.cuteStatement = function(){
  return `${this.owner} loves ${this.name}`;
};

let joesCats = [
  new Cat('Zeus', 'Sarah'),
  new Cat('Catey', 'Dad'),
  new Cat('Yetti', 'Mom')
];

//joesCats.forEach(e => console.log(e.cuteStatement()));

Cat.prototype.cuteStatement = function(){
  return `Everyone loves ${this.name}`;
};

// joesCats.forEach(e => console.log(e.cuteStatement()));

Cat.prototype.meow = function(){};


joesCats[0].meow = () => console.log('meow');

//joesCats.forEach(e => e.meow());
