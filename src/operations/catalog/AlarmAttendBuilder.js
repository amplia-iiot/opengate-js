'use strict';

import AlarmOperationBuilder from './AlarmOperationBuilder';

/**
* Defines the builder to execute alarm attend operation
*/
export default class AlarmAttendBuilder extends AlarmOperationBuilder{
	/**
	* @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
	*/
	constructor(ogapi){
		super(ogapi,"ATTEND");
	}
}