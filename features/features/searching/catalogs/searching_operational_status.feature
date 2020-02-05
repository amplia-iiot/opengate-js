# features/searching_operational_status.feature
@searching
@operational_status
@catalogs
Feature: Searching operational status in catalog
  As a user of JsApi
  I want to search into operational status catalog
  So I can add filter, sorting, limit to search any software
  
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "operational status search" util
    Given I want to search a "operational status" 

  Scenario: Execute searching
    When I build it
  	And I execute it
  	Then response code should be: 200

  Scenario: Execute searching with parameter entityType
    When I try to search with... 
    | field   | content            |
    | entity type  | ASSET |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"operationalStatus":[{"entityType":"ASSET","id":"UNKNOWN"},{"entityType":"ASSET","id":"NORMAL"},{"entityType":"ASSET","id":"ALARM"},{"entityType":"ASSET","id":"DOWN"},{"entityType":"ASSET","id":"SAFE_MODE"},{"entityType":"ASSET","id":"TAMPER"},{"entityType":"ASSET","id":"TEST"}]}
    """

  Scenario: Execute searching with parameters 
    When I try to search with... 
    | field   | content            |
    | entity type  | COMMUNICATIONS_MODULE |
    | id  | STOPPED |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"operationalStatus":[{"entityType":"COMMUNICATIONS_MODULE","id":"STOPPED"}]}
    """

  Scenario: Execute searching with parameter id
    When I try to search with... 
    | field   | content            |
    | id  | ALARM |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"operationalStatus":[{"entityType":"ASSET","id":"ALARM"},{"entityType":"GATEWAY","id":"ALARM"}]}
    """

  Scenario: Execute searching a non existing parameter id
    When I try to search with... 
    | field   | content            |
    | id  | PARAMETER NOT EXISTS |
    And I build it
    And I execute it
    Then response code should be: 204
