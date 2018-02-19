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
  And the path "$..clock"
  When I build it
  And I execute it
  Then response code should be: 200   
  And the result contains:
  """
  {"type":"object","title":"Software","description":"","properties":{"datetime":{"type":"string","format":"date-time","title":"timestamp","description":"date & time in ISO 8601","pattern":"^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])[Z]?$"},"timezone":{"type":"number"},"dst":{"type":"object","properties":{"enabled":{"type":"boolean"},"deviation":{"type":"number"},"begin":{"type":"string","format":"date-time","title":"timestamp","description":"date & time in ISO 8601","pattern":"^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])[Z]?$"},"end":{"type":"string","format":"date-time","title":"timestamp","description":"date & time in ISO 8601","pattern":"^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])[Z]?$"}}}}}
  """


Scenario: Execute searching with path
  Given an ogapi "basicTypes search" util
  And the path "stepNoResponseData"
  When I build it
  And I execute it
  Then response code should be: 200   
  And the result contains:
  """
{"type":"object","properties":{"result":{"type":"string","title":"Step Name","description":"","enum":["ERROR","SUCCESSFUL","SKIPPED","NOT_EXECUTED"],"javaEnumNames":["ERROR","SUCCESSFUL","SKIPPED","NOT_EXECUTED"]},"timestamp":{"type":"string","format":"date-time","title":"timestamp","description":"date & time in ISO 8601","pattern":"^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])[Z]?$"}},"required":["name","result","timestamp"]}
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
