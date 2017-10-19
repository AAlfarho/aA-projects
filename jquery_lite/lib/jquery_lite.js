/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

function $l(selector){
  let htmlArr;
  if (typeof(selector) === "string"){
    htmlArr = Array.from(document.querySelectorAll(selector));
  } else if (selector instanceof HTMLElement) {
    htmlArr = [selector];
  }
  return new DOMNodeCollection(htmlArr);
}


window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);