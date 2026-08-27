'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _SearchBuilder = require('./SearchBuilder');

var _Search = require('../Search');

var _Search2 = _interopRequireDefault(_Search);

/**
* Defined a search over custom resource and custom filter	
* @example ogapi.rawSearchBuilder().from('myresource').filter({and:[]})
*/

var RawSearchBuilder = (function () {
	function RawSearchBuilder(ogapi) {
		_classCallCheck(this, RawSearchBuilder);

		this._api = ogapi;
	}

	/**
 * Set custom url
 * @param {string} url - custom Opengate North API url
 * @throws {Error} throw error when url is not typeof string
 * @return RawSearchBuilder
 */

	_createClass(RawSearchBuilder, [{
		key: 'from',
		value: function from(url) {
			if (typeof url !== "string") throw new Error("Url parameter is mandatory and must be a string");
			this._url = url;
			return this;
		}

		/**
  * Set raw filter
     * @param {object} rawFilter - raw filter
     * @return RawSearchBuilder
  */
	}, {
		key: 'filter',
		value: function filter() {
			var rawFilter = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			this._filter = { filter: rawFilter };
			return this;
		}

		/**
   * Set raw limit
   * @param {object} rawLimit - raw limit
   * @return RawSearchBuilder
   */
	}, {
		key: 'limit',
		value: function limit() {
			var rawLimit = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			this._limit = { limit: rawLimit };
			return this;
		}

		/**
  * Create Search instance
  * @return Search
  * @throws {Error} throw error when url is not typeof string
  */
	}, {
		key: 'build',
		value: function build() {
			if (typeof this._url !== "string") throw new Error("Url parameter is mandatory and must be a string");
			return new _Search2['default'](this._api, this._url, this._filter, this._limit, {});
		}
	}]);

	return RawSearchBuilder;
})();

exports['default'] = RawSearchBuilder;
module.exports = exports['default'];
//# sourceMappingURL=RawSearchBuilder.js.map
