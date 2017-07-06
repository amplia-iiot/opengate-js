# features/searching_async_datapoints.feature

@searching_datapoints
@searching_asynchronous
Feature: Searching into datapoints collection
  As a user of JsApi
  I want to search the collection of data points using asynchronous pagination

  Background:
    Given an apikey user by "b52eaed2-f155-4c45-8628-49708372b964"

   Scenario: Create a gateway that not exists 
    Given an ogapi "devices builder" util 
    And I want to create a "device"
    And the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "operational status" "TEST"
    And the "entity key" "sensor_testing_cucumber"
    And the "serial number" "OGUX_SerialNumber_GATEWAY"
    And the "name" "OGUX Device GATEWAY tester"
    And the "description" "OGUX Device tester full GATEWAY description"
    And the "type" "gateway"
    And the "specific type" "CONCENTRATOR"
    And I delete it
    Then I create it
    And response code should be: 201

    Scenario: Create a Iot message 
    Given an ogapi "deviceMessage builder" util 
    And I want to create a "deviceMessage"
    And the "datastreamVersion" "0.0.1"
    And the "id" "sensor_testing_cucumber"
    And I want to create a "datapoints message" with this element:
        | field      | content         | type|
        | from       | 123455          | number|
        | at         | 123456          | number|
        | value      | 114.3           | number|
        | tags       | tag1,tag2      | array |
    And I want to create a "datastream" with this element:
        | field      | content       | type|
        | feed       | feed element        | string|
        | id         | numeric.stream| string|
    And I want to define "datapoints message" in "datastream"
    And I want to create a "datapoints message" with this element:
        | field      | content | type |
        | value      | 15.3    | number |
    And I want to define "datapoints message" in "datastream"
    And I want to define "datastream" in "deviceMessage"
    Then I create it
    And response code should be: 201

 Scenario: Create a Dmm message 
  Given an ogapi "deviceMessage builder" util 
    And I want to create a "deviceMessage"
   And the "version" "1.0.1"
   And the "id" "sensor_testing_cucumber"
   And the "path"
       |./ | /path |
   And the "name" "dmm name"
   And the "description" "cucumber description"
   And I want to create a "hardware" with this element:
       | field             | content | type
       | serialnumber      |  4CCT   |
       | manufacturerName  |  4CCT   |
       | manufacturerOui   |  4CCT   |
       | modelName         |  4CCT   |
       | modelVersion      |  4CCT   |
       | clockDate         |2015-07-16T19:20:30+01:00|
       | upTime            |123456789|
   And I want to define "hardware" in "deviceMessage"
   And the "operationalStatus" "UNKNOWN"
   And I want to create a "software" with this element:
       | field             | content |
       | name              | MT16LSDT464AG-662C1 |
       | type              | FIRMWARE  |
       | version           | test |
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
       | field           | content | type |
       |usageUnit        | %       | string|
       |current          | 2       | string|
       |average          | 15      | string|
       |maximum          | 17      | string|
       |minimum          | 8       | string|
   And I want to define "cpuUsage" in "deviceMessage"

   And I want to create a "n" with this element:
       | field           | content | type  |
       |unit             | MB      | string| 
       |total            | 2048    | string|
       |usageUnit        | %       | string|
       |current          | 2       | string|
       |average          | 15      | string|
       |maximum          | 17      | string|
       |minimum          | 8       | string|
   And I want to define "ram" in "deviceMessage"

   And I want to create a "volatilStorage" with this element:
       | field           | content | type  |
       |unit             | MB      | string| 
       |total            | 2048    | string|
       |usageUnit        | %       | string|
       |current          | 5       | string|
       |average          | 50      | string|
       |maximum          | 80      | string|
       |minimum          | 10       | string|
   And I want to define "volatilStorage" in "deviceMessage"
   And I want to create a "nonVolatilStorage" with this element:
       | field           | content | type  |
       |unit             | MB      | string| 
       |total            | 2048    | string|
       |usageUnit        | %       | string|
       |current          | 2       | string|
       |average          | 15      | string|
       |maximum          | 17      | string|
       |minimum          | 8       | string|
   And I want to define "nonVolatilStorage" in "deviceMessage"

   And I want to create a "powerSupply" with this element:
       | field           | content                     | type   |
       |source           |  NETWORK_PLUGGED            | string |
       |status           |  COMPLETE                   | string |
       |trend            |  RISING                     | string |
       |batteryStatus    |  CHARGED                    | string |
       |percentage       |  100                        | string |
       |outageDate       | 2015-07-16T19:20:30+01:00   | string |
       |outageDuration   |  10000                      | number |
   And I want to define "powerSupply" in "deviceMessage"

   And I want to create a "commsModuleMessage" with this element:
      | field             | content                 | type   |
      | id                | <identifier>. Ex: IMEI  | string |
      | name              | 2G-Modem                | string |
      | type              | MOBILE                  | string |
      | operationalStatus | STOPPED                 | string |
      | antennaStatus     | SHORT_CIRCUIT           | string |
   And I want to create a "hardware" with this element:
       | field             | content | type
       | serialnumber      |  4CCT   |
       | manufacturerName  |  4CCT   |
       | manufacturerOui   |  4CCT   |
       | modelName         |  4CCT   |
       | modelVersion      |  4CCT   |
       | clockDate         |  2015-07-16T19:20:30+01:00|
       | upTime            |  2016-10-25T11:00:00|
   And I want to define "hardware" in "commsModuleMessage"
   And I want to create a "software" with this element:
       | field             | content |
       | name              | MT16LSDT464AG-662C1 |
       | type              | FIRMWARE  |
       | version           | test |
   And I want to define "software" in "commsModuleMessage"
   And I want to create a "mobile" with this element:
       | field             | content   | type    |
       | apn               |   tfdata  | string |
       | bcch              | bcch      | string |
       | cgi               |  cgi      | string |
       | cellId            | id        | string |
       | lac               |  lac      | string |
       | ratType           |  racType  | string |
       | plmn              |  plmn     | string |
       | timingAdvance     |  10       | string |
       | signalStrength    | -55       | string |
       | signalStrengthMax | -49       | string |
       | signalStrengthMin | -81       | string |
       | signalQuality     |  0        | string |
       | signalQualityMax  |  3.2      | string |
       | signalQualityMin  |  0        | string |
   And I want to define "mobile" in "commsModuleMessage"
   And I want to create a "subscriber" with this element:
       | field             | content         | type  |
       | id                | subscriber_id   | string|
       | name              | subscriber_name | string|
       | type              | SIM             | string|
   And I want to create a "hardware" with this element:
       | field             | content | type
       | serialnumber      |  4CCT   |
       | manufacturerName  |  4CCT   |
       | manufacturerOui   |  4CCT   |
       | modelName         |  4CCT   |
       | modelVersion      |  4CCT   |
       | clockDate         |  2015-07-16T19:20:30+01:00|
       | upTime            |  2016-10-25T11:00:00|
   And I want to define "hardware" in "subscriber"
   And I want to define "subscriber" in "commsModuleMessage"
   And I want to create a "subscription" with this element:
       | field             | content         | type   |
       | id                | subscription    | string |
       | name              | subscription    | string |
       | type              | subscription    | string |
       | description       | subscription    | string |
       | operator          | subscription    | string |
       | imsi              | subscription    | string |
       | msisdn            | subscription    | string |
       | addressType       | IPV4            | string |
       | addressValue      | subscription    | string |
       | addressApn        | subscription    | string |
   And I want to define "subscription" in "commsModuleMessage"
   And I want to define "commsModuleMessage" in "deviceMessage"
   
   Then I create it
   And response code should be: 201

Scenario: Execute asynchronous search with paging
    Given an ogapi "datapoints search" util
  	And the start limit by "1" and size limit by "100"
    And the resource by "datapoints"
  	When I build it
  	And I execute with async paging it
  	Then response code should be: 200  	

Scenario: Execute asynchronous search with paging and cancell it in first page
    Given an ogapi "datapoints search" util
  	And the start limit by "1" and size limit by "100"
    And the resource by "datapoints"
  	When I build it
  	And I execute with async paging it and cancel it
  	Then response code should be: 403

Scenario: Execute asynchronous search with paging and cancell it in first page with custom message
    Given an ogapi "datapoints search" util
  	And the start limit by "1" and size limit by "100"
    And the resource by "datapoints"
  	When I build it
  	And I execute with async paging it and cancel it with custom message
  	Then response code should be: "cancel with custom message"      

Scenario: Delete a gateway that not exists 
    Given an ogapi "devices builder" util 
    And I want to create a "device"
    And the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "entity key" "sensor_testing_cucumber"
    And I delete it
    And response code should be: 200
