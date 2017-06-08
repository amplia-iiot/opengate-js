'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SearchWithSummaryBuilder2 = require('./SearchWithSummaryBuilder');

var _SearchWithSummaryBuilder3 = _interopRequireDefault(_SearchWithSummaryBuilder2);

var _EntitySearch = require('../EntitySearch');

var _EntitySearch2 = _interopRequireDefault(_EntitySearch);

/**
 * Defined a search over entities. Devices/Subscriptions/Subscribers/CommunicationModules
 */

var EntitySearchBuilder = (function (_SearchWithSummaryBuilder) {
    _inherits(EntitySearchBuilder, _SearchWithSummaryBuilder);

    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     * 	@param {!string} url - Base url of Opengate North API resource
     */

    function EntitySearchBuilder(parent, url, fieldFinder) {
        _classCallCheck(this, EntitySearchBuilder);

        _get(Object.getPrototypeOf(EntitySearchBuilder.prototype), 'constructor', this).call(this, parent, {
            onProvisioned: '/provision',
            onCollected: '/collection'
        }, fieldFinder);
        if (this.constructor === EntitySearchBuilder) {
            throw new Error("Cannot construct Abstract instances directly");
        }
        this._url = url;
    }

    /**
     * Add provisioned source
     * @return EntitySearchBuilder
     */

    _createClass(EntitySearchBuilder, [{
        key: 'onProvisioned',
        value: function onProvisioned() {
            return _get(Object.getPrototypeOf(EntitySearchBuilder.prototype), 'onProvisioned', this).call(this);
        }

        /**
         * Add collected source
         * @return EntitySearchBuilder
         */
    }, {
        key: 'onCollected',
        value: function onCollected() {
            return _get(Object.getPrototypeOf(EntitySearchBuilder.prototype), 'onCollected', this).call(this);
        }
    }, {
        key: '_buildUrl',
        value: function _buildUrl() {
            this._checkConstraintRoutes(true);
            if (this._builderParams.onProvisioned && this._builderParams.onCollected) {
                //Do nothing. Because if onProvision and onCollected is activated the url must be /devices
            } else if (this._builderParams.onProvisioned) {
                    this._url = this._url + this._routes.onProvisioned;
                } else {
                    this._url = this._url + this._routes.onCollected;
                }

            return _get(Object.getPrototypeOf(EntitySearchBuilder.prototype), '_buildUrl', this).call(this);
        }

        /**
         * Build a instance of Search 
         *
         * @example
         *	ogapi.devicesSearchBuilder().onProvisioned().build()
         * @throws {SearchBuilderError} Throw error on url build
         * @return {Search} 
         */
    }, {
        key: 'build',
        value: function build() {
            return new _EntitySearch2['default'](this._parent, this._buildUrl(), this._buildFilter(), this._buildLimit(), this._buildSort(), this._builderParams.timeout);
        }
    }]);

    return EntitySearchBuilder;
})(_SearchWithSummaryBuilder3['default']);

exports['default'] = EntitySearchBuilder;
module.exports = exports['default'];
//# sourceMappingURL=EntitySearchBuilder.js.map
