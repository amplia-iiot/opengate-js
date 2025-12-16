'use strict';

import BaseProvision from '../provision/BaseProvision';
import checkType from '../util/formats/check_types'

/**
 * This is a base object that contains all you can do about Bundles.
 */
export default class RestRequest extends BaseProvision {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/organization", undefined, ["identifier", "organization", "schedule", "restRequest", "response"], 'scheduler');
        this._ogapi = ogapi;
    }

    _buildURL() {
        checkType._checkString(this._organization, 'organization');
        checkType._checkString(this._identifier, 'identifier');

        return 'organization/' + this._organization + '/restRequest/' + this._identifier;
    }

    /**
     * Sets the identifier attribute
     * @param {string} identifier
     * @return {RestRequest}
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
     * @return {RestRequest}
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
     * @return {RestRequest}
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
     * Sets the url for restRequest
     * @param {string} restRequestUrl
     * @return {RestRequest}
     */
    withUrl(restRequestUrl) {
        checkType._checkURL(restRequestUrl, 'restRequestUrl');

        if (!this._restRequest) {
            this._restRequest = {}
        }

        this._restRequest.url = restRequestUrl;
        return this;
    }

    /**
     * Sets the method for restRequest
     * @param {string} restRequestMethod
     * @return {RestRequest}
     */
    withMethod(restRequestMethod) {
        checkType._checkString(restRequestMethod, 'restRequestMethod');

        if (!this._restRequest) {
            this._restRequest = {}
        }

        this._restRequest.method = restRequestMethod;
        return this;
    }

    /**
     * Sets the header for restRequest
     * @param {string} restRequestHeaders
     * @return {RestRequest}
     */
    withHeaders(restRequestHeaders) {
        checkType._checkObject(restRequestHeaders, 'restRequestHeaders');

        if (!this._restRequest) {
            this._restRequest = {}
        }

        this._restRequest.header = restRequestHeaders;
        return this;
    }

    /**
     * Sets the body for restRequest
     * @param {string} restRequestBody
     * @return {RestRequest}
     */
    withBody(restRequestBody) {
        checkType._checkObject(restRequestBody, 'restRequestBody');

        if (!this._restRequest) {
            this._restRequest = {}
        }

        this._restRequest.body = restRequestBody;
        return this;
    }

    /**
     * Sets the sync response with selected timeout
     * @param {string} syncResponseTimeout
     * @return {RestRequest}
     */
    withSyncResponseTimeout(syncResponseTimeout) {
        checkType._checkNumber(syncResponseTimeout, 'syncResponseTimeout');

        if (!this._response) {
            this._response = {}
        } else {
            if (this._response.async) {
                throw new Error({ message: 'sync cannot be setted with async', parameter: 'sync' });
            }
        }

        this._response.sync = {
            timeout: syncResponseTimeout
        };
        return this;
    }

    /**
     * Sets the async response with selected timeout
     * @param {string} asyncResponseMaxTimeToWaitCallback
     * @return {RestRequest}
     */
    withAsyncResponseMaxTimeToWaitCallback(asyncResponseMaxTimeToWaitCallback) {
        checkType._checkNumber(asyncResponseMaxTimeToWaitCallback, 'asyncResponseMaxTimeToWaitCallback');

        if (!this._response) {
            this._response = {}
        } else {
            if (this._response.sync) {
                throw new Error({ message: 'async cannot be setted with sync', parameter: 'async' });
            }
        }

        this._response.async = {
            maxTimeToWaitCallback: asyncResponseMaxTimeToWaitCallback
        };
        return this;
    }

    _composeElement() {
        this._checkRequiredParameters();

        this._resource = 'organization/' + this._organization + '/restRequest';
        var restRequest = {
            identifier: this._identifier,
            schedule: this._schedule,
            restRequest: this._restRequest,
            response: this._response
        };
        return restRequest;
    }

    toJson() {
        return this._composeElement()
    }

    update() {
        throw new Error('Update is not allowed!!!')
    }
}