import { MONTHS_ENUM } from './MONTHS_ENUM';

import ByWeek from './pattern/ByWeek';
import ByYear from './pattern/ByYear';
import ByMonth from './pattern/ByMonth';
import ByGeneric from './pattern/ByGeneric';

/**
 * Defines the builder to configure a period of operation. By this builder you can select period by day, week, month, year.
 */
export default class ExecuteEveryBuilder {
    /**
     * @param {!BaseOperationBuilder} parent - this is a operationBaseBuilder.
     * @param {!Date} date - Date when operation will be executed
     * @param {string} periodicityName - Name associated to periodicity	
     */
    constructor(parent, date, periodicityName, end, description) {
        this.year = new ByYear(parent, date, periodicityName, end, description);
        this.week = new ByWeek(parent, date, periodicityName, end, description);
        this._day = new ByGeneric(parent, date, periodicityName, end, description);
        this._date = date;
        this._end = end;
        this._parent = parent;
        this._periodicityName = periodicityName;
        this._description = description;
    }

    /**
     * Every day at time defined will be the pattern
     * @return {BaseOperationBuilder}
     */
    day() {
        return this._day._build();
    }

    /**
     * Each month at time and day defined will be the pattern
     * @param {array} months - months on will be execute the operation
     * @throws {Error} throw error when months is not typeof Array
     * @throws {Error} throw error when any month is not found into MONTHS_ENUM
     * @return {ByMonth}
     */
    month(months) {
        var _task = this._parent._task;
        if (typeof months === "undefined" || months.constructor !== Array) {
            var error = true;
            if (_task) {
                var pattern = _task.schedule.repeating.pattern;
                if (pattern) {
                    var monthly = pattern.monthly;
                    if (monthly) {
                        error = false;
                        months = monthly.months;
                    }
                }
            }
            if (error)
                throw new Error("Parameter months must be typeof Array");
        }
        if (months.length === 0) {
            throw new Error("Parameter months must have at least one month");
        }
        let not_found = [];
        for (var i = 0; i < months.length; i++) {
            let found = MONTHS_ENUM.find(function(month) { return month == this; }, months[i]);
            if (typeof found === "undefined") {
                not_found.push(found);
            }
        }
        if (not_found.length !== 0) {
            throw new Error("Any month into parameter months is not allowed. Parameter value <'" + JSON.stringify(not_found) + "'>, Months allowed <'" + JSON.stringify(MONTHS_ENUM) + "'>");
        }
        return new ByMonth(this._parent, this._date, this._periodicityName, months, this._end, this._description);
    }
}