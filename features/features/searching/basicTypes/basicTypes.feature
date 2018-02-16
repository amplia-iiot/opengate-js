# features/searching/basicTypes/basicTypes.feature
@searching
@searching_basicTypes
@basicTypes
Feature: Searching basicTypes 
  As a user of JsApi
  I want to search into basicTypes collection
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "basicTypes search" util
  
Scenario: Execute searching
    When I build it
    And I execute it
  	Then response code should be: 200   

Scenario: Execute searching with path
  Given an ogapi "basicTypes search" util
  And the path "stepNoResponseData"
  When I build it
  And I execute it
  Then response code should be: 200   
  And the result contains:
  """
  {"type":"object","properties":{"result":{"$ref":"#/definitions/stepsResult"},"timestamp":{"$ref":"#/definitions/timestamp"}},"required":["name","result","timestamp"]}
  """

Scenario: Execute searching with path
  Given an ogapi "basicTypes search" util
  And the path "notFound"
  When I build it
  And I execute it
  Then response code should be: 200   
  And the result contains:
  """
  {"msg":"not Found"}
  """
