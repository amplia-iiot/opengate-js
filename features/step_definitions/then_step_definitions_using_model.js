var jp = require('jsonpath');
var { Then } = require('cucumber');

Then(/^I can see into the result an "([^"]*)" as "([^"]*)"$/, function (getterName, getterValue, callback) {
    var data = this.responseData.data;
    var json_attr = this.findModel.getter_response(getterName);
    
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

Then(/^the content of json response must be:$/, function (contentTmp, callback) {
    var data = this.responseData.data;
    this.expect(contentTmp).to.be.equal(JSON.stringify(data));
    callback();
});

Then(/^the content of response must be:$/, function (tmpFile, contentTmp, callback) {
    var data = this.responseData.data;
    this.expect(contentTmp).to.be.equal(data);
    callback();
});

Then(/^the content of file "([^"]*)" must be:$/, function (tmpFile, contentTmp, callback) {
    var data = this.responseData.data;
    this.expect(contentTmp).to.be.equal(data.text);
    callback();
});

Then(/^the content of file "([^"]*)" must match:$/, function (tmpFile, contentTmp, callback) {
    var data = this.responseData.data;
    this.expect(data.text).to.match(new RegExp(contentTmp));
    callback();
});

Then(/^the result contains:$/, function (resultContent, callback) {
    var data = this.responseData.data;
    this.expect(JSON.stringify(data)).to.be.equal(resultContent);
    callback();
});

Then(/^I can see into the result an "([^"]*)" as$/, function (getterName, getterValue, callback) {
    var data;
    data = this.responseData.data;
    var json_attr = this.findModel.getter_response(getterName);
    var value = jp.value(data, json_attr);
    this.expect(JSON.stringify(value)).to.be.equal(getterValue);
    callback();
});