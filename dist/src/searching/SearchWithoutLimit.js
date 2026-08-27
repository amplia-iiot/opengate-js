'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseSearch2 = require('./BaseSearch');

var _BaseSearch3 = _interopRequireDefault(_BaseSearch2);

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

/** 
 * This extends BaseSearch and allow make request to any available resource into Opengate North API.
 */

var SearchWithoutLimit = (function (_BaseSearch) {
	_inherits(SearchWithoutLimit, _BaseSearch);

	/**
    * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
    * @param {!string} url - this define a specific resource to make the search
    * @param {object} filter - this is the filter
    * @param {object} limit - this is the pagination about the search
    * @param {object} sort - this defined parameters to order the result of search
 * @param {object} group
 * @param {object} select
   	* @param {nubmer} timeout
    */

	function SearchWithoutLimit(ogapi, url, filter, sort, group, select, timeout, urlParams) {
		_classCallCheck(this, SearchWithoutLimit);

		_get(Object.getPrototypeOf(SearchWithoutLimit.prototype), 'constructor', this).call(this, ogapi, 'search' + url, timeout);
		this._setUrlParameters(urlParams);
		this._postObj = (0, _merge2['default'])(filter, group, select);
		if (typeof sort === 'object') {
			this._postObj = (0, _merge2['default'])(this._postObj, sort);
		}
	}

	_createClass(SearchWithoutLimit, [{
		key: '_filter',
		value: function _filter() {
			return this._postObj;
		}
	}]);

	return SearchWithoutLimit;
})(_BaseSearch3['default']);

exports['default'] = SearchWithoutLimit;
module.exports = exports['default'];
//# sourceMappingURL=SearchWithoutLimit.js.map
