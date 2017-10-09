'use strict';

import q from 'q';
import merge from 'merge'

const LIMIT_SIZE_DEF_VALUE = 1000;

/** 
 * This is a abstract class, it must be extended to another class that defined the specific search.
 * This class is responsible to manage execute request to OpenGate North API
 */
export default class BaseSearch {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} resource - this is a base url resource
     * @param {!number} [timeout] - timeout on request
     */
    constructor(ogapi, resource, timeout) {
        if (this.constructor === BaseSearch) {
            throw new Error("Cannot construct Abstract instances directly");
        }
        if (typeof this._filter !== "function") {
            throw new Error("Must override method: filter");
        }
        if (typeof timeout !== 'number') {
            this._timeout = ogapi.Napi._options.timeout;
        } else {
            this._timeout = timeout;
        }
        this._ogapi = ogapi;
        this._resource = 'search' + resource;
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     */
    execute() {
        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi
            .post(this._resource, this._filter(), this._timeout)
            .then((response) => {
                let resultQuery = response.body;
                let statusCode = response.statusCode;
                if (typeof resultQuery === "undefined")
                    defered.reject("Data not found");
                else {
                    if (typeof this._appendData === "function" && statusCode === 200)
                        this._appendData(resultQuery);
                    defered.resolve({ data: resultQuery, statusCode: statusCode });
                }
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }

    //Se debera fijar simpre un objeto limit en la paginacion asincrona
    //Si no existiera el objeto limit se creara uno por defecto
    //Si tuviera se modficara para que siempre comience en la primera pagina
    _asyncPagingFilter() {
        var filter = this._filter();

        if (!filter.limit || !filter.limit.size) {
            filter.limit = { size: LIMIT_SIZE_DEF_VALUE, start: 1 }
        } else {
            filter.limit.start = 1;
        }
        return filter;
    }

    cancelAsyncPaging(message) {
        if (typeof message === 'string' && message.length > 0) {
            this.cancel = message;
        } else
            this.cancel = true;
    }

    _loadData(resource) {
        let _this = this;
        let defered = q.defer();
        let filter = _this._asyncPagingFilter();
        let paging = false;
        //Funcion que realizara la llamada al search paginado y, de forma recursiva, llamara a todas las paginas
        function loadAll() {
            console.log(JSON.stringify(filter));
            if (_this.cancel || typeof _this.cancel === 'string') {
                var message = typeof _this.cancel === 'string' ? _this.cancel : 'Cancel process';
                defered.reject({ data: message, statusCode: 403 });
            } else {
                _this._ogapi.Napi
                    .post(_this._resource, filter, _this._timeout)
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

                        if (statusCode === 200 || statusCode === 200) {
                            paging = true;
                            if (typeof _this._appendData === "function")
                                _this._appendData(body);
                            let result = body.data ? body.data[resource] : body[resource];
                            defered.notify(result);
                            //Se permite devolver un boolean o un string que reemplazará el mensaje por defecto
                            if (result.length === filter.limit.size) {
                                filter.limit.start += 1;
                                loadAll();
                            } else {
                                defered.resolve({ data: 'DONE', statusCode: 200 });
                            }
                        } else {
                            if (paging) {
                                defered.resolve({ data: 'DONE', statusCode: 200 });
                            } else
                                defered.reject({ data: body, statusCode: statusCode })
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

    /**
     * This invokes a request for asynchronous paging to the OpenGate North API and the return of the pages is managed by promises and its notify object
     * To cancel the process in the notify method return false or string with custom message for response
     * In case of canceling the process, the response will be 403: Forbidden -> {data: 'Cancel process'|| custom_message, statusCode: 403}
     * @param {string} resource - resource to find.
     * @return {Promise}
     * @property {function (), null, function ()} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     */
    executeWithAsyncPaging(resource) {
        let defered = q.defer();
        let promise = defered.promise;
        //Comenzamos con la carga asincrona
        this._loadData(resource)
            .then(
                (response) => {
                    defered.resolve(response);
                }, null,
                (notify) => {
                    defered.notify(notify);
                })
            .catch((error) => {
                defered.reject(error);
            });


        return promise;
    }
}