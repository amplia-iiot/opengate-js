'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _PreFilteredSearchBuilder2 = require('./PreFilteredSearchBuilder');

var _PreFilteredSearchBuilder3 = _interopRequireDefault(_PreFilteredSearchBuilder2);

var _utilSearchingFieldsFieldFinder = require('../../util/searchingFields/FieldFinder');

var _utilSearchingFieldsFieldFinder2 = _interopRequireDefault(_utilSearchingFieldsFieldFinder);

var BASE_URL = '/devices';
/**
 * Defined a search over Subscribers	
 * @example ogapi.subscribersSearchBuilder()
 */

var SubscribersSearchBuilder = (function (_PreFilteredSearchBuilder) {
    _inherits(SubscribersSearchBuilder, _PreFilteredSearchBuilder);

    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */

    function SubscribersSearchBuilder(parent) {
        _classCallCheck(this, SubscribersSearchBuilder);

        _get(Object.getPrototypeOf(SubscribersSearchBuilder.prototype), 'constructor', this).call(this, parent, {}, new _utilSearchingFieldsFieldFinder2['default'](parent, '/subscribers'));
        this._url = BASE_URL;
    }

    _createClass(SubscribersSearchBuilder, [{
        key: '_buildFilter',
        value: function _buildFilter() {
            var finalFilter = {
                "and": [{
                    "or": []
                }]
            };

            if (this._provisioned || !this._collected) {
                finalFilter.and[0].or.push({
                    "exists": {
                        "provision.device.communicationModules[].subscriber.identifier": true
                    }
                });
            }

            if (this._collected || !this._provisioned) {
                finalFilter.and[0].or.push({
                    "exists": {
                        "device.communicationModules[].subscriber.identifier": true
                    }
                });
            }

            if (this._builderParams.filter && Object.keys(this._builderParams.filter).length > 0) {
                var filter = this._builderParams.filter;
                if (typeof filter._filterTemplate !== "undefined") {
                    //return filter._filterTemplate;
                    finalFilter["and"].push(filter._filterTemplate.filter);
                } else {
                    finalFilter["and"].push(filter);
                }
            }

            return {
                filter: finalFilter
            };
        }
    }]);

    return SubscribersSearchBuilder;
})(_PreFilteredSearchBuilder3['default']);

exports['default'] = SubscribersSearchBuilder;
module.exports = exports['default'];
//# sourceMappingURL=SubscribersSearchBuilder.js.map
