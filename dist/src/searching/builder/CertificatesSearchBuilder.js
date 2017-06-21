'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SearchBuilder2 = require('./SearchBuilder');

var _SearchBuilder3 = _interopRequireDefault(_SearchBuilder2);

var _utilSearchingFieldsFieldFinder = require('../../util/searchingFields/FieldFinder');

var _utilSearchingFieldsFieldFinder2 = _interopRequireDefault(_utilSearchingFieldsFieldFinder);

var BASE_URL = '/certificates';
/**
 * Defined a search over Bundles    
 * @example ogapi.bundlesSearchBuilder()
 */

var CertificatesSearchBuilder = (function (_SearchBuilder) {
    _inherits(CertificatesSearchBuilder, _SearchBuilder);

    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */

    function CertificatesSearchBuilder(parent) {
        _classCallCheck(this, CertificatesSearchBuilder);

        _get(Object.getPrototypeOf(CertificatesSearchBuilder.prototype), 'constructor', this).call(this, parent, {}, new _utilSearchingFieldsFieldFinder2['default'](parent, BASE_URL));
        this._url = BASE_URL;
        this._fetch = false;
        this._assignable = false;
    }

    /** 
     *  The search result will have all certificates which can be assignable to some device
     *  ogapi.certificatesSearchBuilder().assignable()
     * @return {CertificatesSearchBuilder} 
     */

    _createClass(CertificatesSearchBuilder, [{
        key: 'assignable',
        value: function assignable() {
            this._assignable = true;
            return this;
        }

        /**
         * The search result will have all certificates which can be administered by the user
         * @example
         *  ogapi.certificatesSearchBuilder().administrable()
         * @return {CertificatesSearchBuilder} 
         **/
    }, {
        key: 'administrable',
        value: function administrable() {
            this._assignable = false;
            return this;
        }

        /**
         * Set fecth value
         * @example
         *  ogapi.certificatesSearchBuilder().withFetch(true)
         * @param {!flag} flag
         * @throws {Error} throw error when flag is not a number
         * @return {CertificatesSearchBuilder} 
         */
    }, {
        key: 'withFetch',
        value: function withFetch(flag) {
            if (flag === true || flag === false) {
                this._fetch = flag;
            } else {
                throw new Error('Flag fecth incorrect');
            }
            return this;
        }
    }, {
        key: '_buildUrl',
        value: function _buildUrl() {
            var url = this._url;
            var params = undefined;
            if (this._fetch === true) {
                params = "?fetch=1";
            }
            if (this._assignable === true) {
                if (typeof params === "undefined") {
                    params = "?";
                } else {
                    params = params + "&";
                }
                params = params + "visibility=assignable";
            }
            if (typeof params === "string") {
                url = url + params;
            }
            return url;
        }
    }]);

    return CertificatesSearchBuilder;
})(_SearchBuilder3['default']);

exports['default'] = CertificatesSearchBuilder;
module.exports = exports['default'];
//# sourceMappingURL=CertificatesSearchBuilder.js.map
