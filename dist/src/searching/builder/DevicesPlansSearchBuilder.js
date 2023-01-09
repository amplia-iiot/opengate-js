'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SearchWithSummaryBuilder2 = require('./SearchWithSummaryBuilder');

var _SearchWithSummaryBuilder3 = _interopRequireDefault(_SearchWithSummaryBuilder2);

var _utilSearchingFieldsFieldFinder = require('../../util/searchingFields/FieldFinder');

var _utilSearchingFieldsFieldFinder2 = _interopRequireDefault(_utilSearchingFieldsFieldFinder);

var BASE_URL = '/catalog/plans/device';
/**
 * Defined a search over DevicePlansSearchBuilder	
 * @example ogapi.plansSearchBuilder()
 */

var DevicesPlansSearchBuilder = (function (_SearchWithSummaryBuilder) {
    _inherits(DevicesPlansSearchBuilder, _SearchWithSummaryBuilder);

    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */

    function DevicesPlansSearchBuilder(parent) {
        _classCallCheck(this, DevicesPlansSearchBuilder);

        _get(Object.getPrototypeOf(DevicesPlansSearchBuilder.prototype), 'constructor', this).call(this, parent, {}, new _utilSearchingFieldsFieldFinder2['default'](parent, BASE_URL));
        this._url = BASE_URL;
    }

    /**
     * Sets de domain name to search
     *
     * @example
     *  ogapi.plansSearchBuilder().withDomain('myDomain').build()
     * @param {!string} domainName - domain name
     * @throws {Error} throw error when domainName is not typeof string
     * @return {DevicePlansSearchBuilder} 
     */

    _createClass(DevicesPlansSearchBuilder, [{
        key: 'withDomain',
        value: function withDomain(domainName) {
            if (typeof domainName !== 'string') {
                throw new Error('Parameter domainName must be a string');
            }
            this._domainName = domainName;

            return this;
        }
    }, {
        key: '_buildUrl',
        value: function _buildUrl() {
            if (this._domainName) {
                this._url = BASE_URL + '?domainName=' + this._domainName;
            } else {
                throw new Error('Parameter domainName must be defined');
            }
            return _get(Object.getPrototypeOf(DevicesPlansSearchBuilder.prototype), '_buildUrl', this).call(this);
        }
    }]);

    return DevicesPlansSearchBuilder;
})(_SearchWithSummaryBuilder3['default']);

exports['default'] = DevicesPlansSearchBuilder;
module.exports = exports['default'];
//# sourceMappingURL=DevicesPlansSearchBuilder.js.map
