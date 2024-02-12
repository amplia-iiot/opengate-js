# features/provision/connectorFunctions
@provision
@finder
@connectorFunctions
@find_connectorFunctions


Feature: Find an connector functions in catalog
  As a user of JsApi
  I want to create an user
  So, I can find connector funcions in catalog

  Background:
    Given an apikey user by "ROOT_API_KEY"

  Scenario: Find an connector function in catalog that does not exist
    And an ogapi "connector functions catalog builder" util
    And I want to create a "connector function catalog"
    And the "name" "test_ogapi"
    And the "description" "fortests"
    And the "operationalStatus" "DISABLED"
    And the "operationName" "REFRESH_INFO"
    And the "type" "REQUEST"
    And the "cloneable" with true value
    And the "northCriterias"
    | { "path": "provision.device.model._current.value.manufacturer", "value": "Some manufacturer" } |      
    And the "javascript" "//console.log('adios')"
    And the "payloadType" "JSON"
    And I create it
    Then response code should be: 201
    Given an ogapi "connector functions catalog finder" util
    And I want to read a "connectorFunctionsCalaog"
    When I try to find by...
      | field        | content                         |
      | connectorFunctionsId | from_location_previous_response |
    And response code should be: 200
    And an ogapi "connector functions catalog builder" util
    And I delete it with location as a identifier
    Then response code should be: 200


Scenario: Find an catalog connector functions
    And an ogapi "connector functions catalog" util
    And I want to read a "connectorFunctionsCalaog"
    When I try to find by...
    | field | content                |
			| catalog ||
		Then response code should be: 200
