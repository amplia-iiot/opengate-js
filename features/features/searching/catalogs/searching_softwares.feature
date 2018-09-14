# features/searching_softwares.feature
@searching
@softwares
@catalogs
Feature: Searching softwares in catalog
  As a user of JsApi
  I want to search into softwares catalog
  So I can add filter, sorting, limit to search any software

  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "softwares search" util
    Given I want to search a "software"

  Scenario: Execute searching
    Given the start limit by "1" and size limit by "500"
    And I build it
    And I execute it
    Then response code should be: 200

  @OGODM-3274
  Scenario: Execute searching with single software id filter that not exists
    When I try to search with...
      | field       | content           |
      | software id | OpenGateNotExists |
    And I build it
    And I execute it
    Then response code should be: 204