# features/create_update_delete_simpleSubscriber.feature
@new
@subscribers_builder
@create_provision
@subscriber_defaultCreate
Feature: Delete and Create a subscriber
  As a subscriber of JsApi
  I want to create an subscriber
  So, I can create a new user with the parameters that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"
    Given the entity of type "subscribers builder" with "organization_UX" 

 Scenario: I want to get the allowed datastream 
    And I get allowed Datastreams fields
    And response code should be: 200

 Scenario: I want to create the entity 
     When I try to define the entity with... 
		| datastream                                                                     | typeFunction       |   value                 | parent      |
		| provision.administration.channel                                               | simple             |  channel_1              |             |
        | provision.administration.organization                                          | simple             |  organization_UX        |             |
        | provision.administration.serviceGroup                                          | simple             |  emptyServiceGroup      |             |
        | provision.device.communicationModules[].subscriber.identifier                  | simple             |  subscriber_ogapi       |             |

    Then I create it
    And response code should be: 201
     
 Scenario: I want to update the entity 
     When I try to define the entity with... 
		| datastream                                                                   | typeFunction       |   value                       | parent      |
        | provision.administration.channel                                             | simple             |  channel_1                 |             |
        | provision.administration.organization                                        | simple             |  organization_UX            |             |
        | provision.administration.serviceGroup                                        | simple             |  emptyServiceGroup            |             |
        | provision.device.communicationModules[].subscriber.identifier                | simple             |  subscriber_ogapi             |             |
        | provision.device.communicationModules[].subscriber.specificType              | simple             | ADSL                          |             |
        | provision.device.communicationModules[].subscriber.name                      | simple             | subscriber_ogapi name         |             |
    And I update it
    Then response code should be: 200

 Scenario: I want to delete the entity 
    When I try to define the entity with... 
		| datastream                                                                   | typeFunction       |   value                     | parent      |
        | provision.device.communicationModules[].subscriber.identifier                | simple             |  subscriber_ogapi           |             |
    And I delete it
    Then response code should be: 200
