# features/searching_subscribers.feature
@searching
@searching_subscribers
@urlParameters
@disableOrder
Feature: Searching subscribers
  As a user of JsApi
  I want to search into subscribers collection
  So I can add filter, sorting, limit to search any subscriber

  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "subscribers search" util

  Scenario: Execute searching with a timeout less than expected
    And the timeout by 10
    When I build it
    And I execute it
    Then response code should be: 408

  Scenario: Execute searching with a invalid start limit
    And the start limit by "null" and size limit by "5"
    When I build it
    And I execute it
    #Then response code should be: 204
    Then does not throws an error

  Scenario: Execute searching with a flattened response
    When I build it with flattened response
    And I execute it
    #Then response code should be: 204
    Then does not throws an error

  Scenario: Execute searching with a flattened response and disable order response
    When I build it with flattened and disable order response
    And I execute it
    #Then response code should be: 204
    Then does not throws an error

