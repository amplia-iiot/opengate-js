# features/searching/bulk/searching_bulks.feature
@searching
@searching_bulks
@bulk
@provision_processors
@wip
Feature: Searching bulks with provision processors
  As a user of JsApi
  I want to search into bulks collection execute with provision processors
  So I can add limit to search any user

  Background:
    Given an apikey user by "13e50ed7-1756-4fe3-8b00-f3cd4fad8ac2"
    
    Scenario: Creating an organization to use in create device
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "bulk_processors_searching"
    And the "description" "bulk processors searching"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1
    Then I delete it
    Then I create it
    And response code should be: 201

  #TODO Scenario: I want to create a provision processor
  #TODO Scenario: I want to execute a bulk processor

  Scenario: Execute searching with a timeout less than expected
    Given an ogapi "bulks processros search" util
    And the timeout by 10
     When I build it
    And I execute it
   Then response code should be: 408
  
  Scenario: Execute searching with a invalid start limit
    Given an ogapi "bulks processros search" util
    And the start limit by "null" and size limit by "5"
   When I build it
    And I execute it
    Then does not throws an error

Scenario: Execute searching
  Given an ogapi "bulks processros search" util
    And I build it
    And I execute it
    Then does not throws an error
   
Scenario: Deleting an organization
    Given an ogapi "organizations builder" util
    Then I want to delete an "organization"
    And the "name" "bulk_processors_searching"
    Then I delete it
    And response code should be: 200