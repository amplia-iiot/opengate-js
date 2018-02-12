'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ProvisionGenericFinder2 = require('../ProvisionGenericFinder');

var _ProvisionGenericFinder3 = _interopRequireDefault(_ProvisionGenericFinder2);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

/**
 *   This class allow make get request to organization resource into Opengate North API.
 */

var OrganizationFinder = (function (_ProvisionGenericFinder) {
    _inherits(OrganizationFinder, _ProvisionGenericFinder);

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */

    function OrganizationFinder(ogapi) {
        _classCallCheck(this, OrganizationFinder);

        _get(Object.getPrototypeOf(OrganizationFinder.prototype), 'constructor', this).call(this, ogapi, 'organizations', 'organization', 'Organization not found');
    }

    /**
     * Find a specify organization by a name. This execute a GET http method
     * @test
     *   ogapi.newOrganizationFinder().findByName('my_org').then().catch();
     * @param {string} name - Organization name
     * @return {Promise} 
     */

    _createClass(OrganizationFinder, [{
        key: 'findByName',
        value: function findByName(name) {
            this._id = name;
            return this._execute();
        }

        /**
         * Performs a get that returns organizations related
         * @test
         *   ogapi.newOrganizationFinder().findByDomainAndWorkgroup('xxx-xx-xxx-xxx', 'xxxxx-xxxx-xxxx').then().catch();
         * @param {string} domain - domain 
         * @param {string} workgroup - workgroup.
         * @return {Promise} 
         */
    }, {
        key: 'findByDomainAndWorkgroup',
        value: function findByDomainAndWorkgroup(domain, workgroup) {
            this._domain = domain;

            this._workgroup = workgroup;

            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var _error_not_found = this._error_not_found;

            this._executeWorkgroupRelation().then(function (request) {
                if (request.statusCode === 204) {
                    defered.reject({ data: _error_not_found, statusCode: _httpStatusCodes2['default'].NOT_FOUND });
                } else {
                    var globalData = request.data;
                    var organizations = {};
                    var finalData = [];

                    for (var idx in globalData.channels) {
                        if (!organizations[globalData.channels[idx].organization]) {
                            organizations[globalData.channels[idx].organization] = globalData.channels[idx].organization;
                            finalData.push({ "name": globalData.channels[idx].organization });
                        }
                    }

                    if (finalData.length > 0) {
                        defered.resolve({ data: finalData, statusCode: request.statusCode });
                    } else {
                        defered.reject({ data: _error_not_found, statusCode: _httpStatusCodes2['default'].NOT_FOUND });
                    }
                }
            })['catch'](function (error) {
                defered.reject(error);
            });

            return promise;
        }

        /**
         * @return {Promise}
         * @private
         */
    }, {
        key: '_executeWorkgroupRelation',
        value: function _executeWorkgroupRelation() {

            var workgroupsRelationsUrl = "provision/domains/" + this._domain + "/workgroups/" + this._workgroup + "/relations";

            var defered = _q2['default'].defer();
            var promise = defered.promise;

            var _error_not_found = this._error_not_found;
            this._api.get(workgroupsRelationsUrl, undefined, this._getExtraHeaders()).then(function (req) {
                if (req.statusCode === 204) {
                    defered.reject({ data: _error_not_found, statusCode: _httpStatusCodes2['default'].NOT_FOUND });
                } else {
                    defered.resolve({ data: req.body.workgroupRelation, statusCode: req.statusCode });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }]);

    return OrganizationFinder;
})(_ProvisionGenericFinder3['default']);

exports['default'] = OrganizationFinder;
module.exports = exports['default'];
//# sourceMappingURL=OrganizationFinder.js.map
