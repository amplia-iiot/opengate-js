# features/provision/entities/create_update_entities.OUW-1854.feature
@provision
@create_provision
@entities_provision
@OUW-1854
@entity_finder
@urlParameters

Feature: Create and update subscription on mode flattened
    As a user of JsApi
    I want to create and update a subscription on mode flattened
    So, I can solved the bug OUW-1854

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Creating an organization to use in create subscription
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "subscription_organization_10"
        And the "description" "subscription organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: Create subscription
        Given the entity of type "subscriptions builder" with "subscription_organization_10"
        Then I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscription.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                               | typeFunction | value                        | parent |
            | provision.administration.channel                                         | simple       | default_channel              |        |
            | provision.administration.organization                                    | simple       | subscription_organization_10 |        |
            | provision.administration.serviceGroup                                    | simple       | emptyServiceGroup            |        |
            | provision.device.communicationModules[].subscription.administrativeState | simple       | ACTIVE                       |        |
            | provision.device.communicationModules[].subscription.identifier          | simple       | subscription_ogapi_1854      |        |
        Then I delete it
        Then I create it
        And response code should be: 201


    Scenario: Update a subscription from flattened
        Given an ogapi "entity finder" util
        And I want to read a "subscription"
        When I try to find by...
            | field        | content                      |
            | organization | subscription_organization_10 |
            | id           | subscription_ogapi_1854      |
            | flattened    | true                         |
        And response code should be: 200
        Given the entity of type "subscriptions builder" with "subscription_organization_10"
        When I try to define the entity with GET previous flattened response
        When I try to define the entity with...
            | datastream                                                        | typeFunction | value                   | parent |
            | provision.device.communicationModules[].subscription.specificType | simple       | ADSL                    |        |
            | provision.device.communicationModules[].subscription.name         | simple       | subscription_ogapi name |        |
        And I update it
        Then response code should be: 200

    Scenario: I want to delete the subscription
        Given an ogapi "entity finder" util
        And I want to read a "subscription"
        When I try to find by...
            | field        | content                      |
            | organization | subscription_organization_10 |
            | id           | subscription_ogapi_1854      |
            | flattened    | true                         |
        And response code should be: 200
        Given the entity of type "subscriptions builder" with "subscription_organization_10"
        When I try to define the entity with GET previous flattened response
        And I delete it
        Then response code should be: 200

    Scenario: Delete the organization
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "subscription_organization_10"
        Then I delete it
        And response code should be: 200
