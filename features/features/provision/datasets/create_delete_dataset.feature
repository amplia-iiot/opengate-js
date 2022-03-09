# features/provision/datasets/create_delete_dataset.feature
@create_provision
@provision
@datasets
@create_daataset
@wip
Feature: Delete and Create a dataset
    As a user of JsApi
    I want to create a dataset
    So, I can create a new dataset with the parametres that I have been defined

    Background:
        Given an apikey user by "require-real-apikey"

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

    Scenario: Create and delete a dataset that does not exist
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
        And I delete it with location as a identifier
        Then response code should be: 200

    Scenario: Create a dataset that already exists
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
        Then I create it
        And response code should be: 400
        Then I delete it with location as a identifier
        And response code should be: 200

    Scenario: Create dataset with incomplete parameters
        And an ogapi "datasets builder" util
        And I want to create a "datasets"
        Then I create it
        And throws an error equal to "There are required parameters that have not been set. Missing parameters: [name,organization,columns,identifierColumn]"

    Scenario: Deleting an organization
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "dataset_organization"
        Then I delete it
        And response code should be: 200
