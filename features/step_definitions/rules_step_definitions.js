'use strict';

module.exports = function() {

    this.When(/^I want to manage the next rule configuration:$/, function(ruleConfigurationData) {
        var _this = this;
        _this.error = undefined;
        _this.responseData = undefined;

        function digestResponseData(response) {
            //console.log(JSON.stringify(response));
            _this.responseData = response;
        }

        function digestErrorData(response) {
            //console.log(JSON.stringify(response));
            _this.error = response;
            _this.responseData = response;
        }

        try {
            //console.log(ruleConfigurationData);
            //var ruleConfiguration = _this.util[_this.model_match("create").setters("rule configuration")("base_organization", "base_channel", JSON.parse(ruleConfigurationData);
            var ruleConfiguration = this.ogapi.ruleConfigurationBuilder("base_organization", "base_channel", JSON.parse(ruleConfigurationData));


            //console.log(JSON.stringify(ruleConfiguration._composeElement()));

            return ruleConfiguration
                .withEnabled(false)
                .condition("mobileCoverageLow_1")
                .setParameterValue("threshold", "-100").parent()
                .condition("mobileCoverageLow_2")
                .setDelay(99999).setParameterValue("threshold", "-500").parent()
                .notification("mobileCoverageLow")
                .setEnabled(false).setBearerRecipients("snmp", ["172.19.17.240;162"]).parent()
                .update().then(digestResponseData).catch(digestErrorData);

        } catch (err) {
            _this.error = err;
            //console.log("RE: " + err);
            return;
        }

    });
};