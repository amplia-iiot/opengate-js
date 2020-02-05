'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SearchWithSummaryBuilder2 = require('./SearchWithSummaryBuilder');

var _SearchWithSummaryBuilder3 = _interopRequireDefault(_SearchWithSummaryBuilder2);

var _utilSearchingFieldsFieldFinder = require('../../util/searchingFields/FieldFinder');

var _utilSearchingFieldsFieldFinder2 = _interopRequireDefault(_utilSearchingFieldsFieldFinder);

var TOKEN_URL = '$_token';

exports.TOKEN_URL = TOKEN_URL;
/**
 * Defined a search over Executions	
 * @example ogapi.executionsSearchBuilder()
 */

var ExecutionsSearchBuilder = (function (_SearchWithSummaryBuilder) {
    _inherits(ExecutionsSearchBuilder, _SearchWithSummaryBuilder);

    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */

    function ExecutionsSearchBuilder(parent) {
        var fieldFinder = arguments.length <= 1 || arguments[1] === undefined ? new _utilSearchingFieldsFieldFinder2['default'](parent, '/operations') : arguments[1];
        return (function () {
            _classCallCheck(this, ExecutionsSearchBuilder);

            _get(Object.getPrototypeOf(ExecutionsSearchBuilder.prototype), 'constructor', this).call(this, parent, {
                onDevices: '/devices',
                onSubscribers: '/subscribers',
                onSubscriptions: '/subscriptions',
                onCommunicationsModules: '/communicationsModules'
            }, fieldFinder);
            this._url = '/entities' + TOKEN_URL + '/operations';
        }).apply(this, arguments);
    }

    _createClass(ExecutionsSearchBuilder, [{
        key: '_buildUrl',
        value: function _buildUrl() {
            this._checkConstraintRoutes();
            for (var route in this._routes) {
                if (this._builderParams[route]) {
                    this._url = this._url.replace(TOKEN_URL, this._routes[route]);
                }
            }
            return _get(Object.getPrototypeOf(ExecutionsSearchBuilder.prototype), '_buildUrl', this).call(this);
        }
    }]);

    return ExecutionsSearchBuilder;
})(_SearchWithSummaryBuilder3['default']);

exports['default'] = ExecutionsSearchBuilder;
//# sourceMappingURL=ExecutionsSearchBuilder.js.map
