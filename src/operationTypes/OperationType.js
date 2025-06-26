'use strict';

import BaseProvision from '../provision/BaseProvision';
import q from 'q';

/**
 * This is a base object that contains all you can do about OperationType.
 */
export default class OperationType extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, organization, nameForUpdate, operationTypeObj) {
        super(ogapi, "/organizations");

        // Required
        this.withOrganization(organization);
        
        // only for updates
        if (nameForUpdate) {
            this.withIdentifier(nameForUpdate);
        }
        
        if (operationTypeObj) {
            if (operationTypeObj.name) {
                this.withName(operationTypeObj.name);
            }

            if (operationTypeObj.title) {
                this.withTitle(operationTypeObj.title);
            }

            if (operationTypeObj.description) {
                this.withDescription(operationTypeObj.description);
            }

            // Para crear sólo se puede fromCatalog, para actualizar se requiere todo
            if (operationTypeObj.fromCatalog ) {
                this.fromCatalog(operationTypeObj.fromCatalog);
            } 
            
            if (operationTypeObj.profiles) {
                this.withProfiles(operationTypeObj.profiles);
            }

            if (nameForUpdate || !operationTypeObj.fromCatalog) {
                if (operationTypeObj.steps) {
                    this.withSteps(operationTypeObj.steps);
                }
    
                if (operationTypeObj.parameters) {
                    this.withParameters(operationTypeObj.parameters);
                }
    
                if (operationTypeObj.applicableTo) {
                    this.applicableTo(operationTypeObj.applicableTo);
                }    
            }
        }
    }

    /**
     * Set the name for update attribute
     * @param {string} name - required field
     * @return {OperationType}
     */
    withIdentifier(name) {
        if (typeof name !== 'string' || name.length === 0 || name.length > 50)
            throw new Error('Parameter name must be a string, cannot be empty and has a maximum length of 50');
        this._identifier = name;
        return this;
    }

    /**
     * Set the organization attribute
     * @param {string} organization - required field
     * @return {OperationType}
     */
    withOrganization(organization) {
        if (typeof organization !== 'string' || organization.length === 0 || organization.length > 50)
            throw new Error('Parameter organization must be a string, cannot be empty and has a maximum length of 50');
        this._organization = organization;
        return this;
    }

    /**
     * Set the title attribute
     * @param {string} title - required field
     * @return {OperationType}
     */
    withTitle(title) {
        if (typeof title !== 'string')
            throw new Error('Parameter title must be a string, cannot be empty and has a maximum length of 50');
        this._title = title;
        return this;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {OperationType}
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
     * @return {OperationType}
     */
    withDescription(description) {
        this._description = description || undefined;
        return this;
    }

    /**
     * Allows the modification of the parameters
     * @param {array} parameters 
     * @return {OperationType}
     */
    withParameters(parameters) {
        this._parameters = parameters || undefined;

        return this;
    }

    /**
     * Set the catalog
     * @param {string} fromCatalog 
     * @return {OperationType}
     */
    fromCatalog(fromCatalog) {
        this._fromCatalog = fromCatalog;
        return this;
    }
    
    /**
     * Allows the modification of the steps
     * @param {array} steps 
     * @return {OperationType}
     */
    withSteps(steps) {
        this._steps = steps || undefined;

        return this;
    }

    /**
     * Allows the modification of the allowed models
     * @param {array} models 
     * @return {OperationType}
     */
    withModels(models) {
        this._models = models || undefined;

        return this;
    }

    /**
     * Allows the modification of the profiles allowed
     * @param {array} profiles 
     * @return {OperationType}
     */
    withProfiles(profiles) {
        this._profiles = profiles || undefined;

        return this;
    }

    /**
     * Allows the modification of the applicableTo
     * @param {array} applicableTo 
     * @return {OperationType}
     */
    applicableTo(applicableTo) {
        this._applicableTo = applicableTo || undefined;

        return this;
    }

    _composeElement(isUpdate) {
        // this._checkRequiredParameters();

        let updateData = {
            "name": this._name,
            "title": this._title,
            "description": (this._description ? this._description : undefined),
            "parameters": this._parameters || undefined,
            "fromCatalog": this._fromCatalog || undefined,
            "steps":this._steps || undefined,
            "models": this._models || undefined,
            "profiles": this._profiles || undefined,
            "applicableTo":  this._applicableTo || undefined
        };

        return updateData;
    }


    _checkRequiredParameters(isUpdate) {
        if (isUpdate) {
            if (this._identifier === undefined || this._organization === undefined || this._name === undefined || this._title === undefined)
                throw new Error('Parameters organization, title and name must be defined');
        } else {
            if (this._name === undefined || this._organization === undefined || this._title === undefined)
                throw new Error('Parameters organization, title and name must be defined');
        }
    }

    _buildURL() {
        return "operationTypes/" + this._resource + "/" + this._organization;
    }

    /** 
     * Create a new Rule
     * @return {Promise}
     * @throws {Error} 
     */
    create() {
        this._checkRequiredParameters();

        return this._doNorthPost(this._buildURL(), this._composeElement());
    }

    /** 
     * Udpate a Rule
     * @return {Promise}
     * @throws {Error} 
     */
    update() {
        this._checkRequiredParameters(true);

        return this._doNorthPut(this._buildURL() + "/" + this._identifier, this._composeElement(true));
    }

    /** 
     * Deletes the selected RuleConfiguration
     * @return {Promise}
     * @throws {Error} 
     */
    delete() {
        if (this._identifier === undefined || this._organization === undefined )
            throw new Error('Parameters organization and name must be defined');

        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi.delete(this._buildURL()+ "/" + this._identifier)
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