'use strict';

import SearchBuilder from './SearchBuilder'
import merge from 'merge';

/**
 * Defined a search over organizations
 * @example ogapi.organizationsSearchBuilder()
 */
export default class OrganizationsSearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {});
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
    withName(organizationName) {
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
    withChannelName(channelName) {
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
    withDomain(domainName) {
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
    withWorkgroup(workgroupName) {
        if (typeof workgroupName !== 'string') {
            throw new Error('Parameter workgroupName must be a string');
        }
        //this.fluentFilter.and(this._parent.EX.eq('workgroupName', workgroupName));
        this._workgroupName = workgroupName;

        return this;
    }

    build() {


        return super.build();
    }

    _buildFilter() {
        let filter = { filter: {} };

        let _fluentFilter = merge(true, this.fluentFilter);
        let _customFilter = this._builderParams.filter;

        //if (this.tagsFilter.length > 0){
        //  _fluentFilter.and(this._parent.EX.in('datapoint.tag',this.tagsFilter));             
        //}

        _fluentFilter = _fluentFilter._filterTemplate.filter;

        if (typeof _customFilter._filterTemplate === "object") {
            _customFilter = _customFilter._filterTemplate.filter;
        }

        if ((typeof _customFilter !== "undefined" && Object.keys(_customFilter).length > 0) && (typeof _fluentFilter !== "undefined" && Object.keys(_fluentFilter).length > 0)) {
            throw new Error('Incompatible filters. You only can create a filter using fluent mode [withName, withChannelName, withDomain, withWorkgroup] methods or custom filter [filter] method');
        }

        if (typeof _customFilter !== "undefined" && Object.keys(_customFilter).length > 0) {
            filter.filter = _customFilter;
        } else if (typeof _fluentFilter !== "undefined" && Object.keys(_fluentFilter).length > 0) {
            filter.filter = _fluentFilter;
        }
        return filter;
    }
}
