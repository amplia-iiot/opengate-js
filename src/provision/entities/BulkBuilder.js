'use strict';

import HttpStatus from 'http-status-codes';
import BaseProvision from '../BaseProvision';
import q from 'q';

const ERROR_VALUE_NOT_ALLOWED = 'The value is not allowed. The value should be formatted as follows: ';
const ERROR_DATASTREAM_NOT_ALLOWED = 'Datastream is not allowed.';
const ERROR_ORGANIZATION = 'Parameters organization must be defined';


/**
 * This class allow set simple values.
 */
export default class BulkBuilder extends BaseProvision {

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - this is the organization where can be create/delete/update the entity
     */
    constructor(ogapi) {
        super(ogapi, '/organizations/' );

    }


    /**
     * Set the organization attribute
     * @param {string} organization 
     * @return {Channels}
     */
    withOrganization(organization) {
        if (typeof organization !== 'string' || organization.length > 50)
            throw new Error('Parameter organization must be a string and has a maximum length of 50');
        this._organization = organization;
        return this;
    }

    _composeElement() {
        return this;
    }



    _buildURL() {
        this._resource = 'provision/organizations/' + this._organization + '/bulk/entities';
        return this._resource;
    }


    create(rawFile) {
        return this._executeOperation(rawFile, 'CREATE');
    }

    delete(rawFile) {
        return this._executeOperation( rawFile, 'DELETE');
    }

    update(rawFile) {
        return this._executeOperation(rawFile, 'UPDATE');
    }

    _executeOperation( rawFile, action){
        let form;
        if (typeof rawFile !== 'string') {
            form = {};
            if (rawFile) {
                let bulkFile = new Blob([rawFile], {
                    type: "text/plain"
                });
                form.bulkFile = bulkFile;
            }
        } else {
            form = {};

            if (rawFile) {
                form.bulkFile = rawFile;
            }
        }
        let defer = q.defer();
        form.ext = "application/json";
  
        var petitionUrl = this. _buildURL() + '?action='+action;
        this._ogapi.Napi.post_multipart(petitionUrl, form, {
            }, this._timeout)
            .then((response) => {
                let statusCode = response.statusCode;
                if (statusCode === 200) {
                    defer.resolve(response);
                }else {
                    defer.reject({ errors: response.data.errors, statusCode: response.statusCode });
               }
            })
            .catch((error) => {
                defer.reject(error);
            });
        return defer.promise;
    }
}