/*!
 * delegate-properties <https://github.com/jonschlinkert/delegate-properties>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var cloneDeep = require('clone-deep');
var define = require('define-property');

/**
 * Delegate properties from `provider` to `receiver` and make them non-enumerable.
 *
 * @param  {Object} `receiver`
 * @param  {Object} `provider`
 */

module.exports = function delegate(receiver, provider, clone) {
  if (clone) {
    provider = clone(provider || receiver);
  } else {
    provider = provider || receiver;
  }

  for (var key in provider) {
    define(receiver, key, provider[key]);
  }
  return receiver;
};
