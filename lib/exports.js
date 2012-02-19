/*!
 * Exports
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Exports.
 *
 * @type {Object}
 */
var exports = module.exports;

/**
 * Return helper that renders the exposed variable 
 *
 * @param {String} Namespace.
 * @returns {Function}
 * @api public
 */
exports.helper = function(namespace) {
  var self = this;
  var tpl = '<script type="text/javascript">{:namespace}</script>';
  namespace || (namespace = 'exports');

  return function(req, res) {
    return tpl.replace('{:namespace}',
      'var ' + namespace + ' = ' + JSON.stringify(res.exports || {}) + ';');
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
