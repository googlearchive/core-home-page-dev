/*
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

;(function() {

var console = {}
  , files = __TESTS__;

console.log = function(text) {
  var args = Array.prototype.slice.call(arguments, 1)
    , i = 0;

  text = text.replace(/%\w/g, function() {
    return args[i++] || '';
  });

  if (window.console) window.console.log(text);
  document.body.innerHTML += '<pre>' + escape(text) + '</pre>';
};

if (!Object.keys) {
  Object.keys = function(obj) {
    var out = []
      , key;

    for (key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        out.push(key);
      }
    }

    return out;
  };
}

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, context) {
    for (var i = 0; i < this.length; i++) {
      callback.call(context || null, this[i], i, obj);
    }
  };
}

if (!String.prototype.trim) {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

function load() {
  return files;
}

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

(__MAIN__)();

}).call(this);
