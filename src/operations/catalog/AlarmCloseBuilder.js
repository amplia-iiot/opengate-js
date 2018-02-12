'use strict';

import AlarmOperationBuilder from './AlarmOperationBuilder';

/**
* Defines the builder to execute alarm close operation
*/
export default class AlarmCloseBuilder extends AlarmOperationBuilder{
	/**
	* @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
	*/	
	constructor(ogapi){
		super(ogapi,"CLOSE");
	}
}