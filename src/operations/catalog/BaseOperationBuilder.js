'use strict';

import merge from 'merge';

import Operation from './Operation';

import ParameterBuilderFactory from './parameters/ParameterBuilderFactory';
import AppendEntitiesBy from './AppendEntitiesBy';
import ExecuteEachBuilder from './period/ExecuteEachBuilder';
import ExecuteEveryBuilder from './period/ExecuteEveryBuilder';

import moment from 'moment';
import { TIME_FORMAT, DATE_FORMAT } from './../../util/DATE_FORMAT';

import Ajv from 'ajv'

const DEFAULT_DELAYED_STOP = 43200; //Valor por defecto, 43200 minutos, equivale a un mes de retraso. Conclusión a la que se ha llegado mediante inspiración divina.
const ACK_TIMEOUT = "ackTimeout",
    TIMEOUT = "timeout",
    RETRIES = "retries",
    RETRIES_DELAY = "retriesDelay";
const VALIDATE = {
    gte: function(value) {
        if (value < this)
            throw new Error("Value expected must be greater than <" + this + ">. Value setted <" + value + ">");
    },
    list: function(value) {
        let valueFound = this.find(function(value) {
            return value == this;
        }, value);
        if (typeof valueFound === "undefined")
            throw new Error("Value must be one of these: " + JSON.stringify(this));
    },
    editable: function(value) {
        return true;
        // Desactivada comprobación, es incoherente el valor en el catalogo de operaciones.
        /*if (!this)
            throw new Error("This parameter cannot be edited.");*/
    }
};

/**
 * Defines the builder to execute an operation that is into catalog
 */
export default class BaseOperationBuilder {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {!object} config - this is configuration about operation. 
     */
    constructor(ogapi, config) {
        this._ajv = new Ajv({useDefaults: "empty", coerceTypes: true})
        // this._requiredParameters = [];
        /**
         * Util used into BaseOperationBuilder to append entities the three different ways. By filter, By tags, By entityList
         */
        this.appendEntitiesBy = new AppendEntitiesBy(ogapi, this);
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
                retriesDelay: 0
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
    withNotes(notes) {
            if (notes === null) {
                delete this._build.userNotes;
                return this;
            }
            if (typeof notes !== "string")
                throw new Error('Parameter notes must be a string');
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
    withCallback(url) {
        if (url === null) {
            delete this._build.callback;
            delete this._build.notify;
            return this;
        }

        if (typeof url !== "string")
            throw new Error('Parameter url must be a string');
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
    withScatteringMaxSpread(percentage) {
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
        if (typeof this._build.schedule.scattering === "undefined")
            this._build.schedule.scattering = {};
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
    withScatteringStrategy(factor, warningMaxRate) {
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

        if (typeof this._build.schedule.scattering === "undefined")
            this._build.schedule.scattering = {};

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
    executeImmediately() {
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
    executeIDLE() {
        throw new Error("Not implemented yet");
    }

    /**
     * The operation will be created with delayed start or if you not pass any argument then the method return a cron expression builder.
     * @param {!number} minutes
     * @param {boolean} active - If active is false, an operation is created in paused
     * @throws {Error} throw error when minutes is not typeof number
     * @return {BaseOperationBuilder|CronExpressionBuilder} 
     */
    executeLater(minutes, active = true) {
        if (typeof minutes !== "number") {
            throw new Error("Parameter minutes must be typeof number");
        }
        this._build.active = active;
        if (typeof this._build.schedule === "undefined") {
            this._build.schedule = {};
        }
        this._build.schedule.start = {
            delayed: moment.duration(minutes, 'minutes').asMilliseconds()
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
    executeEvery(date, name, end, active = true, description) {
        if (typeof date === "undefined" || date.constructor !== Date) {
            throw new Error("Parameter date must be typeof Date");
        }
        let args = Array.prototype.slice.call(arguments);
        let _name = this._getName(args.slice(1, 3));
        let _end = this._getEnd(args.slice(1, 3));
        this._build.active = active;
        return new ExecuteEveryBuilder(this, date, _name, _end, description);
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
    executeEach(date, name, end, active = true, description) {
        if (typeof date === "undefined" || date.constructor !== Date) {
            throw new Error("Parameter date must be typeof Date");
        }
        let args = Array.prototype.slice.call(arguments);
        let _name = this._getName(args.slice(1, 3));
        let _end = this._getEnd(args.slice(1, 3));
        this._build.active = active;
        return new ExecuteEachBuilder(this, date, _name, _end, description);
    }

    _getName(args) {
        for (let i = 0; i < args.length; i++) {
            if (typeof args[i] === "string") {
                return args[i];
            }
        }
        return this._build.name + " " + this._ogapi.Napi._options.apiKey;
    }

    _getEnd(args) {
        for (let i = 0; i < args.length; i++) {
            if (typeof args[i] === "number" || (args[i] && args[i].constructor === Date)) {
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
    withJobTimeout(minutes) {
        if (minutes === null) {
            delete this._build.schedule.stop;
            return this;
        }
        if (typeof minutes !== "number") {
            throw new Error("Parameter minutes must be a number");
        }
        this._build.schedule.stop = {
            delayed: moment.duration(minutes, 'minutes').asMilliseconds()
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
    withAckTimeout(milliseconds, format = "milliseconds") {
        this._addSpecificParameter(moment.duration(milliseconds, format).asMilliseconds(), ACK_TIMEOUT);
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
    withTimeout(milliseconds, format = "milliseconds") {
        this._addSpecificParameter(moment.duration(milliseconds, format).asMilliseconds(), TIMEOUT);
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
    withRetriesDelay(milliseconds, format = "milliseconds") {
        this._addSpecificParameter(moment.duration(milliseconds, format).asMilliseconds(), RETRIES_DELAY);
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
    withRetries(retriesNumber) {
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
    withParameters(parameters) {
        if (this._config.parameters) {
            this._build.parameters = parameters;
            this._checkMandatoryParameters();
            return this;
        } else {
            throw new Error('This operation does not support parameters')
        }
    }

    withParameter(parameter, value) {
        if (this._config.parameters) { 
            if ( !this._build.parameters) {
                this._build.parameters = {}
            }
            
            this._build.parameters[parameter] = value;
            return this;
        } else {
            throw new Error('This operation does not support parameters')
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
    build() {
        let resource;
        let _build = merge(true, this._build);
        let postObj;
        let errors = [];
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
                errors.push("Must be selected the entity type allowed when filter is the way to append entities. Allowed entity types <'" +
                    JSON.stringify(this._config.applicableTo) + "'>");
            }
        }

        if (typeof this._build.task !== "undefined") {
            let task = this._build.task;
            // CHECK period and job timeout
            let jobTimeout = this._build.schedule.stop;
            if (typeof task.repeating.period !== "undefined") {
                let maxJobTimeout;
                switch (task.repeating.period.unit) {
                    case "DAYS":
                        maxJobTimeout = moment.duration(task.repeating.period.each, 'days').asMilliseconds();
                        break;
                    case "HOURS":
                        maxJobTimeout = moment.duration(task.repeating.period.each, 'hours').asMilliseconds();
                        break;
                    case "MINUTES":
                        maxJobTimeout = moment.duration(task.repeating.period.each, 'minutes').asMilliseconds();
                        break;
                }
                if (typeof jobTimeout !== "undefined" && typeof jobTimeout.delayed === "number") {
                    if (jobTimeout.delayed >= maxJobTimeout) {
                        errors.push("You can not execute an operation with a job timeout greater than the repetition period.");
                    }
                } else {
                    jobTimeout = moment.duration(maxJobTimeout, 'milliseconds').asMinutes() - 1;
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

        let op = new Operation(this._ogapi, resource, postObj);
        // Se deshacen todos los por defectos aplicados al objeto builder, para no condicionar el siguiente .build 
        this._build = _build;
        return op;

    }

    _convertToTask(_build) {
        let task = _build.task;
        this.executeImmediately();
        let jobObj = this._convertToJob(this._build);
        let now = moment(new Date());
        let start = moment(task.start);
        let taskObj = {
            task: {
                active: true,
                name: task.name,
                description: task.description,
                job: jobObj.job,
                schedule: {
                    start: {
                        date: start.format(DATE_FORMAT)
                    },
                    repeating: task.repeating
                }
            }
        };
        if (typeof task.stop !== "undefined") {
            if (typeof task.stop.date !== "undefined") {
                taskObj.task.schedule.stop = {
                    date: moment(task.stop.date).format(DATE_FORMAT)
                };
            } else {
                taskObj.task.schedule.stop = task.stop;
            }
        }
        if (moment.max(now, start) == now) {
            if (typeof task.stop !== "undefined" && typeof task.stop.date !== "undefined") {
                let stopDate = moment(task.stop.date);
                if (moment.max(now, stopDate) == now) {
                    throw new Error("Can not create operation object because stop operation period is earlier than current date. " +
                        "It happened because you passed a lot of time between configuration of an operation and create the operation.");
                }
            }
            //console.log("Start date configured on operation period is later than current date. Start date will be changed to  current date.");
            delete taskObj.task.schedule.start;
        }
        return taskObj;
    }

    _convertToJob(_build) {
        if (_build.operationParameters.ackTimeout === 0) {
            delete _build.operationParameters.ackTimeout;
        }
        return {
            job: {
                request: _build
            }
        };
    }

    _addSpecificParameter(value, paramName) {
        this._build.operationParameters[paramName] = value;
    }

    _checkParam(value, configParam) {
        if (configParam.type === "number") {
            if (typeof value !== "number")
                throw new Error(configParam.name + ": Expected number but found " + typeof value);
        }

        for (let attr in configParam.attributes) {
            if (typeof VALIDATE[attr] === "function") {
                VALIDATE[attr].call(configParam.attributes[attr], value);
            }
        }
    }

    _checkMandatoryParameters() {
        if (this._config.parameters && this._config.parameters.schema) {
            const validate = this._ajv.compile(this._config.parameters.schema)
            const valid = validate(this._build.parameters)
            if(!valid) {
                throw new Error(validate.errors)
            }
        }
    }
}