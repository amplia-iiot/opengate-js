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
 *   This class allow make get request to certificate resource into Opengate North API.
 */

var EntityFinder = (function (_ProvisionGenericFinder) {
    _inherits(EntityFinder, _ProvisionGenericFinder);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function EntityFinder(ogapi, source, entity, error_not_found) {
        _classCallCheck(this, EntityFinder);

        _get(Object.getPrototypeOf(EntityFinder.prototype), 'constructor', this).call(this, ogapi, source, entity, error_not_found);
        this._entitySource = this._entity + "s";
        this._flattened = false;
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */

    _createClass(EntityFinder, [{
        key: '_composeUrl',
        value: function _composeUrl() {
            if (this._flattened) {
                return this._baseUrl + "/" + this._organization + "/" + this._entitySource + "/" + this._id + "?flattened=true";
            } else {
                return this._baseUrl + "/" + this._organization + "/" + this._entitySource + "/" + this._id;
            }
        }

        /**
         * Download a specific entity by its organization and id. This execute a GET http method
         * @test
         *   ogapi.newDeviceFinder().findByOrganizationAndId('orgname', xxx-xx-xxx-xxx').then().catch();
         * @param {string} organization - entity organization .
         * @param {string} id - entity id.
         * @param {string} flattened - flattened response flag.
         * @return {Promise} 
         */
    }, {
        key: 'findByOrganizationAndId',
        value: function findByOrganizationAndId(organization, id, flattened) {
            this._organization = organization;
            this._id = id;
            this._flattened = flattened;
            return this._execute();
        }
    }]);

    return EntityFinder;
})(_ProvisionGenericFinder3['default']);

exports['default'] = EntityFinder;
module.exports = exports['default'];
//# sourceMappingURL=EntityFinder.js.map
