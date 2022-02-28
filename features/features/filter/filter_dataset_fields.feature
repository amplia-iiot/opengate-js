# features/filter_features/searching_filter_fields.feature

@filter_fields
@filtering
@urlParameters
Feature: Searching datasets fields
     As a user of JsApi
     I want to get the searching fields

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

     Scenario: Execute searching over assignable datasets
          And an ogapi "datasets builder" util
          And I want to create a "dataset"
          And the "organization" "dataset_organization"
          And the "name" "mockDataset"
          And the "description" "dataset description"
          And the "type" "HISTORY"
          And the "columns" with...
               | param                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
               | [{"path": "provision.device.identifier._current.value", "name": "Prov identifier",  "filter": "YES", "sort": true }, { "path": "device.model._current.value.manufacturer", "name": "Manufacturer", "filter": "ALWAYS", "sort": false }, { "path": "device.model._current.at",  "name": "Manufacturer Date", "filter": "YES", "sort": false }, { "path": "device.communicationModules[0].subscriber.mobile.icc._current.value", "name": "ICC", "filter": "NO", "sort": false }, { "path": "entity.location._current.value.position.coordinates[0]", "name": "Latitud", "filter": "NO", "sort": false }] |
          Then I create it
          And response code should be: 201

          And an ogapi "datasets search" util with "dataset_organization" and "from_location_previous_response"
          Given I want to search a "datasets"
          When I get filter fields...
               | field         | content |
               | findAllFields |         |
          Then response data should has elements
          When I get filter fields...
               | field      | content |
               | findFields |         |
          Then response data should has elements
          When I get filter fields...
               | field         | content         |
               | findFieldPath | Manufacturer |
          Then response data should has elements
          When I get filter fields...
               | field         | content         |
               | findFieldPath | ICC |
          Then response data should has elements
          When I get filter fields...
               | field         | content         |
               | findFieldPath | Latitud |
          Then response data should has elements


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


