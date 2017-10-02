# features/create_update_delete_simpleDevice.feature
@device_builder
@new
@create_provision
@device_defaultCreate
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
		| datastream                                 | typeFunction       |   value                 | parent      |
		| provision.administration.channel           | simple             |  base_channel           |             |
        | provision.administration.organization      | simple             |  base_organization      |             |
        | provision.administration.serviceGroup      | simple             |  emptyServiceGroup      |             |
        | provision.device.identifier                | simple             |  device_ogapi           |             |

    Then I create it
    And response code should be: 201
     
 Scenario: I want to update the entity 
     When I try to define the entity with... 
		| datastream                                 | typeFunction       |   value                 | parent      |
        | provision.administration.channel           | simple             |  base_channel           |             |
        | provision.administration.organization      | simple             |  base_organization      |             |
        | provision.administration.serviceGroup      | simple             |  emptyServiceGroup      |             |
        | provision.device.identifier                | simple             |  device_ogapi           |             |
        | provision.device.description               | simple             | device_ogapi description|             |
        | provision.device.name                      | simple             | device_ogapi name       |             |
    And I update it
    Then response code should be: 200

 Scenario: I want to delete the entity 
    When I try to define the entity with... 
		| datastream                                 | typeFunction       |   value                 | parent      |
        | provision.device.identifier                | simple             |  device_ogapi           |             |
    And I delete it
    Then response code should be: 200
