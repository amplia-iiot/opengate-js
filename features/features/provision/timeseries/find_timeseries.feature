# features/features/provision/timeseries/find_timeseries.feature
@finder
@timeseries
@find_timeseries

Feature: Find a timeserie
    As a user of JsApi
    I want to find a timeserie
    So I can check if a user exists and get their information

    Background:
        Given an apikey user by "2829be88-a7d7-4f51-aefc-3cc2385b6506"
    #TESTS WITH MOCK, ONLY TIMESERIES URIS: Given with mock "timeseries" for "find"

    Scenario: Creating an organization to use in timeserie tests
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "timeserie_organization"
        And the "description" "timeserie organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        Then I create it
        And response code should be: 201

    Scenario: Create a timeserie that does not exist and read
        And an ogapi "timeseries builder" util
        And I want to create a "timeserie"
        And the "organization" "timeserie_organization"
        And the "name" "mockTimeserie"
        And the "timeBucket" 86400
        And the "identifierColumn" "Identifier"
        And the "bucketColumn" "bucket_id"
        And the "description" "timeserie description"
        And the "columns" with...
            | param                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
            | [{  "path": "device.communicationModules[0].subscription.traffic.sentBytes._current.value",  "name": "Daily sent bytes",  "filter": "NO",  "sort": false,  "aggregationFunction": "SUM"},{  "path": "device.communicationModules[0].subscription.traffic.receivedBytes._current.value",  "name": "Daily received bytes",  "filter": "NO",  "aggregationFunction": "SUM",  "sort": false},{  "path": "device.communicationModules[0].subscription.presence.unifiedPresence._current.value",  "name": "Last presence",  "filter": "YES",  "sort": false,  "aggregationFunction": "LAST"},{  "path": "device.communicationModules[0].subscription.mobile.signalStrength._current.value",  "name": "Average Signal strength",  "filter": "YES",  "sort": false,  "aggregationFunction": "AVG"}] |
        And the "context" with...
            | param                                                                                                                                                                                                                                                                                                                                                                           |
            | [{  "path": "provision.device.identifier._current.value",  "name": "Prov identifier",  "filter": "YES",  "sort": true},{  "path": "device.model._current.value.manufacturer",  "name": "Manufacturer",  "filter": "ALWAYS",  "sort": false},{  "path": "device.communicationModules[0].subscriber.mobile.icc._current.value",  "name": "ICC",  "filter": "NO",  "sort": false}] |
        Then I create it
        And response code should be: 201

        And an ogapi "timeserie finder" util
        Given I want to read a "timeserie"
        When I try to find by...
            | field          | content                |
            | organizationId | timeserie_organization |
        Then response code should be: 200

        And an ogapi "timeserie finder" util
        Given I want to read a "timeserie"
        When I try to find by...
            | field          | content                         |
            | organizationId | timeserie_organization          |
            | timeserieId    | from_location_previous_response |
        Then response code should be: 200

        And an ogapi "timeseries builder" util
        And I want to delete a "timeserie"
        And the "organization" "timeserie_organization"
        And I delete it with location as a identifier
        Then response code should be: 200

    Scenario: Deleting an organization
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "timeserie_organization"
        Then I delete it
        And response code should be: 200
