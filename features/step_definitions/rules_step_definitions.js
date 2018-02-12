'use strict';

module.exports = function() {

    this.When(/^I want to (manage|delete) the next rule configuration from organization "([^"]*)" and channel "([^"]*)":$/, function(action, organization, channel, ruleConfigurationData) {
        var _this = this;
        _this.error = undefined;
        _this.responseData = undefined;

        function digestResponseData(response) {
            //console.log(JSON.stringify(response));
            _this.responseData = response;
            _this.error = undefined;
        }

        function digestErrorData(response) {
            //console.log(JSON.stringify(response));
            _this.error = response;
            _this.responseData = response;
            
        }

        try {
            //console.log(ruleConfigurationData);
            //var ruleConfiguration = _this.util[_this.model_match("create").setters("rule configuration")("base_organization", "base_channel", JSON.parse(ruleConfigurationData);
            var ruleConfiguration = this.ogapi.ruleConfigurationBuilder(organization, channel, JSON.parse(ruleConfigurationData));


            //console.log(JSON.stringify(ruleConfiguration._composeElement()));
            if (action === 'manage') {
                return ruleConfiguration
                    .withEnabled(false)
                    .condition("mobileCoverageLow_1")
                    .setParameterValue("threshold", "-100").parent()
                    .condition("mobileCoverageLow_2")
                    .setDelay(99999).setParameterValue("threshold", "-500").parent()
                    .notification("mobileCoverageLow")
                    .setEnabled(false).setBearerRecipients("snmp", ["172.19.17.240;162"]).parent()
                    .update().then(digestResponseData).catch(digestErrorData);
            } else if (action === 'delete') {
                return ruleConfiguration.delete().then(digestResponseData).catch(digestErrorData);
            }
        } catch (err) {
            _this.error = err;
            return;
        }

    });
};