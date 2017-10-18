# features/searching_specific_type.feature

@specific_type
@catalogs
Feature: Searching specific type in catalog
  As a user of JsApi
  I want to search into specific type catalog
  So I can add filter, sorting, limit to search any software
  
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "specific type search" util
    Given I want to search a "specific type" 

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
{"specificType":[{"entityType":"ASSET","id":"BLOODPRESSURE_SENSOR"},{"entityType":"ASSET","id":"COMHUB"},{"entityType":"ASSET","id":"CONCENTRATOR"},{"entityType":"ASSET","id":"CONTAINER"},{"entityType":"ASSET","id":"COORDINATOR"},{"entityType":"ASSET","id":"GENERIC"},{"entityType":"ASSET","id":"GLUCOMETER_SENSOR"},{"entityType":"ASSET","id":"METER"},{"entityType":"ASSET","id":"MODEM"},{"entityType":"ASSET","id":"ROUTER"},{"entityType":"ASSET","id":"SENSOR"},{"entityType":"ASSET","id":"TPV"},{"entityType":"ASSET","id":"VEHICLE"},{"entityType":"ASSET","id":"VENDING"},{"entityType":"ASSET","id":"WEIGHT_SENSOR"}]}
    """

  Scenario: Execute searching with parameters 
    When I try to search with... 
    | field   | content            |
    | entity type  | COMMUNICATIONS_MODULE |
    | id  | I2C |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"specificType":[{"entityType":"COMMUNICATIONS_MODULE","id":"I2C"}]}
    """

  Scenario: Execute searching with parameter id
    When I try to search with... 
    | field   | content            |
    | id  | LOWPAN |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"specificType":[{"entityType":"COMMUNICATIONS_MODULE","id":"LOWPAN"},{"entityType":"SUBSCRIBER","id":"LOWPAN"},{"entityType":"SUBSCRIPTION","id":"LOWPAN"}]}
    """