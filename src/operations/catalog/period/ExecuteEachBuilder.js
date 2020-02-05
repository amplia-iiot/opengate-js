import merge from 'merge';
import moment from 'moment';
/**
 * Defines the builder to configure a period of operation. With this builder you can select how repeat the operation. By days, hours or minutes.
 */
export default class ExecuteEachBuilder {
    /**
     * @param {!BaseOperationBuilder} parent - this is a operationBaseBuilder.
     * @param {!Date} date - Date when operation will be executed
     * @param {string} periodicityName - Name associated to periodicity	
     * @param {!number or Date} end - When periodicity ends. By repetitions or by date	
     */
    constructor(parent, date, periodicityName, end, description) {
        this._parent = parent;
        this._skeleton = {
            start: date,
            stop: end,
            name: periodicityName,
            description: description,
            repeating: {
                period: {
                    each: undefined,
                    unit: undefined
                }
            }
        };
        if (typeof end !== "undefined") {
            let stop;
            if (typeof end === "number") {
                if (end <= 0) {
                    throw new Error("Invalid stop value. Number of repetitions must be greater than 0.");
                }
                stop = {
                    "executions": end
                };
            } else if (end.constructor === Date) {
                let startDate = moment(date);
                let stopDate = moment(end);
                if (moment.max(startDate, stopDate) == startDate) {
                    throw new Error("Invalid stop date on executeEach method. Start date must be earlier than stop date.");
                }
                stop = {
                    "date": end
                };
            }
            this._skeleton.stop = stop;
        }
    }

    /**
     * Set a difference of minutes in each repetition
     * @param {number} minutes
     * @return {BaseOperationBuilder}
     */
    minutes(minutes) {
        const type = "MINUTES";
        if (typeof minutes !== "number") {
            throw new Error("Parameter minutes must be typeof number");
        }
        return this._addPeriod(minutes, type);
    }

    /**
     * Set a difference of hours in each repetition
     * @param {number} hours
     * @return {BaseOperationBuilder}
     */
    hours(hours) {
        const type = "HOURS";
        if (typeof hours !== "number") {
            throw new Error("Parameter hours must be typeof number");
        }
        return this._addPeriod(hours, type);
    }

    /**
     * Set a difference of days in each repetition
     * @param {number} days
     * @return {BaseOperationBuilder}
     */
    days(days) {
        const type = "DAYS";
        if (typeof days !== "number") {
            throw new Error("Parameter days must be typeof number");
        }
        return this._addPeriod(days, type);
    }

    _addPeriod(num, type) {
        let skeleton = merge(true, this._skeleton);
        skeleton.repeating.period.each = num;
        skeleton.repeating.period.unit = type;
        this._parent._build.task = skeleton;
        return this._parent;
    }
}