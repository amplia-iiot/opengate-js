# features/create_update_delete_simpleSubscription.feature
@provision
@new
@subscription_builder
@create_provision
@subscription_defaultCreate
@entities_provision
Feature: Delete and Create a subscription
As a subscription of JsApi
I want to create an subscription
So, I can create a new user with the parameters that I have been defined

    Background:
        Given an apikey user by "require-real-apikey"



    Scenario: Creating an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "subscriptions_organization"
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
        Given the entity of type "subscriptions builder" with "subscriptions_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscription.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                               | typeFunction | value                      | parent |
            | provision.administration.channel                                         | simple       | default_channel            |        |
            | provision.administration.organization                                    | simple       | subscriptions_organization |        |
            | provision.administration.serviceGroup                                    | simple       | emptyServiceGroup          |        |
            | provision.device.communicationModules[].subscription.administrativeState | simple       | ACTIVE                     |        |
            | provision.device.communicationModules[].subscription.identifier          | simple       | subscription_ogapi         |        |

        Then I create it
        And response code should be: 201

    Scenario: I want to update the entity
        Given the entity of type "subscriptions builder" with "subscriptions_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscription.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                        | typeFunction | value                      | parent |
            | provision.administration.channel                                  | simple       | default_channel            |        |
            | provision.administration.organization                             | simple       | subscriptions_organization |        |
            | provision.administration.serviceGroup                             | simple       | emptyServiceGroup          |        |
            | provision.device.communicationModules[].subscription.identifier   | simple       | subscription_ogapi         |        |
            | provision.device.communicationModules[].subscription.specificType | simple       | ADSL                       |        |
            | provision.device.communicationModules[].subscription.name         | simple       | subscription_ogapi name    |        |
        And I update it
        Then response code should be: 200

    #http://cm.amplia.es/jira/browse/OUW-523
    @OUW-523
    Scenario: I want to update the entity with wrong specificType
        Given the entity of type "subscriptions builder" with "subscriptions_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscription.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                        | typeFunction | value                      | parent |
            | provision.administration.channel                                  | simple       | default_channel            |        |
            | provision.administration.organization                             | simple       | subscriptions_organization |        |
            | provision.administration.serviceGroup                             | simple       | emptyServiceGroup          |        |
            | provision.device.communicationModules[].subscription.identifier   | simple       | subscription_ogapi         |        |
            | provision.device.communicationModules[].subscription.specificType | simple       | ADSL1                      |        |
            | provision.device.communicationModules[].subscription.name         | simple       | subscription_ogapi name    |        |
        And I update it
        And an error is thrown

    Scenario: I want to update the entity without mandatory data
        Given the entity of type "subscriptions builder" with "subscriptions_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscription.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value             | parent |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup |        |
        And I create it
        And an error is thrown

    Scenario: I want to delete the entity
        Given the entity of type "subscriptions builder" with "subscriptions_organization"
        When I try to define the entity with...
            | datastream                                                      | typeFunction | value              | parent |
            | provision.device.communicationModules[].subscription.identifier | simple       | subscription_ogapi |        |
        And I delete it
        Then response code should be: 200

    Scenario: Deleting an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "subscriptions_organization"
        Then I delete it
