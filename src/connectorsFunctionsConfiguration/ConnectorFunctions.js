'use strict';

import BaseProvision from '../provision/BaseProvision';
import {
    CONNECTOR_FUNCTION_TYPES,
    CONNECTOR_FUNCTION_OPERATIONAL_STATUS
} from './enum/_CONNECTOR_FUNCTIONS_ENUMS';

import q from 'q';

/**
 * This is a base object that contains all you can do about ConnectorFunctions.
 */
export default class ConnectorFunctions extends BaseProvision {
    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, organization, channel, identifier, connectorFunctionsObj) {
        super(ogapi, "/organizations");

        // Required
        this.withOrganization(organization);
        this.withChannel(channel);
        
        // only for updates
        if (identifier) {
            this.withIdentifier(identifier);
        }
        
        if (connectorFunctionsObj) {
            if (connectorFunctionsObj.name) {
                this.withName(connectorFunctionsObj.name);
            }

            if (connectorFunctionsObj.operationName) {
                this.withOperationName(connectorFunctionsObj.operationName);
            }

            if (connectorFunctionsObj.operationalStatus) {
                this.withOperationalStatus(connectorFunctionsObj.operationalStatus);
            }

            if (connectorFunctionsObj.type) {
                this.withType(connectorFunctionsObj.type);
            }

            if (connectorFunctionsObj.description) {
                this.withDescription(connectorFunctionsObj.description);
            }

            if (connectorFunctionsObj.northCriterias) {
                this.withNorthCriterias(connectorFunctionsObj.northCriterias);
            }

            if (connectorFunctionsObj.southCriterias) {
                this.withSouthCriterias(connectorFunctionsObj.southCriterias);
            }

            if (connectorFunctionsObj.javascript) {
                this.withJavascript(connectorFunctionsObj.javascript);
            }
        }
    }


    /**
     * Set the organization attribute
     * @param {string} organization - required field
     * @return {ConnectorFunctions}
     */
    withOrganization(organization) {
        if (typeof organization !== 'string' || organization.length === 0 || organization.length > 50)
            throw new Error('Parameter organization must be a string, cannot be empty and has a maximum length of 50');
        this._organization = organization;
        return this;
    }

    /**
     * Set the channel attribute
     * @param {string} channel - required field
     * @return {ConnectorFunctions}
     */
    withChannel(channel) {
        if (typeof channel !== 'string' || channel.length === 0 || channel.length > 50)
            throw new Error('Parameter channel must be a string, cannot be empty and has a maximum length of 50');
        this._channel = channel;
        return this;
    }

    /**
     * Set the identifier attribute
     * @param {string} identifier - required field
     * @return {ConnectorFunctions}
     */
    withIdentifier(identifier) {
        if (typeof identifier !== 'string' || identifier.length === 0 || identifier.length > 50)
            throw new Error('Parameter identifier must be a string, cannot be empty and has a maximum length of 50');
        this._identifier = identifier;
        return this;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {ConnectorFunctions}
     */
    withName(name) {
        if (typeof name !== 'string' || name.length === 0 || name.length > 50)
            throw new Error('Parameter name must be a string, cannot be empty and has a maximum length of 50');
        this._name = name;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description 
     * @return {ConnectorFunctions}
     */
    withDescription(description) {
        if (typeof description !== 'string' || description.length > 250)
            throw new Error({
                message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_250",
                parameter: 'description'
            });
        this._description = description;
        return this;
    }

    /**
     * Set the operation name attribute
     * @param {string} operationName - required field
     * @return {ConnectorFunctions}
     */
     withOperationName(operationName) {
        if (typeof operationName !== 'string' || operationName.length === 0 || operationName.length > 50)
            throw new Error('Parameter operation name must be a string, cannot be empty and has a maximum length of 50');
        this._operationName = operationName;
        return this;
    }

    /**
     * Set the javascript attribute
     * @param {string} javascript 
     * @return {ConnectorFunctions}
     */
     withJavascript(javascript) {
        if (typeof javascript !== 'string')
            throw new Error('Parameter javascript must be a string');
        this._javascript = javascript;
        return this;
    }

    /**
     * Set the north criterias attribute
     * @param {array} criterias 
     * @return {ConnectorFunctions}
     */
    withNorthCriterias(criterias) {
        if (!(criterias instanceof Array) || criterias.length === 0)
            throw new Error('Parameter north criteria must be an array and cannot be empty');
        this._northCriterias = criterias;
        return this;
    }

    /**
     * Set the south criterias attribute
     * @param {array} criterias 
     * @return {ConnectorFunctions}
     */
    withSouthCriterias(criterias) {
        if (!(criterias instanceof Array) || criterias.length === 0)
            throw new Error('Parameter south criteria must be an array and cannot be empty');
        
        criterias.forEach((crit) => {
            try {
                this.addSouthCriteria(crit)
            } catch(critErr) {
                this._southCriterias = null
                throw critErr
            }
        });
        
        return this;
    }

    addSouthCriteria(criteria) {
        if (typeof criteria !== 'string')
            throw new Error('South criteria must be a string');
        
        if (!this._southCriterias) {
            this._southCriterias = []
        }

        this._southCriterias.push(criteria)
        return this;
    }

    /**
     * Set the type attribute
     * @param {string} type 
     * @return {ConnectorFunctions}
     */
    withType(type) {
        if (typeof type !== 'string' || !this._checkValues(type, CONNECTOR_FUNCTION_TYPES))
            throw new Error('Parameter type must be a string and must be one of these values: ' + CONNECTOR_FUNCTION_TYPES);
        
        this._type = type;
        return this;
    }

    /**
     * Set the operational status attribute
     * @param {boolean} operationalStatus 
     * @return {ConnectorFunctions}
     */
    withOperationalStatus(operationalStatus) {
        if (typeof operationalStatus !== 'string' || !this._checkValues(operationalStatus, CONNECTOR_FUNCTION_OPERATIONAL_STATUS))
            throw new Error('Parameter operational status must be a string and must be one of these values: ' + CONNECTOR_FUNCTION_OPERATIONAL_STATUS);
        
        this._operationalStatus = operationalStatus;
        return this;
    }

    _composeElement() {
        // this._checkRequiredParameters();

        let updateData = {
            "identifier": this._identifier,
            "name": this._name,
            "operationalStatus": this._operationalStatus,
            "operationName": this._type !== 'COLLECTION'?this._operationName:undefined,
            "type": this._type,
            "javascript": this._javascript,
            "description": (this._description ? this._description : undefined),
            "northCriterias": this._type === 'REQUEST'?this._northCriterias : undefined,
            "southCriterias": this._type !== 'REQUEST'?this._southCriterias : undefined
        };

        return updateData;
    }


    _checkRequiredParameters(isUpdate) {
        if (isUpdate) {
            if (this._identifier === undefined || this._organization === undefined || this._channel === undefined || this._operationalStatus === undefined || this._type === undefined  || this._javascript === undefined)
                throw new Error('Parameters organization, channel, operational status, type, javascript and identifier must be defined');
        } else {
            if (this._name === undefined || this._organization === undefined || this._channel === undefined || this._operationalStatus === undefined || this._type === undefined  || this._javascript === undefined)
                throw new Error('Parameters organization, channel, operational status, type, javascript and name must be defined');
        }
    }

    _buildURL() {
        return "connectorFunctions/" + this._resource + "/" + this._organization + "/channels/" + this._channel + "/";
    }

    /** 
     * Create a new Connector Function
     * @return {Promise}
     * @throws {Error} 
     */
    create() {
        this._checkRequiredParameters();

        return this._doNorthPost(this._buildURL(), this._composeElement());
    }

    /** 
     * Updates a connector function
     * @return {Promise}
     * @throws {Error} 
     */
    update() {
        this._checkRequiredParameters(true);

        return this._doNorthPut(this._buildURL() + this._identifier, this._composeElement());
    }

    /** 
     * Deletes the selected connector function
     * @return {Promise}
     * @throws {Error} 
     */
    delete() {
        if (this._identifier === undefined || this._organization === undefined || this._channel === undefined)
            throw new Error('Parameters organization, channel and name must be defined');

        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi.delete(this._buildURL() + this._identifier)
            .then((res) => {
                if (res.statusCode === 200) {
                    defered.resolve({
                        statusCode: res.statusCode
                    });
                } else {
                    defered.reject({
                        errors: res.errors,
                        statusCode: res.statusCode
                    });
                }
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }
}