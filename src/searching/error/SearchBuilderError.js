
/**
* This defined a specific Error that it will be thrown on build method at SearchBuilders
*/
export default class SearchBuilderError extends Error{
	/**
	*	@param {!string} error - Error description
	*/
	constructor(error){
		super(error);
	}
}

