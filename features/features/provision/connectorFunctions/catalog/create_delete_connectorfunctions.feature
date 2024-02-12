# features/provision/connectorFunctions
@provision
@create_provision
@connectorFunctions
@create_delete_update_connectorFunctions


Feature: Delete, Update and Create an connector functions in catalog
  As a user of JsApi
  I want to create, update and delete an connector function in catalog
  So, I can create, update and delete a connector function with the parametres that I have been defined

  Background:
    Given an apikey user by "ROOT_API_KEY"

  Scenario: Create, update and delete an connector function in catalog
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
    And the "name" "test_ogapi1"
    And the "description" "fortests"
    And the "operationalStatus" "DISABLED"
    And the "operationName" "REFRESH_INFO"
    And the "type" "REQUEST"
    And the "cloneable" with true value
    And the "northCriterias"
    | { "path": "provision.device.model._current.value.manufacturer", "value": "Some manufacturer1" } |      
    And the "javascript" "//console.log('adios')"
    And the "payloadType" "JSON"
    And I update it with identfier from location
    Then response code should be: 200
    And I delete it with location as a identifier
    Then response code should be: 200
