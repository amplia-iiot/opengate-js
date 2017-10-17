# features/searching_administrative_state.feature
@administrative_state
@catalogs
@searching
Feature: Searching administrative state in catalog
  As a user of JsApi
  I want to search into administrative state catalog
  So I can add filter, sorting, limit to search
  
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "administrative state search" util
    Given I want to search a "administrative state" 

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
{"administrativeState":[{"id":"REQUESTED","description":"Entity requested to the supplier","entityType":"ASSET"},{"id":"READY","description":"Entity ready for installation","entityType":"ASSET"},{"id":"REPAIR","description":"Entity under repair","entityType":"ASSET"},{"id":"TESTING","description":"Entity in tests","entityType":"ASSET"},{"id":"ACTIVE","description":"Field deployed entity","entityType":"ASSET"},{"id":"SUSPENDED","description":"Suspended its operation","entityType":"ASSET"},{"id":"DELETED","description":"Entity removed from available stock","entityType":"ASSET"},{"id":"RETIRED","description":"Field entity withdrawal","entityType":"ASSET"},{"id":"BANNED","description":"Entity banned, It means that received information of this entity is not going to be collected","entityType":"ASSET"}]}
    """

    Scenario: Execute searching with parameters 
    When I try to search with... 
    | field   | content            |
    | entity type  | ASSET |
    | id  | SUSPENDED |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"administrativeState":[{"id":"SUSPENDED","description":"Suspended its operation","entityType":"ASSET"}]}
    """

  Scenario: Execute searching with parameter id
    When I try to search with... 
    | field   | content            |
    | id  | REVOKED |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"administrativeState":[{"id":"REVOKED","description":"REVOKED","entityType":"CERTIFICATE"}]}
    """