'use strict';

import AlarmAttendBuilder from './catalog/AlarmAttendBuilder';
import AlarmCloseBuilder from './catalog/AlarmCloseBuilder';
import BaseOperationBuilder from './catalog/BaseOperationBuilder';
import PeriodicityUpdateBuilder from './catalog/period/PeriodicityUpdateBuilder';
import q from 'q';
import merge from 'merge';

/**
 * This class generates all operations builders by a response to search into catalog/operations
 */
export default class Operations {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     */
    constructor(ogapi) {
        const _this = this;
        this._ogapi = ogapi;
        this._operations = [];
        this._operationNames = ['ALARM_CLOSE', 'ALARM_ATTEND'];
        this._operations.push({ name: 'ALARM_CLOSE', builder: new AlarmCloseBuilder(ogapi) });
        this._operations.push({ name: 'ALARM_ATTEND', builder: new AlarmAttendBuilder(ogapi) });
    }

    /**	
     * Create a builder to update the periodicity of an operation 
     * @param {!String} operationId - identifier of the operation to be updated~
     * @return {Promise}
     */
    updatePeriodicityBuilder(operationId) {
        if (typeof operationId !== "string") {
            throw new Error({ message: "OGAPI_STRING_PARAMETER", parameter: "operationId" });
        }
        let defered = q.defer();
        let promise = defered.promise;
        let _this = this;
        this._ogapi.newOperationFinder().findPeriodicityById(operationId)
            .then(function(response) {
                //console.log("RESPONSE_UPDATE_BUILDER: " + JSON.stringify(response));
                defered.resolve(_this._createPeriodicBuilder(response.data));
            })
            .catch(function(error) {
                //console.log("ERROR_UPDATE_BUILDER: " + JSON.stringify(error));
                defered.reject(error);
            });
        return promise;
    }

    /**	
     * Create a builder to create an operation 
     * @param {!String} name - name of the operation to be created
     * @return {Promise}
     */
    builderByOperationName(name) {
        if (typeof name !== "string") {
            throw new Error({ message: "OGAPI_STRING_PARAMETER", parameter: "name" });
        }
        let defered = q.defer();
        let promise = defered.promise;
        let opN = name.toUpperCase();
        let op = this._findOperation(opN);
        let _this = this;
        if (typeof op === "undefined") {
            this._loadOperationCatalog().then(function() {
                let op = _this._findOperation(opN);
                if (typeof op === "undefined") {
                    defered.reject("Operation <'" + opN + "'> unavailable.");
                } else {
                    defered.resolve(_this._createBuilder(op.config));
                }
            });
        } else {
            defered.resolve(this._createBuilder(op.config));
        }
        return promise;
    }

    getOperationList() {
        return merge(true, this._operationNames);
    }
    _createBuilder(config) {
        return new BaseOperationBuilder(this._ogapi, config);
    }

    _createPeriodicBuilder(task) {
        //console.log("TASK: " + task.id);
        return new PeriodicityUpdateBuilder(this._ogapi, task.id, task);
    }

    _loadOperationCatalog() {
        let _this = this;
        let defered = q.defer();
        let promise = defered.promise;
        this._ogapi.rawSearchBuilder().from('/catalog/operations').build().execute().
        then(function(data) {
            if (data.statusCode === 200) {
                const operations = data.data.operations;
                for (let i in operations) {
                    let name = operations[i].name.toUpperCase();
                    _this._operationNames.push(name);
                    _this._operations.push({ name: name, config: operations[i] });
                }
            }
            defered.resolve(_this);
        }).catch(function(err) {
            //console.log(err);
            defered.resolve(_this);
        });
        return promise;
    }

    _findOperation(name) {
        return this._operations.find(function(config) {
            return config.name == this;
        }, name);
    }

    /**
     * Create alarm close operation builder
     *
     * @example
     *	ogapi.operations.builderFactory.newAlarmCloseBuilder()
     * @return {AlarmCloseBuilder} 
     */
    newAlarmCloseBuilder() {
        return new AlarmCloseBuilder(this._ogapi);
    }

    /**
     * Create alarm attend operation builder
     *
     * @example
     *	ogapi.operations.builderFactory.newAlarmAttendBuilder()
     * @return {AlarmAttendBuilder} 
     */
    newAlarmAttendBuilder() {
        return new AlarmAttendBuilder(this._ogapi);
    }

}