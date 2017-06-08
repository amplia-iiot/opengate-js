'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _IoTProvisionGenericFinder2 = require('../IoTProvisionGenericFinder');

var _IoTProvisionGenericFinder3 = _interopRequireDefault(_IoTProvisionGenericFinder2);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var PROFILE_RESOURCE = '/profiles/';

exports.PROFILE_RESOURCE = PROFILE_RESOURCE;
/**
 *   This class allow make get request to organization resource into Opengate North API.
 */

var IoTProfilesFinder = (function (_IoTProvisionGenericFinder) {
  _inherits(IoTProfilesFinder, _IoTProvisionGenericFinder);

  /**
   * @param {InternalOpenGateAPI} Reference to the API object.
   */

  function IoTProfilesFinder(ogapi) {
    _classCallCheck(this, IoTProfilesFinder);

    _get(Object.getPrototypeOf(IoTProfilesFinder.prototype), 'constructor', this).call(this, ogapi, 'organizations/', 'profiles', 'IoT Profile not found');
  }

  /**
   * @return {String} This returns a string with the URL of the request.
   * @private
   */

  _createClass(IoTProfilesFinder, [{
    key: '_composeUrl',
    value: function _composeUrl() {
      return this._baseUrl + this._organization + PROFILE_RESOURCE + this._id;
    }

    /**
     * Download a specific IoT Profile by its organization and id. This execute a GET http method
     * @test
     *   ogapi.newIoTProfilesFinder().findByOrganizationAndId('orgname', 'xxx-xx-xxx-xxx').then().catch();
     * @param {string} organization - profile organization .
     * @param {string} id - profile id.
     * @return {Promise} 
     */
  }, {
    key: 'findByOrganizationAndId',
    value: function findByOrganizationAndId(organization, id) {
      this._organization = organization;
      this._id = id;
      return this._execute();
    }
  }]);

  return IoTProfilesFinder;
})(_IoTProvisionGenericFinder3['default']);

exports['default'] = IoTProfilesFinder;
//# sourceMappingURL=IoTProfilesFinder.js.map
