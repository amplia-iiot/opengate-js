# /features/searching/summary/summary_executions.feature
@searching
@summary_executions
@summary
Feature: I want to check if the general summary are working
  As a device of JsApi
  I want to get the diferents summary of the platform

  Background:
    Given an apikey user by "require-real-apikey"

  Scenario: I want to get the executions of devices summary
    And an ogapi "executions search" util
    And I want to search a "multiple entity" 
    And I want to search into "on devices" 
    When I build it with summary response
     And I execute it
    Then response code should be: 200  
    Then does not throws an error

  Scenario: I want to get the executions of subcribers summary
    And an ogapi "executions search" util
    And I want to search a "multiple entity" 
    And I want to search into "on subscribers" 
    When I build it with summary response
     And I execute it
    Then does not throws an error

  Scenario: I want to get the executions of subcribers summary
    And an ogapi "executions search" util
    And I want to search a "multiple entity" 
    And I want to search into "on subscriptions" 
    When I build it with summary response
     And I execute it
    Then does not throws an error

  Scenario: I want to get the executions of communications Modules summary
    And an ogapi "executions search" util
    And I want to search a "multiple entity" 
    And I want to search into "on communications Modules" 
    When I build it with summary response
     And I execute it
    Then does not throws an error


