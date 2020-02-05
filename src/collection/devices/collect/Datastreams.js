'use strict';

import Datapoint from './Datapoint';


/**
 * This is a base object that allows the user to create a Datastream.
 */
export default class Datastream {

    constructor() {
        this._id = undefined;
        this._feed = undefined;
        this._datapoints = [];
    }

    /**
     * Set the id attribute
     * @param {string} id - required field
     * @return {Datastream}
     */
    withId(id) {
        if (typeof id !== 'string' || id.length === 0)
            throw new Error('OGAPI_STRING_PARAMETER_ID');
        this._id = id;
        return this;
    }

    /**
     * Set the feed attribute
     * @param {string} feed - optionals field
     * @return {Datastream}
     */
    withFeed(feed) {
        if (typeof feed !== 'string' || feed.length === 0)
            throw new Error('OGAPI_STRING_PARAMETER_FEED');
        this._feed = feed;
        return this;
    }

    /**
     * Add a datapoint in datapoints
     * @param {Datapoint} datapoint - required field
     * @return {Datastream}
     */
    withDatapoint(datapoint) {
        if (!(datapoint instanceof Datapoint))
            throw new Error('OGAPI_PARAMETER_DATAPOINT');
        this._datapoints.push(datapoint.composeElement());
        return this;
    }

    composeElement() {
        if (this._id === undefined || this._id.length === 0 || this._datapoints.length === 0) {
            throw new Error('Parameter id must be defined and dapoint list must have at least one element');
        }
        var datastream = {
            'id': this._id,
            'feed': this._feed,
            'datapoints': this._datapoints

        };
        return datastream;
    }







}