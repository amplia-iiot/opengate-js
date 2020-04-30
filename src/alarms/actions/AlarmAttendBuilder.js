'use strict';

import AlarmActionBuilder from './AlarmActionBuilder';

/**
* Defines the builder to execute alarm attend operation
*/
export default class AlarmAttendBuilder extends AlarmActionBuilder{
	/**
	* @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
	*/
	constructor(ogapi){
		super(ogapi,"ATTEND");
	}
}