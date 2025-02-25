'use strict';

import BaseProvision from '../provision/BaseProvision';
import {DEVICE_PLANS} from './URL_ENUM'
import { UNIT } from './UNIT_ENUM';
import checkType from '../util/formats/check_types'
import _ from 'lodash';

/**
 * This is a base object that contains all you can do about Device plans.
 */
export default class DevicePlans extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, organization) {
        super(ogapi, "/organizations", undefined, ['name', 'flowRate']);
        checkType._checkStringAndLength(organization, 50, 'organization');
        this._organization = organization;
        this._resource = this._resource + '/' + this._organization + "/" + DEVICE_PLANS;
    }

    /**
     * Set the identifier attribute
     * @param {string} identifier - required field
     * @return {DevicePlans}
     */
    withIdentifier(identifier) {
        checkType._checkStringAndLength(identifier, 50, 'identifier')
        this._identifier = identifier;
        return this;
    }
    
    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {DevicePlans}
     */
    withName(name) {
        this._checkName(name);
        this._name = name;
        return this;
    }

    /**
     * Set the flowRate attribute
     * @param {object} flowRate - {value: number, unit: [SECONDS, MINUTES, HOURS, DAYS, MONTHS, YEARS]} 
     * @return {OrganizationPlans}
     */
    withFlowRate(flowRate) {
        this._checkFlowRate(flowRate);
        this._flowRate = flowRate;
        return this;
    }

    _checkName(name){
        checkType._checkStringAndLength(name, 50, 'name');
    }
    
    _checkFlowRate(flowRate){
        checkType._checkObject(flowRate, 'flowRate');
        checkType._checkNumber(flowRate.value, 'flowRate.value');
        checkType._checkType(flowRate.unit, UNIT);
    }

    _composeElement() {
        this._checkRequiredParameters()
        this._checkName(this._name);
        this._checkFlowRate(this._flowRate);
        var updateData = {
            name: this._name,
            flowRate: this._flowRate
        };
        return updateData;
    }

    _composeUpdateElement() {
        return this._composeElement();
    }

    _buildURL() {
        return this._resource + "/" + this._identifier;
    }
    
}