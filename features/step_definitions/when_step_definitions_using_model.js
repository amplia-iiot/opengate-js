'use strict';
var q = require('q');
var jp = require('jsonpath');
var { When } = require('cucumber');

When(/^I try to find by...$/, function (table) {
    // Write code here that turns the phrase above into concrete actions

    var _this = this;
    this.error = undefined;

    function digestResponseData (response) {
        //console.log("RESPONSE: " + JSON.stringify(response));
        _this.responseData = response;
        _this.error = undefined;
    }

    function digestErrorData (response) {
        //console.log("ERROR: " + JSON.stringify(response));
        _this.error = response;
        _this.responseData = response;

    }
    try {

        var data = table.hashes();
        var findMethod;
        if (data.length == 1) {
            findMethod = this.model_match(this.currentModel).setters(this.currentEntity)[data[0].field];
            return this.util[findMethod](data[0].content).then(digestResponseData).catch(digestErrorData);
        } else if (data.length > 1) {
            var find = "";
            var params = "";
            for (var i = 0; i < data.length; i++) {
                var _data = data[i];
                var field = _data.field;
                if (i > 0) {
                    if (field !== 'flattened')
                        find += "And";
                    params += ",";
                }
                if (field !== 'flattened')
                    find += _data.field;
                var content = _data.content;
                switch (content) {
                    case 'from_location_previous_response':
                        var location = this.responseData.location;
                        var id = location.substring(location.lastIndexOf("/") + 1);
                        params += '"' + id + '"';
                        break;
                    default:
                        params += '"' + content + '"';
                        break;
                }
            }
            findMethod = this.model_match(this.currentModel).setters(this.currentEntity)[find];
            return eval('this.util["' + findMethod + '"](' + params + ').then(digestResponseData).catch(digestErrorData);');
        }
        this.error = "No params found";
        return;
    } catch (err) {
        this.error = err;
        return;
    }
});

When(/^I try to search with...$/, function (table, callback) {
    // Write code here that turns the phrase above into concrete actions

    var _this = this;
    this.error = undefined;

    try {
        var data = table.hashes();
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var withMethod = this.model_match(this.currentModel).setters(this.currentEntity)[data[i].field];
                this.util = this.util[withMethod](data[i].content);
            }
        } else {
            this.error = "No params found";
        }
    } catch (err) {
        this.error = err;
    }

    callback();
});

When(/^I try to search with all allow select fields$/, function (callback) {
    var _this = this;
    var select = [];

    switch (_this.util.constructor.name) {
        case 'DevicesSearchBuilder':
        case 'SubscriptionsSearchBuilder':
        case 'SubscribersSearchBuilder':
            try {
                _this.util.findFields("").then(function (fields) {
                    var pArray = [];
                    fields.forEach(function (field) {
                        addField(field);
                    });
                    //console.log("filter: " + JSON.stringify(select));
                    _this.util.select(select);
                    callback();
                }).catch(function (err) {
                    //console.log(JSON.stringify(err));
                    throw new Error(JSON.stringify(err));

                });
            } catch (err) {
                throw new Error(JSON.stringify(err));
            }
            break;
        default:
            try {
                return _this.util.findFields("").then(function (fields) {
                    var pArray = [];
                    fields.forEach(function (field) {
                        pArray.push(findFields(field + "."));
                    });

                    return q.all(pArray);
                }).catch(function (err) {
                    throw new Error(JSON.stringify(err));

                }).done(function () {
                    //console.log("select: " + JSON.stringify(select));
                    _this.util.select(select);
                    callback();
                });
            } catch (err) {
                throw new Error(JSON.stringify(err));
            }
    }

    function findFields (helpField) {
        var _helpField = helpField;
        try {
            return _this.util.findFields(_helpField).then(function (fields) {
                if (fields.length !== 0) {
                    var pArray = [];
                    fields.forEach(function (field) {
                        pArray.push(findFields(field + "."));
                    });
                    return q.all(pArray);
                } else {
                    // Eliminar el último .
                    addField(helpField.slice(0, -1));
                }
            }).catch(function (err) {
                //console.error("ERR2: " + JSON.stringify(err));
                throw new Error(JSON.stringify(err));

            });
        } catch (err) {
            throw new Error(JSON.stringify(err));
        }
    }

    function addField (field) {
        var element = {
            name: field,
            fields: [{
                'field': 'value'
            }, {
                'field': 'date'
            }, {
                'field': 'at'
            }]
        };
        select.push(element);
    }
});

When(/^I try to search with all allow select fields with utils$/, function (callback) {
    var _this = this;
    var selectBuilder = this.ogapi.newSelectBuilder();

    switch (_this.util.constructor.name) {
        case 'DevicesSearchBuilder':
        case 'SubscriptionsSearchBuilder':
        case 'SubscribersSearchBuilder':
            try {
                _this.util.findFields("").then(function (fields) {
                    var pArray = [];
                    fields.forEach(function (field) {
                        addField(field);
                    });
                    //console.log("filter: " + selectBuilder.toString());
                    _this.util.select(selectBuilder);
                    callback();
                }).catch(function (err) {
                    //console.log(JSON.stringify(err));
                    throw new Error(JSON.stringify(err));
                });
            } catch (err) {
                throw new Error(JSON.stringify(err));
            }
            break;
        default:
            try {
                return _this.util.findFields("").then(function (fields) {
                    var pArray = [];
                    fields.forEach(function (field) {
                        pArray.push(findFields(field + "."));
                    });

                    return q.all(pArray);
                }).catch(function (err) {
                    throw new Error(JSON.stringify(err));
                }).done(function () {
                    //console.log("select: " + selectBuilder.toString());
                    _this.util.select(selectBuilder);
                    callback();
                });
            } catch (err) {
                throw new Error(JSON.stringify(err));
            }

    }

    function findFields (helpField) {
        var _helpField = helpField;
        try {
            return _this.util.findFields(_helpField).then(function (fields) {
                if (fields.length !== 0) {
                    var pArray = [];
                    fields.forEach(function (field) {
                        pArray.push(findFields(field + "."));
                    });
                    return q.all(pArray);
                } else {
                    // Eliminar el último .
                    addField(helpField.slice(0, -1));
                }
            }).catch(function (err) {
                //console.error("ERR2: " + JSON.stringify(err));
                throw new Error(JSON.stringify(err));
            });
        } catch (err) {
            throw new Error(JSON.stringify(err));
        }
    }

    function addField (field) {
        var selectElement = _this.ogapi.SE.element(field, [{
            'field': 'value'
        }, {
            'field': 'date'
        }, {
            'field': 'at'
        }]);
        selectBuilder = selectBuilder.add(selectElement);
    }
});


When(/^I try to search with all allow fields$/, function (callback) {
    var _this = this;
    var filter = {
        and: []
    };
    console.log(_this.util.constructor.name);
    switch (_this.util.constructor.name) {
        case 'DevicesSearchBuilder':
        case 'SubscriptionsSearchBuilder':
        case 'SubscribersSearchBuilder':
            try {
                _this.util.findFields("").then(function (fields) {
                    var pArray = [];
                    fields.forEach(function (field) {
                        addField(field);
                    });
                    //console.log("filter: " + JSON.stringify(filter));
                    _this.util.filter(filter);
                    callback();
                }).catch(function (err) {
                    throw new Error(JSON.stringify(err));
                });
            } catch (err) {
                throw new Error(JSON.stringify(err));
            }
            break;
        default:
            try {
                return _this.util.findFields("").then(function (fields) {
                    var pArray = [];
                    fields.forEach(function (field) {
                        pArray.push(findFields(field + "."));
                    });

                    return q.all(pArray);
                }).catch(function (err) {
                    throw new Error(JSON.stringify(err));
                }).done(function () {
                    //console.log("filter: " + JSON.stringify(filter));
                    _this.util.filter(filter);
                    callback();
                });
            } catch (err) {
                throw new Error(JSON.stringify(err));
            }

    }

    function findFields (helpField) {
        var _helpField = helpField;
        try {
            return _this.util.findFields(_helpField).then(function (fields) {
                if (fields.length !== 0) {
                    var pArray = [];
                    fields.forEach(function (field) {
                        pArray.push(findFields(field + "."));
                    });
                    return q.all(pArray);
                } else {
                    // Eliminar el último .
                    addField(helpField.slice(0, -1));
                }
            }).catch(function (err) {
                //console.error("ERR2: " + JSON.stringify(err));
                throw new Error(JSON.stringify(err));
            });
        } catch (err) {
            throw new Error(JSON.stringify(err));
        }
    }

    function addField (field) {
        var tmpl = {
            "eq": {}
        };
        tmpl.eq[field] = "1";
        filter.and.push(tmpl);
    }
});

When(/^I try to define the (entity|ticket) with GET previous flattened response$/, function (model, callback) {
    var _this = this;

    try {
        var flattened = this.responseData.data;
        this.util.initFromFlattened(flattened);

    } catch (err) {
        //console.log(err);
        if (Object.keys(err).length === 0) {
            //console.log(err);
        } else {
            console.log(JSON.stringify(err));
        }
        this.error = err;
    }
    callback();
});

When(/^I try to define the (entity|ticket) with GET previous json response$/, function (model, callback) {
    var _this = this;

    try {
        var json = this.responseData.data;
        this.util.initFromJson(json);

    } catch (err) {
        //console.log(err);
        if (Object.keys(err).length === 0) {
            //console.log(err);
        } else {
            console.log(JSON.stringify(err));
        }
        this.error = err;
    }
    callback();
});

When(/^I try to define the (entity|ticket) with...$/, function (model, table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var _this = this;
    this.error = undefined;
    try {
        var data = table.hashes();
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].typeFunction === 'simple') {
                    this.util.with(data[i].datastream, data[i].value);
                } else if (data[i].typeFunction === 'complex') {
                    this.util.withComplex(data[i].datastream, data[i].parent, data[i].value);
                }

            }
        } else {
            this.error = "No params found";
        }
    } catch (err) {
        //console.log(err);
        if (Object.keys(err).length === 0) {
            //console.log(err);
        } else {
            console.log(JSON.stringify(err));
        }
        this.error = err;
    }
    callback();
});

When(/^I try to define the datastream ticket "([^"]*)" with "([^"]*)" path of the previous response$/, function (datastream, path, callback) {
    // Write code here that turns the phrase above into concrete actions
    try {
        var data = this.responseData.data;
        var json_attr = path.includes('$.') ? path : '$..' + path;
        var value = jp.value(data, json_attr);
        this.util.with(datastream, value);
    } catch (err) {
        //console.log(err);
    }
    callback();
});