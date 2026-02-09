'use strict';

import q from 'q';
import Event from './collect/Event';
import Datastream from '../devices/collect/Datastreams';
/**
 * This is a base object contains methods to send unstructured IoT information to be processed & collected by the platform.
 */
export default class DeviceMessage extends Event {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, resource, timeout) {
        super();
        this._ogapi = ogapi;
        this._resource = 'devices';
        this._iotMessage = undefined;
        this._dmmMessage = undefined;
        this._id = undefined;
        this._version = undefined;
        this._dataStreamVersion = undefined;
        this._deviceId = undefined;
        this._datastreams = [];
    }


    /**
     * Set the id attribute
     * @param {string} id - required field
     * @return {deviceMessages}
     */
    withId(id) {
        if (typeof id !== 'string' || id.length > 50)
            throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'id' });
        this._id = id;
        return this;
    }

    /**
     * Set the dataStream version attribute
     * @param {string} version - required field
     * @return {deviceMessages}
     */
    withDataStreamVersion(version) {
        if (typeof version !== 'string' || version.length > 50)
            throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'version' });
        this._dataStreamVersion = version;
        return this;
    }

    /**
     * Set the version attribute
     * @param {string} version - required field
     * @return {deviceMessages}
     */
    withDmmVersion(version) {
        if (typeof version !== 'string' || version.length > 50)
            throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'version' });
        this._version = version;
        return this;
    }

    /**
     * Set the deviceId attribute
     * @param {string} deviceId - optional field
     * @return {deviceMessages}
     */
    withDeviceId(deviceId) {
        if (typeof deviceId !== 'string' || deviceId.length > 50)
            throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'device' });
        this._deviceId = deviceId;
        return this;
    }



    /**
     * Set the datastream attribute
     * @param {Datastream} datastream - required field
     * @return {deviceMessages}
     */
    withDataStream(datastream) {
        if (datastream instanceof Datastream) {
            this._datastreams.push(datastream.composeElement());
        }
        return this;
    }



    _buildIotURL() {
        if (this._id === undefined)
            throw new Error('Parameters id must be defined');
        let url = this._resource + "/" + this._id + "/collect/iot";
        return url;

    }

    _buildDmmURL() {
        if (this._id === undefined)
            throw new Error('Parameters id must be defined');
        let url = this._resource + "/" + this._id + "/collect/dmm";
        return url;

    }

    _composeIotMessage() {
        if (this._datastreams === undefined || this._dataStreamVersion === undefined) {
            throw new Error('Parameters datastreams and version must be defined');
        }
        var iotMessage = {
            'version': this._dataStreamVersion,
            'device': this._deviceId,
            'datastreams': this._datastreams
        };
        return iotMessage;

    }

    _composeDmmMessage() {
        if (this._version === undefined) {
            throw new Error('Parameters id must be defined');
        }
        var event = super.composeElement();
        var dmmMessage = {
            'version': this._version,
            'event': event
        };
        return dmmMessage;

    }

    create() {
        var defered = q.defer();
        var promises = defered.promise;

        let boxPromises = [];
        if (this._datastreams.length > 0) {
            boxPromises.push(this._ogapi.Sapi.post(this._buildIotURL(), this._composeIotMessage()).then(function (res) {
                if (res.statusCode !== 201) {
                    throw new Error("IOT NOT CREATED");
                }
            }));
        }
        if (this._version !== undefined) {

            boxPromises.push(this._ogapi.Sapi.post(this._buildDmmURL(), this._composeDmmMessage()).then(function (res) {
                if (res.statusCode !== 201) {
                    throw new Error("DMM NOT CREATED");
                }
            }));
        }

        q.all(boxPromises).catch(function (errores) {
            defered.reject({ errors: errores, statusCode: 400 });
        }).done(function (response) {
            defered.resolve({ statusCode: 201 });
        });
        return promises;
    }

}