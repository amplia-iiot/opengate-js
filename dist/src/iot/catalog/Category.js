'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Datastream = require('./Datastream');

var _Datastream2 = _interopRequireDefault(_Datastream);

/**
 * Defines the builder to configure a category of a datamodel. With this builder you can configure a category
 */

var Category = (function () {
    /**    
     * @param {!InternalOpenGateAPI} Reference to the API object.
     * @param {!identifier} identifier of category
     * @param {Array} datastreams of category
     */

    function Category(ogapi, identifier, datastreams) {
        _classCallCheck(this, Category);

        this._ogapi = ogapi;
        this._isValidString(identifier, 'identifier', 50);
        this._identifier = identifier;
        this._datastreams = datastreams ? datastreams : [];
    }

    _createClass(Category, [{
        key: 'withName',
        value: function withName(name) {
            this._isValidString(name, 'name', 100);
            this._name = name;
            return this;
        }

        /**
         * Add a datastream to the category 
         * @param {!Object} datastream json object
         * @return {Category}
         */
    }, {
        key: 'addDatastream',
        value: function addDatastream(datastream) {
            if (!datastream || typeof datastream !== 'object') {
                throw new Error('Datastream must be an object');
            }
            this._datastreams.push(datastream);
            return this;
        }

        /**
         * Add a datastreams to the category 
         * @param {!Object} datastreams of datastream json object
         * @return {Category}
         */
    }, {
        key: 'addDatastreams',
        value: function addDatastreams(datastreams) {
            var _this = this;
            if (!Array.isArray(datastreams)) {
                throw new Error('Datastreams must be an array');
            }
            var _errors = [];
            datastreams.forEach(function (datastream, index) {
                try {
                    _this.addDatastream(datastream);
                } catch (error) {
                    _errors.push('Error on datastream with index [' + index + ']: ' + error);
                }
            });
            if (_errors.length > 0) {
                throw new Error('Error adding datastreams: ' + JSON.stringify(_errors));
            }
            return this;
        }
    }, {
        key: '_isValidString',
        value: function _isValidString(string, param_name, max_length) {
            if (typeof string !== 'string' || string.length === 0 || string.length > max_length) throw new Error('Parameter ' + param_name + ' must be a string, cannot be empty and has a maximum length of ' + max_length + ' on Category');
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            if (!this._identifier) {
                throw new Error('identifier is required on Category');
            }

            return {
                'identifier': this._identifier,
                'name': this._name ? this._name : undefined,
                'datastreams': this._datastreams
            };
        }
    }]);

    return Category;
})();

exports['default'] = Category;
module.exports = exports['default'];
//# sourceMappingURL=Category.js.map
