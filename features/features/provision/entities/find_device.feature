# features/find_device.feature
@provision
@device_builder
@finder
@find_provision
@find_device
@entities_provision
Feature: Find a device
  As a user of JsApi
  I want to find a device
  So I can check if a device exists and get their information

  Background:
    Given an apikey user by "require-real-apikey"


  Scenario: Creating an organization to use in create device
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "find_device_organization"
    And the "description" "device organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1 
    Then I delete it
    And I create it
    And response code should be: 201

  Scenario: Find a device that exists
	Given the entity of type "devices builder" with "find_device_organization" 
    Then I get allowed Datastreams fields    
    And I can found "provision.device.identifier" as datastream name
    When I try to define the entity with... 
		| datastream                                                        | typeFunction       |   value                                           | parent      |
		| provision.administration.channel                                  | simple             |  default_channel                                  |             |
        | provision.administration.organization                             | simple             |  find_device_organization                              |             |
        | provision.administration.serviceGroup                             | simple             |  emptyServiceGroup                                |             |
        | provision.device.identifier                                       | simple             |  find_device_device_cucumber                          |             |
        | provision.device.operationalStatus                                | simple             |  TEST                                             |             |   
        | provision.device.administrativeState                              | simple             |  TESTING                                          |             |
        | provision.device.name                                             | simple             |  OGUX Device GATEWAY tester                       |             |
        | provision.device.description                                      | simple             |  OGUX Device tester full GATEWAY description      |             |
        | provision.device.specificType                                     | simple             |  CONCENTRATOR                                     |             |
    Then I delete it
    And I create it
    And response code should be: 201

    Given an ogapi "device finder" util
    And I want to read a "device"
 	When I try to find by... 
		| field           | content            |
		| organization    | find_device_organization |
		| id              | find_device_device_cucumber |
	And response code should be: 200

	Then I can see into the result an "device id" as "find_device_device_cucumber"
 	
 Scenario: I want to delete the entity 
    Given the entity of type "devices builder" with "find_device_organization" 
    When I try to define the entity with... 
		| datastream                                                        | typeFunction       |   value                 | parent      |
		| provision.administration.channel                                  | simple             |  default_channel        |             |
        | provision.administration.organization                             | simple             |  find_device_organization    |          |
        | provision.device.identifier                                       | simple             |  find_device_device_cucumber           |             |
    Then I delete it

Scenario: Deleting an organization to use in create device
    Given an ogapi "organizations builder" util
    Then I want to delete an "organization"
    And the "name" "find_device_organization"
    Then I delete it
