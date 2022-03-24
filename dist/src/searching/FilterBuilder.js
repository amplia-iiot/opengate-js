'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilExpression = require('./../util/Expression');

var _utilExpression2 = _interopRequireDefault(_utilExpression);

var FilterBuilder = (function () {

    /**
     * @example
     * var fb = ogapi.newFilterBuilder()
     */

    function FilterBuilder() {
        _classCallCheck(this, FilterBuilder);

        this._filterTemplate = { filter: {} };
    }

    /**
     * @example
     * fb.or(Ex.like("collected.serialNumber", "SN"), Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"))
     * @param {[Expression]} args - The parameters will be operators of the class Expression
     */

    _createClass(FilterBuilder, [{
        key: 'or',
        value: function or() {
            if (typeof this._filterTemplate.filter.or === "undefined") this._filterTemplate.filter.or = [];

            if (typeof this._filterTemplate.filter.and !== "undefined") {
                console.warn('The filter not allow both elements [and,or], the item "and" are going to be removed.');
                delete this._filterTemplate.filter.and;
            }

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            for (var i = 0; i < args.length; i++) this._filterTemplate.filter.or.push(args[i]);

            return this;
        }

        /**
         * @example
         * fb.and(Ex.like("collected.serialNumber", "SN"), Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"))
         * @param {[Expression]} args - The parameters will be operators of the class Expression
         */
    }, {
        key: 'and',
        value: function and() {
            if (typeof this._filterTemplate.filter.and === "undefined") this._filterTemplate.filter.and = [];

            if (typeof this._filterTemplate.filter.or !== "undefined") {
                console.warn('The filter not allow both elements [and,or], the item "or" are going to be removed.');
                delete this._filterTemplate.filter.or;
            }

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            for (var i = 0; i < args.length; i++) this._filterTemplate.filter.and.push(args[i]);

            return this;
        }
    }]);

    return FilterBuilder;
})();

exports['default'] = FilterBuilder;
module.exports = exports['default'];
//# sourceMappingURL=FilterBuilder.js.map
