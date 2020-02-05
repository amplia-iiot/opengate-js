'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _enumANTENNA_STATUS_ENUM = require('./enum/ANTENNA_STATUS_ENUM');

var _Hardware = require('./Hardware');

var _Hardware2 = _interopRequireDefault(_Hardware);

var _Software = require('./Software');

var _Software2 = _interopRequireDefault(_Software);

var _Mobile = require('./Mobile');

var _Mobile2 = _interopRequireDefault(_Mobile);

var _Subscriber = require('./Subscriber');

var _Subscriber2 = _interopRequireDefault(_Subscriber);

var _Subscription = require('./Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

/**
 * This is a base object that allows the user to create a CommsModule.
 */

var CommsModuleMessage = (function () {
    function CommsModuleMessage(ogapi) {
        _classCallCheck(this, CommsModuleMessage);

        this._ogapi = ogapi;
        this._id = undefined;
        this._name = undefined;
        this._type = undefined;
        this._hardware = undefined;
        this._operationalStatus = undefined;
        this._antennaStatus = undefined;
        this._softwareList = [];
        this._mobile = undefined;
        this._subscriber = undefined;
        this._subscription = undefined;
    }

    /**
     * Set the id attribute
     * @param {string} id - optional field
     * @return {CommsModule}
     */

    _createClass(CommsModuleMessage, [{
        key: 'withId',
        value: function withId(id) {
            if (typeof id !== 'string') throw new Error({ message: 'OGAPI_STRING_PARAMETER', parameter: 'id' });
            this._id = id;
            return this;
        }

        /**
         * Set the name attribute
         * @param {string} name - optional field
         * @return {CommsModule}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string') throw new Error({ message: 'OGAPI_STRING_PARAMETER', parameter: 'name' });
            this._name = name;
            return this;
        }

        /**
         * Set the type attribute
         * @param {string} type - optional field
         * @return {CommsModule}
         */
    }, {
        key: 'withType',
        value: function withType(type) {
            if (typeof type !== 'string') throw new Error({ message: 'OGAPI_STRING_PARAMETER', parameter: 'type' });
            this._type = type;
            return this;
        }

        /**
         * Set the hardware attribute
         * @param {Hardware} hardware - optionals field
         * @return {CommsModule}
         */
    }, {
        key: 'withHardware',
        value: function withHardware(hardware) {
            if (!(hardware instanceof _Hardware2['default'])) {
                throw new Error('Parameter hardware must be hardware type');
            }
            this._hardware = hardware;
            return this;
        }

        /**
         * Set the operationalStatus attribute
         * @param {string} operationalStatus 
         * @return {CommsModule}
         */
    }, {
        key: 'withOperationalStatus',
        value: function withOperationalStatus(operationalStatus) {

            var operationalStatusBuilder = this._ogapi.operationalStatusSearchBuilder().withEntityType("COMMUNICATIONS_MODULE").withId(operationalStatus).build();

            operationalStatusBuilder.execute().then(function (res) {
                if (res.statusCode === 204) {
                    throw new Error("Operational Status not found");
                }
            });

            this._operationalStatus = operationalStatus;

            return this;
        }

        /**
         * Set the antennaStatus attribute
         * @param {string} antennaStatus - optional field
         * @return {CommsModule}
         */
    }, {
        key: 'withAntennaStatus',
        value: function withAntennaStatus(antennaStatus) {
            if (typeof antennaStatus !== 'string') throw new Error('Parameter antennaStatus must be a string');
            this._antennaStatus = this._checkValues(antennaStatus, _enumANTENNA_STATUS_ENUM.ANTENNA_STATUS_ENUM);
            return this;
        }

        /**
         * Set the software attribute
         * @return {CommsModule}
         */
    }, {
        key: 'withSoftware',
        value: function withSoftware(software) {
            /*
            var software =  new Software();
            software.withName(name);
            software.withType(type);
            software.withVersion(version);
            software.withDate(date);
            if(this._softwareList === undefined)
                this._softwareList = [];*/
            if (!(software instanceof _Software2['default'])) {
                throw new Error('Parameter software must be software type');
            }
            this._softwareList.push(software.composeElement());
            return this;
        }

        /**
         * Set the mobile attribute
         * @return {CommsModule}
         */
    }, {
        key: 'withMobile',
        value: function withMobile(mobile) {

            if (!(mobile instanceof _Mobile2['default'])) {
                throw new Error('Parameter mobile must be Mobile type');
            }
            this._mobile = mobile;
            return this;
        }

        /**
         * Set the subscriber attribute
         * @return {CommsModule}
         */
    }, {
        key: 'withSubscriber',
        value: function withSubscriber(subscriber) {

            if (!(subscriber instanceof _Subscriber2['default'])) {
                throw new Error('Parameter subscriber must be Subscriber type');
            }
            this._subscriber = subscriber;
            return this;
        }

        /**
         * Set the subscription attribute
         * @return {CommsModule}
         */
    }, {
        key: 'withSubscription',
        value: function withSubscription(subscription) {

            if (!(subscription instanceof _Subscription2['default'])) {
                throw new Error('Parameter subscription must be Subscription type');
            }
            this._subscription = subscription;
            return this;
        }
    }, {
        key: '_checkValues',
        value: function _checkValues(value, enumName) {
            var not_found = [];
            var found = enumName.find(function (value) {
                return value == this;
            }, value);

            if (typeof found === "undefined") {
                not_found.push(value);
            }
            if (not_found.length !== 0) {
                console.warn("Parameter value not allowed <'" + JSON.stringify(not_found) + "'>, allowed <'" + JSON.stringify(enumName) + "'>");
            }
            return value;
        }
    }, {
        key: 'composeElement',
        value: function composeElement() {
            var commsModule = {
                "id": this._id,
                "name": this._name,
                "type": this._type,
                "hardware": this._hardware.composeElement(),
                "operationalStatus": this._operationalStatus,
                "antennaStatus": this._antennaStatus
            };
            if (this._softwareList.length > 0) {
                commsModule.softwareList = this._softwareList;
            }
            if (this._mobile !== undefined) {
                commsModule.mobile = this._mobile.composeElement();
            }
            if (this._subscriber !== undefined) {
                commsModule.subscriber = this._subscriber.composeElement();
            }
            if (this._subscription !== undefined) {
                commsModule.subscription = this._subscription.composeElement();
            }
            return commsModule;
        }
    }]);

    return CommsModuleMessage;
})();

exports['default'] = CommsModuleMessage;
module.exports = exports['default'];
//# sourceMappingURL=CommsModuleMessage.js.map
