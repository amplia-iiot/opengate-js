# features/create_device_message.feature
@provision
@device_builder
@create_device_message
@device_message
@entities_provision
Feature: Send messages
As a device of JsApi
I want to create message and send it
So, I can create a new message with the parametres that I have been defined

    Background:
        Given an apikey user by "require-real-apikey"
        And an ogapi "deviceMessage builder" util
        And I want to create a "deviceMessage"

    Scenario: Creating an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "device_msg_organization"
        And the "description" "device organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        Then I create it
        And response code should be: 201


    Scenario: I want to get the allowed datastream
        Given the entity of type "devices builder" with "device_msg_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                   | parent |
            | provision.administration.channel      | simple       | default_channel         |        |
            | provision.administration.organization | simple       | device_msg_organization |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup       |        |
            | provision.device.identifier           | simple       | device_ogapi_cdmsg      |        |
            | provision.device.operationalStatus    | simple       | NORMAL                  |        |
            | provision.device.administrativeState  | simple       | ACTIVE                  |        |
        Then I create it
        And response code should be: 201

    Scenario: Create a Iot message
        Given the "datastreamVersion" "0.0.1"
        And the "id" "device_ogapi_cdmsg"
        And I want to create a "datapoints message" with this element:
            | field | content   | type   |
            | from  | 123455    | number |
            | at    | 123456    | number |
            | value | 114.3     | number |
            | tags  | tag1,tag2 | array  |
        And I want to create a "datastream" with this element:
            | field | content        | type   |
            | feed  | feed element   | string |
            | id    | numeric.stream | string |
        And I want to define "datapoints message" in "datastream"
        And I want to create a "datapoints message" with this element:
            | field | content | type   |
            | value | 15.3    | number |
        And I want to define "datapoints message" in "datastream"
        And I want to define "datastream" in "deviceMessage"
        Then I create it
        And response code should be: 201

    Scenario: Create a Dmm message
        Given the "version" "1.0.1"
        And the "id" "device_ogapi_cdmsg"
        And the "path"
            | ./ | /path |
        And the "name" "dmm name"
        And the "description" "cucumber description"
        And I want to create a "hardware" with this element:
            | field            | content                   |
            | serialnumber     | 4CCT                      |
            | manufacturerName | 4CCT                      |
            | manufacturerOui  | 4CCT                      |
            | modelName        | 4CCT                      |
            | modelVersion     | 4CCT                      |
            | clockDate        | 2015-07-16T19:20:30+01:00 |
            | upTime           | 123456789                 |
        And I want to define "hardware" in "deviceMessage"
        And the "operationalStatus" "UNKNOWN"
        And I want to create a "software" with this element:
            | field   | content             |
            | name    | MT16LSDT464AG-662C1 |
            | type    | FIRMWARE            |
            | version | test                |
        And I want to define "software" in "deviceMessage"
        And the "dateLocation" "2016-10-25T11:00:00"
        And the "longitude" 40.75
        And the "latitude" -35
        And the "currentTemperature" "1"
        And the "unitTemperature" "C"
        And the "statusTemperature" "NORMAL"
        And the "trendTemperature" "DECREASING"
        And the "temperatureAverage" "30"
        And the "minimumTemperature" "5"
        And the "maximumTemperature" "35"
        And I want to create a "cpuUsage" with this element:
            | field     | content | type   |
            | usageUnit | %       | string |
            | current   | 2       | string |
            | average   | 15      | string |
            | maximum   | 17      | string |
            | minimum   | 8       | string |
        And I want to define "cpuUsage" in "deviceMessage"

        And I want to create a "n" with this element:
            | field     | content | type   |
            | unit      | MB      | string |
            | total     | 2048    | string |
            | usageUnit | %       | string |
            | current   | 2       | string |
            | average   | 15      | string |
            | maximum   | 17      | string |
            | minimum   | 8       | string |
        And I want to define "ram" in "deviceMessage"

        And I want to create a "volatilStorage" with this element:
            | field     | content | type   |
            | unit      | MB      | string |
            | total     | 2048    | string |
            | usageUnit | %       | string |
            | current   | 5       | string |
            | average   | 50      | string |
            | maximum   | 80      | string |
            | minimum   | 10      | string |
        And I want to define "volatilStorage" in "deviceMessage"
        And I want to create a "nonVolatilStorage" with this element:
            | field     | content | type   |
            | unit      | MB      | string |
            | total     | 2048    | string |
            | usageUnit | %       | string |
            | current   | 2       | string |
            | average   | 15      | string |
            | maximum   | 17      | string |
            | minimum   | 8       | string |
        And I want to define "nonVolatilStorage" in "deviceMessage"

        And I want to create a "powerSupply" with this element:
            | field          | content                   | type   |
            | source         | NETWORK_PLUGGED           | string |
            | status         | COMPLETE                  | string |
            | trend          | RISING                    | string |
            | batteryStatus  | CHARGED                   | string |
            | percentage     | 100                       | string |
            | outageDate     | 2015-07-16T19:20:30+01:00 | string |
            | outageDuration | 10000                     | number |
        And I want to define "powerSupply" in "deviceMessage"

        And I want to create a "commsModuleMessage" with this element:
            | field             | content                | type   |
            | id                | <identifier>. Ex: IMEI | string |
            | name              | 2G-Modem               | string |
            | type              | MOBILE                 | string |
            | operationalStatus | STOPPED                | string |
            | antennaStatus     | SHORT_CIRCUIT          | string |
        And I want to create a "hardware" with this element:
            | field            | content                   |
            | serialnumber     | 4CCT                      |
            | manufacturerName | 4CCT                      |
            | manufacturerOui  | 4CCT                      |
            | modelName        | 4CCT                      |
            | modelVersion     | 4CCT                      |
            | clockDate        | 2015-07-16T19:20:30+01:00 |
            | upTime           | 2016-10-25T11:00:00       |
        And I want to define "hardware" in "commsModuleMessage"
        And I want to create a "software" with this element:
            | field   | content             |
            | name    | MT16LSDT464AG-662C1 |
            | type    | FIRMWARE            |
            | version | test                |
        And I want to define "software" in "commsModuleMessage"
        And I want to create a "mobile" with this element:
            | field             | content | type   |
            | apn               | tfdata  | string |
            | bcch              | bcch    | string |
            | cgi               | cgi     | string |
            | cellId            | id      | string |
            | lac               | lac     | string |
            | ratType           | racType | string |
            | plmn              | plmn    | string |
            | timingAdvance     | 10      | string |
            | signalStrength    | -55     | string |
            | signalStrengthMax | -49     | string |
            | signalStrengthMin | -81     | string |
            | signalQuality     | 0       | string |
            | signalQualityMax  | 3.2     | string |
            | signalQualityMin  | 0       | string |
        And I want to define "mobile" in "commsModuleMessage"
        And I want to create a "subscriber" with this element:
            | field | content         | type   |
            | id    | subscriber_id   | string |
            | name  | subscriber_name | string |
            | type  | SIM             | string |
        And I want to create a "hardware" with this element:
            | field            | content                   |
            | serialnumber     | 4CCT                      |
            | manufacturerName | 4CCT                      |
            | manufacturerOui  | 4CCT                      |
            | modelName        | 4CCT                      |
            | modelVersion     | 4CCT                      |
            | clockDate        | 2015-07-16T19:20:30+01:00 |
            | upTime           | 2016-10-25T11:00:00       |
        And I want to define "hardware" in "subscriber"
        And I want to define "subscriber" in "commsModuleMessage"
        And I want to create a "subscription" with this element:
            | field        | content      | type   |
            | id           | subscription | string |
            | name         | subscription | string |
            | type         | subscription | string |
            | description  | subscription | string |
            | operator     | subscription | string |
            | imsi         | subscription | string |
            | msisdn       | subscription | string |
            | addressType  | IPV4         | string |
            | addressValue | subscription | string |
            | addressApn   | subscription | string |
        And I want to define "subscription" in "commsModuleMessage"
        And I want to define "commsModuleMessage" in "deviceMessage"

        Then I create it
        And response code should be: 201

    Scenario: I want to delete the entity
        Given the entity of type "devices builder" with "device_msg_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                  | typeFunction | value              | parent |
            | provision.device.identifier | simple       | device_ogapi_cdmsg |        |
        And I delete it
        Then response code should be: 200


    Scenario: Deleting an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "device_msg_organization"
        Then I delete it
