'use strict';

import q from 'q';
import BaseProvision from '../provision/BaseProvision'
import Workgroups from './Workgroups'
import Channels from '../channels/Channels'

/**
 * This is a base object that contains all you can do about workgroups.
 */
export default class WorkgroupRelations extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/domains", undefined, ["workgroup", "channels"]);
        this._ogapi = ogapi;
        this._action = "CREATE";
    }

    /**
     * Set the workgroup attribute
     * @param {string} workgroup - required field
     * @return {WorkgroupRelations}
     */
    withWorkgroup(workgroup) {
        if (workgroup.constructor.prototype != Workgroups.prototype)
            throw new Error('Parameter workgroup must be a workgroup');

        this._workgroup = workgroup;
        return this;
    }

    /**
     * Set the channel attribute
     * @param {string} channel - required field for creation or update
     * @return {WorkgroupRelations}
     */
    withChannel(channel) {
        if (channel.constructor.prototype != Channels.prototype)
            throw new Error('Parameter channel must be a channel');

        if (!this._channels)
            this._channels = [];

        this._channels.push({
            'organization': channel._organization,
            'channel': channel._name
        });

        return this;
    }

    _composeElement() {
        this._checkRequiredParameters();

        this._resource = 'provision/domains/' + this._workgroup._domainName + '/workgroups/' + this._workgroup._name + '/relations'

        var workgroup = {
            "workgroupRelation": {
                "channels": this._channels ? this._channels : undefined
            }
        }

        return workgroup;
    }

    _buildURL() {
        var url = 'provision/domains/' + this._workgroup._domainName + '/workgroups/' + this._workgroup._name + '/relations'
        return url;
    }

    create() {
        var relations = this._composeElement();

        var petitionUrl = this._resource + '?action=CREATE';

        return this._doNorthPost(petitionUrl, relations);
    }

    delete() {
        var petitionUrl = this._buildURL() + '?action=DELETE';

        if (this._channels) {
            var relations = this._composeElement();
            return this._doNorthPost(petitionUrl, relations);
        } else {
            return this._doNorthPost(petitionUrl, { "workgroupRelation": { "channels": [] } });
        }
    }

    /** 
     * Update not allowed
     * @throws {Error} 
     */
    update() {
        throw new Error("Workgroup relation update not allowed")
    }

}