# /features/searching/summary/summary_alarms.feature
@searching
@summary_alarms
@summary
Feature: I want to check if the alarms summary are working
  As a device of JsApi
  I want to get the diferents summary of the platform

  Background:
    Given an apikey user by "require-real-apikey"

  Scenario: I want to get the alarms of devices summary
    And an ogapi "alarms search" util
    And I want to search a "multiple entity" 
    And I want to search into "on devices" 
    When I build it with summary response
     And I execute it
    Then response code should be: 204 
    Then does not throws an error

  Scenario: I want to get the alarms of subcribers summary
    And an ogapi "alarms search" util
    And I want to search a "multiple entity" 
    And I want to search into "on subscribers" 
    When I build it with summary response
     And I execute it
    Then does not throws an error

  Scenario: I want to get the alarms of subcribers summary
    And an ogapi "alarms search" util
    And I want to search a "multiple entity" 
    And I want to search into "on subscriptions" 
    When I build it with summary response
     And I execute it
    Then does not throws an error

  Scenario: I want to get the alarms of communications Modules summary
    And an ogapi "alarms search" util
    And I want to search a "multiple entity" 
    And I want to search into "on communications Modules" 
    When I build it with summary response
     And I execute it
    Then does not throws an error


