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
 *   This class allow make get request to bulk resource into Opengate North API.
 */

var BulkFinder = (function (_ProvisionGenericFinder) {
    _inherits(BulkFinder, _ProvisionGenericFinder);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function BulkFinder(ogapi) {
        _classCallCheck(this, BulkFinder);

        _get(Object.getPrototypeOf(BulkFinder.prototype), 'constructor', this).call(this, ogapi, 'organizations', 'bulk/async', 'Bulk not found');
        this._raw = false;
    }

    /**
     * Download a specific entity by its organization and id. This execute a GET http method
     * @test
     *   ogapi.newBulkFinder().findByOrganizationAndId('orgname', xxx-xx-xxx-xxx').then().catch();
     *   ogapi.newBulkFinder().findByOrganizationAndId('orgname', xxx-xx-xxx-xxx', true).then().catch();
     * @param {string} organization - entity organization .
     * @param {string} id - entity id.
     * @param {string} format - format response flag.
     * @param {string} accept - accept.
     * @return {Promise} 
     */

    _createClass(BulkFinder, [{
        key: 'findByOrganizationAndId',
        value: function findByOrganizationAndId(organization, id, format, accept) {
            this._organization = organization;
            this._id = id;
            this._setUrlParameters({
                format: format
            });

            if (accept) {
                this._setExtraHeaders({
                    'accept': accept
                });
            }
            return this._download(true);
        }

        /**
         * @return {Promise}* @private
         */
        // _download() {
        //     let defered = q.defer();
        //     let promise = defered.promise;
        //     let _error_not_found = this._error_not_found;
        //     this._api.get(this._composeUrl(), undefined, this._getExtraHeaders(), this._getUrlParameters())
        //         .then((req) => {
        //             if (req.statusCode === 204) {
        //                 defered.reject({
        //                     data: _error_not_found,
        //                     statusCode: HttpStatus.NOT_FOUND
        //                 });
        //             } else {
        //                 defered.resolve({
        //                     data: req,
        //                     statusCode: req.statusCode
        //                 });
        //             }
        //         })
        //         .catch((error) => {
        //             defered.reject(error);
        //         });
        //     return promise;
        // }

    }, {
        key: '_composeUrl',
        value: function _composeUrl() {
            return this._baseUrl + "/" + this._organization + "/" + this._entity + "/" + this._id;
        }
    }]);

    return BulkFinder;
})(_ProvisionGenericFinder3['default']);

exports['default'] = BulkFinder;
module.exports = exports['default'];
//# sourceMappingURL=BulkFinder.js.map
