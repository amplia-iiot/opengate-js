'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ProvisionGenericFinder2 = require('../../ProvisionGenericFinder');

var _ProvisionGenericFinder3 = _interopRequireDefault(_ProvisionGenericFinder2);

var DATAMODEL_RESOURCE = '/datamodels/';

exports.DATAMODEL_RESOURCE = DATAMODEL_RESOURCE;
/**
 *   This class allow make get request to organization resource into Opengate North API.
 */

var DatamodelsFinder = (function (_ProvisionGenericFinder) {
  _inherits(DatamodelsFinder, _ProvisionGenericFinder);

  /**
   * @param {InternalOpenGateAPI} Reference to the API object.
   */

  function DatamodelsFinder(ogapi) {
    _classCallCheck(this, DatamodelsFinder);

    _get(Object.getPrototypeOf(DatamodelsFinder.prototype), 'constructor', this).call(this, ogapi, 'organizations/', 'datamodels', 'Datamodel not found');
  }

  /**
   * @return {String} This returns a string with the URL of the request.
   * @private
   */

  _createClass(DatamodelsFinder, [{
    key: '_composeUrl',
    value: function _composeUrl() {
      return this._baseUrl + this._organization + DATAMODEL_RESOURCE + this._id;
    }

    /**
     * Download a specific IoT Datamodel by its organization and id. This execute a GET http method
     * @test
     *   ogapi.newDatamodelsFinder().findByOrganizationAndId('orgname', 'xxx-xx-xxx-xxx').then().catch();
     * @param {string} organization - datamodel organization .
     * @param {string} id - datamodel id.
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

  return DatamodelsFinder;
})(_ProvisionGenericFinder3['default']);

exports['default'] = DatamodelsFinder;
//# sourceMappingURL=DatamodelsFinder.js.map
