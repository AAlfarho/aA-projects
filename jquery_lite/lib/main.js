const DOMNodeCollection = require('./dom_node_collection.js');

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
