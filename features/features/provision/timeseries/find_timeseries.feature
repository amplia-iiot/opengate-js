# features/features/provision/timeseries/find_timeseries.feature
@finder
@timeseries
@find_timeseries

Feature: Find a timeserie
    As a user of JsApi
    I want to find a timeserie
    So I can check if a user exists and get their information

    Background:
        #Given an apikey user by "require-real-apikey"
        Given an email "YOUR_EMAIL" and password "YOUR_PASSWORD" the user logs in
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
        Then I can see into the result an "timeserie - name" as "mockTimeserie"
        
        And an ogapi "timeserie finder" util
        Given I want to read a "timeserie"
        When I try to find by...
            | field          | content                         |
            | organizationId | timeserie_organization          |
            | timeserieId    | from_data_identifier_previous_response |
        Then response code should be: 200

        And an ogapi "timeserie finder" util
        Given I want to read a "timeserie"
        When I try to find by...
            | field          | content                         |
            | organizationId | timeserie_organization |
            | expand | ["columns"] |
        Then response code should be: 200
        Then I can see into the result an "timeserie - name" as "mockTimeserie"
        Then I can see into the result an "timeserie - columns" as
            """
            [{"path":"device.communicationModules[0].subscription.traffic.sentBytes._current.value","name":"Daily sent bytes","filter":"NO","type":"number","sort":false,"aggregationFunction":"SUM"},{"path":"device.communicationModules[0].subscription.traffic.receivedBytes._current.value","name":"Daily received bytes","filter":"NO","type":"number","sort":false,"aggregationFunction":"SUM"},{"path":"device.communicationModules[0].subscription.presence.unifiedPresence._current.value","name":"Last presence","filter":"YES","type":"string","sort":false,"aggregationFunction":"LAST"},{"path":"device.communicationModules[0].subscription.mobile.signalStrength._current.value","name":"Average Signal strength","filter":"YES","type":"number","sort":false,"aggregationFunction":"AVG"}]
            """


        And an ogapi "timeserie finder" util
        Given I want to read a "timeserie"
        When I try to find by...
            | field          | content                         |
            | organizationId | timeserie_organization|
            | expand | ["context"] |
        Then response code should be: 200
        Then I can see into the result an "timeserie - name" as "mockTimeserie"
        Then I can see into the result an "timeserie - context" as
            """
            [{"path":"provision.device.identifier._current.value","name":"Prov identifier","filter":"YES","type":"string","sort":true},{"path":"device.model._current.value.manufacturer","name":"Manufacturer","filter":"ALWAYS","type":"string","sort":false},{"path":"device.communicationModules[0].subscriber.mobile.icc._current.value","name":"ICC","filter":"NO","type":"string","sort":false}]
            """

        And an ogapi "timeserie finder" util
        Given I want to read a "timeserie"
        When I try to find by...
            | field          | content                         |
            | organizationId | timeserie_organization|
            | expand |  ["columns","context"]  |
        Then response code should be: 200
        Then I can see into the result an "timeserie - name" as "mockTimeserie"
        Then I can see into the result an "timeserie - columns" as
            """
            [{"path":"device.communicationModules[0].subscription.traffic.sentBytes._current.value","name":"Daily sent bytes","filter":"NO","type":"number","sort":false,"aggregationFunction":"SUM"},{"path":"device.communicationModules[0].subscription.traffic.receivedBytes._current.value","name":"Daily received bytes","filter":"NO","type":"number","sort":false,"aggregationFunction":"SUM"},{"path":"device.communicationModules[0].subscription.presence.unifiedPresence._current.value","name":"Last presence","filter":"YES","type":"string","sort":false,"aggregationFunction":"LAST"},{"path":"device.communicationModules[0].subscription.mobile.signalStrength._current.value","name":"Average Signal strength","filter":"YES","type":"number","sort":false,"aggregationFunction":"AVG"}]
            """
        Then I can see into the result an "timeserie - context" as
            """
            [{"path":"provision.device.identifier._current.value","name":"Prov identifier","filter":"YES","type":"string","sort":true},{"path":"device.model._current.value.manufacturer","name":"Manufacturer","filter":"ALWAYS","type":"string","sort":false},{"path":"device.communicationModules[0].subscriber.mobile.icc._current.value","name":"ICC","filter":"NO","type":"string","sort":false}]
            """

        And an ogapi "timeserie finder" util
        Given I want to read a "timeserie"
        When I try to find by...
            | field          | content                         |
            | organizationId | timeserie_organization|
            | expand | [] |
            | dataStreams |  ["device.model._current.value.manufacturer", "device.model._current.value.manufacturer"]   |
        Then response code should be: 200
        Then I can see into the result an "timeserie - name" as "mockTimeserie"
        

        And an ogapi "timeserie finder" util
        Given I want to read a "timeserie"
        When I try to find by...
            | field          | content                         |
            | organizationId | timeserie_organization |
            | expand |  ["columns"] |
            | dataStreams |  ["device.model._current.value.manufacturer", "device.model._current.value.manufacturer"]  |
        Then response code should be: 200
        Then I can see into the result an "timeserie - columns" as
            """
            [{"path":"device.communicationModules[0].subscription.traffic.sentBytes._current.value","name":"Daily sent bytes","filter":"NO","type":"number","sort":false,"aggregationFunction":"SUM"},{"path":"device.communicationModules[0].subscription.traffic.receivedBytes._current.value","name":"Daily received bytes","filter":"NO","type":"number","sort":false,"aggregationFunction":"SUM"},{"path":"device.communicationModules[0].subscription.presence.unifiedPresence._current.value","name":"Last presence","filter":"YES","type":"string","sort":false,"aggregationFunction":"LAST"},{"path":"device.communicationModules[0].subscription.mobile.signalStrength._current.value","name":"Average Signal strength","filter":"YES","type":"number","sort":false,"aggregationFunction":"AVG"}]
            """
        
        And an ogapi "timeserie finder" util
        Given I want to read a "timeserie"
        When I try to find by...
            | field          | content                         |
            | organizationId | timeserie_organization |
            | expand |  ["context"] |
            | dataStreams |  ["device.model._current.value.manufacturer", "device.model._current.value.manufacturer"] |
        Then response code should be: 200
        Then I can see into the result an "timeserie - context" as
            """
            [{"path":"provision.device.identifier._current.value","name":"Prov identifier","filter":"YES","type":"string","sort":true},{"path":"device.model._current.value.manufacturer","name":"Manufacturer","filter":"ALWAYS","type":"string","sort":false},{"path":"device.communicationModules[0].subscriber.mobile.icc._current.value","name":"ICC","filter":"NO","type":"string","sort":false}]
            """

        And an ogapi "timeserie finder" util
        Given I want to read a "timeserie"
        When I try to find by...
            | field          | content                         |
            | organizationId | timeserie_organization |
            | expand |  ["columns","context"] |
            | dataStreams |  ["device.model._current.value.manufacturer", "device.model._current.value.manufacturer"] |
        Then response code should be: 200
        Then I can see into the result an "timeserie - columns" as
            """
            [{"path":"device.communicationModules[0].subscription.traffic.sentBytes._current.value","name":"Daily sent bytes","filter":"NO","type":"number","sort":false,"aggregationFunction":"SUM"},{"path":"device.communicationModules[0].subscription.traffic.receivedBytes._current.value","name":"Daily received bytes","filter":"NO","type":"number","sort":false,"aggregationFunction":"SUM"},{"path":"device.communicationModules[0].subscription.presence.unifiedPresence._current.value","name":"Last presence","filter":"YES","type":"string","sort":false,"aggregationFunction":"LAST"},{"path":"device.communicationModules[0].subscription.mobile.signalStrength._current.value","name":"Average Signal strength","filter":"YES","type":"number","sort":false,"aggregationFunction":"AVG"}]
            """
        Then I can see into the result an "timeserie - context" as
            """
            [{"path":"provision.device.identifier._current.value","name":"Prov identifier","filter":"YES","type":"string","sort":true},{"path":"device.model._current.value.manufacturer","name":"Manufacturer","filter":"ALWAYS","type":"string","sort":false},{"path":"device.communicationModules[0].subscriber.mobile.icc._current.value","name":"ICC","filter":"NO","type":"string","sort":false}]
            """

        
        And an ogapi "timeserie finder" util
        Given I want to read a "timeserie"
        When I try to find by...
            | field          | content                         |
            | organizationId | timeserie_organization          |
            | expand    | [] |
            | dataStreams    | ["notExists"] |
        Then response code should be: 200

        And an ogapi "timeserie finder" util
        Given I want to read a "timeserie"
        When I try to find by...
            | field          | content                         |
            | organization | timeserie_organization          |
            | name    | mockTimeserie |
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
