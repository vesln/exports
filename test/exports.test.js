/*!
 * Exports
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Support.
 */
var should = require('chai').should();

/**
 * Context.
 *
 * @type {Object}
 */
var exports = require('../lib/exports');

describe('exports', function() {
  describe('when exporting data', function() {
    it('should convert properties to json', function() {
      exports.foo = 3;
      var helper = exports.helper();
      helper().should.eql('<script type="text/javascript">var exports = {"foo":3};</script>');
    });

    it('should restore the blank state of the exports object', function() {
      exports.foo = 3;
      var helper = exports.helper();
      helper();
      helper().should.eql('<script type="text/javascript">var exports = {};</script>');
    });

    it('should support custom namespace', function() {
      var helper = exports.helper('Name');
      exports.bar = {};
      helper().should.eql('<script type="text/javascript">var Name = {"bar":{}};</script>');
    });
  });
});
