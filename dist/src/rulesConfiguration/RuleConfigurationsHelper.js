'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _GenericFinder2 = require('../GenericFinder');

var _GenericFinder3 = _interopRequireDefault(_GenericFinder2);

/**
 *   This class allow make get request to RuleConfigurationsHelper resource into Opengate North API.
 */

var RuleConfigurationsHelper = (function (_GenericFinder) {
    _inherits(RuleConfigurationsHelper, _GenericFinder);

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */

    function RuleConfigurationsHelper(ogapi) {
        _classCallCheck(this, RuleConfigurationsHelper);

        _get(Object.getPrototypeOf(RuleConfigurationsHelper.prototype), 'constructor', this).call(this, ogapi, 'rules');
        this._jsHeaders = {
            'accept': 'application/javascript'
        };
        this._mdHeaders = {
            'accept': 'text/markdown'
        };
    }

    /**
     * Performs a get that returns dummy functions from rules service
     * @test
     *   ogapi.newRuleConfigurationsHelper().getdDummyFunctions();
     * @return {Promise} 
     */

    _createClass(RuleConfigurationsHelper, [{
        key: 'getdDummyFunctions',
        value: function getdDummyFunctions() {
            this._setExtraHeaders(this._jsHeaders);
            this._id = 'js/dummyFunctions';
            return this._execute();
        }

        /**
         * Performs a get that returns documentation private of javascript functions from rules service
         * @test
         *   ogapi.newRuleConfigurationsHelper().getDocPrivateJavascriptFunctions();
         * @return {Promise} 
         */
    }, {
        key: 'getDocPrivateJavascriptFunctions',
        value: function getDocPrivateJavascriptFunctions() {
            this._setExtraHeaders(this._mdHeaders);
            this._id = 'doc/private/javascriptFunctions';
            return this._execute();
        }

        /**
         * Performs a get that returns documentation of javascript functions from rules service
         * @test
         *   ogapi.newRuleConfigurationsHelper().getDocJavascriptFunctions();
         * @return {Promise} 
         */
    }, {
        key: 'getDocJavascriptFunctions',
        value: function getDocJavascriptFunctions() {
            this._setExtraHeaders(this._mdHeaders);
            this._id = 'doc/javascriptFunctions';
            return this._execute();
        }

        /**
         * @return {Promise}
         * @private
         */
    }, {
        key: '_execute',
        value: function _execute() {
            var defered = q.defer();
            var promise = defered.promise;
            var _error_not_found = this._error_not_found;
            this._api.get(this._composeUrl(), undefined, this._getExtraHeaders(), this._getUrlParameters()).then(function (req) {
                if (req.statusCode === 204) {
                    defered.reject({
                        error: _error_not_found,
                        statusCode: HttpStatus.NOT_FOUND
                    });
                } else {
                    var data = {
                        text: req.text,
                        type: req.type
                    };
                    defered.resolve({
                        data: data,
                        statusCode: req.statusCode
                    });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }]);

    return RuleConfigurationsHelper;
})(_GenericFinder3['default']);

exports['default'] = RuleConfigurationsHelper;
module.exports = exports['default'];
//# sourceMappingURL=RuleConfigurationsHelper.js.map
