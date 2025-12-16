'use strict';

import BaseProvision from '../provision/BaseProvision';
import checkType from '../util/formats/check_types'

/**
 * This is a base object that contains all you can do about Bundles.
 */
export default class ImageExecution extends BaseProvision {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/organization", undefined, ["identifier", "organization", "schedule", "imageExecution", "maxTimeToWaitCallback"], 'scheduler');
        this._ogapi = ogapi;
    }

    _buildURL() {
        checkType._checkString(this._organization, 'organization');
        checkType._checkString(this._identifier, 'identifier');

        return 'organization/' + this._organization + '/imageExecution/' + this._identifier;
    }

    /**
     * Sets the identifier attribute
     * @param {string} identifier
     * @return {ImageExecution}
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
     * @return {ImageExecution}
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
     * @return {ImageExecution}
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
     * Sets the name for imageExecution
     * @param {string} imageExecutionName
     * @return {ImageExecution}
     */
    withName(imageExecutionName) {
        checkType._checkString(imageExecutionName, 'imageExecutionName');

        if (!this._imageExecution) {
            this._imageExecution = {};
        }

        this._imageExecution.name = imageExecutionName;
        return this;
    }

    /**
     * Sets the tag for imageExecution
     * @param {string} imageExecutionTag
     * @return {ImageExecution}
     */
    withTag(imageExecutionTag) {
        checkType._checkString(imageExecutionTag, 'imageExecutionTag');

        if (!this._imageExecution) {
            this._imageExecution = {}
        }

        this._imageExecution.tag = imageExecutionTag;
        return this;
    }

    /**
     * Sets the env vars for imageExecution
     * @param {object} imageExecutionEnvVars
     * @return {ImageExecution}
     */
    withEnvVars(imageExecutionEnvVars) {
        checkType._checkObject(imageExecutionEnvVars, 'imageExecutionEnvVars');

        if (!this._imageExecution) {
            this._imageExecution = {}
        }

        this._imageExecution.env = imageExecutionEnvVars;
        return this;
    }

    /**
     * Sets the env from for imageExecution
     * @param {array} imageExecutionEnvFrom
     * @return {ImageExecution}
     */
    withEnvFrom(imageExecutionEnvFrom) {
        checkType._checkArray(imageExecutionEnvFrom, 'imageExecutionEnvFrom');

        if (!this._imageExecution) {
            this._imageExecution = {}
        }

        this._imageExecution.envFrom = imageExecutionEnvFrom;
        return this;
    }

    /**
     * Sets the execution timeout for imageExecution
     * @param {string} timeout
     * @return {ImageExecution}
     */
    withTimeout(timeout) {
        checkType._checkNumber(timeout, 'timeout');

        if (!this._imageExecution) {
            this._imageExecution = {}
        }


        this._imageExecution.timeout = timeout

        return this;
    }

    /**
     * Sets the async response with selected timeout
     * @param {string} asyncResponseMaxTimeToWaitCallback
     * @return {ImageExecution}
     */
    withMaxTimeToWaitCallback(asyncResponseMaxTimeToWaitCallback) {
        checkType._checkNumber(asyncResponseMaxTimeToWaitCallback, 'asyncResponseMaxTimeToWaitCallback');

        this._maxTimeToWaitCallback = asyncResponseMaxTimeToWaitCallback

        return this;
    }

    _composeElement() {
        this._checkRequiredParameters();

        this._resource = 'organization/' + this._organization + '/imageExecution';
        var imageExecution = {
            identifier: this._identifier,
            schedule: this._schedule,
            imageExecution: this._imageExecution,
            maxTimeToWaitCallback: this._maxTimeToWaitCallback
        };
        return imageExecution;
    }

    toJson() {
        return this._composeElement()
    }

    update() {
        throw new Error('Update is not allowed!!!')
    }
}