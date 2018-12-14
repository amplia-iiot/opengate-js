'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';

import q from 'q';
import HttpStatus from 'http-status-codes';

/**
 *   This class allow make get request to organization resource into Opengate North API.
 */
export default class OrganizationFinder extends ProvisionGenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organizations', 'organization', 'Organization not found');
    }

    /**
     * Find a specify organization by a name. This execute a GET http method
     * @test
     *   ogapi.newOrganizationFinder().findByName('my_org').then().catch();
     * @param {string} name - Organization name
     * @return {Promise} 
     */
    findByName(name) {
        this._id = name;
        return this._execute();
    }

    /**
     * Performs a get that returns organizations related
     * @test
     *   ogapi.newOrganizationFinder().findByDomainAndWorkgroup('xxx-xx-xxx-xxx', 'xxxxx-xxxx-xxxx').then().catch();
     * @param {string} domain - domain 
     * @param {string} workgroup - workgroup.
     * @return {Promise} 
     */
    findByDomainAndWorkgroup(domain, workgroup) {
        this._domain = domain;

        this._workgroup = workgroup;

        let defered = q.defer();
        let promise = defered.promise;
        let _error_not_found = this._error_not_found;

        this._executeWorkgroupRelation().then(function (request) {
            if (request.statusCode === 204) {
                defered.reject({
                    data: _error_not_found,
                    statusCode: HttpStatus.NOT_FOUND
                });
            } else {
                let globalData = request.data;
                let organizations = {};
                let finalData = [];

                for (let idx in globalData.channels) {
                    if (!organizations[globalData.channels[idx].organization]) {
                        organizations[globalData.channels[idx].organization] = globalData.channels[idx].organization;
                        finalData.push({
                            "name": globalData.channels[idx].organization
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