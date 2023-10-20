'use strict';
var { When } = require('cucumber');
var fs = require('fs');

When(/^I want to (create|update|delete) the next timeseries function:$/, function (action, timeseriesFunctionData) {
    var _this = this;
    _this.error = undefined;
    _this.responseData = undefined;

    function digestResponseData (response) {
        //console.log('digestResponseData', response);
        _this.location = response.location;
        _this.responseData = response;
        _this.error = undefined;
    }

    function digestErrorData (response) {
        console.error("digestErrorData", response);
        _this.error = response;
        _this.responseData = response;
    }

    try {
        const json = JSON.parse(timeseriesFunctionData);
        
        var tfBuilder = this.ogapi.timeseriesFunctionBuilder(json.organization, json.identifier);

        if (action !== 'delete') {
            var metadataFile = fs.createReadStream(__dirname + json.metadataFile);
            tfBuilder.withMetadataFile(metadataFile);
            var file = fs.readFileSync(__dirname + json.scriptFile, 'utf8');
        
            tfBuilder.withScript(file);
        }

        if (action === 'create') {
            return tfBuilder.create().then(digestResponseData).catch(digestErrorData);
        } else if (action === 'update') {
            return tfBuilder.update().then(digestResponseData).catch(digestErrorData);
        } else if (action === 'delete') {
            return tfBuilder.delete().then(digestResponseData).catch(digestErrorData);
        }
    } catch (err) {
        console.error('ERROR: ', err)
        _this.error = err;
        return;
    }

});