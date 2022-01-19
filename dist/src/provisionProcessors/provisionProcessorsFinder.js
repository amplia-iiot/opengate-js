'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _GenericFinder2 = require('../GenericFinder');

var _GenericFinder3 = _interopRequireDefault(_GenericFinder2);

/**
 *   This class allow make get request to ProvisionProcessors Finder resource into Opengate North API.
 */

var provisionProcessorsFinder = (function (_GenericFinder) {
  _inherits(provisionProcessorsFinder, _GenericFinder);

  /**     
   * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
   */

  function provisionProcessorsFinder(ogapi) {
    _classCallCheck(this, provisionProcessorsFinder);

    _get(Object.getPrototypeOf(provisionProcessorsFinder.prototype), 'constructor', this).call(this, ogapi, 'provisionProcessors/provision/organizations', 'provisionPrecessors');
  }

  /**
   * Performs a get that returns list of provision processors
   * @test
   *   ogapi.newProvisionProcessorsFinder().findByOrganization(organization);
   * @param {string} organization - organization
   * @return {Promise} 
   */

  _createClass(provisionProcessorsFinder, [{
    key: 'findByOrganization',
    value: function findByOrganization(organization) {
      this._withId(organization);
      return this._execute();
    }

    /**
     * Performs a get that returns a definition of provision Processors
     * @test
     *   ogapi.newProvisionProcessorsFinder().findByOrganizationAndProvisionProcessorId(organization, identifier);
     * @param {string} organization - organization
     * @param {string} identifier - Provision Processors identifier
     * @return {Promise} 
     */
  }, {
    key: 'findByOrganizationAndProvisionProcessorId',
    value: function findByOrganizationAndProvisionProcessorId(organization, identifier) {
      console.log('estoy aqui', organization + '/' + identifier);
      this._withId(organization + '/' + identifier);
      return this._execute();
    }
  }]);

  return provisionProcessorsFinder;
})(_GenericFinder3['default']);

exports['default'] = provisionProcessorsFinder;
module.exports = exports['default'];
//# sourceMappingURL=provisionProcessorsFinder.js.map
