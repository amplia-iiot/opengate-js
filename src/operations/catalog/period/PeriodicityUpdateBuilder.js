'use strict';

import merge from 'merge'
import moment from 'moment';

import Operation from '../Operation'
import ExecuteEvery from './ExecuteEveryBuilder';
import ExecuteEach from './ExecuteEachBuilder';
import ByGeneric from './pattern/ByGeneric'

import { TIME_FORMAT, DATE_FORMAT } from './../../../util/DATE_FORMAT';

export default class PeriodicityUpdateBuilder {

    constructor(ogapi, taskId, taskObj) {
        this._ogapi = ogapi;
        this._task = taskObj;
        this.task_id = taskId;
        this._resource = "/tasks/" + this.task_id;
        this._build = merge(true, this._task.job.request);
    }

    /**
     * The operation will execute with a period that you must define with ExecuteEveryBuilder 
     * @param {!Date} date - Date when operation will be executed
     * @param {number or Date} end - When periodicity ends. By repetitions or by date
     * @throws {Error} throw error when date is not typeof Date
     * @return {ExecuteEvery}
     */
    executeEvery(date, end) {
        let args = Array.prototype.slice.call(arguments);
        let _end = this._getEnd(args.slice(1, 3));
        date = this._getStart(date);
        this._byGeneric = new ByGeneric(this, date, null, end)._build();
        return new ExecuteEvery(this, date, null, _end);
    }

    /**
     * The operation will execute with a period that you must define with ExecuteEachBuilder 
     * @param {!Date} date - Date when operation will be executed
     * @param {number or Date} end - When periodicity ends. By repetitions or by date 
     * @throws {Error} throw error when date is not typeof Date
     * @return {ExecuteEach}
     */
    executeEach(date, end) {
        let args = Array.prototype.slice.call(arguments);
        let _end = this._getEnd(args.slice(1, 3));
        let schedule = this._task.schedule;
        date = this._getStart(date);
        if (schedule && schedule.repeating && schedule.repeating.period) {
            return new ExecuteEach(this, date, null, _end)._addPeriod(period.each, period.unit);
        }
        return new ExecuteEach(this, date, null, _end);
    }

    _getStart(date) {
        let schedule = this._task.schedule;
        if (!date && (schedule.start && schedule.start.date)) {
            //console.log("DATE: " + date);
            date = new Date(schedule.start.date);
        }
        return date;
    }

    _getEnd(args) {
        for (let i = 0; i < args.length; i++) {
            if (typeof args[i] === "number" || args[i].constructor === Date) {
                return args[i];
            }
        }
        let schedule = this._task.schedule;
        if (schedule.stop && schedule.stop.date) {
            return new Date(schedule.stop.date);
        }
        return undefined;
    }

    build() {
        let _build = merge(true, this._build);
        //console.log("_BUILD: " + JSON.stringify(_build));
        let postObj = undefined;
        let errors = [];
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
                }
            }
        }

        if (errors.length > 0) {
            this._build = _build;
            throw errors;
        }
        //console.log("T_B_T: " + JSON.stringify(this._build.task));
        if (typeof this._build.task !== "undefined") {
            postObj = this._updateTask(this._build);
        }
        //console.log("POSTOBJ: " + JSON.stringify(postObj));
        //console.log("UP_RESOURCE: " + this._resource);
        let op = new Operation(this._ogapi, this._resource, postObj);
        // Se deshacen todos los por defectos aplicados al objeto builder, para no condicionar el siguiente .build 
        this._build = _build;
        return op;
    }

    _updateTask(_build) {
        let task = _build.task;
        let now = moment(new Date);
        let start = moment(task.start);
        //console.log("TASK: " + JSON.stringify(_build.task));
        //console.log("NOW: " + now);

        let taskObj = {
            task: {
                schedule: {}
            }
        };
        try {
            if (task.start) {
                taskObj.task.schedule["start"] = { "date": start.format(DATE_FORMAT) };
            }

            if (task.stop) {
                taskObj.task.schedule["stop"] = { "date": moment(task.stop).format(DATE_FORMAT) };
            }

            if (task.repeating) {
                taskObj.task.schedule["repeating"] = task.repeating;
            }
        } catch (err) {
            //console.log("TASK_OBJ_ERROR: " + err);
        }
        delete taskObj.task.schedule.name;
        //console.log("TASK_OBJ: " + JSON.stringify(taskObj));
        if (typeof task.stop !== "undefined") {
            if (typeof task.stop.date !== "undefined") {
                taskObj.task.schedule.stop = {
                    date: moment(task.stop.date).format(DATE_FORMAT)
                }
            } else {
                taskObj.task.schedule.stop = task.stop;
            }
        }
        //console.log("TASK_OBJ_1: " + JSON.stringify(taskObj));
        if (moment.max(now, start) == now) {
            //console.log("DELETE START???");
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
        //console.log("TASK_OBJ_2: " + JSON.stringify(taskObj));
        return taskObj;
    }
}