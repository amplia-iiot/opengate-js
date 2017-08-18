module.exports = {

    util: function(utilName, ogapi, param, param2) {
        var utilsMath = {
            "alarms search": function(ogapi) {
                return ogapi.alarmsSearchBuilder();
            },
            "bundles search": function() {
                return ogapi.bundlesSearchBuilder();
            },
            "bundles builder": function(ogapi) {
                return ogapi.bundlesBuilder();
            },
            "bundle finder": function(ogapi) {
                return ogapi.newBundleFinder();
            },
            "certificates builder": function(ogapi) {
                return ogapi.certificatesBuilder();
            },
            "certificate finder": function(ogapi) {
                return ogapi.newCertificateFinder();
            },
            "certificates search": function(ogapi) {
                return ogapi.certificatesSearchBuilder();
            },
            "channel finder": function(ogapi) {
                return ogapi.newChannelFinder();
            },
            "channels builder": function(ogapi) {
                return ogapi.channelsBuilder();
            },
            "channels search": function(ogapi) {
                return ogapi.channelsSearchBuilder();
            },
            "communications modules builder": function(ogapi) {
                return ogapi.communicationsModulesBuilder();
            },
            "communications module finder": function(ogapi) {
                return ogapi.newCommunicationsModuleFinder();
            },
            "communications module search": function(ogapi) {
                return ogapi.communicationsModulesSearchBuilder();
            },
            "datapoints search": function(ogapi) {
                return ogapi.datapointsSearchBuilder();
            },
            "datastreams search": function() {
                return ogapi.datastreamsSearchBuilder();
            },
            "device finder": function(ogapi) {
                return ogapi.newDeviceFinder();
            },
            "devices search": function(ogapi) {
                return ogapi.devicesSearchBuilder();
            },
            "devices builder": function(ogapi) {
                return ogapi.devicesBuilder();
            },
            "domains search": function(ogapi) {
                return ogapi.domainsSearchBuilder();
            },
            "domains builder": function(ogapi) {
                return ogapi.domainsBuilder();
            },
            "domains finder": function(ogapi) {
                return ogapi.newDomainFinder();
            },
            "hardwares search": function(ogapi) {
                return ogapi.hardwaresSearchBuilder();
            },
            "operation finder": function(ogapi) {
                return ogapi.newOperationFinder();
            },
            "organization finder": function(ogapi) {
                return ogapi.newOrganizationFinder();
            },
            "organizations builder": function(ogapi) {
                return ogapi.organizationsBuilder();
            },
            "softwares search": function(ogapi) {
                return ogapi.softwaresSearchBuilder();
            },
            "subscriptions builder": function(ogapi) {
                return ogapi.subscriptionsBuilder();
            },
            "subscriptions search": function(ogapi) {
                return ogapi.subscriptionsSearchBuilder();
            },
            "subscribers builder": function(ogapi) {
                return ogapi.subscribersBuilder();
            },
            "subscribers search": function(ogapi) {
                return ogapi.subscribersSearchBuilder();
            },
            "user finder": function(ogapi) {
                return ogapi.newUserFinder();
            },
            "users builder": function(ogapi) {
                return ogapi.usersBuilder();
            },
            "users search": function(ogapi) {
                return ogapi.usersSearchBuilder();
            },
            "operational status search": function(ogapi) {
                return ogapi.operationalStatusSearchBuilder();
            },
            "specific type search": function(ogapi) {
                return ogapi.specificTypeSearchBuilder();
            },
            "administrative state search": function(ogapi) {
                return ogapi.administrativeStateSearchBuilder();
            },
            "communications module type search": function(ogapi) {
                return ogapi.communicationsModuleTypeSearchBuilder();
            },
            "fields definition search": function(ogapi) {
                return ogapi.fieldsDefinitionSearchBuilder();
            },
            "mobile phone provider search": function(ogapi) {
                return ogapi.mobilePhoneProviderSearchBuilder();
            },
            "IoT datastream period search": function(ogapi) {
                return ogapi.ioTDatastreamPeriodSearchBuilder();
            },
            "IoT datastream access search": function(ogapi) {
                return ogapi.ioTDatastreamAccessSearchBuilder();
            },
            "IoT datastream storage period search": function(ogapi) {
                return ogapi.ioTDatastreamStoragePeriodSearchBuilder();
            },
            "datamodels builder": function(ogapi, param) {
                return ogapi.datamodelsBuilder(param);
            },
            "datamodels helper": function(ogapi, param, param2) {
                return ogapi.datamodelsHelper(param, param2);
            },
            "datamodels finder": function(ogapi) {
                return ogapi.newDatamodelsFinder();
            },
            "datastreams builder": function() {
                return ogapi.datastreamsBuilder();
            },
            "qratings builder": function() {
                return ogapi.qratingsBuilder();
            },
            "deviceMessage builder": function(ogapi) {
                return ogapi.deviceMessageBuilder();
            },
            "datastream": function() {
                return ogapi.datastreamBuilder();
            },
            "datapoints message": function() {
                return ogapi.datapointsBuilder();
            },
            "hardware": function() {
                return ogapi.hardwareMessageBuilder();
            },
            "software": function() {
                return ogapi.softwareMessageBuilder();
            },
            "cpuUsage": function() {
                return ogapi.usageMessageBuilder();
            },
            "ram": function() {
                return ogapi.storageMessageBuilder();
            },
            "volatilStorage": function() {
                return ogapi.storageMessageBuilder();
            },
            "nonVolatilStorage": function() {
                return ogapi.storageMessageBuilder();
            },
            "powerSupply": function() {
                return ogapi.powerSupplyMessageBuilder();
            },
            "commsModuleMessage": function() {
                return ogapi.commsModuleMessageMessageBuilder();
            },
            "mobile": function() {
                return ogapi.mobileMessageMessageBuilder();
            },
            "subscriber": function() {
                return ogapi.subscriberMessageBuilder();
            },
            "subscription": function() {
                return ogapi.subscriptionMessageBuilder();
            },
            "rule configurations finder": function(ogapi) {
                return ogapi.newRuleConfigurationsFinder();
            },
            "rule configuration builder": function(ogapi) {
                return ogapi.ruleConfigurationBuilder();
            },
            "rule configuration actions": function(ogapi, organization, channel, name) {
                return ogapi.newRuleConfigurationsActions(organization, channel, name);
            },
            "executions search": function() {
                return ogapi.executionsSearchBuilder();
            },
            "operation actions": function(ogapi, param) {
                return ogapi.newOperationActions(param);
            },
            "operations search": function() {
                return ogapi.operationsSearchBuilder();
            },
            "iot devices search": function() {
                return ogapi.ioTDevicesSearchBuilder();
            },
            "datamodels search": function() {
                return ogapi.datamodelsSearchBuilder();
            },
            "workgroups builder": function() {
                return ogapi.workgroupsBuilder();
            },
            "workgroups finder": function() {
                return ogapi.newWorkgroupFinder();
            },
            "workgroups search": function() {
                return ogapi.workgroupsSearchBuilder();
            },
            "workgroup relations builder": function() {
                return ogapi.workgroupRelationsBuilder();
            },
            "entities relations builder": function() {
                return ogapi.relationsBuilder();
            }
        };
        return utilsMath[utilName](ogapi, param, param2);
    }
}
