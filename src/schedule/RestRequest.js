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
     * @return {RestRequest}
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
     * @return {RestRequest}
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
     * @returns {RestRequest}
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
     * @returns {RestRequest}
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
        return {
            identifier: this._identifier,
            schedule: this._schedule,
            restRequest: this._restRequest,
            response: this._response
        };
    }

    update() {
        throw new Error('Update is not allowed!!!')
    }
}