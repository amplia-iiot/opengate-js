# features/features/searching/timeseries/searching_timeseries.feature
@searching
@searching_timeseries_data
@timeseries

@wip

Feature: Searching timeseriess data
  As a user of JsApi
  I want to search into timeseriess data collection
  So I can add filter, sorting, limit to search any timeseries, and delete it

  Background:
    Given an apikey user by "require-real-apikey"
  #TESTS WITH MOCK, ONLY TIMESERIES URIS: Given with mock "timeseries" for "searching"

  Scenario: Creating an organization to use in timeseries tests
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "timeserie_organization"
    And the "description" "timeserie organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1
    # Then I delete it
    Then I create it
    And response code should be: 201

  # Scenario: Execute searching with a valid start limit
  #   And an ogapi "timeseries builder" util
  #   And I want to create a "timeserie"
  #   And the "organization" "timeserie_organization"
  #   And the "name" "mockTimeserie1"
  #   And the "timeBucket" 86400
  #   And the "identifierColumn" "Identifier"
  #   And the "bucketColumn" "bucket_id"
  #   And the "description" "timeserie description"
  #   And the "columns" with...
  #     | param                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
  #     | [{  "path": "device.communicationModules[0].subscription.traffic.sentBytes._current.value",  "name": "Daily sent bytes",  "filter": "NO",  "sort": false,  "aggregationFunction": "SUM"},{  "path": "device.communicationModules[0].subscription.traffic.receivedBytes._current.value",  "name": "Daily received bytes",  "filter": "NO",  "aggregationFunction": "SUM",  "sort": false},{  "path": "device.communicationModules[0].subscription.presence.unifiedPresence._current.value",  "name": "Last presence",  "filter": "YES",  "sort": false,  "aggregationFunction": "LAST"},{  "path": "device.communicationModules[0].subscription.mobile.signalStrength._current.value",  "name": "Average Signal strength",  "filter": "YES",  "sort": false,  "aggregationFunction": "AVG"}] |
  #   And the "context" with...
  #     | param                                                                                                                                                                                                                                                                                                                                                                        |
  #     | [{  "path": "provision.device.identifier._current.value",  "name": "Prov identifier",  "filter": "YES",  "sort": true},{  "path": "device.model._current.value.manufacturer",  "name": "Manufacturer",  "filter": "YES",  "sort": false},{  "path": "device.communicationModules[0].subscriber.mobile.icc._current.value",  "name": "ICC",  "filter": "NO",  "sort": false}] |
  #   Then I create it
  #   And response code should be: 201

  #   And an ogapi "timeseries search" util with "timeserie_organization" and "from_location_previous_response"
  #   And the start limit by "null" and size limit by "5"
  #   When I build it
  #   And I execute it
  #   Then response code should be: 200
  #   Then does not throws an error

  # Scenario: Execute searching
  #   And an ogapi "timeseries builder" util
  #   And I want to create a "timeserie"
  #   And the "organization" "timeserie_organization"
  #   And the "name" "mockTimeserie2"
  #   And the "timeBucket" 86400
  #   And the "identifierColumn" "Identifier"
  #   And the "bucketColumn" "bucket_id"
  #   And the "description" "timeserie description"
  #   And the "columns" with...
  #     | param                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
  #     | [{  "path": "device.communicationModules[0].subscription.traffic.sentBytes._current.value",  "name": "Daily sent bytes",  "filter": "NO",  "sort": false,  "aggregationFunction": "SUM"},{  "path": "device.communicationModules[0].subscription.traffic.receivedBytes._current.value",  "name": "Daily received bytes",  "filter": "NO",  "aggregationFunction": "SUM",  "sort": false},{  "path": "device.communicationModules[0].subscription.presence.unifiedPresence._current.value",  "name": "Last presence",  "filter": "YES",  "sort": false,  "aggregationFunction": "LAST"},{  "path": "device.communicationModules[0].subscription.mobile.signalStrength._current.value",  "name": "Average Signal strength",  "filter": "YES",  "sort": false,  "aggregationFunction": "AVG"}] |
  #   And the "context" with...
  #     | param                                                                                                                                                                                                                                                                                                                                                                           |
  #     | [{  "path": "provision.device.identifier._current.value",  "name": "Prov identifier",  "filter": "YES",  "sort": true},{  "path": "device.model._current.value.manufacturer",  "name": "Manufacturer",  "filter": "ALWAYS",  "sort": false},{  "path": "device.communicationModules[0].subscriber.mobile.icc._current.value",  "name": "ICC",  "filter": "NO",  "sort": false}] |
  #   Then I create it
  #   And response code should be: 201

  #   And an ogapi "timeseries search" util with "timeserie_organization" and "from_location_previous_response"
  #   When I add a filter and with
  #     | operator | key          | value |
  #     | eq       | Manufacturer | empty |
  #   And I build it
  #   And I execute it
  #   Then response code should be: 200
  #   Then does not throws an error

  # TODO: no implementado todavía. Ver tarea OUW-3577
  # @ignore
  # Scenario: Execute delete data
  # And an ogapi "timeseries builder" util
  #   And I want to create a "timeserie"
  #   And the "organization" "timeserie_organization"
  #   And the "name" "mockTimeserie1"
  #   And the "timeBucket" 86400
  #   And the "identifierColumn" "Identifier"
  #   And the "bucketColumn" "bucket_id"
  #   And the "description" "timeserie description"
  #   And the "columns" with...
  #     | param                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
  #     | [{  "path": "device.communicationModules[0].subscription.traffic.sentBytes._current.value",  "name": "Daily sent bytes",  "filter": "NO",  "sort": false,  "aggregationFunction": "SUM"},{  "path": "device.communicationModules[0].subscription.traffic.receivedBytes._current.value",  "name": "Daily received bytes",  "filter": "NO",  "aggregationFunction": "SUM",  "sort": false},{  "path": "device.communicationModules[0].subscription.presence.unifiedPresence._current.value",  "name": "Last presence",  "filter": "YES",  "sort": false,  "aggregationFunction": "LAST"},{  "path": "device.communicationModules[0].subscription.mobile.signalStrength._current.value",  "name": "Average Signal strength",  "filter": "YES",  "sort": false,  "aggregationFunction": "AVG"}] |
  #   And the "context" with...
  #     | param                                                                                                                                                                                                                                                                                                                                                                        |
  #     | [{  "path": "provision.device.identifier._current.value",  "name": "Prov identifier",  "filter": "YES",  "sort": true},{  "path": "device.model._current.value.manufacturer",  "name": "Manufacturer",  "filter": "YES",  "sort": false},{  "path": "device.communicationModules[0].subscriber.mobile.icc._current.value",  "name": "ICC",  "filter": "NO",  "sort": false}] |
  #   Then I create it
  #   And response code should be: 201

  #   And an ogapi "timeseries search" util with "timeserie_organization" and "from_location_previous_response"

  #   And I build it
  #   And I delete data
  #   Then response code should be: 200
  #   Then does not throws an error

  Scenario: Downsampling
    And an ogapi "timeseries builder" util
    Given I want to create a "timeserie"
    And the "organization" "timeserie_organization"
    And the "name" "mockTimeserie1"
    And the "timeBucket" 86400
    And the "identifierColumn" "Identifier"
    And the "bucketColumn" "bucket_id"
    And the "description" "timeserie description"
    And the "columns" with...
      | param                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
      | [{  "path": "device.powersupply.battery.charge._current.value",  "name": "Battery avg",  "filter": "YES",  "sort": true,  "aggregationFunction": "AVG"},{  "path": "device.communicationModules[0].subscription.traffic.receivedBytes._current.value",  "name": "Daily received bytes",  "filter": "NO",  "aggregationFunction": "SUM",  "sort": false},{  "path": "device.communicationModules[0].subscription.presence.unifiedPresence._current.value",  "name": "Last presence",  "filter": "YES",  "sort": false,  "aggregationFunction": "LAST"},{  "path": "device.communicationModules[0].subscription.mobile.signalStrength._current.value",  "name": "Average Signal strength",  "filter": "YES",  "sort": false,  "aggregationFunction": "AVG"}] |
    Then I create it
    And response code should be: 201
    And an ogapi "timeseries downsampler search" util with "timeserie_organization" and "from_location_previous_response"
    When I build it with data...
      | method | param1 | param2 |
      | start | 2024-11-24T12:00:00+01:00 | |
      | bucketTime | 18000 | |
      | select | [{  "column": "Battery avg",  "alias": "Max batterty avg", "interpolation": "LINEAR", aggregation: "MAX"} | |
    And I build it
    And I execute it
    Then response code should be: 200
    Then does not throws an error

  # Scenario: Timeserie as dataset

  Scenario: Deleting an organization
    Given an ogapi "organizations builder" util
    Then I want to delete an "organization"
    And the "name" "timeserie_organization"
    Then I delete it
    And response code should be: 200