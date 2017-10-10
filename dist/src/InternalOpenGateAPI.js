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

var _areasAreaFinder = require('./areas/AreaFinder');

var _areasAreaFinder2 = _interopRequireDefault(_areasAreaFinder);

var _channelsChannels = require('./channels/Channels');

var _channelsChannels2 = _interopRequireDefault(_channelsChannels);

var _areasAreas = require('./areas/Areas');

var _areasAreas2 = _interopRequireDefault(_areasAreas);

var _searchingBuilderChannelsSearchBuilder = require('./searching/builder/ChannelsSearchBuilder');

var _searchingBuilderChannelsSearchBuilder2 = _interopRequireDefault(_searchingBuilderChannelsSearchBuilder);

var _rulesConfigurationRuleConfigurations = require('./rulesConfiguration/RuleConfigurations');

var _rulesConfigurationRuleConfigurations2 = _interopRequireDefault(_rulesConfigurationRuleConfigurations);

var _rulesConfigurationRuleConfigurationsFinder = require('./rulesConfiguration/RuleConfigurationsFinder');

var _rulesConfigurationRuleConfigurationsFinder2 = _interopRequireDefault(_rulesConfigurationRuleConfigurationsFinder);

var _rulesConfigurationRuleConfigurationsActions = require('./rulesConfiguration/RuleConfigurationsActions');

var _rulesConfigurationRuleConfigurationsActions2 = _interopRequireDefault(_rulesConfigurationRuleConfigurationsActions);

var _securityCertificateFinder = require('./security/CertificateFinder');

var _securityCertificateFinder2 = _interopRequireDefault(_securityCertificateFinder);

var _operationsOperationFinder = require('./operations/OperationFinder');

var _operationsOperationFinder2 = _interopRequireDefault(_operationsOperationFinder);

var _searchingFilterBuilder = require('./searching/FilterBuilder');

var _searchingFilterBuilder2 = _interopRequireDefault(_searchingFilterBuilder);

var _operationsOperationActions = require('./operations/OperationActions');

var _operationsOperationActions2 = _interopRequireDefault(_operationsOperationActions);

var _utilExpression = require('./util/Expression');

var _utilExpression2 = _interopRequireDefault(_utilExpression);

var _searchingQuickSearch = require('./searching/QuickSearch');

var _searchingQuickSearch2 = _interopRequireDefault(_searchingQuickSearch);

var _searchingBuilderRawSearchBuilder = require('./searching/builder/RawSearchBuilder');

var _searchingBuilderRawSearchBuilder2 = _interopRequireDefault(_searchingBuilderRawSearchBuilder);

var _searchingBuilderDevicesSearchBuilder = require('./searching/builder/DevicesSearchBuilder');

var _searchingBuilderDevicesSearchBuilder2 = _interopRequireDefault(_searchingBuilderDevicesSearchBuilder);

var _searchingBuilderSubscribersSearchBuilder = require('./searching/builder/SubscribersSearchBuilder');

var _searchingBuilderSubscribersSearchBuilder2 = _interopRequireDefault(_searchingBuilderSubscribersSearchBuilder);

var _searchingBuilderSubscriptionsSearchBuilder = require('./searching/builder/SubscriptionsSearchBuilder');

var _searchingBuilderSubscriptionsSearchBuilder2 = _interopRequireDefault(_searchingBuilderSubscriptionsSearchBuilder);

var _searchingBuilderOperationsSearchBuilder = require('./searching/builder/OperationsSearchBuilder');

var _searchingBuilderOperationsSearchBuilder2 = _interopRequireDefault(_searchingBuilderOperationsSearchBuilder);

var _searchingBuilderExecutionsSearchBuilder = require('./searching/builder/ExecutionsSearchBuilder');

var _searchingBuilderExecutionsSearchBuilder2 = _interopRequireDefault(_searchingBuilderExecutionsSearchBuilder);

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

var _searchingBuilderHardwaresSearchBuilder = require('./searching/builder/HardwaresSearchBuilder');

var _searchingBuilderHardwaresSearchBuilder2 = _interopRequireDefault(_searchingBuilderHardwaresSearchBuilder);

var _searchingBuilderSoftwaresSearchBuilder = require('./searching/builder/SoftwaresSearchBuilder');

var _searchingBuilderSoftwaresSearchBuilder2 = _interopRequireDefault(_searchingBuilderSoftwaresSearchBuilder);

var _searchingBuilderOperationalStatusSearchBuilder = require('./searching/builder/OperationalStatusSearchBuilder');

var _searchingBuilderOperationalStatusSearchBuilder2 = _interopRequireDefault(_searchingBuilderOperationalStatusSearchBuilder);

var _searchingBuilderSpecificTypeSearchBuilder = require('./searching/builder/SpecificTypeSearchBuilder');

var _searchingBuilderSpecificTypeSearchBuilder2 = _interopRequireDefault(_searchingBuilderSpecificTypeSearchBuilder);

var _searchingBuilderServiceGroupSearchBuilder = require('./searching/builder/ServiceGroupSearchBuilder');

var _searchingBuilderServiceGroupSearchBuilder2 = _interopRequireDefault(_searchingBuilderServiceGroupSearchBuilder);

var _searchingBuilderAdministrativeStateSearchBuilder = require('./searching/builder/AdministrativeStateSearchBuilder');

var _searchingBuilderAdministrativeStateSearchBuilder2 = _interopRequireDefault(_searchingBuilderAdministrativeStateSearchBuilder);

var _searchingBuilderCommunicationsModuleTypeSearchBuilder = require('./searching/builder/CommunicationsModuleTypeSearchBuilder');

var _searchingBuilderCommunicationsModuleTypeSearchBuilder2 = _interopRequireDefault(_searchingBuilderCommunicationsModuleTypeSearchBuilder);

var _searchingBuilderFieldsDefinitionSearchBuilder = require('./searching/builder/FieldsDefinitionSearchBuilder');

var _searchingBuilderFieldsDefinitionSearchBuilder2 = _interopRequireDefault(_searchingBuilderFieldsDefinitionSearchBuilder);

var _searchingBuilderJsonSchemaSearchBuilder = require('./searching/builder/JsonSchemaSearchBuilder');

var _searchingBuilderJsonSchemaSearchBuilder2 = _interopRequireDefault(_searchingBuilderJsonSchemaSearchBuilder);

var _searchingBuilderMobilePhoneProviderSearchBuilder = require('./searching/builder/MobilePhoneProviderSearchBuilder');

var _searchingBuilderMobilePhoneProviderSearchBuilder2 = _interopRequireDefault(_searchingBuilderMobilePhoneProviderSearchBuilder);

var _searchingBuilderIoTDatastreamPeriodSearchBuilder = require('./searching/builder/IoTDatastreamPeriodSearchBuilder');

var _searchingBuilderIoTDatastreamPeriodSearchBuilder2 = _interopRequireDefault(_searchingBuilderIoTDatastreamPeriodSearchBuilder);

var _searchingBuilderIoTDatastreamAccessSearchBuilder = require('./searching/builder/IoTDatastreamAccessSearchBuilder');

var _searchingBuilderIoTDatastreamAccessSearchBuilder2 = _interopRequireDefault(_searchingBuilderIoTDatastreamAccessSearchBuilder);

var _searchingBuilderIoTDatastreamStoragePeriodSearchBuilder = require('./searching/builder/IoTDatastreamStoragePeriodSearchBuilder');

var _searchingBuilderIoTDatastreamStoragePeriodSearchBuilder2 = _interopRequireDefault(_searchingBuilderIoTDatastreamStoragePeriodSearchBuilder);

var _searchingBuilderRuleConfigurationSeveritySearchBuilder = require('./searching/builder/RuleConfigurationSeveritySearchBuilder');

var _searchingBuilderRuleConfigurationSeveritySearchBuilder2 = _interopRequireDefault(_searchingBuilderRuleConfigurationSeveritySearchBuilder);

var _searchingBuilderUsersSearchBuilder = require('./searching/builder/UsersSearchBuilder');

var _searchingBuilderUsersSearchBuilder2 = _interopRequireDefault(_searchingBuilderUsersSearchBuilder);

var _searchingBuilderDomainsSearchBuilder = require('./searching/builder/DomainsSearchBuilder');

var _searchingBuilderDomainsSearchBuilder2 = _interopRequireDefault(_searchingBuilderDomainsSearchBuilder);

var _searchingBuilderPlansSearchBuilder = require('./searching/builder/PlansSearchBuilder');

var _searchingBuilderPlansSearchBuilder2 = _interopRequireDefault(_searchingBuilderPlansSearchBuilder);

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

/**
 * This is a abstract class, it must be extended to another class that defined the backend, it will be used on request to Opengate North API by browser or nodejs server
 */

var InternalOpenGateAPI = (function () {
    /**
     * @param {{ url: string,port: string,version: string,apiKey: string}} _options - this is configuration about Opengate North API.
     * @param {AmpliaREST} ampliaREST - this is a backend selected to manage a request to Opengate North API.
     */

    function InternalOpenGateAPI(northAmpliaREST, southAmpliaREST) {
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
        this.Napi = northAmpliaREST;
        this.Sapi = southAmpliaREST;
        this.EX = _utilExpression2['default'];
        this.operations = new _operationsOperations2['default'](this);
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
         * This return a util to find Rule Configurations
         * @return {RuleConfigurationsFinder}
         */
    }, {
        key: 'newRuleConfigurationsFinder',
        value: function newRuleConfigurationsFinder() {
            return new _rulesConfigurationRuleConfigurationsFinder2['default'](this);
        }

        /**
         * This return a util to update a Rule Configuration
         * @return {RuleConfigurations}
         */
    }, {
        key: 'ruleConfigurationBuilder',
        value: function ruleConfigurationBuilder(organization, channel, ruleConfigObj) {
            return new _rulesConfigurationRuleConfigurations2['default'](this, organization, channel, ruleConfigObj);
        }

        /**
         * This return a util to launch actions on a rule
         * @param {!string} organization - organization name of the rule
         * @param {!string} channel - channel name of the rule
         * @param {!string} name - rule name
         * @return {RuleConfigurationsActions}
         */
    }, {
        key: 'newRuleConfigurationsActions',
        value: function newRuleConfigurationsActions(organization, channel, name) {
            return new _rulesConfigurationRuleConfigurationsActions2['default'](this, organization, channel, name);
        }

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
         * This return a util to find devices by a defined filter
         * @return {QuickSearch}
         */
    }, {
        key: 'newQuickSearch',
        value: function newQuickSearch(param, limit, type) {
            return new _searchingQuickSearch2['default'](this, param, limit, type);
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
         * This return a RuleConfigurationSeveritySearchBuilder to build a specific RuleConfigurationSeveritySearchBuilder
         * @return {RuleConfigurationSeveritySearchBuilder}
         */
    }, {
        key: 'ruleConfigurationSeveritySearchBuilder',
        value: function ruleConfigurationSeveritySearchBuilder() {
            return new _searchingBuilderRuleConfigurationSeveritySearchBuilder2['default'](this);
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
         * This return a JsonSchemaSearchBuilder to build a specific JsonSchemaSearchBuilder
         * @return {JsonSchemaSearchBuilder}
         */
    }, {
        key: 'jsonSchemaSearchBuilder',
        value: function jsonSchemaSearchBuilder() {
            return new _searchingBuilderJsonSchemaSearchBuilder2['default'](this);
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
         * This return a HardwaresSearchBuilder to build a specific HardwaresSearchBuilder
         * @return {HardwaresSearchBuilder}
         */
    }, {
        key: 'hardwaresSearchBuilder',
        value: function hardwaresSearchBuilder() {
            return new _searchingBuilderHardwaresSearchBuilder2['default'](this);
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
         * This return a RelationsBuilder to build a specific RelationsBuilder
         * @return {Relations}
         */
    }, {
        key: 'relationsBuilder',
        value: function relationsBuilder() {
            return new Relations(this);
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
         * This return a SpecificTypeSearchBuilder to build a specific SpecificTypeSearchBuilder
         * @return {SpecificTypeSearchBuilder}
         */
    }, {
        key: 'specificTypeSearchBuilder',
        value: function specificTypeSearchBuilder() {
            return new _searchingBuilderSpecificTypeSearchBuilder2['default'](this);
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
         * This return a Qrating to build a specific Qrating
         * @return {QratingsBuilder}
         */
    }, {
        key: 'qratingsBuilder',
        value: function qratingsBuilder() {
            return new _iotCatalogQrating2['default'](this);
        }
    }]);

    return InternalOpenGateAPI;
})();

exports['default'] = InternalOpenGateAPI;
module.exports = exports['default'];
//# sourceMappingURL=InternalOpenGateAPI.js.map
