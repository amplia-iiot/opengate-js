var jp = require('jsonpath');

module.exports = function () {
    this.Then(/^I can see into the result an "([^"]*)" as "([^"]*)"$/, function (getterName, getterValue, callback) {
        var data = this.responseData.data;
        //console.log("SEE INTO THE RESULT DATA: " + JSON.stringify(data));
        //console.log("SEE GETTER_NAME: " + getterName);
        var json_attr = this.findModel.getter_response(getterName);
        //console.log("SEE INTO THE json_attr: " + JSON.stringify(json_attr));

        var value = jp.value(data, json_attr);
        if (value !== getterValue && this.error) {
            throw new Error(JSON.stringify(this.error));
        }
        if (value !== getterValue && this.error) {
            throw new Error(JSON.stringify(this.error));
        }
        this.expect(value).to.be.equal(getterValue);
        callback();
    });

    this.Then(/^the content of file "([^"]*)" must be:$/, function (tmpFile, contentTmp, callback) {
        var data = this.responseData.data;
        this.expect(contentTmp).to.be.equal(data.text);
        callback();
    });

    this.Then(/^the content of file "([^"]*)" must match:$/, function (tmpFile, contentTmp, callback) {
        var data = this.responseData.data;
        this.expect(data.text).to.match(new RegExp(contentTmp));
        callback();
    });

    this.Then(/^the result contains:$/, function (resultContent, callback) {
        var data = this.responseData.data;
        this.expect(JSON.stringify(data)).to.be.equal(resultContent);
        callback();
    });

    this.Then(/^I can see into the result an "([^"]*)" as$/, function (getterName, getterValue, callback) {
        var data;
        //console.log("RESULT: " + JSON.stringify(this.responseData));
        data = this.responseData.data;
        //console.log("SEE INTO THE RESULT DATA: " + JSON.stringify(data));
        var json_attr = this.findModel.getter_response(getterName);
        var value = jp.value(data, json_attr);
        //console.log("response data: " + JSON.stringify(value));
        //console.log("getterValue: " + getterValue);
        this.expect(JSON.stringify(value)).to.be.equal(getterValue);
        callback();
    });

};