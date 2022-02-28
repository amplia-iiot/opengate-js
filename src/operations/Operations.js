'use strict';

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
        this._ogapi = ogapi;
        this._operations = [];
        this._operationNames = [];
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
                defered.resolve(_this._createPeriodicBuilder(response.data));
            })
            .catch(function(error) {
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
        return new PeriodicityUpdateBuilder(this._ogapi, task.id, task);
    }

    _loadOperationCatalog() {
        let _this = this;
        let defered = q.defer();
        let promise = defered.promise;
        this._ogapi.operationTypesSearchBuilder().build().execute().
        then(function(data) {
            if (data.statusCode === 200) {
                const operations = data.data;
                for (let i in operations) {
                    let name = operations[i].name.toUpperCase();
                    _this._operationNames.push(name);
                    _this._operations.push({ name: name, config: operations[i] });
                }
            }
            defered.resolve(_this);
        }).catch(function(err) {
            defered.resolve(_this);
        });
        return promise;
    }

    _findOperation(name) {
        return this._operations.find(function(config) {
            return config.name == this;
        }, name);
    }
}