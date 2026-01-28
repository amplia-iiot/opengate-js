'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _provisionBaseProvision = require('../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

var _utilFormatsCheck_types = require('../util/formats/check_types');

var _utilFormatsCheck_types2 = _interopRequireDefault(_utilFormatsCheck_types);

/**
 * This is a base object that contains all you can do about Bundles.
 */

var NotebookScheduler = (function (_BaseProvision) {
    _inherits(NotebookScheduler, _BaseProvision);

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function NotebookScheduler(ogapi) {
        _classCallCheck(this, NotebookScheduler);

        _get(Object.getPrototypeOf(NotebookScheduler.prototype), 'constructor', this).call(this, ogapi, "/schedulers", undefined, ["notebookId"], 'planner');
        this._ogapi = ogapi;
    }

    _createClass(NotebookScheduler, [{
        key: '_buildURL',
        value: function _buildURL() {
            _utilFormatsCheck_types2['default']._checkString(this._identifier, 'identifier');
            return "schedulers/" + this._identifier;
        }

        /**
         * Sets the identifier attribute
         * @param {string} identifier
         * @return {NotebookScheduler}
         */
    }, {
        key: 'withIdentifier',
        value: function withIdentifier(identifier) {
            _utilFormatsCheck_types2['default']._checkString(identifier, 'identifier');
            this._identifier = identifier;
            return this;
        }

        /**
         * Sets the notebookId attribute
         * @param {string} notebookId
         * @return {NotebookScheduler}
         */
    }, {
        key: 'withNotebookId',
        value: function withNotebookId(notebookId) {
            _utilFormatsCheck_types2['default']._checkString(notebookId, 'notebookId');
            this._notebookId = notebookId;
            return this;
        }

        /**
         * Sets the crontab pattern
         * @param {string} cronPattern
         * @return {NotebookScheduler}
         */
    }, {
        key: 'withCronPattern',
        value: function withCronPattern(cronPattern) {
            _utilFormatsCheck_types2['default']._checkString(cronPattern, 'cronPattern');
            this._cronPattern = cronPattern;
            return this;
        }

        /**
         * Sets the generateReport attribute
         * @param {boolean} generateReport
         * @return {NotebookScheduler}
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
         * @return {NotebookScheduler}
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
                notebookId: this._notebookId,
                cronPattern: this._cronPattern || '* * * * *',
                reportRetentionDays: this._reportRetentionDays || 0,
                generateReport: this._generateReport || false,
                params: this._params || []
            };
            return notebookData;
        }
    }, {
        key: 'create',
        value: function create() {
            return this._doNorthPost('schedulers', this._composeElement());
        }
    }, {
        key: 'update',
        value: function update() {
            throw new Error('Update is not allowed!!!');
        }
    }]);

    return NotebookScheduler;
})(_provisionBaseProvision2['default']);

exports['default'] = NotebookScheduler;
module.exports = exports['default'];
//# sourceMappingURL=NotebookScheduler.js.map
