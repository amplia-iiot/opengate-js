'use strict';
var q = require('q');

module.exports = function() {
    this.When(/^I try to find by...$/, function(table) {
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

    this.When(/^I try to search with...$/, function(table, callback) {
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


    this.When(/^I try to search with all allow fields$/, function(callback) {
        var _this = this;
        var filter = {
            and: []
        };

        return _this.util.findFields("").then(function(fields) {
            var pArray = [];
            fields.forEach(function(field) {
                pArray.push(findFields(field + "."));
            });
            return q.all(pArray);
        }).catch(function(err) {
            //console.error(err);
            assert.strictEqual(true, false);
        }).done(function() {
            //console.log(JSON.stringify(filter));
            _this.util.filter(filter);
            callback();
        });

        function findFields(helpField) {
            var _helpField = helpField;
            return _this.util.findFields(_helpField).then(function(fields) {
                if (fields.length !== 0) {
                    var pArray = [];
                    fields.forEach(function(field) {
                        pArray.push(findFields(field + "."));
                    });
                    return q.all(pArray);
                } else {
                    // Eliminar el último .
                    addField(helpField.slice(0, -1));
                }
            }).catch(function(err) {
                //console.error(err);
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

};