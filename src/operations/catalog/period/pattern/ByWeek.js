import ByGeneric from './ByGeneric';

import { DAYS_ENUM } from './../DAYS_ENUM';

export default class ByWeek extends ByGeneric {
    /**
     * @param {!BaseOperationBuilder} parent - this is a operationBaseBuilder.
     * @param {!Date} date - Date when operation will be executed
     * @param {string} periodicityName - Name associated to periodicity	
     * @param {!number or Date} end - When periodicity ends. By repetitions or by date		
     */
    constructor(parent, date, name, end, description) {
        super(parent, date, name, end, description);
    }

    /**
     * At this days will be executed the operation
     * @param {!array} days 
     * @throws {Error} throw error when days is not typeof Array
     * @throws {Error} throw error when any day is not found into DAYS_ENUM	
     * @return {BaseOperationBuilder}
     */
    days(days) {
        if (typeof days === "undefined" || days.constructor !== Array) {
            throw new Error("Parameter days must be typeof Array");
        }
        if (days.length === 0) {
            throw new Error("Parameter days must have at least one day");
        }
        let not_found = [];
        for (var i = 0; i < days.length; i++) {
            let found = DAYS_ENUM.find(function(day) { return day == this; }, days[i]);
            if (typeof found === "undefined") {
                not_found.push(found);
            }
        }
        if (not_found.length !== 0) {
            throw new Error("Any day into parameter days is not allowed. Parameter value <'" + JSON.stringify(days) + "'>, Months allowed <'" + JSON.stringify(DAYS_ENUM) + "'>");
        }
        this._days = days;
        return this._build();
    }

    _create() {
        let skeleton = super._create();
        skeleton.repeating.pattern.weekly = {
            days: this._days
        };
        return skeleton;
    }
}