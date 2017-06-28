// Fields generated at: Thu Feb 09 2017 11:06:37 GMT+0100 (CET)
// DB: 172.19.18.242:1521/QA
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var IOT_FIELDS = {
    "FEEDS": {
        "FEEDS": ["id", "deviceId", "channelId"]
    },
    "DATAPOINTS": {
        "DATAPOINTS": ["datapoint.feed", "datapoint.device", "datapoint.datastream", "datapoint.from", "datapoint.at", "datapoint.value", "datapoint.tag", "datapoint.qratingScoringQValue", "datapoint.qratingScoringQScore", "datapoint.qratingScoringQuality", "datapoint.qratingScoringPerformance", "datapoint.qratingMinRequiredValue", "datapoint.qratingMinRequiredLabel", "datapoint.qratingMinDesiredValue", "datapoint.qratingMinDesiredLabel", "datapoint.qratingIdealValue", "datapoint.qratingIdealLabel", "datapoint.qratingMaxDesiredValue", "datapoint.qratingMaxDesiredLabel", "datapoint.qratingMaxAllowedValue", "datapoint.qratingMaxAllowedLabel", "datapoint.qratingMaxScore"]
    },
    "PROFILES": {
        "PROFILES": ["organizationName", "profile.id", "profile.name", "profile.description", "profile.version", "flavour.name", "datastreams.id", "datastreams.name", "datastream.description", "datastreams.unit.type", "datastreams.unit.label", "datastreams.unit.symbol", "datastreams.period", "datastreams.tags", "datastreams.qratingMinRequiredValue", "datastreams.qratingMinRequiredLabel", "datastreams.qratingMinDesiredValue", "datastreams.qratingMinDesiredLabel", "datastreams.qratingIdealValue", "datastream.qratingIdealLabel", "datastreams.qratingMaxDesiredValue", "datastreams.qratingMaxDesiredLabel", "datastreams.qratingMaxAllowedValue", "datastreams.qratingMaxAllowedLabel", "datastreams.qratingMaxScore"]
    },
    "IOTDEVICES": {
        "IOTDEVICES": ['entityKey', 'device', 'deviceId', 'deviceScore', 'deviceMaxScore', 'devicePerformance', 'deviceAvgPerformance', 'deviceQuality', 'deviceChannel', 'deviceOrganization', 'deviceEntityType', 'profile', 'profileName', 'profileDescription', 'profileVersion', 'profileScore', 'profileMaxScore', 'profilePerformance', 'profileAvgPerformance', 'profileQuality', 'flavourName', 'flavourScore', 'flavourMaxScore', 'flavourPerformance', 'flavourAvgPerformance', 'flavourQuality', 'feed', 'feedId', 'organizationId', 'datastreamName', 'datastreamDescription', 'datastreamUnitType', 'datastreamUnitLabel', 'datastreamUnitSymbol', 'datastreamPeriod', 'datastreamTags', 'datastreamUpdated,updatedEpoch', 'datastreamUpdatedYear', 'datastreamUpdatedMonth', 'datastreamUpdatedDay', 'datastreamUpdatedHour', 'datastreamCurrentValue', 'datastreamDated', 'datedEpoch', 'datastreamDatedYear', 'datastreamDatedMonth', 'datastreamDatedDay', 'datastreamDatedHour', 'datastreamMinValue', 'datastreamMinValueDate', 'datastreamMaxValue', 'datastreamMaxValueDate', 'datastreamPoints', 'datastreamStatsAverage', 'datastreamStatsVariation', 'datastreamStatsLastPoints', 'datastreamStatsElapsedTime', 'datastreamFormatType', 'datastreamFormatSubtype', 'datastreamFormatAttributes', 'datastreamQratingMinRequired', 'datastreamQratingMinRequiredValue', 'datastreamQratingMinRequiredLabel', 'datastreamQratingMinDesired', 'datastreamQratingMinDesiredValue', 'datastreamQratingMinDesiredLabel', 'datastreamQratingIdeal', 'datastreamQratingIdealValue', 'datastreamQratingIdealLabel', 'datastreamQratingMaxDesired', 'datastreamQratingMaxDesiredValue', 'datastreamQratingMaxDesiredLabel', 'datastreamQratingMaxAllowed', 'datastreamQratingMaxAllowedValue', 'datastreamQratingMaxAllowedLabel', 'datastreamQratingMaxScore', 'datastreamQratingCumulativePeriodDivisor', 'datastreamQratingConversionMatrix', 'datastreamScoring', 'datastreamScoring', 'datastreamScoringQScore', 'datastreamScoringQuality', 'datastreamScoringPerformance']
    },
    "DATASTREAMS": {
        "DATASTREAMS": ["datastream.id", "datastream.name", "datastream.feed", "datastream.device", "datastream.description", "datastream.unit.type", "datastream.unit.label", "datastream.unit.symbol", "datastream.period", "datastream.tags", "datastream.updated", "datastream.minValue", "datastream.maxValue", "datastream.currentValue", "datastream.flavourName", "datastream.profileId", "datastream.profileName", "datastream.profileDescription", "datastream.profileVersion", "datastream.qratingScoringQValue", "datastream.qratingScoringQScore", "datastream.qratingScoringQuality", "datastream.qratingScoringPerformance", "datastream.qratingMinRequiredValue", "datastream.qratingMinRequiredLabel", "datastream.qratingMinDesiredValue", "datastream.qratingMinDesiredLabel", "datastream.qratingIdealValue", "datastream.qratingIdealLabel", "datastream.qratingMaxDesiredValue", "datastream.qratingMaxDesiredLabel", "datastream.qratingMaxAllowedValue", "datastream.qratingMaxAllowedLabel", "datastream.qratingMaxScore"]
    },
    "FEEDS": {
        "FEEDS": ["feed.feedId", "feed.deviceId"]
    },
    "DMMQRATING": {
        "DMMQRATING": ["datastream.id", "datastream.name", "datastream.feed", "datastream.device", "datastream.description", "datastream.unit.type", "datastream.unit.label", "datastream.unit.symbol", "datastream.period", "datastream.tags", "datastream.updated", "datastream.minValue", "datastream.maxValue", "datastream.currentValue", "datastream.flavourName", "datastream.profileId", "datastream.profileName", "datastream.profileDescription", "datastream.profileVersion", "datastream.qratingScoringQValue", "datastream.qratingScoringQScore", "datastream.qratingScoringQuality", "datastream.qratingScoringPerformance", "datastream.qratingMinRequiredValue", "datastream.qratingMinRequiredLabel", "datastream.qratingMinDesiredValue", "datastream.qratingMinDesiredLabel", "datastream.qratingIdealValue", "datastream.qratingIdealLabel", "datastream.qratingMaxDesiredValue", "datastream.qratingMaxDesiredLabel", "datastream.qratingMaxAllowedValue", "datastream.qratingMaxAllowedLabel", "datastream.qratingMaxScore"]
    },
    "IOTQRATING": {
        "IOTQRATING": ["datastream.id", "datastream.name", "datastream.feed", "datastream.device", "datastream.description", "datastream.unit.type", "datastream.unit.label", "datastream.unit.symbol", "datastream.period", "datastream.tags", "datastream.updated", "datastream.minValue", "datastream.maxValue", "datastream.currentValue", "datastream.flavourName", "datastream.profileId", "datastream.profileName", "datastream.profileDescription", "datastream.profileVersion", "datastream.qratingScoringQValue", "datastream.qratingScoringQScore", "datastream.qratingScoringQuality", "datastream.qratingScoringPerformance", "datastream.qratingMinRequiredValue", "datastream.qratingMinRequiredLabel", "datastream.qratingMinDesiredValue", "datastream.qratingMinDesiredLabel", "datastream.qratingIdealValue", "datastream.qratingIdealLabel", "datastream.qratingMaxDesiredValue", "datastream.qratingMaxDesiredLabel", "datastream.qratingMaxAllowedValue", "datastream.qratingMaxAllowedLabel", "datastream.qratingMaxScore"]
    },
    "DEVICE_PART_DEVICE": {
        "IOT": ["datastream.id", "datastream.name", "datastream.feed", "datastream.device", "datastream.description", "datastream.unit.type", "datastream.unit.label", "datastream.unit.symbol", "datastream.period", "datastream.tags", "datastream.updated", "datastream.minValue", "datastream.maxValue", "datastream.currentValue", "datastream.flavourName", "datastream.profileId", "datastream.profileName", "datastream.profileDescription", "datastream.profileVersion", "datastream.qratingScoringQValue", "datastream.qratingScoringQScore", "datastream.qratingScoringQuality", "datastream.qratingScoringPerformance", "datastream.qratingMinRequiredValue", "datastream.qratingMinRequiredLabel", "datastream.qratingMinDesiredValue", "datastream.qratingMinDesiredLabel", "datastream.qratingIdealValue", "datastream.qratingIdealLabel", "datastream.qratingMaxDesiredValue", "datastream.qratingMaxDesiredLabel", "datastream.qratingMaxAllowedValue", "datastream.qratingMaxAllowedLabel", "datastream.qratingMaxScore", "deviceId", "feedId", "deviceOrganization", "profile.Name", "profile.Description", "profile.Version", "profile.Score", "profile.MaxScore", "profile.Performance", "profile.AvgPerformance", "profile.Quality", "flavour.Name", "flavour.Score", "flavour.MaxScore", "flavour.Performance", "flavour.AvgPerformance", "flavour.Quality", "device.Score", "device.MaxScore", "device.Performance", "device.AvgPerformance", "device.Quality", "device.Channel", "device.EntityType"]
    },
    "USER": {
        "USER": ["user.email", "user.description", "workgroup.name", "domain.name", "profile.name", "user.name", "user.surname", "country.code", "language.code"]
    },
    "DOMAIN": {
        "DOMAIN": []
    }
};
exports.IOT_FIELDS = IOT_FIELDS;
//# sourceMappingURL=IotFields.js.map
