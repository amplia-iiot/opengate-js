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

var _GenericFinder2 = require('../GenericFinder');

var _GenericFinder3 = _interopRequireDefault(_GenericFinder2);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

/**
 *   This class allow make get request to DatasetFinder resource into Opengate North API.
 */

var DatasetFinder = (function (_GenericFinder) {
    _inherits(DatasetFinder, _GenericFinder);

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */

    function DatasetFinder(ogapi) {
        _classCallCheck(this, DatasetFinder);

        _get(Object.getPrototypeOf(DatasetFinder.prototype), 'constructor', this).call(this, ogapi, 'datasets/provision/organizations', 'datasets');
    }

    /**
     * Performs a get that returns list of datasets
     * @test
     *   ogapi.newDatasetFinder().findByOrganization(organization);
     * @param {string} organization - organization
     * @return {Promise} 
     */

    _createClass(DatasetFinder, [{
        key: 'findByOrganization',
        value: function findByOrganization(organization) {
            this._withId(organization);
            return this._execute();
        }

        /**
         * Performs a get that returns a definition of dataset
         * @test
         *   ogapi.newDatasetFinder().findByOrganizationAndDatasetId(organization, datasetId);
         * @param {string} organization - organization
         * @param {string} datasetId - dataset identifier
         * @return {Promise} 
         */
    }, {
        key: 'findByOrganizationAndDatasetId',
        value: function findByOrganizationAndDatasetId(organization, datasetId) {
            this._withId(organization + '/' + datasetId);
            return this._execute();
        }

        /**
         * Performs a get that returns a definition of timeserie
         * @test
         *   ogapi.newDatasetFinder().findByOrganizationAndName(organization, name);
         * @param {string} organization - organization
         * @param {string} name - timeserie name
         * @return {Promise} 
         */
    }, {
        key: 'findByOrganizationAndName',
        value: function findByOrganizationAndName(organization, name) {
            var defered = _q2['default'].defer();
            var promise = defered.promise;

            this._withId(organization);
            var _this = this;
            var _error_not_found = this._error_not_found;
            var _entity = this._entity;
            this._execute().then(function (result) {
                if (result.data.length > 0) {
                    var timeserieId;
                    result.data.forEach(function (tsData) {
                        if (!timeserieId && tsData.name === name) {
                            timeserieId = tsData.identifier;
                        }
                    });

                    if (!timeserieId) {
                        defered.reject({
                            error: _error_not_found,
                            statusCode: _httpStatusCodes2['default'].NOT_FOUND
                        });
                    } else {
                        _this._withId(organization + '/' + timeserieId);

                        _this._api.get(_this._composeUrl(), undefined, _this._getExtraHeaders(), _this._getUrlParameters(), false, _this._getServiceBaseURL()).then(function (req) {
                            if (req.statusCode === 204) {
                                defered.reject({
                                    error: _error_not_found,
                                    statusCode: _httpStatusCodes2['default'].NOT_FOUND
                                });
                            } else {
                                if (req.body) {
                                    var data = req.body[_entity] && req.body.provision ? req.body : req.body[_entity];
                                    defered.resolve({
                                        data: data ? data : req.body,
                                        statusCode: req.statusCode
                                    });
                                } else {
                                    defered.resolve({
                                        data: req.text,
                                        statusCode: req.statusCode
                                    });
                                }
                            }
                        })['catch'](function (error) {
                            // BUG RELACIONADO (http://cm.amplia.es/jira/browse/OGODM-3250)
                            if (error.statusCode === 400) {
                                error.statusCode = _httpStatusCodes2['default'].NOT_FOUND;
                            }

                            defered.reject(error);
                        });
                    }
                } else {
                    defered.reject({
                        error: _error_not_found,
                        statusCode: _httpStatusCodes2['default'].NOT_FOUND
                    });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });

            return promise;
        }
    }]);

    return DatasetFinder;
})(_GenericFinder3['default']);

exports['default'] = DatasetFinder;
module.exports = exports['default'];
//# sourceMappingURL=DatasetFinder.js.map
