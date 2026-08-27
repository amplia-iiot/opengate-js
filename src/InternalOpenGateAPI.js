'use strict';

import Operations from './operations/Operations';
import UserFinder from './users/UserFinder';
import GeoclusterFinder from './geocluster/GeoclusterFinder';
import Geocluster from './geocluster/Geocluster';
import Certificates from './security/Certificates';
import Users from './users/Users';
import OrganizationFinder from './organizations/OrganizationFinder';
import DomainsFinder from './organizations/DomainsFinder';
import ChannelFinder from './channels/ChannelFinder';
import AreasSearchBuilder from './searching/builder/AreasSearchBuilder';
import DatasetsCatalogSearchBuilder from './searching/builder/DatasetsCatalogSearchBuilder';
import AreaFinder from './areas/AreaFinder';
import BulkSearchBuilder from './searching/builder/BulkSearchBuilder';
import BulkExecutionSearchBuilder from './searching/builder/BulkExecutionSearchBuilder';
import BulkFinder from './bulk/BulkFinder';
import BulkExecutionFinder from './bulk/BulkExecutionFinder'
import Channels from './channels/Channels';
import Areas from './areas/Areas';
import Datasets from './datasets/Datasets';
import Timeseries from './timeseries/Timeseries';
import ChannelsSearchBuilder from './searching/builder/ChannelsSearchBuilder';
import RuleConfigurations from './rulesConfiguration/RuleConfigurations';
import RuleConfigurationsFinder from './rulesConfiguration/RuleConfigurationsFinder';
import RuleConfigurationsCatalog from './rulesConfiguration/RuleConfigurationsCatalog';
import RuleConfigurationsHelper from './rulesConfiguration/RuleConfigurationsHelper';
import DatasetFinder from './datasets/DatasetFinder';
import TimeserieFinder from './timeseries/TimeseriesFinder';
import TimeseriesFunctionsFinder from './timeseriesFunctionsCatalog/TimeseriesFunctionFinder';
import TimeseriesFunction from './timeseriesFunctionsCatalog/TimeseriesFunction';
import TimeseriesFunctionsHelper from './timeseriesFunctionsCatalog/TimeseriesFunctionsHelper';
import OperationType from './operationTypes/OperationType';
import OperationTypeFinder from './operationTypes/OperationTypeFinder';
import OperationTypeCatalog from './operationTypes/OperationTypeCatalog';
import CertificateFinder from './security/CertificateFinder';
import OperationFinder from './operations/OperationFinder';
import FilterBuilder from './searching/FilterBuilder';
import SelectBuilder from './searching/SelectBuilder';
import OperationActions from './operations/OperationActions';
import PeriodicityActions from './operations/PeriodicityActions';
import Expression from './util/Expression';
import SelectElement from './util/SelectElement';
import RawSearchBuilder from './searching/builder/RawSearchBuilder';
import DevicesSearchBuilder from './searching/builder/DevicesSearchBuilder';
import SubscribersSearchBuilder from './searching/builder/SubscribersSearchBuilder';
import SubscriptionsSearchBuilder from './searching/builder/SubscriptionsSearchBuilder';
import AssetsSearchBuilder from './searching/builder/AssetsSearchBuilder';
import TicketsSearchBuilder from './searching/builder/TicketsSearchBuilder';
import TasksSearchBuilder from './searching/builder/TasksSearchBuilder';
import OperationsSearchBuilder from './searching/builder/OperationsSearchBuilder';
import ExecutionsSearchBuilder from './searching/builder/ExecutionsSearchBuilder';
import ExecutionsHistorySearchBuilder from './searching/builder/ExecutionsHistorySearchBuilder';
import AlarmsSearchBuilder from './searching/builder/AlarmsSearchBuilder';
import DatamodelsSearchBuilder from './searching/builder/DatamodelsSearchBuilder';
import FeedsSearchBuilder from './searching/builder/FeedsSearchBuilder';
import DatastreamsSearchBuilder from './searching/builder/DatastreamsSearchBuilder';
import DatapointsSearchBuilder from './searching/builder/DatapointsSearchBuilder';
import BundlesSearchBuilder from './searching/builder/BundlesSearchBuilder';
import CertificatesSearchBuilder from './searching/builder/CertificatesSearchBuilder';
import SoftwaresSearchBuilder from './searching/builder/SoftwaresSearchBuilder';
import OperationalStatusSearchBuilder from './searching/builder/OperationalStatusSearchBuilder';
import ServiceGroupSearchBuilder from './searching/builder/ServiceGroupSearchBuilder';
import AdministrativeStateSearchBuilder from './searching/builder/AdministrativeStateSearchBuilder';
import CommunicationsModuleTypeSearchBuilder from './searching/builder/CommunicationsModuleTypeSearchBuilder';
import FieldsDefinitionSearchBuilder from './searching/builder/FieldsDefinitionSearchBuilder';
import BasicTypesSearchBuilder from './searching/builder/BasicTypesSearchBuilder';
import MobilePhoneProviderSearchBuilder from './searching/builder/MobilePhoneProviderSearchBuilder';
import IoTDatastreamPeriodSearchBuilder from './searching/builder/IoTDatastreamPeriodSearchBuilder';
import ResourceTypeSearchBuilder from './searching/builder/ResourceTypeSearchBuilder';
import AllowedResourceTypeSearchBuilder from './searching/builder/AllowedResourceTypeSearchBuilder';
import IoTDatastreamAccessSearchBuilder from './searching/builder/IoTDatastreamAccessSearchBuilder';
import IoTDatastreamStoragePeriodSearchBuilder from './searching/builder/IoTDatastreamStoragePeriodSearchBuilder';
import TicketSeveritySearchBuilder from './searching/builder/TicketSeveritySearchBuilder';
import TicketPrioritySearchBuilder from './searching/builder/TicketPrioritySearchBuilder';
import TicketStatusSearchBuilder from './searching/builder/TicketStatusSearchBuilder';
import RulesSearchBuilder from './searching/builder/RulesSearchBuilder';
import OperationTypesSearchBuilder from './searching/builder/OperationTypesSearchBuilder';
import UsersSearchBuilder from './searching/builder/UsersSearchBuilder';
import Bundles from './bundles/Bundles';
import BundleFinder from './bundles/BundleFinder';
import Organizations from './organizations/Organizations';
import DeviceFinder from './entities/DeviceFinder';
import TicketFinder from './entities/TicketFinder';
import SubscriptionsFinder from './entities/SubscriptionsFinder';
import SubscribersFinder from './entities/SubscribersFinder';
import DeviceMessage from './collection/devices/DeviceMessage';
import Datastream from './collection/devices/collect/Datastreams';
import Datapoint from './collection/devices/collect/Datapoint';
import Hardware from './collection/devices/collect/Hardware';
import Software from './collection/devices/collect/Software';
import Storage from './collection/devices/collect/Storage';
import Usage from './collection/devices/collect/Usage';
import PowerSupply from './collection/devices/collect/PowerSupply';
import CommsModuleMessage from './collection/devices/collect/CommsModuleMessage';
import Mobile from './collection/devices/collect/Mobile';
import SubscriberMessage from './collection/devices/collect/Subscriber';
import SubscriptionMessage from './collection/devices/collect/Subscription';
import WorkgroupRelations from './workgroups/WorkgroupRelations';
import Workgroups from './workgroups/Workgroups';
import WorkgroupFinder from './workgroups/WorkgroupFinder';
import WorkgroupsSearchBuilder from './searching/builder/WorkgroupsSearchBuilder';
import WorkgroupRelationsFinder from './workgroups/WorkgroupRelationsFinder';
import UserProfilesSearchBuilder from './searching/builder/UserProfilesSearchBuilder';
import Datamodels from './iot/datamodels/Datamodels';
import DatamodelsHelper from './iot/datamodels/DatamodelsHelper';
import DatamodelsFinder from './iot/datamodels/DatamodelsFinder';
import DatastreamsBuilder from './iot/catalog/Datastream';
import QratingsBuilder from './iot/catalog/Qrating';
import EntityBuilder from './provision/entities/EntityBuilder';
import BulkExecutionBuilder from './provision/bulk/BulkExecutionBuilder'
import EntitiesSearchBuilder from './searching/builder/EntitiesSearchBuilder';
import DatasetEntitiesSearchBuilder from './searching/builder/DatasetEntitiesSearchBuilder';
import DatasetSearchBuilder from './searching/builder/DatasetSearchBuilder';
import TimeserieSearchBuilder from './searching/builder/TimeserieSearchBuilder';
import TimeserieDownsamplerBuilder from './searching/builder/TimeserieDownsamplerBuilder';
import TimeserieDatasetBuilder from './searching/builder/TimeserieDatasetBuilder';
import CountryCodesSearchBuilder from './searching/builder/CountryCodesSearchBuilder';
import TimezoneSearchBuilder from './searching/builder/TimezoneSearchBuilder';
import UserLanguagesSearchBuilder from './searching/builder/UserLanguagesSearchBuilder';
import ProvisionProcessors from './provisionProcessors/provisionProcessors';
import ProvisionProcessorsFinder from './provisionProcessors/provisionProcessorsFinder';
import EntityFinder from './entities/EntityFinder';
import AlarmActions from './alarms/AlarmActions';
import _superagent from 'superagent';
import ConnectorFunctionsHelper from './connectorsFunctions/configuration/ConnectorFunctionsHelper';
import ConnectorFunctionsFinder from './connectorsFunctions/configuration/ConnectorFunctionsFinder';
import ConnectorFunctions from './connectorsFunctions/configuration/ConnectorFunctions';
import ConnectorFunctionsCatalogBuilder from './connectorsFunctions/catalog/ConnectorFunctions';
import ConnectorFunctionsCatalogFinder from './connectorsFunctions/catalog/ConnectorFunctionsCatalogFinder'
import ConnectorFunctionsCatalog from './connectorsFunctions/catalog/ConnectorFunctionsCatalog'
import ManufacturersBuilder from './manufacturers/Manufacturer'
import ManufacturerModelsBuilder from './manufacturers/Model'
import ManufacturerFinder from './manufacturers/ManufacturerFinder'
import ModelFinder from './manufacturers/ModelFinder'
import OrganizationManufacturersBuilder from './organization_manufacturer/Manufacturer'
import OrganizationManufacturerModelsBuilder from './organization_manufacturer/Model'
import OrganizationManufacturerFinder from './organization_manufacturer/ManufacturerFinder'
import OrganizationModelFinder from './organization_manufacturer/ModelFinder'
import OrganizationsSearchBuilder from './searching/builder/OrganizationsSearchBuilder';

import SoftwaresBuilder from './organization_software/Software'
import SoftwareFinder from './organization_software/SoftwareFinder'
import NotebookFinder from './notebookScheduler/NotebookFinder'
import NotebookSchedulerFinder from './notebookScheduler/SchedulerFinder'
import NotebookLauncherBuilder from './notebookScheduler/NotebookLauncher'
import NotebookSchedulerBuilder from './notebookScheduler/NotebookScheduler'

import ScheduleHistoryFinder from './schedule/HistoryFinder'
import ScheduleRestRequestFinder from './schedule/RestRequestFinder'
import ScheduleRestRequest from './schedule/RestRequest'

import ScheduleImageExecutionFinder from './schedule/ImageExecutionFinder'
import ScheduleImageExecution from './schedule/ImageExecution'

import SchedulePipelineFinder from './schedule/PipelineFinder'
import SchedulePipeline from './schedule/Pipeline'


import CountriesCatalog from './provision/country/CountriesCatalog';
import OrganizationPlans from './plan/OrganizationPlans';
import DevicePlans from './plan/DevicePlans';
import OrganizationPlansFinder from './plan/OrganizationPlansFinder';
import DevicePlansFinder from './plan/DevicePlansFinder';


const RequestEndMonkeyPatching = (function () {
    let beforeStart
    const end = _superagent.Request.prototype.end;

    _superagent.Request.prototype.end = function (cb) {
        if (beforeStart && beforeStart.call) beforeStart(this)
        return end.call(this, function (err, res) {
            if (typeof cb !== 'function') {
                return;
            }
            cb(err, res);
        });
    };

    return function setCallback(cb) {
        beforeStart = cb
    }
})()
/**
 * This is an abstract class. It must be extended by another class that defines the backend, and it is used to make
 * requests to the OpenGate North API from a browser or a Node.js server.
 */
export default class InternalOpenGateAPI {
    /**
     * Constructor
     * @param {{ url: string,port: string,version: string,apiKey: string}} _options - this is configuration about Opengate North API.
     * @param {AmpliaREST} ampliaREST - this is a backend selected to manage a request to Opengate North API.
     */
    constructor(northAmpliaREST, southAmpliaREST, _options) {
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
            RequestEndMonkeyPatching(_options.hooks.beforeStart)
        }
        this.Napi = northAmpliaREST;
        this.Sapi = southAmpliaREST;
        this.EX = Expression;
        this.SE = SelectElement;
        this.operations = new Operations(this);
        this.alarms = new AlarmActions(this)
        this.entityBuilder = new EntityBuilder(this);
    }

    /**
     * This returns a util to find a user
     * @return {UserFinder}
     */
    newUserFinder() {
        return new UserFinder(this);
    }
    /**
     * This returns a util to find a user
     * @return {GeoclusterFinder}
     */
    newGeoclusterFinder() {
        return new GeoclusterFinder(this);
    }

    /**
     * This returns a util to regenerate geloclouster
     * @return {Geocluster}
     */
    geoclusterBuilder() {
        return new Geocluster(this);
    }

    /**
     * This returns a util to find a domains hierarchy
     * @return {DomainsFinder}
     */
    newDomainsFinder() {
        return new DomainsFinder(this);
    }

    /**
     * This returns a util to find a organization
     * @return {OrganizationFinder}
     */
    newOrganizationFinder() {
        return new OrganizationFinder(this);
    }

    /**
     * This returns a util to find a channel
     * @return {ChannelFinder}
     */
    newChannelFinder() {
        return new ChannelFinder(this);
    }

    /**
     * This returns a AreasSearchBuilder to build a specific AreasSearch
     * @return {AreasSearchBuilder}
     */
    areasSearchBuilder() {
        return new AreasSearchBuilder(this);
    }

    /**
     * This returns a DatasetsCatalogSearchBuilder to build a specific DatasetsCatalogSearc
     * @return {DatasetsCatalogSearchBuilder}
     */
    datasetsCatalogSearchBuilder() {
        return new DatasetsCatalogSearchBuilder(this);
    }

    /**
     * This returns a BulkSearchBuilder to build a specific BulkSearchBuilder
     * @return {BulkSearchBuilder}
     */
    bulkSearchBuilder() {
        return new BulkSearchBuilder(this);
    }

    /**
     * This returns a BulkExecutionSearchBuilder to build a specific bulk
     * @return {BulkExecutionSearchBuilder}
     */
    bulkExecutionSearchBuilder() {
        return new BulkExecutionSearchBuilder(this);
    }

    /**
     * This returns a util to find and download a bulk
     * @return {BulkFinder}
     */
    newBulkFinder() {
        return new BulkFinder(this);
    }

    /**
     * This returns a util to find summary and download a bulk executions
     * @return {BulkFinder}
     */
    newBulkExecutionFinder() {
        return new BulkExecutionFinder(this)
    }

    /**
     * This returns a util to find a area
     * @return {AreaFinder}
     */
    newAreaFinder() {
        return new AreaFinder(this);
    }

    /**
     * This returns a util to find a operation
     * @return {OperationFinder}
     */
    newOperationFinder() {
        return new OperationFinder(this);
    }

    /**
     * This returns a util to find Operation Types
     * @return {OperationType}
     */
    newOperationTypeFinder() {
        return new OperationTypeFinder(this);
    }

    /**
     * This returns a util to find Operation Types Templates
     * @return {OperationTypeCatalog}
     */
    newOperationTypeCatalog() {
        return new OperationTypeCatalog(this);
    }

    /**
     * This returns a util to find countries catalog
     * @return {CountriesCatalog}
     */
    newCountriesCatalog() {
        return new CountriesCatalog(this);
    }


    /**
     * This returns a util to update an Operation Type
     * @return {OperationType}
     */
    operationTypeBuilder(organization, name, operationTypeObj) {
        return new OperationType(this, organization, name, operationTypeObj);
    }

    /**
     * This returns a util to find Rule Configurations
     * @return {RuleConfigurationsFinder}
     */
    newRuleConfigurationsFinder() {
        return new RuleConfigurationsFinder(this);
    }

    /**
     * This returns a util RuleConfigurationsHelper
     * @return {RuleConfigurationsHelper
     */
    newRuleConfigurationsHelper() {
        return new RuleConfigurationsHelper(this);
    }

    /**
     * This returns a to find Dataset configuration
     * @return {DatasetFinder}
     */
    newDatasetFinder() {
        return new DatasetFinder(this);
    }

    /**
     * This returns a to find Timeserie configuration
     * @return {TimeserieFinder}
     */
    newTimeserieFinder() {
        return new TimeserieFinder(this);
    }

    /**
     * This returns a util to find Rule Configurations Templates
     * @return {RuleConfigurationsCatalog}
     */
    newRuleConfigurationsCatalog() {
        return new RuleConfigurationsCatalog(this);
    }

    /**
     * This returns a util to update a Rule Configuration
     * @return {RuleConfigurations}
     */
    ruleConfigurationBuilder(organization, channel, name, ruleConfigObj) {
        return new RuleConfigurations(this, organization, channel, name, ruleConfigObj);
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
    newCertificateFinder() {
        return new CertificateFinder(this);
    }

    /**
     * This returns a util to find a device
     * @return {DeviceFinder}
     */
    newDeviceFinder() {
        return new DeviceFinder(this);
    }

    /**
     * This returns a util to find a ticket
     * @return {TicketFinder}
     */
    newTicketFinder() {
        return new TicketFinder(this);
    }


    /**
     * This returns a util to find a Subscription
     * @return {SubscriptionsFinder}
     */
    newSubscriptionsFinder() {
        return new SubscriptionsFinder(this);
    }

    /**
     * This returns a util to find a Subscriber
     * @return {SubscribersFinder}
     */
    newSubscribersFinder() {
        return new SubscribersFinder(this);
    }


    newEntityFinder() {
        return new EntityFinder(this);
    }

    /**
     * This returns a util to create your own filter to make searching
     * @return {FilterBuilder}
     */
    newFilterBuilder() {
        return new FilterBuilder();
    }

    /**
     * This returns a util to create your own select to make searching
     * @return {SelectBuilder}
     */
    newSelectBuilder() {
        return new SelectBuilder();
    }

    /**
     * Create custom search with custom url and raw filter
     * @return {RawSearchBuilder}
     */
    rawSearchBuilder() {
        return new RawSearchBuilder(this);
    }

    /**
     * This returns a UsersSearchBuilder to build a specific UsersSearch
     * @return {UsersSearchBuilder}
     */
    usersSearchBuilder() {
        return new UsersSearchBuilder(this);
    }

    /**
     * This returns a DevicesSearchBuilder to build a specific DeviceSearch
     * @return {DevicesSearchBuilder}
     */
    devicesSearchBuilder() {
        return new DevicesSearchBuilder(this);
    }

    /**
     * This returns a AssetsSearchBuilder to build a specific AssetSearch
     * @return {AssetsSearchBuilder}
     */
    assetsSearchBuilder() {
        return new AssetsSearchBuilder(this);
    }

    /**
     * This returns a SubscribersSearchBuilder to build a specific DeviceSearch
     * @return {SubscribersSearchBuilder}
     */
    subscribersSearchBuilder() {
        return new SubscribersSearchBuilder(this);
    }

    /**
     * This returns a SubscriptionsSearchBuilder to build a specific DeviceSearch
     * @return {SubscriptionsSearchBuilder}
     */
    subscriptionsSearchBuilder() {
        return new SubscriptionsSearchBuilder(this);
    }

    /**
     * This returns a TicketsSearchBuilder to build a specific TicketSearch
     */
    ticketsSearchBuilder() {
        return new TicketsSearchBuilder(this);
    }
    /**
     * This returns a CommunicationsModuleTypeSearchBuilder to build a specific CommunicationsModuleTypeSearch
     * @return {CommunicationsModuleTypeSearchBuilder}
     */
    communicationsModuleTypeSearchBuilder() {
        return new CommunicationsModuleTypeSearchBuilder(this);
    }

    /**
     * This returns a FieldsDefinitionSearchBuilder to build a specific FieldsDefinitionSearchBuilder
     * @return {FieldsDefinitionSearchBuilder}
     */
    fieldsDefinitionSearchBuilder() {
        return new FieldsDefinitionSearchBuilder(this);
    }

    /**
     * This returns a MobilePhoneProviderSearchBuilder to build a specific MobilePhoneProviderTypeSearch
     * @return {MobilePhoneProviderSearchBuilder}
     */
    mobilePhoneProviderSearchBuilder() {
        return new MobilePhoneProviderSearchBuilder(this);
    }

    /**
     * This returns a IoTDatastreamPeriodSearchBuilder to build a specific IoTDatastreamPeriodSearchBuilder
     * @return {IoTDatastreamPeriodSearchBuilder}
     */
    ioTDatastreamPeriodSearchBuilder() {
        return new IoTDatastreamPeriodSearchBuilder(this);
    }

    /**
     * This returns a ResourceTypeSearchBuilder to build a specific ResourceTypeSearchBuilder
     * @return {ResourceTypeSearchBuilder}
     */
    resourceTypeSearchBuilder() {
        return new ResourceTypeSearchBuilder(this);
    }

    /**
     * This returns a AllowedResourceTypeSearchBuilder to build a specific AllowedResourceTypeSearchBuilder
     * @return {AllowedResourceTypeSearchBuilder}
     */
    allowedResourceTypeSearchBuilder() {
        return new AllowedResourceTypeSearchBuilder(this);
    }



    /**
     * This returns a IoTDatastreamAccessSearchBuilder to build a specific IoTDatastreamAccessSearchBuilder
     * @return {IoTDatastreamAccessSearchBuilder}
     */
    ioTDatastreamAccessSearchBuilder() {
        return new IoTDatastreamAccessSearchBuilder(this);
    }

    /**
     * This returns a IoTDatastreamStoragePeriodSearchBuilder to build a specific
     * IoTDatastreamStoragePeriodSearchBuilder
     * @return {IoTDatastreamStoragePeriodSearchBuilder}
     */
    ioTDatastreamStoragePeriodSearchBuilder() {
        return new IoTDatastreamStoragePeriodSearchBuilder(this);
    }

    /**
     * This returns a TicketSeveritySearchBuilder to build a specific TicketSeveritySearchBuilder
     * @return {TicketSeveritySearchBuilder}
     */
    ticketSeveritySearchBuilder() {
        return new TicketSeveritySearchBuilder(this);
    }

    /**
     * This returns a TicketPrioritySearchBuilder to build a specific TicketPrioritySearchBuilder
     * @return {TicketPrioritySearchBuilder}
     */
    ticketPrioritySearchBuilder() {
        return new TicketPrioritySearchBuilder(this);
    }

    /**
     * This returns a TicketStatusSearchBuilder to build a specific TicketStatusSearchBuilder
     * @return {TicketStatusSearchBuilder}
     */
    ticketStatusSearchBuilder() {
        return new TicketStatusSearchBuilder(this);
    }

    /**
     * This returns a RulesSearchBuilder to build a specific RulesSearch
     * @return {RulesSearchBuilder}
     */
    rulesSearchBuilder() {
        return new RulesSearchBuilder(this);
    }

    /**
     * This returns a OperationTypesSearchBuilder to build a specific OperationTypesSearch
     * @return {OperationTypesSearchBuilder}
     */
    operationTypesSearchBuilder() {
        return new OperationTypesSearchBuilder(this);
    }

    /**
     * This returns a TasksSearchBuilder to build a specific TasksSearch
     * @return {TasksSearchBuilder}
     */
    tasksSearchBuilder() {
        return new TasksSearchBuilder(this);
    }

    /**
     * This returns a OperationsSearchBuilder to build a specific ExecutionssSearch
     * @return {OperationsSearchBuilder}
     */
    operationsSearchBuilder() {
        return new OperationsSearchBuilder(this);
    }

    /**
     * This returns a ExecutionsSearchBuilder to build a specific ExecutionsSearch
     * @return {ExecutionsSearchBuilder}
     */
    executionsSearchBuilder() {
        return new ExecutionsSearchBuilder(this);
    }
    /**
     * This returns a ExecutionsHistorySearchBuilder to build a specific ExecutionsSearch
     * @return {ExecutionsHistorySearchBuilder}
     */
    executionsHistorySearchBuilder() {
        return new ExecutionsHistorySearchBuilder(this);
    }

    /**
     * This returns a AlarmsSearchBuilder to build a specific AlarmsSearch
     * @return {AlarmsSearchBuilder}
     */
    alarmsSearchBuilder() {
        return new AlarmsSearchBuilder(this);
    }

    /**
     * This returns a DatastreamsSearchBuilder to build a specific DatastreamsSearchBuilder
     * @return {DatastreamsSearchBuilder}
     */
    datastreamsSearchBuilder() {
        return new DatastreamsSearchBuilder(this);
    }

    /**
     * This returns a DatamodelsSearchBuilder to build a specific DatamodelsSearchBuilder
     * @return {DatamodelsSearchBuilder}
     */
    datamodelsSearchBuilder() {
        return new DatamodelsSearchBuilder(this);
    }

    /**
     * This returns a FeedsSearchBuilder to build a specific FeedsSearchBuilder
     * @return {FeedsSearchBuilder}
     */
    feedsSearchBuilder() {
        return new FeedsSearchBuilder(this);
    }


    /**
     * This returns a DatapointsSearchBuilder to build a specific DatapointsSearchBuilder
     * @return {DatapointsSearchBuilder}
     */
    datapointsSearchBuilder() {
        return new DatapointsSearchBuilder(this);
    }

    /**
     * This returns a BundlesSearchBuilder to build a specific BundlesSearchBuilder
     * @return {BundlesSearchBuilder}
     */
    bundlesSearchBuilder() {
        return new BundlesSearchBuilder(this);
    }

    /**
     * This returns a CertificatesSearchBuilder to build a specific CertificatesSearchBuilder
     * @return {CertificatesSearchBuilder}
     */
    certificatesSearchBuilder() {
        return new CertificatesSearchBuilder(this);
    }

    /**
     * 
     */
    basicTypesSearchBuilder() {
        return new BasicTypesSearchBuilder(this);
    }

    /**
     * This returns a EntitiesSearchBuilder to build a specific EntitiesSearch
     * @return {EntitiesSearchBuilder}
     */
    entitiesSearchBuilder() {
        return new EntitiesSearchBuilder(this);
    }

    /**
     * This returns a DatasetEntitiesSearchBuilder to build a specific DatasetEntitiesSearch
     * @return {DatasetEntitiesSearchBuilder}
     */
    datasetEntitiesSearchBuilder(organization, dataset) {
        return new DatasetEntitiesSearchBuilder(this, organization, dataset);
    }

    /**
     * This returns a DatasetSearchBuilder to build a specific DatasetSearch
     * @return {DatasetSearchBuilder}
     */
    datasetSearchBuilder(organization, dataset) {
        return new DatasetSearchBuilder(this, organization, dataset);
    }

    /**
     * This returns a TimeserieSearchBuilder to build a specific TimeserieSearch
     * @return {TimeserieSearchBuilder}
     */
    timeserieSearchBuilder(organization, timeserie) {
        return new TimeserieSearchBuilder(this, organization, timeserie);
    }

    /**
     * This returns a TimeserieDownsamplerBuilder to build a specific TimeserieDownsampler
     * @return {TimeserieDownsamplerBuilder}
     */
    timeserieDownsamplerBuilder(organization, timeserie, entityId) {
        return new TimeserieDownsamplerBuilder(this, organization, timeserie, entityId);
    }

    /**
     * This returns a TimeserieDatasetBuilder to build a specific TimeserieDataset
     * @return {TimeserieDatasetBuilder}
     */
    timeserieDatasetBuilder(organization, timeserie) {
        return new TimeserieDatasetBuilder(this, organization, timeserie);
    }

    /**
     * This returns a BundlesBuilder to build a specific BundlesBuilder
     * @return {Bundles}
     */
    bundlesBuilder() {
        return new Bundles(this);
    }

    /**
     * This returns a util to find a bundle
     * @return {BundleFinder}
     */
    newBundleFinder() {
        return new BundleFinder(this);
    }

    /**
     * This returns a OrganizationsBuilder to build a specific OrganizationsBuilder
     * @return {Organizations}
     */
    organizationsBuilder() {
        return new Organizations(this);
    }

    /**
     * This returns a util to create a user
     * @return {User}
     */
    usersBuilder() {
        return new Users(this);
    }

    /**
     * This returns a util to create a certificate
     * @return {Certificates}
     */
    certificatesBuilder() {
        return new Certificates(this);
    }

    /**
     * This returns a SoftwaresSearchBuilder to build a specific SoftwaresSearchBuilder
     * @return {SoftwaresSearchBuilder}
     */
    softwaresSearchBuilder() {
        return new SoftwaresSearchBuilder(this);
    }

    /**
     * This returns a OperationalStatusSearchBuilder to build a specific OperationalStatusSearchBuilder
     * @return {OperationalStatusSearchBuilder}
     */
    operationalStatusSearchBuilder() {
        return new OperationalStatusSearchBuilder(this);
    }

    /**
     * This returns a ServiceGroupSearchBuilder to build a specific ServiceGroupSearchBuilder
     * @return {ServiceGroupSearchBuilder}
     */
    serviceGroupSearchBuilder() {
        return new ServiceGroupSearchBuilder(this);
    }

    /**
     * This returns a AdministrativeStateSearchBuilder to build a specific AdministrativeStateSearchBuilder
     * @return {AdministrativeStateSearchBuilder}
     */
    administrativeStateSearchBuilder() {
        return new AdministrativeStateSearchBuilder(this);
    }

    /**
     * This returns a DevicesSouth to build a specific DevicesSouth
     * @return {DeviceMessage}
     */
    deviceMessageBuilder() {
        return new DeviceMessage(this);
    }

    /**
     * This returns a datastreamBuilder to build a specific Datastream
     * @return {Datastream}
     */
    datastreamBuilder() {
        return new Datastream(this);
    }

    /**
     * This returns a datapointsBuilder to build a specific Datapoint
     * @return {Datapoint}
     */
    datapointsBuilder() {
        return new Datapoint(this);
    }

    /**
     * @return {Hardware}
     */
    hardwareMessageBuilder() {
        return new Hardware(this);
    }

    /**
     * @return {Software}
     */
    softwareMessageBuilder() {
        return new Software(this);
    }

    /**
     * @return {Storage}
     */
    storageMessageBuilder() {
        return new Storage(this);
    }

    /**
     * @return {Usage}
     */
    usageMessageBuilder() {
        return new Usage(this);
    }

    /**
     * @return {PowerSupply}
     */
    powerSupplyMessageBuilder() {
        return new PowerSupply(this);
    }

    /**
     * @return {CommsModuleMessage}
     */
    commsModuleMessageMessageBuilder() {
        return new CommsModuleMessage(this);
    }

    /**
     * @return {SubscriberMessage}
     */
    subscriberMessageBuilder() {
        return new SubscriberMessage(this);
    }

    /**
     * @return {SubscriptionMessage}
     */
    subscriptionMessageBuilder() {
        return new SubscriptionMessage(this);
    }

    /**
     * @return {Mobile}
     */
    mobileMessageMessageBuilder() {
        return new Mobile(this);
    }

    /**
     * This returns a util to operation actions on an operation
     * @param {!string} operationId - identifier of operation
     * @return {OperationActions}
     */
    newOperationActions(operationId) {
        return new OperationActions(this, operationId);
    }

    /**
     * This returns a util to manage actions over periodicities
     * @param {!string} taskId - identifier of operation
     * @return {PeriodicityActions}
     */
    newPeriodicityActions(taskId) {
        return new PeriodicityActions(this, taskId);
    }

    /**
     * This returns a WorkgroupRelationsBuilder to build a specific workgroup relation
     * @return {WorkgroupRelations}
     */
    workgroupRelationsBuilder() {
        return new WorkgroupRelations(this);
    }

    /**
     * This returns a WorkgroupRelationsFinder
     * @return {WorkgroupRelationsFinder}
     */
    newWorkgroupRelationsFinder() {
        return new WorkgroupRelationsFinder(this);
    }


    /**
     * This returns a WorkgroupsBuilder to build a specific workgroup
     * @return {Workgroups}
     */
    workgroupsBuilder() {
        return new Workgroups(this);
    }

    /**
     * This returns a util to find a workgroup
     * @return {WorkgroupFinder}
     */
    newWorkgroupFinder() {
        return new WorkgroupFinder(this);
    }

    /**
     * This returns a WorkgroupsSearchBuilder to build a specific WorkgroupsSearch
     * @return {WorkgroupsSearchBuilder}
     */
    workgroupsSearchBuilder() {
        return new WorkgroupsSearchBuilder(this);
    }

    /**
     * This returns a ChannelsBuilder to build a specific WorkgroupsSearch
     * @return {Channels}
     */
    channelsBuilder() {
        return new Channels(this);
    }

    /**
     * This returns a AreasBuilder to build a specific area
     * @return {Areas}
     */
    areasBuilder() {
        return new Areas(this);
    }

    /**
     * This returns a DatasetBuilder to build a specific dataset
     * @return {Datasets}
     */
    datasetsBuilder() {
        return new Datasets(this);
    }

    /**
     * This returns a TimeserieBuilder to build a specific timeserie
     * @return {Timeseries}
     */
    timeseriesBuilder() {
        return new Timeseries(this);
    }

    /**
     * This returns a util to find a timeseries function
     * @return {TimeseriesFunctionsFinder}
     */
    newTimeseriesFunctionFinder() {
        return new TimeseriesFunctionsFinder(this);
    }

    /**
     * This returns a TimeserieBuilder to build a specific timeserie
     * @return {TimeseriesFunction}
     */
    timeseriesFunctionBuilder(organization, identifier) {
        return new TimeseriesFunction(this, organization, identifier);
    }

    /**
     * This returns a TimeseriesFunctionsHelper
     * @return {TimeseriesFunctionsHelper}
     */
    newTimeseriesFunctionsHelper() {
        return new TimeseriesFunctionsHelper(this)
    }

    /**
     * This returns a ChannelsSearchBuilder to build a specific ChannelsSearch
     * @return {ChannelsSearchBuilder}
     */
    channelsSearchBuilder() {
        return new ChannelsSearchBuilder(this);
    }

    /**
     * This returns a UserProfilesSearchBuilder to build a specific UserProfilesSearchBuilder
     * @return {UserProfilesSearchBuilder}
     */
    userProfilesSearchBuilder() {
        return new UserProfilesSearchBuilder(this);
    }

    /**
     * This returns a Datamodels to build a specific Datamodels
     * @return {Datamodels}
     */
    datamodelsBuilder(organization) {
        return new Datamodels(this, organization);
    }

    /**
     * This returns a DatamodelsHelper to build a specific DatamodelsHelper
     * @return {DatamodelsHelper}
     */
    datamodelsHelper(organization, datamodel) {
        return new DatamodelsHelper(this, organization, datamodel);
    }

    /**
     * This returns a util to find a datamodel
     * @return {DatamodelsFinder}
     */
    newDatamodelsFinder() {
        return new DatamodelsFinder(this);
    }

    /**
     * This returns a datastream to build a specific Datastream
     * @return {DatastreamsBuilder}
     */
    datastreamsBuilder() {
        return new DatastreamsBuilder(this);
    }

    /**
     * This returns a util to create a bulk execution
     * @return {BulkExecutionBuilder}
     */
    bulkExecutionBuilder(organization, processorId, timeout) {
        return new BulkExecutionBuilder(this, organization, processorId, timeout)
    }

    /**
     * This returns a Qrating to build a specific Qrating
     * @return {QratingsBuilder}
     */
    qratingsBuilder() {
        return new QratingsBuilder(this);
    }

    /**
     * This returns a CountryCodesSearchBuilder to build a specific CountryCodesSearchBuilder
     * @return {CountryCodesSearchBuilder}
     */
    countryCodesSearchBuilder() {
        return new CountryCodesSearchBuilder(this);
    }

    /**
     * This returns a TimezoneSearchBuilder to build a specific TimezoneSearchBuilder
     * @return {TimezoneSearchBuilder}
     */
    timezoneSearchBuilder() {
        return new TimezoneSearchBuilder(this);
    }

    /**
     * This returns a UserLanguagesSearchBuilder to build a specific UserLanguagesSearchBuilder
     * @return {UserLanguagesSearchBuilder}
     */
    userLanguagesSearchBuilder() {
        return new UserLanguagesSearchBuilder(this);
    }

    /**
     * This returns a ConnectorFunctionsFinder
     * @return {ConnectorFunctionsFinder}
     */
    newConnectorFunctionsFinder() {
        return new ConnectorFunctionsFinder(this)
    }

    /**
     * This returns a ConnectorFunctionsCatalogFinder
     * @return {ConnectorFunctionsCatalogFinder}
     */
    newConnectorFunctionsCatalogFinder() {
        return new ConnectorFunctionsCatalogFinder(this)
    }

    /**
     * This returns a ConnectorFunctionsCatalog
     * @return {ConnectorFunctionsCatalog}
     */
    newConnectorFunctionsCatalog() {
        return new ConnectorFunctionsCatalog(this)
    }

    /**
     * This returns a ConnectorFunctionsHelper
     * @return {ConnectorFunctionsHelper}
     */
    newConnectorFunctionsHelper() {
        return new ConnectorFunctionsHelper(this)
    }

    /**
     * This returns a ConnectorFunctions
     * @return {ConnectorFunctions}
     */
    connectorFunctionsBuilder(organization, channel, identifier, connectorFunctionData) {
        return new ConnectorFunctions(this, organization, channel, identifier, connectorFunctionData)
    }

    /**
     * 
     * @param {String} identifier - only update or delete
     * @param {Object} connectorFunctionsCatalog 
     * @returns {ConnectorFunctionsCatalog}
     */
    connectorFunctionsCatalogBuilder(identifier, connectorFunctionsCatalog) {
        return new ConnectorFunctionsCatalogBuilder(this, identifier, connectorFunctionsCatalog)
    }

    /**
     * This returns a ProvisionsProcesorsBuilder to build a specific ProvisionsProcesorsBuilder
     * @return {provisionProcessorsBuilder}
     */
    provisionProcessorsBuilder() {
        return new ProvisionProcessors(this);
    }

    /**
     * This returns a util to find a provision procesor
     * @return {ProvisionProcessorsFinder}
     */
    newProvisionProcessorsFinder() {
        return new ProvisionProcessorsFinder(this);
    }

    /**
     * This returns a ManufacturersBuilder to build a specific ManufacturersBuilder
     * @return {ManufacturersBuilder}
     */
    manufacturersBuilder() {
        return new ManufacturersBuilder(this);
    }

    /**
     * This returns a ManufacturerModelsBuilder to build a specific ManufacturerModelsBuilder
     * @return {ManufacturerModelsBuilder}
     */
    manufacturerModelsBuilder(manufacturerIdentifier) {
        return new ManufacturerModelsBuilder(this, manufacturerIdentifier);
    }

    /**
     * This returns a util to find a hardware manufacturer
     * @return {ManufacturerFinder}
     */
    newManufacturersFinder() {
        return new ManufacturerFinder(this);
    }

    /**
     * This returns a util to find a hardware model
     * @return {ModelFinder}
     */
    newModelFinder() {
        return new ModelFinder(this);
    }

    /**
     * This returns a OrganizationManufacturersBuilder to build a specific OrganizationManufacturersBuilder
     * @return {OrganizationManufacturersBuilder}
     */
    organizationManufacturersBuilder(organization) {
        return new OrganizationManufacturersBuilder(this, organization);
    }

    /**
     * This returns a OrganizationManufacturerModelsBuilder to build a specific OrganizationManufacturerModelsBuilder
     * @return {OrganizationManufacturerModelsBuilder}
     */
    organizationManufacturerModelsBuilder(organization, manufacturerIdentifier) {
        return new OrganizationManufacturerModelsBuilder(this, organization, manufacturerIdentifier);
    }

    /**
     * This returns a util to find a hardware manufacturer
     * @return {OrganizationManufacturerFinder}
     */
    newOrganizationManufacturersFinder() {
        return new OrganizationManufacturerFinder(this);
    }

    /**
     * This returns a util to find a hardware model
     * @return {OrganizationModelFinder}
     */
    newOrganizationModelFinder() {
        return new OrganizationModelFinder(this);
    }

    /**
     * This returns a util to search organizations
     * @return {OrganizationsSearchBuilder}
     */
    organizationsSearchBuilder() {
        return new OrganizationsSearchBuilder(this);
    }

    /**
     * This returns a SoftwaresBuilder to build a specific SoftwaresBuilder
     * @return {SoftwaresBuilder}
     */
    softwaresBuilder(organization) {
        return new SoftwaresBuilder(this, organization);
    }

    /**
     * This returns a util to find an organization software
     * @return {SoftwareFinder}
     */
    newSoftwareFinder() {
        return new SoftwareFinder(this);
    }

    /** 
     * This returns a NotebookLauncherBuilder to build a specific NotebookLauncherBuilder
     * @return {NotebookLauncherBuilder}
     */
    notebookLauncherBuilder() {
        return new NotebookLauncherBuilder(this);
    }

    /** 
     * This returns a NotebookSchedulerBuilder to build a specific NotebookSchedulerBuilder
     * @return {NotebookSchedulerBuilder}
     */
    notebookSchedulerBuilder() {
        return new NotebookSchedulerBuilder(this);
    }

    /**
     * This returns a util to find notebooks
     * @return {NotebookFinder}
     */
    newNotebookFinder() {
        return new NotebookFinder(this);
    }

    /**
     * This returns a util to find notebooks schedulers
     * @return {NotebookSchedulerFinder}
     */
    newNotebookSchedulerFinder() {
        return new NotebookSchedulerFinder(this);
    }

    /**
     * This returns a util to view schedule history
     * @return {HistoryFinder}
     */
    newScheduleHistoryFinder() {
        return new ScheduleHistoryFinder(this);
    }

    /**
     * This returns a util to view schedule rest requests
     * @return {RestRequestFinder}
     */
    newScheduleRestRequestFinder() {
        return new ScheduleRestRequestFinder(this);
    }

    /**
     * This returns a util to build schedule rest requests
     * @return {RestRequest}
     */
    scheduleRestRequestBuilder() {
        return new ScheduleRestRequest(this);
    }

    /**
     * This returns a util to view schedule image executions
     * @return {ImageExecutionFinder}
     */
    newScheduleImageExecutionFinder() {
        return new ScheduleImageExecutionFinder(this);
    }

    /**
     * This returns a util to build schedule image executions
     * @return {ImageExecution}
     */
    scheduleImageExecutionBuilder() {
        return new ScheduleImageExecution(this);
    }

    /**
     * This returns a util to view schedule pipelines
     * @return {PipelineFinder}
     */
    newSchedulePipelineFinder() {
        return new SchedulePipelineFinder(this);
    }

    /**
     * This returns a util to build a pipeline
     * @return {SchedulePipeline}
     */
    schedulePipelineBuilder() {
        return new SchedulePipeline(this);
    }

    /**
     * This returns a util to find organization plans
     * @returns {OrganizationPlansFinder}
     */
    newOrganizationPlansFinder() {
        return new OrganizationPlansFinder(this);
    }

    /**
     * This returns a util to find device plans
     * @returns {DevicePlansFinder}
     */
    newDevicePlansFinder() {
        return new DevicePlansFinder(this);
    }
    /**
     * This returns a OrganizationPlans to build a specific organization plan
     * @param {*} organization 
     * @returns {OrganizationPlans}
     */
    organizationPlansBuilder(organization) {
        return new OrganizationPlans(this, organization);
    }

    /**
     * This returns a DevicePlans to build a specific device plan
     * @param {*} organization 
     * @returns {OrganizationPlans}
     */
    devicePlansBuilder(organization) {
        return new DevicePlans(this, organization);
    }
}