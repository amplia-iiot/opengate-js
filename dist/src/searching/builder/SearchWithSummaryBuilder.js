'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SearchBuilder2 = require('./SearchBuilder');

var _SearchBuilder3 = _interopRequireDefault(_SearchBuilder2);

/**
 * This is a abstract class. It is a class that extends from base to make all kind of summary search request to OpenGate North API.
 */

var SearchWithSummaryBuilder = (function (_SearchBuilder) {
    _inherits(SearchWithSummaryBuilder, _SearchBuilder);

    /**
     * @param {!InternalOpenGateAPI} parent - this is ogapi instance
     * @param {!object} routes - this defined the routes. One of those routes must be called on Builder before call build method.
     */

    function SearchWithSummaryBuilder(parent, routes, fieldFinder) {
        _classCallCheck(this, SearchWithSummaryBuilder);

        _get(Object.getPrototypeOf(SearchWithSummaryBuilder.prototype), 'constructor', this).call(this, parent, routes, fieldFinder);
        if (this.constructor === SearchWithSummaryBuilder) {
            throw new Error("Cannot construct Abstract instances directly");
        }
    }

    /**
     * The response will only have a summary information 
     * @example
     *	ogapi.subscriptionsSearchBuilder().summary() 
     * @return {SearchWithSummaryBuilder} 
     */

    _createClass(SearchWithSummaryBuilder, [{
        key: 'summary',
        value: function summary() {
            this._url = this._url + '/summary';

            return this;
        }
    }]);

    return SearchWithSummaryBuilder;
})(_SearchBuilder3['default']);

exports['default'] = SearchWithSummaryBuilder;
module.exports = exports['default'];
//# sourceMappingURL=SearchWithSummaryBuilder.js.map
