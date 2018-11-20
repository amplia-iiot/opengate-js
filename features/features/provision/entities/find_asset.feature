# features/find_asset.feature
@provision
@asset_builder
@finder
@find_provision
@find_asset
@entities_provision
@entity_finder
Feature: Find a asset
    As a user of JsApi
    I want to find a asset
    So I can check if a asset exists and get their information

    Background:
        Given an apikey user by "require-real-apikey"


    Scenario: Creating an organization to use in create asset
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "find_asset_organization"
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
        Given the entity of type "asset builder" with "find_asset_organization"
        Then I get allowed Datastreams fields
        And I can found "provision.asset.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                                      | parent |
            | provision.administration.channel      | simple       | default_channel                            |        |
            | provision.administration.organization | simple       | find_asset_organization                    |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup                          |        |
            | provision.asset.identifier            | simple       | find_asset_asset_cucumber                  |        |
            | provision.asset.name                  | simple       | OGUX asset GATEWAY tester                  |        |
            | provision.asset.description           | simple       | OGUX asset tester full GATEWAY description |        |
        Then I delete it
        And I create it
        And response code should be: 201

        Given an ogapi "entity finder" util
        And I want to read a "asset"
        When I try to find by...
            | field        | content                   |
            | organization | find_asset_organization   |
            | id           | find_asset_asset_cucumber |
        And response code should be: 200

        Then I can see into the result an "asset id" as "find_asset_asset_cucumber"

    Scenario: I want to delete the entity
        Given the entity of type "asset builder" with "find_asset_organization"
        When I try to define the entity with...
            | datastream                 | typeFunction | value                     | parent |
            | provision.asset.identifier | simple       | find_asset_asset_cucumber |        |
        Then I delete it

    Scenario: Deleting an organization to use in create asset
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "find_asset_organization"
        Then I delete it
