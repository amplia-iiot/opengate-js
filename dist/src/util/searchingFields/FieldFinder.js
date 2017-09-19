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
    '/devices': 'SearchOnDatamodel',
    '/subscriptions': 'SearchOnDatamodel',
    '/subscribers': 'SearchOnDatamodel'
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

var FIELD_SEARCHER = (_FIELD_SEARCHER = {}, _defineProperty(_FIELD_SEARCHER, SEARCH_FIELDS, function (states, context, primaryType, defered) {
    var filterByUrl = {
        '/devices': function devices(field) {
            return true;
        },
        '/subscriptions': function subscriptions(field) {
            return true;
        },
        '/subscribers': function subscribers(field) {
            return true;
        }
    };

    this._ogapi.datamodelsSearchBuilder().build().execute().then(function (response) {
        var datastreams = [];
        if (response.statusCode === 200) {
            datastreams = response.data.datamodels.map(function (datamodel) {
                var categories = datamodel.categories || [];
                return categories.map(function (category) {
                    var datastreams = category.datastreams || [];
                    return datastreams.map(function (ds) {
                        return ds.identifier;
                    });
                }).reduce(function (preVal, elem) {
                    return preVal.concat(elem);
                });;
            }).reduce(function (preVal, elem) {
                return preVal.concat(elem);
            });
        }
        defered.resolve(datastreams);
    })['catch'](function (error) {
        defered.reject(error);
    });
}), _defineProperty(_FIELD_SEARCHER, SIMPLE_FIELDS, function (states, context, primaryType, defered) {
    if (states.length > 1) return defered.resolve([]);
    defered.resolve(context[primaryType].slice());
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
    }

    _createClass(FieldFinder, [{
        key: 'find',
        value: function find() {
            var input = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

            var defered = _q2['default'].defer();
            FIELD_SEARCHER[this._type].call(this, input.split('.'), FIELDS[match_url[this._url]], match_url[this._url], defered);
            return defered.promise;
        }
    }]);

    return FieldFinder;
})();

exports['default'] = FieldFinder;
module.exports = exports['default'];
//# sourceMappingURL=FieldFinder.js.map
