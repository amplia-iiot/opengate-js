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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _URL_ENUM = require('./URL_ENUM');

var _VISIBILITY_ENUM = require('./VISIBILITY_ENUM');

/**
 *   This class allow make get request to organization plans resource into Opengate North API.
 */

var OrganizationPlansFinder = (function (_ProvisionGenericFinder) {
    _inherits(OrganizationPlansFinder, _ProvisionGenericFinder);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function OrganizationPlansFinder(ogapi) {
        _classCallCheck(this, OrganizationPlansFinder);

        _get(Object.getPrototypeOf(OrganizationPlansFinder.prototype), 'constructor', this).call(this, ogapi, 'organizations', undefined, 'Organization plan not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */

    _createClass(OrganizationPlansFinder, [{
        key: '_composeUrl',
        value: function _composeUrl() {
            var _url = this._baseUrl + "/" + this._organization + "/" + _URL_ENUM.ORGANIZATION_PLANS;
            if (!_lodash2['default'].isNil(this._id)) {
                this['default']();
                return _url + this._id;
            }
            return _url;
        }

        /**
         * Marks visibility assignable for organization plans list retrieval
         *   ogapi.newOrganizationPlansFinder().assignable().findByOrganization('organization').then().catch();
         * @return {this} 
         */
    }, {
        key: 'assignable',
        value: function assignable() {
            this._setUrlParameters({ visibility: _VISIBILITY_ENUM.VISIBILITY.assignable });
            return this;
        }

        /**
          * Marks visibility administrable for organization plans list retrieval.
          *   ogapi.newOrganizationPlansFinder().administrable().findByOrganization('organization').then().catch();
          * @return {this} 
          */
    }, {
        key: 'administrable',
        value: function administrable() {
            this._setUrlParameters({ visibility: _VISIBILITY_ENUM.VISIBILITY.administrable });
            return this;
        }

        /**
         * Marks visibility default for plans list list retrieval.
         *   ogapi.newOrganizationPlansFinder().default().findByOrganization('organization').then().catch();
         * @return {this} 
         */
    }, {
        key: 'default',
        value: function _default() {
            this._setUrlParameters({ visibility: undefined });
            return this;
        }

        /**
         * Retrieves all plans from a organization
         *   ogapi.newOrganizationPlansFinder().findByOrganization('organization').then().catch();
         * @param {string} organization - organization name .
         * @return {Promise} 
         */
    }, {
        key: 'findByOrganization',
        value: function findByOrganization(organization) {
            this._organization = organization;
            this._entity = _URL_ENUM.PLANS;
            return this._execute();
        }

        /**
         * Retrieves a specific plan from a organization
         *   ogapi.newOrganizationPlansFinder().findByOrganizationAndId('organization', 'identifier').then().catch();
         * @param {string} organization - organization name .
         * @param {string} identifier - plan name.
         * @return {Promise} 
         */
    }, {
        key: 'findByOrganizationAndId',
        value: function findByOrganizationAndId(organization, identifier) {
            this._organization = organization;
            this._withId("/" + identifier);
            this._entity = _URL_ENUM.PLAN;
            return this._execute();
        }
    }]);

    return OrganizationPlansFinder;
})(_ProvisionGenericFinder3['default']);

exports['default'] = OrganizationPlansFinder;
module.exports = exports['default'];
//# sourceMappingURL=OrganizationPlansFinder.js.map
