# features/searching_datapoints.feature

@searching_datapoints
Feature: Execute ADMINISTRATIVE_STATUS_CHANGE operation
  As a user of JsApi
  I want to search into datapoints collection
  So I can add filter, sorting, limit to search any datapoint
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "datapoints search" util

  Scenario: Execute searching with a timeout less than expected
  	And the timeout by 10
  	When I build it
  	And I execute it
  	Then response code should be: 408
  
  #http://cm.amplia.es/jira/browse/OUW-527
  @OUW-527
  Scenario: Execute searching with a invalid start limit
  	And the start limit by "null" and size limit by "5"
  	When I build it
  	And I execute it
  	Then response code should be: 200  	

