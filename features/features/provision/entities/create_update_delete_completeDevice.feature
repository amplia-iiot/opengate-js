# features/create_update_delete_simpleDevice.feature
@new
@device_builder
@create_provision
@device_defaultCreateBox
Feature: Delete and Create a device
  As a device of JsApi
  I want to create an device
  So, I can create a new user with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"
    Given the entity of type "devices builder" with "base_organization" 

 Scenario: I want to get the allowed datastream 
    And I get allowed Datastreams fields
    And response code should be: 200

 Scenario: I want to create the entity 
     When I try to define the entity with... 
		| datastream                                                        | typeFunction       |   value                 | parent      |
		| provision.administration.channel                                  | simple             |  base_channel           |             |
        | provision.administration.organization                             | simple             |  base_organization      |             |
        | provision.administration.serviceGroup                             | simple             |  emptyServiceGroup      |             |
        | provision.device.identifier                                       | simple             |  device_ogapi           |             |
        | provision.device.communicationModules[].identifier                | complex            |  CM_id_1                | CM_id_1     |
        | provision.device.communicationModules[].subscription.identifier   | complex            |  SB_id_1                | CM_id_1     |
        | provision.device.communicationModules[].subscriber.identifier     | complex            |  SP_id_1                | CM_id_1     |

    Then I create it
    And response code should be: 201


Scenario: I want to update the entity 
     When I try to define the entity with... 
		| datastream                                                        | typeFunction       |   value                 | parent      |
		| provision.administration.channel                                  | simple             |  base_channel           |             |
        | provision.administration.organization                             | simple             |  base_organization      |             |
        | provision.administration.serviceGroup                             | simple             |  emptyServiceGroup      |             |
        | provision.device.identifier                                       | simple             |  device_ogapi           |             |
        | provision.device.communicationModules[].identifier                | complex            |  CM_id_1                | CM_id_1     |
        | provision.device.communicationModules[].subscription.identifier   | complex            |  SB_id_1                | CM_id_1     |
        | provision.device.communicationModules[].subscriber.identifier     | complex            |  SP_id_1                | CM_id_1     |
        | provision.device.description                                      | simple             | device_ogapi description|             |
        | provision.device.name                                             | simple             | device_ogapi name       |             |

    Then I update it
    And response code should be: 200

 Scenario: I want to delete the entity 
    When I try to define the entity with... 
		| datastream                                 | typeFunction       |   value                 | parent      |
        | provision.device.identifier                | simple             |  device_ogapi           |             |
    And I delete all
    Then response code should be: 200
     
 