# /features/searching/summary/summary_catalog.feature
@searching
@summary_catalog
@summary
Feature: I want to check if the general summary are working
  As a device of JsApi
  I want to get the diferents summary of the platform

  Background:
    Given an apikey user by "require-real-apikey"

  Scenario: I want to get the softwares summary
    And an ogapi "softwares search" util
  	When I build it with summary response
  	And I execute it
  	Then response code should be: 200
    Then does not throws an error