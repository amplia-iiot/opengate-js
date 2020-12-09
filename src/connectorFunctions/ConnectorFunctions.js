'use strict';

import BaseProvision from '../provision/BaseProvision';
import ConnectorsCatalog from './ConnectorsCatalog'
import { validate } from 'jsonschema'

const RESOURCE = 'connectorFunctions'
const SCHEMA_DEFINITION_RESOURCE = 'openapi'
/**
 * This is a base object that contains all you can do about ConnectorFunctions.
 */
export default class ConnectorFunctions extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, undefined, undefined, ["organization", "channel", "name", "connector"]);
        this._connectorCatalog = new ConnectorsCatalog(ogapi)
        this._ogapi = ogapi;
        this._resource = RESOURCE
        this._body = {}
        //this._validator = new SwaggerValidator.Handler(`${this._ogapi.Napi.url}/${SCHEMA_DEFINITION_RESOURCE}`);
    }

    _buildURL () {
        return `${this._resource}/${this._organization}/${this._channel}/${this._name}`;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {ConnectorFunctions}
     */
    withName (name) {
        if (typeof name !== 'string' || name.length === 0 || name.length > 50)
            throw new Error("OGAPI_STRING_PARAMETER_MAX_LENGTH_50");
        this._body.name = this._name = name;
        return this;
    }

    /**
     * Set the connector attribute
     * @param {string} connector  - required field
     * @return {ConnectorFunctions}
     */
    withConnector (connector) {
        if (typeof connector !== 'string')
            throw new Error("OGAPI_STRING_PARAMETER");
        this._body.connector = this._connector = connector;
        return this;
    }

    /**
     * Set a connectorField value
     * @param {string} connectorField name of the connectorField
     * @param {string} value value of the connectorField
     * @return {ConnectorFunctions}
     */
    withConnectorField (connectorField, value) {
        if (!this._body.connectorFields) this._body.connectorFields = {}
        this._body.connectorFields[connectorField] = value;
        return this;
    }

    /**
     * Set the decoder attribute
     * @param {string} decoder 
     * @return {ConnectorFunctions}
     */
    withDecoder (decoder) {
        if (typeof decoder !== 'string')
            throw new Error("OGAPI_STRING_PARAMETER");
        if (!this._body.functions) this._body.functions = {}
        this._body.functions.decoder = decoder;
        return this;
    }
    /**
     * Set the encoder attribute
     * @param {string} encoder 
     * @return {ConnectorFunctions}
     */
    withEncoder (encoder) {
        if (typeof encoder !== 'string')
            throw new Error("OGAPI_STRING_PARAMETER");
        if (!this._body.functions) this._body.functions = {}
        this._body.functions.encoder = encoder;
        return this;
    }
    /**
     * Set the converter attribute
     * @param {string} converter 
     * @return {ConnectorFunctions}
     */
    withConverter (converter) {
        if (typeof converter !== 'string')
            throw new Error("OGAPI_STRING_PARAMETER");
        if (!this._body.functions) this._body.functions = {}
        this._body.functions.converter = converter;
        return this;
    }

    /**
     * Set the validator attribute
     * @param {string} validator 
     * @return {ConnectorFunctions}
     */
    withValidator (validator) {
        if (typeof validator !== 'string')
            throw new Error("OGAPI_STRING_PARAMETER");
        if (!this._body.functions) this._body.functions = {}
        this._body.functions.validator = validator;
        return this;
    }

    /**
     * Set the channel attribute
     * @param {string} channel - required field
     * @return {ConnectorFunctions}
     */
    withChannel (channel) {
        if (typeof channel !== 'string' || channel.length === 0 || channel.length > 50)
            throw new Error("OGAPI_STRING_PARAMETER_MAX_LENGTH_50");
        this._body.channel = this._channel = channel;
        return this;
    }

    /**
     * Set the organization attribute
     * @param {string} organization - required field
     * @return {ConnectorFunctions}
     */
    withOrganization (organization) {
        if (typeof organization !== 'string' || organization.length === 0 || organization.length > 50)
            throw new Error("OGAPI_STRING_PARAMETER_MAX_LENGTH_50");
        this._body.organization = this._organization = organization;
        return this;
    }

    _composeElement () {
        return new Promise((resolve, reject) => {
            this._connectorCatalog.getTemplates().then(({ data }) => {
                const connector = data.find((connector) => connector.name === this._body.connector)
                if (connector === undefined) return reject(`Invalid connector name. Value: ${this._body.connector}. Valid values ${data.map(({ name }) => name)}`)
                if (this._body.connectorFields && connector.connectorSchemaFields) {
                    const { errors, valid } = validate(
                        this._body.connectorFields,
                        this._createConnectorJsonSchema(connector.connectorSchemaFields)
                    )
                    if (!valid) return reject(errors)
                }
                resolve(this._body)
            }).catch((err) => {
                console.warn('Something wrong have happened while the connector catalog was requested')
                console.warn(err);
                resolve(this._body)
            })
        })
    }

    _createConnectorJsonSchema (fieldsSchema) {
        return { type: 'object', properties: fieldsSchema, additionalProperties: false }
    }
}