# features/searching_channels.feature
@searching
@searching_channels
Feature: Searching channels 
  As a user of JsApi
  I want to search into channels collection
  So I can add filter, sorting, limit to search any user
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "channels search" util
    
  Scenario: Execute searching with a timeout less than expected
    And the timeout by 10
    When I build it
    And I execute it
    Then response code should be: 408
  
  Scenario: Execute searching with a invalid start limit
    And the start limit by "null" and size limit by "5"
    When I build it

    And I execute it
    Then response code should be: 200  	

Scenario: Execute searching
    And I build it
    And I execute it
    Then response code should be: 200
   
