import { LIMIT_START_DEF_VALUE, LIMIT_SIZE_DEF_VALUE } from './SearchBuilder';
import Search from '../Search';


/**
* Defined a search over custom resource and custom filter	
* @example ogapi.rawSearchBuilder().from('myresource').filter({and:[]})
*/
export default class RawSearchBuilder{
	constructor(ogapi){
		this._api = ogapi;
	}

	/**
	* Set custom url
	* @param {string} url - custom Opengate North API url
	* @throws {Error} throw error when url is not typeof string
	* @return RawSearchBuilder
	*/
	from(url){
		if (typeof url !== "string") throw new Error("Url parameter is mandatory and must be a string");
		this._url=url;
		return this;
	}
	
	/**
	* Set raw filter
    * @param {object} rawFilter - raw filter
    * @return RawSearchBuilder
	*/
	filter(rawFilter = {}){
		this._filter = {filter: rawFilter};
		return this;
	}

    /**
     * Set raw limit
     * @param {object} rawLimit - raw limit
     * @return RawSearchBuilder
     */
    limit(rawLimit = {}){
        this._limit = {limit: rawLimit};
        return this;
    }
	
	/**
	* Create Search instance
	* @return Search
	* @throws {Error} throw error when url is not typeof string
	*/
	build(){
		if (typeof this._url !== "string") throw new Error("Url parameter is mandatory and must be a string");
		return new Search(this._api,
			this._url,
			this._filter,
            this._limit,
			{});
	}
}