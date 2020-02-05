import ByGeneric from './ByGeneric';

export default class ByMonth extends ByGeneric {
    /**
     * @param {!BaseOperationBuilder} parent - this is a operationBaseBuilder.
     * @param {!Date} date - Date when operation will be executed
     * @param {string} periodicityName - Name associated to periodicity	
     * @param {!array} months - Months on will be execute the operation	
     * @param {!number or Date} end - When periodicity ends. By repetitions or by date		
     */
    constructor(parent, date, periodicityName, months, end, description) {
        super(parent, date, periodicityName, end, description);
        this._months = months;
        let _task = parent._task;
        if (_task) {
            var pattern = _task.schedule.repeating.pattern;
            if (pattern) {
                var monthly = pattern.monthly;
                if (monthly) {
                    this._day = monthly.day;
                    super._build();
                }
            }
        }
    }

    /**
     * At this day will be executed the operation
     * @param {!number} day 
     * @throws {Error} throw error when day is not typeof number
     * @throws {Error} throw error when day is > 31 and < 1
     * @return {BaseOperationBuilder}
     */
    day(day) {
        if (typeof day !== "number") {
            throw new Error("Parameter day must be typeof number");
        }
        if (day > 31 || day < 1) {
            throw new Error("Parameter day must be greater than 1 and less than 31");
        }
        this._day = day;
        return this._build();
    }
    _create() {
        let skeleton = super._create();
        skeleton.repeating.pattern.monthly = {
            day: this._day,
            months: this._months
        };
        return skeleton;
    }
}