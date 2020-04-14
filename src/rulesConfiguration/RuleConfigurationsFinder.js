'use strict';

//import ProvisionGenericFinder from '../ProvisionGenericFinder';
import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to RuleConfigurations resource into Opengate North API.
 */
export default class RuleConfigurationsFinder extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'rules/provision/organizations', "rules", 'Rule configurations not found');
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

        // let defered = q.defer();
        // let promise = defered.promise;
        // let _error_not_found = this._error_not_found;

        return this._execute();
        // .then(function(request) {
        //     if (request.statusCode === 204) {
        //         defered.reject({ data: _error_not_found, statusCode: HttpStatus.NOT_FOUND });
        //     } else {
        //         let globalData = request.data;
        //         let finalData = [];

        //         for (let idx in globalData) {
        //             if (globalData[idx].name === _this._name) {
        //                 finalData.push(globalData[idx]);
        //             }
        //         }

        //         if (finalData.length > 0) {
        //             if (request.syncCache) {
        //                 defered.resolve({ data: finalData, statusCode: request.statusCode, syncCache: request.syncCache });
        //             } else {
        //                 defered.resolve({ data: finalData, statusCode: request.statusCode });
        //             }
        //         } else {
        //             defered.reject({ data: _error_not_found, statusCode: HttpStatus.NOT_FOUND });
        //         }
        //     }
        // }).catch(function(error) {
        //     defered.reject(error);
        // });

        // return promise;
    }

    _composeUrl() {
        return this._baseUrl + "/" + this._organization + "/channels/" + this._channel + "/" + this._name;
    }

}