'use strict';

import BaseParameterBuilderWithParent from './BaseParameterBuilderWithParent';
// import jsf from 'json-schema-faker';

// jsf.option('useDefaultValue', true);
// jsf.option('alwaysFakeOptionals', true);

/**
* This class generates all operation parameters builders by "parameters" attribute that there is into config operation json
*/
export default class ParameterBuilderFactory{
	/**
	* @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
	* @param {!object} parameters - this is configuration about parameter operation.
	* @param {!BaseOperationBuilder} parent - this is a instance of BaseOperationBuilder
	*/
	constructor(ogapi,parameters,parent){
		const _ogapi = ogapi;
		const _parent = parent;

		
		// Ejemplo, name = "profile" => return "newProfileParamBuilder"
		function createBuilderName(name){
			let firstChar = name[0].toUpperCase();
			return "new"+firstChar+name.slice(1)+"ParamBuilder";
		}
	}
}