'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilSelectElement = require('./../util/SelectElement');

var _utilSelectElement2 = _interopRequireDefault(_utilSelectElement);

var SelectBuilder = (function () {

    /**
     * @example
     * var sb = ogapi.newSelectBuilder()
     */

    function SelectBuilder() {
        _classCallCheck(this, SelectBuilder);

        this._selectTemplate = { select: [] };
    }

    /**
     * @example
     * sb.add(Se.element('provision.device.identifier', ['value'], 'identifier'), sb.add(Se.element('device.temperature.value', ['value'])))
     * @param {SelectElement} args - The parameters will be operators of the class SelectElement
     */

    _createClass(SelectBuilder, [{
        key: 'add',
        value: function add() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            for (var i = 0; i < args.length; i++) {
                var input_element = args[i];
                var elements = this._selectTemplate.select;
                if (elements.length === 0) {
                    this._selectTemplate.select.push(input_element);
                } else {
                    var exists_element = false;
                    for (var j = 0; j < elements.length; j++) {
                        var element = elements[j];
                        if (element.name === input_element.name) {
                            exists_element = true;
                            var input_fields = input_element.fields;
                            for (var k = 0; k < input_fields.length; k++) {
                                var input_field = input_fields[i];
                                if (element.fields.indexOf(input_field) == -1) {
                                    this._selectTemplate.select[j].fields.push(input_field);
                                }
                            }
                        }
                    }
                    if (!exists_element) {
                        this._selectTemplate.select.push(input_element);
                    }
                }
            }
            return this;
        }
    }]);

    return SelectBuilder;
})();

exports['default'] = SelectBuilder;
module.exports = exports['default'];
//# sourceMappingURL=SelectBuilder.js.map
