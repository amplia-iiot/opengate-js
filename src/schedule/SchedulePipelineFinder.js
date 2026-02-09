'use strict';

import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to planner resource into Opengate North API.
 */
export default class ScheduleHistoryFinder extends GenericFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organization', 'list', 'Schedule not found', 'scheduler');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._organization + "/history";
    }

    /**
    * Download a complete list of scheduler history for the organization. This execute a GET http method
    * @test
    *   ogapi.newScheduleHistoryFinder().findByOrganization(organization).then().catch();
    * @return {Promise} 
    */
    findByOrganization(organization) {
        this._organization = organization;
        return this._execute();
    }

    /**
     * Download a complete list of scheduler history for the organization. This execute a GET http method
     * @test
     *   ogapi.newScheduleHistoryFinder().findByOrganization(organization).then().catch();
     * @return {Promise} 
     */
    findByOrganizationAndType(organization, type) {
        this._organization = organization;

        let defered = q.defer();
        let promise = defered.promise;
        let _error_not_found = this._error_not_found;
        this._api.get(this._composeUrl(), undefined, this._getExtraHeaders(), this._getUrlParameters(), true)
            .then((req) => {
                if (req.statusCode === 204) {
                    defered.reject({
                        data: _error_not_found,
                        statusCode: HttpStatus.NOT_FOUND
                    });
                } else {
                    let finalData = req.body.filter((historyTmp) => historyTmp.type === type)

                    if (finalData.length) {
                        defered.resolve({
                            data: finalData,
                            statusCode: req.statusCode
                        });
                    } else {
                        defered.reject({
                            data: _error_not_found,
                            statusCode: HttpStatus.NOT_FOUND
                        });
                    }
                }
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }
}