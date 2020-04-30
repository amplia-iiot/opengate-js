'use strict';

import AlarmActionBuilder from './AlarmActionBuilder';

/**
* Defines the builder to execute alarm close operation
*/
export default class AlarmCloseBuilder extends AlarmActionBuilder{
	/**
	* @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
	*/	
	constructor(ogapi){
		super(ogapi,"CLOSE");
	}
}