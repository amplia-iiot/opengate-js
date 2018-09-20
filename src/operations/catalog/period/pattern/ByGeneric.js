import moment from 'moment';
import merge from 'merge';
import { TIME_FORMAT } from './../../../../util/DATE_FORMAT';

/* Generic class that will be extends on ByYear, ByWeek, ByMonth*/
export default class ByGeneric {
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
                pattern: {
                    time: moment(date).format(TIME_FORMAT)
                }
            }
        };
        if (typeof end !== "undefined") {
            let stop;
            if (typeof end === "number") {
                stop = {
                    "executions": end
                };
            } else if (end.constructor === Date) {
                let startDate = moment(date);
                let stopDate = moment(end);
                if (moment.max(startDate, stopDate) == startDate) {
                    throw new Error("Invalid stop date on executeEvery method. Start date must be earlier than stop date.");
                }
                stop = {
                    "date": end
                };
            }
            this._skeleton.stop = stop;
        }
    }

    _create() {
        return merge(true, this._skeleton);
    }

    _build() {
        this._parent._build.task = this._create();
        return this._parent;
    }
}