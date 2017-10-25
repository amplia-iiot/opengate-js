# /features/searching/summary/summary.feature
@searching
@summary_general
@summary
Feature: I want to check if the general summary are working
  As a device of JsApi
  I want to get the diferent summary of the platform

  Background:
    Given an apikey user by "require-real-apikey"

  Scenario: I want to get the device summary
    And an ogapi "devices search" util
  	When I build it with summary response
  	And I execute it
    	Then response code should be: 200
    Then does not throws an error

  Scenario: I want to get the workgroups summary
    And an ogapi "workgroups search" util
  	When I build it with summary response
  	And I execute it
    Then does not throws an error
  

  Scenario: I want to get the operation summary
    And an ogapi "operations search" util
  	When I build it with summary response
  	And I execute it
  	Then response code should be: 200
    Then does not throws an error
  
  Scenario: I want to get the domains summary
    And an ogapi "domains search" util
  	When I build it with summary response
  	And I execute it
  	Then response code should be: 200
    Then does not throws an error

  Scenario: I want to get the users summary
    And an ogapi "users search" util
  	When I build it with summary response
  	And I execute it
  	Then response code should be: 200
    Then does not throws an error

  Scenario: I want to get the channels summary
    And an ogapi "channels search" util
  	When I build it with summary response
  	And I execute it
  	Then response code should be: 200
    Then does not throws an error

  Scenario: I want to get the device summary with group by
    And an ogapi "devices search" util
    When I add group by "{'parameters': [{'name': 'provision.device.identifier'}]}"
  	When I build it with summary response
  	And I execute it
    	Then response code should be: 200
    Then does not throws an error