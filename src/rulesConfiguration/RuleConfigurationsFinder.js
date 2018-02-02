'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';

import q from 'q';
import HttpStatus from 'http-status-codes';

/**
 *   This class allow make get request to RuleConfigurations resource into Opengate North API.
 */
export default class RuleConfigurationsFinder extends ProvisionGenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organizations', "configurations", 'Rule configurations not found');
    }

    /**
     * Find a specify organization by a name. This execute a GET http method
     * @test
     *   ogapi.newRuleConfigurationsFinder().findByOrganizationAndChannelAndName('my_org', 'my_chann', 'name').then().catch();
     * @param {string} organization - organization
     * @param {string} channel - channel
     * @return {Promise} 
     */
    findByOrganizationAndChannel(organization, channel) {
        this._organization = organization;
        this._channel = channel;
        return this._execute();
    }

    /**
     * Performs a get that returns organizations related
     * @test
     *   ogapi.newRuleConfigurationsFinder().findByOrganizationAndChannel('xxx-xx-xxx-xxx', 'xxxxx-xxxx-xxxx').then().catch();
     * @param {string} organization - organization 
     * @param {string} channel - channel.
     * @param {string} name - Rule Configuration name
     * @return {Promise} 
     */
    findByOrganizationAndChannelAndName(organization, channel, name) {
        let _this = this;
        _this._organization = organization;
        _this._channel = channel;
        _this._name = name;

        let defered = q.defer();
        let promise = defered.promise;
        let _error_not_found = this._error_not_found;

        this._execute().then(function(request) {
            if (request.statusCode === 204) {
                defered.reject({ data: _error_not_found, statusCode: HttpStatus.NOT_FOUND });
            } else {
                let globalData = request.data;
                let finalData = [];

                for (let idx in globalData) {
                    if (globalData[idx].name === _this._name) {
                        finalData.push(globalData[idx]);
                    }
                }

                if (finalData.length > 0) {
                    if (request.syncCache) {
                        defered.resolve({ data: finalData, statusCode: request.statusCode, syncCache: request.syncCache });
                    } else {
                        defered.resolve({ data: finalData, statusCode: request.statusCode });
                    }
                } else {
                    defered.reject({ data: _error_not_found, statusCode: HttpStatus.NOT_FOUND });
                }
            }
        }).catch(function(error) {
            defered.reject(error);
        });

        return promise;
    }

    /**
     * Performs a get that returns rules configuarations related the the search
     * @test
     *   ogapi.newRuleConfigurationsFinder().findByOrganizationAndChannelAndEnabled('xxx-xx-xxx-xxx', 'xxxxx-xxxx-xxxx',true).then().catch();
     * @param {string} organization - organization 
     * @param {string} channel - channel.
     * @param {string} enabled - Rule Configuration name
     * @return {Promise} 
     */
    findByOrganizationAndChannelAndEnabled(organization, channel, enabled) {
        let _this = this;
        _this._organization = organization;
        _this._channel = channel;
        _this._enabled = enabled;

        let defered = q.defer();
        let promise = defered.promise;
        let _error_not_found = this._error_not_found;

        this._execute().then(function(request) {
            if (request.statusCode === 204) {
                defered.reject({ data: _error_not_found, statusCode: HttpStatus.NOT_FOUND });
            } else {
                let globalData = request.data;
                let finalData = [];

                for (let idx in globalData) {
                    if (globalData[idx].enabled === _this._enabled) {
                        finalData.push(globalData[idx]);
                    }
                }

                if (finalData.length > 0) {
                    if (request.syncCache) {
                        defered.resolve({ data: finalData, statusCode: request.statusCode, syncCache: request.syncCache });
                    } else {
                        defered.resolve({ data: finalData, statusCode: request.statusCode });
                    }
                } else {
                    defered.reject({ data: _error_not_found, statusCode: HttpStatus.NOT_FOUND });
                }
            }
        }).catch(function(error) {
            defered.reject(error);
        });

        return promise;
    }


    _composeUrl() {
        return this._baseUrl + "/" + this._organization + "/channels/" + this._channel + "/ruleconfigurations";
    }

}