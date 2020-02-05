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

/**
 *   This class allow make get request to area resource into Opengate North API.
 */

var AreaFinder = (function (_ProvisionGenericFinder) {
    _inherits(AreaFinder, _ProvisionGenericFinder);

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */

    function AreaFinder(ogapi) {
        _classCallCheck(this, AreaFinder);

        _get(Object.getPrototypeOf(AreaFinder.prototype), 'constructor', this).call(this, ogapi, 'organizations', 'area', 'Area/s not found');
    }

    /**
     * Download a specific area by its organization and identifier. This execute a GET http method
     * @test
     *   ogapi.newAreaFinder().findByOrganizationAndIdentifier('orgname', xxx-xx-xxx-xxx').then().catch();
     * @param {string} organization - area organization .
     * @param {string} identifier - area name.
     * @return {Promise} 
     */

    _createClass(AreaFinder, [{
        key: 'findByOrganizationAndIdentifier',
        value: function findByOrganizationAndIdentifier(organization, identifier) {
            this._checkString(organization, 'organization');
            this._checkString(identifier, 'identifier');
            this._organization = organization;
            this._identifier = identifier;
            return this._execute();
        }
    }, {
        key: '_composeUrl',
        value: function _composeUrl() {
            return this._baseUrl + '/' + this._organization + '/areas' + '/' + this._identifier;
        }
    }, {
        key: '_checkString',
        value: function _checkString(parameter, name) {
            if (typeof parameter !== 'string') {
                throw new Error('OGAPI_STRING_PARAMETER');
            }
        }
    }]);

    return AreaFinder;
})(_ProvisionGenericFinder3['default']);

exports['default'] = AreaFinder;
module.exports = exports['default'];
//# sourceMappingURL=AreaFinder.js.map
