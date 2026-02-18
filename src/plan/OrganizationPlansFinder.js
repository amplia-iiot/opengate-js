'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';
import _ from 'lodash';
import {PLAN, ORGANIZATION_PLANS} from './URL_ENUM'
import { VISIBILITY } from './VISIBILITY_ENUM';

/**
 *   This class allow make get request to organization plans resource into Opengate North API.
 */
export default class OrganizationPlansFinder extends ProvisionGenericFinder {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organizations', undefined, 'Organization plan not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        const _url = this._baseUrl + "/" + this._organization + "/" + ORGANIZATION_PLANS
        if(!_.isNil(this._id)){
            this.default();
            return _url + this._id
        }
        return _url 
    }

    /**
     * Marks visibility assignable for organization plans list retrieval
     *   ogapi.newOrganizationPlansFinder().assignable().findByOrganization('organization').then().catch();
     * @return {this} 
     */
    assignable() {
        this._setUrlParameters({visibility: VISIBILITY.assignable});
        return this
    }


   /**
     * Marks visibility administrable for organization plans list retrieval.
     *   ogapi.newOrganizationPlansFinder().administrable().findByOrganization('organization').then().catch();
     * @return {this} 
     */
    administrable() {
        this._setUrlParameters({visibility: VISIBILITY.administrable});
        return this
    }

    /**
     * Marks visibility default for plans list list retrieval.
     *   ogapi.newOrganizationPlansFinder().default().findByOrganization('organization').then().catch();
     * @return {this} 
     */
    default() {
        this._setUrlParameters({visibility: undefined});
        return this
    }

    /**
     * Retrieves all plans from a organization
     *   ogapi.newOrganizationPlansFinder().findByOrganization('organization').then().catch();
     * @param {string} organization - organization name .
     * @return {Promise} 
     */
    findByOrganization(organization) {
        this._organization = organization;
        this._entity = ORGANIZATION_PLANS
        return this._execute();
    }

    /**
     * Retrieves a specific plan from a organization
     *   ogapi.newOrganizationPlansFinder().findByOrganizationAndId('organization', 'identifier').then().catch();
     * @param {string} organization - organization name .
     * @param {string} identifier - plan name.
     * @return {Promise} 
     */
    findByOrganizationAndId(organization, identifier) {
        this._organization = organization;
        this._withId("/" + identifier)
        this._entity = PLAN
        return this._execute();
    }   
}