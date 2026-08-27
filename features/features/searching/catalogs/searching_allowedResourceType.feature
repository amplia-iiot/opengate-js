# features/searching/catalogs/searching_allowedResourceType.feature

@catalogs
@searching
@searching_allowedResourceType
@allowedResourceType
Feature: Searching Allowed Resource Type provider in catalog
  As a user of JsApi
  I want to search into Allowed Resource Type provider catalog
  
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "Allowed Resource Type search" util
    Given I want to search a "Allowed Resource Type"

  Scenario: Execute searching
    When I build it
  	And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"allowedResourceType":["entity.asset","entity.device","entity.subscriber","entity.subscription","ticket","organization","channel"]}
    """

  Scenario: Execute searching with type ticket
     When I try to search with... 
    | field   | content            |
    | type  | ticket |
    When I build it
  	And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"allowedResourceType":["ticket"]}
    """

Scenario: Execute searching with type entity
     When I try to search with... 
    | field   | content            |
    | type  | entity |
    When I build it
  	And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"allowedResourceType":["entity.asset","entity.device","entity.subscriber","entity.subscription"]}
    """
