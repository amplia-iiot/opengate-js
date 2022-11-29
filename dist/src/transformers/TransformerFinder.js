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

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

/**
 *   This class allow make get request to transformer resource into Opengate North API.
 */

var TransformerFinder = (function (_GenericFinder) {
    _inherits(TransformerFinder, _GenericFinder);

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */

    function TransformerFinder(ogapi) {
        _classCallCheck(this, TransformerFinder);

        _get(Object.getPrototypeOf(TransformerFinder.prototype), 'constructor', this).call(this, ogapi, 'ai', 'list', 'Transformer not found', 'north');
    }

    /**
    * Download a complete list of transformers by its organization. This execute a GET http method
    * @test
    *   ogapi.newTransformerFinder().findByOrganization('orgname').then().catch();
    * @param {string} organization - transformer organization .
    * @return {Promise} 
    */

    _createClass(TransformerFinder, [{
        key: 'findByOrganization',
        value: function findByOrganization(organization) {
            this._organization = organization;
            return this._execute();
        }

        /**
         * Download a specific transformer by its organization and id. This execute a GET http method
         * @test
         *   ogapi.newTransformerFinder().findByOrganizationAndIdentifier('orgname', xxx-xx-xxx-xxx').then().catch();
         * @param {string} organization - transformer organization .
         * @param {string} identifier - transformer identifier.
         * @return {Promise} 
         */
    }, {
        key: 'findByOrganizationAndIdentifier',
        value: function findByOrganizationAndIdentifier(organization, identifier) {
            this._organization = organization;
            this._identifier = identifier;
            return this._execute();
        }

        /**
        * Download a specific transformer by its organization and id. This execute a GET http method
        * @test
        *   ogapi.newTransformerFinder().downloadByOrganizationAndIdentifierAndFilename('orgname', xxx-xx-xxx-xxx', 'filename').then().catch();
        * @param {string} organization - transformer organization .
        * @param {string} identifier - transformer identifier.
        * @param {string} filename - name of transformer file.
        * @return {Promise} 
        */
    }, {
        key: 'downloadByOrganizationAndIdentifierAndFilename',
        value: function downloadByOrganizationAndIdentifierAndFilename(organization, identifier, filename) {
            this._organization = organization;
            this._identifier = identifier;
            this._filename = filename;
            return this._download();
        }

        /**
         * @return {String} This returns a string with the URL of the request.
         * @private
         */
    }, {
        key: '_composeUrl',
        value: function _composeUrl() {
            return this._baseUrl + "/" + this._organization + "/transformers" + (this._identifier ? '/' + this._identifier + (this._filename ? '/' + this._filename : '') : '');
        }
    }]);

    return TransformerFinder;
})(_GenericFinder3['default']);

exports['default'] = TransformerFinder;
module.exports = exports['default'];
//# sourceMappingURL=TransformerFinder.js.map
