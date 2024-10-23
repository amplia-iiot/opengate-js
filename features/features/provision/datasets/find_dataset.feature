# features/find_user.feature
@finder
@datasets
@find_dataset

Feature: Find a dataset
    As a user of JsApi
    I want to find a dataset
    So I can check if a user exists and get their information

    Background:
        #Given an apikey user by "require-real-apikey"
        Given an email "YOUR_EMAIL" and password "YOUR_PASSWORD" the user logs in

    Scenario: Creating an organization to use in datasets tests
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "dataset_organization"
        And the "description" "dataset organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        Then I create it
        And response code should be: 201

    Scenario: Create a dataset that does not exist and read
        And an ogapi "datasets builder" util
        And I want to create a "dataset"
        And the "organization" "dataset_organization"
        And the "name" "mockDataset"
        And the "description" "dataset description"
        And the "identifierColumn" "Identifier"
        And the "columns" with...
            | param                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
            | [{"path": "provision.device.identifier._current.value", "name": "Prov identifier",  "filter": "YES", "sort": true }, { "path": "device.model._current.value.manufacturer", "name": "Manufacturer", "filter": "ALWAYS", "sort": false }, { "path": "device.model._current.at",  "name": "Manufacturer Date", "filter": "YES", "sort": false }, { "path": "device.communicationModules[0].subscriber.mobile.icc._current.value", "name": "ICC", "filter": "NO", "sort": false }] |
        Then I create it
        And response code should be: 201

        And an ogapi "dataset finder" util
        Given I want to read a "dataset"
        When I try to find by...
            | field          | content              |
            | organizationId | dataset_organization |
        Then response code should be: 200

        # And an ogapi "dataset finder" util
        # Given I want to read a "dataset"
        # When I try to find by...
        #     | field          | content                         |
        #     | organizationId | dataset_organization            |
        #     | datasetId      | from_location_previous_response |
        # Then response code should be: 200

        And an ogapi "dataset finder" util
        Given I want to read a "dataset"
        When I try to find by...
            | field          | content                         |
            | organization | dataset_organization          |
            | name    | mockDataset |
        Then response code should be: 200

        And an ogapi "datasets builder" util
        And I want to delete a "dataset"
        And the "organization" "dataset_organization"
        And I delete it with location as a identifier
        Then response code should be: 200

    Scenario: Deleting an organization
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "dataset_organization"
        Then I delete it
        And response code should be: 200
