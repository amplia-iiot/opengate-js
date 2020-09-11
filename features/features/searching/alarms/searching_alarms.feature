# features/searching/entities/searching_devices.feature
@searching
@searching_alarms
Feature: Searching devices
  As a user of JsApi
  I want to search into alarms collection

  Background:
    Given an apikey user by "require-real-apikey"

 Scenario: I want to get the alarms of devices summary
    And an ogapi "alarms search" util
    And I want to search a "multiple entity" 
    And I want to search into "on devices" 
    When I build it
     And I execute it
    Then does not throws an error

  Scenario: I want to get the alarms of subcribers summary
    And an ogapi "alarms search" util
    And I want to search a "multiple entity" 
    And I want to search into "on subscribers" and throw error 'is not a function'
    
  Scenario: I want to get the alarms of subcribers summary
    And an ogapi "alarms search" util
    And I want to search a "multiple entity" 
    And I want to search into "on subscriptions" 
    When I build it
    And I execute it
    Then does not throws an error

  Scenario: I want to get the alarms summary
    And an ogapi "alarms search" util  
    When I build it
     And I execute it
    Then does not throws an error  

  Scenario: I want to get the alarms of communications Modules summary
    And an ogapi "alarms search" util
    And I want to search a "multiple entity" 
    And I want to search into "on communications Modules" and throw error 'is not a function'