'use strict';

/* deps: mocha */
var assert = require('assert');
var define = require('./');

describe('define', function () {
  it('should copy properties from receiver to provider:', function () {
    var provider = {
      upper: function(val) {
        return val.toUpperCase();
      },
      lower: function(val) {
        return val.toLowerCase();
      }
    };

    var receiver = {};
    define(receiver, provider);

    assert.equal(receiver.upper('foo'), 'FOO');
    assert.equal(receiver.lower('BAR'), 'bar');
  });

  it('should make properties non-enumerable:', function () {
    var provider = {
      upper: function(val) {
        return val.toUpperCase();
      },
      lower: function(val) {
        return val.toLowerCase();
      }
    };

    var receiver = {};
    define(receiver, provider);
    assert.deepEqual(receiver, {});
  });
});
