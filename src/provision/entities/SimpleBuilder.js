'use strict';

import BaseProvision from '../BaseProvision';
import q from 'q';

const ERROR_VALUE_NOT_ALLOWED = 'The value is not allowed. The value should be formatted as follows: ';
const ERROR_DATASTREAM_NOT_ALLOWED = 'Datastream is not allowed.';
const ERROR_FUNCTION_NOT_ALLOWED = 'Function is not allowed.';
const ERROR_ID_VALUE = 'Parameter id and value must be defined';
const ERROR_ORGANIZATION = 'Parameters organization must be defined';

export default class SimpleBuilder extends BaseProvision {
    constructor(ogapi, resource, allowedDatastreams, definedSchemas, jsonSchemaValidator) {
        super(ogapi, "/organizations/" + resource + '?flattened=true');
        if (typeof this._getEntityKey !== "function") {
            throw new Error("Must override method:  _getEntityKey");
        }
        this._entity = {};
        this._allowedDatastreams = allowedDatastreams;
        this._definedSchemas = definedSchemas;
        this._jsonSchemaValidator = jsonSchemaValidator;
    }

    _buildURL() {
        var url = this._resource.split('?');
        return url[0] + "/" + this.getEntityKey() + '?' + url[1];
    }

    _validate() {
        let _this = this;
        let errors = [];
        Object.keys(this._entity).forEach(function(_id) {
            if (!_this._definedSchemas[_id]) {
                throw new Error(ERROR_DATASTREAM_NOT_ALLOWED);
            }
            let jSchema = _this._definedSchemas[_id].value;
            let value = _this._entity[_id]._value._current.value;
            if (!_this._jsonSchemaValidator.validate(value, jSchema).valid) {
                errors.push(ERROR_VALUE_NOT_ALLOWED + JSON.stringify(jSchema));
            }
        });

        if (errors.length > 0) {
            throw new Error(JSON.stringify(errors).replace(new RegExp("\"", 'g'), ""));
        }
    }

    _composeElement() {
        this._validate();
        return this._entity;
    }

    getEntityKey() {
        return (this._getEntityKey() !== null) ? this._getEntityKey()._value._current.value : null;
    }

    with(_id, val) {
        if (!val) {
            delete this._entity[_id];
            return this;
        }
        if (this.getAllowedDatastreams().filter(function(ds) { return ds.identifier === _id; }).length !== 1) {
            console.warn('Datastream not found. This value will be ignored. Datastream Name: ' + _id);
            return this;
        }
        this._entity[_id] = {
            '_value': {
                '_current': {
                    'value': val
                }
            }
        };
        return this;
    }

    getAllowedDatastreams() {
        return this._allowedDatastreams;
    }


    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This function deletes a entity of provision
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     */
    deleteAll() {
        let defered = q.defer();
        let promise = defered.promise;
        let url = this._buildURL().split('?')[0] + "?full=true";
        this._ogapi.Napi.delete(url)
            .then((res) => {
                if (res.statusCode === 200) {
                    defered.resolve({ statusCode: res.statusCode });
                } else {
                    defered.reject({ errors: res.errors, statusCode: res.statusCode });
                }
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }
}