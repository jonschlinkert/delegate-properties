(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.index = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * delegate-properties <https://github.com/jonschlinkert/delegate-properties>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var lazy = require('lazy-cache')(require);
lazy.cloneDeep = lazy('clone-deep');
lazy.defineProp = lazy('define-property');

/**
 * Delegate properties from `provider` to `receiver` and make them non-enumerable.
 *
 * @param  {Object} `receiver`
 * @param  {Object} `provider`
 */

module.exports = function delegate(receiver, provider) {
  var defineProp = lazy.defineProp();
  var cloneDeep = lazy.cloneDeep();

  provider = cloneDeep(provider || receiver);

  for (var key in provider) {
    defineProp(receiver, key, provider[key]);
  }
  return receiver;
};

},{"lazy-cache":2}],2:[function(require,module,exports){
'use strict';

var warning = lazyCache(require)('ansi-yellow');

function lazyCache(fn) {
  var cache = {};
  return function (name) {
    return function () {
      if (cache.hasOwnProperty(name)) {
        return cache[name];
      }
      try {
        return (cache[name] = fn(name));
      } catch (err) {
        console.log(warning()(err));
        return;
      }
    };
  };
}

/**
 * Expose `lazyCache`
 */

module.exports = lazyCache;

},{}]},{},[1])(1)
});