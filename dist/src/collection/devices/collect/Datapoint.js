'use strict';

/**
 * This is a base object that allows the user to create a Datapoint.
 */
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Datapoint = (function () {
    function Datapoint() {
        _classCallCheck(this, Datapoint);

        this._from = undefined;
        this._at = undefined;
        this._value = undefined;
        this._tags = undefined;
    }

    /**
     * Set the from attribute
     * @param {number} from - optional field
     * @return {Datapoint}
     */

    _createClass(Datapoint, [{
        key: 'withFrom',
        value: function withFrom(from) {
            if (from !== null) {
                if (typeof from !== 'number') throw new Error('OGAPI_MUST_BE_NUMBER_PARAMETER');
                this._from = from;
            }
            return this;
        }

        /**
         * Set the at attribute
         * @param {number} at - optional field
         * @return {Datapoint}
         */
    }, {
        key: 'withAt',
        value: function withAt(at) {
            if (at !== null) {
                if (typeof at !== 'number') throw new Error('OGAPI_MUST_BE_NUMBER_PARAMETER');
                this._at = at;
            }
            return this;
        }

        /**
         * Set the value attribute
         * @param {string} value - required field 
         * @return {Datapoint}
         */
    }, {
        key: 'withValue',
        value: function withValue(value) {
            if (value === undefined || value.length === 0) throw new Error('OGAPI_DEFINED_PARAMETER');
            this._value = value;
            return this;
        }

        /**
         * Set the tags attribute
         * @param {string} tags 
         * @return {Datapoint}
         */
    }, {
        key: 'withTags',
        value: function withTags(tags) {
            if (tags !== null) {
                if (tags.constructor !== Array || tags.length === 0) throw new Error({ message: 'OGAPI_ARRAY_PARAMETER', parameter: 'tags' });
                this._tags = tags;
            }
            return this;
        }
    }, {
        key: 'composeElement',
        value: function composeElement() {
            if (this._value === undefined || this._value.length === 0) {
                throw new Error({ message: 'OGAPI_DEFINED_PARAMETER', parameter: 'value' });
            }
            var datapoint = {
                'from': this._from || undefined,
                'at': this._at || undefined,
                'value': this._value,
                'tags': this._tags || undefined

            };
            return datapoint;
        }
    }]);

    return Datapoint;
})();

exports['default'] = Datapoint;
module.exports = exports['default'];
//# sourceMappingURL=Datapoint.js.map
