'use strict';

import q from 'q';
import BaseProvision from '../provision/BaseProvision';
import checkType from '../util/formats/check_types'

/**
 * This is a base object that contains all you can do about Bundles.
 */
export default class NotebookLauncher extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/notebooks", undefined, ["identifier"], 'planner');
        this._ogapi = ogapi;
    }

    _buildURL() {
        var url = "notebooks/" + this._identifier + '/execute';
        return url;
    }

    /**
     * Sets the identifier attribute
     * @param {string} identifier
     * @return {NotebookLauncher}
     */
    withIdentifier(identifier) {
        checkType._checkString(identifier, 'identifier');
        this._identifier = identifier;
        return this;
    }

    /**
     * Sets the generateReport attribute
     * @param {boolean} generateReport
     * @return {NotebookLauncher}
     */
    generateReport(generateReport) {
        checkType._checkBoolean(generateReport, 'generateReport');
        this._generateReport = generateReport;
        return this;
    }

    /**
     * Sets the reportRetentionDays attribute
     * @param {number} reportRetentionDays
     * @return {NotebookLauncher}
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
            reportRetentionDays: this._reportRetentionDays || 0,
            generateReport: this._generateReport || false,
            params: this._params || []
        };
        return notebookData;
    }

    execute() {
        var defered = q.defer();
        var promise = defered.promise;

        this._ogapi.Napi.post(this._buildURL(), this._composeElement(), this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL())
            .then((res) => {
                defered.resolve({
                    statusCode: res.statusCode,
                    body: res.body
                });
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }

    create() {
        throw new Error('Update is not allowed!!!')
    }

    update() {
        throw new Error('Update is not allowed!!!')
    }

    delete() {
        throw new Error('Delete is not allowed!!!')
    }
}