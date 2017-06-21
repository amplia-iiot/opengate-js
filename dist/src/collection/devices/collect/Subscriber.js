'use strict';

<<<<<<< HEAD
/**
 * This is a base object that allows the user to create a Subscription.
 */
=======
>>>>>>> release_branch
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

<<<<<<< HEAD
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

=======
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Hardware = require('./Hardware');

var _Hardware2 = _interopRequireDefault(_Hardware);

/**
 * This is a base object that allows the user to create a Subscription.
 */

>>>>>>> release_branch
var Subscriber = (function () {
    function Subscriber() {
        _classCallCheck(this, Subscriber);

        this._id = undefined;
        this._name = undefined;
        this._type = undefined;
        this._hardware = undefined;
    }

    /**
     * Set the id attribute
     * @param {string} id - optional field
     * @return {Subscriber}
     */

    _createClass(Subscriber, [{
        key: 'withId',
        value: function withId(id) {
            if (typeof id !== 'string' || id.length === 0) throw new Error('Parameter id must be a string and cannot be empty');
            this._id = id;
            return this;
        }

        /**
         * Set the name attribute
         * @param {string} name - optional field
         * @return {Subscriber}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length === 0) throw new Error('Parameter name must be a string and cannot be empty');
            this._name = name;
            return this;
        }

        /**
         * Set the type attribute
         * @param {string} type - optional field
         * @return {Subscriber}
         */
    }, {
        key: 'withType',
        value: function withType(type) {
            if (typeof type !== 'string' || type.length === 0) throw new Error('Parameter type must be a string and cannot be empty');
            this._type = type;
            return this;
        }

        /**
        * Set the hardware attribute
        * @param {Hardware} hardware - optionals field
        * @return {Subscriber}
        */
    }, {
        key: 'withHardware',
        value: function withHardware(hardware) {
<<<<<<< HEAD
            if (hardware.constructor.name !== "Hardware") {
=======
            if (!(hardware instanceof _Hardware2['default'])) {
>>>>>>> release_branch
                throw new Error('Parameter hardware must be hardware type');
            }
            this._hardware = hardware;
            return this;
        }
    }, {
        key: 'composeElement',
        value: function composeElement() {
            var subscriber = {
                "id": this._id,
                "name": this._name,
                "type": this._type

            };
            if (this._hardware !== undefined) {
                subscriber.hardware = this._hardware.composeElement();
            }
            return subscriber;
        }
    }]);

    return Subscriber;
})();

exports['default'] = Subscriber;
module.exports = exports['default'];
//# sourceMappingURL=Subscriber.js.map
