# features/features/provision/analytics/create_delete_analytics.feature
@create_provision
@provision
@wip

Feature: Delete and Create an analytics pipeline
    As a user of JsApi
    I want to create a complete pipeline processor
    So i can create a new aimodel, transformer and a pipeline

    Background:
        # Given an apikey user by "require-real-apikey"
        Given an apikey user by "2829be88-a7d7-4f51-aefc-3cc2385b6506"
    #TESTS WITH MOCK, ONLY TIMESERIES URIS: Given with mock "timeseries" for "createDelete"

     Scenario: Creating an organization to use in timeseries tests
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "pipeline_organization"
        And the "description" "complete pipeline organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        Then I create it
        And response code should be: 201

    Scenario: Creating a ai model to use in the final pipeline
        Given an ogapi "aimodel builder" util
        Then I want to create a "aimodel"
        And the "organization" "pipeline_organization"
        And the "file" with file "/file_test/snow.onnx"
        # Then I delete it
        Then I create it
        And response code should be: 201

    Scenario: Creating a transformer to use in the final pipeline
        Given an ogapi "transformer builder" util
        Then I want to create a "transformer"
        And the "organization" "pipeline_organization"
        And the "file" with file "/file_test/inittransformer.py"
        And the "file" with file "/file_test/pkl_encoder.pkl"
        And the "file" with file "/file_test/pkl_scaler.pkl"
        #Then I delete it
        Then I create it
        And response code should be: 201

    # Scenario: Create and delete a timeserie that does not exist
    #     And an ogapi "timeseries builder" util
    #     And I want to create a "timeserie"
    #     And the "organization" "timeserie_organization"
    #     And the "name" "mockTimeserie"
    #     And the "timeBucket" 86400
    #     And the "identifierColumn" "Identifier"
    #     And the "bucketColumn" "bucket_id"
    #     And the "description" "timeserie description"
    #     And the "columns" with...
    #         | param                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
    #         | [{  "path": "device.communicationModules[0].subscription.traffic.sentBytes._current.value",  "name": "Daily sent bytes",  "filter": "NO",  "sort": false,  "aggregationFunction": "SUM"},{  "path": "device.communicationModules[0].subscription.traffic.receivedBytes._current.value",  "name": "Daily received bytes",  "filter": "NO",  "aggregationFunction": "SUM",  "sort": false},{  "path": "device.communicationModules[0].subscription.presence.unifiedPresence._current.value",  "name": "Last presence",  "filter": "YES",  "sort": false,  "aggregationFunction": "LAST"},{  "path": "device.communicationModules[0].subscription.mobile.signalStrength._current.value",  "name": "Average Signal strength",  "filter": "YES",  "sort": false,  "aggregationFunction": "AVG"}] |
    #     And the "context" with...
    #         | param                                                                                                                                                                                                                                                                                                                                                                           |
    #         | [{  "path": "provision.device.identifier._current.value",  "name": "Prov identifier",  "filter": "YES",  "sort": true},{  "path": "device.model._current.value.manufacturer",  "name": "Manufacturer",  "filter": "ALWAYS",  "sort": false},{  "path": "device.communicationModules[0].subscriber.mobile.icc._current.value",  "name": "ICC",  "filter": "NO",  "sort": false}] |
    #     Then I create it
    #     And response code should be: 201
    #     And I delete it with location as a identifier
    #     Then response code should be: 200

    # Scenario: Create a timeserie that already exists
    #     And an ogapi "timeseries builder" util
    #     And I want to create a "timeserie"
    #     And the "organization" "timeserie_organization"
    #     And the "name" "existsTimeseries"
    #     And the "description" "dataset description"
    #     And the "timeBucket" 86400
    #     And the "identifierColumn" "Identifier"
    #     And the "bucketColumn" "bucket_id"
    #     And the "columns" with...
    #         | param                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
    #         | [{  "path": "device.communicationModules[0].subscription.traffic.sentBytes._current.value",  "name": "Daily sent bytes",  "filter": "NO",  "sort": false,  "aggregationFunction": "SUM"},{  "path": "device.communicationModules[0].subscription.traffic.receivedBytes._current.value",  "name": "Daily received bytes",  "filter": "NO",  "aggregationFunction": "SUM",  "sort": false},{  "path": "device.communicationModules[0].subscription.presence.unifiedPresence._current.value",  "name": "Last presence",  "filter": "YES",  "sort": false,  "aggregationFunction": "LAST"},{  "path": "device.communicationModules[0].subscription.mobile.signalStrength._current.value",  "name": "Average Signal strength",  "filter": "YES",  "sort": false,  "aggregationFunction": "AVG"}] |
    #     And the "context" with...
    #         | param                                                                                                                                                                                                                                                                                                                                                                           |
    #         | [{  "path": "provision.device.identifier._current.value",  "name": "Prov identifier",  "filter": "YES",  "sort": true},{  "path": "device.model._current.value.manufacturer",  "name": "Manufacturer",  "filter": "ALWAYS",  "sort": false},{  "path": "device.communicationModules[0].subscriber.mobile.icc._current.value",  "name": "ICC",  "filter": "NO",  "sort": false}] |
    #     Then I create it
    #     And response code should be: 201
    #     Then I create it
    #     And response code should be: 400
    #     Then I delete it with location as a identifier
    #     And response code should be: 200

    # Scenario: Create timeseries with incomplete parameters
    #     And an ogapi "timeseries builder" util
    #     And I want to create a "timeseries"
    #     Then I create it
    #     And throws an error equal to "There are required parameters that have not been set. Missing parameters: [name,organization,timeBucket,columns,identifierColumn]"


    # Scenario: Deleting an organization
    #     Given an ogapi "organizations builder" util
    #     Then I want to delete an "organization"
    #     And the "name" "pipeline_organization"
    #     Then I delete it
    #     And response code should be: 200
