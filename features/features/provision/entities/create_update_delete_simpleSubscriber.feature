# features/create_update_delete_simpleSubscriber.feature
@provision
@new
@subscribers_builder
@create_provision
@entities_provision
@subscriber_defaultCreate
Feature: Delete and Create a subscriber
As a subscriber of JsApi
I want to create an subscriber
So, I can create a new user with the parameters that I have been defined

    Background:
        Given an apikey user by "require-real-apikey"


    Scenario: Creating an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "subscriber_organization"
        And the "description" "device organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: I want to create the entity
        Given the entity of type "subscribers builder" with "subscriber_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscriber.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                             | typeFunction | value                          | parent |
            | provision.administration.channel                                       | simple       | default_channel                |        |
            | provision.administration.organization                                  | simple       | subscriber_organization        |        |
            | provision.administration.serviceGroup                                  | simple       | emptyServiceGroup              |        |
            | provision.device.communicationModules[].subscriber.administrativeState | simple       | ACTIVE                         |        |
            | provision.device.communicationModules[].subscriber.identifier          | simple       | subscriber_ogapi_cucumber_test |        |

        Then I create it
        And response code should be: 201

    Scenario: I want to update the entity
        Given the entity of type "subscribers builder" with "subscriber_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscriber.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                      | typeFunction | value                          | parent |
            | provision.administration.channel                                | simple       | default_channel                |        |
            | provision.administration.organization                           | simple       | subscriber_organization        |        |
            | provision.administration.serviceGroup                           | simple       | emptyServiceGroup              |        |
            | provision.device.communicationModules[].subscriber.identifier   | simple       | subscriber_ogapi_cucumber_test |        |
            | provision.device.communicationModules[].subscriber.specificType | simple       | ADSL                           |        |
            | provision.device.communicationModules[].subscriber.name         | simple       | subscriber_ogapi name          |        |
        And I update it
        Then response code should be: 200

    Scenario: I want to update the entity with wrong specificType
        Given the entity of type "subscribers builder" with "subscriber_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscriber.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                      | typeFunction | value                          | parent |
            | provision.administration.channel                                | simple       | default_channel                |        |
            | provision.administration.organization                           | simple       | subscriber_organization        |        |
            | provision.administration.serviceGroup                           | simple       | emptyServiceGroup              |        |
            | provision.device.communicationModules[].subscriber.identifier   | simple       | subscriber_ogapi_cucumber_test |        |
            | provision.device.communicationModules[].subscriber.specificType | simple       | ADSL1                          |        |
            | provision.device.communicationModules[].subscriber.name         | simple       | subscriber_ogapi name          |        |
        And I update it
        And an error is thrown

    Scenario: I try to create the entity without the mandatory fields
        Given the entity of type "subscribers builder" with "subscriber_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscriber.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                             | typeFunction | value             | parent |
            | provision.administration.channel                                       | simple       | default_channel   |        |
            | provision.administration.serviceGroup                                  | simple       | emptyServiceGroup |        |
            | provision.device.communicationModules[].subscriber.administrativeState | simple       | ACTIVE            |        |

        Then I create it
        And response code should be: 400

    Scenario: I want to delete the entity
        Given the entity of type "subscribers builder" with "subscriber_organization"
        When I try to define the entity with...
            | datastream                                                    | typeFunction | value                          | parent |
            | provision.device.communicationModules[].subscriber.identifier | simple       | subscriber_ogapi_cucumber_test |        |
        And I delete it
        Then response code should be: 200

    Scenario: Deleting an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "subscriber_organization"
        Then I delete it
