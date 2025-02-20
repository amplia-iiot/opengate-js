'use strict';

import BaseProvision from '../provision/BaseProvision';
import checkType from '../util/formats/check_types'

/**
 * This is a base object that contains all you can do about Bundles.
 */
export default class NotebookScheduler extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/schedulers", undefined, ["notebookId"], 'planner');
        this._ogapi = ogapi;
    }

    _buildURL() {
        checkType._checkString(this._identifier, 'identifier');
        return "schedulers/" + this._identifier;
    }

    /**
     * Sets the identifier attribute
     * @param {string} identifier
     * @return {NotebookScheduler}
     */
    withIdentifier(identifier) {
        checkType._checkString(identifier, 'identifier');
        this._identifier = identifier;
        return this;
    }

    /**
     * Sets the notebookId attribute
     * @param {string} notebookId
     * @return {NotebookScheduler}
     */
    withNotebookId(notebookId) {
        checkType._checkString(notebookId, 'notebookId');
        this._notebookId = notebookId;
        return this;
    }

    /**
     * Sets the crontab pattern
     * @param {string} cronPattern
     * @return {NotebookScheduler}
     */
    withCronPattern(cronPattern) {
        checkType._checkString(cronPattern, 'cronPattern');
        this._cronPattern = cronPattern;
        return this;
    }

    /**
     * Sets the generateReport attribute
     * @param {boolean} generateReport
     * @return {NotebookScheduler}
     */
    generateReport(generateReport) {
        checkType._checkBoolean(generateReport, 'generateReport');
        this._generateReport = generateReport;
        return this;
    }

    /**
     * Sets the reportRetentionDays attribute
     * @param {number} reportRetentionDays
     * @return {NotebookScheduler}
     */
    withReportRetentionDays(reportRetentionDays) {
        checkType._checkNumber(reportRetentionDays, 'reportRetentionDays');
        this._reportRetentionDays = reportRetentionDays;
        return this;
    }

    withParams(params) {
        checkType._checkArray(params, 'params');
        this._params = params;
        return this;
    }

    _composeElement() {
        this._checkRequiredParameters();

        var notebookData = {
            notebookId: this._notebookId,
            cronPattern: this._cronPattern || '* * * * *',
            reportRetentionDays: this._reportRetentionDays || 0,
            generateReport: this._generateReport || false,
            params: this._params || []
        };
        return notebookData;
    }

    create() {
        return this._doNorthPost('schedulers', this._composeElement());
    }

    update() {
        throw new Error('Update is not allowed!!!')
    }
}