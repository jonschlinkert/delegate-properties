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
