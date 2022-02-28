'use strict';

import BaseSearch from './BaseSearch';
import merge from 'merge';
import q from 'q';


/** 
 * This extends BaseSearch and allow make request to any available resource into Opengate North API.
 * The resource does not have the 'search' prefix. For this, use class Search
 */
export default class WPSearch extends BaseSearch {
	/**
    * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
    * @param {!string} url - this define a specific resource to make the search
    * @param {object} filter - this is the filter
    * @param {object} limit - this is the pagination about the search
    * @param {object} sort - this defined parameters to order the result of search
	* @param {object} group
	* @param {object} select
   	* @param {nubmer} timeout
    */
	constructor(ogapi, url, filter, limit = { limit: {} }, sort, group, select, timeout, urlParams) {
		super(ogapi, url, timeout);
		this._setUrlParameters(urlParams);
		this._postObj = merge(filter, limit, group, select);
		if (typeof sort === 'object') {
			this._postObj = merge(this._postObj, sort);
		}
	}

	_filter() {
		return this._postObj;
	}

	_loadData(resource) {
        let _this = this;
        let defered = q.defer();
        let filter = _this._asyncPagingFilter();
        let paging = false;
        //Funcion que realizara la llamada al search paginado y, de forma recursiva, llamara a todas las paginas
        function loadAll() {
            if (_this.cancel || typeof _this.cancel === 'string') {
                var message = typeof _this.cancel === 'string' ? _this.cancel : 'Cancel process';
                defered.reject({
                    data: message,
                    statusCode: 403
                });
            } else {
                _this._ogapi.Napi
                    .post(_this._resource, filter, _this._timeout, _this._getExtraHeaders(), _this._getUrlParameters())
                    .then((response) => {
                        let statusCode = response.statusCode;
                        let body = response.body;
                        if (!body && response.text) {
                            try {
                                let parsedResult = JSON.parse(response.text);

                                if (parsedResult) {
                                    body = parsedResult;
                                }
                            } catch (ignoreError) {
                                console.error("Impossible to parse text from response");
                            }
                        }

                        if (statusCode === 200) {
                            paging = true;
                            defered.notify(body);
                            //Se permite devolver un boolean o un string que reemplazará el mensaje por defecto
                            if (body.data.length === filter.limit.size) {
                                filter.limit.start += 1;
                                loadAll();
                            } else {
                                defered.resolve({
                                    data: 'DONE',
                                    statusCode: 200
                                });
                            }
                        } else {
                            if (paging) {
                                defered.resolve({
                                    data: 'DONE',
                                    statusCode: 200
                                });
                            } else
                                defered.reject({
                                    data: body,
                                    statusCode: statusCode
                                });
                        }
                    })
                    .catch((error) => {
                        defered.reject(error);
                    });
            }
        }
        loadAll();
        return defered.promise;
    }

}