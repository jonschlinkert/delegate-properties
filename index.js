/*!
 * delegate-methods <https://github.com/jonschlinkert/delegate-methods>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var defineProp = require('define-property');

/**
 * Copy properties from `provider` to `receiver` and make them non-enumerable.
 *
 * @param  {Object} `receiver`
 * @param  {Object} `provider`
 */

module.exports = function defineProps(receiver, provider) {
  provider = provider || receiver;

  for (var key in provider) {
    defineProp(receiver, key, provider[key]);
  }
};
