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
  describe('when registering as a middleware', function() {
    it('should create exports object', function() {
      var res = {};
      exports.middleware({}, res, function() {
        res.exports.should.eql({});
      });
    });
  });

  describe('when exporting data', function() {
    it('should presist global exports', function() {
      var helper = exports.helper();
      var res = {exports: {}};
      exports.set('foo', 3);
      helper({}, res).should.eql('<script type="text/javascript">var exports = {"foo":3};</script>');
      exports.reset();
    });

    it('should convert properties to json', function() {
      var res = {exports: {}};
      var helper = exports.helper();
      res.exports = {foo: 3};
      helper({}, res).should.eql('<script type="text/javascript">var exports = {"foo":3};</script>');
    });

    it('should support custom namespace', function() {
      var helper = exports.helper('Name');
      var res = {exports: {}};
      res.exports.bar = {};
      helper({}, res).should.eql('<script type="text/javascript">var Name = {"bar":{}};</script>');
    });
  });
});
