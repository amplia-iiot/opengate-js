# features/searching_devices.feature
@searching
@searching_devices
Feature: Searching devices 
  As a user of JsApi
  I want to search into devices collection
  So I can add filter, sorting, limit to search any device
  
  Background:
    Given an apikey user by "require-real-apikey"
    

  Scenario: Execute searching with a timeout less than expected
  And an ogapi "devices search" util
  	And the timeout by 10
  	When I build it
  	And I execute it
  	Then response code should be: 408
    
 Scenario: I want to get the allowed datastream 
  Given the entity of type "devices builder" with "base_organization" 
    And I get allowed Datastreams fields    
    And I can found "provision.device.identifier" as datastream name
     When I try to define the entity with... 
		    | datastream                                                        | typeFunction       |   value                 | parent      |
		    | provision.administration.channel                                  | simple             |   base_channel          |             |
        | provision.administration.organization                             | simple             |  base_organization      |             |
        | provision.administration.serviceGroup                             | simple             |  emptyServiceGroup      |             |
        | provision.device.identifier                                       | simple             |  device_ogapi_0         |             |
        | provision.device.operationalStatus                                | simple             |  NORMAL                 |             |   
        | provision.device.administrativeState                              | simple             |  ACTIVE                 |             |
    Then I create it
    And response code should be: 201
    
  
  Scenario: Execute searching with a invalid start limit
  And an ogapi "devices search" util
  	And the start limit by "null" and size limit by "5"
  	When I build it
  	And I execute it
  	Then response code should be: 200 	
    Then does not throws an error

  Scenario: Execute searching with a flattened response
    And an ogapi "devices search" util
  	When I build it with flattened response
  	And I execute it
  	Then response code should be: 200
    Then does not throws an error

  Scenario: I want to obtain the summary
    And an ogapi "devices search" util
  	When I build it with summary response
  	And I execute it
  	Then response code should be: 200
    Then does not throws an error

 Scenario: I want to delete the entity 
 Given the entity of type "devices builder" with "base_organization" 
    When I try to define the entity with... 
		| datastream                                 | typeFunction       |   value                 | parent      |
        | provision.device.identifier                | simple             |  device_ogapi_0           |             |
    And I delete it
    Then response code should be: 200