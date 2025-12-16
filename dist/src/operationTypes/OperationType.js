'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _provisionBaseProvision = require('../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

/**
 * This is a base object that contains all you can do about OperationType.
 */

var OperationType = (function (_BaseProvision) {
    _inherits(OperationType, _BaseProvision);

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function OperationType(ogapi, organization, nameForUpdate, operationTypeObj) {
        _classCallCheck(this, OperationType);

        _get(Object.getPrototypeOf(OperationType.prototype), 'constructor', this).call(this, ogapi, "/organizations");

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
            if (operationTypeObj.fromCatalog) {
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

    _createClass(OperationType, [{
        key: 'withIdentifier',
        value: function withIdentifier(name) {
            if (typeof name !== 'string' || name.length === 0 || name.length > 50) throw new Error('Parameter name must be a string, cannot be empty and has a maximum length of 50');
            this._identifier = name;
            return this;
        }

        /**
         * Set the organization attribute
         * @param {string} organization - required field
         * @return {OperationType}
         */
    }, {
        key: 'withOrganization',
        value: function withOrganization(organization) {
            if (typeof organization !== 'string' || organization.length === 0 || organization.length > 50) throw new Error('Parameter organization must be a string, cannot be empty and has a maximum length of 50');
            this._organization = organization;
            return this;
        }

        /**
         * Set the title attribute
         * @param {string} title - required field
         * @return {OperationType}
         */
    }, {
        key: 'withTitle',
        value: function withTitle(title) {
            if (typeof title !== 'string') throw new Error('Parameter title must be a string, cannot be empty and has a maximum length of 50');
            this._title = title;
            return this;
        }

        /**
         * Set the name attribute
         * @param {string} name - required field
         * @return {OperationType}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length === 0 || name.length > 50) throw new Error('Parameter name must be a string, cannot be empty and has a maximum length of 50');
            this._name = name;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description 
         * @return {OperationType}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            this._description = description || undefined;
            return this;
        }

        /**
         * Allows the modification of the parameters
         * @param {array} parameters 
         * @return {OperationType}
         */
    }, {
        key: 'withParameters',
        value: function withParameters(parameters) {
            this._parameters = parameters || undefined;

            return this;
        }

        /**
         * Set the catalog
         * @param {string} fromCatalog 
         * @return {OperationType}
         */
    }, {
        key: 'fromCatalog',
        value: function fromCatalog(_fromCatalog) {
            this._fromCatalog = _fromCatalog;
            return this;
        }

        /**
         * Allows the modification of the steps
         * @param {array} steps 
         * @return {OperationType}
         */
    }, {
        key: 'withSteps',
        value: function withSteps(steps) {
            this._steps = steps || undefined;

            return this;
        }

        /**
         * Allows the modification of the allowed models
         * @param {array} models 
         * @return {OperationType}
         */
    }, {
        key: 'withModels',
        value: function withModels(models) {
            this._models = models || undefined;

            return this;
        }

        /**
         * Allows the modification of the profiles allowed
         * @param {array} profiles 
         * @return {OperationType}
         */
    }, {
        key: 'withProfiles',
        value: function withProfiles(profiles) {
            this._profiles = profiles || undefined;

            return this;
        }

        /**
         * Allows the modification of the applicableTo
         * @param {array} applicableTo 
         * @return {OperationType}
         */
    }, {
        key: 'applicableTo',
        value: function applicableTo(_applicableTo) {
            this._applicableTo = _applicableTo || undefined;

            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement(isUpdate) {
            // this._checkRequiredParameters();

            var updateData = {
                "name": this._name,
                "title": this._title,
                "description": this._description ? this._description : undefined,
                "parameters": this._parameters || undefined,
                "fromCatalog": this._fromCatalog || undefined,
                "steps": this._steps || undefined,
                "models": this._models || undefined,
                "profiles": this._profiles || undefined,
                "applicableTo": this._applicableTo || undefined
            };

            return updateData;
        }
    }, {
        key: '_checkRequiredParameters',
        value: function _checkRequiredParameters(isUpdate) {
            if (isUpdate) {
                if (this._identifier === undefined || this._organization === undefined || this._name === undefined || this._title === undefined) throw new Error('Parameters organization, title and name must be defined');
            } else {
                if (this._name === undefined || this._organization === undefined || this._title === undefined) throw new Error('Parameters organization, title and name must be defined');
            }
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            return "operationTypes/" + this._resource + "/" + this._organization;
        }

        /** 
         * Create a new Rule
         * @return {Promise}
         * @throws {Error} 
         */
    }, {
        key: 'create',
        value: function create() {
            this._checkRequiredParameters();

            return this._doNorthPost(this._buildURL(), this._composeElement());
        }

        /** 
         * Udpate a Rule
         * @return {Promise}
         * @throws {Error} 
         */
    }, {
        key: 'update',
        value: function update() {
            this._checkRequiredParameters(true);

            return this._doNorthPut(this._buildURL() + "/" + this._identifier, this._composeElement(true));
        }

        /** 
         * Deletes the selected RuleConfiguration
         * @return {Promise}
         * @throws {Error} 
         */
    }, {
        key: 'delete',
        value: function _delete() {
            if (this._identifier === undefined || this._organization === undefined) throw new Error('Parameters organization and name must be defined');

            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._ogapi.Napi['delete'](this._buildURL() + "/" + this._identifier).then(function (res) {
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
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }]);

    return OperationType;
})(_provisionBaseProvision2['default']);

exports['default'] = OperationType;
module.exports = exports['default'];
//# sourceMappingURL=OperationType.js.map
