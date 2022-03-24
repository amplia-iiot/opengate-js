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

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

/**
 * Defined a search over organizations
 * @example ogapi.organizationsSearchBuilder()
 */

var OrganizationsSearchBuilder = (function (_SearchBuilder) {
    _inherits(OrganizationsSearchBuilder, _SearchBuilder);

    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */

    function OrganizationsSearchBuilder(parent) {
        _classCallCheck(this, OrganizationsSearchBuilder);

        _get(Object.getPrototypeOf(OrganizationsSearchBuilder.prototype), 'constructor', this).call(this, parent, {});
        this._url = '/provision/domains/{domain_id}/workgroups/{workgroup_id}/relations';
        this.fluentFilter = parent.newFilterBuilder();
        this.tagsFilter = [];
    }

    /**
     * Sets de organization name to search
     *
     * @example
     *  ogapi.organizationsSearchBuilder().withName('myOrganization').build()
     * @param {!string} organizationName - hardware id
     * @throws {Error} throw error when organizationName is not typeof string
     * @return {OrganizationsSearchBuilder} 
     */

    _createClass(OrganizationsSearchBuilder, [{
        key: 'withName',
        value: function withName(organizationName) {
            if (typeof organizationName !== 'string') {
                throw new Error('Parameter organizationName must be a string');
            }
            //this.fluentFilter.and(this._parent.EX.eq('organizationName', organizationName));
            this._organizationName = organizationName;

            return this;
        }

        /**
         * Sets de organization name to search
         *
         * @example
         *  ogapi.organizationsSearchBuilder().withChannelName('myOrganization').build()
         * @param {!string} channelName - hardware id
         * @throws {Error} throw error when channelName is not typeof string
         * @return {OrganizationsSearchBuilder} 
         */
    }, {
        key: 'withChannelName',
        value: function withChannelName(channelName) {
            if (typeof channelName !== 'string') {
                throw new Error('Parameter channelName must be a string');
            }
            //this.fluentFilter.and(this._parent.EX.eq('channelName', channelName));
            this._channelName = channelName;

            return this;
        }

        /**
         * Sets de domain name to search
         *
         * @example
         *  ogapi.organizationsSearchBuilder().withDomain('myDomain').build()
         * @param {!string} domainName - domain name
         * @throws {Error} throw error when domainName is not typeof string
         * @return {OrganizationsSearchBuilder} 
         */
    }, {
        key: 'withDomain',
        value: function withDomain(domainName) {
            if (typeof domainName !== 'string') {
                throw new Error('Parameter domainName must be a string');
            }
            //this.fluentFilter.and(this._parent.EX.eq('domainName', domainName));
            this._domainName = domainName;

            return this;
        }

        /**
         * Sets de workgroup name to search
         *
         * @example
         *  ogapi.organizationsSearchBuilder().withWorkgroup('myWorkgroup').build()
         * @param {!string} workgroupName - workgroup name
         * @throws {Error} throw error when workgroupName is not typeof string
         * @return {OrganizationsSearchBuilder} 
         */
    }, {
        key: 'withWorkgroup',
        value: function withWorkgroup(workgroupName) {
            if (typeof workgroupName !== 'string') {
                throw new Error('Parameter workgroupName must be a string');
            }
            //this.fluentFilter.and(this._parent.EX.eq('workgroupName', workgroupName));
            this._workgroupName = workgroupName;

            return this;
        }
    }, {
        key: 'build',
        value: function build() {

            return _get(Object.getPrototypeOf(OrganizationsSearchBuilder.prototype), 'build', this).call(this);
        }
    }, {
        key: '_buildFilter',
        value: function _buildFilter() {
            var filter = { filter: {} };

            var _fluentFilter = (0, _merge2['default'])(true, this.fluentFilter);
            var _customFilter = this._builderParams.filter;

            //if (this.tagsFilter.length > 0){
            //  _fluentFilter.and(this._parent.EX.in('datapoint.tag',this.tagsFilter));            
            //}

            _fluentFilter = _fluentFilter._filterTemplate.filter;

            if (typeof _customFilter._filterTemplate === "object") {
                _customFilter = _customFilter._filterTemplate.filter;
            }

            if (typeof _customFilter !== "undefined" && Object.keys(_customFilter).length > 0 && typeof _fluentFilter !== "undefined" && Object.keys(_fluentFilter).length > 0) {
                throw new Error('Incompatible filters. You only can create a filter using fluent mode [withName, withChannelName, withDomain, withWorkgroup] methods or custom filter [filter] method');
            }

            if (typeof _customFilter !== "undefined" && Object.keys(_customFilter).length > 0) {
                filter.filter = _customFilter;
            } else if (typeof _fluentFilter !== "undefined" && Object.keys(_fluentFilter).length > 0) {
                filter.filter = _fluentFilter;
            }
            return filter;
        }
    }]);

    return OrganizationsSearchBuilder;
})(_SearchBuilder3['default']);

exports['default'] = OrganizationsSearchBuilder;
module.exports = exports['default'];
//# sourceMappingURL=OrganizationsSearchBuilder.js.map
