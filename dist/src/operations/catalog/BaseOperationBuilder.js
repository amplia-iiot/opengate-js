'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _Operation = require('./Operation');

var _Operation2 = _interopRequireDefault(_Operation);

var _parametersParameterBuilderFactory = require('./parameters/ParameterBuilderFactory');

var _parametersParameterBuilderFactory2 = _interopRequireDefault(_parametersParameterBuilderFactory);

var _AppendEntitiesBy = require('./AppendEntitiesBy');

var _AppendEntitiesBy2 = _interopRequireDefault(_AppendEntitiesBy);

var _periodExecuteEachBuilder = require('./period/ExecuteEachBuilder');

var _periodExecuteEachBuilder2 = _interopRequireDefault(_periodExecuteEachBuilder);

var _periodExecuteEveryBuilder = require('./period/ExecuteEveryBuilder');

var _periodExecuteEveryBuilder2 = _interopRequireDefault(_periodExecuteEveryBuilder);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utilDATE_FORMAT = require('./../../util/DATE_FORMAT');

var _ajv = require('ajv');

var _ajv2 = _interopRequireDefault(_ajv);

var DEFAULT_DELAYED_STOP = 43200; //Valor por defecto, 43200 minutos, equivale a un mes de retraso. Conclusión a la que se ha llegado mediante inspiración divina.
var ACK_TIMEOUT = "ackTimeout",
    TIMEOUT = "timeout",
    RETRIES = "retries",
    RETRIES_DELAY = "retriesDelay";
var RETRY_RESULT_LIST = "retryResultList";
var VALIDATE = {
    gte: function gte(value) {
        if (value < this) throw new Error("Value expected must be greater than <" + this + ">. Value setted <" + value + ">");
    },
    list: function list(value) {
        var valueFound = this.find(function (value) {
            return value == this;
        }, value);
        if (typeof valueFound === "undefined") throw new Error("Value must be one of these: " + JSON.stringify(this));
    },
    editable: function editable(value) {
        return true;
        // Desactivada comprobación, es incoherente el valor en el catalogo de operaciones.
        /*if (!this)
            throw new Error("This parameter cannot be edited.");*/
    }
};

/**
 * Defines the builder to execute an operation that is into catalog
 */

var BaseOperationBuilder = (function () {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {!object} config - this is configuration about operation. 
     */

    function BaseOperationBuilder(ogapi, config) {
        _classCallCheck(this, BaseOperationBuilder);

        this._ajv = new _ajv2['default']({ useDefaults: "empty", coerceTypes: true });
        // this._requiredParameters = [];
        /**
         * Util used into BaseOperationBuilder to append entities the three different ways. By filter, By tags, By entityList
         */
        this.appendEntitiesBy = new _AppendEntitiesBy2['default'](ogapi, this);
        this._config = config;
        this._ogapi = ogapi;
        this._resourcesAvailables = {
            job: '/jobs',
            task: '/tasks'
        };
        this._entityTypeWhenFilter = undefined;
        this._build = {
            operationParameters: {
                ackTimeout: 0,
                timeout: 90000,
                retries: 0,
                retriesDelay: 0,
                retryResultList: []
            },
            name: config.name,
            schedule: {}
        };
        //if (typeof config.parameters !== "undefined" && config.parameters.length > 0) {
        if (typeof config.parameters !== "undefined") {
            /**
             * This class contains all operation parameters builders
             */
            // this.paramBuilderFactory = new ParameterBuilderFactory(ogapi, config.parameters, this);
            this._build.parameters = {};
            // for (let i = 0; i < config.parameters.length; i++) {
            //     let param = config.parameters[i];
            //     if (param.required === true) {
            //         this._requiredParameters.push(param.name);
            //     }
            // }
        }
    }

    /**
     * Set notes to operation
     * @example
     *  ogapi.operations.builderFactory.newXXXBuilder().withNotes("own notes")
     * @param {!string} notes - If null then parameter will be removed into builder
     * @throws {Error} throw error when notes is not typeof string
     * @return {BaseOperationBuilder}
     */

    _createClass(BaseOperationBuilder, [{
        key: 'withNotes',
        value: function withNotes(notes) {
            if (notes === null) {
                delete this._build.userNotes;
                return this;
            }
            if (typeof notes !== "string") throw new Error('Parameter notes must be a string');
            this._build.userNotes = notes;
            return this;
        }

        /**
         * Set a callback to operation. If it is set also will be set notify with true value
         * @example
         *  ogapi.operations.builderFactory.newXXXBuilder().withCallback("http://my.web")
         * @param {string} url -  If null then parameter will be removed into builder
         * @throws {Error} throw error when url is not typeof string
         * @return {BaseOperationBuilder}
         */
    }, {
        key: 'withCallback',
        value: function withCallback(url) {
            if (url === null) {
                delete this._build.callback;
                delete this._build.notify;
                return this;
            }

            if (typeof url !== "string") throw new Error('Parameter url must be a string');
            this._build.callback = url;
            this._build.notify = true;
            return this;
        }

        /**
         * Set a scattering max spread to operation.
         * @example
         *  ogapi.operations.builderFactory.newXXXBuilder().withScatteringMaxSpread(20)
         * @param {number} percentage - if null then parameter will be removed into builder         
         * @throws {Error} throw error when percentage is not typeof number
         * @throws {Error} throw error when percentage is greater than 100 and less than 0  
         * @return {BaseOperationBuilder}
         */
    }, {
        key: 'withScatteringMaxSpread',
        value: function withScatteringMaxSpread(percentage) {
            if (percentage === null && typeof this._build.schedule.scattering !== "undefined") {
                delete this._build.schedule.scattering.maxSpread;
                return this;
            }
            if (typeof percentage !== "number") {
                throw new Error("Parameter percentage must be a number");
            }
            if (percentage < 0 || percentage > 100) {
                throw new Error("The value of percentage parameter must be between 0-100");
            }
            if (typeof this._build.schedule.scattering === "undefined") this._build.schedule.scattering = {};
            this._build.schedule.scattering.maxSpread = percentage;
            return this;
        }

        /**
         * Set a scattering strategy to operation.
         * @example
         *  ogapi.operations.builderFactory.newXXXBuilder().withScatteringStrategy(20,4)
         * @param {number} factor - if null then parameter will be removed into builder         
         * @param {number} warningMaxRate           
         * @throws {Error} throw error when factor is not typeof number
         * @throws {Error} throw error when factor is greater than 100 and less than 0  
         * @return {BaseOperationBuilder}
         */
    }, {
        key: 'withScatteringStrategy',
        value: function withScatteringStrategy(factor, warningMaxRate) {
            if (factor === null && typeof this._build.schedule.scattering !== "undefined") {
                delete this._build.schedule.scattering.strategy;
                return this;
            }

            if (typeof factor !== "number") {
                throw new Error("Parameter factor must be a number");
            }
            if (factor < 0 || factor > 100) {
                throw new Error("The value of factor parameter must be between 0-100");
            }

            if (typeof this._build.schedule.scattering === "undefined") this._build.schedule.scattering = {};

            this._build.schedule.scattering.strategy = {
                field: "subscription.collected.cellInfo",
                factor: factor
            };

            if (typeof warningMaxRate === "number") {
                this._build.schedule.scattering.strategy.warningMaxRate = warningMaxRate;
            }

            return this;
        }

        /**
         * The operation will be execute immediately.
         * @return {BaseOperationBuilder}
         */
    }, {
        key: 'executeImmediately',
        value: function executeImmediately() {
            this._build.active = true;
            if (typeof this._build.schedule !== "undefined") {
                delete this._build.schedule.start;
            }
            delete this._build.task;
            return this;
        }

        /**
         * The operation will be created in IDLE state
         * @return {BaseOperationBuilder}
         */
    }, {
        key: 'executeIDLE',
        value: function executeIDLE() {
            throw new Error("Not implemented yet");
        }

        /**
         * The operation will be created with delayed start or if you not pass any argument then the method return a cron expression builder.
         * @param {!number} minutes
         * @param {boolean} active - If active is false, an operation is created in paused
         * @throws {Error} throw error when minutes is not typeof number
         * @return {BaseOperationBuilder|CronExpressionBuilder} 
         */
    }, {
        key: 'executeLater',
        value: function executeLater(minutes) {
            var active = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

            if (typeof minutes !== "number") {
                throw new Error("Parameter minutes must be typeof number");
            }
            this._build.active = active;
            if (typeof this._build.schedule === "undefined") {
                this._build.schedule = {};
            }
            this._build.schedule.start = {
                delayed: _moment2['default'].duration(minutes, 'minutes').asMilliseconds()
            };
            delete this._build.task;
            return this;
        }

        /**
         * The operation will execute with a period that you must define with ExecuteEveryBuilder 
         * @param {!Date} date - Date when operation will be executed
         * @param {string} name - Name associated to periodicity
         * @param {number or Date} end - When periodicity ends. By repetitions or by date
         * @param {boolean} active - If active is false, an operation is created in paused
         * @param {string} description - Description associated to periodicity
         * @throws {Error} throw error when date is not typeof Date
         * @return {ExecuteEveryBuilder}
         */
    }, {
        key: 'executeEvery',
        value: function executeEvery(date, name, end, active, description) {
            if (active === undefined) active = true;

            if (typeof date === "undefined" || date.constructor !== Date) {
                throw new Error("Parameter date must be typeof Date");
            }
            var args = Array.prototype.slice.call(arguments);
            var _name = this._getName(args.slice(1, 3));
            var _end = this._getEnd(args.slice(1, 3));
            this._build.active = active;
            return new _periodExecuteEveryBuilder2['default'](this, date, _name, _end, description);
        }

        /**
         * The operation will execute with a period that you must define with ExecuteEachBuilder 
         * @param {!Date} date - Date when operation will be executed
         * @param {string} name - Name associated to periodicity
         * @param {number or Date} end - When periodicity ends. By repetitions or by date   
         * @param {boolean} active - If active is false, an operation is created in paused
         * @param {string} description - Description associated to periodicity
         * @throws {Error} throw error when date is not typeof Date
         * @return {ExecuteEachBuilder}
         */
    }, {
        key: 'executeEach',
        value: function executeEach(date, name, end, active, description) {
            if (active === undefined) active = true;

            if (typeof date === "undefined" || date.constructor !== Date) {
                throw new Error("Parameter date must be typeof Date");
            }
            var args = Array.prototype.slice.call(arguments);
            var _name = this._getName(args.slice(1, 3));
            var _end = this._getEnd(args.slice(1, 3));
            this._build.active = active;
            return new _periodExecuteEachBuilder2['default'](this, date, _name, _end, description);
        }
    }, {
        key: '_getName',
        value: function _getName(args) {
            for (var i = 0; i < args.length; i++) {
                if (typeof args[i] === "string") {
                    return args[i];
                }
            }
            return this._build.name + " " + this._ogapi.Napi._options.apiKey;
        }
    }, {
        key: '_getEnd',
        value: function _getEnd(args) {
            for (var i = 0; i < args.length; i++) {
                if (typeof args[i] === "number" || args[i] && args[i].constructor === Date) {
                    return args[i];
                }
            }
            return undefined;
        }

        /**
         * Set a timeout of job.
         * @example
         *  ogapi.operations.builderFactory.newXXXBuilder().withJobTimeout(3)
         * @param {number} minutes - if null then parameter will be removed into builder
         * @throws {Error} throw error when minutes is not typeof number    
         * @return {BaseOperationBuilder}
         */
    }, {
        key: 'withJobTimeout',
        value: function withJobTimeout(minutes) {
            if (minutes === null) {
                delete this._build.schedule.stop;
                return this;
            }
            if (typeof minutes !== "number") {
                throw new Error("Parameter minutes must be a number");
            }
            this._build.schedule.stop = {
                delayed: _moment2['default'].duration(minutes, 'minutes').asMilliseconds()
            };
            return this;
        }

        /**
         * Set ackTimeout to operation.
         * @example
         *  ogapi.operations.builderFactory.newXXXBuilder().withAckTimeout(11)
         * @param {!number} milliseconds    
         * @param {string} format - Can be 'milliseconds' || 'ms' ,'seconds' || 's', 'minutes' || 'm', 'hours' || 'h', 'days' || 'd', 'weeks' || 'w', 'months' || 'M'
         * @throws {Error} throw error when milliseconds is not typeof number   
         * @return {BaseOperationBuilder}
         */
    }, {
        key: 'withAckTimeout',
        value: function withAckTimeout(milliseconds) {
            var format = arguments.length <= 1 || arguments[1] === undefined ? "milliseconds" : arguments[1];

            this._addSpecificParameter(_moment2['default'].duration(milliseconds, format).asMilliseconds(), ACK_TIMEOUT);
            return this;
        }

        /**
         * Set timeout to operation.
         * @example
         *  ogapi.operations.builderFactory.newXXXBuilder().withTimeout(11)
         * @param {!number} milliseconds    
         * @param {string} format - Can be 'milliseconds' || 'ms' ,'seconds' || 's', 'minutes' || 'm', 'hours' || 'h', 'days' || 'd', 'weeks' || 'w', 'months' || 'M'
         * @throws {Error} throw error when milliseconds is not typeof number   
         * @return {BaseOperationBuilder}
         */
    }, {
        key: 'withTimeout',
        value: function withTimeout(milliseconds) {
            var format = arguments.length <= 1 || arguments[1] === undefined ? "milliseconds" : arguments[1];

            this._addSpecificParameter(_moment2['default'].duration(milliseconds, format).asMilliseconds(), TIMEOUT);
            return this;
        }

        /**
         * Set delay between operation retries.
         * @example
         *  ogapi.operations.builderFactory.newXXXBuilder().withRetriesDelay(11)
         * @param {!number} milliseconds    
         * @param {string} format - Can be 'milliseconds' || 'ms' ,'seconds' || 's', 'minutes' || 'm', 'hours' || 'h', 'days' || 'd', 'weeks' || 'w', 'months' || 'M'
         * @throws {Error} throw error when milliseconds is not typeof number   
         * @return {BaseOperationBuilder}
         */
    }, {
        key: 'withRetriesDelay',
        value: function withRetriesDelay(milliseconds) {
            var format = arguments.length <= 1 || arguments[1] === undefined ? "milliseconds" : arguments[1];

            this._addSpecificParameter(_moment2['default'].duration(milliseconds, format).asMilliseconds(), RETRIES_DELAY);
            return this;
        }

        /**
         * Set operation retries
         * @example
         *  ogapi.operations.builderFactory.newXXXBuilder().withOperationRetries(11)
         * @param {Array} operationRetries    
         * @throws {Error} throw error when operationRetries is not typeof string   
         * @return {BaseOperationBuilder}
         */
    }, {
        key: 'withOperationRetries',
        value: function withOperationRetries(operationRetries) {
            this._addSpecificParameter(operationRetries, RETRY_RESULT_LIST);
            return this;
        }

        /**
         * Set number of retries that operation will have.
         * @example
         *  ogapi.operations.builderFactory.newXXXBuilder().withRetries(2)
         * @param {!number} retriesNumber   
         * @throws {Error} throw error when retriesNumber is not typeof number  
         * @return {BaseOperationBuilder}
         */
    }, {
        key: 'withRetries',
        value: function withRetries(retriesNumber) {
            this._addSpecificParameter(retriesNumber, RETRIES);
            return this;
        }

        /**
         * Set parameters of the operation
         * @example
         *  ogapi.operations.builderFactory.newXXXBuilder().withParameters({ param1: 'value1', param2: 'value2'})
         * @param {!object} parameters   
         * @throws {Error} throw error when parameters is not typeof object  
         * @return {BaseOperationBuilder}
         */
    }, {
        key: 'withParameters',
        value: function withParameters(parameters) {
            if (this._config.parameters) {
                this._build.parameters = parameters;
                this._checkMandatoryParameters();
                return this;
            } else {
                throw new Error('This operation does not support parameters');
            }
        }
    }, {
        key: 'withParameter',
        value: function withParameter(parameter, value) {
            if (this._config.parameters) {
                if (!this._build.parameters) {
                    this._build.parameters = {};
                }

                this._build.parameters[parameter] = value;
                return this;
            } else {
                throw new Error('This operation does not support parameters');
            }
        }

        /**
         * Build a instance of Operation 
         *
         * @example
         *  ogapi.operations.builderFactory.newXXXBuilder().build()
         * @throws {Error} Throw error if there are required parameters who have not been set
         * @return {Operation} 
         */
    }, {
        key: 'build',
        value: function build() {
            var resource = undefined;
            var _build = (0, _merge2['default'])(true, this._build);
            var postObj = undefined;
            var errors = [];
            try {
                this._checkMandatoryParameters();
            } catch (err) {
                errors.push(err.message);
            }
            if (typeof this._build.task === "undefined") {
                if (typeof this._build.schedule.start === "undefined" && typeof this._build.active === "undefined") {
                    console.info("Not specified the way to execute [executeImmediately, executeIDLE, executeLater]. By default executeImmediately will be the way");
                    this.executeImmediately();
                }
                /*if (!this._build.active) {
                    errors.push("INERR: OgAPI will not allowed to execute IDLE because there is not implemented the way to update once created ");
                }*/
            }
            if (typeof this._build.target === "undefined") {
                if (this._build.active) {
                    errors.push("Must be entities appended  if you want execute immediately. You must invoke appendEntitiesBy.list or appendEntitiesBy.tags or appendEntitiesBy.filter");
                }
            }
            if (typeof this._build.target !== "undefined" && typeof this._build.target.filter !== "undefined") {
                if (typeof this._entityTypeWhenFilter !== "string") {
                    errors.push("Must be selected the entity type allowed when filter is the way to append entities. Allowed entity types <'" + JSON.stringify(this._config.applicableTo) + "'>");
                }
            }

            if (typeof this._build.task !== "undefined") {
                var task = this._build.task;
                // CHECK period and job timeout
                var jobTimeout = this._build.schedule.stop;
                if (typeof task.repeating.period !== "undefined") {
                    var maxJobTimeout = undefined;
                    switch (task.repeating.period.unit) {
                        case "DAYS":
                            maxJobTimeout = _moment2['default'].duration(task.repeating.period.each, 'days').asMilliseconds();
                            break;
                        case "HOURS":
                            maxJobTimeout = _moment2['default'].duration(task.repeating.period.each, 'hours').asMilliseconds();
                            break;
                        case "MINUTES":
                            maxJobTimeout = _moment2['default'].duration(task.repeating.period.each, 'minutes').asMilliseconds();
                            break;
                    }
                    if (typeof jobTimeout !== "undefined" && typeof jobTimeout.delayed === "number") {
                        if (jobTimeout.delayed >= maxJobTimeout) {
                            errors.push("You can not execute an operation with a job timeout greater than the repetition period.");
                        }
                    } else {
                        jobTimeout = _moment2['default'].duration(maxJobTimeout, 'milliseconds').asMinutes() - 1;
                        console.info("Not specified the job timeout. By default, timeout will be " + jobTimeout + " minutes");
                        this.withJobTimeout(jobTimeout);
                    }
                }
            }

            if (errors.length > 0) {
                this._build = _build;
                throw errors;
            }

            if (typeof this._build.schedule.stop === "undefined") {
                console.info("Not specified the job timeout. By default, timeout will be 30 days");
                this.withJobTimeout(DEFAULT_DELAYED_STOP);
            }

            if (typeof this._build.task !== "undefined") {
                resource = this._resourcesAvailables.task;
                postObj = this._convertToTask(this._build);
            } else {
                resource = this._resourcesAvailables.job;
                postObj = this._convertToJob(this._build);
            }

            if (typeof this._build.target !== "undefined" && typeof this._build.target.filter !== "undefined") {
                resource = resource + '?entityType=' + this._entityTypeWhenFilter;
            }

            var op = new _Operation2['default'](this._ogapi, resource, postObj);
            // Se deshacen todos los por defectos aplicados al objeto builder, para no condicionar el siguiente .build
            this._build = _build;
            return op;
        }
    }, {
        key: '_convertToTask',
        value: function _convertToTask(_build) {
            var task = _build.task;
            this.executeImmediately();
            var jobObj = this._convertToJob(this._build);
            var now = (0, _moment2['default'])(new Date());
            var start = (0, _moment2['default'])(task.start);
            var taskObj = {
                task: {
                    active: true,
                    name: task.name,
                    description: task.description,
                    job: jobObj.job,
                    schedule: {
                        start: {
                            date: start.format(_utilDATE_FORMAT.DATE_FORMAT)
                        },
                        repeating: task.repeating
                    }
                }
            };
            if (typeof task.stop !== "undefined") {
                if (typeof task.stop.date !== "undefined") {
                    taskObj.task.schedule.stop = {
                        date: (0, _moment2['default'])(task.stop.date).format(_utilDATE_FORMAT.DATE_FORMAT)
                    };
                } else {
                    taskObj.task.schedule.stop = task.stop;
                }
            }
            if (_moment2['default'].max(now, start) == now) {
                if (typeof task.stop !== "undefined" && typeof task.stop.date !== "undefined") {
                    var stopDate = (0, _moment2['default'])(task.stop.date);
                    if (_moment2['default'].max(now, stopDate) == now) {
                        throw new Error("Can not create operation object because stop operation period is earlier than current date. " + "It happened because you passed a lot of time between configuration of an operation and create the operation.");
                    }
                }
                //console.log("Start date configured on operation period is later than current date. Start date will be changed to  current date.");
                delete taskObj.task.schedule.start;
            }
            return taskObj;
        }
    }, {
        key: '_convertToJob',
        value: function _convertToJob(_build) {
            if (_build.operationParameters.ackTimeout === 0) {
                delete _build.operationParameters.ackTimeout;
            }
            return {
                job: {
                    request: _build
                }
            };
        }
    }, {
        key: '_addSpecificParameter',
        value: function _addSpecificParameter(value, paramName) {
            this._build.operationParameters[paramName] = value;
        }
    }, {
        key: '_checkParam',
        value: function _checkParam(value, configParam) {
            if (configParam.type === "number") {
                if (typeof value !== "number") throw new Error(configParam.name + ": Expected number but found " + typeof value);
            }

            for (var attr in configParam.attributes) {
                if (typeof VALIDATE[attr] === "function") {
                    VALIDATE[attr].call(configParam.attributes[attr], value);
                }
            }
        }
    }, {
        key: '_checkMandatoryParameters',
        value: function _checkMandatoryParameters() {
            if (this._config.parameters && this._config.parameters.schema) {
                var validate = this._ajv.compile(this._config.parameters.schema);
                var valid = validate(this._build.parameters);
                if (!valid) {
                    throw new Error(validate.errors);
                }
            }
        }
    }]);

    return BaseOperationBuilder;
})();

exports['default'] = BaseOperationBuilder;
module.exports = exports['default'];
//# sourceMappingURL=BaseOperationBuilder.js.map
