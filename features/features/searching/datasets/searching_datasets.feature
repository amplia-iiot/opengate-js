# features/searching/datasets/searching_datasets_catalog.feature
@searching
@searching_datasets_data
@datasets

Feature: Searching datasets data
  As a user of JsApi
  I want to search into datasets data collection
  So I can add filter, sorting, limit to search any dataset

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

  Scenario: Execute searching with a valid start limit
    And an ogapi "datasets builder" util
    And I want to create a "dataset"
    And the "organization" "dataset_organization"
    And the "name" "mockDataset1"
    And the "description" "dataset description"
    And the "identifierColumn" "Identifier"
    And the "columns" with...
      | param                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
      | [{"path": "provision.device.identifier._current.value", "name": "Prov identifier",  "filter": "YES", "sort": true }, { "path": "device.model._current.value.manufacturer", "name": "Manufacturer", "filter": "YES", "sort": false }, { "path": "device.model._current.at",  "name": "Manufacturer Date", "filter": "YES", "sort": false }, { "path": "device.communicationModules[0].subscriber.mobile.icc._current.value", "name": "ICC", "filter": "NO", "sort": false }] |
    Then I create it
    And response code should be: 201

    And an ogapi "datasets search" util with "dataset_organization" and "from_location_previous_response"

    And the start limit by "null" and size limit by "5"
    When I build it
    And I execute it
    Then response code should be: 200
    Then does not throws an error

  Scenario: Execute searching
    And an ogapi "datasets builder" util
    And I want to create a "dataset"
    And the "organization" "dataset_organization"
    And the "name" "mockDataset2"
    And the "description" "dataset description"
    And the "identifierColumn" "Identifier"
    And the "columns" with...
      | param                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
      | [{"path": "provision.device.identifier._current.value", "name": "Prov identifier",  "filter": "YES", "sort": true }, { "path": "device.model._current.value.manufacturer", "name": "Manufacturer", "filter": "ALWAYS", "sort": false }, { "path": "device.model._current.at",  "name": "Manufacturer Date", "filter": "YES", "sort": false }, { "path": "device.communicationModules[0].subscriber.mobile.icc._current.value", "name": "ICC", "filter": "NO", "sort": false }] |
    Then I create it
    And response code should be: 201

    And an ogapi "datasets search" util with "dataset_organization" and "from_location_previous_response"
    When I add a filter and with
      | operator | key          | value |
      | eq       | Manufacturer | empty |
    And I build it
    And I execute it
    Then response code should be: 200
    Then does not throws an error

  Scenario: Deleting an organization
    Given an ogapi "organizations builder" util
    Then I want to delete an "organization"
    And the "name" "dataset_organization"
    Then I delete it
    And response code should be: 200
