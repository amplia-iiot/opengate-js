'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';

import q from 'q';
import HttpStatus from 'http-status-codes';

/**
 *   This class allow make get request to channel resource into Opengate North API.
 */
export default class ChannelFinder extends ProvisionGenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organizations', 'channel', 'Channel not found');
    }

    /**
     * Download a specific channel by its organization and id. This execute a GET http method
     * @test
     *   ogapi.newChannelFinder().findByOrganizationAndName('orgname', xxx-xx-xxx-xxx').then().catch();
     * @param {string} organization - channel organization .
     * @param {string} name - channel name.
     * @return {Promise} 
     */
    findByOrganizationAndName(organization, name) {
        this._organization = organization;
        this._name = name;
        return this._execute();
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._organization + "/channels/" + this._name;
    }

    /**
     * Performs a get that returns channels related
     * @test
     *   ogapi.newChannelFinder().findByDomainAndWorkgroup('xxx-xx-xxx-xxx', 'xxxxx-xxxx-xxxx').then().catch();
     * @param {string} domain - domain 
     * @param {string} workgroup - workgroup.
     * @return {Promise} 
     */
    findByDomainAndWorkgroup(domain, workgroup) {
        this._domain = domain;

        this._workgroup = workgroup;
        let _error_not_found = this._error_not_found;

        let defered = q.defer();
        let promise = defered.promise;

        this._executeWorkgroupRelation().then(function (request) {
            if (request.statusCode === 204) {
                defered.reject({
                    data: _error_not_found,
                    statusCode: HttpStatus.NO_CONTENT
                });
            } else {
                let globalData = request.data;
                let finalData = [];

                for (let idx in globalData.channels) {
                    finalData.push({
                        "organization": globalData.channels[idx].organization,
                        "name": globalData.channels[idx].channel
                    });
                }

                defered.resolve({
                    data: finalData,
                    statusCode: request.statusCode
                });
            }
        }).catch(function (error) {
            defered.reject(error);
        });

        return promise;
    }

    /**
     * Performs a get that returns channels related
     * @test
     *   ogapi.newChannelFinder().findByDomainAndWorkgroupAndOrganization('xxx-xx-xxx-xxx', 'xxxxx-xxxx-xxxx', 'asdfasdfasdf').then().catch();
     * @param {string} domain - domain 
     * @param {string} workgroup - workgroup.
     * @param {string} organization - organization.
     * @return {Promise} 
     */
    findByDomainAndWorkgroupAndOrganization(domain, workgroup, organization) {
        var _this = this;
        _this._domain = domain;
        _this._workgroup = workgroup;
        _this._organization = organization;

        let _error_not_found = _this._error_not_found;

        let defered = q.defer();
        let promise = defered.promise;

        _this._executeWorkgroupRelation().then(function (request) {

            if (request.statusCode === 204) {
                defered.reject({
                    data: _error_not_found,
                    statusCode: HttpStatus.NOT_FOUND
                });
            } else {
                let globalData = request.data;
                let finalData = [];

                for (let idx in globalData.channels) {
                    if (_this._organization === globalData.channels[idx].organization) {
                        finalData.push({
                            "organization": globalData.channels[idx].organization,
                            "name": globalData.channels[idx].channel
                        });
                    }
                }

                if (finalData.length > 0) {
                    defered.resolve({
                        data: finalData,
                        statusCode: request.statusCode
                    });
                } else {
                    defered.reject({
                        data: _error_not_found,
                        statusCode: HttpStatus.NOT_FOUND
                    });
                }
            }
        }).catch(function (error) {
            defered.reject(error);
        });

        return promise;
    }

    /**
     * @return {Promise}
     * @private
     */
    _executeWorkgroupRelation() {

        let workgroupsRelationsUrl = "provision/domains/" + this._domain + "/workgroups/" + this._workgroup + "/relations";

        let defered = q.defer();
        let promise = defered.promise;

        let _error_not_found = this._error_not_found;
        this._api.get(workgroupsRelationsUrl, undefined, this._getExtraHeaders(), this._getUrlParameters())
            .then((req) => {
                if (req.statusCode === 204) {
                    defered.reject({
                        data: _error_not_found,
                        statusCode: HttpStatus.NOT_FOUND
                    });
                } else {
                    defered.resolve({
                        data: req.body.workgroupRelation,
                        statusCode: req.statusCode
                    });
                }
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }

}