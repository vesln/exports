/*!
 * Exports
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Dependencies.
 */
var merge = require('super');

/**
 * Exports.
 *
 * @type {Object}
 */
var exports = module.exports;

/**
 * Global exports.
 *
 * @type {Object}
 */
var data = {};

/**
 * Return helper that renders the exposed variable 
 *
 * @param {String} Namespace.
 * @returns {Function}
 * @api public
 */
exports.helper = function(namespace) {
  var tpl = '<script type="text/javascript">{:namespace}</script>';
  namespace || (namespace = 'exports');

  return function(req, res) {
    var exp = merge(merge(data), res.exports);

    return tpl.replace('{:namespace}',
      'var ' + namespace + ' = ' + JSON.stringify(exp) + ';');
  };
};

/**
 * Exports middleware. Set empty exports property.
 *
 * @param {Object} Request.
 * @param {Object} Response.
 * @param {Function} Next.
 * @api public
 */
exports.middleware = function(req, res, next) {
  res.exports = {};
  next();
};

/**
 * Reset the data object.
 *
 * @returns `this`.
 * @api public
 */
exports.reset = function() {
  data = {};
  return this;
};

/**
 * Delete a property
 *
 * @returns `this`.
 * @api public
 */
exports.del = function(key) {
  delete data[key];
  return this;
};

/**
 * Sets a global property.
 *
 * @param {String} Key.
 * @param {Mixed} Value.
 * @returns `this`.
 * @api public
 */
exports.set = function(key, val) {
  data[key] = val;
  return this;
};
