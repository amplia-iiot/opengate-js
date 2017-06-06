'use strict';
import IoTProvision from '../IoTProvision'
import IoTFlavour from '../catalog/IoTFlavour'
import IoTDatastream from '../catalog/IoTDatastream'

export const PRE_RESOURCE = '/organizations';
export const POST_RESOURCE = '/profiles';

/**
 * This is a base object for update and delete a IoT Profile
 */
export default class IoTProfilesHelper extends IoTProvision {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - Organization where the IoT profile was create
     * @param {!object} profile - Json object of IoT profile to modify or delete. 
     */
    constructor(ogapi, organization, profile) {
        super(ogapi, PRE_RESOURCE);
        this._isValidString(organization, 'organization', 50);
        this._organization = organization;

        //no modificar este objeto, es solo para comprobaciones
        this._profile = profile;
        this._name = this._profile.name;
        this._isValidString(this._name, 'name of object IoT profile', 100);
        this._version = this._profile.version;
        this._isValidString(this._version, 'version of object IoT profile', 100);
        this._description = this._profile.description;
        this._flavours = this._profile.flavours;
        if (!this._flavours) {
            throw new Error('Malformed IoT profile, flavours not exists.');
        }
        this._id = this._profile.id;
    }
    /**
     * Set the name attribute
     * @param {!string} name - required field
     * @return {IoTProfilesHelper}
     */
    withName(name) {
        this._isValidString(name, 'name', 100);
        this._name = name;
        return this;
    }

    /**
     * Set the version attribute
     * @param {!string} version - required field
     * @return {IoTProfilesHelper}
     */
    withVersion(version) {
        this._isValidString(version, 'version', 100);
        this._version = version;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description
     * @return {IoTProfilesHelper}
     */
    withDescription(description) {
        if (description)
            this._isValidString(description, 'description', 100);
        this._description = description;
        return this;
    }

    /**
     * Add a flavor. If the field datastreams have value, they will add to this flavor
     * @param {!string} flavour
     * @param {Array} datastreams
     * @return {IoTProfilesHelper}
     */
    addFlavour(flavour, datastreams) {
        this._isValidString(flavour, 'flavour', 100);
        this._flavours.forEach(function(_flavour, index) {
            if (_flavour.name === flavour) {
                throw new Error('Flavour ' + flavour + ' already exists.');
            }
        });
        let _flavour = new IoTFlavour(this._ogapi, flavour);
        if (datastreams && datastreams.length > 0)
            _flavour.addDatastreams(datastreams);
        this._flavours.push(_flavour._composeElement());
        return this;
    }

    /**
     * Add a datastream to the indicated flavour 
     * @param {!string} flavour
     * @param {!object} datastream
     * @return {IoTProfilesHelper}
     */
    addDatastream(flavour, datastream) {
        this._isValidString(flavour, 'flavour', 100);
        //Buscamos flavour y si existe se añade a la lista de flavours
        var exists_flavour = -1;
        this._flavours.forEach(function(_flavour, index) {
            if (_flavour.name === flavour) {
                exists_flavour = index;
            }
        });
        if (exists_flavour === -1) {
            throw new Error('Flavour ' + flavour + ' not exists for this profile. Use addFlavour instead.');
        }
        this._flavours[exists_flavour].datastreams.push(datastream);
        return this;
    }

    /**
     * Remove flavour
     * @param {!string} flavour
     * @return {IoTProfilesHelper}
     */
    removeFlavour(flavour) {
        this._isValidString(flavour, 'flavour', 100);
        var remove_index = -1;
        this._flavours.forEach(function(_flavour, index) {
            if (_flavour.name === flavour)
                remove_index = index;
        });
        if (remove_index === -1) {
            throw new Error('Flavour ' + flavour + ' not exists for this profile');
        }
        if (this._flavours.length === 1) {
            throw new Error('Flavour ' + flavour + ' can\'t remove, profile can\'t be empty');
        }
        this._flavours.splice(remove_index, 1);
        return this;
    }

    /**
     * Remove datastream to the indicated flavour
     * @param {!string} flavour
     * @param {!string} id_datastream of datastream
     * @return {IoTProfilesHelper}
     */
    removeDatastream(flavour, id_datastream) {
        this._isValidString(flavour, 'flavour', 100);
        let remove_flavour_index = -1;
        let remove_datastream_index = -1;
        this._flavours.forEach(function(_flavour, flavour_index) {
            if (_flavour.name === flavour) {
                remove_flavour_index = flavour_index;
                _flavour.datastreams.forEach(function(datastream, datastream_index) {
                    if (datastream.id === id_datastream) {
                        remove_datastream_index = datastream_index;
                    }
                })
            }
        });
        if (remove_flavour_index === -1) {
            throw new Error('Flavour ' + flavour + ' not exists for this profile');
        }
        if (remove_datastream_index === -1) {
            throw new Error('Datastream ' + id_datastream + ' not exists for this profile and flavour ' + flavour);
        }
        if (this._flavours[remove_flavour_index].datastreams.length === 1) {
            throw new Error('Datastream ' + id_datastream + ' can\'t remove, flavour ' + flavour + ' can\'t be empty');
        }
        this._flavours[remove_flavour_index].datastreams.splice(remove_datastream_index, 1);
        let _flavour = new IoTFlavour(this._ogapi, flavour, this._flavours[remove_flavour_index].datastreams);
        this._flavours.splice(remove_flavour_index, 1);
        this._flavours.push(_flavour._composeElement());
        return this;
    }

    /**
     * Update flavour name
     * @param {!string} old_flavour name
     * @param {!string} new_flavour name
     * @return {IoTProfilesHelper}
     */
    updateFlavour(old_flavour, new_flavour) {
        this._isValidString(new_flavour, 'new flavour', 100);
        this._isValidString(old_flavour, 'old flavour', 100);
        let old_flavour_index = -1;
        let new_flavour_index = -1;
        this._flavours.forEach(function(flavour, index) {
            switch (flavour.name) {
                case old_flavour:
                    old_flavour_index = index;
                    break;
                case new_flavour:
                    new_flavour_index = index;
                    break;
            }
        });
        if (new_flavour_index != -1) {
            throw new Error('New flavour ' + flavour + ' already exists.');
        }
        if (old_flavour_index === -1) {
            throw new Error('Flavour ' + old_flavour + ' not exists for this profile.');
        }
        this._flavours[old_flavour_index].name = new_flavour;
        return this;
    }

    /**
     * Update datastream to the indicated flavour
     * @param {!string} flavour
     * @param {!string} id_datastream of datastream
     * @param {!Object} datastream json object
     * @return {IoTProfilesHelper}
     */
    updateDatastream(flavour, id_datastream, datastream) {
        this._isValidString(flavour, 'flavour', 100);
        this._isValidString(id_datastream, 'id datastream', 100);
        if (!datastream || typeof datastream !== 'object') {
            throw new Error('Datastream must be an object');
        }
        let update_flavour_index = -1;
        let update_datastream_index = -1;
        this._flavours.forEach(function(_flavour, flavour_index) {
            if (_flavour.name === flavour) {
                update_flavour_index = flavour_index;
                _flavour.datastreams.forEach(function(_datastream, datastream_index) {
                    if (_datastream.id === id_datastream) {
                        update_datastream_index = datastream_index;
                    }
                });
            }
        });
        if (update_flavour_index === -1) {
            throw new Error('Flavour ' + flavour + ' not exists for this profile. Create it, use method addFlavour instead');
        }
        if (update_datastream_index === -1) {
            throw new Error('Datastream ' + id_datastream + ' not exists for this profile and flavour ' + flavour + '. Create it, use method addDatastream instead.');
        }
        this._flavours[update_flavour_index].datastreams[update_datastream_index] = datastream;
        return this;
    }

    _composeElement() {

        if (this._flavours.length === 0) {
            let _flavour = new IoTFlavour(this._ogapi, this._name + 'ExampleFlavour');
            let _datastream = this._ogapi.IoTDatastreamsBuilder();
            _datastream.withId(this._name + 'ExampleDatastream');
            _datastream.withName(this._name + 'ExampleDatastream');
            _datastream.withDescription('Example datastream');
            _datastream.withPeriod('INSTANT');
            _datastream.withUnit('EG', 'example', 'e.g.');
            _datastream.withTags(['example']);
            _flavour.addDatastream(_datastream.build());
            this._flavours.push(_flavour._composeElement());
        }

        return {
            'name': this._name,
            'version': this._version,
            'description': this._description,
            'flavours': this._flavours
        }
    }

    _buildURL() {
        return this._resource + '/' + this._organization + POST_RESOURCE + '/' + this._id;
    }
    /**
     * Create not supported on this builder. Use IoTProfileHelper instead.
     */
    create() {
        throw new Error('Create not supported on this builder. Use IoTProfilesBuilder instead.');
    }

    _isValidString(string, param_name, max_length) {
        if (typeof string !== 'string' || string.length === 0 || string.length > max_length)
            throw new Error('Parameter ' + param_name + ' must be a string, cannot be empty and has a maximum length of ' + max_length + ' on IoTProfilesHelper');
    }
}