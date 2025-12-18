+++
title = "Internal Open Gate API"
weight = 10
+++

**Class:** `InternalOpenGateAPI`

This is a abstract class, it must be extended to another class that defined the backend, it will be used on request to Opengate North API by browser or nodejs server

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **_options** | `{ url: string,port: string,version: string,apiKey: string}` | ❌ | this is configuration about Opengate North API. |
| **ampliaREST** | `AmpliaREST` | ❌ | this is a backend selected to manage a request to Opengate North API. |


---
## administrativeStateSearchBuilder()


This return a AdministrativeStateSearchBuilder to build a specific AdministrativeStateSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [AdministrativeStateSearchBuilder](./searching/builder/AdministrativeStateSearchBuilder)
<br>

{{% /notice %}}

---
## alarms





---
## alarmsSearchBuilder()


This return a AlarmsSearchBuilder to build a specific AlarmsSearch


### Retorna

{{% notice tip %}}
**Tipo:** [AlarmsSearchBuilder](./searching/builder/AlarmsSearchBuilder)
<br>

{{% /notice %}}

---
## allowedResourceTypeSearchBuilder()


This return a AllowedResourceTypeSearchBuilder to build a specific AllowedResourceTypeSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [AllowedResourceTypeSearchBuilder](./searching/builder/AllowedResourceTypeSearchBuilder)
<br>

{{% /notice %}}

---
## areasBuilder()


This return a AreasBuilder to build a specific area


### Retorna

{{% notice tip %}}
**Tipo:** [Areas](./areas/Areas)
<br>

{{% /notice %}}

---
## areasSearchBuilder()


This return a AreasSearchBuilder to build a specific AreasSearch


### Retorna

{{% notice tip %}}
**Tipo:** [AreasSearchBuilder](./searching/builder/AreasSearchBuilder)
<br>

{{% /notice %}}

---
## assetsSearchBuilder()


This return a AssetsSearchBuilder to build a specific AssetSearch


### Retorna

{{% notice tip %}}
**Tipo:** [AssetsSearchBuilder](./searching/builder/AssetsSearchBuilder)
<br>

{{% /notice %}}

---
## basicTypesSearchBuilder()




### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

---
## bulkExecutionBuilder(organization, processorId, timeout)


This return a util to create a bulk execution

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |
| **processorId** | `*` | ❌ |  |
| **timeout** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** [BulkExecutionBuilder](./provision/bulk/BulkExecutionBuilder)
<br>

{{% /notice %}}

---
## bulkExecutionSearchBuilder()


This return a BulkExecutionSearchBuilder to build a specific bulk


### Retorna

{{% notice tip %}}
**Tipo:** [BulkExecutionSearchBuilder](./searching/builder/BulkExecutionSearchBuilder)
<br>

{{% /notice %}}

---
## bulkSearchBuilder()


This return a BulkSearchBuilder to build a specific BulkSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [BulkSearchBuilder](./searching/builder/BulkSearchBuilder)
<br>

{{% /notice %}}

---
## bundlesBuilder()


This return a BundlesBuilder to build a specific BundlesBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [Bundles](./bundles/Bundles)
<br>

{{% /notice %}}

---
## bundlesSearchBuilder()


This return a BundlesSearchBuilder to build a specific BundlesSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [BundlesSearchBuilder](./searching/builder/BundlesSearchBuilder)
<br>

{{% /notice %}}

---
## certificatesBuilder()


This return a util to create a certificate


### Retorna

{{% notice tip %}}
**Tipo:** [Certificates](./security/Certificates)
<br>

{{% /notice %}}

---
## certificatesSearchBuilder()


This return a CertificatesSearchBuilder to build a specific CertificatesSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [CertificatesSearchBuilder](./searching/builder/CertificatesSearchBuilder)
<br>

{{% /notice %}}

---
## channelsBuilder()


This return a ChannelsBuilder to build a specific WorkgroupsSearch


### Retorna

{{% notice tip %}}
**Tipo:** [Channels](./channels/Channels)
<br>

{{% /notice %}}

---
## channelsSearchBuilder()


This return a ChannelsSearchBuilder to build a specific ChannelsSearch


### Retorna

{{% notice tip %}}
**Tipo:** [ChannelsSearchBuilder](./searching/builder/ChannelsSearchBuilder)
<br>

{{% /notice %}}

---
## commsModuleMessageMessageBuilder()




### Retorna

{{% notice tip %}}
**Tipo:** [CommsModuleMessage](./collection/devices/collect/CommsModuleMessage)
<br>

{{% /notice %}}

---
## communicationsModuleTypeSearchBuilder()


This return a CommunicationsModuleTypeSearchBuilder to build a specific CommunicationsModuleTypeSearch


### Retorna

{{% notice tip %}}
**Tipo:** [CommunicationsModuleTypeSearchBuilder](./searching/builder/CommunicationsModuleTypeSearchBuilder)
<br>

{{% /notice %}}

---
## connectorFunctionsBuilder(organization, channel, identifier, connectorFunctionData)


This return a ConnectorFunctions

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |
| **channel** | `*` | ❌ |  |
| **identifier** | `*` | ❌ |  |
| **connectorFunctionData** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** [ConnectorFunctions](./connectorsFunctions/configuration/ConnectorFunctions)
<br>

{{% /notice %}}

---
## connectorFunctionsCatalogBuilder(identifier, connectorFunctionsCatalog)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **identifier** | `String` | ❌ | only update or delete |
| **connectorFunctionsCatalog** | `Object` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** [ConnectorFunctionsCatalog](./connectorsFunctions/catalog/ConnectorFunctionsCatalog)
<br>

{{% /notice %}}

---
## countryCodesSearchBuilder()


This return a CountryCodesSearchBuilder to build a specific CountryCodesSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [CountryCodesSearchBuilder](./searching/builder/CountryCodesSearchBuilder)
<br>

{{% /notice %}}

---
## datamodelsBuilder(organization)


This return a Datamodels to build a specific Datamodels

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** [Datamodels](./iot/datamodels/Datamodels)
<br>

{{% /notice %}}

---
## datamodelsHelper(organization, datamodel)


This return a DatamodelsHelper to build a specific DatamodelsHelper

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |
| **datamodel** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** [DatamodelsHelper](./iot/datamodels/DatamodelsHelper)
<br>

{{% /notice %}}

---
## datamodelsSearchBuilder()


This return a DatamodelsSearchBuilder to build a specific DatamodelsSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [DatamodelsSearchBuilder](./searching/builder/DatamodelsSearchBuilder)
<br>

{{% /notice %}}

---
## datapointsBuilder()


This return a datapointsBuilder to build a specific Datapoint


### Retorna

{{% notice tip %}}
**Tipo:** [Datapoint](./collection/devices/collect/Datapoint)
<br>

{{% /notice %}}

---
## datapointsSearchBuilder()


This return a DatapointsSearchBuilder to build a specific DatapointsSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [DatapointsSearchBuilder](./searching/builder/DatapointsSearchBuilder)
<br>

{{% /notice %}}

---
## datasetEntitiesSearchBuilder(organization, dataset)


This return a DatasetEntitiesSearchBuilder to build a specific DatasetEntitiesSearch

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |
| **dataset** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** [DatasetEntitiesSearchBuilder](./searching/builder/DatasetEntitiesSearchBuilder)
<br>

{{% /notice %}}

---
## datasetsBuilder()


This return a DatasetBuilder to build a specific dataset


### Retorna

{{% notice tip %}}
**Tipo:** [Datasets](./datasets/Datasets)
<br>

{{% /notice %}}

---
## datasetsCatalogSearchBuilder()


This return a DatasetsCatalogSearchBuilder to build a specific DatasetsCatalogSearc


### Retorna

{{% notice tip %}}
**Tipo:** [DatasetsCatalogSearchBuilder](./searching/builder/DatasetsCatalogSearchBuilder)
<br>

{{% /notice %}}

---
## datasetSearchBuilder(organization, dataset)


This return a DatasetSearchBuilder to build a specific DatasetSearch

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |
| **dataset** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** [DatasetSearchBuilder](./searching/builder/DatasetSearchBuilder)
<br>

{{% /notice %}}

---
## datastreamBuilder()


This return a datastreamBuilder to build a specific Datastream


### Retorna

{{% notice tip %}}
**Tipo:** [Datastream](./iot/catalog/Datastream)
<br>

{{% /notice %}}

---
## datastreamsBuilder()


This return a datastream to build a specific Datastream


### Retorna

{{% notice tip %}}
**Tipo:** `DatastreamsBuilder`
<br>

{{% /notice %}}

---
## datastreamsSearchBuilder()


This return a DatastreamsSearchBuilder to build a specific DatastreamsSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [DatastreamsSearchBuilder](./searching/builder/DatastreamsSearchBuilder)
<br>

{{% /notice %}}

---
## deviceMessageBuilder()


This return a DevicesSouth to build a specific DevicesSouth


### Retorna

{{% notice tip %}}
**Tipo:** [DeviceMessage](./collection/devices/DeviceMessage)
<br>

{{% /notice %}}

---
## devicesPlansSearchBuilder()


This return a DevicePlansSearchBuilder to build a specific DevicePlansSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [PlansSearchBuilder](./searching/builder/PlansSearchBuilder)
<br>

{{% /notice %}}

---
## devicesSearchBuilder()


This return a DevicesSearchBuilder to build a specific DeviceSearch


### Retorna

{{% notice tip %}}
**Tipo:** [DevicesSearchBuilder](./searching/builder/DevicesSearchBuilder)
<br>

{{% /notice %}}

---
## domainsBuilder()


This return a DomainsBuilder to build a specific DomainsBuilder


### Retorna

{{% notice tip %}}
**Tipo:** `Domain`
<br>

{{% /notice %}}

---
## domainsSearchBuilder()


This return a DomainsSearchBuilder to build a specific DomainsSearch


### Retorna

{{% notice tip %}}
**Tipo:** [DomainsSearchBuilder](./searching/builder/DomainsSearchBuilder)
<br>

{{% /notice %}}

---
## entitiesSearchBuilder()


This return a EntitiesSearchBuilder to build a specific EntitiesSearch


### Retorna

{{% notice tip %}}
**Tipo:** [EntitiesSearchBuilder](./searching/builder/EntitiesSearchBuilder)
<br>

{{% /notice %}}

---
## entityBuilder





---
## EX





---
## executionsHistorySearchBuilder()


This return a ExecutionsHistorySearchBuilder to build a specific ExecutionsSearch


### Retorna

{{% notice tip %}}
**Tipo:** [ExecutionsHistorySearchBuilder](./searching/builder/ExecutionsHistorySearchBuilder)
<br>

{{% /notice %}}

---
## executionsSearchBuilder()


This return a ExecutionsSearchBuilder to build a specific ExecutionsSearch


### Retorna

{{% notice tip %}}
**Tipo:** [ExecutionsSearchBuilder](./searching/builder/ExecutionsSearchBuilder)
<br>

{{% /notice %}}

---
## feedsSearchBuilder()


This return a FeedsSearchBuilder to build a specific FeedsSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [FeedsSearchBuilder](./searching/builder/FeedsSearchBuilder)
<br>

{{% /notice %}}

---
## fieldsDefinitionSearchBuilder()


This return a FieldsDefinitionSearchBuilder to build a specific FieldsDefinitionSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [FieldsDefinitionSearchBuilder](./searching/builder/FieldsDefinitionSearchBuilder)
<br>

{{% /notice %}}

---
## geoclusterBuilder()


This return a util to regenerate geloclouster


### Retorna

{{% notice tip %}}
**Tipo:** [Geocluster](./geocluster/Geocluster)
<br>

{{% /notice %}}

---
## hardwareMessageBuilder()




### Retorna

{{% notice tip %}}
**Tipo:** [Hardware](./collection/devices/collect/Hardware)
<br>

{{% /notice %}}

---
## ioTDatastreamAccessSearchBuilder()


This return a IoTDatastreamAccessSearchBuilder to build a specific IoTDatastreamAccessSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [IoTDatastreamAccessSearchBuilder](./searching/builder/IoTDatastreamAccessSearchBuilder)
<br>

{{% /notice %}}

---
## ioTDatastreamPeriodSearchBuilder()


This return a IoTDatastreamPeriodSearchBuilder to build a specific IoTDatastreamPeriodSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [IoTDatastreamPeriodSearchBuilder](./searching/builder/IoTDatastreamPeriodSearchBuilder)
<br>

{{% /notice %}}

---
## ioTDatastreamStoragePeriodSearchBuilder()


This return a IoTDatastreamStoragePeriodSearchBuilder to build a specific IoTDatastreamStoragePeriodSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [IoTDatastreamStoragePeriodSearchBuilder](./searching/builder/IoTDatastreamStoragePeriodSearchBuilder)
<br>

{{% /notice %}}

---
## manufacturerModelsBuilder(manufacturerIdentifier)


This return a ManufacturerModelsBuilder to build a specific ManufacturerModelsBuilder

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **manufacturerIdentifier** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `ManufacturerModelsBuilder`
<br>

{{% /notice %}}

---
## manufacturersBuilder()


This return a ManufacturersBuilder to build a specific ManufacturersBuilder


### Retorna

{{% notice tip %}}
**Tipo:** `ManufacturersBuilder`
<br>

{{% /notice %}}

---
## mobileMessageMessageBuilder()




### Retorna

{{% notice tip %}}
**Tipo:** [Mobile](./collection/devices/collect/Mobile)
<br>

{{% /notice %}}

---
## mobilePhoneProviderSearchBuilder()


This return a MobilePhoneProviderSearchBuilder to build a specific MobilePhoneProviderTypeSearch


### Retorna

{{% notice tip %}}
**Tipo:** [MobilePhoneProviderSearchBuilder](./searching/builder/MobilePhoneProviderSearchBuilder)
<br>

{{% /notice %}}

---
## Napi





---
## newAreaFinder()


This return a util to find a area


### Retorna

{{% notice tip %}}
**Tipo:** [AreaFinder](./areas/AreaFinder)
<br>

{{% /notice %}}

---
## newBulkExecutionFinder()


This return a util to find summary and download a bulk executions


### Retorna

{{% notice tip %}}
**Tipo:** [BulkFinder](./bulk/BulkFinder)
<br>

{{% /notice %}}

---
## newBulkFinder()


This return a util to find and download a bulk


### Retorna

{{% notice tip %}}
**Tipo:** [BulkFinder](./bulk/BulkFinder)
<br>

{{% /notice %}}

---
## newBundleFinder()


This return a util to find a bundle


### Retorna

{{% notice tip %}}
**Tipo:** [BundleFinder](./bundles/BundleFinder)
<br>

{{% /notice %}}

---
## newCertificateFinder()


This return a util to find a certificate


### Retorna

{{% notice tip %}}
**Tipo:** [CertificateFinder](./security/CertificateFinder)
<br>

{{% /notice %}}

---
## newChannelFinder()


This return a util to find a channel


### Retorna

{{% notice tip %}}
**Tipo:** [ChannelFinder](./channels/ChannelFinder)
<br>

{{% /notice %}}

---
## newConnectorFunctionsCatalog()


This return a ConnectorFunctionsCatalog


### Retorna

{{% notice tip %}}
**Tipo:** [ConnectorFunctionsCatalog](./connectorsFunctions/catalog/ConnectorFunctionsCatalog)
<br>

{{% /notice %}}

---
## newConnectorFunctionsCatalogFinder()


This return a ConnectorFunctionsCatalogFinder 


### Retorna

{{% notice tip %}}
**Tipo:** [ConnectorFunctionsCatalogFinder](./connectorsFunctions/catalog/ConnectorFunctionsCatalogFinder)
<br>

{{% /notice %}}

---
## newConnectorFunctionsFinder()


This return a ConnectorFunctionsFinder 


### Retorna

{{% notice tip %}}
**Tipo:** [ConnectorFunctionsFinder](./connectorsFunctions/configuration/ConnectorFunctionsFinder)
<br>

{{% /notice %}}

---
## newConnectorFunctionsHelper()


This return a ConnectorFunctionsHelper


### Retorna

{{% notice tip %}}
**Tipo:** [ConnectorFunctionsHelper](./connectorsFunctions/configuration/ConnectorFunctionsHelper)
<br>

{{% /notice %}}

---
## newCountriesCatalog()


This return a util to find countries catalog


### Retorna

{{% notice tip %}}
**Tipo:** [CountriesCatalog](./provision/country/CountriesCatalog)
<br>

{{% /notice %}}

---
## newDatamodelsFinder()


This return a util to find a datamodel


### Retorna

{{% notice tip %}}
**Tipo:** [DatamodelsFinder](./iot/datamodels/DatamodelsFinder)
<br>

{{% /notice %}}

---
## newDatasetFinder()


This return a to find Dataset configuration


### Retorna

{{% notice tip %}}
**Tipo:** `DatasetFinder`
<br>

{{% /notice %}}

---
## newDeviceFinder()


This return a util to find a device


### Retorna

{{% notice tip %}}
**Tipo:** [DeviceFinder](./entities/DeviceFinder)
<br>

{{% /notice %}}

---
## newDomainFinder()


This return a util to find a domain


### Retorna

{{% notice tip %}}
**Tipo:** [DomainFinder](./domains/DomainsFinder)
<br>

{{% /notice %}}

---
## newEntityFinder()




### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

---
## newFilterBuilder()


This return a util to create your own filter to make searching


### Retorna

{{% notice tip %}}
**Tipo:** [FilterBuilder](./searching/FilterBuilder)
<br>

{{% /notice %}}

---
## newGeoclusterFinder()


This return a util to find a user


### Retorna

{{% notice tip %}}
**Tipo:** [GeoclusterFinder](./geocluster/GeoclusterFinder)
<br>

{{% /notice %}}

---
## newManufacturersFinder()


This return a util to find a hardware manufacturer


### Retorna

{{% notice tip %}}
**Tipo:** [ManufacturerFinder](./organization_manufacturer/ManufacturerFinder)
<br>

{{% /notice %}}

---
## newModelFinder()


This return a util to find a hardware model


### Retorna

{{% notice tip %}}
**Tipo:** [ModelFinder](./organization_manufacturer/ModelFinder)
<br>

{{% /notice %}}

---
## newNotebookFinder()


This return a util to find notebooks


### Retorna

{{% notice tip %}}
**Tipo:** [NotebookFinder](./notebookScheduler/NotebookFinder)
<br>

{{% /notice %}}

---
## newNotebookSchedulerFinder()


This return a util to find notebooks schedulers


### Retorna

{{% notice tip %}}
**Tipo:** `NotebookSchedulerFinder`
<br>

{{% /notice %}}

---
## newOperationActions(operationId)


This return a util to operation actions on an operation

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **operationId** | `string` | ❌ | identifier of operation |

### Retorna

{{% notice tip %}}
**Tipo:** [OperationActions](./operations/OperationActions)
<br>

{{% /notice %}}

---
## newOperationFinder()


This return a util to find a operation


### Retorna

{{% notice tip %}}
**Tipo:** [OperationFinder](./operations/OperationFinder)
<br>

{{% /notice %}}

---
## newOperationTypeCatalog()


This return a util to find Operation Types Templates


### Retorna

{{% notice tip %}}
**Tipo:** `OperationTypeCatalog`
<br>

{{% /notice %}}

---
## newOperationTypeFinder()


This return a util to find Operation Types


### Retorna

{{% notice tip %}}
**Tipo:** [OperationType](./operationTypes/OperationType)
<br>

{{% /notice %}}

---
## newOrganizationFinder()


This return a util to find a organization


### Retorna

{{% notice tip %}}
**Tipo:** [OrganizationFinder](./organizations/OrganizationFinder)
<br>

{{% /notice %}}

---
## newOrganizationManufacturersFinder()


This return a util to find a hardware manufacturer


### Retorna

{{% notice tip %}}
**Tipo:** `OrganizationManufacturerFinder`
<br>

{{% /notice %}}

---
## newOrganizationModelFinder()


This return a util to find a hardware model


### Retorna

{{% notice tip %}}
**Tipo:** `OrganizationModelFinder`
<br>

{{% /notice %}}

---
## newPeriodicityActions(taskId)


This return a util to manage actions over periodicities

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **taskId** | `string` | ❌ | identifier of operation |

### Retorna

{{% notice tip %}}
**Tipo:** [PeriodicityActions](./operations/PeriodicityActions)
<br>

{{% /notice %}}

---
## newProvisionProcessorsFinder()


This return a util to find a provision procesor


### Retorna

{{% notice tip %}}
**Tipo:** `ProvisionProcessorsFinder`
<br>

{{% /notice %}}

---
## newRuleConfigurationsCatalog()


This return a util to find Rule Configurations Templates


### Retorna

{{% notice tip %}}
**Tipo:** [RuleConfigurationsCatalog](./rulesConfiguration/RuleConfigurationsCatalog)
<br>

{{% /notice %}}

---
## newRuleConfigurationsFinder()


This return a util to find Rule Configurations


### Retorna

{{% notice tip %}}
**Tipo:** [RuleConfigurationsFinder](./rulesConfiguration/RuleConfigurationsFinder)
<br>

{{% /notice %}}

---
## newRuleConfigurationsHelper()


This return a util  RuleConfigurationsHelper


### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>
{RuleConfigurationsHelper
{{% /notice %}}

---
## newScheduleHistoryFinder()


This return a util to view schedule history


### Retorna

{{% notice tip %}}
**Tipo:** [HistoryFinder](./schedule/HistoryFinder)
<br>

{{% /notice %}}

---
## newScheduleImageExecutionFinder()


This return a util to view schedule image executions


### Retorna

{{% notice tip %}}
**Tipo:** [ImageExecutionFinder](./schedule/ImageExecutionFinder)
<br>

{{% /notice %}}

---
## newSchedulePipelineFinder()


This return a util to view schedule pipelines


### Retorna

{{% notice tip %}}
**Tipo:** [PipelineFinder](./schedule/PipelineFinder)
<br>

{{% /notice %}}

---
## newScheduleRestRequestFinder()


This return a util to view schedule rest requests


### Retorna

{{% notice tip %}}
**Tipo:** [RestRequestFinder](./schedule/RestRequestFinder)
<br>

{{% /notice %}}

---
## newSelectBuilder()


This return a util to create your own select to make searching


### Retorna

{{% notice tip %}}
**Tipo:** [SelectBuilder](./searching/SelectBuilder)
<br>

{{% /notice %}}

---
## newSoftwareFinder()


This return a util to find an organization software


### Retorna

{{% notice tip %}}
**Tipo:** [SoftwareFinder](./organization_software/SoftwareFinder)
<br>

{{% /notice %}}

---
## newSubscribersFinder()


This return a util to find a Subscriber


### Retorna

{{% notice tip %}}
**Tipo:** [SubscribersFinder](./entities/SubscribersFinder)
<br>

{{% /notice %}}

---
## newSubscriptionsFinder()


This return a util to find a Subscription


### Retorna

{{% notice tip %}}
**Tipo:** [SubscriptionsFinder](./entities/SubscriptionsFinder)
<br>

{{% /notice %}}

---
## newTicketFinder()


This return a util to find a ticket


### Retorna

{{% notice tip %}}
**Tipo:** [TicketFinder](./entities/TicketFinder)
<br>

{{% /notice %}}

---
## newTimeserieFinder()


This return a to find Timeserie configuration


### Retorna

{{% notice tip %}}
**Tipo:** `TimeserieFinder`
<br>

{{% /notice %}}

---
## newTimeseriesFunctionFinder()


This return a util to find a timeseries function


### Retorna

{{% notice tip %}}
**Tipo:** `TimeseriesFunctionsFinder`
<br>

{{% /notice %}}

---
## newTimeseriesFunctionsHelper()


This return a TimeseriesFunctionsHelper


### Retorna

{{% notice tip %}}
**Tipo:** [TimeseriesFunctionsHelper](./timeseriesFunctionsCatalog/TimeseriesFunctionsHelper)
<br>

{{% /notice %}}

---
## newUserFinder()


This return a util to find a user


### Retorna

{{% notice tip %}}
**Tipo:** [UserFinder](./users/UserFinder)
<br>

{{% /notice %}}

---
## newWorkgroupFinder()


This return a util to find a workgroup


### Retorna

{{% notice tip %}}
**Tipo:** [WorkgroupFinder](./workgroups/WorkgroupFinder)
<br>

{{% /notice %}}

---
## newWorkgroupRelationsFinder()


This return a WorkgroupRelationsFinder 


### Retorna

{{% notice tip %}}
**Tipo:** [WorkgroupRelationsFinder](./workgroups/WorkgroupRelationsFinder)
<br>

{{% /notice %}}

---
## notebookLauncherBuilder()


This return a NotebookLauncherBuilder to build a specific NotebookLauncherBuilder


### Retorna

{{% notice tip %}}
**Tipo:** `NotebookLauncherBuilder`
<br>

{{% /notice %}}

---
## notebookSchedulerBuilder()


This return a NotebookSchedulerBuilder to build a specific NotebookSchedulerBuilder


### Retorna

{{% notice tip %}}
**Tipo:** `NotebookSchedulerBuilder`
<br>

{{% /notice %}}

---
## operationalStatusSearchBuilder()


This return a OperationalStatusSearchBuilder to build a specific OperationalStatusSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [OperationalStatusSearchBuilder](./searching/builder/OperationalStatusSearchBuilder)
<br>

{{% /notice %}}

---
## operations





---
## operationsSearchBuilder()


This return a OperationsSearchBuilder to build a specific ExecutionssSearch


### Retorna

{{% notice tip %}}
**Tipo:** [OperationsSearchBuilder](./searching/builder/OperationsSearchBuilder)
<br>

{{% /notice %}}

---
## operationTypeBuilder(organization, name, operationTypeObj)


This return a util to update an Operation Type

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |
| **name** | `*` | ❌ |  |
| **operationTypeObj** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** [OperationType](./operationTypes/OperationType)
<br>

{{% /notice %}}

---
## operationTypesSearchBuilder()


This return a OperationTypesSearchBuilder to build a specific OperationTypesSearch


### Retorna

{{% notice tip %}}
**Tipo:** `OperationTypesSearchBuilder`
<br>

{{% /notice %}}

---
## organizationManufacturerModelsBuilder(organization, manufacturerIdentifier)


This return a OrganizationManufacturerModelsBuilder to build a specific OrganizationManufacturerModelsBuilder

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |
| **manufacturerIdentifier** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `OrganizationManufacturerModelsBuilder`
<br>

{{% /notice %}}

---
## organizationManufacturersBuilder(organization)


This return a OrganizationManufacturersBuilder to build a specific OrganizationManufacturersBuilder

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `OrganizationManufacturersBuilder`
<br>

{{% /notice %}}

---
## organizationsBuilder()


This return a OrganizationsBuilder to build a specific OrganizationsBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [Organizations](./organizations/Organizations)
<br>

{{% /notice %}}

---
## plansSearchBuilder()


This return a PlansSearchBuilder to build a specific PlansSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [PlansSearchBuilder](./searching/builder/PlansSearchBuilder)
<br>

{{% /notice %}}

---
## powerSupplyMessageBuilder()




### Retorna

{{% notice tip %}}
**Tipo:** [PowerSupply](./collection/devices/collect/PowerSupply)
<br>

{{% /notice %}}

---
## provisionProcessorsBuilder()


This return a ProvisionsProcesorsBuilder to build a specific ProvisionsProcesorsBuilder


### Retorna

{{% notice tip %}}
**Tipo:** `provisionProcessorsBuilder`
<br>

{{% /notice %}}

---
## qratingsBuilder()


This return a Qrating to build a specific Qrating


### Retorna

{{% notice tip %}}
**Tipo:** `QratingsBuilder`
<br>

{{% /notice %}}

---
## rawSearchBuilder()


Create custom search with custom url and raw filter


### Retorna

{{% notice tip %}}
**Tipo:** [RawSearchBuilder](./searching/builder/RawSearchBuilder)
<br>

{{% /notice %}}

---
## resourceTypeSearchBuilder()


This return a ResourceTypeSearchBuilder to build a specific ResourceTypeSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [ResourceTypeSearchBuilder](./searching/builder/ResourceTypeSearchBuilder)
<br>

{{% /notice %}}

---
## ruleConfigurationBuilder(organization, channel, name, ruleConfigObj)


This return a util to update a Rule Configuration

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |
| **channel** | `*` | ❌ |  |
| **name** | `*` | ❌ |  |
| **ruleConfigObj** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** [RuleConfigurations](./rulesConfiguration/RuleConfigurations)
<br>

{{% /notice %}}

---
## rulesSearchBuilder()


This return a RulesSearchBuilder to build a specific RulesSearch


### Retorna

{{% notice tip %}}
**Tipo:** [RulesSearchBuilder](./searching/builder/RulesSearchBuilder)
<br>

{{% /notice %}}

---
## Sapi





---
## scheduleImageExecutionBuilder()


This return a util to build schedule image executions


### Retorna

{{% notice tip %}}
**Tipo:** [ImageExecution](./schedule/ImageExecution)
<br>

{{% /notice %}}

---
## schedulePipelineBuilder()


This return a util to build a pipeline


### Retorna

{{% notice tip %}}
**Tipo:** `SchedulePipeline`
<br>

{{% /notice %}}

---
## scheduleRestRequestBuilder()


This return a util to build schedule rest requests


### Retorna

{{% notice tip %}}
**Tipo:** [RestRequest](./schedule/RestRequest)
<br>

{{% /notice %}}

---
## SE





---
## serviceGroupSearchBuilder()


This return a ServiceGroupSearchBuilder to build a specific ServiceGroupSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [ServiceGroupSearchBuilder](./searching/builder/ServiceGroupSearchBuilder)
<br>

{{% /notice %}}

---
## softwareMessageBuilder()




### Retorna

{{% notice tip %}}
**Tipo:** [Software](./collection/devices/collect/Software)
<br>

{{% /notice %}}

---
## softwaresBuilder(organization)


This return a SoftwaresBuilder to build a specific SoftwaresBuilder

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `SoftwaresBuilder`
<br>

{{% /notice %}}

---
## softwaresSearchBuilder()


This return a SoftwaresSearchBuilder to build a specific SoftwaresSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [SoftwaresSearchBuilder](./searching/builder/SoftwaresSearchBuilder)
<br>

{{% /notice %}}

---
## storageMessageBuilder()




### Retorna

{{% notice tip %}}
**Tipo:** [Storage](./collection/devices/collect/Storage)
<br>

{{% /notice %}}

---
## subscriberMessageBuilder()




### Retorna

{{% notice tip %}}
**Tipo:** `SubscriberMessage`
<br>

{{% /notice %}}

---
## subscribersSearchBuilder()


This return a SubscribersSearchBuilder to build a specific DeviceSearch


### Retorna

{{% notice tip %}}
**Tipo:** [SubscribersSearchBuilder](./searching/builder/SubscribersSearchBuilder)
<br>

{{% /notice %}}

---
## subscriptionMessageBuilder()




### Retorna

{{% notice tip %}}
**Tipo:** `SubscriptionMessage`
<br>

{{% /notice %}}

---
## subscriptionsSearchBuilder()


This return a SubscriptionsSearchBuilder to build a specific DeviceSearch


### Retorna

{{% notice tip %}}
**Tipo:** [SubscriptionsSearchBuilder](./searching/builder/SubscriptionsSearchBuilder)
<br>

{{% /notice %}}

---
## tasksSearchBuilder()


This return a TasksSearchBuilder to build a specific TasksSearch


### Retorna

{{% notice tip %}}
**Tipo:** [TasksSearchBuilder](./searching/builder/TasksSearchBuilder)
<br>

{{% /notice %}}

---
## ticketPrioritySearchBuilder()


This return a TicketPrioritySearchBuilder to build a specific TicketPrioritySearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [TicketPrioritySearchBuilder](./searching/builder/TicketPrioritySearchBuilder)
<br>

{{% /notice %}}

---
## ticketSeveritySearchBuilder()


This return a TicketSeveritySearchBuilder to build a specific TicketSeveritySearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [TicketSeveritySearchBuilder](./searching/builder/TicketSeveritySearchBuilder)
<br>

{{% /notice %}}

---
## ticketsSearchBuilder()


This return a TicketsSearchBuilder to build a specific TicketSearch


### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

---
## ticketStatusSearchBuilder()


This return a TicketStatusSearchBuilder to build a specific TicketStatusSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [TicketStatusSearchBuilder](./searching/builder/TicketStatusSearchBuilder)
<br>

{{% /notice %}}

---
## timeserieDatasetBuilder(organization, timeserie)


This return a TimeserieDatasetBuilder to build a specific TimeserieDataset

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |
| **timeserie** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** [TimeserieDatasetBuilder](./searching/builder/TimeserieDatasetBuilder)
<br>

{{% /notice %}}

---
## timeserieDownsamplerBuilder(organization, timeserie, entityId)


This return a TimeserieDownsamplerBuilder to build a specific TimeserieDownsampler

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |
| **timeserie** | `*` | ❌ |  |
| **entityId** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** [TimeserieDownsamplerBuilder](./searching/builder/TimeserieDownsamplerBuilder)
<br>

{{% /notice %}}

---
## timeseriesBuilder()


This return a TimeserieBuilder to build a specific timeserie


### Retorna

{{% notice tip %}}
**Tipo:** [Timeseries](./timeseries/Timeseries)
<br>

{{% /notice %}}

---
## timeserieSearchBuilder(organization, timeserie)


This return a TimeserieSearchBuilder to build a specific TimeserieSearch

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |
| **timeserie** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** [TimeserieSearchBuilder](./searching/builder/TimeserieSearchBuilder)
<br>

{{% /notice %}}

---
## timeseriesFunctionBuilder(organization, identifier)


This return a TimeserieBuilder to build a specific timeserie

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `*` | ❌ |  |
| **identifier** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** [TimeseriesFunction](./timeseriesFunctionsCatalog/TimeseriesFunction)
<br>

{{% /notice %}}

---
## timezoneSearchBuilder()


This return a TimezoneSearchBuilder to build a specific TimezoneSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [TimezoneSearchBuilder](./searching/builder/TimezoneSearchBuilder)
<br>

{{% /notice %}}

---
## usageMessageBuilder()




### Retorna

{{% notice tip %}}
**Tipo:** [Usage](./collection/devices/collect/Usage)
<br>

{{% /notice %}}

---
## userLanguagesSearchBuilder()


This return a UserLanguagesSearchBuilder to build a specific UserLanguagesSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [UserLanguagesSearchBuilder](./searching/builder/UserLanguagesSearchBuilder)
<br>

{{% /notice %}}

---
## userProfilesSearchBuilder()


This return a UserProfilesSearchBuilder to build a specific UserProfilesSearchBuilder


### Retorna

{{% notice tip %}}
**Tipo:** [UserProfilesSearchBuilder](./searching/builder/UserProfilesSearchBuilder)
<br>

{{% /notice %}}

---
## usersBuilder()


This return a util to create a user


### Retorna

{{% notice tip %}}
**Tipo:** [User](./users/Users)
<br>

{{% /notice %}}

---
## usersSearchBuilder()


This return a UsersSearchBuilder to build a specific UsersSearch


### Retorna

{{% notice tip %}}
**Tipo:** [UsersSearchBuilder](./searching/builder/UsersSearchBuilder)
<br>

{{% /notice %}}

---
## workgroupRelationsBuilder()


This return a WorkgroupRelationsBuilder to build a specific workgroup relation


### Retorna

{{% notice tip %}}
**Tipo:** [WorkgroupRelations](./workgroups/WorkgroupRelations)
<br>

{{% /notice %}}

---
## workgroupsBuilder()


This return a WorkgroupsBuilder to build a specific workgroup


### Retorna

{{% notice tip %}}
**Tipo:** [Workgroups](./workgroups/Workgroups)
<br>

{{% /notice %}}

---
## workgroupsSearchBuilder()


This return a WorkgroupsSearchBuilder to build a specific WorkgroupsSearch


### Retorna

{{% notice tip %}}
**Tipo:** [WorkgroupsSearchBuilder](./searching/builder/WorkgroupsSearchBuilder)
<br>

{{% /notice %}}

---

