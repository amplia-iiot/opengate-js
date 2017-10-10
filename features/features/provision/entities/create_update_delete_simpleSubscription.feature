# features/create_update_delete_simpleSubscription.feature
@new
@subscription_builder
@create_provision
@subscription_defaultCreate
Feature: Delete and Create a subscription
  As a subscription of JsApi
  I want to create an subscription
  So, I can create a new user with the parameters that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"
    Given the entity of type "subscriptions builder" with "victor" 

 Scenario: I want to get the allowed datastream 
    And I get allowed Datastreams fields
    And I can found "provision.device.communicationModules[].subscription.identifier" as datastream name

 Scenario: I want to create the entity 
     When I try to define the entity with... 
		| datastream                                                                     | typeFunction       |   value                 | parent      |
		| provision.administration.channel                                               | simple             |  default_channel           |             |
        | provision.administration.organization                                          | simple             |  victor      |             |
        | provision.administration.serviceGroup                                          | simple             |  emptyServiceGroup      |             |
        | provision.device.communicationModules[].subscription.administrativeState                              | simple             |  ACTIVE                 |             |
        | provision.device.communicationModules[].subscription.identifier                | simple             |  subscription_ogapi       |             |

    Then I create it
    And response code should be: 201
     
 Scenario: I want to update the entity 
     When I try to define the entity with... 
		| datastream                                                                   | typeFunction       |   value                       | parent      |
        | provision.administration.channel                                             | simple             |  default_channel                 |             |
        | provision.administration.organization                                        | simple             |  victor            |             |
        | provision.administration.serviceGroup                                        | simple             |  emptyServiceGroup            |             |
        | provision.device.communicationModules[].subscription.identifier                | simple             |  subscription_ogapi             |             |
        | provision.device.communicationModules[].subscription.specificType              | simple             | ADSL                          |             |
        | provision.device.communicationModules[].subscription.name                      | simple             | subscription_ogapi name         |             |
    And I update it
    Then response code should be: 200

 Scenario: I want to delete the entity 
    When I try to define the entity with... 
		| datastream                                                                      | typeFunction       |   value                     | parent      |
        |  provision.device.communicationModules[].subscription.identifier                | simple             |  subscription_ogapi         |             |
    And I delete it
    Then response code should be: 200
