'use strict';

import BaseProvision from '../provision/BaseProvision';
import {ORGANIZATION_PLANS} from './URL_ENUM'
import { PERIOD } from './PERIOD_ENUM';
import { UNIT } from './UNIT_ENUM';
import checkType from '../util/formats/check_types'
import _ from 'lodash';

/**
 * This is a base object that contains all you can do about Organizations plan.
 */
export default class OrganizationPlans extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, organization) {
        super(ogapi, "/organizations", undefined, ['name', 'maxStorageLifeTime', 'maxDeviceAmount']);
        checkType._checkStringAndLength(organization, 50, 'organization');
        this._organization = organization;
        this._resource = this._resource + '/' + this._organization + "/" + ORGANIZATION_PLANS;
    }

    /**
     * Set the identifier attribute
     * @param {string} identifier - required field
     * @return {OrganizationPlans}
     */
    withIdentifier(identifier) {
        checkType._checkStringAndLength(identifier, 50, 'identifier')
        this._identifier = identifier;
        return this;
    }
    
    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {OrganizationPlans}
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

    /**
     * Set the maxDeviceAmount attribute
     * @param {object} maxDeviceAmount - optional and greater than 0
     * @return {OrganizationPlans}
     */
    withMaxDeviceAmount(maxDeviceAmount) {
        this._checkMaxDeviceAmount(maxDeviceAmount);
        this._maxDeviceAmount = maxDeviceAmount;
        return this;
    }

    /**
     * Set the maxStorageLifeTime attribute
     * @param {object} maxStorageLifeTime - required field: {total: number, period: [SECONDS, MINUTES, HOURS, DAYS, MONTHS, YEARS]}
     * @return {OrganizationPlans}
     */
    withMaxStorageLifeTime(maxStorageLifeTime) {
        this._checkMaxStorageLifeTime(maxStorageLifeTime);
        this._maxStorageLifeTime = maxStorageLifeTime;
        return this;
    }

    _checkName(name){
        checkType._checkStringAndLength(name, 50, 'name');
    }

    _checkFlowRate(flowRate){
        if(!_.isNil(flowRate)){
            checkType._checkObject(flowRate, 'flowRate');
            checkType._checkNumber(flowRate.value, 'flowRate.value');
            checkType._checkType(flowRate.unit, UNIT);
        }
    }

    _checkMaxDeviceAmount(maxDeviceAmount){
        checkType._checkNumber(maxDeviceAmount, 'maxDeviceAmount');
        if(maxDeviceAmount < 0){
            throw new Error("Parameter maxDeviceAmount must be greater or equal than 0");
        }
    }

    _checkMaxStorageLifeTime(maxStorageLifeTime){
        checkType._checkObject(maxStorageLifeTime, 'maxStorageLifeTime');
        checkType._checkNumber(maxStorageLifeTime.total, 'maxStorageLifeTime.total');
        if(maxStorageLifeTime.total < 0){
            throw new Error("Parameter maxStorageLifeTime.total must be greater or equal than 0");
        }
        checkType._checkType(maxStorageLifeTime.period, PERIOD);
    }
    
    _composeElement() {
        this._checkRequiredParameters()
        this._checkName(this._name);
        this._checkFlowRate(this._flowRate);
        this._checkMaxDeviceAmount(this._maxDeviceAmount);
        this._checkMaxStorageLifeTime(this._maxStorageLifeTime);
        var updateData = {
            name: this._name,
            flowRate: (!_.isNil(this._flowRate) && this._flowRate) || undefined,
            maxDeviceAmount: this._maxDeviceAmount,
            maxStorageLifeTime: this._maxStorageLifeTime
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