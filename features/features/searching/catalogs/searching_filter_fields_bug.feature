# features/searching_filter_fields.feature
@searching_filter_fields
@searching
@catalogs
Feature: Searching for all filter fields
As a user of JsApi
I want to search for all filter fields
So I can add filter with all filter fields to search any entity

  Scenario: Execute all fields on devices searching
    Given an apikey user by "require-real-apikey"
    And an ogapi "devices search" util
    And I want to search a "entity"
    When I try to search with all allow fields
    When I build it
    And I execute it
    Then response code should be: 204

  Scenario: Execute all fields on certificates searching
    Given an apikey user by "require-real-apikey"
    And an ogapi "certificates search" util
    When I try to search with all allow fields
    When I build it
    And I execute it
    Then throws an error equal to "There is a parameter with incorrect value in the filter"
    And response code should be: 400

  @bug @ODMQA-1155
  Scenario: Execute all fields on alarms searching
    Given an apikey user by "require-real-apikey"
    And an ogapi "alarms search" util
    And I want to search a "multiple entity"
    And I want to search into "on devices"
    #When I try to search with all allow fields
    When I build it
    And I execute it
    Then does not throws an error
   # Then response code should be: 204

  @bug @ODMQA-1151 @execution_search
  Scenario: Execute all fields on executions searching
    Given an apikey user by "require-real-apikey"
    And an ogapi "executions search" util
    And I want to search a "multiple entity"
    And I want to search into "on devices"
    #When I try to search with all allow fields
    When I build it
    And I execute it
    #Then response code should be: 204
    Then does not throws an error

  @bug @ODMQA-1150
 Scenario: Execute all fields on operations searching
   Given an apikey user by "require-real-apikey"
   And an ogapi "operations search" util
   When I try to search with all allow fields
   When I build it
   And I execute it
   Then throws an error equal to "There is a parameter with incorrect value in the filter"
   And response code should be: 400

  Scenario: Execute all fields on bundles searching
    Given an apikey user by "require-real-apikey"
    And an ogapi "bundles search" util
    When I try to search with all allow fields
    When I build it
    And I execute it
    Then throws an error equal to "There is a parameter with incorrect value in the filter"
    And response code should be: 400

  Scenario: Execute all fields on datapoints searching
    Given an apikey user by "require-real-apikey"
    And an ogapi "datapoints search" util
    When I try to search with all allow fields
    When I build it
    And I execute it
    Then response code should be: 204

  Scenario: Execute all fields on datastreams searching
    Given an apikey user by "require-real-apikey"
    And an ogapi "datastreams search" util
    When I try to search with all allow fields
    When I build it
    And I execute it
    Then response code should be: 204

  @datamodel
  Scenario: Execute all fields on datamodels searching
    Given an apikey user by "require-real-apikey"
    And an ogapi "datamodels search" util
    When I try to search with all allow fields
    When I build it
    And I execute it
    Then response code should be: 204

  Scenario: Execute all fields on softwares searching
    Given an apikey user by "require-real-apikey"
    And an ogapi "softwares search" util
    When I try to search with all allow fields
    When I build it
    And I execute it
    Then response code should be: 204

  @bug @ODMQA-1146
  Scenario: Execute all fields on hardwares searching
    Given an apikey user by "require-real-apikey"
    And an ogapi "hardwares search" util
    When I try to search with all allow fields
    When I build it
    And I execute it
    Then response code should be: 204

  @searching_users
  Scenario: Execute all fields on users searching
    Given an apikey user by "require-real-apikey"
    And an ogapi "users search" util
    When I try to search with all allow fields
    When I build it
    And I execute it
    Then response code should be: 204



  @searching_domains
  Scenario: Execute all fields on domains searching
    Given an apikey user by "require-real-apikey"
    And an ogapi "domains search" util
    When I try to search with all allow fields
    When I build it
    And I execute it
    Then response code should be: 204
