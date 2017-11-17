# features/searching_select_fields.feature
@select-fields
@searching_select-fields
@searching
@catalogs
Feature: Searching for all select fields
  As a user of JsApi
  I want to search for all select fields
  So I can add filter with all select fields to search any entity

  Scenario: Execute all select fields on devices searching
  Given an apikey user by "require-real-apikey"
    And an ogapi "devices search" util
    And I want to search a "entity" 
   When I try to search with all allow select fields
   When I build it
    And I execute it
   Then response code should be: 204

   Scenario: Execute all select fields on devices searching with utils
  Given an apikey user by "require-real-apikey"
    And an ogapi "devices search" util
    And I want to search a "entity" 
   When I try to search with all allow select fields with utils
   When I build it
    And I execute it
   Then response code should be: 204
