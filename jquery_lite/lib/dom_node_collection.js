class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }

  forEach(callback){
    this.elements.forEach(el => callback(el));
  }

  html(string) {
    if (string){
      this.forEach(el => {
        el.innerHTML = string;
      });
      return this.elements;
    }
    else {
      return this.elements[0].innerHTML;
    }
  }

  empty(){
    this.elements.forEach(el => {
      el.innerHTML = '';
    });
    return this;
  }

  append(innerElement) {
    if (typeof(innerElement) === "string") {
      this.forEach(el => {
        el.innerHTML += innerElement;
      });
    } else if (innerElement instanceof HTMLElement) {
      // const aux = new DOMNodeCollection([innerElement]);
      // aux.elements.forEach(children => {
      //   this.elements.forEach(parentEL => {parentEL.appendChild(children.cloneNode(true));});
      // });
      this.forEach(parentEl => {
        parentEl.appendChild(innerElement);
      });
    } else {
      this.forEach(parentEl => {
        innerElement.forEach(child => {
          parentEl.appendChild(child);
        });
      });
    }
    return this;
  }

  attr(attrKey, attrValue) {
    if (attrKey instanceof Object ){
      Object.keys(attrKey).forEach( key => {
        this.attr(key, attrKey[key]);
      });
    }
    else if (attrValue && attrKey){
      this.forEach(el => {
        el.setAttribute(attrKey, attrValue);
      });
    }
    else if (attrKey) {
      return Array.from(this.elements[0].attributes).filter(el =>{
        return el.name === attrKey;
      }).map( el => el.value )[0];
    }
    else {
      return this.elements[0].attributes;
    }
  }

  addClass(className) {
    this.forEach(el => {
      let classy = el.className + " " + className + " ";
      el.className = classy.trim();
    });
  }

  removeClass(className) {
    this.forEach(el => {
      let classArr = el.className.split(" ");
      classArr.splice(classArr.indexOf(className), 1);
      el.className = classArr.join(" ");
    });
  }
}

module.exports = DOMNodeCollection;
