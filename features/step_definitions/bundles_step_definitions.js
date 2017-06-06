'use strict';

module.exports = function() {

    this.Then(/^I create a "([^"]*)" from current "([^"]*)" using previous file and next params:$/, function(setterName, currentEntity, table, callback) {
        var _this = this;
        _this.error = undefined;
        _this.responseData = undefined;

        var model = "create";
        var deploymentElement = undefined;

        try {
            //console.log("datos deploymentElements");
            var method = _this.model_match(_this.currentModel).setters(currentEntity)[setterName];
            deploymentElement = _this.util[method](_this.uploadProgress);

            var data = table.hashes();


            for (var i = 0; i < data.length; i++) {
                // se valida si se inyectan validators
                var submethod = _this.model_match(model).setters(setterName)[data[i].field];

                if (data[i].field !== 'validators') {
                    deploymentElement = deploymentElement[submethod](data[i].content);
                } else {
                    // el parametro tiene que ser un array de objetos validator
                    deploymentElement = deploymentElement[submethod](JSON.parse(data[i].content));
                }
            };

            if (_this.fileData) {
                //console.log("with file");
                //return deploymentElement.create(_this.fileData).then(catchResponse).catch(catchErrorResponse);
                deploymentElement = deploymentElement.withFile(_this.fileData);

                //console.log(JSON.stringify(deploymentElement));

                callback();
            } else {
                //console.log("without file");
                _this.error = 'ERROR: No previous file loaded!!!';
                callback();
            }
        } catch (err) {
            _this.error = err;
            //console.log("DE: " + err);
            callback();
        }
    });

    this.Then(/^I delete the first deployment element from current bundle$/, function() {
       var _this = this;
        _this.error = undefined;
        _this.responseData = undefined;

        function catchResponse(data) {
            //console.log("OK: " + JSON.stringify(data));
            _this.responseData = data;
            _this.error = undefined;
        }

        function catchErrorResponse(err) {
            //console.log("NOK: " + JSON.stringify(err));
            _this.responseData = err;
            _this.error = err;
        }

        try {
            return _this.util._deploymentElements[0].delete().then(catchResponse).catch(catchErrorResponse);
        } catch (err) {
            _this.error = err;
            return;
        }
    });

    this.Then(/^upload percent is complete$/, function(callback) {
        if (this.___lastPercent && this.___lastPercent === 100) {
            callback();
        } else {
            throw new Error("upload percent isn't complete");
        }
    });

    this.When(/^I deploy it$/, function() {

        var _this = this;
        _this.error = undefined;
        _this.responseData = undefined;

        function catchResponse(data) {
            //console.log("OK: " + JSON.stringify(data));
            _this.responseData = data;

            _this.location = _this.responseData.location;
            _this.error = undefined;
        }

        function catchErrorResponse(err) {
            //console.log("NOK: " + JSON.stringify(err));
            _this.responseData = err;
            _this.error = err;
        }

        try {
            //console.log("Creando bundle");
            if (_this.util.deployAndActivate) {
                //console.log("Creando bundle 1");
                return _this.util.deployAndActivate().then(catchResponse).catch(catchErrorResponse);
            } else if (_this.util.deploy) {
                //console.log("Creando bundle 2");
                return _this.util.deploy().then(catchResponse).catch(catchErrorResponse);
            } else {
                throw new Error("No deploy method available")
            }

        } catch (err) {
            _this.error = err;
            //console.log("error: " + err);
            return;
        }
    });

    this.When(/^I activate it$/, function() {

        var _this = this;
        _this.error = undefined;
        _this.responseData = undefined;

        function catchResponse(data) {
           //console.log(JSON.stringify(data));

            _this.responseData = data;

            _this.error = undefined;
        }

        function catchErrorResponse(err) {
            //console.log(JSON.stringify(err));
            _this.responseData = err;
            _this.error = err;
        }

        try {
            //console.log("activating");
            return _this.util.activate().then(catchResponse).catch(catchErrorResponse);

        } catch (err) {
            _this.error = err;
            //console.log(err);
            return;
        }
    });

    this.When(/^I deactivate it$/, function() {

        var _this = this;
        _this.error = undefined;
        _this.responseData = undefined;

        function catchResponse(data) {
            //console.log(JSON.stringify(data));
            _this.responseData = data;

            _this.error = undefined;
        }

        function catchErrorResponse(err) {
            //console.log(JSON.stringify(err));
            _this.responseData = err;
            _this.error = err;
        }

        try {
            //console.log("deactivating");
            return _this.util.deactivate().then(catchResponse).catch(catchErrorResponse);
        } catch (err) {
            _this.error = err;
            //console.log(err);
            return;
        }
    });
};
