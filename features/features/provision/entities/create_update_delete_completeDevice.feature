# features/create_update_delete_simpleDevice.feature
@provision
@new
@entities_provision
@create_provision
@device_defaultCreateBox
Feature: Delete and Create a device
  As a device of JsApi
  I want to create an device
  So, I can create a new user with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"
   
@ignore
 Scenario: Creating an organization to use in create device
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "completeDevice_organization"
    And the "description" "device organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1 
    Then I create it
    And response code should be: 201

@ignore
 Scenario: I want to create the entity 
    Given the entity of type "devices builder" with "completeDevice_organization" 
    And I get allowed Datastreams fields    
    And I can found "provision.device.identifier" as datastream name
    When I try to define the entity with... 
		| datastream                                                        | typeFunction       |   value                         | parent      |
		| provision.administration.channel                                  | simple             |  default_channel                |             |
        | provision.administration.organization                             | simple             |  completeDevice_organization    |          |
        | provision.administration.serviceGroup                             | simple             |  emptyServiceGroup              |             |
        | provision.device.identifier                                       | simple             |  complete_device_ogapi_1        |             |
        | provision.device.operationalStatus                                | simple             |  NORMAL                         |             |   
        | provision.device.administrativeState                              | simple             |  ACTIVE                         |             |
        | provision.device.communicationModules[].identifier                | complex            |  CM_id_11                       | CM_id_11     |
        | provision.device.communicationModules[].subscription.identifier   | complex            |  SP_id_11                       | CM_id_11     |
        | provision.device.communicationModules[].subscriber.identifier     | complex            |  SB_id_11                       | CM_id_11     |
        | provision.device.communicationModules[].identifier                | complex            |  CM_id_21                       | CM_id_21     |
        | provision.device.communicationModules[].subscription.identifier   | complex            |  SP_id_21                       | CM_id_21    |
        | provision.device.communicationModules[].subscriber.identifier     | complex            |  SB_id_21                       | CM_id_21     |
    Then I create it
    And response code should be: 201

@ignore
Scenario: I want to update the entity 
    Given the entity of type "devices builder" with "completeDevice_organization" 
    And I get allowed Datastreams fields    
    And I can found "provision.device.identifier" as datastream name
    When I try to define the entity with... 
		| datastream                                                        | typeFunction       |   value                         | parent      |
		| provision.administration.channel                                  | simple             |  default_channel                |             |
        | provision.administration.organization                             | simple             |  completeDevice_organization    |             |
        | provision.administration.serviceGroup                             | simple             |  emptyServiceGroup              |             |
        | provision.device.identifier                                       | simple             |  complete_device_ogapi_1                 |             |
        | provision.device.communicationModules[].identifier                | complex            |  CM_id_11                       | CM_id_11     |
        | provision.device.communicationModules[].subscription.identifier   | complex            |  SP_id_11                       | CM_id_11     |
        | provision.device.communicationModules[].subscriber.identifier     | complex            |  SB_id_11                       | CM_id_11     |
        | provision.device.communicationModules[].identifier                | complex            |  CM_id_21                       | CM_id_21     |
        | provision.device.communicationModules[].subscription.identifier   | complex            |  SP_id_21                       | CM_id_21     |
        | provision.device.communicationModules[].subscriber.identifier     | complex            |  SB_id_21                       | CM_id_21     |
        | provision.device.description                                      | simple             | device_ogapi description        |             |
        | provision.device.name                                             | simple             | device_ogapi name               |             |

    Then I update it
    And response code should be: 200
@ignore
 Scenario: I want to delete the entity 
    Given the entity of type "devices builder" with "completeDevice_organization" 
    When I try to define the entity with... 
		| datastream                                 | typeFunction       |   value                 | parent      |
        | provision.device.identifier                | simple             |  complete_device_ogapi_1           |             |
    And I delete it
    Then response code should be: 200
 @ignore    
Scenario: Deleting an organization
   Given an ogapi "organizations builder" util
   Then I want to delete an "organization"
   And the "name" "completeDevice_organization"
   Then I delete it
   And response code should be: 200