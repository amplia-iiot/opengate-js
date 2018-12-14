'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _provisionBaseProvision = require('../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

var _Workgroups = require('./Workgroups');

var _Workgroups2 = _interopRequireDefault(_Workgroups);

var _channelsChannels = require('../channels/Channels');

var _channelsChannels2 = _interopRequireDefault(_channelsChannels);

/**
 * This is a base object that contains all you can do about workgroups.
 */

var WorkgroupRelations = (function (_BaseProvision) {
    _inherits(WorkgroupRelations, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function WorkgroupRelations(ogapi) {
        _classCallCheck(this, WorkgroupRelations);

        _get(Object.getPrototypeOf(WorkgroupRelations.prototype), 'constructor', this).call(this, ogapi, "/domains", undefined, ["workgroup", "channels"]);
        this._ogapi = ogapi;
        this._action = "CREATE";
    }

    /**
     * Set the workgroup attribute
     * @param {string} workgroup - required field
     * @return {WorkgroupRelations}
     */

    _createClass(WorkgroupRelations, [{
        key: 'withWorkgroup',
        value: function withWorkgroup(workgroup) {
            if (workgroup.constructor.prototype != _Workgroups2['default'].prototype) throw new Error('Parameter workgroup must be a workgroup');

            this._workgroup = workgroup;
            return this;
        }

        /**
         * Set the channel attribute
         * @param {string} channel - required field for creation or update
         * @return {WorkgroupRelations}
         */
    }, {
        key: 'withChannel',
        value: function withChannel(channel) {
            if (channel.constructor.prototype != _channelsChannels2['default'].prototype) throw new Error('Parameter channel must be a channel');

            if (!this._channels) this._channels = [];

            this._channels.push({
                'organization': channel._organization,
                'channel': channel._name
            });

            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._checkRequiredParameters();

            this._resource = 'provision/domains/' + this._workgroup._domainName + '/workgroups/' + this._workgroup._name + '/relations';

            var workgroup = {
                "workgroupRelation": {
                    "channels": this._channels ? this._channels : undefined
                }
            };

            return workgroup;
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            var url = 'provision/domains/' + this._workgroup._domainName + '/workgroups/' + this._workgroup._name + '/relations';
            return url;
        }
    }, {
        key: 'create',
        value: function create() {
            var relations = this._composeElement();

            var petitionUrl = this._resource;
            this._setUrlParameters({
                action: 'CREATE'
            });
            return this._doNorthPost(petitionUrl, relations);
        }
    }, {
        key: 'delete',
        value: function _delete() {
            this._setUrlParameters({
                action: 'DELETE'
            });
            var petitionUrl = this._buildURL();

            if (this._channels) {
                var relations = this._composeElement();
                return this._doNorthPost(petitionUrl, relations);
            } else {
                return this._doNorthPost(petitionUrl, {
                    "workgroupRelation": {
                        "channels": []
                    }
                });
            }
        }

        /** 
         * Update not allowed
         * @throws {Error} 
         */
    }, {
        key: 'update',
        value: function update() {
            throw new Error("Workgroup relation update not allowed");
        }
    }]);

    return WorkgroupRelations;
})(_provisionBaseProvision2['default']);

exports['default'] = WorkgroupRelations;
module.exports = exports['default'];
//# sourceMappingURL=WorkgroupRelations.js.map
