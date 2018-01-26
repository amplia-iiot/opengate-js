'use strict';

import Operations from './operations/Operations'
import UserFinder from './users/UserFinder'
import Certificates from './security/Certificates'
import Users from './users/Users'
import OrganizationFinder from './organizations/OrganizationFinder'
import ChannelFinder from './channels/ChannelFinder'
import AreasSearchBuilder from './searching/builder/AreasSearchBuilder'
import AreaFinder from './areas/AreaFinder'
import Channels from './channels/Channels'
import Areas from './areas/Areas'
import ChannelsSearchBuilder from './searching/builder/ChannelsSearchBuilder'
import RuleConfigurations from './rulesConfiguration/RuleConfigurations'
import RuleConfigurationsFinder from './rulesConfiguration/RuleConfigurationsFinder'
import RuleConfigurationsActions from './rulesConfiguration/RuleConfigurationsActions'
import CertificateFinder from './security/CertificateFinder'
import OperationFinder from './operations/OperationFinder'
import FilterBuilder from './searching/FilterBuilder'
import SelectBuilder from './searching/SelectBuilder'
import OperationActions from './operations/OperationActions'
import Expression from './util/Expression'
import SelectElement from './util/SelectElement'
import QuickSearch from './searching/QuickSearch'
import RawSearchBuilder from './searching/builder/RawSearchBuilder'
import DevicesSearchBuilder from './searching/builder/DevicesSearchBuilder'
import SubscribersSearchBuilder from './searching/builder/SubscribersSearchBuilder'
import SubscriptionsSearchBuilder from './searching/builder/SubscriptionsSearchBuilder'
import AssetsSearchBuilder from './searching/builder/AssetsSearchBuilder'
import OperationsSearchBuilder from './searching/builder/OperationsSearchBuilder'
import ExecutionsSearchBuilder from './searching/builder/ExecutionsSearchBuilder'
import AlarmsSearchBuilder from './searching/builder/AlarmsSearchBuilder'
import DatamodelsSearchBuilder from './searching/builder/DatamodelsSearchBuilder'
import FeedsSearchBuilder from './searching/builder/FeedsSearchBuilder'
import DatastreamsSearchBuilder from './searching/builder/DatastreamsSearchBuilder'
import DatapointsSearchBuilder from './searching/builder/DatapointsSearchBuilder'
import BundlesSearchBuilder from './searching/builder/BundlesSearchBuilder'
import CertificatesSearchBuilder from './searching/builder/CertificatesSearchBuilder'
import HardwaresSearchBuilder from './searching/builder/HardwaresSearchBuilder'
import SoftwaresSearchBuilder from './searching/builder/SoftwaresSearchBuilder'
import OperationalStatusSearchBuilder from './searching/builder/OperationalStatusSearchBuilder'
import SpecificTypeSearchBuilder from './searching/builder/SpecificTypeSearchBuilder'
import ServiceGroupSearchBuilder from './searching/builder/ServiceGroupSearchBuilder'
import AdministrativeStateSearchBuilder from './searching/builder/AdministrativeStateSearchBuilder'
import CommunicationsModuleTypeSearchBuilder from './searching/builder/CommunicationsModuleTypeSearchBuilder'
import FieldsDefinitionSearchBuilder from './searching/builder/FieldsDefinitionSearchBuilder'
import JsonSchemaSearchBuilder from './searching/builder/JsonSchemaSearchBuilder'
import MobilePhoneProviderSearchBuilder from './searching/builder/MobilePhoneProviderSearchBuilder'
import IoTDatastreamPeriodSearchBuilder from './searching/builder/IoTDatastreamPeriodSearchBuilder'
import ResourceTypeSearchBuilder from './searching/builder/ResourceTypeSearchBuilder'
import AllowedResourceTypeSearchBuilder from './searching/builder/AllowedResourceTypeSearchBuilder'
import IoTDatastreamAccessSearchBuilder from './searching/builder/IoTDatastreamAccessSearchBuilder'
import IoTDatastreamStoragePeriodSearchBuilder from './searching/builder/IoTDatastreamStoragePeriodSearchBuilder'
import RuleConfigurationSeveritySearchBuilder from './searching/builder/RuleConfigurationSeveritySearchBuilder'
import UsersSearchBuilder from './searching/builder/UsersSearchBuilder'
import DomainsSearchBuilder from './searching/builder/DomainsSearchBuilder'
import PlansSearchBuilder from './searching/builder/PlansSearchBuilder'
import Bundles from './bundles/Bundles'
import BundleFinder from './bundles/BundleFinder'
import Organizations from './organizations/Organizations'
import Domain from './domains/Domains'
import DomainFinder from './domains/DomainsFinder'
import DeviceFinder from './entities/DeviceFinder'
import SubscriptionsFinder from './entities/SubscriptionsFinder'
import SubscribersFinder from './entities/SubscribersFinder'
import DeviceMessage from './collection/devices/DeviceMessage'
import Datastream from './collection/devices/collect/Datastreams'
import Datapoint from './collection/devices/collect/Datapoint'
import Hardware from './collection/devices/collect/Hardware'
import Software from './collection/devices/collect/Software'
import Storage from './collection/devices/collect/Storage'
import Usage from './collection/devices/collect/Usage'
import PowerSupply from './collection/devices/collect/PowerSupply'
import CommsModuleMessage from './collection/devices/collect/CommsModuleMessage'
import Mobile from './collection/devices/collect/Mobile'
import SubscriberMessage from './collection/devices/collect/Subscriber'
import SubscriptionMessage from './collection/devices/collect/Subscription'
import WorkgroupRelations from './workgroups/WorkgroupRelations'
import Workgroups from './workgroups/Workgroups'
import WorkgroupFinder from './workgroups/WorkgroupFinder'
import WorkgroupsSearchBuilder from './searching/builder/WorkgroupsSearchBuilder'
import WorkgroupRelationsFinder from './workgroups/WorkgroupRelationsFinder'
import UserProfilesSearchBuilder from './searching/builder/UserProfilesSearchBuilder'
import Datamodels from './iot/datamodels/Datamodels'
import DatamodelsHelper from './iot/datamodels/DatamodelsHelper'
import DatamodelsFinder from './iot/datamodels/DatamodelsFinder'
import DatastreamsBuilder from './iot/catalog/Datastream'
import QratingsBuilder from './iot/catalog/Qrating'
import EntityBuilder from './provision/entities/EntityBuilder'
import EntitiesSearchBuilder from './searching/builder/EntitiesSearchBuilder'
import CountryCodesSearchBuilder from './searching/builder/CountryCodesSearchBuilder'
import UserLanguagesSearchBuilder from './searching/builder/UserLanguagesSearchBuilder'

/**
 * This is a abstract class, it must be extended to another class that defined the backend, it will be used on request to Opengate North API by browser or nodejs server
 */
export default class InternalOpenGateAPI {
    /**
     * @param {{ url: string,port: string,version: string,apiKey: string}} _options - this is configuration about Opengate North API.
     * @param {AmpliaREST} ampliaREST - this is a backend selected to manage a request to Opengate North API.
     */
    constructor(northAmpliaREST, southAmpliaREST) {
        if (this.constructor === InternalOpenGateAPI) {
            throw new Error("Cannot construct Abstract instances directly");
        }
        if (typeof northAmpliaREST !== "object") {
            throw new Error("Must instance mandatory parameter: northAmpliaREST");
        }
        if (typeof southAmpliaREST !== "object") {
            throw new Error("Must instance mandatory parameter: southAmpliaREST");
        }
        this.Napi = northAmpliaREST;
        this.Sapi = southAmpliaREST;
        this.EX = Expression;
        this.SE = SelectElement;
        this.operations = new Operations(this);
        this.entityBuilder = new EntityBuilder(this);
    }

    /**
     * This return a util to find a user
     * @return {UserFinder}
     */
    newUserFinder() {
        return new UserFinder(this);
    }

    /**
     * This return a util to find a organization
     * @return {OrganizationFinder}
     */
    newOrganizationFinder() {
        return new OrganizationFinder(this);
    }

    /**
     * This return a util to find a channel
     * @return {ChannelFinder}
     */
    newChannelFinder() {
        return new ChannelFinder(this);
    }

    /**
     * This return a AreasSearchBuilder to build a specific AreasSearch
     * @return {AreasSearchBuilder}
     */
    areasSearchBuilder() {
        return new AreasSearchBuilder(this);
    }

    /**
     * This return a util to find a area
     * @return {AreaFinder}
     */
    newAreaFinder() {
        return new AreaFinder(this);
    }

    /**
     * This return a util to find a operation
     * @return {OperationFinder}
     */
    newOperationFinder() {
        return new OperationFinder(this);
    }

    /**
     * This return a util to find Rule Configurations
     * @return {RuleConfigurationsFinder}
     */
    newRuleConfigurationsFinder() {
        return new RuleConfigurationsFinder(this);
    }

    /**
     * This return a util to update a Rule Configuration
     * @return {RuleConfigurations}
     */
    ruleConfigurationBuilder(organization, channel, ruleConfigObj) {
        return new RuleConfigurations(this, organization, channel, ruleConfigObj);
    }

    /**
     * This return a util to launch actions on a rule
     * @param {!string} organization - organization name of the rule
     * @param {!string} channel - channel name of the rule
     * @param {!string} name - rule name
     * @return {RuleConfigurationsActions}
     */
    newRuleConfigurationsActions(organization, channel, name) {
        return new RuleConfigurationsActions(this, organization, channel, name);
    }

    /**
     * This return a util to find a certificate
     * @return {CertificateFinder}
     */
    newCertificateFinder() {
        return new CertificateFinder(this);
    }

    /**
     * This return a util to find a device
     * @return {DeviceFinder}
     */
    newDeviceFinder() {
        return new DeviceFinder(this);
    }


    /**
     * This return a util to find a Subscription
     * @return {SubscriptionsFinder}
     */
    newSubscriptionsFinder() {
        return new SubscriptionsFinder(this);
    }

    /**
     * This return a util to find a Subscriber
     * @return {SubscribersFinder}
     */
    newSubscribersFinder() {
        return new SubscribersFinder(this);
    }



    /**
     * This return a util to create your own filter to make searching
     * @return {FilterBuilder}
     */
    newFilterBuilder() {
        return new FilterBuilder();
    }

    /**
     * This return a util to create your own select to make searching
     * @return {SelectBuilder}
     */
    newSelectBuilder() {
        return new SelectBuilder();
    }

    /**
     * This return a util to find devices by a defined filter
     * @return {QuickSearch}
     */
    newQuickSearch(param, limit, type) {
        return new QuickSearch(this, param, limit, type);
    }

    /**
     * Create custom search with custom url and raw filter
     * @return {RawSearchBuilder}
     */
    rawSearchBuilder() {
        return new RawSearchBuilder(this);
    }

    /**
     * This return a UsersSearchBuilder to build a specific UsersSearch
     * @return {UsersSearchBuilder}
     */
    usersSearchBuilder() {
        return new UsersSearchBuilder(this);
    }

    /**
     * This return a DomainsSearchBuilder to build a specific DomainsSearch
     * @return {DomainsSearchBuilder}
     */
    domainsSearchBuilder() {
        return new DomainsSearchBuilder(this);
    }

    /**
     * This return a DevicesSearchBuilder to build a specific DeviceSearch
     * @return {DevicesSearchBuilder}
     */
    devicesSearchBuilder() {
        return new DevicesSearchBuilder(this);
    }

    /**
     * This return a AssetsSearchBuilder to build a specific AssetSearch
     * @return {AssetsSearchBuilder}
     */
    assetsSearchBuilder() {
        return new AssetsSearchBuilder(this);
    }

    /**
     * This return a SubscribersSearchBuilder to build a specific DeviceSearch
     * @return {SubscribersSearchBuilder}
     */
    subscribersSearchBuilder() {
        return new SubscribersSearchBuilder(this);
    }

    /**
     * This return a SubscriptionsSearchBuilder to build a specific DeviceSearch
     * @return {SubscriptionsSearchBuilder}
     */
    subscriptionsSearchBuilder() {
        return new SubscriptionsSearchBuilder(this);
    }

    /**
     * This return a CommunicationsModuleTypeSearchBuilder to build a specific CommunicationsModuleTypeSearch
     * @return {CommunicationsModuleTypeSearchBuilder}
     */
    communicationsModuleTypeSearchBuilder() {
        return new CommunicationsModuleTypeSearchBuilder(this);
    }

    /**
     * This return a FieldsDefinitionSearchBuilder to build a specific FieldsDefinitionSearchBuilder
     * @return {FieldsDefinitionSearchBuilder}
     */
    fieldsDefinitionSearchBuilder() {
        return new FieldsDefinitionSearchBuilder(this);
    }

    /**
     * This return a MobilePhoneProviderSearchBuilder to build a specific MobilePhoneProviderTypeSearch
     * @return {MobilePhoneProviderSearchBuilder}
     */
    mobilePhoneProviderSearchBuilder() {
        return new MobilePhoneProviderSearchBuilder(this);
    }

    /**
     * This return a IoTDatastreamPeriodSearchBuilder to build a specific IoTDatastreamPeriodSearchBuilder
     * @return {IoTDatastreamPeriodSearchBuilder}
     */
    ioTDatastreamPeriodSearchBuilder() {
        return new IoTDatastreamPeriodSearchBuilder(this);
    }

    /**
     * This return a ResourceTypeSearchBuilder to build a specific ResourceTypeSearchBuilder
     * @return {ResourceTypeSearchBuilder}
     */
    resourceTypeSearchBuilder() {
        return new ResourceTypeSearchBuilder(this);
    }

    /**
     * This return a AllowedResourceTypeSearchBuilder to build a specific AllowedResourceTypeSearchBuilder
     * @return {AllowedResourceTypeSearchBuilder}
     */
    allowedResourceTypeSearchBuilder() {
        return new AllowedResourceTypeSearchBuilder(this);
    }



    /**
     * This return a IoTDatastreamAccessSearchBuilder to build a specific IoTDatastreamAccessSearchBuilder
     * @return {IoTDatastreamAccessSearchBuilder}
     */
    ioTDatastreamAccessSearchBuilder() {
        return new IoTDatastreamAccessSearchBuilder(this);
    }

    /**
     * This return a IoTDatastreamStoragePeriodSearchBuilder to build a specific IoTDatastreamStoragePeriodSearchBuilder
     * @return {IoTDatastreamStoragePeriodSearchBuilder}
     */
    ioTDatastreamStoragePeriodSearchBuilder() {
        return new IoTDatastreamStoragePeriodSearchBuilder(this);
    }

    /**
     * This return a RuleConfigurationSeveritySearchBuilder to build a specific RuleConfigurationSeveritySearchBuilder
     * @return {RuleConfigurationSeveritySearchBuilder}
     */
    ruleConfigurationSeveritySearchBuilder() {
        return new RuleConfigurationSeveritySearchBuilder(this);
    }

    /**
     * This return a OperationsSearchBuilder to build a specific ExecutionssSearch
     * @return {OperationsSearchBuilder}
     */
    operationsSearchBuilder() {
        return new OperationsSearchBuilder(this);
    }

    /**
     * This return a ExecutionsSearchBuilder to build a specific ExecutionsSearch
     * @return {ExecutionsSearchBuilder}
     */
    executionsSearchBuilder() {
        return new ExecutionsSearchBuilder(this);
    }

    /**
     * This return a AlarmsSearchBuilder to build a specific AlarmsSearch
     * @return {AlarmsSearchBuilder}
     */
    alarmsSearchBuilder() {
        return new AlarmsSearchBuilder(this);
    }

    /**
     * This return a DatastreamsSearchBuilder to build a specific DatastreamsSearchBuilder
     * @return {DatastreamsSearchBuilder}
     */
    datastreamsSearchBuilder() {
        return new DatastreamsSearchBuilder(this);
    }

    /**
     * This return a DatamodelsSearchBuilder to build a specific DatamodelsSearchBuilder
     * @return {DatamodelsSearchBuilder}
     */
    datamodelsSearchBuilder() {
        return new DatamodelsSearchBuilder(this);
    }

    /**
     * This return a FeedsSearchBuilder to build a specific FeedsSearchBuilder
     * @return {FeedsSearchBuilder}
     */
    feedsSearchBuilder() {
        return new FeedsSearchBuilder(this);
    }


    /**
     * This return a DatapointsSearchBuilder to build a specific DatapointsSearchBuilder
     * @return {DatapointsSearchBuilder}
     */
    datapointsSearchBuilder() {
        return new DatapointsSearchBuilder(this);
    }

    /**
     * This return a BundlesSearchBuilder to build a specific BundlesSearchBuilder
     * @return {BundlesSearchBuilder}
     */
    bundlesSearchBuilder() {
        return new BundlesSearchBuilder(this);
    }

    /**
     * This return a CertificatesSearchBuilder to build a specific CertificatesSearchBuilder
     * @return {CertificatesSearchBuilder}
     */
    certificatesSearchBuilder() {
        return new CertificatesSearchBuilder(this);
    }

    /**
     * This return a JsonSchemaSearchBuilder to build a specific JsonSchemaSearchBuilder
     * @return {JsonSchemaSearchBuilder}
     */
    jsonSchemaSearchBuilder() {
        return new JsonSchemaSearchBuilder(this);
    }

    /**
     * This return a ExecutionsSearchBuilder to build a specific ExecutionsSearch
     * @return {ExecutionsSearchBuilder}
     */
    entitiesSearchBuilder() {
        return new EntitiesSearchBuilder(this);
    }

    /**
     * This return a PlansSearchBuilder to build a specific PlansSearchBuilder
     * @return {PlansSearchBuilder}
     */
    plansSearchBuilder() {
        return new PlansSearchBuilder(this);
    }

    /**
     * This return a BundlesBuilder to build a specific BundlesBuilder
     * @return {Bundles}
     */
    bundlesBuilder() {
        return new Bundles(this);
    }

    /**
     * This return a util to find a bundle
     * @return {BundleFinder}
     */
    newBundleFinder() {
        return new BundleFinder(this);
    }

    /**
     * This return a OrganizationsBuilder to build a specific OrganizationsBuilder
     * @return {Organizations}
     */
    organizationsBuilder() {
        return new Organizations(this);
    }

    /**
     * This return a DomainsBuilder to build a specific DomainsBuilder
     * @return {Domain}
     */
    domainsBuilder() {
        return new Domain(this);
    }

    /**
     * This return a util to find a domain
     * @return {DomainFinder}
     */
    newDomainFinder() {
        return new DomainFinder(this);
    }

    /**
     * This return a util to create a user
     * @return {User}
     */
    usersBuilder() {
        return new Users(this);
    }

    /**
     * This return a util to create a certificate
     * @return {Certificates}
     */
    certificatesBuilder() {
        return new Certificates(this);
    }

    /**
     * This return a HardwaresSearchBuilder to build a specific HardwaresSearchBuilder
     * @return {HardwaresSearchBuilder}
     */
    hardwaresSearchBuilder() {
        return new HardwaresSearchBuilder(this);
    }

    /**
     * This return a SoftwaresSearchBuilder to build a specific SoftwaresSearchBuilder
     * @return {SoftwaresSearchBuilder}
     */
    softwaresSearchBuilder() {
        return new SoftwaresSearchBuilder(this);
    }


    /**
     * This return a RelationsBuilder to build a specific RelationsBuilder
     * @return {Relations}
     */
    relationsBuilder() {
        return new Relations(this);
    }


    /**
     * This return a OperationalStatusSearchBuilder to build a specific OperationalStatusSearchBuilder
     * @return {OperationalStatusSearchBuilder}
     */
    operationalStatusSearchBuilder() {
        return new OperationalStatusSearchBuilder(this);
    }

    /**
     * This return a SpecificTypeSearchBuilder to build a specific SpecificTypeSearchBuilder
     * @return {SpecificTypeSearchBuilder}
     */
    specificTypeSearchBuilder() {
        return new SpecificTypeSearchBuilder(this);
    }

    /**
     * This return a ServiceGroupSearchBuilder to build a specific ServiceGroupSearchBuilder
     * @return {ServiceGroupSearchBuilder}
     */
    serviceGroupSearchBuilder() {
        return new ServiceGroupSearchBuilder(this);
    }

    /**
     * This return a AdministrativeStateSearchBuilder to build a specific AdministrativeStateSearchBuilder
     * @return {AdministrativeStateSearchBuilder}
     */
    administrativeStateSearchBuilder() {
        return new AdministrativeStateSearchBuilder(this);
    }

    /**
     * This return a DevicesSouth to build a specific DevicesSouth
     * @return {DeviceMessage}
     */
    deviceMessageBuilder() {
        return new DeviceMessage(this);
    }

    /**
     * This return a datastreamBuilder to build a specific Datastream
     * @return {Datastream}
     */
    datastreamBuilder() {
        return new Datastream(this);
    }

    /**
     * This return a datapointsBuilder to build a specific Datapoint
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
     * This return a util to operation actions on an operation
     * @param {!string} operationId - identifier of operation
     * @return {OperationActions}
     */
    newOperationActions(operationId) {
        return new OperationActions(this, operationId);
    }

    /**
     * This return a WorkgroupRelationsBuilder to build a specific workgroup relation
     * @return {WorkgroupRelations}
     */
    workgroupRelationsBuilder() {
        return new WorkgroupRelations(this);
    }

    /**
     * This return a WorkgroupRelationsFinder 
     * @return {WorkgroupRelationsFinder}
     */
    newWorkgroupRelationsFinder() {
        return new WorkgroupRelationsFinder(this);
    }


    /**
     * This return a WorkgroupsBuilder to build a specific workgroup
     * @return {Workgroups}
     */
    workgroupsBuilder() {
        return new Workgroups(this);
    }

    /**
     * This return a util to find a workgroup
     * @return {WorkgroupFinder}
     */
    newWorkgroupFinder() {
        return new WorkgroupFinder(this);
    }

    /**
     * This return a WorkgroupsSearchBuilder to build a specific WorkgroupsSearch
     * @return {WorkgroupsSearchBuilder}
     */
    workgroupsSearchBuilder() {
        return new WorkgroupsSearchBuilder(this);
    }

    /**
     * This return a ChannelsBuilder to build a specific WorkgroupsSearch
     * @return {Channels}
     */
    channelsBuilder() {
        return new Channels(this);
    }

    /**
     * This return a AreasBuilder to build a specific area
     * @return {Areas}
     */
    areasBuilder() {
        return new Areas(this);
    }

    /**
     * This return a ChannelsSearchBuilder to build a specific ChannelsSearch
     * @return {ChannelsSearchBuilder}
     */
    channelsSearchBuilder() {
        return new ChannelsSearchBuilder(this);
    }

    /**
     * This return a UserProfilesSearchBuilder to build a specific UserProfilesSearchBuilder
     * @return {UserProfilesSearchBuilder}
     */
    userProfilesSearchBuilder() {
        return new UserProfilesSearchBuilder(this);
    }

    /**
     * This return a Datamodels to build a specific Datamodels
     * @return {Datamodels}
     */
    datamodelsBuilder(organization) {
        return new Datamodels(this, organization)
    }

    /**
     * This return a DatamodelsHelper to build a specific DatamodelsHelper
     * @return {DatamodelsHelper}
     */
    datamodelsHelper(organization, datamodel) {
        return new DatamodelsHelper(this, organization, datamodel);
    }

    /**
     * This return a util to find a datamodel
     * @return {DatamodelsFinder}
     */
    newDatamodelsFinder() {
        return new DatamodelsFinder(this);
    }

    /**
     * This return a datastream to build a specific Datastream
     * @return {DatastreamsBuilder}
     */
    datastreamsBuilder() {
        return new DatastreamsBuilder(this);
    }

    /**
     * This return a Qrating to build a specific Qrating
     * @return {QratingsBuilder}
     */
    qratingsBuilder() {
        return new QratingsBuilder(this);
    }

    /**
     * This return a CountryCodesSearchBuilder to build a specific CountryCodesSearchBuilder
     * @return {CountryCodesSearchBuilder}
     */
    countryCodesSearchBuilder() {
        return new CountryCodesSearchBuilder(this);
    }

    /**
     * This return a UserLanguagesSearchBuilder to build a specific UserLanguagesSearchBuilder
     * @return {UserLanguagesSearchBuilder}
     */
    userLanguagesSearchBuilder() {
        return new UserLanguagesSearchBuilder(this);
    }
}