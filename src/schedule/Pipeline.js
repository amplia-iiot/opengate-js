'use strict';

import BaseProvision from '../provision/BaseProvision';
import checkType from '../util/formats/check_types'
import ImageExecution from './ImageExecution';
import RestRequest from './RestRequest';

/**
 * This is a base object that contains all you can do about Bundles.
 */
export default class Pipeline extends BaseProvision {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/organization", undefined, ["identifier", "organization", "schedule", "pipeline"], 'scheduler');
        this._ogapi = ogapi;
    }

    _buildURL() {
        checkType._checkString(this._organization, 'organization');
        checkType._checkString(this._identifier, 'identifier');

        return 'organization/' + this._organization + '/pipeline/' + this._identifier;
    }

    /**
     * Sets the identifier attribute
     * @param {string} identifier
     * @return {Pipeline}
     */
    withIdentifier(identifier) {
        checkType._checkString(identifier, 'identifier');
        this._identifier = identifier;
        return this;
    }

    /**
     * Set the organization attribute
     * @param {string} organization 
     * @return {Channels}
     */
    withOrganization(organization) {
        if (typeof organization !== 'string' || organization.length > 50)
            throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'organization' });
        this._organization = organization;
        return this;
    }

    /**
     * Sets the crontab expression for schedule
     * @param {string} cronExpression
     * @return {Pipeline}
     */
    withScheduleCronExpression(cronExpression) {
        checkType._checkString(cronExpression, 'cronExpression');

        if (!this._schedule) {
            this._schedule = {}
        }

        this._schedule.expression = cronExpression;
        return this;
    }

    /**
     * Sets the isImmediateExecution attribute for schedule
     * @param {boolean} isImmediateExecution
     * @return {Pipeline}
     */
    withScheduleImmediateExecution(isImmediateExecution) {
        checkType._checkBoolean(isImmediateExecution, 'isImmediateExecution');

        if (!this._schedule) {
            this._schedule = {}
        }

        this._schedule.isImmediateExecution = isImmediateExecution;

        return this;
    }

    /**
     * Adds a rest request to the pipeline
     * @param {RestRequest} restRequest
     * @return {Pipeline}
     */
    addRestResquest(restRequest) {
        if (!this._pipeline) {
            this._pipeline = []
        }

        this._pipeline.push(restRequest)
        return this;
    }

    /**
     * Adds an Image Execution to the pipeline
     * @param {ImageExecution} imageExecution
     * @return {Pipeline}
     */
    addImageExecution(imageExecution) {
        if (!this._pipeline) {
            this._pipeline = []
        }

        this._pipeline.push(imageExecution)
        return this;
    }

    _composeElement() {
        this._checkRequiredParameters();

        this._resource = 'organization/' + this._organization + '/pipeline';
        var pipelineSchedule = {
            identifier: this._identifier,
            schedule: this._schedule,
            pipeline: this._pipeline
        };
        return pipelineSchedule;
    }

    toJson() {
        return this._composeElement()
    }

    update() {
        throw new Error('Update is not allowed!!!')
    }
}