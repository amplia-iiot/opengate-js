'use strict';
import {
    ANTENNA_STATUS_ENUM
} from './enum/ANTENNA_STATUS_ENUM';

import Hardware from './Hardware';
import Software from './Software';
import Mobile from './Mobile';
import Subscriber from './Subscriber';
import Subscription from './Subscription';

/**
 * This is a base object that allows the user to create a CommsModule.
 */
export default class CommsModuleMessage {

    constructor(ogapi) {
        this._ogapi = ogapi;
        this._id = undefined;
        this._name = undefined;
        this._type = undefined;
        this._hardware = undefined;
        this._operationalStatus = undefined;
        this._antennaStatus = undefined;
        this._softwareList = [];
        this._mobile = undefined;
        this._subscriber = undefined;
        this._subscription = undefined;

    }

    /**
     * Set the id attribute
     * @param {string} id - optional field
     * @return {CommsModule}
     */
    withId(id) {
        if (typeof id !== 'string')
            throw new Error({ message: 'OGAPI_STRING_PARAMETER', parameter: 'id' });
        this._id = id;
        return this;
    }


    /**
     * Set the name attribute
     * @param {string} name - optional field
     * @return {CommsModule}
     */
    withName(name) {
        if (typeof name !== 'string')
            throw new Error({ message: 'OGAPI_STRING_PARAMETER', parameter: 'name' });
        this._name = name;
        return this;
    }

    /**
     * Set the type attribute
     * @param {string} type - optional field
     * @return {CommsModule}
     */
    withType(type) {
        if (typeof type !== 'string')
            throw new Error({ message: 'OGAPI_STRING_PARAMETER', parameter: 'type' });
        this._type = type;
        return this;
    }

    /**
     * Set the hardware attribute
     * @param {Hardware} hardware - optionals field
     * @return {CommsModule}
     */
    withHardware(hardware) {
        if (!(hardware instanceof Hardware)) {
            throw new Error('Parameter hardware must be hardware type');
        }
        this._hardware = hardware;
        return this;
    }

    /**
     * Set the operationalStatus attribute
     * @param {string} operationalStatus 
     * @return {CommsModule}
     */
    withOperationalStatus(operationalStatus) {

        let operationalStatusBuilder = this._ogapi.operationalStatusSearchBuilder()
            .withEntityType("COMMUNICATIONS_MODULE").withId(operationalStatus).build();

        operationalStatusBuilder.execute().then(
            function(res) {
                if (res.statusCode === 204) {
                    throw new Error("Operational Status not found");
                }
            });

        this._operationalStatus = operationalStatus;

        return this;
    }

    /**
     * Set the antennaStatus attribute
     * @param {string} antennaStatus - optional field
     * @return {CommsModule}
     */
    withAntennaStatus(antennaStatus) {
        if (typeof antennaStatus !== 'string')
            throw new Error('Parameter antennaStatus must be a string');
        this._antennaStatus = this._checkValues(antennaStatus, ANTENNA_STATUS_ENUM);
        return this;
    }

    /**
     * Set the software attribute
     * @return {CommsModule}
     */
    withSoftware(software) {
        /*
        var software =  new Software();
        software.withName(name);
        software.withType(type);
        software.withVersion(version);
        software.withDate(date);
        if(this._softwareList === undefined)
            this._softwareList = [];*/
        if (!(software instanceof Software)) {
            throw new Error('Parameter software must be software type');
        }
        this._softwareList.push(software.composeElement());
        return this;
    }

    /**
     * Set the mobile attribute
     * @return {CommsModule}
     */
    withMobile(mobile) {

        if (!(mobile instanceof Mobile)) {
            throw new Error('Parameter mobile must be Mobile type');
        }
        this._mobile = mobile;
        return this;
    }


    /**
     * Set the subscriber attribute
     * @return {CommsModule}
     */
    withSubscriber(subscriber) {

        if (!(subscriber instanceof Subscriber)) {
            throw new Error('Parameter subscriber must be Subscriber type');
        }
        this._subscriber = subscriber;
        return this;
    }

    /**
     * Set the subscription attribute
     * @return {CommsModule}
     */
    withSubscription(subscription) {

        if (!(subscription instanceof Subscription)) {
            throw new Error('Parameter subscription must be Subscription type');
        }
        this._subscription = subscription;
        return this;
    }

    _checkValues(value, enumName) {
        let not_found = [];
        let found = enumName.find(function(value) {
            return value == this;
        }, value);

        if (typeof found === "undefined") {
            not_found.push(value);
        }
        if (not_found.length !== 0) {
            console.warn("Parameter value not allowed <'" + JSON.stringify(not_found) + "'>, allowed <'" + JSON.stringify(enumName) + "'>");
        }
        return value;
    }



    composeElement() {
        var commsModule = {
            "id": this._id,
            "name": this._name,
            "type": this._type,
            "hardware": this._hardware.composeElement(),
            "operationalStatus": this._operationalStatus,
            "antennaStatus": this._antennaStatus
        };
        if (this._softwareList.length > 0) {
            commsModule.softwareList = this._softwareList;
        }
        if (this._mobile !== undefined) {
            commsModule.mobile = this._mobile.composeElement();
        }
        if (this._subscriber !== undefined) {
            commsModule.subscriber = this._subscriber.composeElement();
        }
        if (this._subscription !== undefined) {
            commsModule.subscription = this._subscription.composeElement();
        }
        return commsModule;
    }



}