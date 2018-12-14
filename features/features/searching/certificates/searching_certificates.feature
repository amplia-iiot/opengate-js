# features/searching_certificates.feature
@searching_certificates
@searching
@fail
@urlParameters

Feature: Searching certificates
  As a user of JsApi
  I want to search into certificates collection
  So I can add filter, sorting, limit to search any datapoint

  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "certificates search" util
    Given I want to search a "certificates"

  Scenario: Execute searching with a timeout less than expected
    When I build it
    And I execute it
    Then response code should be: 200

  Scenario: Execute searching over assignable certificates
    When I try to search with...
      | field      | content |
      | assignable |         |
    And I build it
    And I execute it
    Then response code should be: 200

  Scenario: Execute searching over administrable certificates
    When I try to search with...
      | field         | content |
      | assignable    |         |
      | administrable |         |
    And I build it
    And I execute it
    Then response code should be: 200