const Util = {
  inherits(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
  },
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  dist(pos1, pos2) {
    return Math.sqrt(Math.pow((pos1[0] - pos2[0]),2) + Math.pow((pos1[1] - pos2[1]),2));
  },
  randomPos(x,y) {
    return [Math.ceil(Math.random() * x), Math.ceil(Math.random() * y)];
  }
};

module.exports = Util;
