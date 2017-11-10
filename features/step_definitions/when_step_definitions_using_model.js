'use strict';
var q = require('q');
var assert = require('chai').assert;

module.exports = function () {
    this.When(/^I try to find by...$/, function (table) {
        // Write code here that turns the phrase above into concrete actions

        var _this = this;
        this.error = undefined;

        function digestResponseData(response) {
            //console.log("RESPONSE: " + JSON.stringify(response));
            _this.responseData = response;
        }

        function digestErrorData(response) {
            //console.log("ERROR: " + JSON.stringify(response));
            _this.error = response;
            _this.responseData = response;
        }
        try {

            var data = table.hashes();

            if (data.length == 1) {
                var findMethod = this.model_match(this.currentModel).setters(this.currentEntity)[data[0].field];
                return this.util[findMethod](data[0].content).then(digestResponseData).catch(digestErrorData);
            } else if (data.length > 1) {
                var find = "";
                var params = "";
                for (var i = 0; i < data.length; i++) {
                    if (i > 0) {
                        find += "And";
                        params += ",";
                    }
                    find += data[i].field;
                    params += '"' + data[i].content + '"';
                };
                var findMethod = this.model_match(this.currentModel).setters(this.currentEntity)[find];
                return eval('this.util["' + findMethod + '"](' + params + ').then(digestResponseData).catch(digestErrorData);');
            }
            this.error = "No params found";
            return;
        } catch (err) {
            this.error = err;
            return;
        }
    });

    this.When(/^I try to search with...$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions

        var _this = this;
        this.error = undefined;

        try {
            var data = table.hashes();
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    //console.log(data[i]);
                    var withMethod = this.model_match(this.currentModel).setters(this.currentEntity)[data[i].field];
                    //console.log(data[i]);
                    //console.log(his.util);
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

    this.When(/^I try to search with all allow select fields$/, function (callback) {
        var _this = this;
        var select = [];

        switch (_this.util.constructor.name) {
            case 'DevicesSearchBuilder':
            case 'SubscriptionsSearchBuilder':
            case 'SubscribersSearchBuilder':
                _this.util.findFields("").then(function (fields) {
                    var pArray = [];
                    fields.forEach(function (field) {
                        addField(field);
                    });
                    //console.log("filter: " + JSON.stringify(select));
                    _this.util.select(select);
                    callback();
                }).catch(function (err) {
                    console.log(JSON.stringify(err));
                    callback(err);
                });
                break;
            default:
                return _this.util.findFields("").then(function (fields) {
                    var pArray = [];
                    fields.forEach(function (field) {
                        pArray.push(findFields(field + "."));
                    });

                    return q.all(pArray);
                }).catch(function (err) {
                    assert.strictEqual(true, false);
                }).done(function () {
                    //console.log("select: " + JSON.stringify(select));
                    _this.util.select(select);
                    callback();
                });

        }

        function findFields(helpField) {
            var _helpField = helpField;
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
                console.error("ERR2: " + JSON.stringify(err));
                assert.strictEqual(true, false);
            });
        }

        function addField(field) {
            var element = {
                name: field,
                fields: ['value', 'date', 'at']
            }
            select.push(element);
        }
    });

    this.When(/^I try to search with all allow select fields with utils$/, function (callback) {
        var _this = this;
        var selectBuilder = this.ogapi.newSelectBuilder();

        switch (_this.util.constructor.name) {
            case 'DevicesSearchBuilder':
            case 'SubscriptionsSearchBuilder':
            case 'SubscribersSearchBuilder':
                _this.util.findFields("").then(function (fields) {
                    var pArray = [];
                    fields.forEach(function (field) {
                        addField(field);
                    });
                    //console.log("filter: " + selectBuilder.toString());
                    _this.util.select(selectBuilder);
                    callback();
                }).catch(function (err) {
                    console.log(JSON.stringify(err));
                    callback(err);
                });
                break;
            default:
                return _this.util.findFields("").then(function (fields) {
                    var pArray = [];
                    fields.forEach(function (field) {
                        pArray.push(findFields(field + "."));
                    });
                    
                    return q.all(pArray);
                }).catch(function (err) {
                    assert.strictEqual(true, false);
                }).done(function () {
                    //console.log("select: " + selectBuilder.toString());
                    _this.util.select(selectBuilder);
                    callback();
                });

        }

        function findFields(helpField) {
            var _helpField = helpField;
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
                console.error("ERR2: " + JSON.stringify(err));
                assert.strictEqual(true, false);
            });
        }

        function addField(field) {
            var selectElement = _this.ogapi.SE.element(field, ['value', 'date', 'at']);
            selectBuilder = selectBuilder.add(selectElement);
        }
    });


    this.When(/^I try to search with all allow fields$/, function (callback) {
        var _this = this;
        var filter = {
            and: []
        };

        switch (_this.util.constructor.name) {
            case 'DevicesSearchBuilder':
            case 'SubscriptionsSearchBuilder':
            case 'SubscribersSearchBuilder':
                _this.util.findFields("").then(function (fields) {
                    var pArray = [];
                    fields.forEach(function (field) {
                        addField(field);
                    });
                    //console.log("filter: " + JSON.stringify(filter));
                    _this.util.filter(filter);
                    callback();
                }).catch(function (err) {
                    //console.log(err);
                    callback(err);
                });
                break;
            default:
                return _this.util.findFields("").then(function (fields) {
                    var pArray = [];
                    fields.forEach(function (field) {
                        pArray.push(findFields(field + "."));
                    });

                    return q.all(pArray);
                }).catch(function (err) {
                    assert.strictEqual(true, false);
                }).done(function () {
                    //console.log("filter: " + JSON.stringify(filter));
                    _this.util.filter(filter);
                    callback();
                });

        }

        function findFields(helpField) {
            var _helpField = helpField;
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
                console.error("ERR2: " + JSON.stringify(err));
                assert.strictEqual(true, false);
            });
        }

        function addField(field) {
            var tmpl = {
                "eq": {}
            };
            tmpl.eq[field] = "1";
            filter.and.push(tmpl);
        }
    });

    this.When(/^I try to define the entity with...$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions

        var _this = this;
        this.error = undefined;
        var _er = false;
        try {
            var data = table.hashes();
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].typeFunction === 'simple') {
                        this.util.with(data[i].datastream, data[i].value);
                    }
                    if (data[i].typeFunction === 'complex') {
                        this.util.withComplex(data[i].datastream, data[i].parent, data[i].value);
                    }

                }
            } else {
                this.error = "No params found";
            }
        } catch (err) {
            if (Object.keys(err).length === 0) {
                //console.log(err);
            } else {
                //console.log(JSON.stringify(err));
            }
            this.error = err;
            _er = true;
        }
        callback(this.error);
    });

};