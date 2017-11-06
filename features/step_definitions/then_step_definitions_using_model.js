var JSONPath = require('JSONPath');

module.exports = function () {
    this.Then(/^I can see into the result an "([^"]*)" as "([^"]*)"$/, function (getterName, getterValue, callback) {
        var data = this.responseData.data;
        //console.log("SEE INTO THE RESULT DATA: " + JSON.stringify(data));
        //console.log("SEE GETTER_NAME: " + getterName);
        var json_attr = this.findModel.getter_response(getterName);
        //console.log("SEE INTO THE json_attr: " + JSON.stringify(json_attr));

        var value = JSONPath({ json: data, path: json_attr })[0];
        this.expect(value).to.be.equal(getterValue);
        callback();
    });

    this.Then(/^the content of file "([^"]*)" must be:$/, function (tmpFile, contentTmp, callback) {
        var data = this.responseData.data;
        //console.log(data);
        var header = data.headers["content-type"];
        this.expect(contentTmp).to.be.equal(data.text);
        callback();
    });

    this.Then(/^the result contains:$/, function (resultContent, callback) {
        var data = this.responseData.data;
        this.expect(JSON.stringify(data)).to.be.equal(resultContent);
        callback();
    });

    this.Then(/^I can see into the result an "([^"]*)" as$/, function (getterName, getterValue, callback) {
        var data = undefined;
        //console.log("RESULT: " + JSON.stringify(this.responseData));
        data = this.responseData.data;
        //console.log("SEE INTO THE RESULT DATA: " + JSON.stringify(data));
        var json_attr = this.findModel.getter_response(getterName);
        var value = JSONPath({ json: data, path: json_attr })[0];
        //console.log("response data: " + JSON.stringify(value));
        //console.log("getterValue: " + getterValue);
        this.expect(JSON.stringify(value)).to.be.equal(getterValue);
        callback();
    });

}