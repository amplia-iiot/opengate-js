# features/find_subscriber.feature
@provision
@subscriber_builder
@finder
@find_provision
@find_subscriber
@entities_provision
@entity_finder
Feature: Find a subscriber
    As a user of JsApi
    I want to find a subscriber
    So I can check if a subscriber exists and get their information

    Background:
        Given an apikey user by "require-real-apikey"


    Scenario: Creating an organization to use in create subscriber
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "find_subscriber_organization"
        And the "description" "subscriber organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        And the "plan" "TRIAL"
        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: Find a subscriber that exists
        Given the entity of type "subscribers builder" with "find_subscriber_organization"
        Then I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscriber.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                             | typeFunction | value                        | parent |
            | provision.administration.channel                                       | simple       | default_channel              |        |
            | provision.administration.organization                                  | simple       | find_subscriber_organization |        |
            | provision.administration.serviceGroup                                  | simple       | emptyServiceGroup            |        |
            | provision.device.communicationModules[].subscriber.administrativeState | simple       | ACTIVE                       |        |
            | provision.device.communicationModules[].subscriber.identifier          | simple       | find_subscriber_cucumber     |        |
        Then I delete it
        Then I create it
        And response code should be: 201

        Given an ogapi "subscriber finder" util
        And I want to read a "subscriber"
        When I try to find by...
            | field        | content                      |
            | organization | find_subscriber_organization |
            | id           | find_subscriber_cucumber     |
        And response code should be: 200
        Then I can see into the result an "subscriber id" as "find_subscriber_cucumber"

    Scenario: I want to delete the entity
        Given the entity of type "subscribers builder" with "find_subscriber_organization"
        When I try to define the entity with...
            | datastream                                                    | typeFunction | value                    | parent |
            | provision.device.communicationModules[].subscriber.identifier | simple       | find_subscriber_cucumber |        |
        Then I delete it

    Scenario: Deleting an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "find_subscriber_organization"
        Then I delete it

    Scenario: Creating an organization to use in create subscriber
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "find_subscriber_organization"
        And the "description" "subscriber organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        And the "plan" "TRIAL"
        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: Find a subscriber that exists
        Given the entity of type "subscribers builder" with "find_subscriber_organization"
        Then I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscriber.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                             | typeFunction | value                        | parent |
            | provision.administration.channel                                       | simple       | default_channel              |        |
            | provision.administration.organization                                  | simple       | find_subscriber_organization |        |
            | provision.administration.serviceGroup                                  | simple       | emptyServiceGroup            |        |
            | provision.device.communicationModules[].subscriber.administrativeState | simple       | ACTIVE                       |        |
            | provision.device.communicationModules[].subscriber.identifier          | simple       | find_subscriber_cucumber     |        |
        Then I delete it
        Then I create it
        And response code should be: 201

        Given an ogapi "subscriber finder" util
        And I want to read a "subscriber"
        When I try to find by...
            | field        | content                      |
            | organization | find_subscriber_organization |
            | id           | find_subscriber_cucumber     |
        And response code should be: 200
        Then I can see into the result an "subscriber id" as "find_subscriber_cucumber"

    Scenario: I want to delete the entity
        Given the entity of type "subscribers builder" with "find_subscriber_organization"
        When I try to define the entity with...
            | datastream                                                    | typeFunction | value                    | parent |
            | provision.device.communicationModules[].subscriber.identifier | simple       | find_subscriber_cucumber |        |
        Then I delete it

    Scenario: Deleting an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "find_subscriber_organization"
        Then I delete it
