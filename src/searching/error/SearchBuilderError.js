
/**
* This defines a specific error that is thrown by the build method of the search builders.
*/
export default class SearchBuilderError extends Error{
	/**
	*	@param {!string} error - Error description
	*/
	constructor(error){
		super(error);
	}
}

