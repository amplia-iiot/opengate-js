module.exports = {

    util: function(utilName, ogapi, param, param2, param3) {
        var utilsMath = {
            "alarms search": function(ogapi) {
                return ogapi.alarmsSearchBuilder();
            },
            "basicTypes search": function(ogapi) {
                return ogapi.basicTypesSearchBuilder();
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
            "bulk execution finder": function(ogapi) {
                return ogapi.newBulkExecutionFinder();
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
            "datasets search": function(ogapi, param, param2) {
                return ogapi.datasetSearchBuilder(param, param2);
            },
            "timeseries search": function(ogapi, param, param2) {
                return ogapi.timeserieSearchBuilder(param, param2);
            },
            "timeseries downsampler builder": function(ogapi, param, param2) {
                return ogapi.timeserieDownsamplerBuilder(param, param2);
            },
            "timeseries dataset builder": function(ogapi, param, param2) {
                return ogapi.timeserieDatasetBuilder(param, param2);
            },
            "channel finder": function(ogapi) {
                return ogapi.newChannelFinder();
            },
            "areas search": function(ogapi) {
                return ogapi.areasSearchBuilder();
            },
            "area finder": function(ogapi) {
                return ogapi.newAreaFinder();
            },
            "channels builder": function(ogapi) {
                return ogapi.channelsBuilder();
            },
            "areas builder": function(ogapi) {
                return ogapi.areasBuilder();
            },
            "datasets builder": function(ogapi) {
                return ogapi.datasetsBuilder();
            },
            "timeseries builder": function(ogapi) {
                return ogapi.timeseriesBuilder();
            },
            "timeseries functions builder": function(ogapi) {
                return ogapi.timeseriesFunctionBuilder();
            },
            "channels search": function(ogapi) {
                return ogapi.channelsSearchBuilder();
            },
            "communications module finder": function(ogapi) {
                return ogapi.newCommunicationsModuleFinder();
            },
            "datapoints search": function(ogapi) {
                return ogapi.datapointsSearchBuilder();
            },
            "datastreams search": function() {
                return ogapi.datastreamsSearchBuilder();
            },
            "entity finder": function(ogapi) {
                return ogapi.newEntityFinder();
            },
            "device finder": function(ogapi) {
                return ogapi.newDeviceFinder();
            },
            "subscription finder": function(ogapi) {
                return ogapi.newSubscriptionsFinder();
            },
            "subscriber finder": function(ogapi) {
                return ogapi.newSubscribersFinder();
            },
            "ticket finder": function(ogapi) {
                return ogapi.newTicketFinder();
            },
            "devices search": function(ogapi) {
                return ogapi.devicesSearchBuilder();
            },
            "operation type": function(ogapi, param){
                return ogapi.operationTypeBuilder(param);
            },
            "devices builder": function(ogapi, param) {
                return ogapi.entityBuilder.devicesBuilder(param);
            },
            "subscribers search": function(ogapi) {
                return ogapi.subscribersSearchBuilder();
            },
            "subscriptions search": function(ogapi) {
                return ogapi.subscriptionsSearchBuilder();
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
            "geocluster builder": function(ogapi){ 
                return ogapi.geoclusterBuilder(); 
            }, 
            "operation finder": function(ogapi) {
                return ogapi.newOperationFinder();
            },
            "ruleConfigurationsHelper finder": function(ogapi) {
                return ogapi.newRuleConfigurationsHelper();
            },
            "dataset finder": function(ogapi) {
                return ogapi.newDatasetFinder();
            },
            "timeserie finder": function(ogapi) {
                return ogapi.newTimeserieFinder();
            },
            "organization finder": function(ogapi) {
                return ogapi.newOrganizationFinder();
            },
            "organizations builder": function(ogapi) {
                return ogapi.organizationsBuilder();
            },
            "provision processors builder": function(ogapi) {
                return ogapi.provisionProcessorsBuilder();
            },
            "provision processors finder": function(ogapi) {
                return ogapi.newProvisionProcessorsFinder();
            },
            "executions history builder": function(ogapi) {
                return ogapi.executionsHistorySearchBuilder();
            },
            "softwares search": function(ogapi) {
                return ogapi.softwaresSearchBuilder();
            },
            "subscriptions builder": function(ogapi, param) {
                return ogapi.entityBuilder.subscriptionsBuilder(param);
            },
            "subscribers builder": function(ogapi, param) {
                return ogapi.entityBuilder.subscribersBuilder(param);
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
            "Ticket status search": function(ogapi) {
                return ogapi.ticketStatusSearchBuilder();
            },
            "Ticket priority search": function(ogapi) {
                return ogapi.ticketPrioritySearchBuilder();
            },
            "Ticket severity search": function(ogapi) {
                return ogapi.ticketSeveritySearchBuilder();
            },
            "Resource Type search": function(ogapi) {
                return ogapi.resourceTypeSearchBuilder();
            },
            "Allowed Resource Type search": function(ogapi) {
                return ogapi.allowedResourceTypeSearchBuilder();
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
                return ogapi.newRuleConfigurationsActions(organization, channel, param3);
            },
            "executions search": function() {
                return ogapi.executionsSearchBuilder();
            },
            "executions history search": function() {
                return ogapi.executionsHistorySearchBuilder();
            },
            "periodic operations search": function() {
                return ogapi.tasksSearchBuilder();
            },
            "operation actions": function(ogapi, param) {
                return ogapi.newOperationActions(param);
            },
            "operations search": function() {
                return ogapi.operationsSearchBuilder();
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
            },
            "entities search": function() {
                return ogapi.entitiesSearchBuilder();
            },
            "csv bulk builder": function(ogapi, param, param2) {
                return ogapi.entityBuilder.newCsvBulkBuilder(param, param2);
            },
            "bulk execution builder": function(ogapi, param, param2){
                return ogapi.bulkExecutionBuilder(param, param2);
            },
            "json bulk builder": function(ogapi, param, param2) {
                return ogapi.entityBuilder.newJsonBulkBuilder(param, param2);
            },
            "json flattened bulk builder": function(ogapi, param, param2) {
                return ogapi.entityBuilder.newJsonFlattenedBulkBuilder(param, param2);
            },
            "csv bulk async builder": function(ogapi, param, param2) {
                return ogapi.entityBuilder.newCsvBulkBuilder(param, param2, null, null, true);
            },
            "bulks search": function(ogapi) {
                return ogapi.bulkSearchBuilder();
            },
            "bulk executions search": function(ogapi) {
                return ogapi.bulkExecutionSearchBuilder();
            },
            "asset builder": function(ogapi, param) {
                return ogapi.entityBuilder.assetsBuilder(param);
            },
            "asset search": function(ogapi) {
                return ogapi.assetsSearchBuilder();
            },
            "tickets builder": function(ogapi, param) {
                return ogapi.entityBuilder.ticketsBuilder(param);
            },
            "ticket search": function(ogapi) {
                return ogapi.ticketsSearchBuilder();
            },
            "Country Codes search": function(ogapi) {
                return ogapi.countryCodesSearchBuilder();
            },
            "User Languages search": function(ogapi) {
                return ogapi.userLanguagesSearchBuilder();
            },
            "datasets catalog search": function(ogapi) {
                return ogapi.datasetsCatalogSearchBuilder();
            },
            "transformer builder": function(ogapi) {
                return ogapi.transformersBuilder();
            },
            "aimodel builder": function(ogapi) {
                return ogapi.aiModelsBuilder();
            },
            "manufacturers builder": function(ogapi) {
                return ogapi.manufacturersBuilder();
            },
            "manufacturer models builder": function(ogapi) {
                return ogapi.manufacturerModelsBuilder();
            }, 
            "countries finder": function(ogapi){
                return ogapi.newCountriesCatalog()
            },
            "connector functions catalog builder": function(ogapi){
                return ogapi.connectorFunctionsCatalogBuilder()
            },
            "connector functions catalog finder": function(ogapi){
                return ogapi.newConnectorFunctionsCatalogFinder()
            },
            "connector functions catalog": function(ogapi){
                return ogapi.newConnectorFunctionsCatalog()
            }
        };
        return utilsMath[utilName](ogapi, param, param2);
    }
}