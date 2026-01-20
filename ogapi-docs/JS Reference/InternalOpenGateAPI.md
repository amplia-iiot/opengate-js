+++
title = "Internal Open Gate API"
weight = 10
+++

InternalOpenGateAPI

### InternalOpenGateAPI Objects

```javascript
class InternalOpenGateAPI()
```

This is a abstract class, it must be extended to another class that defined the backend, it will be used on request to Opengate North API by browser or nodejs server


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `_options` _{ url: string,port: string,version: string,apiKey: string}_  - this is configuration about Opengate North API.
- `ampliaREST` _AmpliaREST_  - this is a backend selected to manage a request to Opengate North API.


---

##### administrativeStateSearchBuilder


```javascript
function administrativeStateSearchBuilder() -> 'AdministrativeStateSearchBuilder'
```

This return a AdministrativeStateSearchBuilder to build a specific AdministrativeStateSearchBuilder


**Returns**:


- `AdministrativeStateSearchBuilder`(./searching/builder/AdministrativeStateSearchBuilder) 


---

##### alarms


```javascript
function alarms()
```




---

##### alarmsSearchBuilder


```javascript
function alarmsSearchBuilder() -> 'AlarmsSearchBuilder'
```

This return a AlarmsSearchBuilder to build a specific AlarmsSearch


**Returns**:


- `AlarmsSearchBuilder`(./searching/builder/AlarmsSearchBuilder) 


---

##### allowedResourceTypeSearchBuilder


```javascript
function allowedResourceTypeSearchBuilder() -> 'AllowedResourceTypeSearchBuilder'
```

This return a AllowedResourceTypeSearchBuilder to build a specific AllowedResourceTypeSearchBuilder


**Returns**:


- `AllowedResourceTypeSearchBuilder`(./searching/builder/AllowedResourceTypeSearchBuilder) 


---

##### areasBuilder


```javascript
function areasBuilder() -> 'Areas'
```

This return a AreasBuilder to build a specific area


**Returns**:


- `Areas`(./areas/Areas) 


---

##### areasSearchBuilder


```javascript
function areasSearchBuilder() -> 'AreasSearchBuilder'
```

This return a AreasSearchBuilder to build a specific AreasSearch


**Returns**:


- `AreasSearchBuilder`(./searching/builder/AreasSearchBuilder) 


---

##### assetsSearchBuilder


```javascript
function assetsSearchBuilder() -> 'AssetsSearchBuilder'
```

This return a AssetsSearchBuilder to build a specific AssetSearch


**Returns**:


- `AssetsSearchBuilder`(./searching/builder/AssetsSearchBuilder) 


---

##### basicTypesSearchBuilder


```javascript
function basicTypesSearchBuilder() -> '*'
```



**Returns**:


- _`*`_ 


---

##### bulkExecutionBuilder


```javascript
function bulkExecutionBuilder(organization: *,processorId: *,timeout: *) -> 'BulkExecutionBuilder'
```

This return a util to create a bulk execution

**Arguments**:

- `organization` _*_  
- `processorId` _*_  
- `timeout` _*_  

**Returns**:


- `BulkExecutionBuilder`(./provision/bulk/BulkExecutionBuilder) 


---

##### bulkExecutionSearchBuilder


```javascript
function bulkExecutionSearchBuilder() -> 'BulkExecutionSearchBuilder'
```

This return a BulkExecutionSearchBuilder to build a specific bulk


**Returns**:


- `BulkExecutionSearchBuilder`(./searching/builder/BulkExecutionSearchBuilder) 


---

##### bulkSearchBuilder


```javascript
function bulkSearchBuilder() -> 'BulkSearchBuilder'
```

This return a BulkSearchBuilder to build a specific BulkSearchBuilder


**Returns**:


- `BulkSearchBuilder`(./searching/builder/BulkSearchBuilder) 


---

##### bundlesBuilder


```javascript
function bundlesBuilder() -> 'Bundles'
```

This return a BundlesBuilder to build a specific BundlesBuilder


**Returns**:


- `Bundles`(./bundles/Bundles) 


---

##### bundlesSearchBuilder


```javascript
function bundlesSearchBuilder() -> 'BundlesSearchBuilder'
```

This return a BundlesSearchBuilder to build a specific BundlesSearchBuilder


**Returns**:


- `BundlesSearchBuilder`(./searching/builder/BundlesSearchBuilder) 


---

##### certificatesBuilder


```javascript
function certificatesBuilder() -> 'Certificates'
```

This return a util to create a certificate


**Returns**:


- `Certificates`(./security/Certificates) 


---

##### certificatesSearchBuilder


```javascript
function certificatesSearchBuilder() -> 'CertificatesSearchBuilder'
```

This return a CertificatesSearchBuilder to build a specific CertificatesSearchBuilder


**Returns**:


- `CertificatesSearchBuilder`(./searching/builder/CertificatesSearchBuilder) 


---

##### channelsBuilder


```javascript
function channelsBuilder() -> 'Channels'
```

This return a ChannelsBuilder to build a specific WorkgroupsSearch


**Returns**:


- `Channels`(./channels/Channels) 


---

##### channelsSearchBuilder


```javascript
function channelsSearchBuilder() -> 'ChannelsSearchBuilder'
```

This return a ChannelsSearchBuilder to build a specific ChannelsSearch


**Returns**:


- `ChannelsSearchBuilder`(./searching/builder/ChannelsSearchBuilder) 


---

##### commsModuleMessageMessageBuilder


```javascript
function commsModuleMessageMessageBuilder() -> 'CommsModuleMessage'
```



**Returns**:


- `CommsModuleMessage`(./collection/devices/collect/CommsModuleMessage) 


---

##### communicationsModuleTypeSearchBuilder


```javascript
function communicationsModuleTypeSearchBuilder() -> 'CommunicationsModuleTypeSearchBuilder'
```

This return a CommunicationsModuleTypeSearchBuilder to build a specific CommunicationsModuleTypeSearch


**Returns**:


- `CommunicationsModuleTypeSearchBuilder`(./searching/builder/CommunicationsModuleTypeSearchBuilder) 


---

##### connectorFunctionsBuilder


```javascript
function connectorFunctionsBuilder(organization: *,channel: *,identifier: *,connectorFunctionData: *) -> 'ConnectorFunctions'
```

This return a ConnectorFunctions

**Arguments**:

- `organization` _*_  
- `channel` _*_  
- `identifier` _*_  
- `connectorFunctionData` _*_  

**Returns**:


- `ConnectorFunctions`(./connectorsFunctions/configuration/ConnectorFunctions) 


---

##### connectorFunctionsCatalogBuilder


```javascript
function connectorFunctionsCatalogBuilder(identifier: String,connectorFunctionsCatalog: Object) -> 'ConnectorFunctionsCatalog'
```


**Arguments**:

- `identifier` _String_  - only update or delete
- `connectorFunctionsCatalog` _Object_  

**Returns**:


- `ConnectorFunctionsCatalog`(./connectorsFunctions/catalog/ConnectorFunctionsCatalog) 


---

##### countryCodesSearchBuilder


```javascript
function countryCodesSearchBuilder() -> 'CountryCodesSearchBuilder'
```

This return a CountryCodesSearchBuilder to build a specific CountryCodesSearchBuilder


**Returns**:


- `CountryCodesSearchBuilder`(./searching/builder/CountryCodesSearchBuilder) 


---

##### datamodelsBuilder


```javascript
function datamodelsBuilder(organization: *) -> 'Datamodels'
```

This return a Datamodels to build a specific Datamodels

**Arguments**:

- `organization` _*_  

**Returns**:


- `Datamodels`(./iot/datamodels/Datamodels) 


---

##### datamodelsHelper


```javascript
function datamodelsHelper(organization: *,datamodel: *) -> 'DatamodelsHelper'
```

This return a DatamodelsHelper to build a specific DatamodelsHelper

**Arguments**:

- `organization` _*_  
- `datamodel` _*_  

**Returns**:


- `DatamodelsHelper`(./iot/datamodels/DatamodelsHelper) 


---

##### datamodelsSearchBuilder


```javascript
function datamodelsSearchBuilder() -> 'DatamodelsSearchBuilder'
```

This return a DatamodelsSearchBuilder to build a specific DatamodelsSearchBuilder


**Returns**:


- `DatamodelsSearchBuilder`(./searching/builder/DatamodelsSearchBuilder) 


---

##### datapointsBuilder


```javascript
function datapointsBuilder() -> 'Datapoint'
```

This return a datapointsBuilder to build a specific Datapoint


**Returns**:


- `Datapoint`(./collection/devices/collect/Datapoint) 


---

##### datapointsSearchBuilder


```javascript
function datapointsSearchBuilder() -> 'DatapointsSearchBuilder'
```

This return a DatapointsSearchBuilder to build a specific DatapointsSearchBuilder


**Returns**:


- `DatapointsSearchBuilder`(./searching/builder/DatapointsSearchBuilder) 


---

##### datasetEntitiesSearchBuilder


```javascript
function datasetEntitiesSearchBuilder(organization: *,dataset: *) -> 'DatasetEntitiesSearchBuilder'
```

This return a DatasetEntitiesSearchBuilder to build a specific DatasetEntitiesSearch

**Arguments**:

- `organization` _*_  
- `dataset` _*_  

**Returns**:


- `DatasetEntitiesSearchBuilder`(./searching/builder/DatasetEntitiesSearchBuilder) 


---

##### datasetsBuilder


```javascript
function datasetsBuilder() -> 'Datasets'
```

This return a DatasetBuilder to build a specific dataset


**Returns**:


- `Datasets`(./datasets/Datasets) 


---

##### datasetsCatalogSearchBuilder


```javascript
function datasetsCatalogSearchBuilder() -> 'DatasetsCatalogSearchBuilder'
```

This return a DatasetsCatalogSearchBuilder to build a specific DatasetsCatalogSearc


**Returns**:


- `DatasetsCatalogSearchBuilder`(./searching/builder/DatasetsCatalogSearchBuilder) 


---

##### datasetSearchBuilder


```javascript
function datasetSearchBuilder(organization: *,dataset: *) -> 'DatasetSearchBuilder'
```

This return a DatasetSearchBuilder to build a specific DatasetSearch

**Arguments**:

- `organization` _*_  
- `dataset` _*_  

**Returns**:


- `DatasetSearchBuilder`(./searching/builder/DatasetSearchBuilder) 


---

##### datastreamBuilder


```javascript
function datastreamBuilder() -> 'Datastream'
```

This return a datastreamBuilder to build a specific Datastream


**Returns**:


- `Datastream`(./iot/catalog/Datastream) 


---

##### datastreamsBuilder


```javascript
function datastreamsBuilder() -> 'DatastreamsBuilder'
```

This return a datastream to build a specific Datastream


**Returns**:


- _`DatastreamsBuilder`_ 


---

##### datastreamsSearchBuilder


```javascript
function datastreamsSearchBuilder() -> 'DatastreamsSearchBuilder'
```

This return a DatastreamsSearchBuilder to build a specific DatastreamsSearchBuilder


**Returns**:


- `DatastreamsSearchBuilder`(./searching/builder/DatastreamsSearchBuilder) 


---

##### deviceMessageBuilder


```javascript
function deviceMessageBuilder() -> 'DeviceMessage'
```

This return a DevicesSouth to build a specific DevicesSouth


**Returns**:


- `DeviceMessage`(./collection/devices/DeviceMessage) 


---

##### devicesPlansSearchBuilder


```javascript
function devicesPlansSearchBuilder() -> 'PlansSearchBuilder'
```

This return a DevicePlansSearchBuilder to build a specific DevicePlansSearchBuilder


**Returns**:


- `PlansSearchBuilder`(./searching/builder/PlansSearchBuilder) 


---

##### devicesSearchBuilder


```javascript
function devicesSearchBuilder() -> 'DevicesSearchBuilder'
```

This return a DevicesSearchBuilder to build a specific DeviceSearch


**Returns**:


- `DevicesSearchBuilder`(./searching/builder/DevicesSearchBuilder) 


---

##### domainsBuilder


```javascript
function domainsBuilder() -> 'Domain'
```

This return a DomainsBuilder to build a specific DomainsBuilder


**Returns**:


- _`Domain`_ 


---

##### domainsSearchBuilder


```javascript
function domainsSearchBuilder() -> 'DomainsSearchBuilder'
```

This return a DomainsSearchBuilder to build a specific DomainsSearch


**Returns**:


- `DomainsSearchBuilder`(./searching/builder/DomainsSearchBuilder) 


---

##### entitiesSearchBuilder


```javascript
function entitiesSearchBuilder() -> 'EntitiesSearchBuilder'
```

This return a EntitiesSearchBuilder to build a specific EntitiesSearch


**Returns**:


- `EntitiesSearchBuilder`(./searching/builder/EntitiesSearchBuilder) 


---

##### entityBuilder


```javascript
function entityBuilder()
```




---

##### EX


```javascript
function EX()
```




---

##### executionsHistorySearchBuilder


```javascript
function executionsHistorySearchBuilder() -> 'ExecutionsHistorySearchBuilder'
```

This return a ExecutionsHistorySearchBuilder to build a specific ExecutionsSearch


**Returns**:


- `ExecutionsHistorySearchBuilder`(./searching/builder/ExecutionsHistorySearchBuilder) 


---

##### executionsSearchBuilder


```javascript
function executionsSearchBuilder() -> 'ExecutionsSearchBuilder'
```

This return a ExecutionsSearchBuilder to build a specific ExecutionsSearch


**Returns**:


- `ExecutionsSearchBuilder`(./searching/builder/ExecutionsSearchBuilder) 


---

##### feedsSearchBuilder


```javascript
function feedsSearchBuilder() -> 'FeedsSearchBuilder'
```

This return a FeedsSearchBuilder to build a specific FeedsSearchBuilder


**Returns**:


- `FeedsSearchBuilder`(./searching/builder/FeedsSearchBuilder) 


---

##### fieldsDefinitionSearchBuilder


```javascript
function fieldsDefinitionSearchBuilder() -> 'FieldsDefinitionSearchBuilder'
```

This return a FieldsDefinitionSearchBuilder to build a specific FieldsDefinitionSearchBuilder


**Returns**:


- `FieldsDefinitionSearchBuilder`(./searching/builder/FieldsDefinitionSearchBuilder) 


---

##### geoclusterBuilder


```javascript
function geoclusterBuilder() -> 'Geocluster'
```

This return a util to regenerate geloclouster


**Returns**:


- `Geocluster`(./geocluster/Geocluster) 


---

##### hardwareMessageBuilder


```javascript
function hardwareMessageBuilder() -> 'Hardware'
```



**Returns**:


- `Hardware`(./collection/devices/collect/Hardware) 


---

##### ioTDatastreamAccessSearchBuilder


```javascript
function ioTDatastreamAccessSearchBuilder() -> 'IoTDatastreamAccessSearchBuilder'
```

This return a IoTDatastreamAccessSearchBuilder to build a specific IoTDatastreamAccessSearchBuilder


**Returns**:


- `IoTDatastreamAccessSearchBuilder`(./searching/builder/IoTDatastreamAccessSearchBuilder) 


---

##### ioTDatastreamPeriodSearchBuilder


```javascript
function ioTDatastreamPeriodSearchBuilder() -> 'IoTDatastreamPeriodSearchBuilder'
```

This return a IoTDatastreamPeriodSearchBuilder to build a specific IoTDatastreamPeriodSearchBuilder


**Returns**:


- `IoTDatastreamPeriodSearchBuilder`(./searching/builder/IoTDatastreamPeriodSearchBuilder) 


---

##### ioTDatastreamStoragePeriodSearchBuilder


```javascript
function ioTDatastreamStoragePeriodSearchBuilder() -> 'IoTDatastreamStoragePeriodSearchBuilder'
```

This return a IoTDatastreamStoragePeriodSearchBuilder to build a specific IoTDatastreamStoragePeriodSearchBuilder


**Returns**:


- `IoTDatastreamStoragePeriodSearchBuilder`(./searching/builder/IoTDatastreamStoragePeriodSearchBuilder) 


---

##### manufacturerModelsBuilder


```javascript
function manufacturerModelsBuilder(manufacturerIdentifier: *) -> 'ManufacturerModelsBuilder'
```

This return a ManufacturerModelsBuilder to build a specific ManufacturerModelsBuilder

**Arguments**:

- `manufacturerIdentifier` _*_  

**Returns**:


- _`ManufacturerModelsBuilder`_ 


---

##### manufacturersBuilder


```javascript
function manufacturersBuilder() -> 'ManufacturersBuilder'
```

This return a ManufacturersBuilder to build a specific ManufacturersBuilder


**Returns**:


- _`ManufacturersBuilder`_ 


---

##### mobileMessageMessageBuilder


```javascript
function mobileMessageMessageBuilder() -> 'Mobile'
```



**Returns**:


- `Mobile`(./collection/devices/collect/Mobile) 


---

##### mobilePhoneProviderSearchBuilder


```javascript
function mobilePhoneProviderSearchBuilder() -> 'MobilePhoneProviderSearchBuilder'
```

This return a MobilePhoneProviderSearchBuilder to build a specific MobilePhoneProviderTypeSearch


**Returns**:


- `MobilePhoneProviderSearchBuilder`(./searching/builder/MobilePhoneProviderSearchBuilder) 


---

##### Napi


```javascript
function Napi()
```




---

##### newAreaFinder


```javascript
function newAreaFinder() -> 'AreaFinder'
```

This return a util to find a area


**Returns**:


- `AreaFinder`(./areas/AreaFinder) 


---

##### newBulkExecutionFinder


```javascript
function newBulkExecutionFinder() -> 'BulkFinder'
```

This return a util to find summary and download a bulk executions


**Returns**:


- `BulkFinder`(./bulk/BulkFinder) 


---

##### newBulkFinder


```javascript
function newBulkFinder() -> 'BulkFinder'
```

This return a util to find and download a bulk


**Returns**:


- `BulkFinder`(./bulk/BulkFinder) 


---

##### newBundleFinder


```javascript
function newBundleFinder() -> 'BundleFinder'
```

This return a util to find a bundle


**Returns**:


- `BundleFinder`(./bundles/BundleFinder) 


---

##### newCertificateFinder


```javascript
function newCertificateFinder() -> 'CertificateFinder'
```

This return a util to find a certificate


**Returns**:


- `CertificateFinder`(./security/CertificateFinder) 


---

##### newChannelFinder


```javascript
function newChannelFinder() -> 'ChannelFinder'
```

This return a util to find a channel


**Returns**:


- `ChannelFinder`(./channels/ChannelFinder) 


---

##### newConnectorFunctionsCatalog


```javascript
function newConnectorFunctionsCatalog() -> 'ConnectorFunctionsCatalog'
```

This return a ConnectorFunctionsCatalog


**Returns**:


- `ConnectorFunctionsCatalog`(./connectorsFunctions/catalog/ConnectorFunctionsCatalog) 


---

##### newConnectorFunctionsCatalogFinder


```javascript
function newConnectorFunctionsCatalogFinder() -> 'ConnectorFunctionsCatalogFinder'
```

This return a ConnectorFunctionsCatalogFinder 


**Returns**:


- `ConnectorFunctionsCatalogFinder`(./connectorsFunctions/catalog/ConnectorFunctionsCatalogFinder) 


---

##### newConnectorFunctionsFinder


```javascript
function newConnectorFunctionsFinder() -> 'ConnectorFunctionsFinder'
```

This return a ConnectorFunctionsFinder 


**Returns**:


- `ConnectorFunctionsFinder`(./connectorsFunctions/configuration/ConnectorFunctionsFinder) 


---

##### newConnectorFunctionsHelper


```javascript
function newConnectorFunctionsHelper() -> 'ConnectorFunctionsHelper'
```

This return a ConnectorFunctionsHelper


**Returns**:


- `ConnectorFunctionsHelper`(./connectorsFunctions/configuration/ConnectorFunctionsHelper) 


---

##### newCountriesCatalog


```javascript
function newCountriesCatalog() -> 'CountriesCatalog'
```

This return a util to find countries catalog


**Returns**:


- `CountriesCatalog`(./provision/country/CountriesCatalog) 


---

##### newDatamodelsFinder


```javascript
function newDatamodelsFinder() -> 'DatamodelsFinder'
```

This return a util to find a datamodel


**Returns**:


- `DatamodelsFinder`(./iot/datamodels/DatamodelsFinder) 


---

##### newDatasetFinder


```javascript
function newDatasetFinder() -> 'DatasetFinder'
```

This return a to find Dataset configuration


**Returns**:


- _`DatasetFinder`_ 


---

##### newDeviceFinder


```javascript
function newDeviceFinder() -> 'DeviceFinder'
```

This return a util to find a device


**Returns**:


- `DeviceFinder`(./entities/DeviceFinder) 


---

##### newDomainFinder


```javascript
function newDomainFinder() -> 'DomainFinder'
```

This return a util to find a domain


**Returns**:


- `DomainFinder`(./domains/DomainsFinder) 


---

##### newEntityFinder


```javascript
function newEntityFinder() -> '*'
```



**Returns**:


- _`*`_ 


---

##### newFilterBuilder


```javascript
function newFilterBuilder() -> 'FilterBuilder'
```

This return a util to create your own filter to make searching


**Returns**:


- `FilterBuilder`(./searching/FilterBuilder) 


---

##### newGeoclusterFinder


```javascript
function newGeoclusterFinder() -> 'GeoclusterFinder'
```

This return a util to find a user


**Returns**:


- `GeoclusterFinder`(./geocluster/GeoclusterFinder) 


---

##### newManufacturersFinder


```javascript
function newManufacturersFinder() -> 'ManufacturerFinder'
```

This return a util to find a hardware manufacturer


**Returns**:


- `ManufacturerFinder`(./organization_manufacturer/ManufacturerFinder) 


---

##### newModelFinder


```javascript
function newModelFinder() -> 'ModelFinder'
```

This return a util to find a hardware model


**Returns**:


- `ModelFinder`(./organization_manufacturer/ModelFinder) 


---

##### newNotebookFinder


```javascript
function newNotebookFinder() -> 'NotebookFinder'
```

This return a util to find notebooks


**Returns**:


- `NotebookFinder`(./notebookScheduler/NotebookFinder) 


---

##### newNotebookSchedulerFinder


```javascript
function newNotebookSchedulerFinder() -> 'NotebookSchedulerFinder'
```

This return a util to find notebooks schedulers


**Returns**:


- _`NotebookSchedulerFinder`_ 


---

##### newOperationActions


```javascript
function newOperationActions(operationId: string) -> 'OperationActions'
```

This return a util to operation actions on an operation

**Arguments**:

- `operationId` _string_  - identifier of operation

**Returns**:


- `OperationActions`(./operations/OperationActions) 


---

##### newOperationFinder


```javascript
function newOperationFinder() -> 'OperationFinder'
```

This return a util to find a operation


**Returns**:


- `OperationFinder`(./operations/OperationFinder) 


---

##### newOperationTypeCatalog


```javascript
function newOperationTypeCatalog() -> 'OperationTypeCatalog'
```

This return a util to find Operation Types Templates


**Returns**:


- _`OperationTypeCatalog`_ 


---

##### newOperationTypeFinder


```javascript
function newOperationTypeFinder() -> 'OperationType'
```

This return a util to find Operation Types


**Returns**:


- `OperationType`(./operationTypes/OperationType) 


---

##### newOrganizationFinder


```javascript
function newOrganizationFinder() -> 'OrganizationFinder'
```

This return a util to find a organization


**Returns**:


- `OrganizationFinder`(./organizations/OrganizationFinder) 


---

##### newOrganizationManufacturersFinder


```javascript
function newOrganizationManufacturersFinder() -> 'OrganizationManufacturerFinder'
```

This return a util to find a hardware manufacturer


**Returns**:


- _`OrganizationManufacturerFinder`_ 


---

##### newOrganizationModelFinder


```javascript
function newOrganizationModelFinder() -> 'OrganizationModelFinder'
```

This return a util to find a hardware model


**Returns**:


- _`OrganizationModelFinder`_ 


---

##### newPeriodicityActions


```javascript
function newPeriodicityActions(taskId: string) -> 'PeriodicityActions'
```

This return a util to manage actions over periodicities

**Arguments**:

- `taskId` _string_  - identifier of operation

**Returns**:


- `PeriodicityActions`(./operations/PeriodicityActions) 


---

##### newProvisionProcessorsFinder


```javascript
function newProvisionProcessorsFinder() -> 'ProvisionProcessorsFinder'
```

This return a util to find a provision procesor


**Returns**:


- _`ProvisionProcessorsFinder`_ 


---

##### newRuleConfigurationsCatalog


```javascript
function newRuleConfigurationsCatalog() -> 'RuleConfigurationsCatalog'
```

This return a util to find Rule Configurations Templates


**Returns**:


- `RuleConfigurationsCatalog`(./rulesConfiguration/RuleConfigurationsCatalog) 


---

##### newRuleConfigurationsFinder


```javascript
function newRuleConfigurationsFinder() -> 'RuleConfigurationsFinder'
```

This return a util to find Rule Configurations


**Returns**:


- `RuleConfigurationsFinder`(./rulesConfiguration/RuleConfigurationsFinder) 


---

##### newRuleConfigurationsHelper


```javascript
function newRuleConfigurationsHelper() -> '*'
```

This return a util  RuleConfigurationsHelper


**Returns**:


- _`*`_ - {RuleConfigurationsHelper


---

##### newScheduleHistoryFinder


```javascript
function newScheduleHistoryFinder() -> 'HistoryFinder'
```

This return a util to view schedule history


**Returns**:


- `HistoryFinder`(./schedule/HistoryFinder) 


---

##### newScheduleImageExecutionFinder


```javascript
function newScheduleImageExecutionFinder() -> 'ImageExecutionFinder'
```

This return a util to view schedule image executions


**Returns**:


- `ImageExecutionFinder`(./schedule/ImageExecutionFinder) 


---

##### newSchedulePipelineFinder


```javascript
function newSchedulePipelineFinder() -> 'PipelineFinder'
```

This return a util to view schedule pipelines


**Returns**:


- `PipelineFinder`(./schedule/PipelineFinder) 


---

##### newScheduleRestRequestFinder


```javascript
function newScheduleRestRequestFinder() -> 'RestRequestFinder'
```

This return a util to view schedule rest requests


**Returns**:


- `RestRequestFinder`(./schedule/RestRequestFinder) 


---

##### newSelectBuilder


```javascript
function newSelectBuilder() -> 'SelectBuilder'
```

This return a util to create your own select to make searching


**Returns**:


- `SelectBuilder`(./searching/SelectBuilder) 


---

##### newSoftwareFinder


```javascript
function newSoftwareFinder() -> 'SoftwareFinder'
```

This return a util to find an organization software


**Returns**:


- `SoftwareFinder`(./organization_software/SoftwareFinder) 


---

##### newSubscribersFinder


```javascript
function newSubscribersFinder() -> 'SubscribersFinder'
```

This return a util to find a Subscriber


**Returns**:


- `SubscribersFinder`(./entities/SubscribersFinder) 


---

##### newSubscriptionsFinder


```javascript
function newSubscriptionsFinder() -> 'SubscriptionsFinder'
```

This return a util to find a Subscription


**Returns**:


- `SubscriptionsFinder`(./entities/SubscriptionsFinder) 


---

##### newTicketFinder


```javascript
function newTicketFinder() -> 'TicketFinder'
```

This return a util to find a ticket


**Returns**:


- `TicketFinder`(./entities/TicketFinder) 


---

##### newTimeserieFinder


```javascript
function newTimeserieFinder() -> 'TimeserieFinder'
```

This return a to find Timeserie configuration


**Returns**:


- _`TimeserieFinder`_ 


---

##### newTimeseriesFunctionFinder


```javascript
function newTimeseriesFunctionFinder() -> 'TimeseriesFunctionsFinder'
```

This return a util to find a timeseries function


**Returns**:


- _`TimeseriesFunctionsFinder`_ 


---

##### newTimeseriesFunctionsHelper


```javascript
function newTimeseriesFunctionsHelper() -> 'TimeseriesFunctionsHelper'
```

This return a TimeseriesFunctionsHelper


**Returns**:


- `TimeseriesFunctionsHelper`(./timeseriesFunctionsCatalog/TimeseriesFunctionsHelper) 


---

##### newUserFinder


```javascript
function newUserFinder() -> 'UserFinder'
```

This return a util to find a user


**Returns**:


- `UserFinder`(./users/UserFinder) 


---

##### newWorkgroupFinder


```javascript
function newWorkgroupFinder() -> 'WorkgroupFinder'
```

This return a util to find a workgroup


**Returns**:


- `WorkgroupFinder`(./workgroups/WorkgroupFinder) 


---

##### newWorkgroupRelationsFinder


```javascript
function newWorkgroupRelationsFinder() -> 'WorkgroupRelationsFinder'
```

This return a WorkgroupRelationsFinder 


**Returns**:


- `WorkgroupRelationsFinder`(./workgroups/WorkgroupRelationsFinder) 


---

##### notebookLauncherBuilder


```javascript
function notebookLauncherBuilder() -> 'NotebookLauncherBuilder'
```

This return a NotebookLauncherBuilder to build a specific NotebookLauncherBuilder


**Returns**:


- _`NotebookLauncherBuilder`_ 


---

##### notebookSchedulerBuilder


```javascript
function notebookSchedulerBuilder() -> 'NotebookSchedulerBuilder'
```

This return a NotebookSchedulerBuilder to build a specific NotebookSchedulerBuilder


**Returns**:


- _`NotebookSchedulerBuilder`_ 


---

##### operationalStatusSearchBuilder


```javascript
function operationalStatusSearchBuilder() -> 'OperationalStatusSearchBuilder'
```

This return a OperationalStatusSearchBuilder to build a specific OperationalStatusSearchBuilder


**Returns**:


- `OperationalStatusSearchBuilder`(./searching/builder/OperationalStatusSearchBuilder) 


---

##### operations


```javascript
function operations()
```




---

##### operationsSearchBuilder


```javascript
function operationsSearchBuilder() -> 'OperationsSearchBuilder'
```

This return a OperationsSearchBuilder to build a specific ExecutionssSearch


**Returns**:


- `OperationsSearchBuilder`(./searching/builder/OperationsSearchBuilder) 


---

##### operationTypeBuilder


```javascript
function operationTypeBuilder(organization: *,name: *,operationTypeObj: *) -> 'OperationType'
```

This return a util to update an Operation Type

**Arguments**:

- `organization` _*_  
- `name` _*_  
- `operationTypeObj` _*_  

**Returns**:


- `OperationType`(./operationTypes/OperationType) 


---

##### operationTypesSearchBuilder


```javascript
function operationTypesSearchBuilder() -> 'OperationTypesSearchBuilder'
```

This return a OperationTypesSearchBuilder to build a specific OperationTypesSearch


**Returns**:


- _`OperationTypesSearchBuilder`_ 


---

##### organizationManufacturerModelsBuilder


```javascript
function organizationManufacturerModelsBuilder(organization: *,manufacturerIdentifier: *) -> 'OrganizationManufacturerModelsBuilder'
```

This return a OrganizationManufacturerModelsBuilder to build a specific OrganizationManufacturerModelsBuilder

**Arguments**:

- `organization` _*_  
- `manufacturerIdentifier` _*_  

**Returns**:


- _`OrganizationManufacturerModelsBuilder`_ 


---

##### organizationManufacturersBuilder


```javascript
function organizationManufacturersBuilder(organization: *) -> 'OrganizationManufacturersBuilder'
```

This return a OrganizationManufacturersBuilder to build a specific OrganizationManufacturersBuilder

**Arguments**:

- `organization` _*_  

**Returns**:


- _`OrganizationManufacturersBuilder`_ 


---

##### organizationsBuilder


```javascript
function organizationsBuilder() -> 'Organizations'
```

This return a OrganizationsBuilder to build a specific OrganizationsBuilder


**Returns**:


- `Organizations`(./organizations/Organizations) 


---

##### plansSearchBuilder


```javascript
function plansSearchBuilder() -> 'PlansSearchBuilder'
```

This return a PlansSearchBuilder to build a specific PlansSearchBuilder


**Returns**:


- `PlansSearchBuilder`(./searching/builder/PlansSearchBuilder) 


---

##### powerSupplyMessageBuilder


```javascript
function powerSupplyMessageBuilder() -> 'PowerSupply'
```



**Returns**:


- `PowerSupply`(./collection/devices/collect/PowerSupply) 


---

##### provisionProcessorsBuilder


```javascript
function provisionProcessorsBuilder() -> 'provisionProcessorsBuilder'
```

This return a ProvisionsProcesorsBuilder to build a specific ProvisionsProcesorsBuilder


**Returns**:


- _`provisionProcessorsBuilder`_ 


---

##### qratingsBuilder


```javascript
function qratingsBuilder() -> 'QratingsBuilder'
```

This return a Qrating to build a specific Qrating


**Returns**:


- _`QratingsBuilder`_ 


---

##### rawSearchBuilder


```javascript
function rawSearchBuilder() -> 'RawSearchBuilder'
```

Create custom search with custom url and raw filter


**Returns**:


- `RawSearchBuilder`(./searching/builder/RawSearchBuilder) 


---

##### resourceTypeSearchBuilder


```javascript
function resourceTypeSearchBuilder() -> 'ResourceTypeSearchBuilder'
```

This return a ResourceTypeSearchBuilder to build a specific ResourceTypeSearchBuilder


**Returns**:


- `ResourceTypeSearchBuilder`(./searching/builder/ResourceTypeSearchBuilder) 


---

##### ruleConfigurationBuilder


```javascript
function ruleConfigurationBuilder(organization: *,channel: *,name: *,ruleConfigObj: *) -> 'RuleConfigurations'
```

This return a util to update a Rule Configuration

**Arguments**:

- `organization` _*_  
- `channel` _*_  
- `name` _*_  
- `ruleConfigObj` _*_  

**Returns**:


- `RuleConfigurations`(./rulesConfiguration/RuleConfigurations) 


---

##### rulesSearchBuilder


```javascript
function rulesSearchBuilder() -> 'RulesSearchBuilder'
```

This return a RulesSearchBuilder to build a specific RulesSearch


**Returns**:


- `RulesSearchBuilder`(./searching/builder/RulesSearchBuilder) 


---

##### Sapi


```javascript
function Sapi()
```




---

##### scheduleImageExecutionBuilder


```javascript
function scheduleImageExecutionBuilder() -> 'ImageExecution'
```

This return a util to build schedule image executions


**Returns**:


- `ImageExecution`(./schedule/ImageExecution) 


---

##### schedulePipelineBuilder


```javascript
function schedulePipelineBuilder() -> 'SchedulePipeline'
```

This return a util to build a pipeline


**Returns**:


- _`SchedulePipeline`_ 


---

##### scheduleRestRequestBuilder


```javascript
function scheduleRestRequestBuilder() -> 'RestRequest'
```

This return a util to build schedule rest requests


**Returns**:


- `RestRequest`(./schedule/RestRequest) 


---

##### SE


```javascript
function SE()
```




---

##### serviceGroupSearchBuilder


```javascript
function serviceGroupSearchBuilder() -> 'ServiceGroupSearchBuilder'
```

This return a ServiceGroupSearchBuilder to build a specific ServiceGroupSearchBuilder


**Returns**:


- `ServiceGroupSearchBuilder`(./searching/builder/ServiceGroupSearchBuilder) 


---

##### softwareMessageBuilder


```javascript
function softwareMessageBuilder() -> 'Software'
```



**Returns**:


- `Software`(./collection/devices/collect/Software) 


---

##### softwaresBuilder


```javascript
function softwaresBuilder(organization: *) -> 'SoftwaresBuilder'
```

This return a SoftwaresBuilder to build a specific SoftwaresBuilder

**Arguments**:

- `organization` _*_  

**Returns**:


- _`SoftwaresBuilder`_ 


---

##### softwaresSearchBuilder


```javascript
function softwaresSearchBuilder() -> 'SoftwaresSearchBuilder'
```

This return a SoftwaresSearchBuilder to build a specific SoftwaresSearchBuilder


**Returns**:


- `SoftwaresSearchBuilder`(./searching/builder/SoftwaresSearchBuilder) 


---

##### storageMessageBuilder


```javascript
function storageMessageBuilder() -> 'Storage'
```



**Returns**:


- `Storage`(./collection/devices/collect/Storage) 


---

##### subscriberMessageBuilder


```javascript
function subscriberMessageBuilder() -> 'SubscriberMessage'
```



**Returns**:


- _`SubscriberMessage`_ 


---

##### subscribersSearchBuilder


```javascript
function subscribersSearchBuilder() -> 'SubscribersSearchBuilder'
```

This return a SubscribersSearchBuilder to build a specific DeviceSearch


**Returns**:


- `SubscribersSearchBuilder`(./searching/builder/SubscribersSearchBuilder) 


---

##### subscriptionMessageBuilder


```javascript
function subscriptionMessageBuilder() -> 'SubscriptionMessage'
```



**Returns**:


- _`SubscriptionMessage`_ 


---

##### subscriptionsSearchBuilder


```javascript
function subscriptionsSearchBuilder() -> 'SubscriptionsSearchBuilder'
```

This return a SubscriptionsSearchBuilder to build a specific DeviceSearch


**Returns**:


- `SubscriptionsSearchBuilder`(./searching/builder/SubscriptionsSearchBuilder) 


---

##### tasksSearchBuilder


```javascript
function tasksSearchBuilder() -> 'TasksSearchBuilder'
```

This return a TasksSearchBuilder to build a specific TasksSearch


**Returns**:


- `TasksSearchBuilder`(./searching/builder/TasksSearchBuilder) 


---

##### ticketPrioritySearchBuilder


```javascript
function ticketPrioritySearchBuilder() -> 'TicketPrioritySearchBuilder'
```

This return a TicketPrioritySearchBuilder to build a specific TicketPrioritySearchBuilder


**Returns**:


- `TicketPrioritySearchBuilder`(./searching/builder/TicketPrioritySearchBuilder) 


---

##### ticketSeveritySearchBuilder


```javascript
function ticketSeveritySearchBuilder() -> 'TicketSeveritySearchBuilder'
```

This return a TicketSeveritySearchBuilder to build a specific TicketSeveritySearchBuilder


**Returns**:


- `TicketSeveritySearchBuilder`(./searching/builder/TicketSeveritySearchBuilder) 


---

##### ticketsSearchBuilder


```javascript
function ticketsSearchBuilder() -> '*'
```

This return a TicketsSearchBuilder to build a specific TicketSearch


**Returns**:


- _`*`_ 


---

##### ticketStatusSearchBuilder


```javascript
function ticketStatusSearchBuilder() -> 'TicketStatusSearchBuilder'
```

This return a TicketStatusSearchBuilder to build a specific TicketStatusSearchBuilder


**Returns**:


- `TicketStatusSearchBuilder`(./searching/builder/TicketStatusSearchBuilder) 


---

##### timeserieDatasetBuilder


```javascript
function timeserieDatasetBuilder(organization: *,timeserie: *) -> 'TimeserieDatasetBuilder'
```

This return a TimeserieDatasetBuilder to build a specific TimeserieDataset

**Arguments**:

- `organization` _*_  
- `timeserie` _*_  

**Returns**:


- `TimeserieDatasetBuilder`(./searching/builder/TimeserieDatasetBuilder) 


---

##### timeserieDownsamplerBuilder


```javascript
function timeserieDownsamplerBuilder(organization: *,timeserie: *,entityId: *) -> 'TimeserieDownsamplerBuilder'
```

This return a TimeserieDownsamplerBuilder to build a specific TimeserieDownsampler

**Arguments**:

- `organization` _*_  
- `timeserie` _*_  
- `entityId` _*_  

**Returns**:


- `TimeserieDownsamplerBuilder`(./searching/builder/TimeserieDownsamplerBuilder) 


---

##### timeseriesBuilder


```javascript
function timeseriesBuilder() -> 'Timeseries'
```

This return a TimeserieBuilder to build a specific timeserie


**Returns**:


- `Timeseries`(./timeseries/Timeseries) 


---

##### timeserieSearchBuilder


```javascript
function timeserieSearchBuilder(organization: *,timeserie: *) -> 'TimeserieSearchBuilder'
```

This return a TimeserieSearchBuilder to build a specific TimeserieSearch

**Arguments**:

- `organization` _*_  
- `timeserie` _*_  

**Returns**:


- `TimeserieSearchBuilder`(./searching/builder/TimeserieSearchBuilder) 


---

##### timeseriesFunctionBuilder


```javascript
function timeseriesFunctionBuilder(organization: *,identifier: *) -> 'TimeseriesFunction'
```

This return a TimeserieBuilder to build a specific timeserie

**Arguments**:

- `organization` _*_  
- `identifier` _*_  

**Returns**:


- `TimeseriesFunction`(./timeseriesFunctionsCatalog/TimeseriesFunction) 


---

##### timezoneSearchBuilder


```javascript
function timezoneSearchBuilder() -> 'TimezoneSearchBuilder'
```

This return a TimezoneSearchBuilder to build a specific TimezoneSearchBuilder


**Returns**:


- `TimezoneSearchBuilder`(./searching/builder/TimezoneSearchBuilder) 


---

##### usageMessageBuilder


```javascript
function usageMessageBuilder() -> 'Usage'
```



**Returns**:


- `Usage`(./collection/devices/collect/Usage) 


---

##### userLanguagesSearchBuilder


```javascript
function userLanguagesSearchBuilder() -> 'UserLanguagesSearchBuilder'
```

This return a UserLanguagesSearchBuilder to build a specific UserLanguagesSearchBuilder


**Returns**:


- `UserLanguagesSearchBuilder`(./searching/builder/UserLanguagesSearchBuilder) 


---

##### userProfilesSearchBuilder


```javascript
function userProfilesSearchBuilder() -> 'UserProfilesSearchBuilder'
```

This return a UserProfilesSearchBuilder to build a specific UserProfilesSearchBuilder


**Returns**:


- `UserProfilesSearchBuilder`(./searching/builder/UserProfilesSearchBuilder) 


---

##### usersBuilder


```javascript
function usersBuilder() -> 'User'
```

This return a util to create a user


**Returns**:


- `User`(./users/Users) 


---

##### usersSearchBuilder


```javascript
function usersSearchBuilder() -> 'UsersSearchBuilder'
```

This return a UsersSearchBuilder to build a specific UsersSearch


**Returns**:


- `UsersSearchBuilder`(./searching/builder/UsersSearchBuilder) 


---

##### workgroupRelationsBuilder


```javascript
function workgroupRelationsBuilder() -> 'WorkgroupRelations'
```

This return a WorkgroupRelationsBuilder to build a specific workgroup relation


**Returns**:


- `WorkgroupRelations`(./workgroups/WorkgroupRelations) 


---

##### workgroupsBuilder


```javascript
function workgroupsBuilder() -> 'Workgroups'
```

This return a WorkgroupsBuilder to build a specific workgroup


**Returns**:


- `Workgroups`(./workgroups/Workgroups) 


---

##### workgroupsSearchBuilder


```javascript
function workgroupsSearchBuilder() -> 'WorkgroupsSearchBuilder'
```

This return a WorkgroupsSearchBuilder to build a specific WorkgroupsSearch


**Returns**:


- `WorkgroupsSearchBuilder`(./searching/builder/WorkgroupsSearchBuilder) 


---

