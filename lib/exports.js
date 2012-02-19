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

  return function() {
    var exp = {};

    Object.keys(self).forEach(function(key) {
      if (typeof self[key] === 'function') return;
      exp[key] = self[key];
    });

    self._restore();

    return tpl.replace('{:namespace}',
      'var ' + namespace + ' = ' + JSON.stringify(exp) + ';');
  };
};

/**
 * Restores the blank state of the exports object.
 *
 * @api private
 */
exports._restore = function() {
  var self = this;

  Object.keys(this).forEach(function(key) {
    if (typeof self[key] === 'function') return;
    delete self[key];
  });
};
