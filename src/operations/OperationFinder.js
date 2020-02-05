'use strict';

import GenericFinder from '../GenericFinder';

import q from 'q';

const LIMIT_START_DEF_VALUE = 1;
const LIMIT_SIZE_DEF_VALUE = 10;

/**
 *   This class allow make get request to operation resource into Opengate North API.
 */
export default class OperationFinder extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi);
        this._limit = undefined;
    }

    /**
     * Download a specific operation by its id. This execute a GET http method
     * @example
     *   ogapi.newOperationFinder().findById('xxx-xx-xxx-xxx').then().catch();
     * @param {string} id - Operation id.
     * @return {Promise} 
     */
    findById(id) {
        this._id = id;
        console.log("THIS._ID: " + this._id);
        this._baseUrl = 'operation/jobs';
        this._entity = 'job';
        this._error_not_found = 'Operation not found';
        //console.log("FIND_BY_ID: " + id);
        return this._execute();
    }

    /**
     * Download information of peridodicitiy of a specific operation by its id. This execute a GET http method
     * @example
     *   ogapi.newOperationFinder().findPeriodicityById('xxx-xx-xxx-xxx').then().catch();
     * @param {string} id - Operation id.
     * @return {Promise} 
     */
    findPeriodicityById(id) {
        this._id = id;
        var _this = this;
        let defered = q.defer();
        let promise = defered.promise;
        _this.findById(id)
            .then(function (response) {
                //console.log("1response: " + JSON.stringify(response));
                var data = response.data;
                if (!data || Object.keys(data).length == 0) {
                    //console.log("BUG");
                    //BUG http://cm.amplia.es/jira/browse/ODMQA-1057
                    defered.reject({
                        errors: _this._error_not_found
                    });
                } else {
                    _this._id = response.data.taskId;
                    _this._baseUrl = 'operation/tasks';
                    _this._entity = "task";
                    _this._error_not_found = "Operation is not periodic!";
                    //console.log("ID: " + _this._id);
                    _this._execute()
                        .then(function (response) {
                            //console.log("2response: " + JSON.stringify(response));
                            response.data.id = _this._id;
                            defered.resolve(response);
                        })
                        .catch(function (error) {
                            //console.log("2error:" + JSON.stringify(error));
                            defered.reject(error);
                        });
                }
            })
            .catch(function (error) {
                //console.log("1error:" + JSON.stringify(error));
                defered.reject(error);
            });
        return promise;
    }

    /**
     * Download information of periodicitiy  by its id. This execute a GET http method
     * @example
     *   ogapi.newOperationFinder().findPeriodicityByPeriodicityId('xxx-xx-xxx-xxx').then().catch();
     * @param {string} periodicityId - Periodicity id.
     * @return {Promise} 
     */
    findPeriodicityByPeriodicityId(periodicityId) {
        var _this = this;
        let defered = q.defer();
        let promise = defered.promise;
        _this._id = periodicityId;
        _this._baseUrl = 'operation/tasks';
        _this._entity = "task";
        //console.log("ID: " + _this._id);
        _this._execute()
            .then(function (response) {
                //console.log("2response: " + JSON.stringify(response));
                response.data.id = _this._id;
                defered.resolve(response);
            })
            .catch(function (error) {
                //console.log("2error:" + JSON.stringify(error));
                defered.reject(error);
            });
        return promise;
    }

    /**
     * Download a specific executions of an operation by its id. This execute a GET http method
     * @test
     *   ogapi.newOperationFinder().findExecutionsById('xxx-xx-xxx-xxx').then().catch();
     *   ogapi.newOperationFinder().findExecutionsById('xxx-xx-xxx-xxx', 10).then().catch(); // Without offset
     *   ogapi.newOperationFinder().findExecutionsById('xxx-xx-xxx-xxx', 20, 50).then().catch(); //With offset value 50
     * @param {string} id - Operation id.
     * @param {number} size - Defined the number of elements on response
     * @param {number} [start=0] - Defined the offset on response
     * @return {Promise} 
     */
    findExecutionsById(id, size = LIMIT_SIZE_DEF_VALUE, start = LIMIT_START_DEF_VALUE) {
        this._id = id;
        this._baseUrl = 'operation/jobs';
        this._entity = 'operations';
        this._error_not_found = 'Executions not found';
        if (typeof size !== "number") throw new Error('size parameter must be a number');
        if (typeof start !== "number" || start < 1)
            start = LIMIT_START_DEF_VALUE;
        this._limit = {
            size: size,
            start: start
        };
        return this._execute();
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        if (this._entity === 'operations') {
            if (this._limit) {
                this._setUrlParameters({
                    start: this._limit.start,
                    size: this._limit.size
                });
            }
            var base_url = this._baseUrl + "/" + this._id + "/operations";
            console.log("COMPOSE_IF: " + base_url);
            return base_url;
        }
        console.log("COMPOSE: " + this._baseUrl + "/" + this._id);
        return this._baseUrl + "/" + this._id;
    }

}