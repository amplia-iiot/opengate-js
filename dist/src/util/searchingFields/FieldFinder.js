'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _FIELD_SEARCHER;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _sourcePrecompiledFields = require('./source-precompiled/Fields');

var _IotFields = require('./IotFields');

var FIELDS = _sourcePrecompiledFields.GENERATED_FIELDS;
for (var field in _IotFields.IOT_FIELDS) {
    if (FIELDS[field]) {
        for (var subfield in _IotFields.IOT_FIELDS[field]) {
            FIELDS[field][subfield] = _IotFields.IOT_FIELDS[field][subfield];
        }
    } else {
        FIELDS[field] = _IotFields.IOT_FIELDS[field];
    }
}

var match_url = {
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
    '/devices': 'SearchOnDatamodel',
    '/subscriptions': 'SearchOnDatamodel',
    '/subscribers': 'SearchOnDatamodel',
    '/entities': 'SearchOnDatamodel',
    'entity-asset': 'SearchOnDatamodel',
    '/tickets': 'SearchOnDatamodel',
    '/channels': 'SearchOnDatamodel'
};

var match_context = {
    'ENTITY_ALARM': 'alarm',
    'UPDATE_BUNDLE_VERSION': 'bundle',
    'DATAPOINTS': 'datapoints',
    'ENTITY_OPERATION': ['operation', 'job']
};

var match_url_resourceType = {
    get: function get(url) {
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

var match_type = {
    'subscriber': 'DEVICE_PART_SUBSCRIBER',
    'subscription': 'DEVICE_PART_SUBSCRIPTION',
    'communicationsModule': 'DEVICE_PART_COMMSMODULE',
    'device': 'DEVICE_PART_DEVICE'
};

var match_type_inverse = {
    'DEVICE_PART_SUBSCRIBER': 'subscriber',
    'DEVICE_PART_SUBSCRIPTION': 'subscription',
    'DEVICE_PART_COMMSMODULE': 'communicationsModule',
    'DEVICE_PART_DEVICE': 'device'
};

var fields_related = ['relColl', 'relProv'];

var complexPrimaryType = ['DEVICE_PART_SUBSCRIBER', 'DEVICE_PART_SUBSCRIPTION', 'DEVICE_PART_COMMSMODULE', 'DEVICE_PART_DEVICE'];
var complexFields = ['subscriber', 'subscription', 'communicationsModule', 'device'];
var SIMPLE_FIELDS = 'simple';
var COMPLEX_FIELDS = 'complex';
var SEARCH_FIELDS = 'search';

var TYPE_FIELD = {
    get: function get(url) {
        if (complexPrimaryType.indexOf(match_url[url]) >= 0) {
            return COMPLEX_FIELDS;
        }
        if (match_url[url] === 'SearchOnDatamodel') {
            return SEARCH_FIELDS;
        }
        return SIMPLE_FIELDS;
    }
};

var FIELD_SEARCHER = (_FIELD_SEARCHER = {}, _defineProperty(_FIELD_SEARCHER, SEARCH_FIELDS, function (states, context, primaryType, defered, selectedField) {
    var filterByUrl = {
        '/devices': function devices(field) {
            return true;
        },
        '/subscriptions': function subscriptions(field) {
            return true;
        },
        '/subscribers': function subscribers(field) {
            return true;
        },
        '/entities': function entities(field) {
            return true;
        },
        '/tickets': function tickets(field) {
            return true;
        },
        '/channels': function channels(field) {
            return true;
        }
    };

    var datamodelSearchBuilder = this._ogapi.datamodelsSearchBuilder();

    // if (this._resourceTypes) {
    //     let rtFilter = {
    //         'and': [{
    //             'in': {
    //                 'datamodels.allowedResourceTypes': this._resourceTypes
    //             }
    //         }]

    //     };

    //     datamodelSearchBuilder.filter(rtFilter)
    // }

    var rtFilter = {
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

    datamodelSearchBuilder.build().execute().then(function (response) {
        var datastreams = [];
        if (response.statusCode === 200) {
            if (selectedField) {
                datastreams = response.data.datamodels.map(function (datamodel) {
                    var categories = datamodel.categories || [];
                    return categories.map(function (category) {
                        var datastreams = category.datastreams || [];
                        return datastreams.map(function (ds) {
                            return ds;
                        });
                    });
                });
            } else {
                datastreams = response.data.datamodels.map(function (datamodel) {
                    var categories = datamodel.categories || [];
                    return categories.map(function (category) {
                        var datastreams = category.datastreams || [];
                        return datastreams.map(function (ds) {
                            return ds.identifier;
                        });
                    });
                });
            }

            datastreams = reduce(datastreams);
        }
        if (selectedField) {
            defered.resolve(datastreams.filter(function (dsIdTmp) {
                return selectedField.indexOf(dsIdTmp.identifier) !== -1;
            }));
        } else {
            defered.resolve(datastreams);
        }
    })['catch'](function (error) {
        defered.reject(error);
    });

    function reduce(_x3) {
        var _again = true;

        _function: while (_again) {
            var array = _x3;
            _again = false;

            if (array.length > 0 && array[0].constructor === Array) {
                array = array.reduce(function (preVal, elem) {
                    return preVal.concat(elem);
                });
                _x3 = array;
                _again = true;
                continue _function;
            }
            return array;
        }
    }
}), _defineProperty(_FIELD_SEARCHER, SIMPLE_FIELDS, function (states, context, primaryType, defered, field) {
    var paths = [];
    if (context[primaryType] instanceof Array) {
        if (field) {
            (function () {
                var fieldIdx = 0;
                var fieldMatch = null;

                var _loop = function () {
                    var fieldTmp = context[primaryType][fieldIdx];
                    if (fieldTmp.toLowerCase() === field.toLowerCase() || fieldTmp.toLowerCase() === field.toLowerCase() + 'name') {
                        fieldMatch = fieldTmp;
                    } else if (match_context[primaryType]) {
                        if (match_context[primaryType] instanceof Array) {
                            match_context[primaryType].forEach(function (ctxMatch) {
                                if (fieldTmp.toLowerCase() === ctxMatch + field.toLowerCase() || fieldTmp.toLowerCase() === ctxMatch + '.' + field.toLowerCase() || fieldTmp.toLowerCase() === ctxMatch + field.toLowerCase() + 'name' || fieldTmp.toLowerCase() === ctxMatch + '.' + field.toLowerCase() + 'name') {
                                    if (!fieldMatch) fieldMatch = fieldTmp;
                                }
                            });
                        } else {
                            if (fieldTmp.toLowerCase() === match_context[primaryType] + field.toLowerCase() || fieldTmp.toLowerCase() === match_context[primaryType] + '.' + field.toLowerCase() || fieldTmp.toLowerCase() === match_context[primaryType] + field.toLowerCase() + 'name' || fieldTmp.toLowerCase() === match_context[primaryType] + '.' + field.toLowerCase() + 'name') {
                                fieldMatch = fieldTmp;
                            }
                        }
                    }
                };

                for (fieldIdx = 0; fieldMatch === null && fieldIdx < context[primaryType].length; fieldIdx++) {
                    _loop();
                }

                if (fieldMatch) paths.push(fieldMatch);
            })();
        } else {
            paths = context[primaryType].slice();
        }
    } else {
        if (field && context[primaryType][field]) {
            paths.push(context[primaryType][field]);
        }
    }

    defered.resolve(paths.slice());
}), _defineProperty(_FIELD_SEARCHER, COMPLEX_FIELDS, function (states, context, primaryType, defered) {
    var finiteStateMachine = {
        1: function _(states, context) {
            // Fields del primaryType + los fields de los relacionados = complexFields
            return context[primaryType].concat(complexFields.filter(filterRelatedEntities, match_type_inverse[primaryType]));
        },
        2: function _(states, context) {
            try {
                // Fields del relacionado + fields_related
                return appendPreviousStates(states, fieldsNestedState(states[0], context).concat(fields_related));
            } catch (err) {
                //console.warn(err);
                return [];
            }
        },
        3: function _(states, context) {
            var secondState = states[1];
            if (fields_related.indexOf(secondState) === -1) return [];
            try {
                // Fields del relacionado
                return appendPreviousStates(states, fieldsNestedState(states[0], context));
            } catch (err) {
                //console.warn(err);
                return [];
            }
        }
    };

    var statesSize = states.length;
    var currentState = finiteStateMachine[statesSize];
    if (typeof currentState === "undefined") return defered.resolve([]);
    return defered.resolve(currentState(states, context));

    function fieldsNestedState(state, context) {
        var relatedPrimaryType = undefined,
            fieldsRelated = undefined;
        if (!(fieldsNestedState = match_type[state]) || !(fieldsRelated = context[fieldsNestedState])) throw new Error('Invalid primaryType: ' + state);
        return fieldsRelated.slice();
    }

    function filterRelatedEntities(relatedEntity) {
        return relatedEntity != this;
    }

    function appendPreviousStates(states, fields) {
        var out = [];
        fields.forEach(function (field) {
            var arrayField = states.slice(0, -1);
            arrayField.push(field);
            out.push(arrayField.join("."));
        });
        return out;
    }
}), _FIELD_SEARCHER);

var FieldFinder = (function () {
    function FieldFinder(ogapi, url) {
        _classCallCheck(this, FieldFinder);

        this._ogapi = ogapi;
        this._url = url;
        this._type = TYPE_FIELD.get(url);

        if (this._type === SEARCH_FIELDS) {
            this._resourceTypes = match_url_resourceType.get(url);
        }
    }

    _createClass(FieldFinder, [{
        key: 'find',
        value: function find() {
            var input = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

            var defered = _q2['default'].defer();
            FIELD_SEARCHER[this._type].call(this, input.split('.'), FIELDS[match_url[this._url]], match_url[this._url], defered);
            return defered.promise;
        }
    }, {
        key: 'findFieldPath',
        value: function findFieldPath() {
            var field = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

            var defered = _q2['default'].defer();
            FIELD_SEARCHER[this._type].call(this, field, FIELDS[match_url[this._url]], match_url[this._url], defered, field);
            return defered.promise;
        }
    }]);

    return FieldFinder;
})();

exports['default'] = FieldFinder;
module.exports = exports['default'];
//# sourceMappingURL=FieldFinder.js.map
