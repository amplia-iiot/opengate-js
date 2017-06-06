'use strict';

/**
* Util used into BaseOperationBuilder to append entities the three different ways. By filter, By tags, By entityList
*/
export default class AppendEntitiesBy {
	/**
	* @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
	* @param {!BaseOperationBuilder} parent - this is a instance of BaseOperationBuilder
	*/	
	constructor(ogapi,parent){
		this._ogapi = ogapi;
		this._parent = parent;
	}

	/**
	* Append filter to operation target
	* @param {!FilterBuilder} filter 
	* @param {!string} entityType 
	* @return {BaseOperationBuilder}
	*/
	filter(filter,entityType){
		let entityTypeFound = this._parent._config.applicableTo.find(function(type){return type==this;},entityType);
		if (typeof entityTypeFound === "undefined"){
			throw new Error("Entity type <'"+entityType+"'> not allowed to operation <'"+
				this._parent._config.name+"'>. Entity types allowed <'"+
				JSON.stringify(this._parent._config.applicableTo)+"'>");
		}
		this._parent._entityTypeWhenFilter = entityType;
		if (typeof this._parent._build.target !== "undefined") 
			console.warn("An Operation only allow one kind of way to append entities. "+
			"Filter | Tag | List of entities. Now Filter will remove the last way appended .");			
		if (typeof filter._filterTemplate !== "undefined"){
			this._parent._build.target = {
				filter:filter._filterTemplate.filter
			};
		}else{
			this._parent._build.target = {
				filter:filter
			};
		}
		return this._parent;
	}
	/**
	* Append entity list to operation target
	* @param {!EntityListBuilder} entities 
	* @return {BaseOperationBuilder}
	*/
	list(entities){
		if (typeof entities === "undefined" || entities.constructor !== Array){
			throw new Error("Parameter entities must be typeof Array");
		}
		if (typeof this._parent._build.target !== "undefined") 
			console.warn("An Operation only allow one kind of way to append entities. "+
			"Filter | Tag | List of entities. Now  List of entities will remove the last way appended .");
		this._parent._build.target = {
			append:{
				entities:entities
			}
		};
		return this._parent;
	}
	/**
	* Set tag to operation target
	* @param {!string} tag 
	* @return {BaseOperationBuilder}
	*/
	tag(tag){
		if (typeof this._parent._build.target !== "undefined") 
			console.warn("An Operation only allow one kind of way to append entities. "+
			"Filter | Tag | List of entities. Now Tag will remove the last way appended .");
		this._parent._build.target = {
			append:{
				tags:[tag]
			}
		};
		return this._parent;
	}
}