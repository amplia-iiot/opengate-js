import q from 'q';
import {
    GENERATED_FIELDS
} from './source-precompiled/Fields';
import {
    IOT_FIELDS
} from './IotFields';

var FIELDS = GENERATED_FIELDS;
for (var field in IOT_FIELDS) {
    if (FIELDS[field]) {
        for (var subfield in IOT_FIELDS[field]) {
            FIELDS[field][subfield] = IOT_FIELDS[field][subfield];
        }
    } else {
        FIELDS[field] = IOT_FIELDS[field];
    }
}

const match_url = {
    '/jobs': 'JOB',
    '/tasks': 'TASKS',
    '/alarms': 'ENTITY_ALARM',
    '/operations': 'ENTITY_OPERATION',
    '/certificates': 'CERTIFICATE',
    '/bundles': 'UPDATE_BUNDLE_VERSION',
    '/datapoints': 'DATAPOINTS',
    '/datastreams': 'DATASTREAMS',
    '/datamodels': 'DATAMODELS',
    '/dmmQRating': 'DMMQRATING',
    '/iotQRating': 'IOTQRATING',
    '/catalog/softwares': 'SOFTWARE_VERSION',
    '/catalog/hardwares': 'MODEL',
    '/domains': 'DOMAIN',
    '/users': 'USER',
    '/areas': 'AREAS',
    '/bulk/async': 'BULK',
    '/devices': 'SearchOnDatamodel',
    '/subscriptions': 'SearchOnDatamodel',
    '/subscribers': 'SearchOnDatamodel',
    '/entities': 'SearchOnDatamodel',
    'entity-asset': 'SearchOnDatamodel',
    '/tickets': 'SearchOnDatamodel',
    '/channels': 'SearchOnDatamodel'
};

const match_context = {
    'ENTITY_ALARM': 'alarm',
    'UPDATE_BUNDLE_VERSION': 'bundle',
    'DATAPOINTS': 'datapoints',
    'ENTITY_OPERATION': ['operation', 'job']
};

const match_url_resourceType = {
    get: function(url) {
        switch (url) {
            case 'entity-asset':
                return ['entity.asset'];
            case '/tickets':
                return ['ticket'];
            case '/channels':
                return ['channel'];
            default:
                return undefined;
        }
    }
};

const match_type = {
    'subscriber': 'DEVICE_PART_SUBSCRIBER',
    'subscription': 'DEVICE_PART_SUBSCRIPTION',
    'communicationsModule': 'DEVICE_PART_COMMSMODULE',
    'device': 'DEVICE_PART_DEVICE'
};

const match_type_inverse = {
    'DEVICE_PART_SUBSCRIBER': 'subscriber',
    'DEVICE_PART_SUBSCRIPTION': 'subscription',
    'DEVICE_PART_COMMSMODULE': 'communicationsModule',
    'DEVICE_PART_DEVICE': 'device'
};

const fields_related = ['relColl', 'relProv'];

const complexPrimaryType = ['DEVICE_PART_SUBSCRIBER', 'DEVICE_PART_SUBSCRIPTION', 'DEVICE_PART_COMMSMODULE', 'DEVICE_PART_DEVICE'];
const complexFields = ['subscriber', 'subscription', 'communicationsModule', 'device'];
const SIMPLE_FIELDS = 'simple';
const COMPLEX_FIELDS = 'complex';
const SEARCH_FIELDS = 'search';

const TYPE_FIELD = {
    get: function(url) {
        if (complexPrimaryType.indexOf(match_url[url]) >= 0) {
            return COMPLEX_FIELDS;
        }
        if (match_url[url] === 'SearchOnDatamodel') {
            return SEARCH_FIELDS;
        }
        return SIMPLE_FIELDS;
    }
};

const FIELD_SEARCHER = {
    
    [SEARCH_FIELDS]: function(states, context, primaryType, defered, selectedField, selectAll) {
        let datamodelSearchBuilder = this._ogapi.datamodelsSearchBuilder();

        let rtFilter = {
            'and': []
        };

        if (this._resourceTypes) {
            rtFilter.and.push({
                'in': {
                    'datamodels.allowedResourceTypes': this._resourceTypes
                }
            });
        }

        if (selectedField) {
            rtFilter.and.push({
                'eq': {
                    'datamodels.categories.datastreams.identifier': selectedField
                }
            });
        }

        if (rtFilter.and.length > 0) {
            datamodelSearchBuilder.filter(rtFilter);
        }

        datamodelSearchBuilder.build().execute().then(function(response) {
            var datastreams = [];
            if (response.statusCode === 200) {
                datastreams = response.data.datamodels.map(function(datamodel) {
                    var categories = datamodel.categories || [];
                    return categories.map(function(category) {
                        var datastreams = category.datastreams || [];
                        return datastreams.map(function(ds) {
                            if (selectedField || selectAll) {
                                return ds;
                            }
                            return ds.identifier;
                        });
                    });
                });
                datastreams = reduce(datastreams);
            }
            if (selectedField) {
                defered.resolve(datastreams.find(function(dsIdTmp) {
                    return selectedField === dsIdTmp.identifier;
                }));
            } else {
                defered.resolve(datastreams);
            }
        }).catch(function(error) {
            defered.reject(error);
        });

        function reduce(array) {
            if (array.length > 0 && array[0].constructor === Array) {
                array = array.reduce(function(preVal, elem) {
                    return preVal.concat(elem);
                });
                return reduce(array);
            }
            return array;
        }

    },
    [SIMPLE_FIELDS]: function(states, context, primaryType, defered, field) {
        var paths = [];
        if (context[primaryType] instanceof Array) {
            if (field) {
                let fieldIdx = 0;
                let fieldMatch = null;
                for (fieldIdx = 0; fieldMatch === null && fieldIdx < context[primaryType].length; fieldIdx++) {
                    let fieldTmp = context[primaryType][fieldIdx];
                    if (fieldTmp.toLowerCase() === field.toLowerCase() ||
                        fieldTmp.toLowerCase() === (field.toLowerCase() + 'name')) {
                        fieldMatch = fieldTmp;
                    } else if (match_context[primaryType]) {
                        if (match_context[primaryType] instanceof Array) {
                            match_context[primaryType].forEach(function(ctxMatch) {
                                if (fieldTmp.toLowerCase() === (ctxMatch + field.toLowerCase()) ||
                                    fieldTmp.toLowerCase() === (ctxMatch + '.' + field.toLowerCase()) ||
                                    fieldTmp.toLowerCase() === (ctxMatch + field.toLowerCase() + 'name') ||
                                    fieldTmp.toLowerCase() === (ctxMatch + '.' + field.toLowerCase() + 'name')) {
                                    if (!fieldMatch) fieldMatch = fieldTmp;
                                }
                            });
                        } else {
                            if (fieldTmp.toLowerCase() === (match_context[primaryType] + field.toLowerCase()) ||
                                fieldTmp.toLowerCase() === (match_context[primaryType] + '.' + field.toLowerCase()) ||
                                fieldTmp.toLowerCase() === (match_context[primaryType] + field.toLowerCase() + 'name') ||
                                fieldTmp.toLowerCase() === (match_context[primaryType] + '.' + field.toLowerCase() + 'name')) {
                                fieldMatch = fieldTmp;
                            }
                        }
                    }
                }

                if (fieldMatch)
                    paths.push(fieldMatch);
            } else {
                paths = context[primaryType].slice();
            }
        } else {
            if (field) {
                if (context[primaryType][field]) {
                    paths.push(context[primaryType][field]);
                } else {
                    var fieldsCfg = Object.keys(context[primaryType]);

                    for (var f = 0; f < fieldsCfg.length; f++) {
                        if (context[primaryType][fieldsCfg[f]].toLowerCase().indexOf(field.toLowerCase()) > -1) {
                            paths.push(context[primaryType][fieldsCfg[f]]);
                        }
                    }
                }
            } else {
                var fieldsCfg = Object.keys(context[primaryType]);

                for (var f = 0; f < fieldsCfg.length; f++) {
                    paths.push(context[primaryType][fieldsCfg[f]]);
                }
            }
        }

        defered.resolve(paths.slice());
    },
    [COMPLEX_FIELDS]: function(states, context, primaryType, defered) {
        const finiteStateMachine = {
            1: function(states, context) {
                // Fields del primaryType + los fields de los relacionados = complexFields
                return context[primaryType].concat(
                    complexFields.filter(
                        filterRelatedEntities,
                        match_type_inverse[primaryType]
                    )
                );
            },
            2: function(states, context) {
                try {
                    // Fields del relacionado + fields_related
                    return appendPreviousStates(
                        states,
                        fieldsNestedState(states[0], context).concat(fields_related)
                    );
                } catch (err) {
                    //console.warn(err);
                    return [];
                }
            },
            3: function(states, context) {
                let secondState = states[1];
                if (fields_related.indexOf(secondState) === -1) return [];
                try {
                    // Fields del relacionado 
                    return appendPreviousStates(
                        states,
                        fieldsNestedState(states[0], context)
                    );
                } catch (err) {
                    //console.warn(err);
                    return [];
                }
            }
        };

        let statesSize = states.length;
        let currentState = finiteStateMachine[statesSize];
        if (typeof currentState === "undefined") return defered.resolve([]);
        return defered.resolve(currentState(states, context));

        function fieldsNestedState(state, context) {
            let fieldsRelated;
            if (!(fieldsNestedState = match_type[state]) || !(fieldsRelated = context[fieldsNestedState]))
                throw new Error('Invalid primaryType: ' + state);
            return fieldsRelated.slice();
        }

        function filterRelatedEntities(relatedEntity) {
            return relatedEntity != this;
        }

        function appendPreviousStates(states, fields) {
            let out = [];
            fields.forEach(function(field) {
                let arrayField = states.slice(0, -1);
                arrayField.push(field);
                out.push(arrayField.join("."));
            });
            return out;
        }
    }
}

export default class FieldFinder {
    constructor(ogapi, url) {
        this._ogapi = ogapi;
        this._url = url;
        this._type = TYPE_FIELD.get(url);

        if (this._type === SEARCH_FIELDS) {
            this._resourceTypes = match_url_resourceType.get(url);
        }
    }

    find(input = "") {
        let defered = q.defer();
        FIELD_SEARCHER[this._type].call(this, input.split('.'), FIELDS[match_url[this._url]], match_url[this._url], defered);
        return defered.promise;
    }
    findAll(input = "") {
        let defered = q.defer();
        FIELD_SEARCHER[this._type].call(this, input.split('.'),  FIELDS[match_url[this._url]], match_url[this._url], defered, null ,true);
        return defered.promise;
    }

    findFieldPath(field = "") {
        let defered = q.defer();
        FIELD_SEARCHER[this._type].call(this, field, FIELDS[match_url[this._url]], match_url[this._url], defered, field);
        return defered.promise;
    }
}