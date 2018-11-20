# features/find_subscription.feature
@provision
@subscription_builder
@finder
@find_provision
@find_subscription
@entities_provision
@entity_finder
Feature: Find a subscription
    As a user of JsApi
    I want to find a subscription
    So I can check if a subscription exists and get their information

    Background:
        Given an apikey user by "require-real-apikey"


    Scenario: Creating an organization to use in create subscription
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "find_subscription_organization"
        And the "description" "subscription organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: Find a subscription that exists
        Given the entity of type "subscriptions builder" with "find_subscription_organization"
        Then I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscription.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                               | typeFunction | value                          | parent |
            | provision.administration.channel                                         | simple       | default_channel                |        |
            | provision.administration.organization                                    | simple       | find_subscription_organization |        |
            | provision.administration.serviceGroup                                    | simple       | emptyServiceGroup              |        |
            | provision.device.communicationModules[].subscription.administrativeState | simple       | ACTIVE                         |        |
            | provision.device.communicationModules[].subscription.identifier          | simple       | find_subscription_cucumber     |        |
        Then I delete it
        Then I create it
        And response code should be: 201

        Given an ogapi "subscription finder" util
        And I want to read a "subscription"
        When I try to find by...
            | field        | content                        |
            | organization | find_subscription_organization |
            | id           | find_subscription_cucumber     |
        And response code should be: 200
        Then I can see into the result an "subscription id" as "find_subscription_cucumber"

    Scenario: I want to delete the entity
        Given the entity of type "subscriptions builder" with "find_subscription_organization"
        When I try to define the entity with...
            | datastream                                                      | typeFunction | value                      | parent |
            | provision.device.communicationModules[].subscription.identifier | simple       | find_subscription_cucumber |        |
        Then I delete it

    Scenario: Deleting an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "find_subscription_organization"
        Then I delete it
