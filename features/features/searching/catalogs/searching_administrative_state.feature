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


  Scenario: Execute searching with parameter entityType ASSET
    When I try to search with... 
      | field       | content |
      | entity type | ASSET   |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
      """
      {"administrativeState":[{"id":"BANNED","description":"Asset banned, It means that received information of this asset is not going to be collected","entityType":"ASSET"},{"id":"DELETED","description":"Asset removed from available stock","entityType":"ASSET"},{"id":"IN_MAINTENANCE","description":"Asset in maintenance","entityType":"ASSET"},{"id":"IN_STOCK","description":"Asset in stock","entityType":"ASSET"},{"id":"IN_TRANSIT","description":"Asset in transit","entityType":"ASSET"},{"id":"IN_USE","description":"Asset in use","entityType":"ASSET"},{"id":"MISSING","description":"Asset missing","entityType":"ASSET"},{"id":"ORDERED","description":"Asset ordered","entityType":"ASSET"},{"id":"READY","description":"Asset ready for installation","entityType":"ASSET"},{"id":"RETIRED","description":"Field entity withdrawal","entityType":"ASSET"}]}
      """

  Scenario: Execute searching with parameter entityType GATEWAY
    When I try to search with... 
      | field       | content |
      | entity type | GATEWAY |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
      """
      {"administrativeState":[{"id":"REQUESTED","description":"Entity requested to the supplier","entityType":"GATEWAY"},{"id":"READY","description":"Entity ready for installation","entityType":"GATEWAY"},{"id":"REPAIR","description":"Entity under repair","entityType":"GATEWAY"},{"id":"TESTING","description":"Entity in tests","entityType":"GATEWAY"},{"id":"ACTIVE","description":"Field deployed entity","entityType":"GATEWAY"},{"id":"SUSPENDED","description":"Suspended its operation","entityType":"GATEWAY"},{"id":"DELETED","description":"Entity removed from available stock","entityType":"GATEWAY"},{"id":"RETIRED","description":"Field entity withdrawal","entityType":"GATEWAY"},{"id":"BANNED","description":"Entity banned, It means that received information of this entity is not going to be collected","entityType":"GATEWAY"}]}
      """

  Scenario: Execute searching with parameter entityType COMMUNICATIONS_MODULE
    When I try to search with... 
      | field       | content               |
      | entity type | COMMUNICATIONS_MODULE |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
      """
      {"administrativeState":[{"id":"REQUESTED","description":"Entity requested to the supplier","entityType":"COMMUNICATIONS_MODULE"},{"id":"READY","description":"Entity ready for installation","entityType":"COMMUNICATIONS_MODULE"},{"id":"REPAIR","description":"Entity under repair","entityType":"COMMUNICATIONS_MODULE"},{"id":"TESTING","description":"Entity in tests","entityType":"COMMUNICATIONS_MODULE"},{"id":"ACTIVE","description":"Field deployed entity","entityType":"COMMUNICATIONS_MODULE"},{"id":"SUSPENDED","description":"Suspended its operation","entityType":"COMMUNICATIONS_MODULE"},{"id":"DELETED","description":"Entity removed from available stock","entityType":"COMMUNICATIONS_MODULE"},{"id":"RETIRED","description":"Field entity withdrawal","entityType":"COMMUNICATIONS_MODULE"},{"id":"BANNED","description":"Entity banned, It means that received information of this entity is not going to be collected","entityType":"COMMUNICATIONS_MODULE"}]}
      """

  Scenario: Execute searching with parameter entityType SUBSCRIBER
    When I try to search with... 
      | field       | content    |
      | entity type | SUBSCRIBER |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
      """
      {"administrativeState":[{"id":"REQUESTED","description":"Entity requested to the supplier","entityType":"SUBSCRIBER"},{"id":"READY","description":"Entity ready for installation","entityType":"SUBSCRIBER"},{"id":"REPAIR","description":"Entity under repair","entityType":"SUBSCRIBER"},{"id":"TESTING","description":"Entity in tests","entityType":"SUBSCRIBER"},{"id":"ACTIVE","description":"Field deployed entity","entityType":"SUBSCRIBER"},{"id":"SUSPENDED","description":"Suspended its operation","entityType":"SUBSCRIBER"},{"id":"DELETED","description":"Entity removed from available stock","entityType":"SUBSCRIBER"},{"id":"RETIRED","description":"Field entity withdrawal","entityType":"SUBSCRIBER"},{"id":"BANNED","description":"Entity banned, It means that received information of this entity is not going to be collected","entityType":"SUBSCRIBER"}]}
      """

  Scenario: Execute searching with parameter entityType SUBSCRIPTION
    When I try to search with... 
      | field       | content      |
      | entity type | SUBSCRIPTION |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
      """
      {"administrativeState":[{"id":"REQUESTED","description":"Entity requested to the supplier","entityType":"SUBSCRIPTION"},{"id":"READY","description":"Entity ready for installation","entityType":"SUBSCRIPTION"},{"id":"REPAIR","description":"Entity under repair","entityType":"SUBSCRIPTION"},{"id":"TESTING","description":"Entity in tests","entityType":"SUBSCRIPTION"},{"id":"ACTIVE","description":"Field deployed entity","entityType":"SUBSCRIPTION"},{"id":"SUSPENDED","description":"Suspended its operation","entityType":"SUBSCRIPTION"},{"id":"DELETED","description":"Entity removed from available stock","entityType":"SUBSCRIPTION"},{"id":"RETIRED","description":"Field entity withdrawal","entityType":"SUBSCRIPTION"},{"id":"BANNED","description":"Entity banned, It means that received information of this entity is not going to be collected","entityType":"SUBSCRIPTION"}]}
      """

  Scenario: Execute searching with parameter entityType CERTIFICATE
    When I try to search with... 
      | field       | content     |
      | entity type | CERTIFICATE |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
      """
      {"administrativeState":[{"id":"NOT_ACTIVE","description":"NOT_ACTIVE","entityType":"CERTIFICATE"},{"id":"ACTIVE","description":"ACTIVE","entityType":"CERTIFICATE"},{"id":"REVOKED","description":"REVOKED","entityType":"CERTIFICATE"},{"id":"EXPIRED","description":"EXPIRED","entityType":"CERTIFICATE"}]}
      """

  Scenario: Execute searching with parameters 
    When I try to search with... 
      | field       | content  |
      | entity type | ASSET    |
      | id          | IN_STOCK |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
      """
      {"administrativeState":[{"id":"IN_STOCK","description":"Asset in stock","entityType":"ASSET"}]}
      """

  Scenario: Execute searching with parameter id
    When I try to search with... 
      | field | content |
      | id    | REVOKED |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
      """
      {"administrativeState":[{"id":"REVOKED","description":"REVOKED","entityType":"CERTIFICATE"}]}
      """