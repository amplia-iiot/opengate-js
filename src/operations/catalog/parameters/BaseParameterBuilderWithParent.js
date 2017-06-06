'use strict';

import moment from 'moment'
/**
* This class generate a builder by a dynamic content about specific parameter to an operation.
*/
export default class BaseParameterBuilderWithParent{
	/**
	* @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
	* @param {!object} config - this is configuration about parameter operation.
	* @param {!BaseOperationBuilder} parent - this is a instance of BaseOperationBuilder
	*/
	constructor(ogapi,config,parent){
		this._parent = parent;
		this._build = (config.type === "array") ? [] : undefined;
		this._config = config;		
		this[createSetterNameMethod(config)] = this._appendParameterValue;
		// Ejemplo config.type=array and config.name = apn, return "addApn"
		// Ejemplo config.type=anyString and config.name = apn, return "withApn"
		function createSetterNameMethod(config){	
			let prefixOptions = (function(config){
				let prefix=undefined;
				switch(config.type){
					case 'array':
						prefix = 'add';
						break;
					default:
						prefix = 'with';
						break;
				}
				return prefix;
			})(config);

			return prefixOptions+config.name[0].toUpperCase()+config.name.slice(1);
		}
	}

	_appendParameterValue(value){
		if (!this._isTypeValueAllow(value)){			
			console.warn("Parameter <'"+this._config.name+"'> not allow type of value setted <'"+
				typeof value+"'>. Only are allowed this type: "+this._getType());	
			return this;
		}
		if (! this._isAllowValue(value)){
			console.warn("Parameter <'"+this._config.name+"'> not allow value setted <'"+
				value+"'>. Only are allowed this configuration:"+JSON.stringify(this._config.attributes));			
			return this;
		}
		if (this._config.type === "array"){
			this._build.push(value);
		}else{
			this._build = value;
		}		
		return this;
	}

	_isString(){
		return  (this._config.type === "string" || this._config.subtype === "string");
	}
	_isObject(){
		return (this._config.type === "object" || this._config.subtype === "object");
	}
	_isNumber(){
		return (this._config.type === "number" || this._config.subtype === "number");
	}
	_isArray(){
		return (this._config.type === "array" || this._config.subtype === "array");
	}
	_isBoolean(){
		return (this._config.type === "boolean" || this._config.subtype === "boolean");
	}	
	_isDate(){
		return (this._config.type === "date" || this._config.subtype === "date");
	}
	_isTime(){
		return (this._config.type === "time" || this._config.subtype === "time");	
	}

	_getType(){		
		if (this._isArray()){
			return "array";
		}
		if (this._isString() || this._isDate() || this._isTime()){
			return "string";
		}
		if (this._isObject()){
			return "object";
		}
		if (this._isNumber()){
			return "number";
		}		
		if (this._isBoolean()){
			return "boolean";
		}
		return "unknown";
	}

	_isTypeValueAllow(value){
		let isAllowed = true;
		let type = typeof value;
		if ((this._isString() || this._isTime() || this._isDate())  && type !== "string"){
			isAllowed = false;
		}
		if (this._isNumber() && type !== "number"){
			isAllowed = false;
		}
		if (this._isObject() && type !== "object"){
			isAllowed = false;
		}		
		if (this._isBoolean() && type !== "boolean"){
			isAllowed = false;
		}		
		return isAllowed;
	}

	_isAllowValue(value){
		if (typeof this._config.attributes !== "undefined"){
			let attrs = this._config.attributes;
			if (typeof attrs.list !== "undefined"){
				return typeof attrs.list.find(function(item){ return item == this;},value) !== "undefined";
			}
			/*if (typeof attrs.validator !== "undefined"){
				let format = attrs.validator;
				let isValid = moment(value,format,true).format()
				if (isValid === "Invalid date"){
					return false;
				}
			}*/
		}
		return true;
	}

	/**
	* This has all knowledge to make a object.
	* @return {object}
	*/
	build(){
		if (this._config.required && (typeof this._build === "undefined" || this._build.length === 0)) 
			throw new Error("Parameter <'"+this._config.name+"'> is required and their value is not defined");
		let parameter = {
				name: this._config.name,
				value:{
					[this._getType()]:this._build
				}
			};
		if (typeof this._build === "undefined" || this._build.length === 0){		
			parameter = undefined;
		}
		return parameter;
	}

	/**
	* This method will invoke build and then it will append the parameter to operationBuilder with the correct way
	* @return {BaseOperationBuilder}
	*/
	buildAndAppend(){		
		let paramObject = this.build();
		if (typeof paramObject !== "undefined"){
			let index = this._parent._build.parameters.findIndex(function(param){
				return param.name == this.name;
			},paramObject);
			if (index === -1){
				this._parent._build.parameters.push(paramObject);
			}else{
				this._parent._build.parameters[index] = paramObject;
			}			
		}
		return this._parent;
	}
}