'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SelectElement = (function () {
    function SelectElement() {
        _classCallCheck(this, SelectElement);
    }

    _createClass(SelectElement, null, [{
        key: 'element',

        /**
         * @example
         *  SE.element('provision.device.identifier', ['value'], 'identifier')
         *  returns:
         *  {
         *      name : 'provision.device.identifier',
         *      fields: ['value'],
         *      alias: 'identifier
         *  }
         *
         *  SE.element('provision.device.identifier', ['value'])
         *  returns:
         *  {
         *      name : 'provision.device.identifier',
         *      fields: ['value']
         *  }
         * @return {Object} This returns a json with the object element built.
         * @param {String} name - Indicates the datastream to show
         * @param {[String]} fields - The fields that you want to show from that datastream
         * @param {String} alias - (Optional) Easiest name given to the datastream.
         */
        value: function element(name, fields, alias) {
            return { name: name, fields: fields, alias: alias };
        }
    }]);

    return SelectElement;
})();

exports['default'] = SelectElement;
module.exports = exports['default'];
//# sourceMappingURL=SelectElement.js.map
