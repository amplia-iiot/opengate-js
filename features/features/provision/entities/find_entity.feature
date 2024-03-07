# features/find_asset.feature
@provision
@asset_builder
@finder
@find_provision
@find_entity
@entities_provision
@entity_finder
@urlParameters

Feature: Find a entity
    As a user of JsApi
    I want to find a entity
    So I can check if a entity exists and get their information

    Background:
        Given an apikey user by "require-real-apikey"


    Scenario: Creating an organization to use in create asset
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "ofind_asset_organization_10"
        And the "description" "asset organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: Find a asset that exists
        Given the entity of type "asset builder" with "ofind_asset_organization_10"
        Then I get allowed Datastreams fields
        And I can found "provision.asset.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                                      | parent |
            | provision.administration.channel      | simple       | default_channel                            |        |
            | provision.administration.organization | simple       | ofind_asset_organization_10                |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup                          |        |
            | provision.asset.identifier            | simple       | find_asset_asset_cucumber                  |        |
            | provision.asset.name                  | simple       | OGUX asset entity.device tester                  |        |
            | provision.asset.description           | simple       | OGUX asset tester full entity.device description |        |
        Then I delete it
        And I create it
        And response code should be: 201

        Given an ogapi "entity finder" util
        And I want to read a "asset"
        When I try to find by...
            | field        | content                     |
            | organization | ofind_asset_organization_10 |
            | id           | find_asset_asset_cucumber   |
        And response code should be: 200

        Then I can see into the result an "asset id" as "find_asset_asset_cucumber"

    Scenario: I want to delete the entity
        Given the entity of type "asset builder" with "ofind_asset_organization_10"
        When I try to define the entity with...
            | datastream                 | typeFunction | value                     | parent |
            | provision.asset.identifier | simple       | find_asset_asset_cucumber |        |
        Then I delete it

    Scenario: Deleting an organization to use in create asset
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "ofind_asset_organization_10"
        Then I delete it

    Scenario: Creating an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "find_device_organization_10"
        And the "description" "device organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: Find a device that exists
        Given the entity of type "devices builder" with "find_device_organization_10"
        Then I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                                       | parent |
            | provision.administration.channel      | simple       | default_channel                             |        |
            | provision.administration.organization | simple       | find_device_organization_10                 |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup                           |        |
            | provision.device.identifier           | simple       | find_device_device_cucumber                 |        |
            | provision.device.operationalStatus    | simple       | TEST                                        |        |
            | provision.device.administrativeState  | simple       | TESTING                                     |        |
            | provision.device.name                 | simple       | OGUX Device entity.device tester                  |        |
            | provision.device.description          | simple       | OGUX Device tester full entity.device description |        |
            | provision.device.specificType         | simple       | CONCENTRATOR                                |        |
        Then I delete it
        And I create it
        And response code should be: 201

        Given an ogapi "entity finder" util
        And I want to read a "device"
        When I try to find by...
            | field        | content                     |
            | organization | find_device_organization_10 |
            | id           | find_device_device_cucumber |
        And response code should be: 200

        Then I can see into the result an "device id" as "find_device_device_cucumber"

    Scenario: I want to delete the entity
        Given the entity of type "devices builder" with "find_device_organization_10"
        When I try to define the entity with...
            | datastream                            | typeFunction | value                       | parent |
            | provision.administration.channel      | simple       | default_channel             |        |
            | provision.administration.organization | simple       | find_device_organization_10 |        |
            | provision.device.identifier           | simple       | find_device_device_cucumber |        |
        Then I delete it

    Scenario: Deleting an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "find_device_organization_10"
        Then I delete it

    Scenario: Creating an organization to use in create subscriber
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "find_subscriber_organization_10"
        And the "description" "subscriber organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: Find a subscriber that exists
        Given the entity of type "subscribers builder" with "find_subscriber_organization_10"
        Then I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscriber.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                             | typeFunction | value                           | parent |
            | provision.administration.channel                                       | simple       | default_channel                 |        |
            | provision.administration.organization                                  | simple       | find_subscriber_organization_10 |        |
            | provision.administration.serviceGroup                                  | simple       | emptyServiceGroup               |        |
            | provision.device.communicationModules[].subscriber.administrativeState | simple       | ACTIVE                          |        |
            | provision.device.communicationModules[].subscriber.identifier          | simple       | find_subscriber_cucumber        |        |
        Then I delete it
        Then I create it
        And response code should be: 201

        Given an ogapi "subscriber finder" util
        And I want to read a "subscriber"
        When I try to find by...
            | field        | content                         |
            | organization | find_subscriber_organization_10 |
            | id           | find_subscriber_cucumber        |
        And response code should be: 200
        Then I can see into the result an "subscriber id" as "find_subscriber_cucumber"

    Scenario: I want to delete the entity
        Given the entity of type "subscribers builder" with "find_subscriber_organization_10"
        When I try to define the entity with...
            | datastream                                                    | typeFunction | value                    | parent |
            | provision.device.communicationModules[].subscriber.identifier | simple       | find_subscriber_cucumber |        |
        Then I delete it

    Scenario: Deleting an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "find_subscriber_organization_10"
        Then I delete it

    Scenario: Creating an organization to use in create subscriber
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "find_subscriber_organization_10"
        And the "description" "subscriber organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: Find a subscriber that exists
        Given the entity of type "subscribers builder" with "find_subscriber_organization_10"
        Then I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscriber.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                             | typeFunction | value                           | parent |
            | provision.administration.channel                                       | simple       | default_channel                 |        |
            | provision.administration.organization                                  | simple       | find_subscriber_organization_10 |        |
            | provision.administration.serviceGroup                                  | simple       | emptyServiceGroup               |        |
            | provision.device.communicationModules[].subscriber.administrativeState | simple       | ACTIVE                          |        |
            | provision.device.communicationModules[].subscriber.identifier          | simple       | find_subscriber_cucumber        |        |
        Then I delete it
        Then I create it
        And response code should be: 201

        Given an ogapi "entity finder" util
        And I want to read a "subscriber"
        When I try to find by...
            | field        | content                         |
            | organization | find_subscriber_organization_10 |
            | id           | find_subscriber_cucumber        |
        And response code should be: 200
        Then I can see into the result an "subscriber id" as "find_subscriber_cucumber"

    Scenario: I want to delete the entity
        Given the entity of type "subscribers builder" with "find_subscriber_organization_10"
        When I try to define the entity with...
            | datastream                                                    | typeFunction | value                    | parent |
            | provision.device.communicationModules[].subscriber.identifier | simple       | find_subscriber_cucumber |        |
        Then I delete it

    Scenario: Deleting an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "find_subscriber_organization_10"
        Then I delete it

    Scenario: Creating an organization to use in create subscription
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "find_subscription_organization_10"
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
        Given the entity of type "subscriptions builder" with "find_subscription_organization_10"
        Then I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscription.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                               | typeFunction | value                             | parent |
            | provision.administration.channel                                         | simple       | default_channel                   |        |
            | provision.administration.organization                                    | simple       | find_subscription_organization_10 |        |
            | provision.administration.serviceGroup                                    | simple       | emptyServiceGroup                 |        |
            | provision.device.communicationModules[].subscription.administrativeState | simple       | ACTIVE                            |        |
            | provision.device.communicationModules[].subscription.identifier          | simple       | find_subscription_cucumber        |        |
        Then I delete it
        Then I create it
        And response code should be: 201

        Given an ogapi "entity finder" util
        And I want to read a "subscription"
        When I try to find by...
            | field        | content                           |
            | organization | find_subscription_organization_10 |
            | id           | find_subscription_cucumber        |
        And response code should be: 200
        Then I can see into the result an "subscription id" as "find_subscription_cucumber"

    Scenario: I want to delete the entity
        Given the entity of type "subscriptions builder" with "find_subscription_organization_10"
        When I try to define the entity with...
            | datastream                                                      | typeFunction | value                      | parent |
            | provision.device.communicationModules[].subscription.identifier | simple       | find_subscription_cucumber |        |
        Then I delete it

    Scenario: Deleting an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "find_subscription_organization_10"
        Then I delete it
