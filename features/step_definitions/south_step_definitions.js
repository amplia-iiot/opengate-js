'use strict';

module.exports = function() {

    this.Given(/^I want to create (a|an) "([^"]*)" with this element:$/, function(dummyWildcard, entityName, table, callback) {
        var _this = this;
        _this.error = undefined;
        var model = "create";
        var element;

        try {
            element = _this.utilsModel.util(entityName, _this.ogapi);

            var data = table.hashes();

            for (var i = 0; i < data.length; i++) {

                var submethod = _this.model_match(model).setters(entityName)[data[i].field];
                var value = _this.model_match(model).transform(data[i].type, data[i].content);
                element = element[submethod](value);
                this[entityName] = element;


            }


            callback();
        } catch (err) {
            _this.error = err;

            callback();
        }
    });

    this.Given(/^I want to define "([^"]*)" in "([^"]*)"$/, function(entityName, entityParent, callback) {
        //console.log(entityName);
        //console.log(entityParent);
        var _this = this;
        _this.error = undefined;
        var model = "create";
        var element;
        try {
            element = this[entityParent];
            if (_this.currentEntity === entityParent) {
                element = _this.util;
            }
            var submethod = _this.model_match(model).setters(entityParent)[entityName];
            element = element[submethod](this[entityName]);

            callback();

        } catch (err) {
            _this.error = err;
            callback();
        }
    });





};