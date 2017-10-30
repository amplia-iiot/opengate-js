# features/searching_hardwares.feature
@hardwares
@catalogs
@searching
@searching_hardwares
Feature: Searching hardwares in catalog
  As a user of JsApi
  I want to search into hardwares catalog
  So I can add filter, sorting, limit to search any hardware
  
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "hardwares search" util
    Given I want to search a "hardware" 

  Scenario: Execute searching
  	Given the start limit by "1" and size limit by "500"
    And I build it
  	And I execute it
  	Then response code should be: 200
@errors @bug @OGODM-3275
  Scenario: Execute searching with single hardware id filter that not exists
    When I try to search with... 
    | field        | content            |
    | hardware id  | OpenGateNotExists  |
    And I build it
    And I execute it
    Then response code should be: 204
@errors @bug @OGODM-3275
  Scenario: Execute searching with single hardware id filter that exists
    When I try to search with... 
    | field        | content            |
    | hardware id  | OpenGate           |
    And I build it
    And I execute it
    Then response code should be: 200

  Scenario: Execute searching with single model name filter that exists
    When I try to search with... 
    | field       | content            |
    | model name  | OpenGate |
    And I build it
    And I execute it
    Then response code should be: 200

  Scenario: Execute searching with single manufacturer name filter that exists
    When I try to search with... 
    | field              | content            |
    | manufacturer name  | OpenGate |
    And I build it
    And I execute it
    Then response code should be: 200
@errors @bug @OGODM-3275
  Scenario: Execute searching with multiple filters that exists
    When I try to search with... 
    | field              | content            |
    | hardware id        | OpenGate           |
    | model name         | OpenGate           |
    | manufacturer name  | OpenGate           |
    And I build it
    And I execute it
    Then response code should be: 200