'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _provisionBaseProvision = require('../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

/**
 * This is a base object that contains all you can do about relations
 */

var Relations = (function (_BaseProvision) {
    _inherits(Relations, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Relations(ogapi) {
        _classCallCheck(this, Relations);

        _get(Object.getPrototypeOf(Relations.prototype), 'constructor', this).call(this, ogapi, "/organizations/");
    }

    /**
     * Sets the organization attribute
     * @param {string} organization 
     * @return {CommunicationsModules}
     */

    _createClass(Relations, [{
        key: 'withOrganization',
        value: function withOrganization(organization) {
            if (typeof organization !== 'string' || organization.length > 250) throw new Error('Parameter organization must be a string and has a maximum length of 250');

            this._organization = organization;

            return this;
        }

        /**
         * Set the device attribute
         * @param {string} device - required field
         * @return {Relations}
         */
    }, {
        key: 'withDevice',
        value: function withDevice(device) {
            if (typeof device !== 'string' || device.length > 250) throw new Error('Parameter device must be a string and has a maximum length of 250');

            this._device = device;
            return this;
        }

        /**
         * Set the communicationsModule attribute
         * @param {string} communicationsModule - required field
         * @return {Relations}
         */
    }, {
        key: 'withCommunicationsModule',
        value: function withCommunicationsModule(communicationsModule) {
            if (typeof communicationsModule !== 'string' || communicationsModule.length > 250) throw new Error('Parameter communicationsModule must be a string and has a maximum length of 250');

            this._communicationsModule = communicationsModule;
            return this;
        }

        /**
         * Set the subscription attribute
         * @param {string} subscription - required field
         * @return {Relations}
         */
    }, {
        key: 'withSubscription',
        value: function withSubscription(subscription) {
            if (typeof subscription !== 'string' || subscription.length > 250) throw new Error('Parameter subscription must be a string and has a maximum length of 250');

            this._subscription = subscription;
            return this;
        }

        /**
         * Set the subscriber attribute
         * @param {string} subscriber - required field
         * @return {Relations}
         */
    }, {
        key: 'withSubscriber',
        value: function withSubscriber(subscriber) {
            if (typeof subscriber !== 'string' || subscriber.length > 250) throw new Error('Parameter subscriber must be a string and has a maximum length of 250');

            this._subscriber = subscriber;
            return this;
        }

        /**
         * Set the template attribute
         * @param {string} template - optional field
         * @return {Relations}
         */
    }, {
        key: 'withTemplate',
        value: function withTemplate(template) {
            if (typeof template !== 'string') throw new Error('Parameter template must be a string');

            this._template = template;
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            if (this._deviceInfo && this._deviceInfo._organization) {
                this.withOrganization(this._deviceInfo._organization);
            }

            if (this._organization === undefined) {
                throw new Error('Parameter organization must be defined');
            }

            var relationParts = [];
            if (this._device !== undefined) {
                relationParts.push({ "entityType": "DEVICE", "id": this._device });
            }
            if (this._communicationsModule !== undefined) {
                relationParts.push({ "entityType": "COMMUNICATIONS_MODULE", "id": this._communicationsModule });
            }
            if (this._subscriber !== undefined) {
                relationParts.push({ "entityType": "SUBSCRIBER", "id": this._subscriber });
            }
            if (this._subscription !== undefined) {
                relationParts.push({ "entityType": "SUBSCRIPTION", "id": this._subscription });
            }

            if (this._action !== 'DELETE' && relationParts.length < 2) {
                throw new Error('At least 2 entities required to ' + this._action + ' a relation');
            }

            if (this._action === 'DELETE' && relationParts.length === 0) {
                throw new Error('At least 1 entity is required to ' + this._action);
            }

            var relationData = {
                "relation": {
                    "template": this._template ? this._template : "default",
                    "links": relationParts
                }
            };

            return relationData;
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            if (this._organization === undefined) {
                throw new Error('Parameters organization must be defined');
            }
            this._resource = 'provision/organizations/' + this._organization + '/entities/relations?action=' + this._action;
            return this._resource;
        }
    }, {
        key: '_executeAction',
        value: function _executeAction() {
            this._buildURL();
            return _get(Object.getPrototypeOf(Relations.prototype), 'create', this).call(this);
        }
    }, {
        key: 'create',
        value: function create() {
            this._action = "CREATE";
            this._buildURL();
            return _get(Object.getPrototypeOf(Relations.prototype), 'create', this).call(this);
        }
    }, {
        key: '_create',
        value: function _create() {
            var _this = this;
            _this._action = "CREATE";
            _this._buildURL();
            var defered = _q2['default'].defer();
            var promise = defered.promise;

            var onCreateRelation = function onCreateRelation(res) {
                //console.log("relation ok: " + JSON.stringify(res));
                if (res.statusCode === 201) {
                    defered.resolve({ "statusCode": res.statusCode });
                    _this._exists = true;
                } else {
                    onCreateRelationError({ "statusCode": res.statusCode });
                }
            };

            var onCreateRelationError = function onCreateRelationError(err) {
                //console.log("relation err: " + JSON.stringify(err));
                defered.reject(err);
            };

            _this._executeAction().then(function (prevOk) {
                //super.create().then(onCreateRelation).catch(onCreateRelationError);
                onCreateRelation(prevOk);
            })['catch'](function (err2) {
                onCreateRelationError(err2);
            });

            return promise;
        }
    }, {
        key: 'update',
        value: function update() {
            var _this = this;
            _this._action = "UPDATE";
            var defered = _q2['default'].defer();
            var promise = defered.promise;

            var onUpdateRelation = function onUpdateRelation(res) {
                if (res.statusCode === 200) {
                    this._exists = true;
                    defered.resolve({ data: {}, statusCode: 200 });
                } else {
                    onUpdateRelationError({ "statusCode": res.statusCode });
                }
            };

            var onUpdateRelationError = function onUpdateRelationError(err) {
                if (err.statusCode === 200) {
                    this._exists = true;
                    defered.resolve({ data: {}, statusCode: 200 });
                } else {
                    defered.reject(err);
                }
            };

            _this._executeAction().then(function (prevOk) {
                //super.update().then(onUpdateRelation).catch(onUpdateRelationError);
                onUpdateRelation(prevOk);
            })['catch'](function (err2) {
                onUpdateRelationError(err2);
            });

            return promise;
        }
    }, {
        key: 'delete',
        value: function _delete() {
            var _this = this;
            _this._action = "DELETE";
            var defered = _q2['default'].defer();
            var promise = defered.promise;

            var onDeleteRelation = function onDeleteRelation(res) {
                if (res.statusCode === 200) {
                    defered.resolve({ data: {}, statusCode: 200 });
                } else {
                    onDeleteRelationError({ "statusCode": res.statusCode });
                }
            };

            var onDeleteRelationError = function onDeleteRelationError(err) {
                if (err.statusCode === 200) {
                    defered.resolve({ data: {}, statusCode: 200 });
                } else {
                    defered.reject(err);
                }
            };

            _this._executeAction().then(function (prevOk) {
                //super.delete().then(onDeleteRelation).catch(onDeleteRelationError);
                onDeleteRelation(prevOk);
            })['catch'](function (err2) {
                onDeleteRelationError(err2);
            });

            return promise;
        }
    }, {
        key: '_delete',
        value: function _delete() {
            if (this._exists) {
                //console.log("a borrar");
                return this['delete']();
            } else {
                //console.log("no borrar");
                var defered = _q2['default'].defer();
                var promise = defered.promise;
                defered.resolve({});
                return promise;
            }
        }
    }]);

    return Relations;
})(_provisionBaseProvision2['default']);

exports['default'] = Relations;
module.exports = exports['default'];
//# sourceMappingURL=Relations.js.map
