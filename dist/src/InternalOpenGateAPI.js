'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _operationsOperations = require('./operations/Operations');

var _operationsOperations2 = _interopRequireDefault(_operationsOperations);

var _usersUserFinder = require('./users/UserFinder');

var _usersUserFinder2 = _interopRequireDefault(_usersUserFinder);

var _geoclusterGeoclusterFinder = require('./geocluster/GeoclusterFinder');

var _geoclusterGeoclusterFinder2 = _interopRequireDefault(_geoclusterGeoclusterFinder);

var _geoclusterGeocluster = require('./geocluster/Geocluster');

var _geoclusterGeocluster2 = _interopRequireDefault(_geoclusterGeocluster);

var _securityCertificates = require('./security/Certificates');

var _securityCertificates2 = _interopRequireDefault(_securityCertificates);

var _usersUsers = require('./users/Users');

var _usersUsers2 = _interopRequireDefault(_usersUsers);

var _organizationsOrganizationFinder = require('./organizations/OrganizationFinder');

var _organizationsOrganizationFinder2 = _interopRequireDefault(_organizationsOrganizationFinder);

var _channelsChannelFinder = require('./channels/ChannelFinder');

var _channelsChannelFinder2 = _interopRequireDefault(_channelsChannelFinder);

var _searchingBuilderAreasSearchBuilder = require('./searching/builder/AreasSearchBuilder');

var _searchingBuilderAreasSearchBuilder2 = _interopRequireDefault(_searchingBuilderAreasSearchBuilder);

var _searchingBuilderDatasetsCatalogSearchBuilder = require('./searching/builder/DatasetsCatalogSearchBuilder');

var _searchingBuilderDatasetsCatalogSearchBuilder2 = _interopRequireDefault(_searchingBuilderDatasetsCatalogSearchBuilder);

var _areasAreaFinder = require('./areas/AreaFinder');

var _areasAreaFinder2 = _interopRequireDefault(_areasAreaFinder);

var _searchingBuilderBulkSearchBuilder = require('./searching/builder/BulkSearchBuilder');

var _searchingBuilderBulkSearchBuilder2 = _interopRequireDefault(_searchingBuilderBulkSearchBuilder);

var _searchingBuilderBulkExecutionSearchBuilder = require('./searching/builder/BulkExecutionSearchBuilder');

var _searchingBuilderBulkExecutionSearchBuilder2 = _interopRequireDefault(_searchingBuilderBulkExecutionSearchBuilder);

var _bulkBulkFinder = require('./bulk/BulkFinder');

var _bulkBulkFinder2 = _interopRequireDefault(_bulkBulkFinder);

var _bulkBulkExecutionFinder = require('./bulk/BulkExecutionFinder');

var _bulkBulkExecutionFinder2 = _interopRequireDefault(_bulkBulkExecutionFinder);

var _channelsChannels = require('./channels/Channels');

var _channelsChannels2 = _interopRequireDefault(_channelsChannels);

var _areasAreas = require('./areas/Areas');

var _areasAreas2 = _interopRequireDefault(_areasAreas);

var _datasetsDatasets = require('./datasets/Datasets');

var _datasetsDatasets2 = _interopRequireDefault(_datasetsDatasets);

var _timeseriesTimeseries = require('./timeseries/Timeseries');

var _timeseriesTimeseries2 = _interopRequireDefault(_timeseriesTimeseries);

var _searchingBuilderChannelsSearchBuilder = require('./searching/builder/ChannelsSearchBuilder');

var _searchingBuilderChannelsSearchBuilder2 = _interopRequireDefault(_searchingBuilderChannelsSearchBuilder);

var _rulesConfigurationRuleConfigurations = require('./rulesConfiguration/RuleConfigurations');

var _rulesConfigurationRuleConfigurations2 = _interopRequireDefault(_rulesConfigurationRuleConfigurations);

var _rulesConfigurationRuleConfigurationsFinder = require('./rulesConfiguration/RuleConfigurationsFinder');

var _rulesConfigurationRuleConfigurationsFinder2 = _interopRequireDefault(_rulesConfigurationRuleConfigurationsFinder);

var _rulesConfigurationRuleConfigurationsCatalog = require('./rulesConfiguration/RuleConfigurationsCatalog');

var _rulesConfigurationRuleConfigurationsCatalog2 = _interopRequireDefault(_rulesConfigurationRuleConfigurationsCatalog);

var _rulesConfigurationRuleConfigurationsHelper = require('./rulesConfiguration/RuleConfigurationsHelper');

var _rulesConfigurationRuleConfigurationsHelper2 = _interopRequireDefault(_rulesConfigurationRuleConfigurationsHelper);

var _datasetsDatasetFinder = require('./datasets/DatasetFinder');

var _datasetsDatasetFinder2 = _interopRequireDefault(_datasetsDatasetFinder);

var _timeseriesTimeseriesFinder = require('./timeseries/TimeseriesFinder');

var _timeseriesTimeseriesFinder2 = _interopRequireDefault(_timeseriesTimeseriesFinder);

var _timeseriesFunctionsCatalogTimeseriesFunctionFinder = require('./timeseriesFunctionsCatalog/TimeseriesFunctionFinder');

var _timeseriesFunctionsCatalogTimeseriesFunctionFinder2 = _interopRequireDefault(_timeseriesFunctionsCatalogTimeseriesFunctionFinder);

var _timeseriesFunctionsCatalogTimeseriesFunction = require('./timeseriesFunctionsCatalog/TimeseriesFunction');

var _timeseriesFunctionsCatalogTimeseriesFunction2 = _interopRequireDefault(_timeseriesFunctionsCatalogTimeseriesFunction);

var _timeseriesFunctionsCatalogTimeseriesFunctionsHelper = require('./timeseriesFunctionsCatalog/TimeseriesFunctionsHelper');

var _timeseriesFunctionsCatalogTimeseriesFunctionsHelper2 = _interopRequireDefault(_timeseriesFunctionsCatalogTimeseriesFunctionsHelper);

var _operationTypesOperationType = require('./operationTypes/OperationType');

var _operationTypesOperationType2 = _interopRequireDefault(_operationTypesOperationType);

var _operationTypesOperationTypeFinder = require('./operationTypes/OperationTypeFinder');

var _operationTypesOperationTypeFinder2 = _interopRequireDefault(_operationTypesOperationTypeFinder);

var _operationTypesOperationTypeCatalog = require('./operationTypes/OperationTypeCatalog');

var _operationTypesOperationTypeCatalog2 = _interopRequireDefault(_operationTypesOperationTypeCatalog);

var _securityCertificateFinder = require('./security/CertificateFinder');

var _securityCertificateFinder2 = _interopRequireDefault(_securityCertificateFinder);

var _operationsOperationFinder = require('./operations/OperationFinder');

var _operationsOperationFinder2 = _interopRequireDefault(_operationsOperationFinder);

var _searchingFilterBuilder = require('./searching/FilterBuilder');

var _searchingFilterBuilder2 = _interopRequireDefault(_searchingFilterBuilder);

var _searchingSelectBuilder = require('./searching/SelectBuilder');

var _searchingSelectBuilder2 = _interopRequireDefault(_searchingSelectBuilder);

var _operationsOperationActions = require('./operations/OperationActions');

var _operationsOperationActions2 = _interopRequireDefault(_operationsOperationActions);

var _operationsPeriodicityActions = require('./operations/PeriodicityActions');

var _operationsPeriodicityActions2 = _interopRequireDefault(_operationsPeriodicityActions);

var _utilExpression = require('./util/Expression');

var _utilExpression2 = _interopRequireDefault(_utilExpression);

var _utilSelectElement = require('./util/SelectElement');

var _utilSelectElement2 = _interopRequireDefault(_utilSelectElement);

var _searchingBuilderRawSearchBuilder = require('./searching/builder/RawSearchBuilder');

var _searchingBuilderRawSearchBuilder2 = _interopRequireDefault(_searchingBuilderRawSearchBuilder);

var _searchingBuilderDevicesSearchBuilder = require('./searching/builder/DevicesSearchBuilder');

var _searchingBuilderDevicesSearchBuilder2 = _interopRequireDefault(_searchingBuilderDevicesSearchBuilder);

var _searchingBuilderSubscribersSearchBuilder = require('./searching/builder/SubscribersSearchBuilder');

var _searchingBuilderSubscribersSearchBuilder2 = _interopRequireDefault(_searchingBuilderSubscribersSearchBuilder);

var _searchingBuilderSubscriptionsSearchBuilder = require('./searching/builder/SubscriptionsSearchBuilder');

var _searchingBuilderSubscriptionsSearchBuilder2 = _interopRequireDefault(_searchingBuilderSubscriptionsSearchBuilder);

var _searchingBuilderAssetsSearchBuilder = require('./searching/builder/AssetsSearchBuilder');

var _searchingBuilderAssetsSearchBuilder2 = _interopRequireDefault(_searchingBuilderAssetsSearchBuilder);

var _searchingBuilderTicketsSearchBuilder = require('./searching/builder/TicketsSearchBuilder');

var _searchingBuilderTicketsSearchBuilder2 = _interopRequireDefault(_searchingBuilderTicketsSearchBuilder);

var _searchingBuilderTasksSearchBuilder = require('./searching/builder/TasksSearchBuilder');

var _searchingBuilderTasksSearchBuilder2 = _interopRequireDefault(_searchingBuilderTasksSearchBuilder);

var _searchingBuilderOperationsSearchBuilder = require('./searching/builder/OperationsSearchBuilder');

var _searchingBuilderOperationsSearchBuilder2 = _interopRequireDefault(_searchingBuilderOperationsSearchBuilder);

var _searchingBuilderExecutionsSearchBuilder = require('./searching/builder/ExecutionsSearchBuilder');

var _searchingBuilderExecutionsSearchBuilder2 = _interopRequireDefault(_searchingBuilderExecutionsSearchBuilder);

var _searchingBuilderExecutionsHistorySearchBuilder = require('./searching/builder/ExecutionsHistorySearchBuilder');

var _searchingBuilderExecutionsHistorySearchBuilder2 = _interopRequireDefault(_searchingBuilderExecutionsHistorySearchBuilder);

var _searchingBuilderAlarmsSearchBuilder = require('./searching/builder/AlarmsSearchBuilder');

var _searchingBuilderAlarmsSearchBuilder2 = _interopRequireDefault(_searchingBuilderAlarmsSearchBuilder);

var _searchingBuilderDatamodelsSearchBuilder = require('./searching/builder/DatamodelsSearchBuilder');

var _searchingBuilderDatamodelsSearchBuilder2 = _interopRequireDefault(_searchingBuilderDatamodelsSearchBuilder);

var _searchingBuilderFeedsSearchBuilder = require('./searching/builder/FeedsSearchBuilder');

var _searchingBuilderFeedsSearchBuilder2 = _interopRequireDefault(_searchingBuilderFeedsSearchBuilder);

var _searchingBuilderDatastreamsSearchBuilder = require('./searching/builder/DatastreamsSearchBuilder');

var _searchingBuilderDatastreamsSearchBuilder2 = _interopRequireDefault(_searchingBuilderDatastreamsSearchBuilder);

var _searchingBuilderDatapointsSearchBuilder = require('./searching/builder/DatapointsSearchBuilder');

var _searchingBuilderDatapointsSearchBuilder2 = _interopRequireDefault(_searchingBuilderDatapointsSearchBuilder);

var _searchingBuilderBundlesSearchBuilder = require('./searching/builder/BundlesSearchBuilder');

var _searchingBuilderBundlesSearchBuilder2 = _interopRequireDefault(_searchingBuilderBundlesSearchBuilder);

var _searchingBuilderCertificatesSearchBuilder = require('./searching/builder/CertificatesSearchBuilder');

var _searchingBuilderCertificatesSearchBuilder2 = _interopRequireDefault(_searchingBuilderCertificatesSearchBuilder);

var _searchingBuilderSoftwaresSearchBuilder = require('./searching/builder/SoftwaresSearchBuilder');

var _searchingBuilderSoftwaresSearchBuilder2 = _interopRequireDefault(_searchingBuilderSoftwaresSearchBuilder);

var _searchingBuilderOperationalStatusSearchBuilder = require('./searching/builder/OperationalStatusSearchBuilder');

var _searchingBuilderOperationalStatusSearchBuilder2 = _interopRequireDefault(_searchingBuilderOperationalStatusSearchBuilder);

var _searchingBuilderServiceGroupSearchBuilder = require('./searching/builder/ServiceGroupSearchBuilder');

var _searchingBuilderServiceGroupSearchBuilder2 = _interopRequireDefault(_searchingBuilderServiceGroupSearchBuilder);

var _searchingBuilderAdministrativeStateSearchBuilder = require('./searching/builder/AdministrativeStateSearchBuilder');

var _searchingBuilderAdministrativeStateSearchBuilder2 = _interopRequireDefault(_searchingBuilderAdministrativeStateSearchBuilder);

var _searchingBuilderCommunicationsModuleTypeSearchBuilder = require('./searching/builder/CommunicationsModuleTypeSearchBuilder');

var _searchingBuilderCommunicationsModuleTypeSearchBuilder2 = _interopRequireDefault(_searchingBuilderCommunicationsModuleTypeSearchBuilder);

var _searchingBuilderFieldsDefinitionSearchBuilder = require('./searching/builder/FieldsDefinitionSearchBuilder');

var _searchingBuilderFieldsDefinitionSearchBuilder2 = _interopRequireDefault(_searchingBuilderFieldsDefinitionSearchBuilder);

var _searchingBuilderBasicTypesSearchBuilder = require('./searching/builder/BasicTypesSearchBuilder');

var _searchingBuilderBasicTypesSearchBuilder2 = _interopRequireDefault(_searchingBuilderBasicTypesSearchBuilder);

var _searchingBuilderMobilePhoneProviderSearchBuilder = require('./searching/builder/MobilePhoneProviderSearchBuilder');

var _searchingBuilderMobilePhoneProviderSearchBuilder2 = _interopRequireDefault(_searchingBuilderMobilePhoneProviderSearchBuilder);

var _searchingBuilderIoTDatastreamPeriodSearchBuilder = require('./searching/builder/IoTDatastreamPeriodSearchBuilder');

var _searchingBuilderIoTDatastreamPeriodSearchBuilder2 = _interopRequireDefault(_searchingBuilderIoTDatastreamPeriodSearchBuilder);

var _searchingBuilderResourceTypeSearchBuilder = require('./searching/builder/ResourceTypeSearchBuilder');

var _searchingBuilderResourceTypeSearchBuilder2 = _interopRequireDefault(_searchingBuilderResourceTypeSearchBuilder);

var _searchingBuilderAllowedResourceTypeSearchBuilder = require('./searching/builder/AllowedResourceTypeSearchBuilder');

var _searchingBuilderAllowedResourceTypeSearchBuilder2 = _interopRequireDefault(_searchingBuilderAllowedResourceTypeSearchBuilder);

var _searchingBuilderIoTDatastreamAccessSearchBuilder = require('./searching/builder/IoTDatastreamAccessSearchBuilder');

var _searchingBuilderIoTDatastreamAccessSearchBuilder2 = _interopRequireDefault(_searchingBuilderIoTDatastreamAccessSearchBuilder);

var _searchingBuilderIoTDatastreamStoragePeriodSearchBuilder = require('./searching/builder/IoTDatastreamStoragePeriodSearchBuilder');

var _searchingBuilderIoTDatastreamStoragePeriodSearchBuilder2 = _interopRequireDefault(_searchingBuilderIoTDatastreamStoragePeriodSearchBuilder);

var _searchingBuilderTicketSeveritySearchBuilder = require('./searching/builder/TicketSeveritySearchBuilder');

var _searchingBuilderTicketSeveritySearchBuilder2 = _interopRequireDefault(_searchingBuilderTicketSeveritySearchBuilder);

var _searchingBuilderTicketPrioritySearchBuilder = require('./searching/builder/TicketPrioritySearchBuilder');

var _searchingBuilderTicketPrioritySearchBuilder2 = _interopRequireDefault(_searchingBuilderTicketPrioritySearchBuilder);

var _searchingBuilderTicketStatusSearchBuilder = require('./searching/builder/TicketStatusSearchBuilder');

var _searchingBuilderTicketStatusSearchBuilder2 = _interopRequireDefault(_searchingBuilderTicketStatusSearchBuilder);

var _searchingBuilderRulesSearchBuilder = require('./searching/builder/RulesSearchBuilder');

var _searchingBuilderRulesSearchBuilder2 = _interopRequireDefault(_searchingBuilderRulesSearchBuilder);

var _searchingBuilderOperationTypesSearchBuilder = require('./searching/builder/OperationTypesSearchBuilder');

var _searchingBuilderOperationTypesSearchBuilder2 = _interopRequireDefault(_searchingBuilderOperationTypesSearchBuilder);

var _searchingBuilderUsersSearchBuilder = require('./searching/builder/UsersSearchBuilder');

var _searchingBuilderUsersSearchBuilder2 = _interopRequireDefault(_searchingBuilderUsersSearchBuilder);

var _searchingBuilderDomainsSearchBuilder = require('./searching/builder/DomainsSearchBuilder');

var _searchingBuilderDomainsSearchBuilder2 = _interopRequireDefault(_searchingBuilderDomainsSearchBuilder);

var _searchingBuilderPlansSearchBuilder = require('./searching/builder/PlansSearchBuilder');

var _searchingBuilderPlansSearchBuilder2 = _interopRequireDefault(_searchingBuilderPlansSearchBuilder);

var _searchingBuilderDevicesPlansSearchBuilder = require('./searching/builder/DevicesPlansSearchBuilder');

var _searchingBuilderDevicesPlansSearchBuilder2 = _interopRequireDefault(_searchingBuilderDevicesPlansSearchBuilder);

var _bundlesBundles = require('./bundles/Bundles');

var _bundlesBundles2 = _interopRequireDefault(_bundlesBundles);

var _bundlesBundleFinder = require('./bundles/BundleFinder');

var _bundlesBundleFinder2 = _interopRequireDefault(_bundlesBundleFinder);

var _organizationsOrganizations = require('./organizations/Organizations');

var _organizationsOrganizations2 = _interopRequireDefault(_organizationsOrganizations);

var _domainsDomains = require('./domains/Domains');

var _domainsDomains2 = _interopRequireDefault(_domainsDomains);

var _domainsDomainsFinder = require('./domains/DomainsFinder');

var _domainsDomainsFinder2 = _interopRequireDefault(_domainsDomainsFinder);

var _entitiesDeviceFinder = require('./entities/DeviceFinder');

var _entitiesDeviceFinder2 = _interopRequireDefault(_entitiesDeviceFinder);

var _entitiesTicketFinder = require('./entities/TicketFinder');

var _entitiesTicketFinder2 = _interopRequireDefault(_entitiesTicketFinder);

var _entitiesSubscriptionsFinder = require('./entities/SubscriptionsFinder');

var _entitiesSubscriptionsFinder2 = _interopRequireDefault(_entitiesSubscriptionsFinder);

var _entitiesSubscribersFinder = require('./entities/SubscribersFinder');

var _entitiesSubscribersFinder2 = _interopRequireDefault(_entitiesSubscribersFinder);

var _collectionDevicesDeviceMessage = require('./collection/devices/DeviceMessage');

var _collectionDevicesDeviceMessage2 = _interopRequireDefault(_collectionDevicesDeviceMessage);

var _collectionDevicesCollectDatastreams = require('./collection/devices/collect/Datastreams');

var _collectionDevicesCollectDatastreams2 = _interopRequireDefault(_collectionDevicesCollectDatastreams);

var _collectionDevicesCollectDatapoint = require('./collection/devices/collect/Datapoint');

var _collectionDevicesCollectDatapoint2 = _interopRequireDefault(_collectionDevicesCollectDatapoint);

var _collectionDevicesCollectHardware = require('./collection/devices/collect/Hardware');

var _collectionDevicesCollectHardware2 = _interopRequireDefault(_collectionDevicesCollectHardware);

var _collectionDevicesCollectSoftware = require('./collection/devices/collect/Software');

var _collectionDevicesCollectSoftware2 = _interopRequireDefault(_collectionDevicesCollectSoftware);

var _collectionDevicesCollectStorage = require('./collection/devices/collect/Storage');

var _collectionDevicesCollectStorage2 = _interopRequireDefault(_collectionDevicesCollectStorage);

var _collectionDevicesCollectUsage = require('./collection/devices/collect/Usage');

var _collectionDevicesCollectUsage2 = _interopRequireDefault(_collectionDevicesCollectUsage);

var _collectionDevicesCollectPowerSupply = require('./collection/devices/collect/PowerSupply');

var _collectionDevicesCollectPowerSupply2 = _interopRequireDefault(_collectionDevicesCollectPowerSupply);

var _collectionDevicesCollectCommsModuleMessage = require('./collection/devices/collect/CommsModuleMessage');

var _collectionDevicesCollectCommsModuleMessage2 = _interopRequireDefault(_collectionDevicesCollectCommsModuleMessage);

var _collectionDevicesCollectMobile = require('./collection/devices/collect/Mobile');

var _collectionDevicesCollectMobile2 = _interopRequireDefault(_collectionDevicesCollectMobile);

var _collectionDevicesCollectSubscriber = require('./collection/devices/collect/Subscriber');

var _collectionDevicesCollectSubscriber2 = _interopRequireDefault(_collectionDevicesCollectSubscriber);

var _collectionDevicesCollectSubscription = require('./collection/devices/collect/Subscription');

var _collectionDevicesCollectSubscription2 = _interopRequireDefault(_collectionDevicesCollectSubscription);

var _workgroupsWorkgroupRelations = require('./workgroups/WorkgroupRelations');

var _workgroupsWorkgroupRelations2 = _interopRequireDefault(_workgroupsWorkgroupRelations);

var _workgroupsWorkgroups = require('./workgroups/Workgroups');

var _workgroupsWorkgroups2 = _interopRequireDefault(_workgroupsWorkgroups);

var _workgroupsWorkgroupFinder = require('./workgroups/WorkgroupFinder');

var _workgroupsWorkgroupFinder2 = _interopRequireDefault(_workgroupsWorkgroupFinder);

var _searchingBuilderWorkgroupsSearchBuilder = require('./searching/builder/WorkgroupsSearchBuilder');

var _searchingBuilderWorkgroupsSearchBuilder2 = _interopRequireDefault(_searchingBuilderWorkgroupsSearchBuilder);

var _workgroupsWorkgroupRelationsFinder = require('./workgroups/WorkgroupRelationsFinder');

var _workgroupsWorkgroupRelationsFinder2 = _interopRequireDefault(_workgroupsWorkgroupRelationsFinder);

var _searchingBuilderUserProfilesSearchBuilder = require('./searching/builder/UserProfilesSearchBuilder');

var _searchingBuilderUserProfilesSearchBuilder2 = _interopRequireDefault(_searchingBuilderUserProfilesSearchBuilder);

var _iotDatamodelsDatamodels = require('./iot/datamodels/Datamodels');

var _iotDatamodelsDatamodels2 = _interopRequireDefault(_iotDatamodelsDatamodels);

var _iotDatamodelsDatamodelsHelper = require('./iot/datamodels/DatamodelsHelper');

var _iotDatamodelsDatamodelsHelper2 = _interopRequireDefault(_iotDatamodelsDatamodelsHelper);

var _iotDatamodelsDatamodelsFinder = require('./iot/datamodels/DatamodelsFinder');

var _iotDatamodelsDatamodelsFinder2 = _interopRequireDefault(_iotDatamodelsDatamodelsFinder);

var _iotCatalogDatastream = require('./iot/catalog/Datastream');

var _iotCatalogDatastream2 = _interopRequireDefault(_iotCatalogDatastream);

var _iotCatalogQrating = require('./iot/catalog/Qrating');

var _iotCatalogQrating2 = _interopRequireDefault(_iotCatalogQrating);

var _provisionEntitiesEntityBuilder = require('./provision/entities/EntityBuilder');

var _provisionEntitiesEntityBuilder2 = _interopRequireDefault(_provisionEntitiesEntityBuilder);

var _provisionBulkBulkExecutionBuilder = require('./provision/bulk/BulkExecutionBuilder');

var _provisionBulkBulkExecutionBuilder2 = _interopRequireDefault(_provisionBulkBulkExecutionBuilder);

var _searchingBuilderEntitiesSearchBuilder = require('./searching/builder/EntitiesSearchBuilder');

var _searchingBuilderEntitiesSearchBuilder2 = _interopRequireDefault(_searchingBuilderEntitiesSearchBuilder);

var _searchingBuilderDatasetEntitiesSearchBuilder = require('./searching/builder/DatasetEntitiesSearchBuilder');

var _searchingBuilderDatasetEntitiesSearchBuilder2 = _interopRequireDefault(_searchingBuilderDatasetEntitiesSearchBuilder);

var _searchingBuilderDatasetSearchBuilder = require('./searching/builder/DatasetSearchBuilder');

var _searchingBuilderDatasetSearchBuilder2 = _interopRequireDefault(_searchingBuilderDatasetSearchBuilder);

var _searchingBuilderTimeserieSearchBuilder = require('./searching/builder/TimeserieSearchBuilder');

var _searchingBuilderTimeserieSearchBuilder2 = _interopRequireDefault(_searchingBuilderTimeserieSearchBuilder);

var _searchingBuilderTimeserieDownsamplerBuilder = require('./searching/builder/TimeserieDownsamplerBuilder');

var _searchingBuilderTimeserieDownsamplerBuilder2 = _interopRequireDefault(_searchingBuilderTimeserieDownsamplerBuilder);

var _searchingBuilderTimeserieDatasetBuilder = require('./searching/builder/TimeserieDatasetBuilder');

var _searchingBuilderTimeserieDatasetBuilder2 = _interopRequireDefault(_searchingBuilderTimeserieDatasetBuilder);

var _searchingBuilderCountryCodesSearchBuilder = require('./searching/builder/CountryCodesSearchBuilder');

var _searchingBuilderCountryCodesSearchBuilder2 = _interopRequireDefault(_searchingBuilderCountryCodesSearchBuilder);

var _searchingBuilderTimezoneSearchBuilder = require('./searching/builder/TimezoneSearchBuilder');

var _searchingBuilderTimezoneSearchBuilder2 = _interopRequireDefault(_searchingBuilderTimezoneSearchBuilder);

var _searchingBuilderUserLanguagesSearchBuilder = require('./searching/builder/UserLanguagesSearchBuilder');

var _searchingBuilderUserLanguagesSearchBuilder2 = _interopRequireDefault(_searchingBuilderUserLanguagesSearchBuilder);

var _provisionProcessorsProvisionProcessors = require('./provisionProcessors/provisionProcessors');

var _provisionProcessorsProvisionProcessors2 = _interopRequireDefault(_provisionProcessorsProvisionProcessors);

var _provisionProcessorsProvisionProcessorsFinder = require('./provisionProcessors/provisionProcessorsFinder');

var _provisionProcessorsProvisionProcessorsFinder2 = _interopRequireDefault(_provisionProcessorsProvisionProcessorsFinder);

var _entitiesEntityFinder = require('./entities/EntityFinder');

var _entitiesEntityFinder2 = _interopRequireDefault(_entitiesEntityFinder);

var _alarmsAlarmActions = require('./alarms/AlarmActions');

var _alarmsAlarmActions2 = _interopRequireDefault(_alarmsAlarmActions);

var _superagent2 = require('superagent');

var _superagent3 = _interopRequireDefault(_superagent2);

var _connectorsFunctionsConfigurationConnectorFunctionsHelper = require('./connectorsFunctions/configuration/ConnectorFunctionsHelper');

var _connectorsFunctionsConfigurationConnectorFunctionsHelper2 = _interopRequireDefault(_connectorsFunctionsConfigurationConnectorFunctionsHelper);

var _connectorsFunctionsConfigurationConnectorFunctionsFinder = require('./connectorsFunctions/configuration/ConnectorFunctionsFinder');

var _connectorsFunctionsConfigurationConnectorFunctionsFinder2 = _interopRequireDefault(_connectorsFunctionsConfigurationConnectorFunctionsFinder);

var _connectorsFunctionsConfigurationConnectorFunctions = require('./connectorsFunctions/configuration/ConnectorFunctions');

var _connectorsFunctionsConfigurationConnectorFunctions2 = _interopRequireDefault(_connectorsFunctionsConfigurationConnectorFunctions);

var _connectorsFunctionsCatalogConnectorFunctions = require('./connectorsFunctions/catalog/ConnectorFunctions');

var _connectorsFunctionsCatalogConnectorFunctions2 = _interopRequireDefault(_connectorsFunctionsCatalogConnectorFunctions);

var _connectorsFunctionsCatalogConnectorFunctionsCatalogFinder = require('./connectorsFunctions/catalog/ConnectorFunctionsCatalogFinder');

var _connectorsFunctionsCatalogConnectorFunctionsCatalogFinder2 = _interopRequireDefault(_connectorsFunctionsCatalogConnectorFunctionsCatalogFinder);

var _connectorsFunctionsCatalogConnectorFunctionsCatalog = require('./connectorsFunctions/catalog/ConnectorFunctionsCatalog');

var _connectorsFunctionsCatalogConnectorFunctionsCatalog2 = _interopRequireDefault(_connectorsFunctionsCatalogConnectorFunctionsCatalog);

var _pipelinesPipelineFinder = require('./pipelines/PipelineFinder');

var _pipelinesPipelineFinder2 = _interopRequireDefault(_pipelinesPipelineFinder);

var _transformersTransformerFinder = require('./transformers/TransformerFinder');

var _transformersTransformerFinder2 = _interopRequireDefault(_transformersTransformerFinder);

var _AIModelsAIModelsFinder = require('./AIModels/AIModelsFinder');

var _AIModelsAIModelsFinder2 = _interopRequireDefault(_AIModelsAIModelsFinder);

var _transformersTransformers = require('./transformers/Transformers');

var _transformersTransformers2 = _interopRequireDefault(_transformersTransformers);

var _AIModelsAIModels = require('./AIModels/AIModels');

var _AIModelsAIModels2 = _interopRequireDefault(_AIModelsAIModels);

var _pipelinesPipelines = require('./pipelines/Pipelines');

var _pipelinesPipelines2 = _interopRequireDefault(_pipelinesPipelines);

var _manufacturersManufacturer = require('./manufacturers/Manufacturer');

var _manufacturersManufacturer2 = _interopRequireDefault(_manufacturersManufacturer);

var _manufacturersModel = require('./manufacturers/Model');

var _manufacturersModel2 = _interopRequireDefault(_manufacturersModel);

var _manufacturersManufacturerFinder = require('./manufacturers/ManufacturerFinder');

var _manufacturersManufacturerFinder2 = _interopRequireDefault(_manufacturersManufacturerFinder);

var _manufacturersModelFinder = require('./manufacturers/ModelFinder');

var _manufacturersModelFinder2 = _interopRequireDefault(_manufacturersModelFinder);

var _organization_manufacturerManufacturer = require('./organization_manufacturer/Manufacturer');

var _organization_manufacturerManufacturer2 = _interopRequireDefault(_organization_manufacturerManufacturer);

var _organization_manufacturerModel = require('./organization_manufacturer/Model');

var _organization_manufacturerModel2 = _interopRequireDefault(_organization_manufacturerModel);

var _organization_manufacturerManufacturerFinder = require('./organization_manufacturer/ManufacturerFinder');

var _organization_manufacturerManufacturerFinder2 = _interopRequireDefault(_organization_manufacturerManufacturerFinder);

var _organization_manufacturerModelFinder = require('./organization_manufacturer/ModelFinder');

var _organization_manufacturerModelFinder2 = _interopRequireDefault(_organization_manufacturerModelFinder);

var _notebookSchedulerNotebookFinder = require('./notebookScheduler/NotebookFinder');

var _notebookSchedulerNotebookFinder2 = _interopRequireDefault(_notebookSchedulerNotebookFinder);

var _notebookSchedulerSchedulerFinder = require('./notebookScheduler/SchedulerFinder');

var _notebookSchedulerSchedulerFinder2 = _interopRequireDefault(_notebookSchedulerSchedulerFinder);

var _notebookSchedulerNotebookLauncher = require('./notebookScheduler/NotebookLauncher');

var _notebookSchedulerNotebookLauncher2 = _interopRequireDefault(_notebookSchedulerNotebookLauncher);

var _notebookSchedulerNotebookScheduler = require('./notebookScheduler/NotebookScheduler');

var _notebookSchedulerNotebookScheduler2 = _interopRequireDefault(_notebookSchedulerNotebookScheduler);

var _provisionCountryCountriesCatalog = require('./provision/country/CountriesCatalog');

var _provisionCountryCountriesCatalog2 = _interopRequireDefault(_provisionCountryCountriesCatalog);

var RequestEndMonkeyPatching = (function () {
    var beforeStart = undefined;
    var end = _superagent3['default'].Request.prototype.end;

    _superagent3['default'].Request.prototype.end = function (cb) {
        if (beforeStart && beforeStart.call) beforeStart(this);
        return end.call(this, function (err, res) {
            if (typeof cb !== 'function') {
                return;
            }
            cb(err, res);
        });
    };

    return function setCallback(cb) {
        beforeStart = cb;
    };
})();
/**
 * This is a abstract class, it must be extended to another class that defined the backend, it will be used on request to Opengate North API by browser or nodejs server
 */

var InternalOpenGateAPI = (function () {
    /**
     * @param {{ url: string,port: string,version: string,apiKey: string}} _options - this is configuration about Opengate North API.
     * @param {AmpliaREST} ampliaREST - this is a backend selected to manage a request to Opengate North API.
     */

    function InternalOpenGateAPI(northAmpliaREST, southAmpliaREST, _options) {
        _classCallCheck(this, InternalOpenGateAPI);

        if (this.constructor === InternalOpenGateAPI) {
            throw new Error("Cannot construct Abstract instances directly");
        }
        if (typeof northAmpliaREST !== "object") {
            throw new Error("Must instance mandatory parameter: northAmpliaREST");
        }
        if (typeof southAmpliaREST !== "object") {
            throw new Error("Must instance mandatory parameter: southAmpliaREST");
        }
        if (_options.hooks && _options.hooks.beforeStart && typeof _options.hooks.beforeStart === 'function') {
            RequestEndMonkeyPatching(_options.hooks.beforeStart);
        }
        this.Napi = northAmpliaREST;
        this.Sapi = southAmpliaREST;
        this.EX = _utilExpression2['default'];
        this.SE = _utilSelectElement2['default'];
        this.operations = new _operationsOperations2['default'](this);
        this.alarms = new _alarmsAlarmActions2['default'](this);
        this.entityBuilder = new _provisionEntitiesEntityBuilder2['default'](this);
    }

    /**
     * This return a util to find a user
     * @return {UserFinder}
     */

    _createClass(InternalOpenGateAPI, [{
        key: 'newUserFinder',
        value: function newUserFinder() {
            return new _usersUserFinder2['default'](this);
        }

        /**
         * This return a util to find a user
         * @return {GeoclusterFinder}
         */
    }, {
        key: 'newGeoclusterFinder',
        value: function newGeoclusterFinder() {
            return new _geoclusterGeoclusterFinder2['default'](this);
        }

        /**
         * This return a util to regenerate geloclouster
         * @return {Geocluster}
         */
    }, {
        key: 'geoclusterBuilder',
        value: function geoclusterBuilder() {
            return new _geoclusterGeocluster2['default'](this);
        }

        /**
         * This return a util to find a organization
         * @return {OrganizationFinder}
         */
    }, {
        key: 'newOrganizationFinder',
        value: function newOrganizationFinder() {
            return new _organizationsOrganizationFinder2['default'](this);
        }

        /**
         * This return a util to find a channel
         * @return {ChannelFinder}
         */
    }, {
        key: 'newChannelFinder',
        value: function newChannelFinder() {
            return new _channelsChannelFinder2['default'](this);
        }

        /**
         * This return a AreasSearchBuilder to build a specific AreasSearch
         * @return {AreasSearchBuilder}
         */
    }, {
        key: 'areasSearchBuilder',
        value: function areasSearchBuilder() {
            return new _searchingBuilderAreasSearchBuilder2['default'](this);
        }

        /**
         * This return a DatasetsCatalogSearchBuilder to build a specific DatasetsCatalogSearc
         * @return {DatasetsCatalogSearchBuilder}
         */
    }, {
        key: 'datasetsCatalogSearchBuilder',
        value: function datasetsCatalogSearchBuilder() {
            return new _searchingBuilderDatasetsCatalogSearchBuilder2['default'](this);
        }

        /**
         * This return a BulkSearchBuilder to build a specific BulkSearchBuilder
         * @return {BulkSearchBuilder}
         */
    }, {
        key: 'bulkSearchBuilder',
        value: function bulkSearchBuilder() {
            return new _searchingBuilderBulkSearchBuilder2['default'](this);
        }

        /**
         * This return a BulkExecutionSearchBuilder to build a specific bulk
         * @return {BulkExecutionSearchBuilder}
         */
    }, {
        key: 'bulkExecutionSearchBuilder',
        value: function bulkExecutionSearchBuilder() {
            return new _searchingBuilderBulkExecutionSearchBuilder2['default'](this);
        }

        /**
         * This return a util to find and download a bulk
         * @return {BulkFinder}
         */
    }, {
        key: 'newBulkFinder',
        value: function newBulkFinder() {
            return new _bulkBulkFinder2['default'](this);
        }

        /**
         * This return a util to find summary and download a bulk executions
         * @return {BulkFinder}
         */
    }, {
        key: 'newBulkExecutionFinder',
        value: function newBulkExecutionFinder() {
            return new _bulkBulkExecutionFinder2['default'](this);
        }

        /**
         * This return a util to find a area
         * @return {AreaFinder}
         */
    }, {
        key: 'newAreaFinder',
        value: function newAreaFinder() {
            return new _areasAreaFinder2['default'](this);
        }

        /**
         * This return a util to find a operation
         * @return {OperationFinder}
         */
    }, {
        key: 'newOperationFinder',
        value: function newOperationFinder() {
            return new _operationsOperationFinder2['default'](this);
        }

        /**
         * This return a util to find Operation Types
         * @return {OperationType}
         */
    }, {
        key: 'newOperationTypeFinder',
        value: function newOperationTypeFinder() {
            return new _operationTypesOperationTypeFinder2['default'](this);
        }

        /**
         * This return a util to find Operation Types Templates
         * @return {OperationTypeCatalog}
         */
    }, {
        key: 'newOperationTypeCatalog',
        value: function newOperationTypeCatalog() {
            return new _operationTypesOperationTypeCatalog2['default'](this);
        }

        /**
         * This return a util to find countries catalog
         * @return {CountriesCatalog}
         */
    }, {
        key: 'newCountriesCatalog',
        value: function newCountriesCatalog() {
            return new _provisionCountryCountriesCatalog2['default'](this);
        }

        /**
         * This return a util to update an Operation Type
         * @return {OperationType}
         */
    }, {
        key: 'operationTypeBuilder',
        value: function operationTypeBuilder(organization, name, operationTypeObj) {
            return new _operationTypesOperationType2['default'](this, organization, name, operationTypeObj);
        }

        /**
         * This return a util to find Rule Configurations
         * @return {RuleConfigurationsFinder}
         */
    }, {
        key: 'newRuleConfigurationsFinder',
        value: function newRuleConfigurationsFinder() {
            return new _rulesConfigurationRuleConfigurationsFinder2['default'](this);
        }

        /**
         * This return a util  RuleConfigurationsHelper
         * @return {RuleConfigurationsHelper
         */
    }, {
        key: 'newRuleConfigurationsHelper',
        value: function newRuleConfigurationsHelper() {
            return new _rulesConfigurationRuleConfigurationsHelper2['default'](this);
        }

        /**
         * This return a to find Dataset configuration
         * @return {DatasetFinder}
         */
    }, {
        key: 'newDatasetFinder',
        value: function newDatasetFinder() {
            return new _datasetsDatasetFinder2['default'](this);
        }

        /**
         * This return a to find Timeserie configuration
         * @return {TimeserieFinder}
         */
    }, {
        key: 'newTimeserieFinder',
        value: function newTimeserieFinder() {
            return new _timeseriesTimeseriesFinder2['default'](this);
        }

        /**
         * This return a util to find Rule Configurations Templates
         * @return {RuleConfigurationsCatalog}
         */
    }, {
        key: 'newRuleConfigurationsCatalog',
        value: function newRuleConfigurationsCatalog() {
            return new _rulesConfigurationRuleConfigurationsCatalog2['default'](this);
        }

        /**
         * This return a util to update a Rule Configuration
         * @return {RuleConfigurations}
         */
    }, {
        key: 'ruleConfigurationBuilder',
        value: function ruleConfigurationBuilder(organization, channel, name, ruleConfigObj) {
            return new _rulesConfigurationRuleConfigurations2['default'](this, organization, channel, name, ruleConfigObj);
        }

        /**
         * This return a util to launch actions on a rule
         * @param {!string} organization - organization name of the rule
         * @param {!string} channel - channel name of the rule
         * @param {!string} name - rule name
         * @return {RuleConfigurationsActions}
         */
        // newRuleConfigurationsActions(organization, channel, name) {
        //     return new RuleConfigurationsActions(this, organization, channel, name);
        // }

        /**
         * This return a util to find a certificate
         * @return {CertificateFinder}
         */
    }, {
        key: 'newCertificateFinder',
        value: function newCertificateFinder() {
            return new _securityCertificateFinder2['default'](this);
        }

        /**
         * This return a util to find a device
         * @return {DeviceFinder}
         */
    }, {
        key: 'newDeviceFinder',
        value: function newDeviceFinder() {
            return new _entitiesDeviceFinder2['default'](this);
        }

        /**
         * This return a util to find a ticket
         * @return {TicketFinder}
         */
    }, {
        key: 'newTicketFinder',
        value: function newTicketFinder() {
            return new _entitiesTicketFinder2['default'](this);
        }

        /**
         * This return a util to find a Subscription
         * @return {SubscriptionsFinder}
         */
    }, {
        key: 'newSubscriptionsFinder',
        value: function newSubscriptionsFinder() {
            return new _entitiesSubscriptionsFinder2['default'](this);
        }

        /**
         * This return a util to find a Subscriber
         * @return {SubscribersFinder}
         */
    }, {
        key: 'newSubscribersFinder',
        value: function newSubscribersFinder() {
            return new _entitiesSubscribersFinder2['default'](this);
        }
    }, {
        key: 'newEntityFinder',
        value: function newEntityFinder() {
            return new _entitiesEntityFinder2['default'](this);
        }

        /**
         * This return a util to create your own filter to make searching
         * @return {FilterBuilder}
         */
    }, {
        key: 'newFilterBuilder',
        value: function newFilterBuilder() {
            return new _searchingFilterBuilder2['default']();
        }

        /**
         * This return a util to create your own select to make searching
         * @return {SelectBuilder}
         */
    }, {
        key: 'newSelectBuilder',
        value: function newSelectBuilder() {
            return new _searchingSelectBuilder2['default']();
        }

        /**
         * Create custom search with custom url and raw filter
         * @return {RawSearchBuilder}
         */
    }, {
        key: 'rawSearchBuilder',
        value: function rawSearchBuilder() {
            return new _searchingBuilderRawSearchBuilder2['default'](this);
        }

        /**
         * This return a UsersSearchBuilder to build a specific UsersSearch
         * @return {UsersSearchBuilder}
         */
    }, {
        key: 'usersSearchBuilder',
        value: function usersSearchBuilder() {
            return new _searchingBuilderUsersSearchBuilder2['default'](this);
        }

        /**
         * This return a DomainsSearchBuilder to build a specific DomainsSearch
         * @return {DomainsSearchBuilder}
         */
    }, {
        key: 'domainsSearchBuilder',
        value: function domainsSearchBuilder() {
            return new _searchingBuilderDomainsSearchBuilder2['default'](this);
        }

        /**
         * This return a DevicesSearchBuilder to build a specific DeviceSearch
         * @return {DevicesSearchBuilder}
         */
    }, {
        key: 'devicesSearchBuilder',
        value: function devicesSearchBuilder() {
            return new _searchingBuilderDevicesSearchBuilder2['default'](this);
        }

        /**
         * This return a AssetsSearchBuilder to build a specific AssetSearch
         * @return {AssetsSearchBuilder}
         */
    }, {
        key: 'assetsSearchBuilder',
        value: function assetsSearchBuilder() {
            return new _searchingBuilderAssetsSearchBuilder2['default'](this);
        }

        /**
         * This return a SubscribersSearchBuilder to build a specific DeviceSearch
         * @return {SubscribersSearchBuilder}
         */
    }, {
        key: 'subscribersSearchBuilder',
        value: function subscribersSearchBuilder() {
            return new _searchingBuilderSubscribersSearchBuilder2['default'](this);
        }

        /**
         * This return a SubscriptionsSearchBuilder to build a specific DeviceSearch
         * @return {SubscriptionsSearchBuilder}
         */
    }, {
        key: 'subscriptionsSearchBuilder',
        value: function subscriptionsSearchBuilder() {
            return new _searchingBuilderSubscriptionsSearchBuilder2['default'](this);
        }

        /**
         * This return a TicketsSearchBuilder to build a specific TicketSearch
         */
    }, {
        key: 'ticketsSearchBuilder',
        value: function ticketsSearchBuilder() {
            return new _searchingBuilderTicketsSearchBuilder2['default'](this);
        }

        /**
         * This return a CommunicationsModuleTypeSearchBuilder to build a specific CommunicationsModuleTypeSearch
         * @return {CommunicationsModuleTypeSearchBuilder}
         */
    }, {
        key: 'communicationsModuleTypeSearchBuilder',
        value: function communicationsModuleTypeSearchBuilder() {
            return new _searchingBuilderCommunicationsModuleTypeSearchBuilder2['default'](this);
        }

        /**
         * This return a FieldsDefinitionSearchBuilder to build a specific FieldsDefinitionSearchBuilder
         * @return {FieldsDefinitionSearchBuilder}
         */
    }, {
        key: 'fieldsDefinitionSearchBuilder',
        value: function fieldsDefinitionSearchBuilder() {
            return new _searchingBuilderFieldsDefinitionSearchBuilder2['default'](this);
        }

        /**
         * This return a MobilePhoneProviderSearchBuilder to build a specific MobilePhoneProviderTypeSearch
         * @return {MobilePhoneProviderSearchBuilder}
         */
    }, {
        key: 'mobilePhoneProviderSearchBuilder',
        value: function mobilePhoneProviderSearchBuilder() {
            return new _searchingBuilderMobilePhoneProviderSearchBuilder2['default'](this);
        }

        /**
         * This return a IoTDatastreamPeriodSearchBuilder to build a specific IoTDatastreamPeriodSearchBuilder
         * @return {IoTDatastreamPeriodSearchBuilder}
         */
    }, {
        key: 'ioTDatastreamPeriodSearchBuilder',
        value: function ioTDatastreamPeriodSearchBuilder() {
            return new _searchingBuilderIoTDatastreamPeriodSearchBuilder2['default'](this);
        }

        /**
         * This return a ResourceTypeSearchBuilder to build a specific ResourceTypeSearchBuilder
         * @return {ResourceTypeSearchBuilder}
         */
    }, {
        key: 'resourceTypeSearchBuilder',
        value: function resourceTypeSearchBuilder() {
            return new _searchingBuilderResourceTypeSearchBuilder2['default'](this);
        }

        /**
         * This return a AllowedResourceTypeSearchBuilder to build a specific AllowedResourceTypeSearchBuilder
         * @return {AllowedResourceTypeSearchBuilder}
         */
    }, {
        key: 'allowedResourceTypeSearchBuilder',
        value: function allowedResourceTypeSearchBuilder() {
            return new _searchingBuilderAllowedResourceTypeSearchBuilder2['default'](this);
        }

        /**
         * This return a IoTDatastreamAccessSearchBuilder to build a specific IoTDatastreamAccessSearchBuilder
         * @return {IoTDatastreamAccessSearchBuilder}
         */
    }, {
        key: 'ioTDatastreamAccessSearchBuilder',
        value: function ioTDatastreamAccessSearchBuilder() {
            return new _searchingBuilderIoTDatastreamAccessSearchBuilder2['default'](this);
        }

        /**
         * This return a IoTDatastreamStoragePeriodSearchBuilder to build a specific IoTDatastreamStoragePeriodSearchBuilder
         * @return {IoTDatastreamStoragePeriodSearchBuilder}
         */
    }, {
        key: 'ioTDatastreamStoragePeriodSearchBuilder',
        value: function ioTDatastreamStoragePeriodSearchBuilder() {
            return new _searchingBuilderIoTDatastreamStoragePeriodSearchBuilder2['default'](this);
        }

        /**
         * This return a TicketSeveritySearchBuilder to build a specific TicketSeveritySearchBuilder
         * @return {TicketSeveritySearchBuilder}
         */
    }, {
        key: 'ticketSeveritySearchBuilder',
        value: function ticketSeveritySearchBuilder() {
            return new _searchingBuilderTicketSeveritySearchBuilder2['default'](this);
        }

        /**
         * This return a TicketPrioritySearchBuilder to build a specific TicketPrioritySearchBuilder
         * @return {TicketPrioritySearchBuilder}
         */
    }, {
        key: 'ticketPrioritySearchBuilder',
        value: function ticketPrioritySearchBuilder() {
            return new _searchingBuilderTicketPrioritySearchBuilder2['default'](this);
        }

        /**
         * This return a TicketStatusSearchBuilder to build a specific TicketStatusSearchBuilder
         * @return {TicketStatusSearchBuilder}
         */
    }, {
        key: 'ticketStatusSearchBuilder',
        value: function ticketStatusSearchBuilder() {
            return new _searchingBuilderTicketStatusSearchBuilder2['default'](this);
        }

        /**
         * This return a RulesSearchBuilder to build a specific RulesSearch
         * @return {RulesSearchBuilder}
         */
    }, {
        key: 'rulesSearchBuilder',
        value: function rulesSearchBuilder() {
            return new _searchingBuilderRulesSearchBuilder2['default'](this);
        }

        /**
         * This return a OperationTypesSearchBuilder to build a specific OperationTypesSearch
         * @return {OperationTypesSearchBuilder}
         */
    }, {
        key: 'operationTypesSearchBuilder',
        value: function operationTypesSearchBuilder() {
            return new _searchingBuilderOperationTypesSearchBuilder2['default'](this);
        }

        /**
         * This return a TasksSearchBuilder to build a specific TasksSearch
         * @return {TasksSearchBuilder}
         */
    }, {
        key: 'tasksSearchBuilder',
        value: function tasksSearchBuilder() {
            return new _searchingBuilderTasksSearchBuilder2['default'](this);
        }

        /**
         * This return a OperationsSearchBuilder to build a specific ExecutionssSearch
         * @return {OperationsSearchBuilder}
         */
    }, {
        key: 'operationsSearchBuilder',
        value: function operationsSearchBuilder() {
            return new _searchingBuilderOperationsSearchBuilder2['default'](this);
        }

        /**
         * This return a ExecutionsSearchBuilder to build a specific ExecutionsSearch
         * @return {ExecutionsSearchBuilder}
         */
    }, {
        key: 'executionsSearchBuilder',
        value: function executionsSearchBuilder() {
            return new _searchingBuilderExecutionsSearchBuilder2['default'](this);
        }

        /**
         * This return a ExecutionsHistorySearchBuilder to build a specific ExecutionsSearch
         * @return {ExecutionsHistorySearchBuilder}
         */
    }, {
        key: 'executionsHistorySearchBuilder',
        value: function executionsHistorySearchBuilder() {
            return new _searchingBuilderExecutionsHistorySearchBuilder2['default'](this);
        }

        /**
         * This return a AlarmsSearchBuilder to build a specific AlarmsSearch
         * @return {AlarmsSearchBuilder}
         */
    }, {
        key: 'alarmsSearchBuilder',
        value: function alarmsSearchBuilder() {
            return new _searchingBuilderAlarmsSearchBuilder2['default'](this);
        }

        /**
         * This return a DatastreamsSearchBuilder to build a specific DatastreamsSearchBuilder
         * @return {DatastreamsSearchBuilder}
         */
    }, {
        key: 'datastreamsSearchBuilder',
        value: function datastreamsSearchBuilder() {
            return new _searchingBuilderDatastreamsSearchBuilder2['default'](this);
        }

        /**
         * This return a DatamodelsSearchBuilder to build a specific DatamodelsSearchBuilder
         * @return {DatamodelsSearchBuilder}
         */
    }, {
        key: 'datamodelsSearchBuilder',
        value: function datamodelsSearchBuilder() {
            return new _searchingBuilderDatamodelsSearchBuilder2['default'](this);
        }

        /**
         * This return a FeedsSearchBuilder to build a specific FeedsSearchBuilder
         * @return {FeedsSearchBuilder}
         */
    }, {
        key: 'feedsSearchBuilder',
        value: function feedsSearchBuilder() {
            return new _searchingBuilderFeedsSearchBuilder2['default'](this);
        }

        /**
         * This return a DatapointsSearchBuilder to build a specific DatapointsSearchBuilder
         * @return {DatapointsSearchBuilder}
         */
    }, {
        key: 'datapointsSearchBuilder',
        value: function datapointsSearchBuilder() {
            return new _searchingBuilderDatapointsSearchBuilder2['default'](this);
        }

        /**
         * This return a BundlesSearchBuilder to build a specific BundlesSearchBuilder
         * @return {BundlesSearchBuilder}
         */
    }, {
        key: 'bundlesSearchBuilder',
        value: function bundlesSearchBuilder() {
            return new _searchingBuilderBundlesSearchBuilder2['default'](this);
        }

        /**
         * This return a CertificatesSearchBuilder to build a specific CertificatesSearchBuilder
         * @return {CertificatesSearchBuilder}
         */
    }, {
        key: 'certificatesSearchBuilder',
        value: function certificatesSearchBuilder() {
            return new _searchingBuilderCertificatesSearchBuilder2['default'](this);
        }

        /**
         * 
         */
    }, {
        key: 'basicTypesSearchBuilder',
        value: function basicTypesSearchBuilder() {
            return new _searchingBuilderBasicTypesSearchBuilder2['default'](this);
        }

        /**
         * This return a EntitiesSearchBuilder to build a specific EntitiesSearch
         * @return {EntitiesSearchBuilder}
         */
    }, {
        key: 'entitiesSearchBuilder',
        value: function entitiesSearchBuilder() {
            return new _searchingBuilderEntitiesSearchBuilder2['default'](this);
        }

        /**
         * This return a DatasetEntitiesSearchBuilder to build a specific DatasetEntitiesSearch
         * @return {DatasetEntitiesSearchBuilder}
         */
    }, {
        key: 'datasetEntitiesSearchBuilder',
        value: function datasetEntitiesSearchBuilder(organization, dataset) {
            return new _searchingBuilderDatasetEntitiesSearchBuilder2['default'](this, organization, dataset);
        }

        /**
         * This return a DatasetSearchBuilder to build a specific DatasetSearch
         * @return {DatasetSearchBuilder}
         */
    }, {
        key: 'datasetSearchBuilder',
        value: function datasetSearchBuilder(organization, dataset) {
            return new _searchingBuilderDatasetSearchBuilder2['default'](this, organization, dataset);
        }

        /**
         * This return a TimeserieSearchBuilder to build a specific TimeserieSearch
         * @return {TimeserieSearchBuilder}
         */
    }, {
        key: 'timeserieSearchBuilder',
        value: function timeserieSearchBuilder(organization, timeserie) {
            return new _searchingBuilderTimeserieSearchBuilder2['default'](this, organization, timeserie);
        }

        /**
         * This return a TimeserieDownsamplerBuilder to build a specific TimeserieDownsampler
         * @return {TimeserieDownsamplerBuilder}
         */
    }, {
        key: 'timeserieDownsamplerBuilder',
        value: function timeserieDownsamplerBuilder(organization, timeserie, entityId) {
            return new _searchingBuilderTimeserieDownsamplerBuilder2['default'](this, organization, timeserie, entityId);
        }

        /**
         * This return a TimeserieDatasetBuilder to build a specific TimeserieDataset
         * @return {TimeserieDatasetBuilder}
         */
    }, {
        key: 'timeserieDatasetBuilder',
        value: function timeserieDatasetBuilder(organization, timeserie) {
            return new _searchingBuilderTimeserieDatasetBuilder2['default'](this, organization, timeserie);
        }

        /**
         * This return a PlansSearchBuilder to build a specific PlansSearchBuilder
         * @return {PlansSearchBuilder}
         */
    }, {
        key: 'plansSearchBuilder',
        value: function plansSearchBuilder() {
            return new _searchingBuilderPlansSearchBuilder2['default'](this);
        }

        /**
         * This return a DevicePlansSearchBuilder to build a specific DevicePlansSearchBuilder
         * @return {PlansSearchBuilder}
         */
    }, {
        key: 'devicesPlansSearchBuilder',
        value: function devicesPlansSearchBuilder() {
            return new _searchingBuilderDevicesPlansSearchBuilder2['default'](this);
        }

        /**
         * This return a BundlesBuilder to build a specific BundlesBuilder
         * @return {Bundles}
         */
    }, {
        key: 'bundlesBuilder',
        value: function bundlesBuilder() {
            return new _bundlesBundles2['default'](this);
        }

        /**
         * This return a util to find a bundle
         * @return {BundleFinder}
         */
    }, {
        key: 'newBundleFinder',
        value: function newBundleFinder() {
            return new _bundlesBundleFinder2['default'](this);
        }

        /**
         * This return a OrganizationsBuilder to build a specific OrganizationsBuilder
         * @return {Organizations}
         */
    }, {
        key: 'organizationsBuilder',
        value: function organizationsBuilder() {
            return new _organizationsOrganizations2['default'](this);
        }

        /**
         * This return a DomainsBuilder to build a specific DomainsBuilder
         * @return {Domain}
         */
    }, {
        key: 'domainsBuilder',
        value: function domainsBuilder() {
            return new _domainsDomains2['default'](this);
        }

        /**
         * This return a util to find a domain
         * @return {DomainFinder}
         */
    }, {
        key: 'newDomainFinder',
        value: function newDomainFinder() {
            return new _domainsDomainsFinder2['default'](this);
        }

        /**
         * This return a util to create a user
         * @return {User}
         */
    }, {
        key: 'usersBuilder',
        value: function usersBuilder() {
            return new _usersUsers2['default'](this);
        }

        /**
         * This return a util to create a certificate
         * @return {Certificates}
         */
    }, {
        key: 'certificatesBuilder',
        value: function certificatesBuilder() {
            return new _securityCertificates2['default'](this);
        }

        /**
         * This return a SoftwaresSearchBuilder to build a specific SoftwaresSearchBuilder
         * @return {SoftwaresSearchBuilder}
         */
    }, {
        key: 'softwaresSearchBuilder',
        value: function softwaresSearchBuilder() {
            return new _searchingBuilderSoftwaresSearchBuilder2['default'](this);
        }

        /**
         * This return a OperationalStatusSearchBuilder to build a specific OperationalStatusSearchBuilder
         * @return {OperationalStatusSearchBuilder}
         */
    }, {
        key: 'operationalStatusSearchBuilder',
        value: function operationalStatusSearchBuilder() {
            return new _searchingBuilderOperationalStatusSearchBuilder2['default'](this);
        }

        /**
         * This return a ServiceGroupSearchBuilder to build a specific ServiceGroupSearchBuilder
         * @return {ServiceGroupSearchBuilder}
         */
    }, {
        key: 'serviceGroupSearchBuilder',
        value: function serviceGroupSearchBuilder() {
            return new _searchingBuilderServiceGroupSearchBuilder2['default'](this);
        }

        /**
         * This return a AdministrativeStateSearchBuilder to build a specific AdministrativeStateSearchBuilder
         * @return {AdministrativeStateSearchBuilder}
         */
    }, {
        key: 'administrativeStateSearchBuilder',
        value: function administrativeStateSearchBuilder() {
            return new _searchingBuilderAdministrativeStateSearchBuilder2['default'](this);
        }

        /**
         * This return a DevicesSouth to build a specific DevicesSouth
         * @return {DeviceMessage}
         */
    }, {
        key: 'deviceMessageBuilder',
        value: function deviceMessageBuilder() {
            return new _collectionDevicesDeviceMessage2['default'](this);
        }

        /**
         * This return a datastreamBuilder to build a specific Datastream
         * @return {Datastream}
         */
    }, {
        key: 'datastreamBuilder',
        value: function datastreamBuilder() {
            return new _collectionDevicesCollectDatastreams2['default'](this);
        }

        /**
         * This return a datapointsBuilder to build a specific Datapoint
         * @return {Datapoint}
         */
    }, {
        key: 'datapointsBuilder',
        value: function datapointsBuilder() {
            return new _collectionDevicesCollectDatapoint2['default'](this);
        }

        /**
         * @return {Hardware}
         */
    }, {
        key: 'hardwareMessageBuilder',
        value: function hardwareMessageBuilder() {
            return new _collectionDevicesCollectHardware2['default'](this);
        }

        /**
         * @return {Software}
         */
    }, {
        key: 'softwareMessageBuilder',
        value: function softwareMessageBuilder() {
            return new _collectionDevicesCollectSoftware2['default'](this);
        }

        /**
         * @return {Storage}
         */
    }, {
        key: 'storageMessageBuilder',
        value: function storageMessageBuilder() {
            return new _collectionDevicesCollectStorage2['default'](this);
        }

        /**
         * @return {Usage}
         */
    }, {
        key: 'usageMessageBuilder',
        value: function usageMessageBuilder() {
            return new _collectionDevicesCollectUsage2['default'](this);
        }

        /**
         * @return {PowerSupply}
         */
    }, {
        key: 'powerSupplyMessageBuilder',
        value: function powerSupplyMessageBuilder() {
            return new _collectionDevicesCollectPowerSupply2['default'](this);
        }

        /**
         * @return {CommsModuleMessage}
         */
    }, {
        key: 'commsModuleMessageMessageBuilder',
        value: function commsModuleMessageMessageBuilder() {
            return new _collectionDevicesCollectCommsModuleMessage2['default'](this);
        }

        /**
         * @return {SubscriberMessage}
         */
    }, {
        key: 'subscriberMessageBuilder',
        value: function subscriberMessageBuilder() {
            return new _collectionDevicesCollectSubscriber2['default'](this);
        }

        /**
         * @return {SubscriptionMessage}
         */
    }, {
        key: 'subscriptionMessageBuilder',
        value: function subscriptionMessageBuilder() {
            return new _collectionDevicesCollectSubscription2['default'](this);
        }

        /**
         * @return {Mobile}
         */
    }, {
        key: 'mobileMessageMessageBuilder',
        value: function mobileMessageMessageBuilder() {
            return new _collectionDevicesCollectMobile2['default'](this);
        }

        /**
         * This return a util to operation actions on an operation
         * @param {!string} operationId - identifier of operation
         * @return {OperationActions}
         */
    }, {
        key: 'newOperationActions',
        value: function newOperationActions(operationId) {
            return new _operationsOperationActions2['default'](this, operationId);
        }

        /**
         * This return a util to manage actions over periodicities
         * @param {!string} taskId - identifier of operation
         * @return {PeriodicityActions}
         */
    }, {
        key: 'newPeriodicityActions',
        value: function newPeriodicityActions(taskId) {
            return new _operationsPeriodicityActions2['default'](this, taskId);
        }

        /**
         * This return a WorkgroupRelationsBuilder to build a specific workgroup relation
         * @return {WorkgroupRelations}
         */
    }, {
        key: 'workgroupRelationsBuilder',
        value: function workgroupRelationsBuilder() {
            return new _workgroupsWorkgroupRelations2['default'](this);
        }

        /**
         * This return a WorkgroupRelationsFinder 
         * @return {WorkgroupRelationsFinder}
         */
    }, {
        key: 'newWorkgroupRelationsFinder',
        value: function newWorkgroupRelationsFinder() {
            return new _workgroupsWorkgroupRelationsFinder2['default'](this);
        }

        /**
         * This return a WorkgroupsBuilder to build a specific workgroup
         * @return {Workgroups}
         */
    }, {
        key: 'workgroupsBuilder',
        value: function workgroupsBuilder() {
            return new _workgroupsWorkgroups2['default'](this);
        }

        /**
         * This return a util to find a workgroup
         * @return {WorkgroupFinder}
         */
    }, {
        key: 'newWorkgroupFinder',
        value: function newWorkgroupFinder() {
            return new _workgroupsWorkgroupFinder2['default'](this);
        }

        /**
         * This return a WorkgroupsSearchBuilder to build a specific WorkgroupsSearch
         * @return {WorkgroupsSearchBuilder}
         */
    }, {
        key: 'workgroupsSearchBuilder',
        value: function workgroupsSearchBuilder() {
            return new _searchingBuilderWorkgroupsSearchBuilder2['default'](this);
        }

        /**
         * This return a ChannelsBuilder to build a specific WorkgroupsSearch
         * @return {Channels}
         */
    }, {
        key: 'channelsBuilder',
        value: function channelsBuilder() {
            return new _channelsChannels2['default'](this);
        }

        /**
         * This return a AreasBuilder to build a specific area
         * @return {Areas}
         */
    }, {
        key: 'areasBuilder',
        value: function areasBuilder() {
            return new _areasAreas2['default'](this);
        }

        /**
         * This return a DatasetBuilder to build a specific dataset
         * @return {Datasets}
         */
    }, {
        key: 'datasetsBuilder',
        value: function datasetsBuilder() {
            return new _datasetsDatasets2['default'](this);
        }

        /**
         * This return a TimeserieBuilder to build a specific timeserie
         * @return {Timeseries}
         */
    }, {
        key: 'timeseriesBuilder',
        value: function timeseriesBuilder() {
            return new _timeseriesTimeseries2['default'](this);
        }

        /**
         * This return a util to find a timeseries function
         * @return {TimeseriesFunctionsFinder}
         */
    }, {
        key: 'newTimeseriesFunctionFinder',
        value: function newTimeseriesFunctionFinder() {
            return new _timeseriesFunctionsCatalogTimeseriesFunctionFinder2['default'](this);
        }

        /**
         * This return a TimeserieBuilder to build a specific timeserie
         * @return {TimeseriesFunction}
         */
    }, {
        key: 'timeseriesFunctionBuilder',
        value: function timeseriesFunctionBuilder(organization, identifier) {
            return new _timeseriesFunctionsCatalogTimeseriesFunction2['default'](this, organization, identifier);
        }

        /**
         * This return a TimeseriesFunctionsHelper
         * @return {TimeseriesFunctionsHelper}
         */
    }, {
        key: 'newTimeseriesFunctionsHelper',
        value: function newTimeseriesFunctionsHelper() {
            return new _timeseriesFunctionsCatalogTimeseriesFunctionsHelper2['default'](this);
        }

        /**
         * This return a ChannelsSearchBuilder to build a specific ChannelsSearch
         * @return {ChannelsSearchBuilder}
         */
    }, {
        key: 'channelsSearchBuilder',
        value: function channelsSearchBuilder() {
            return new _searchingBuilderChannelsSearchBuilder2['default'](this);
        }

        /**
         * This return a UserProfilesSearchBuilder to build a specific UserProfilesSearchBuilder
         * @return {UserProfilesSearchBuilder}
         */
    }, {
        key: 'userProfilesSearchBuilder',
        value: function userProfilesSearchBuilder() {
            return new _searchingBuilderUserProfilesSearchBuilder2['default'](this);
        }

        /**
         * This return a Datamodels to build a specific Datamodels
         * @return {Datamodels}
         */
    }, {
        key: 'datamodelsBuilder',
        value: function datamodelsBuilder(organization) {
            return new _iotDatamodelsDatamodels2['default'](this, organization);
        }

        /**
         * This return a DatamodelsHelper to build a specific DatamodelsHelper
         * @return {DatamodelsHelper}
         */
    }, {
        key: 'datamodelsHelper',
        value: function datamodelsHelper(organization, datamodel) {
            return new _iotDatamodelsDatamodelsHelper2['default'](this, organization, datamodel);
        }

        /**
         * This return a util to find a datamodel
         * @return {DatamodelsFinder}
         */
    }, {
        key: 'newDatamodelsFinder',
        value: function newDatamodelsFinder() {
            return new _iotDatamodelsDatamodelsFinder2['default'](this);
        }

        /**
         * This return a datastream to build a specific Datastream
         * @return {DatastreamsBuilder}
         */
    }, {
        key: 'datastreamsBuilder',
        value: function datastreamsBuilder() {
            return new _iotCatalogDatastream2['default'](this);
        }

        /**
         * This return a util to create a bulk execution
         * @return {BulkExecutionBuilder}
         */
    }, {
        key: 'bulkExecutionBuilder',
        value: function bulkExecutionBuilder(organization, processorId, timeout) {
            return new _provisionBulkBulkExecutionBuilder2['default'](this, organization, processorId, timeout);
        }

        /**
         * This return a Qrating to build a specific Qrating
         * @return {QratingsBuilder}
         */
    }, {
        key: 'qratingsBuilder',
        value: function qratingsBuilder() {
            return new _iotCatalogQrating2['default'](this);
        }

        /**
         * This return a CountryCodesSearchBuilder to build a specific CountryCodesSearchBuilder
         * @return {CountryCodesSearchBuilder}
         */
    }, {
        key: 'countryCodesSearchBuilder',
        value: function countryCodesSearchBuilder() {
            return new _searchingBuilderCountryCodesSearchBuilder2['default'](this);
        }

        /**
         * This return a TimezoneSearchBuilder to build a specific TimezoneSearchBuilder
         * @return {TimezoneSearchBuilder}
         */
    }, {
        key: 'timezoneSearchBuilder',
        value: function timezoneSearchBuilder() {
            return new _searchingBuilderTimezoneSearchBuilder2['default'](this);
        }

        /**
         * This return a UserLanguagesSearchBuilder to build a specific UserLanguagesSearchBuilder
         * @return {UserLanguagesSearchBuilder}
         */
    }, {
        key: 'userLanguagesSearchBuilder',
        value: function userLanguagesSearchBuilder() {
            return new _searchingBuilderUserLanguagesSearchBuilder2['default'](this);
        }

        /**
         * This return a ConnectorFunctionsFinder 
         * @return {ConnectorFunctionsFinder}
         */
    }, {
        key: 'newConnectorFunctionsFinder',
        value: function newConnectorFunctionsFinder() {
            return new _connectorsFunctionsConfigurationConnectorFunctionsFinder2['default'](this);
        }

        /**
         * This return a ConnectorFunctionsCatalogFinder 
         * @return {ConnectorFunctionsCatalogFinder}
         */
    }, {
        key: 'newConnectorFunctionsCatalogFinder',
        value: function newConnectorFunctionsCatalogFinder() {
            return new _connectorsFunctionsCatalogConnectorFunctionsCatalogFinder2['default'](this);
        }

        /**
         * This return a ConnectorFunctionsCatalog
         * @return {ConnectorFunctionsCatalog}
         */
    }, {
        key: 'newConnectorFunctionsCatalog',
        value: function newConnectorFunctionsCatalog() {
            return new _connectorsFunctionsCatalogConnectorFunctionsCatalog2['default'](this);
        }

        /**
         * This return a ConnectorFunctionsHelper
         * @return {ConnectorFunctionsHelper}
         */
    }, {
        key: 'newConnectorFunctionsHelper',
        value: function newConnectorFunctionsHelper() {
            return new _connectorsFunctionsConfigurationConnectorFunctionsHelper2['default'](this);
        }

        /**
         * This return a ConnectorFunctions
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'connectorFunctionsBuilder',
        value: function connectorFunctionsBuilder(organization, channel, identifier, connectorFunctionData) {
            return new _connectorsFunctionsConfigurationConnectorFunctions2['default'](this, organization, channel, identifier, connectorFunctionData);
        }

        /**
         * 
         * @param {String} identifier - only update or delete
         * @param {Object} connectorFunctionsCatalog 
         * @returns {ConnectorFunctionsCatalog}
         */
    }, {
        key: 'connectorFunctionsCatalogBuilder',
        value: function connectorFunctionsCatalogBuilder(identifier, connectorFunctionsCatalog) {
            return new _connectorsFunctionsCatalogConnectorFunctions2['default'](this, identifier, connectorFunctionsCatalog);
        }

        /**
         * This return a ProvisionsProcesorsBuilder to build a specific ProvisionsProcesorsBuilder
         * @return {provisionProcessorsBuilder}
         */
    }, {
        key: 'provisionProcessorsBuilder',
        value: function provisionProcessorsBuilder() {
            return new _provisionProcessorsProvisionProcessors2['default'](this);
        }

        /**
         * This return a util to find a provision procesor
         * @return {ProvisionProcessorsFinder}
         */
    }, {
        key: 'newProvisionProcessorsFinder',
        value: function newProvisionProcessorsFinder() {
            return new _provisionProcessorsProvisionProcessorsFinder2['default'](this);
        }

        /**
         * This return a util to find a pipeline
         * @return {PipelineFinder}
         */
    }, {
        key: 'newPipelineFinder',
        value: function newPipelineFinder() {
            return new _pipelinesPipelineFinder2['default'](this);
        }

        /**
         * This return a util to find a transformer
         * @return {TransformerFinder}
         */
    }, {
        key: 'newTransformerFinder',
        value: function newTransformerFinder() {
            return new _transformersTransformerFinder2['default'](this);
        }

        /**
         * This return a util to find an ai model
         * @return {AIModelFinder}
         */
    }, {
        key: 'newAIModelFinder',
        value: function newAIModelFinder() {
            return new _AIModelsAIModelsFinder2['default'](this);
        }

        /**
         * This return a TransformersBuilder to build a specific transformersBuilder
         * @return {Transformers}
         */
    }, {
        key: 'transformersBuilder',
        value: function transformersBuilder() {
            return new _transformersTransformers2['default'](this);
        }

        /**
         * This return a AIModelsBuilder to build a specific aiModelsBuilder
         * @return {AIModels}
         */
    }, {
        key: 'aiModelsBuilder',
        value: function aiModelsBuilder() {
            return new _AIModelsAIModels2['default'](this);
        }

        /**
         * This return a PipelinesBuilder to build a specific pipelinesBuilder
         * @return {Pipelines}
         */
    }, {
        key: 'pipelinesBuilder',
        value: function pipelinesBuilder() {
            return new _pipelinesPipelines2['default'](this);
        }

        /** This return a ManufacturersBuilder to build a specific ManufacturersBuilder
         * @return {ManufacturersBuilder}
         */
    }, {
        key: 'manufacturersBuilder',
        value: function manufacturersBuilder() {
            return new _manufacturersManufacturer2['default'](this);
        }

        /**
         * This return a ManufacturerModelsBuilder to build a specific ManufacturerModelsBuilder
         * @return {ManufacturerModelsBuilder}
         */
    }, {
        key: 'manufacturerModelsBuilder',
        value: function manufacturerModelsBuilder(manufacturerIdentifier) {
            return new _manufacturersModel2['default'](this, manufacturerIdentifier);
        }

        /**
         * This return a util to find a hardware manufacturer
         * @return {ManufacturerFinder}
         */
    }, {
        key: 'newManufacturersFinder',
        value: function newManufacturersFinder() {
            return new _manufacturersManufacturerFinder2['default'](this);
        }

        /**
         * This return a util to find a hardware model
         * @return {ModelFinder}
         */
    }, {
        key: 'newModelFinder',
        value: function newModelFinder() {
            return new _manufacturersModelFinder2['default'](this);
        }

        /** This return a OrganizationManufacturersBuilder to build a specific OrganizationManufacturersBuilder
         * @return {OrganizationManufacturersBuilder}
         */
    }, {
        key: 'organizationManufacturersBuilder',
        value: function organizationManufacturersBuilder(organization) {
            return new _organization_manufacturerManufacturer2['default'](this, organization);
        }

        /**
         * This return a OrganizationManufacturerModelsBuilder to build a specific OrganizationManufacturerModelsBuilder
         * @return {OrganizationManufacturerModelsBuilder}
         */
    }, {
        key: 'organizationManufacturerModelsBuilder',
        value: function organizationManufacturerModelsBuilder(organization, manufacturerIdentifier) {
            return new _organization_manufacturerModel2['default'](this, organization, manufacturerIdentifier);
        }

        /**
         * This return a util to find a hardware manufacturer
         * @return {OrganizationManufacturerFinder}
         */
    }, {
        key: 'newOrganizationManufacturersFinder',
        value: function newOrganizationManufacturersFinder() {
            return new _organization_manufacturerManufacturerFinder2['default'](this);
        }

        /**
         * This return a util to find a hardware model
         * @return {OrganizationModelFinder}
         */
    }, {
        key: 'newOrganizationModelFinder',
        value: function newOrganizationModelFinder() {
            return new _organization_manufacturerModelFinder2['default'](this);
        }

        /** 
         * This return a NotebookLauncherBuilder to build a specific NotebookLauncherBuilder
         * @return {NotebookLauncherBuilder}
         */
    }, {
        key: 'notebookLauncherBuilder',
        value: function notebookLauncherBuilder() {
            return new _notebookSchedulerNotebookLauncher2['default'](this);
        }

        /** 
         * This return a NotebookSchedulerBuilder to build a specific NotebookSchedulerBuilder
         * @return {NotebookSchedulerBuilder}
         */
    }, {
        key: 'notebookSchedulerBuilder',
        value: function notebookSchedulerBuilder() {
            return new _notebookSchedulerNotebookScheduler2['default'](this);
        }

        /**
         * This return a util to find notebooks
         * @return {NotebookFinder}
         */
    }, {
        key: 'newNotebookFinder',
        value: function newNotebookFinder() {
            return new _notebookSchedulerNotebookFinder2['default'](this);
        }

        /**
         * This return a util to find notebooks schedulers
         * @return {NotebookSchedulerFinder}
         */
    }, {
        key: 'newNotebookSchedulerFinder',
        value: function newNotebookSchedulerFinder() {
            return new _notebookSchedulerSchedulerFinder2['default'](this);
        }
    }]);

    return InternalOpenGateAPI;
})();

exports['default'] = InternalOpenGateAPI;
module.exports = exports['default'];
//# sourceMappingURL=InternalOpenGateAPI.js.map
