'use strict';

//import ProvisionGenericFinder from '../ProvisionGenericFinder';
import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to TimeseriesFunction resource into Opengate North API.
 */
export default class TimeseriesFunctionFinder extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'timeseries/provision/organizations', "TimeseriesFunctions", 'Timeseries function not found');
    }

    /**
     * Performs a get that returns a list of timeseries function
     * @test
     *   ogapi.newTimeseriesFunctionFinder().findByOrganization('xxx-xx-xxx-xxx').then().catch();
     * @param {string} organization - organization 
     * @return {Promise} 
     */
    findByOrganization(organization) {
        let _this = this;
        _this._organization = organization;

        // let defered = q.defer();
        // let promise = defered.promise;
        // let _error_not_found = this._error_not_found;

        return this._execute();
    }

    /**
     * Performs a get that returns a timeseries function metadata
     * @test
     *   ogapi.newTimeseriesFunctionFinder().findByOrganizationAndName('xxx-xx-xxx-xxx', 'xxxxx-xxxx-xxxx').then().catch();
     * @param {string} organization - organization 
     * @param {string} name - Timeseries function Configuration name
     * @param {boolean} script - If true script content will be downloaded
     * @return {Promise} 
     */
    findByOrganizationAndName(organization, name, script) {
        let _this = this;
        _this._organization = organization;
        _this._name = name;
        _this._script = script;
        // let defered = q.defer();
        // let promise = defered.promise;
        // let _error_not_found = this._error_not_found;

        return this._execute();
    }

    _composeUrl() {
        return this._baseUrl + "/" + this._organization  + "/catalog" + (this._name?'/'+ this._name:'') + (this._script?'/script':'');
    }

}