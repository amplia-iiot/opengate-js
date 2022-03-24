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
 *   This class allow make get request to user resource into Opengate North API.
 */

var GeoclusterFinder = (function (_ProvisionGenericFinder) {
    _inherits(GeoclusterFinder, _ProvisionGenericFinder);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function GeoclusterFinder(ogapi) {
        _classCallCheck(this, GeoclusterFinder);

        _get(Object.getPrototypeOf(GeoclusterFinder.prototype), 'constructor', this).call(this, ogapi, 'geocluster', 'geocluster', 'Geocluster not found');
    }

    /**
     * Find a specify geocluster by an identifier. This execute a GET http method
     * @test
     *   ogapi.newGeoclusterFinder().findById('entities.default').then().catch();
     * @param {string} id - Identifier of the geocluster.
     * @return {Promise} 
     */

    _createClass(GeoclusterFinder, [{
        key: 'findById',
        value: function findById(id) {
            this._id = id;
            this._setUrlParameters();
            return this._execute();
        }

        /**
         * Find all available geocluster. This execute a GET http method
         * @test
         *   ogapi.newGeoclusterFinder().findAll().then().catch();
         * @return {Promise} 
         */
    }, {
        key: 'findAll',
        value: function findAll() {
            this._id = undefined;
            this._setUrlParameters();
            return this._execute();
        }

        /**
        * Find features inside the coordinates. This execute a GET http method
        * @test
        *   ogapi.newGeoclusterFinder().findFeatures('entities.default',{zoom:3,topRight:[1,2],bottomLeft:[2,3]}).then().catch();
        * @param {string} id - Identifier of the geocluster.
        * @param {Object} coordinates - square defined by the coordinates and the zoom used to find the inside features .
        * @return {Promise} 
        */
    }, {
        key: 'findFeatures',
        value: function findFeatures(id, _ref) {
            var zoom = _ref.zoom;
            var topRight = _ref.topRight;
            var bottomLeft = _ref.bottomLeft;

            this._id = id;
            this._setUrlParameters({ zoom: zoom, topRight: topRight, bottomLeft: bottomLeft });
            return this._execute();
        }

        /**
        * @return {String} This returns a string with the URL of the request.
        * @private
        */
    }, {
        key: '_composeUrl',
        value: function _composeUrl() {
            if (!this._id) return this._baseUrl;
            if (!this._getUrlParameters()) return this._baseUrl + "/" + this._id;
            return this._baseUrl + "/" + this._id + "/view";
        }
    }]);

    return GeoclusterFinder;
})(_ProvisionGenericFinder3['default']);

exports['default'] = GeoclusterFinder;
module.exports = exports['default'];
//# sourceMappingURL=GeoclusterFinder.js.map
