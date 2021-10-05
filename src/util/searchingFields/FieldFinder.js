//https://github.com/kriskowal/q
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
    '/catalog/operators': 'OPERATORS',
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
    '/channels': 'SearchOnDatamodel',
    'datasets': 'SearchOnDataset'
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
const SEARCH_COLUMNS = 'dataset';

const TYPE_FIELD = {
    get: function(url) {
        if (complexPrimaryType.indexOf(match_url[url]) >= 0) {
            return COMPLEX_FIELDS;
        }
        switch (match_url[url]) {
            case 'SearchOnDatamodel':       
                return SEARCH_FIELDS;
            case 'SearchOnDataset':
                return SEARCH_COLUMNS;
            default:
                return SIMPLE_FIELDS;
        }
    }
};
const _getCustomSchema = function(_ds, schema) {
    let result
    const ds = _ds[0]
    if(!ds || !schema.properties || !schema.properties[ds]){
        result =  schema
    } else{
        result = _getCustomSchema(_ds.slice(1), schema.properties[ds])
    }
    return result
}

const _getDatamodelFields = function(parent, objSearcher){
    let defered = q.defer();
    const selectedField = objSearcher.selectedField
    const selectAll = objSearcher.selectAll
    const organization = objSearcher.extraData && objSearcher.extraData.organization
    let datamodelSearchBuilder = parent._ogapi.datamodelsSearchBuilder();

    let rtFilter = {
        'and': []
    };

    if (parent._resourceTypes) {
        rtFilter.and.push({
            'in': {
                'datamodels.allowedResourceTypes': parent._resourceTypes
            }
        });
    }
    if(organization){
        rtFilter.and.push({
            'eq': {
                'datamodels.organizationName': organization
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
    return defered.promise
}


const FIELD_SEARCHER = {
    
    [SEARCH_FIELDS]: function(objSearcher, defered) {
        https://github.com/kriskowal/q#using-deferreds
        _getDatamodelFields(this, objSearcher).then(function(response){
            defered.resolve(response)
        }).catch(function(err){
            defered.reject(err)
        })
    },
    [SIMPLE_FIELDS]: function(objSearcher, defered) {
        const context = objSearcher.context
        const primaryType = objSearcher.primaryType
        const field = objSearcher.selectedField
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
    [COMPLEX_FIELDS]: function(objSearcher, defered) {
        const states = objSearcher.states
        const context = objSearcher.context
        const primaryType = objSearcher.primaryType

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
    },
    //TODO: refactorizar método
    [SEARCH_COLUMNS]: function(objSearcher, defered) {
        https://github.com/kriskowal/q#using-deferreds
        const selectedField = objSearcher.selectedField
        //GET dataset by organization and datasetId
        var columnDatastreams = []
        const _this = this
        var organization = objSearcher.extraData.organization
        var dataset = objSearcher.extraData.dataset
        _this._ogapi.newDatasetFinder().findByOrganizationAndDatasetId(organization, dataset)
        .then(function (response) {
            if (response.statusCode === 200) {
                var columns = response.data.columns
                //search de la definición de schemas de opengate
                _this._ogapi.basicTypesSearchBuilder().withPath('$').build().execute().then(function (basicTypes) {
                    const definitions = basicTypes.data.definitions
                    let query = {selectAll: true}
                    if (selectedField) {
                        columns = columns.filter(function (column) { return selectedField === column.name })
                        const column = columns[0]
                        const datastreamMatch = column.path.match(new RegExp("^(.+)._current\.?(.+)?$"));
                        const datastream = datastreamMatch[1].replace(new RegExp("\[0\]"), "")
                        query = {selectedField: datastream}
                    }
                    query.organization = organization
                    //recuperamos la defnición de todas las columnas y todos los datastreams
                    _getDatamodelFields(_this, query).then(function (datamodelFields) {
                        columns.forEach(function (column) {
                            //Expresión regular para recuperar el path del datastream (1) y, si se tratase de un datastream complejo, también el path hasta el dato simple (2).
                            //Datastream simple: provision.device.identifier._current.value, device.communicationModules[0].subscriber.mobile.icc._current.at
                            //Datastream complejo: device.model._current.value.manufacturer, device.location._current.value.position.type
                            const datastreamMatch = column.path.match(new RegExp("^(.+)._current\.?(.+)?$"));
                            const datastream = datastreamMatch[1].replace(new RegExp("\[0\]"), "")
                            const subdatastream = datastreamMatch[2].replace(new RegExp('value\.?'), '');
                            //Buscamos la definición del datastream en el datamodel
                            const datamodelField = Array.isArray(datamodelFields) ? datamodelFields.find(function (df) {
                                return datastream === df.identifier
                            }) : datamodelFields
                            const schema = datamodelField.schema
                            // si es un datastream simple, la asignación es directa
                            if (!subdatastream) {
                                column.schema = schema
                            } else {
                                //si es un datastream complejo hay que navegar por el schema hasta encontrar su tipo
                                const sds = subdatastream.split('.')
                                let _schema = (schema.$ref && definitions[schema.$ref.replace(new RegExp('.*#/definitions/'), '')]) || schema
                                sds.forEach(function (sd) {
                                    // caso: device.model._current.at - no hay schema
                                    _schema = _schema && _schema.properties && _schema.properties[sd]
                                })
                                column.schema = _schema
                            }
                            //simular los campos de un datastream
                            column.identifier = column.name
                            column.indexed = column.filter === 'YES' || column.filter === 'ALLWAYS'
                            column.notFilterable = column.filter === 'NO'
                            columnDatastreams.push(column)
                        })
                        defered.resolve(columnDatastreams);
                    }).catch(function (error) {
                        console.log(error)
                        defered.reject(error);
                    });

                }).catch(function (error) {
                    console.log(error)
                    defered.reject(error);
                });
            }
        }).catch(function (error) {
            console.log(error)
            defered.reject(error);
        });
    }
}

export default class FieldFinder {
    constructor(ogapi, url, extraData) {
        this._ogapi = ogapi;
        this._url = url;
        this._type = TYPE_FIELD.get(url);
        this._extraData = extraData

        if (this._type === SEARCH_FIELDS) {
            this._resourceTypes = match_url_resourceType.get(url);
        }
    }
    find(input = "") {
        let defered = q.defer();
        let objSearcher = {
            states : input.split('.'),
            context:FIELDS[match_url[this._url]],
            primaryType: match_url[this._url],
            extraData: this._extraData
        }
        FIELD_SEARCHER[this._type].call(this, objSearcher, defered);
        return defered.promise;
    }
    findAll(input = "") {
        let defered = q.defer();
        let objSearcher = {
            states : input.split('.'),
            context:FIELDS[match_url[this._url]],
            primaryType: match_url[this._url], 
            selectAll: true,
            extraData: this._extraData
        }
        FIELD_SEARCHER[this._type].call(this, objSearcher, defered);
        return defered.promise;
    }

    findFieldPath(field = "") {
        let defered = q.defer();
        let objSearcher = {
            states : field,
            context:FIELDS[match_url[this._url]],
            primaryType: match_url[this._url],
            selectedField: field,
            extraData: this._extraData
        }
        FIELD_SEARCHER[this._type].call(this, objSearcher, defered);
        return defered.promise;
    }
}