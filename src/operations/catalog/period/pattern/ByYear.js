import ByGeneric from './ByGeneric';

import { MONTHS_ENUM } from './../MONTHS_ENUM';

export default class ByYear extends ByGeneric {
	/**
	* @param {!BaseOperationBuilder} parent - this is a operationBaseBuilder.
	* @param {!Date} date - Date when operation will be executed
	* @param {string} periodicityName - Name associated to periodicity	
	* @param {!number or Date} end - When periodicity ends. By repetitions or by date		
	*/
	constructor(parent, date, name, end) {
		super(parent, date, name, end);
		let _task = parent._task;
		if (_task) {
			var pattern = _task.schedule.repeating.pattern;
			if (pattern) {
				//console.log("PATTERN: " + JSON.stringify(pattern));
				var yearly = pattern.yearly;
				if (yearly) {
					this._day = yearly.day;
					this._month = yearly.month;
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
			if (this._day) {
				month = this._day;
			} else
				throw new Error("Parameter day must be typeof number");
		}
		if (day > 31 || day < 1) {
			throw new Error("Parameter day must be greater than 1 and less than 31");
		}
		this._day = day;
		if (typeof this._month === "undefined") {
			return this;
		}
		if (this._parent._task) {
			this._build();
			return this;
		}
		return this._build();
	}
	/**
	* At this month will be executed the operation
	* @param {!string} month 
	* @throws {Error} throw error when month is not typeof string
	* @throws {Error} throw error when month is not found into MONTHS_ENUM		
	* @return {BaseOperationBuilder|ByYear}
	*/
	month(month) {
		if (typeof month !== "string") {
			if (this._month) {
				month = this._month;
			} else
				throw new Error("Parameter month must be typeof string");
		}
		let found = MONTHS_ENUM.find(function (month) { return month == this; }, month);
		if (typeof found === "undefined") {
			throw new Error("Any month into parameter months is not allowed. Parameter value <'" + month + "'>, Months allowed <'" + JSON.stringify(MONTHS_ENUM) + "'>")
		}
		this._month = month;
		if (typeof this._day === "undefined") {
			return this;
		}
		if (this._parent._task) {
			this._build();
			return this;
		}
		return this._build();
	}

	_create() {
		let skeleton = super._create();
		skeleton.repeating.pattern.yearly = {
			day: this._day,
			month: this._month
		};
		return skeleton;
	}
}