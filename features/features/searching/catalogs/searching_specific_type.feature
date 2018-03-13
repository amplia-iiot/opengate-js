# features/searching_specific_type.feature
@searching
@searching_specific_type
@catalogs
@ticket_search
@specificType
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

  Scenario: Execute searching with parameter entityType ASSET
    When I try to search with...
      | field       | content |
      | entity type | ASSET   |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
      """
      {"specificType":[{"entityType":"ASSET","id":"BOX"},{"entityType":"ASSET","id":"BUILDING"},{"entityType":"ASSET","id":"CONTROL_HOUSE"},{"entityType":"ASSET","id":"CRANE"},{"entityType":"ASSET","id":"FOUNTAIN"},{"entityType":"ASSET","id":"ENGINE"},{"entityType":"ASSET","id":"HOUSE"},{"entityType":"ASSET","id":"MACHINE"},{"entityType":"ASSET","id":"OTHER"},{"entityType":"ASSET","id":"PALLET"},{"entityType":"ASSET","id":"PIPELINE"},{"entityType":"ASSET","id":"SPOOL"},{"entityType":"ASSET","id":"TOWER"},{"entityType":"ASSET","id":"VEHICLE"},{"entityType":"ASSET","id":"WIRE"},{"entityType":"ASSET","id":"WORKER"}]}
      """

  Scenario: Execute searching with parameter entityType TICKET
    When I try to search with...
      | field       | content |
      | entity type | TICKET  |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
      """
      {"specificType":[{"entityType":"TICKET","id":"INSTALLATION"},{"entityType":"TICKET","id":"TEST"},{"entityType":"TICKET","id":"TECHNICAL_TASK"},{"entityType":"TICKET","id":"DESINSTALLATION"}]}
      """

  Scenario: Execute searching with parameters for COMMUNICATIONS_MODUEL and I2C
    When I try to search with...
      | field       | content               |
      | entity type | COMMUNICATIONS_MODULE |
      | id          | I2C                   |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
      """
      {"specificType":[{"entityType":"COMMUNICATIONS_MODULE","id":"I2C"}]}
      """

  Scenario: Execute searching with parameter id LOWPAN
    When I try to search with...
      | field | content |
      | id    | LOWPAN  |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
      """
      {"specificType":[{"entityType":"COMMUNICATIONS_MODULE","id":"LOWPAN"},{"entityType":"SUBSCRIBER","id":"LOWPAN"},{"entityType":"SUBSCRIPTION","id":"LOWPAN"}]}
      """

  Scenario: Execute searching with parameter id LOWPAN
    When I try to search with...
      | field | content    |
      | id    | NARROWBAND |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
      """
      {"specificType":[{"entityType":"COMMUNICATIONS_MODULE","id":"NARROWBAND"},{"entityType":"SUBSCRIBER","id":"NARROWBAND"},{"entityType":"SUBSCRIPTION","id":"NARROWBAND"}]}
      """

  Scenario: Execute searching with parameter id LOWPAN
    When I try to search with...
      | field | content |
      | id    | LTE_M   |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
      """
      {"specificType":[{"entityType":"COMMUNICATIONS_MODULE","id":"LTE_M"},{"entityType":"SUBSCRIBER","id":"LTE_M"},{"entityType":"SUBSCRIPTION","id":"LTE_M"}]}
      """