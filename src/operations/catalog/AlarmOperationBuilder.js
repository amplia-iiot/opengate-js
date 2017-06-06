'use strict';

import Operation from './Operation';

/**
* Defines the builder to execute alarm operations
*/
export default class AlarmOperationBuilder{
	/**
	* @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
	* @param {!string} action - This action can be ATTEND or CLOSE
	*/	
	constructor(ogapi,action){
		this._ogapi = ogapi;
		this._action = action;
		this._resource = '/alarms';
		this._build = {
			alarms:[],
			notes:undefined,
			action: action
		};
		if (this.constructor === AlarmOperationBuilder) {
			throw new Error("Cannot construct Abstract instances directly");
		}
	}

	/**
	* Add alarmId to operation
	* @example
	*	ogapi.operations.builderFactory.newAlarmCloseBuilder().addAlarmId("")
	* @param {!string} alarmId - AlarmId of Alarm
	* @throws {Error} throw error when alarmId is not typeof string
	* @return {AlarmOperationBuilder}
	*/
	addAlarmId(alarmId){
		if (typeof alarmId !== 'string') 
			throw new Error('Parameter alarmId must be a string');
		this._build.alarms.push(alarmId);
		return this;
	}

	/**
	* Add notes to operation
	* @example
	*	ogapi.operations.builderFactory.newAlarmCloseBuilder().withNotes("")
	* @param {!string} notes - Notes about operation
	* @throws {Error} throw error when notes is not typeof string
	* @return {AlarmOperationBuilder}
	*/
	withNotes(notes){
		if (typeof notes !== 'string') 
			throw new Error('Parameter notes must be a string');
		this._build.notes = notes;
		return this;
	}

	/**
	* Build a instance of Operation 
	*
	* @example
	*	ogapi.operations.builderFactory.newAlarmCloseBuilder().build()
	* @throws {Error} Throw error if there is not alarmId
	* @return {Operation} 
	*/
	build(){
		if (this._build.alarms.length === 0){
			throw new Error('Builder error. You must append at least one alarmId with addAlarmId method');
		}
		if (typeof this._build.notes !== 'string'){
			delete this._build.notes;
		}
		return new Operation(this._ogapi, this._resource, this._build);
	}

}