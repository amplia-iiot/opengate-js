'use strict';
import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to planner resource into Opengate North API.
 */
export default class HistoryFinder extends GenericFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organization', 'list', 'Schedule not found', 'scheduler');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._organization + "/history";
    }

    /**
    * Download a complete list of scheduler history for the organization. This execute a GET http method
    * @test
    *   ogapi.newScheduleHistoryFinder().findByOrganization(organization).then().catch();
    * @return {Promise} 
    */
    findByOrganization(organization) {
        this._setUrlParameters(this._options);
        this._organization = organization;
        return this._execute();
    }

    /**
     * Download a complete list of scheduler history for the organization and type selected. This execute a GET http method
     * @test
     *   ogapi.newScheduleHistoryFinder().findByOrganizationAndType(organization, type).then().catch();
     * @return {Promise} 
     */
    findByOrganizationAndType(organization, type) {
        if (!this._options) {
            this._options = {};
        }
        this._options.schedulerType = type;

        this._setUrlParameters(this._options);

        this._organization = organization;

        return this._execute();
    }

    /**
     * Download a complete list of scheduler history for the organization and type selected. This execute a GET http method
     * @test
     *   ogapi.newScheduleHistoryFinder().findByOrganizationAndType(organization, type).then().catch();
     * @return {Promise} 
     */
    findByOrganizationAndSchedulerId(organization, schedulerId) {
        if (!this._options) {
            this._options = {};
        }
        this._options.schedulerId = schedulerId;

        this._setUrlParameters(this._options);

        this._organization = organization;

        return this._execute();
    }

    /**
     * Marks results limit
     * @test
     *   ogapi.newScheduleHistoryFinder().withLimit(10).findByOrganization('organization').then().catch();
     * @return {this} 
     */
    withLimit(limit) {
        if (!this._options) {
            this._options = {}
        }
        this._options.limit = limit
        return this
    }

    /**
     * Set parameter schedulerIds
     * @test
     *   ogapi.newScheduleHistoryFinder().withSchedulerId('AABBCC').findByOrganization('organization').then().catch();
     * @return {this} 
     */
    withSchedulerId(schedulerId) {
        if (!this._options) {
            this._options = {}
        }
        this._options.schedulerId = schedulerId
        return this
    }

    /**
     * Set parameter schedulerIds
     * @test
     *   ogapi.newOrganizationManufacturerFinder().withSchedulerType('REST_REQUEST').findByOrganization('organization').then().catch();
     * @return {this} 
     */
    withSchedulerType(schedulerType) {
        if (!this._options) {
            this._options = {}
        }
        this._options.schedulerType = schedulerType
        return this
    }
}