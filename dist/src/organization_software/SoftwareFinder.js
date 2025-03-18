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

var _Software = require('./Software');

/**
 *   This class allow make get request to hardware softwares resource into Opengate North API.
 */

var SoftwareFinder = (function (_ProvisionGenericFinder) {
    _inherits(SoftwareFinder, _ProvisionGenericFinder);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function SoftwareFinder(ogapi) {
        _classCallCheck(this, SoftwareFinder);

        _get(Object.getPrototypeOf(SoftwareFinder.prototype), 'constructor', this).call(this, ogapi, _Software.PRE_RESOURCE, 'software', 'Software not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */

    _createClass(SoftwareFinder, [{
        key: '_composeUrl',
        value: function _composeUrl() {
            this._setUrlParameters({
                visibility: this._visibility || 'assignable'
            });

            return this._baseUrl + "/" + this._organization + _Software.SOFTWARES_RESOURCE + (this._identifier ? "/" + this._identifier : "/");
        }

        /**
         * Marks visibility assignable for software list retrieval
         * @test
         *   ogapi.newOrganizationSoftwareFinder().assignable().findByOrganization('organization').then().catch();
         * @return {this} 
         */
    }, {
        key: 'assignable',
        value: function assignable() {
            this._visibility = 'assignable';
            return this;
        }

        /**
         * Marks visibility administrable for software list retrieval
         * @test
         *   ogapi.newOrganizationSoftwareFinder().assignable().findByOrganization('organization').then().catch();
         * @return {this} 
         */
    }, {
        key: 'administrable',
        value: function administrable() {
            this._visibility = 'administrable';
            return this;
        }

        /**
         * Retrieves all software from a organization
         * @test
         *   ogapi.newOrganizationSoftwareFinder().findByOrganization('organization').then().catch();
         * @param {string} organization - organization name .
         * @return {Promise} 
         */
    }, {
        key: 'findByOrganization',
        value: function findByOrganization(organization) {
            this._organization = organization;
            return this._execute();
        }

        /**
         * Retrieves a specific software
         * @test
         *   ogapi.newOrganizationSoftwareFinder().findByOrganizationAndId('organization', 'identifier').then().catch();
         * @param {string} organization - organization name .
         * @param {string} identifier - software name .
         * @return {Promise} 
         */
    }, {
        key: 'findByOrganizationAndId',
        value: function findByOrganizationAndId(organization, identifier) {
            this._organization = organization;
            this._identifier = identifier;
            return this._execute();
        }
    }]);

    return SoftwareFinder;
})(_ProvisionGenericFinder3['default']);

exports['default'] = SoftwareFinder;
module.exports = exports['default'];
//# sourceMappingURL=SoftwareFinder.js.map
