module.exports = {
    setters: function (setter) {
        return {
            'user': {
                'email': 'withEmail',
                'password': 'withPassword',
                'description': 'withDescription',
                'workgroup': 'withWorkgroup',
                'domain': 'withDomain',
                'profile': 'withProfile',
                'countryCode': 'withCountryCode',
                'langCode': 'withLangCode',
                'name': 'withName',
                'surname': 'withSurname'
            },
            'organization': {
                'name': 'withName',
                'description': 'withDescription',
                'country code': 'withCountryCode',
                'lang code': 'withLangCode',
                'time zone': 'withTimeZone',
                'zoom': 'withZoom',
                'location': 'withLocation'
            },
            'certificate': {
                'id': 'withId',
                'name': 'withName',
                'description': 'withDescription',
                'administrativeState': 'withAdministrativeState',
                'usages': 'withUsages',
                'hardwares': 'withHardware',
                'tags': 'withTags',
                'parameters': 'withParameters',
                'domains': 'withDomains'
            },
            'bundle': {
                'name': 'withName',
                'version': 'withVersion',
                'description': 'withDescription',
                'workgroup': 'withWorkgroup',
                'hardware': 'withHardware',
                'preactions': 'withPreaction',
                'postactions': 'withPostaction',
                'active': 'withActive',
                'user notes': 'withUserNotes',
                'deployment element': 'addDeploymentElement'
            },
            'deployment element': {
                'name': 'withName',
                'version': 'withVersion',
                'type': 'withType',
                'path': 'withPath',
                'order': 'withOrder',
                'operation': 'withOperation',
                'option': 'withOption',
                'fileName': 'withFileName',
                'downloadUrl': 'withDownloadUrl',
                'validators': 'withValidators',
                'oldName': 'withOldName',
                'oldVersion': 'withOldVersion',
                'oldPath': 'withOldPath'
            },
            'device': {
                'name': 'withName',
                'description': 'withDescription',
                'type': 'withType',
                'specific type': 'withSpecificType',
                'operational status': 'withOperationalStatus',
                'organization': 'withOrganization',
                'channel': 'withChannel',
                'administrative state': 'withAdministrativeState',
                'service group': 'withServiceGroup',
                'entity key': 'withEntityKey',
                'serial number': 'withSerialNumber',
                'trusted boot': 'withTrustedBoot',
                'hardware': 'withHardware',
                'software': 'withSoftware',
                'certificate': 'withCertificate',
                'communications module': 'addCommunicationsModule',
                'defaultFeed': 'withDefaultFeed'
            },
            'datamodel': {
                'identifier': 'withIdentifier',
                'name': 'withName',
                'version': 'withVersion',
                'description': 'withDescription',
                'specific type': 'withSpecificType',
                'add category': 'addCategory',
                'add datastream': 'addDatastream',
                'update category': 'updateCategory',
                'update datastream': 'updateDatastream',
                'remove category': 'removeCategory',
                'remove datastream': 'removeDatastream'
            },
            'datastream': {
                'identifier': 'withId',
                'name': 'withName',
                'description': 'withDescription',
                'unit': 'withUnit',
                'period': 'withPeriod',
                'schema': 'withSchema',
                'tags': 'withTags',
                'storage': 'withStorage',
                'access': 'withAccess',
                'hardwaresIds': 'withHardwaresIds',
                'qrating': 'addQrating',
                'feed': 'withFeed',
                'datapoints message': 'withDatapoint'
            },
            'qrating': {
                'minRequired': 'withMinRequired',
                'minDesired': 'withMinDesired',
                'ideal': 'withIdeal',
                'maxDesired': 'withMaxDesired',
                'maxAllowed': 'withMaxAllowed',
                'maxScore': 'withMaxScore',
                'cumulativePeriodDivisor': 'withCumulativePeriodDivisor',
                'conversionMatrix': 'withConversionMatrix',
                'version': 'withVersion'
            },
            'communications module': {
                'name': 'withName',
                'description': 'withDescription',
                'specific type': 'withSpecificType',
                'operational status': 'withOperationalStatus',
                'organization': 'withOrganization',
                'channel': 'withChannel',
                'administrative state': 'withAdministrativeState',
                'service group': 'withServiceGroup',
                'entity key': 'withEntityKey',
                'serial number': 'withSerialNumber',
                'hardware': 'withHardware',
                'software': 'withSoftware',
                'imei': 'withImei',
                'subscriber': 'bindToSubscriber',
                'subscription': 'bindToSubscription',
                'mac': 'withMac'
            },
            '_subscriber': {
                'name': 'withName',
                'description': 'withDescription',
                'specific type': 'withSpecificType',
                'organization': 'withOrganization',
                'channel': 'withChannel',
                'administrative state': 'withAdministrativeState',
                'service group': 'withServiceGroup',
                'entity key': 'withEntityKey',
                'icc': 'withIcc'
            },
            '_subscription': {
                'name': 'withName',
                'description': 'withDescription',
                'specific type': 'withSpecificType',
                'organization': 'withOrganization',
                'channel': 'withChannel',
                'administrative state': 'withAdministrativeState',
                'service group': 'withServiceGroup',
                'entity key': 'withEntityKey',
                'msisdn': 'withMsisdn',
                'imsi': 'withImsi',
                'homeoperator': 'withHomeOperator',
                'registered operator': 'withRegisteredOperator',
                'ip address': 'withIpAddress',
                'apn': 'withApn'
            },
            'deviceMessage': {
                'id': 'withId',
                'version': 'withDmmVersion',
                'datastreamVersion': 'withDataStreamVersion',
                'deviceId': 'withDeviceId',
                'datastream': 'withDataStream',
                'composeElement': 'composeElement',
                'eventDeviceId': 'withEventDeviceId',
                'path': 'withPath',
                'name': 'withEventName',
                'description': 'withEventDescription',
                'hardware': 'withHardware',
                'software': 'withSoftware',
                'operationalStatus': 'withOperationalStatus',
                'dateLocation': 'withDateLocation',
                'longitude': 'withLongitude',
                'latitude': 'withLatitude',
                'currentTemperature': 'withCurrentTemperature',
                'unitTemperature': 'withUnitTemperature',
                'statusTemperature': 'withStatusTemperature',
                'trendTemperature': 'withTrendTemperature',
                'temperatureAverage': 'withTemperatureAverage',
                'minimumTemperature': 'withMinimumTemperature',
                'maximumTemperature': 'withMaximumTemperature',
                'cpuUsage': 'withCpuUsage',
                'ram': 'withRam',
                'volatilStorage': 'withVolatilStorage',
                'nonVolatilStorage': 'withNonVolatilStorage',
                'powerSupply': 'withPowerSupply',
                'commsModuleMessage': 'withCommsModule'
            },
            'datapoints message': {
                'from': 'withFrom',
                'at': 'withAt',
                'value': 'withValue',
                'tags': 'withTags'
            },
            'hardware': {
                'serialnumber': 'withSerialnumber',
                'manufacturerName': 'withManufacturerName',
                'manufacturerOui': 'withManufacturerOui',
                'modelName': 'withModelName',
                'modelVersion': 'withModelVersion',
                'clockDate': 'withClockDate',
                'upTime': 'withUpTime'
            },
            'software': {
                'name': 'withName',
                'type': 'withType',
                'version': 'withVersion',
                'date': 'withDate'
            },
            'cpuUsage': {
                'usageUnit': 'withUsageUnit',
                'current': 'withCurrent',
                'average': 'withAverage',
                'maximum': 'withMaximum',
                'minimum': 'withMinimum'
            },
            'ram': {
                'usageUnit': 'withUsageUnit',
                'current': 'withCurrent',
                'average': 'withAverage',
                'maximum': 'withMaximum',
                'minimum': 'withMinimum',
                'unit': 'withUnit',
                'total': 'withTotal'
            },
            'volatilStorage': {
                'usageUnit': 'withUsageUnit',
                'current': 'withCurrent',
                'average': 'withAverage',
                'maximum': 'withMaximum',
                'minimum': 'withMinimum',
                'unit': 'withUnit',
                'total': 'withTotal'
            },
            'nonVolatilStorage': {
                'usageUnit': 'withUsageUnit',
                'current': 'withCurrent',
                'average': 'withAverage',
                'maximum': 'withMaximum',
                'minimum': 'withMinimum',
                'unit': 'withUnit',
                'total': 'withTotal'
            },
            'powerSupply': {
                'source': 'withSource',
                'status': 'withStatus',
                'trend': 'withBatteryChargeLevelTrend',
                'batteryStatus': 'withBatteryChargeLevelStatus',
                'percentage': 'withBatteryChargeLevelPercentage',
                'outageDate': 'withOutageDate',
                'outageDuration': 'withOutageDuration'
            },
            'commsModuleMessage': {
                'id': 'withId',
                'name': 'withName',
                'type': 'withType',
                'hardware': 'withHardware',
                'operationalStatus': 'withOperationalStatus',
                'antennaStatus': 'withAntennaStatus',
                'software': 'withSoftware',
                'mobile': 'withMobile',
                'subscriber': 'withSubscriber',
                'subscription': 'withSubscription',
            },
            'mobile': {
                'mr': 'withMr',
                'apn': 'withApn',
                'bcch': 'withBcch',
                'cgi': 'withCgi',
                'cellId': 'withCellId',
                'lac': 'withLac',
                'ratType': 'withRatType',
                'plmn': 'withPlmn',
                'timingAdvance': 'withTimingAdvance',
                'signalStrength': 'withSignalStrength',
                'signalStrengthMax': 'withSignalStrengthMax',
                'signalStrengthMin': 'withsignalStrengthMin',
                'signalQuality': 'withsignalQuality',
                'signalQualityMax': 'withsignalQualityMax',
                'signalQualityMin': 'withsignalQualityMin'
            },
            'subscription': {
                'id': 'withId',
                'name': 'withName',
                'type': 'withType',
                'description': 'withDescription',
                'operator': 'withOperator',
                'imsi': 'withImsi',
                'msisdn': 'withMsisdn',
                'addressType': 'withAddressType',
                'addressValue': 'withAddressValue',
                'addressApn': 'withAddressApn'
            },
            'subscriber': {
                'id': 'withId',
                'name': 'withName',
                'type': 'withType',
                'hardware': 'withHardware'
            },
            'rule configuration': {
                'init': 'init',
                'name': 'withName',
                'description': 'withDescription',
                'enabled': 'withEnabled',
                'severity': 'withSeverity'
            },
            'domain': {
                'name': 'withName',
                'description': 'withDescription',
                'parentDomain': 'withParentDomain'
            },
            'channel': {
                'name': 'withName',
                'description': 'withDescription',
                'organization': 'withOrganization',
                'certificate': 'withCertificate'
            },
            'workgroup': {
                'name': 'withName',
                'description': 'withDescription',
                'domain name': 'withDomainName',
                'administrative': 'withAdministrative'
            },
            'workgroup relations': {
                'workgroup': 'withWorkgroup',
                'channel': 'withChannel'
            },
            'relation': {
                'organization': 'withOrganization',
                'template': 'withTemplate',
                'commsModule': 'withCommunicationsModule',
                'device': 'withDevice',
                'subscription': 'withSubscription',
                'subscriber': 'withSubscriber'
            },
            'area': {
                'identifier': 'withIdentifier',
                'name': 'withName',
                'organization': 'withOrganization',
                'description': 'withDescription',
                'geometry': 'withGeometry',
                'entities': 'withEntities'
            },
            'bulkEntities':{
                'organization': 'withOrganization'

            }

        }[setter];
    },
    getter_response: function (getter) {
        return {
            'user email': '/email',
            'organization name': '/name'
        }[getter];
    }
};
