# features/features/searching/timeseries/searching_timeseries.feature
@searching
@searching_timeseries_data
@timeseries
Feature: Searching timeseriess data
  As a user of JsApi
  I want to search into timeseriess data collection
  So I can add filter, sorting, limit to search any timeseries, and delete it
  
  Background:
    Given an apikey user by "require-real-apikey"
    #TESTS WITH MOCK, ONLY TIMESERIES URIS: Given with mock "timeseries" for "searching"
    And an ogapi "timeseries search" util with "require-real-organization" and "require-real-dataset"
    
  Scenario: Execute searching with a valid start limit
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

Scenario: Execute delete data
    And I build it
    And I delete data
   Then response code should be: 200
    Then does not throws an error
