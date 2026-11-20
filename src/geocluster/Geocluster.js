'use strict';

import q from 'q';
import BaseProvision from '../provision/BaseProvision';
import checkType from '../util/formats/check_types';
import parameterError from '../util/parameterError';

const IDENTIFIER_PATTERN = '^[A-Za-z0-9_.-]+$';

// Each field of a crontab or Spring cron expression: numbers, names, '*' and the , - / ? L W # operators
const CRON_FIELD = /^[0-9A-Za-z*?,\-/#]+$/;

function checkLength(value, min, max, name) {
    if (typeof value !== 'string' || value.length < min || value.length > max) {
        throw parameterError('OGAPI_STRING_PARAMETER', { parameter: name, minLength: min, maxLength: max });
    }
}

function toJsonObject(value, name) {
    if (typeof value === 'string') {
        try {
            value = JSON.parse(value);
        } catch {
            value = undefined;
        }
    }
    if (value === null || typeof value !== 'object' || Array.isArray(value)) {
        throw parameterError('OGAPI_OBJECT_PARAMETER', { parameter: name });
    }
    return value;
}

/**
 * This is a base object that contains everything you can do with geoclusters.
 *
 * Creating, updating, clustering and deleting a geocluster require the permission `prov.admin.supercluster`, held by
 * the profiles root, admin_domain and super_admin_domain. Any other user is answered with a 401.
 */
export default class Geocluster extends BaseProvision {
    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, '/geocluster', undefined, ['identifier', 'name']);
    }

    _buildURL() {
        checkType._checkString(this._identifier, 'identifier');
        return 'provision/geocluster/' + this._identifier;
    }

    /**
     * Set the identifier attribute: unique in the domain, up to 100 letters, digits, '_', '.' or '-'. It cannot be
     * changed once the geocluster exists.
     * @param {string} identifier - required field
     * @return {Geocluster}
     */
    withIdentifier(identifier) {
        checkLength(identifier, 1, 100, 'identifier');
        checkType._checkStringAndPattern(identifier, IDENTIFIER_PATTERN, 'identifier');
        this._identifier = identifier;
        return this;
    }

    /**
     * Set the name shown to the consumers of the geocluster, up to 255 characters
     * @param {string} name - required field
     * @return {Geocluster}
     */
    withName(name) {
        checkLength(name, 1, 255, 'name');
        this._name = name;
        return this;
    }

    /**
     * Set the human readable title, up to 255 characters
     * @param {string} title
     * @return {Geocluster}
     */
    withTitle(title) {
        checkLength(title, 0, 255, 'title');
        this._title = title;
        return this;
    }

    /**
     * Set the channels whose entities are clustered. When omitted, every channel visible by the user.
     * @param {Array<{organization: string, name: string}>} channels
     * @return {Geocluster}
     */
    withChannels(channels) {
        checkType._checkArray(channels, 'channels');
        channels.forEach(channel => {
            checkType._checkObject(channel, 'channels');
            checkLength(channel && channel.organization, 1, Infinity, 'channels.organization');
            checkLength(channel.name, 1, Infinity, 'channels.name');
        });
        this._channels = channels;
        return this;
    }

    /**
     * Set the MongoDB projection that maps every document to a point, as a JSON object or a string holding one. The
     * platform requires `point` and `locDate` in it. When omitted, the default projection of the devices is used.
     * @example
     *  ogapi.geoclusterBuilder().withProjection({ point: '$provision.device.location.current.value.position.coordinates' })
     * @param {(Object|string)} projection
     * @return {Geocluster}
     */
    withProjection(projection) {
        this._projection = toJsonObject(projection, 'projection');
        return this;
    }

    /**
     * Set the MongoDB query over the stored documents of the collection, as a JSON object or a string holding one
     * @example
     *  ogapi.geoclusterBuilder().withFilter({ 'resourceType.current.value': 'ENTITY_DEVICE' })
     * @param {(Object|string)} filter
     * @return {Geocluster}
     */
    withFilter(filter) {
        this._filter = toJsonObject(filter, 'filter');
        return this;
    }

    /**
     * Set the properties of the projection aggregated in every cluster with their operator ($mapcount, $sum, $avg,
     * $min or $max), as a JSON object or a string holding one
     * @example
     *  ogapi.geoclusterBuilder().withAggregation({ presence: '$mapcount' })
     * @param {(Object|string)} aggregation
     * @return {Geocluster}
     */
    withAggregation(aggregation) {
        this._aggregation = toJsonObject(aggregation, 'aggregation');
        return this;
    }

    /**
     * Set the cron expression of the automatic clusterings, evaluated in UTC: the 5 fields of crontab
     * (`0 3 * * *`) or the 6 fields of Spring, with seconds first (`0 0 3 * * *`). When omitted, there is no
     * automatic clustering.
     * @example
     *  ogapi.geoclusterBuilder().withRegenerationCronPeriod('0 3 * * *')
     * @param {string} regenerationCronPeriod
     * @return {Geocluster}
     */
    withRegenerationCronPeriod(regenerationCronPeriod) {
        const valid = typeof regenerationCronPeriod === 'string' && regenerationCronPeriod.length <= 100;
        const fields = valid ? regenerationCronPeriod.trim().split(/\s+/) : [];
        if ((fields.length !== 5 && fields.length !== 6) || !fields.every(field => CRON_FIELD.test(field))) {
            throw parameterError('OGAPI_CRON_EXPRESSION_PARAMETER', { parameter: 'regenerationCronPeriod' });
        }
        this._regenerationCronPeriod = regenerationCronPeriod;
        return this;
    }

    /**
     * Set the collection of the source database where the points are read, up to 120 characters. When omitted,
     * `c_odm_entities`.
     * @param {string} collection
     * @return {Geocluster}
     */
    withCollection(collection) {
        checkLength(collection, 1, 120, 'collection');
        this._collection = collection;
        return this;
    }

    _composeElement() {
        return {
            identifier: this._identifier,
            name: this._name,
            title: this._title,
            channels: this._channels,
            projection: this._projection,
            filter: this._filter,
            aggregation: this._aggregation,
            regenerationCronPeriod: this._regenerationCronPeriod,
            collection: this._collection
        };
    }

    /**
     * This invokes a request to the OpenGate North API, and the callback is managed via promises. This method creates
     * a geocluster. Creating it does not cluster it: call clustering() or set a regenerationCronPeriod.
     * @example
     *  ogapi.geoclusterBuilder()
     *      .withIdentifier('entities.france')
     *      .withName('sc_france')
     *      .withChannels([{ organization: 'france', name: 'PARIS' }])
     *      .withProjection({ point: '$provision.device.location.current.value.position.coordinates' })
     *      .create()
     * @return {Promise}
     */
    create() {
        return super.create();
    }

    /**
     * This invokes a request to the OpenGate North API, and the callback is managed via promises. This method replaces
     * the definition of a geocluster with the one of the builder: every field not set is removed. The result of the
     * last clustering is kept until the next one.
     * @example
     *  ogapi.geoclusterBuilder().withIdentifier('entities.france').withName('sc_france').update()
     * @return {Promise}
     */
    update() {
        this._checkRequiredParameters();
        return super.update();
    }

    /**
     * This invokes a request to the OpenGate North API, and the callback is managed via promises. This method enqueues
     * the clustering of a geocluster and resolves at once with the task, while the clustering runs in background. It
     * is rejected with a 409 when the geocluster is already being clustered.
     * @example
     *  ogapi.geoclusterBuilder().withIdentifier('entities.france').clustering()
     * @return {Promise}
     */
    clustering() {
        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi.put(this._buildURL() + '/clustering', undefined, this._timeout, this._getExtraHeaders(), this._getUrlParameters())
            .then(res => {
                if (res.statusCode === 200 || res.status === 200) {
                    defered.resolve({
                        data: res.body,
                        statusCode: res.statusCode || res.status
                    });
                } else {
                    defered.reject({
                        errors: res.errors,
                        statusCode: res.statusCode
                    });
                }
            })
            .catch(error => {
                defered.reject(error);
            });
        return promise;
    }

    /**
     * This invokes a request to the OpenGate North API, and the callback is managed via promises. This method deletes
     * a geocluster and all its clusters.
     * @example
     *  ogapi.geoclusterBuilder().withIdentifier('entities.france').delete()
     * @return {Promise}
     */
    delete() {
        return super.delete();
    }
}
