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
     * @return {Pipeline}
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
    withScheduleCronExpression(cronExpression, timezone) {
        checkType._checkString(cronExpression, 'cronExpression');
        checkType._checkString(timezone, 'timezone');

        if (!this._schedule) {
            this._schedule = {}
        }

        this._schedule = {
            cron: {
                expression: cronExpression,
                timeZone: timezone
            }
        };
        return this;
    }

    /**
     * Sets the interval for schedule in minutes
     * @param {number} interval in minutes
     * @return {Pipeline}
     */
    withScheduleMinutesInterval(interval) {
        checkType._checkNumber(interval, 'interval');

        if (!this._schedule) {
            this._schedule = {}
        }

        this._schedule.interval = {
            minutes: interval
        };

        return this;
    }

    /**
     * Sets the executeNow attribute
     * @param {boolean} executeNow
     * @return {Pipeline}
     */
    withScheduleExecuteNow(executeNow) {
        checkType._checkBoolean(executeNow, 'executeNow');

        if (!this._schedule) {
            this._schedule = {}
        }

        this._schedule.executeNow = executeNow;

        return this;
    }

    /**
     * Sets the from attribute
     * @param {string} from 
     * @returns {Pipeline}
     */
    withScheduleFrom(from) {
        checkType._checkISODateTime(from, 'from');

        if (!this._schedule) {
            this._schedule = {}
        }

        this._schedule.from = from;

        return this;
    }

    /**
     * Sets the to attribute
     * @param {string} to 
     * @returns {Pipeline}
     */
    withScheduleTo(to) {
        checkType._checkISODateTime(to, 'to');

        if (!this._schedule) {
            this._schedule = {}
        }

        this._schedule.to = to;

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
        return {
            identifier: this._identifier,
            schedule: this._schedule,
            pipeline: this._pipeline
        };
    }

    update() {
        throw new Error('Update is not allowed!!!')
    }
}