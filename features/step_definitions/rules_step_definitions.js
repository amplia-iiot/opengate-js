'use strict';

module.exports = function () {

    this.When(/^I want to (manage|delete) the next rule configuration from organization "([^"]*)" and channel "([^"]*)":$/, function (action, organization, channel, ruleConfigurationData) {
        var _this = this;
        _this.error = undefined;
        _this.responseData = undefined;

        function digestResponseData(response) {
            //console.log(JSON.stringify(response));
            _this.responseData = response;
            _this.error = undefined;
        }

        function digestErrorData(response) {
            console.log("digestErrorData");
            _this.error = response;
            _this.responseData = response;

        }

        try {
            var ruleConfiguration = this.ogapi.ruleConfigurationBuilder(organization, channel, JSON.parse(ruleConfigurationData));


            if (action === 'manage') {
                return ruleConfiguration
                    .withEnabled(false)
                    .withOpen(false)
                    .condition("datastreamCurrentValueThreshold")
                    .setParameterValue("threshold", "-100").parent()

                    .condition("datastreamCurrentValueThreshold")
                    .setParameterValue("datastream_name", null).parent()

                    .condition("datastreamCurrentValueThreshold")
                    .setParameterValue("curvalue_operator", undefined).parent()

                    .condition("datastreamCurrentValueThreshold")
                    .setParameterValue("prevalue_operator").parent()

                    .condition("datastreamCurrentValueThreshold")
                    .setDelay(99999).parent()
                    .notification("datastreamCurrentValueThreshold")
                    .setEnabled(false).setBearerRecipients("snmp", ["172.19.17.240;162"]).parent()
                    .update().then(digestResponseData).catch(digestErrorData);
            } else if (action === 'delete') {
                return ruleConfiguration.delete().then(digestResponseData).catch(digestErrorData);
            }
        } catch (err) {
            _this.error = err;
            console.log("err");
            return;
        }

    });
};