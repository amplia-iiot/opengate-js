'use strict';

import BaseProvision from '../provision/BaseProvision';
import checkType from '../util/formats/check_types'
export const URL = 'timeseries/provision/organizations/';
/**
 * This is a base object that contains all you can do about Timeseries.
 */

export default class Timeseries extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, '/organizations/', undefined, ['name', 'organization', "timeBucket", 'identifierColumn']);
    }

    _buildURL() {
        let url = URL + this._organization + '/' + this._identifier;

        if (this._onlyPlan) {
            url += '?onlyPlan=true'
        }

        return url;
    }

    /**
     * Set the organization attribute
     * @param {string} organization - required field
     * @return {Timeseries}
     */
    withOrganization(organization) {
        checkType._checkStringAndLength(organization, 50, 'organization');
        this._organization = organization;
        return this;
    }

    /**
     * Set the identifier attribute
     * @param {string} identifier - required field
     * @return {Timeseries}
     */
    withIdentifier(identifier) {
        checkType._checkString(identifier, 'identifier');
        this._identifier = identifier;
        return this;
    }

    /**
     * Name which will be unique in each organization
     * @param {string} name - required field
     * @return {Timeseries}
     */
    withName(name) {
        checkType._checkStringAndPattern(name, "^[a-zA-Z0-9_@.-]*$", 'name');
        this._name = name;
        return this;
    }

    /**
     * Set the identifierColumn attribute
     * @param {string} identifierColumn - required field
     * @return {Datasets}
     */
     withIdentifierColumn(identifierColumn) {
        checkType._checkString(identifierColumn, 'identifierColumn');
        this._identifierColumn = identifierColumn;
        return this;
    }

    /**
     * Duration of buckets in seconds.
     * @param {integer} timeBucket - required field
     * @return {Timeseries}
     */
    withTimeBucket(timeBucket) {
        checkType._checkNumber(timeBucket, 'timeBucket');
        this._timeBucket = timeBucket;
        return this;
    }

    /**
     * Long text to explain timeserie definition
     * @param {string} description
     * @return {Timeseries}
     */
    withDescription(description) {
        if (description) {
            checkType._checkString(description, 'description');
        }
        
        this._description = description;
        return this;
    }
    /**
     * List of data that is needed for each entity.
     * @param {array} columns - required field
     * @return {Timeseries}
     */
    withColumns(columns) {
        checkType._checkArray(columns, 'columns');
        this._columns = columns;
        return this;
    }

    /**
     * Name of generated column with bucket date.Required if timeBucket > 0.
     * @param {string} bucketColumn - pattern: ^[a-zA-Z0-9 _-]*$
     * @return {Timeseries}
     */
    withBucketColumn(bucketColumn) {
        checkType._checkStringAndPattern(bucketColumn, "^[a-zA-Z0-9 _-]*$", 'bucketColumn');
        this._bucketColumn = bucketColumn;
        return this;
    }


    /**
     * Name of generated column with bucket init date.
     * @param {string} bucketInitColumn - pattern: ^[a-zA-Z0-9 _-]*$
     * @return {Timeseries}
     */
    withBucketInitColumn(bucketInitColumn) {
        checkType._checkStringAndPattern(bucketInitColumn, "^[a-zA-Z0-9 _-]*$", 'bucketInitColumn');
        this._bucketInitColumn = bucketInitColumn;
        return this;
    }

    /**
     * Time that a row is stored to be got in searching.  Default value is 1 month
     * @param {number} retention
     * @return {Timeseries}
     */
    withRetention(retention) {
        checkType._checkNumber(retention, 'retention');
        this._retention = retention;
        return this;
    }

    /** 
     * Initial date to first bucket with ISO date time format. Next bucket will be calcullated from this date. Default value is created date with time equals 00:00:00.000Z
     * @param {string}  origin
     * @return {Timeseries}
     */
    withOrigin(origin) {
        checkType._checkISODateTime(origin, 'origin');
        this._origin = origin;
        return this;
    }

    /**
     * List of data that is needed for each entity.
     * @param {array} context
     * @return {Timeseries}
     */
    withContext(context) {
        checkType._checkArray(context, 'context');
        this._context = context;
        return this;
    }

    _composeElement() {
        this._resource = URL + this._organization;
        if(this._timeBucket > 0){
            checkType._checkStringAndPattern(this._bucketColumn, "^[a-zA-Z0-9 _-]*$", 'bucketColumn');

            if (this._bucketInitColumn) {
                checkType._checkStringAndPattern(this._bucketInitColumn, "^[a-zA-Z0-9 _-]*$", 'bucketInitColumn');  
            } 
        }
        const timeserie = {
            name: this._name,
            description: this._description,
            timeBucket: this._timeBucket,
            bucketColumn: this._bucketColumn || undefined,
            bucketInitColumn: this._bucketInitColumn || undefined,
            retention: this._retention,
            origin: this._origin,
            context: this._context || [],
            identifierColumn: this._identifierColumn,
            columns: this._columns || []
        };
        return timeserie;
    }

    _composeUpdateElement() {
        if(this._timeBucket > 0){
            checkType._checkStringAndPattern(this._bucketColumn, "^[a-zA-Z0-9 _-]*$", 'bucketColumn');

            if (this._bucketInitColumn) {
                checkType._checkStringAndPattern(this._bucketInitColumn, "^[a-zA-Z0-9 _-]*$", 'bucketInitColumn');  
            } 
        }
        const timeserie = {
            name: this._name,
            description: this._description,
            timeBucket: this._timeBucket,
            bucketColumn: this._bucketColumn ||  undefined,
            bucketInitColumn: this._bucketInitColumn || undefined,
            retention: this._retention,
            origin: this._origin,
            context: this._context || [],
            identifierColumn: this._identifierColumn,
            columns: this._columns || []
        };
        return timeserie;
    }

    onlyPlan() {
        this._onlyPlan = true;
        return this;
    }

    /**
     * This method invalidates the update option
     * @throws {Allways} Timeseries cannot be updated.
     */
    // update() {
    //     throw new Error("OGAPI_TIMESERIES_NOT_UPDATED");
    // }
}