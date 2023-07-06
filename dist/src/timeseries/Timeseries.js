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

var URL = 'timeseries/provision/organizations/';
exports.URL = URL;
/**
 * This is a base object that contains all you can do about Timeseries.
 */

var Timeseries = (function (_BaseProvision) {
    _inherits(Timeseries, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Timeseries(ogapi) {
        _classCallCheck(this, Timeseries);

        _get(Object.getPrototypeOf(Timeseries.prototype), 'constructor', this).call(this, ogapi, '/organizations/', undefined, ['name', 'organization', "timeBucket", 'identifierColumn']);
    }

    _createClass(Timeseries, [{
        key: '_buildURL',
        value: function _buildURL() {
            var url = URL + this._organization + '/' + this._identifier;

            if (this._onlyPlan) {
                url += '?onlyPlan=true';
            }

            return url;
        }

        /**
         * Set the organization attribute
         * @param {string} organization - required field
         * @return {Timeseries}
         */
    }, {
        key: 'withOrganization',
        value: function withOrganization(organization) {
            _utilFormatsCheck_types2['default']._checkStringAndLength(organization, 50, 'organization');
            this._organization = organization;
            return this;
        }

        /**
         * Set the identifier attribute
         * @param {string} identifier - required field
         * @return {Timeseries}
         */
    }, {
        key: 'withIdentifier',
        value: function withIdentifier(identifier) {
            _utilFormatsCheck_types2['default']._checkString(identifier, 'identifier');
            this._identifier = identifier;
            return this;
        }

        /**
         * Name which will be unique in each organization
         * @param {string} name - required field
         * @return {Timeseries}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            _utilFormatsCheck_types2['default']._checkStringAndPattern(name, "^[a-zA-Z0-9_@.-]*$", 'name');
            this._name = name;
            return this;
        }

        /**
         * Set the identifierColumn attribute
         * @param {string} identifierColumn - required field
         * @return {Datasets}
         */
    }, {
        key: 'withIdentifierColumn',
        value: function withIdentifierColumn(identifierColumn) {
            _utilFormatsCheck_types2['default']._checkString(identifierColumn, 'identifierColumn');
            this._identifierColumn = identifierColumn;
            return this;
        }

        /**
         * Duration of buckets in seconds.
         * @param {integer} timeBucket - required field
         * @return {Timeseries}
         */
    }, {
        key: 'withTimeBucket',
        value: function withTimeBucket(timeBucket) {
            _utilFormatsCheck_types2['default']._checkNumber(timeBucket, 'timeBucket');
            this._timeBucket = timeBucket;
            return this;
        }

        /**
         * Long text to explain timeserie definition
         * @param {string} description
         * @return {Timeseries}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (description) {
                _utilFormatsCheck_types2['default']._checkString(description, 'description');
            }

            this._description = description;
            return this;
        }

        /**
         * List of data that is needed for each entity.
         * @param {array} columns - required field
         * @return {Timeseries}
         */
    }, {
        key: 'withColumns',
        value: function withColumns(columns) {
            _utilFormatsCheck_types2['default']._checkArray(columns, 'columns');
            this._columns = columns;
            return this;
        }

        /**
         * Name of generated column with bucket date.Required if timeBucket > 0.
         * @param {string} bucketColumn - pattern: ^[a-zA-Z0-9 _-]*$
         * @return {Timeseries}
         */
    }, {
        key: 'withBucketColumn',
        value: function withBucketColumn(bucketColumn) {
            _utilFormatsCheck_types2['default']._checkStringAndPattern(bucketColumn, "^[a-zA-Z0-9 _-]*$", 'bucketColumn');
            this._bucketColumn = bucketColumn;
            return this;
        }

        /**
         * Name of generated column with bucket init date.
         * @param {string} bucketInitColumn - pattern: ^[a-zA-Z0-9 _-]*$
         * @return {Timeseries}
         */
    }, {
        key: 'withBucketInitColumn',
        value: function withBucketInitColumn(bucketInitColumn) {
            _utilFormatsCheck_types2['default']._checkStringAndPattern(bucketInitColumn, "^[a-zA-Z0-9 _-]*$", 'bucketInitColumn');
            this._bucketInitColumn = bucketInitColumn;
            return this;
        }

        /**
         * Time that a row is stored to be got in searching.  Default value is 1 month
         * @param {number} retention
         * @return {Timeseries}
         */
    }, {
        key: 'withRetention',
        value: function withRetention(retention) {
            _utilFormatsCheck_types2['default']._checkNumber(retention, 'retention');
            this._retention = retention;
            return this;
        }

        /** 
         * Initial date to first bucket with ISO date time format. Next bucket will be calcullated from this date. Default value is created date with time equals 00:00:00.000Z
         * @param {string}  origin
         * @return {Timeseries}
         */
    }, {
        key: 'withOrigin',
        value: function withOrigin(origin) {
            _utilFormatsCheck_types2['default']._checkISODateTime(origin, 'origin');
            this._origin = origin;
            return this;
        }

        /**
         * List of data that is needed for each entity.
         * @param {array} context
         * @return {Timeseries}
         */
    }, {
        key: 'withContext',
        value: function withContext(context) {
            _utilFormatsCheck_types2['default']._checkArray(context, 'context');
            this._context = context;
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._resource = URL + this._organization;
            if (this._timeBucket > 0) {
                _utilFormatsCheck_types2['default']._checkStringAndPattern(this._bucketColumn, "^[a-zA-Z0-9 _-]*$", 'bucketColumn');

                if (this._bucketInitColumn) {
                    _utilFormatsCheck_types2['default']._checkStringAndPattern(this._bucketInitColumn, "^[a-zA-Z0-9 _-]*$", 'bucketInitColumn');
                }
            }
            var timeserie = {
                name: this._name,
                description: this._description,
                timeBucket: this._timeBucket,
                bucketColumn: this._timeBucket ? this._bucketColumn : undefined,
                bucketInitColumn: this._timeBucket ? this._bucketInitColumn : undefined,
                retention: this._retention,
                origin: this._origin,
                context: this._context || [],
                identifierColumn: this._identifierColumn,
                columns: this._columns || []
            };
            return timeserie;
        }
    }, {
        key: '_composeUpdateElement',
        value: function _composeUpdateElement() {
            if (this._timeBucket > 0) {
                _utilFormatsCheck_types2['default']._checkStringAndPattern(this._bucketColumn, "^[a-zA-Z0-9 _-]*$", 'bucketColumn');

                if (this._bucketInitColumn) {
                    _utilFormatsCheck_types2['default']._checkStringAndPattern(this._bucketInitColumn, "^[a-zA-Z0-9 _-]*$", 'bucketInitColumn');
                }
            }
            var timeserie = {
                name: this._name,
                description: this._description,
                timeBucket: this._timeBucket,
                bucketColumn: this._timeBucket ? this._bucketColumn : undefined,
                bucketInitColumn: this._timeBucket ? this._bucketInitColumn : undefined,
                retention: this._retention,
                origin: this._origin,
                context: this._context || [],
                identifierColumn: this._identifierColumn,
                columns: this._columns || []
            };
            return timeserie;
        }
    }, {
        key: 'onlyPlan',
        value: function onlyPlan() {
            this._onlyPlan = true;
            return this;
        }

        /**
         * This method invalidates the update option
         * @throws {Allways} Timeseries cannot be updated.
         */
        // update() {
        //     throw new Error("OGAPI_TIMESERIES_NOT_UPDATED");
        // }
    }]);

    return Timeseries;
})(_provisionBaseProvision2['default']);

exports['default'] = Timeseries;
//# sourceMappingURL=Timeseries.js.map
