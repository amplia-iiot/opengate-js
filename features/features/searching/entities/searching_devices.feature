# features/searching/entities/searching_devices.feature
@searching
@searching_devices
@select-fields
Feature: Searching devices 
  As a user of JsApi
  I want to search into devices collection
  So I can add filter, sorting, limit, select to search any device
  
  Background:
    Given an apikey user by "require-real-apikey"
    

  Scenario: Execute searching with a timeout less than expected
  And an ogapi "devices search" util
  	And the timeout by 10
  	When I build it
  	And I execute it
  	Then response code should be: 408

 Scenario: Creating an organization to use in create device
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "devices_organization_searching"
    And the "description" "devices organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1 
    Then I delete it
    Then I create it
    And response code should be: 201 
    
 Scenario: I want to get the allowed datastream 
  Given the entity of type "devices builder" with "devices_organization_searching" 
    And I get allowed Datastreams fields    
    And I can found "provision.device.identifier" as datastream name
     When I try to define the entity with... 
		    | datastream                                                        | typeFunction       |   value                 | parent      |
		    | provision.administration.channel                                  | simple             |   default_channel          |             |
        | provision.administration.organization                             | simple             |  devices_organization_searching      |             |
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

Scenario: I want to download csv
    And an ogapi "devices search" util
    When I add a filter and with
        | operator   | key                                     | value                          |                                                        
        | eq         |provision.administration.organization    |  devices_organization_searching  |
   
    When I build it with select...
    | datastreamId                           | fields      | alias |
    | provision.device.administrativeState   | ["value"]   |state|
    And I download csv it
    Then response code should be: 200
    Then does not throws an error
    Then the content of file "search.csv" must be:
    """
provision.administration.channel;provision.administration.identifier;provision.administration.organization;state.value
base_channel;device_ogapi_0;devices_organization_searching;ACTIVE

    """

 Scenario: I want to delete the entity 
 Given the entity of type "devices builder" with "devices_organization_searching" 
    When I try to define the entity with... 
		| datastream                                 | typeFunction       |   value                 | parent      |
        | provision.device.identifier                | simple             |  device_ogapi_0           |             |
    And I delete it
    Then response code should be: 200