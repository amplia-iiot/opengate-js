'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _provisionBaseProvision = require('../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

var _utilFormatsCheck_types = require('../util/formats/check_types');

var _utilFormatsCheck_types2 = _interopRequireDefault(_utilFormatsCheck_types);

/**
 * This is a base object that contains all you can do about Bundles.
 */

var NotebookLauncher = (function (_BaseProvision) {
    _inherits(NotebookLauncher, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function NotebookLauncher(ogapi) {
        _classCallCheck(this, NotebookLauncher);

        _get(Object.getPrototypeOf(NotebookLauncher.prototype), 'constructor', this).call(this, ogapi, "/notebooks", undefined, ["identifier"], 'planner');
        this._ogapi = ogapi;
    }

    _createClass(NotebookLauncher, [{
        key: '_buildURL',
        value: function _buildURL() {
            var url = "notebooks/" + this._identifier + '/execute';
            return url;
        }

        /**
         * Sets the identifier attribute
         * @param {string} identifier
         * @return {NotebookLauncher}
         */
    }, {
        key: 'withIdentifier',
        value: function withIdentifier(identifier) {
            _utilFormatsCheck_types2['default']._checkString(identifier, 'identifier');
            this._identifier = identifier;
            return this;
        }

        /**
         * Sets the generateReport attribute
         * @param {boolean} generateReport
         * @return {NotebookLauncher}
         */
    }, {
        key: 'generateReport',
        value: function generateReport(_generateReport) {
            _utilFormatsCheck_types2['default']._checkBoolean(_generateReport, 'generateReport');
            this._generateReport = _generateReport;
            return this;
        }

        /**
         * Sets the reportRetentionDays attribute
         * @param {number} reportRetentionDays
         * @return {NotebookLauncher}
         */
    }, {
        key: 'withReportRetentionDays',
        value: function withReportRetentionDays(reportRetentionDays) {
            _utilFormatsCheck_types2['default']._checkNumber(reportRetentionDays, 'reportRetentionDays');
            this._reportRetentionDays = reportRetentionDays;
            return this;
        }
    }, {
        key: 'withParams',
        value: function withParams(params) {
            _utilFormatsCheck_types2['default']._checkArray(params, 'params');
            this._params = params;
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._checkRequiredParameters();

            var notebookData = {
                reportRetentionDays: this._reportRetentionDays || 0,
                generateReport: this._generateReport || false,
                params: this._params || []
            };
            return notebookData;
        }
    }, {
        key: 'execute',
        value: function execute() {
            var defered = _q2['default'].defer();
            var promise = defered.promise;

            this._ogapi.Napi.post(this._buildURL(), this._composeElement(), this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL()).then(function (res) {
                defered.resolve({
                    statusCode: res.statusCode,
                    body: res.body
                });
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }, {
        key: 'create',
        value: function create() {
            throw new Error('Update is not allowed!!!');
        }
    }, {
        key: 'update',
        value: function update() {
            throw new Error('Update is not allowed!!!');
        }
    }, {
        key: 'delete',
        value: function _delete() {
            throw new Error('Delete is not allowed!!!');
        }
    }]);

    return NotebookLauncher;
})(_provisionBaseProvision2['default']);

exports['default'] = NotebookLauncher;
module.exports = exports['default'];
//# sourceMappingURL=NotebookLauncher.js.map
