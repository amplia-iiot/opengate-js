# features/searching/datasets/searching_datasets_catalog.feature
@searching
@searching_datasets_data
@datasets
Feature: Searching datasets data
  As a user of JsApi
  I want to search into datasets data collection
  So I can add filter, sorting, limit to search any dataset
  
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "datasets search" util with "require-real-organization" and "require-real-dataset"
    
  Scenario: Execute searching with a invalid start limit
    
    And the start limit by "null" and size limit by "5"
    When I build it
    And I execute it
    Then response code should be: 200
    Then does not throws an error

  Scenario: Execute searching
    And I build it
    And I execute it
   Then response code should be: 200
    Then does not throws an error
