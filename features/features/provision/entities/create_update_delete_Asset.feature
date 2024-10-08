# features/create_update_delete_Asset.feature
@provision
@asset
@asset_builder
@create_provision
@asset_defaultCreate
@entities_provision

Feature: Delete and Create an asset
As a user of JsApi
I want to create an asset
So, I can create a new asset with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"

  Scenario: Creating an organization to use in create assets
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "asset_organization"
    And the "description" "asset organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1
    Then I delete it
    Then I create it
    And response code should be: 201

  Scenario: I want to create an asset
    Given the entity of type "asset builder" with "asset_organization"
    And I get allowed Datastreams fields
    And I can found "provision.asset.identifier" as datastream name
    When I try to define the entity with...
      | datastream                            | typeFunction | value              | parent |
      | provision.administration.channel      | simple       | default_channel    |        |
      | provision.administration.organization | simple       | asset_organization |        |
      | provision.administration.serviceGroup | simple       | emptyServiceGroup  |        |
      | provision.asset.identifier            | simple       | asset_ogapi_simple |        |
    Then I create it
    And response code should be: 201

  Scenario: I want to update the entity
    Given the entity of type "asset builder" with "asset_organization"
    And I get allowed Datastreams fields
    And I can found "provision.asset.identifier" as datastream name
    When I try to define the entity with...
      | datastream                            | typeFunction | value              | parent |
      | provision.administration.channel      | simple       | default_channel    |        |
      | provision.administration.organization | simple       | asset_organization |        |
      | provision.administration.serviceGroup | simple       | emptyServiceGroup  |        |
      | provision.asset.identifier            | simple       | asset_ogapi_simple |        |
    And I update it
    Then response code should be: 200

  Scenario: I want to delete the entity
    Given the entity of type "asset builder" with "asset_organization"
    And I get allowed Datastreams fields
    And I can found "provision.asset.identifier" as datastream name
    When I try to define the entity with...
      | datastream                 | typeFunction | value              | parent |
      | provision.asset.identifier | simple       | asset_ogapi_simple |        |
    And I delete it
    Then response code should be: 200

  Scenario: I want to create an asset with incorrect specific type
    Given the entity of type "asset builder" with "asset_organization"
    And I get allowed Datastreams fields
    And I can found "provision.asset.identifier" as datastream name
    When I try to define the entity with...
      | datastream                            | typeFunction | value              | parent |
      | provision.administration.channel      | simple       | default_channel    |        |
      | provision.administration.organization | simple       | asset_organization |        |
      | provision.administration.serviceGroup | simple       | emptyServiceGroup  |        |
      | provision.asset.identifier            | simple       | asset_ogapi_simple |        |
      | provision.asset.specificType          | simple       | CONCENTRATORE      |        |
    Then I create it
    And an error is thrown

  Scenario: Deleting an organization
    Given an ogapi "organizations builder" util
    Then I want to delete an "organization"
    And the "name" "asset_organization"
    Then I delete it
    And response code should be: 200