'use strict';

export default class Expression{

/**
 * @example
 * Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25")
 *
 *
 *returns:
 *
 *	{
 *	  eq : {
 *	    "entityId": "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"
 *	  }
 *	}
 * @return {object} This returns a json with the query of the operator "eq" built.
 * @param {String} key - This is the name of the field
 * @param {String} value - This is the value of the field
 */
	static eq(key, value){
		return {eq : {[key] : value}}
	}

/**
 * @example
 * Ex.neq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25")
 *
 *
 *returns:
 *
 *	{
 *	  neq : {
 *	    "entityId": "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"
 *	  }
 *	}
 * @return {object} This returns a json with the query of the operator "neq" built.
 * @param {String} key - This is the name of the field
 * @param {String} value - This is the value of the field
*/
	static neq(key, value){
		return {neq : {[key] : value}}
	}

/**
 * @example
 * Ex.like("collected.serialNumber", "SN")
 *
 *
 *returns:
 *
 *	{
 *	  like : {
 *	    "collected.serialNumber": "SN"
 *	  }
 *	}
 * @return {object} This returns a json with the query of the operator "like" built.
 * @param {String} key - This is the name of the field
 * @param {String} value - This is the value of the field
 */
	static like(key, value){
		return {like : {[key] : value}}
	}
	
/**
 * @example
 * Ex.gt("collected.imei", "123456786543210")
 *
 *
 *returns:
 *
 *	{
 *	  gt : {
 *	    "collected.imei": "123456786543210"
 *	  }
 *	}
 * @return {object} This returns a json with the query of the operator "gt" built.
 * @param {String} key - This is the name of the field
 * @param {String} value - This is the value of the field
 */
	static gt(key, value){
		return {gt : {[key] : value}}
	}

/**
 * @example
 * Ex.lt("collected.imei", "123456786543210")
 *
 *
 *returns:
 *
 *	{
 *	  lt : {
 *	    "collected.imei": "123456786543210"
 *	  }
 *	}
 * @return {object} This returns a json with the query of the operator "lt" built.
 * @param {String} key - This is the name of the field
 * @param {String} value - This is the value of the field
 */	
	static lt(key, value){
		return {lt : {[key] : value}}
	}

/**
 * @example
 * Ex.gte("collected.imei", "123456786543210")
 *
 *
 *	{
 *	  gte : {
 *	    "collected.imei": "123456786543210"
 *	  }
 *	}
 * @return {object} This returns a json with the query of the operator "gte" built.
 * @param {String} key - This is the name of the field
 * @param {String} value - This is the value of the field
 */	
	static gte(key, value){
		return {gte : {[key] : value}}
	}

/**
 * @example
 * Ex.lte("collected.imei", "123456786543210")
 *
 *
 *	{
 *	  lte : {
 *	    "collected.imei": "123456786543210"
 *	  }
 *	}
 * @return {object} This returns a json with the query of the operator "lte" built.
 * @param {String} key - This is the name of the field
 * @param {String} value - This is the value of the field
 */	
	static lte(key, value){
		return {lte : {[key] : value}}
	}

/**
 * @example
 * Ex.in("entityId", ["e64ccd08-e302-4b65-b19d-e38eeb7b2d24","e64ccd08-e302-4b65-b19d-e38eeb7b2d25"])
 *
 *
 *	{
 *	  in : {
 *	    "entityId": ["e64ccd08-e302-4b65-b19d-e38eeb7b2d24","e64ccd08-e302-4b65-b19d-e38eeb7b2d25"]
 *	  }
 *	}
 * @return {object} This returns a json with the query of the operator "in" built.
 * @param {String} key - This is the name of the field
 * @param {String} value - This is the value of the field
 */	
	static in(key, value){
		return {in : {[key] : value}}
	}

/**
 * @example
 * Ex.or(Ex.like("collected.serialNumber", "SN"), Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"))
 *
 * 
 *returns:
 *
 *	{
 *	  or : [
 *	    {
 *	      like: {
 *	        "collected.serialNumber": "SN"
 *	      }
 *	    },  
 *	    {
 *	      eq: {
 *	        "entityId": "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"
 *	      }
 *	    }
 *	  ]
 *	}
 * @return {object} This returns a json with the query of the logical operator "or" built.
 */
	static or(...args){
		var filter = { or : []}
		for (var i = 0; i < args.length; i++)
			filter.or.push(args[i])
		return filter;
	}

/**
 * @example
 * Ex.and(Ex.like("collected.serialNumber", "SN"), Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"))
 *
 *
 *returns:
 *
 *	{
 *	  and : [
 *	    {
 *	      like: {
 *	        "collected.serialNumber": "SN"
 *	      }
 *	    },  
 *	    {
 *	      eq: {
 *	        "entityId": "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"
 *	      }
 *	    }
 *	  ]
 *	}
 * @return {object} This returns a json with the query of the logical operator "and" built.
 */
	static and(...args){
		var filter = { and : []}
		for (var i = 0; i < args.length; i++)
			filter.and.push(args[i])
		return filter;
	}

}