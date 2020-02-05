'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _EntitySearch2 = require('./EntitySearch');

var _EntitySearch3 = _interopRequireDefault(_EntitySearch2);

// 'prov.mac' y 'collected.mac' no se añadirán en el quickSearch por el siguiente bug:  http://cm.amplia.es/jira/browse/OGODM-3144

var DEFAULT_PARAMETERS = ['entityId', 'collected.customId', 'prov.customId', 'collected.entityName', 'prov.entityName', 'prov.msisdn', 'collected.msisdn', 'prov.serialNumber', 'collected.serialNumber', 'prov.icc', 'collected.icc', 'collected.manufacturer', 'collected.model', 'prov.address', 'collected.address', 'prov.imsi', 'collected.imsi'];

/** 
 * This extends EntitySearch and it allow make request to /device resource with a predefined filter at Opengate North API
 */

var QuickSearch = (function (_EntitySearch) {
    _inherits(QuickSearch, _EntitySearch);

    function QuickSearch(ogapi, param, limit) {
        var type = arguments.length <= 3 || arguments[3] === undefined ? 'devices' : arguments[3];

        _classCallCheck(this, QuickSearch);

        _get(Object.getPrototypeOf(QuickSearch.prototype), 'constructor', this).call(this, ogapi, '/' + type, _createFilter().filter, limit);

        function _createFilter() {
            var filterTemplate = { filter: { or: [] } };
            var like = { like: {} };
            if (!_checkEmpty()) {
                for (var i = 0; i < DEFAULT_PARAMETERS.length; i++) {
                    var item = DEFAULT_PARAMETERS[i];
                    var fieldLike = (0, _merge2['default'])(true, like);
                    fieldLike.like[item] = param;
                    filterTemplate.filter.or.push(fieldLike);
                }
            }
            return { filter: filterTemplate };

            function _checkEmpty() {
                return !(param !== "undefined" && typeof param === "string" && param.trim() !== "");
            }
        }
    }

    _createClass(QuickSearch, [{
        key: '_defaultParameters',
        value: function _defaultParameters() {
            return DEFAULT_PARAMETERS;
        }
    }]);

    return QuickSearch;
})(_EntitySearch3['default']);

exports['default'] = QuickSearch;
module.exports = exports['default'];
//# sourceMappingURL=QuickSearch.js.map
