(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.index = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * delegate-properties <https://github.com/jonschlinkert/delegate-properties>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var cloneDeep = require('clone-deep');
var defineProp = require('define-property');

/**
 * Delegate properties from `provider` to `receiver` and make them non-enumerable.
 *
 * @param  {Object} `receiver`
 * @param  {Object} `provider`
 */

module.exports = function delegate(receiver, provider) {
  provider = cloneDeep(provider || receiver);

  for (var key in provider) {
    defineProp(receiver, key, provider[key]);
  }
  return receiver;
};

},{"clone-deep":2,"define-property":10}],2:[function(require,module,exports){
'use strict';

/**
 * Module dependenices
 */

var typeOf = require('kind-of');
var forOwn = require('for-own');
var isObject = require('is-plain-object');
var clone = require('shallow-clone');

/**
 * Recursively clone native types.
 */

function cloneDeep(val, instanceClone) {
  switch (typeOf(val)) {
    case 'object':
      return cloneObjectDeep(val, instanceClone);
    case 'array':
      return cloneArrayDeep(val, instanceClone);
    default:
      return clone(val);
  }
}

function cloneObjectDeep(obj, instanceClone) {
  if (isObject(obj)) {
    var res = {};
    forOwn(obj, function (obj, key) {
      this[key] = cloneDeep(obj, instanceClone);
    }, res);
    return res;
  } else if (instanceClone) {
    return instanceClone(obj);
  } else {
    return obj;
  }
}

function cloneArrayDeep(arr, instanceClone) {
  var len = arr.length, res = [];
  var i = -1;
  while (++i < len) {
    res[i] = cloneDeep(arr[i], instanceClone);
  }
  return res;
}

/**
 * Expose `cloneDeep`
 */

module.exports = cloneDeep;

},{"for-own":3,"is-plain-object":5,"kind-of":7,"shallow-clone":8}],3:[function(require,module,exports){
/*!
 * for-own <https://github.com/jonschlinkert/for-own>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var forIn = require('for-in');
var hasOwn = Object.prototype.hasOwnProperty;

module.exports = function forOwn(o, fn, thisArg) {
  forIn(o, function (val, key) {
    if (hasOwn.call(o, key)) {
      return fn.call(thisArg, o[key], key, o);
    }
  });
};

},{"for-in":4}],4:[function(require,module,exports){
/*!
 * for-in <https://github.com/jonschlinkert/for-in>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function forIn(o, fn, thisArg) {
  for (var key in o) {
    if (fn.call(thisArg, o[key], key, o) === false) {
      break;
    }
  }
};
},{}],5:[function(require,module,exports){
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isObject = require('isobject');

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor,prot;
  
  if (isObjectObject(o) === false) return false;
  
  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;
  
  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;
  
  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }
  
  // Most likely a plain Object
  return true;
};

},{"isobject":6}],6:[function(require,module,exports){
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function isObject(val) {
  return val != null && typeof val === 'object'
    && !Array.isArray(val);
};

},{}],7:[function(require,module,exports){
var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

module.exports = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string'
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number'
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function'
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }

  // buffer
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // must be a plain object
  return 'object';
};

},{}],8:[function(require,module,exports){
/*!
 * shallow-clone <https://github.com/jonschlinkert/shallow-clone>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var lazy = require('lazy-cache')(require);
lazy.isObject = lazy('is-extendable');
lazy.mixin = lazy('mixin-object');
lazy.typeOf = lazy('kind-of');

/**
 * Shallow copy an object, array or primitive.
 *
 * @param  {any} `val`
 * @return {any}
 */

function clone(val) {
  var typeOf = lazy.typeOf();
  var type = typeOf(val);

  if (clone.hasOwnProperty(type)) {
    return clone[type](val);
  }
  return val;
}

clone.array = function cloneArray(arr) {
  return arr.slice();
};

clone.date = function cloneDate(date) {
  return new Date(+date);
};

clone.object = function cloneObject(obj) {
  var isObject = lazy.isObject();
  var mixin = lazy.mixin();

  if (isObject(obj)) {
    return mixin({}, obj);
  } else {
    return obj;
  }
};

clone.regexp = function cloneRegExp(re) {
  var flags = '';
  flags += re.multiline ? 'm' : '';
  flags += re.global ? 'g' : '';
  flags += re.ignorecase ? 'i' : '';
  return new RegExp(re.source, flags);
};

/**
 * Expose `clone`
 */

module.exports = clone;

},{"lazy-cache":9}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
/*!
 * define-property <https://github.com/jonschlinkert/define-property>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function defineProperty(receiver, key, val) {
  if (typeof receiver !== 'object') {
    throw new TypeError('expected an object.');
  }

  if (typeof key !== 'string') {
    throw new TypeError('expected `key` to be a string.');
  }

  return Object.defineProperty(receiver, key, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  });
};

},{}]},{},[1])(1)
});