# features/searching/entities/searching_entities.feature
@searching
@searching_entities
@select-fields
@download_csv
@csv
Feature: Searching entities
  As a user of JsApi
  I want to search into entities collection
  So I can add filter, sorting, limit, select to search any device

  Background:
    Given an apikey user by "require-real-apikey"


  Scenario: Creating an organization to use in create device
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "entities_organization_searching"
    And the "description" "asset organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1
    Then I delete it
    Then I create it
    And response code should be: 201

  Scenario: I want to create a device
    Given the entity of type "devices builder" with "entities_organization_searching"
    And I get allowed Datastreams fields
    And I can found "provision.device.identifier" as datastream name
    When I try to define the entity with...
      | datastream                            | typeFunction | value                           | parent |
      | provision.administration.channel      | simple       | default_channel                 |        |
      | provision.administration.organization | simple       | entities_organization_searching |        |
      | provision.administration.serviceGroup | simple       | emptyServiceGroup               |        |
      | provision.device.identifier           | simple       | entity_ogapi_srch               |        |
      | provision.device.operationalStatus    | simple       | NORMAL                          |        |
      | provision.device.administrativeState  | simple       | ACTIVE                          |        |
    Then I create it
    And response code should be: 201


  Scenario: Execute searching with a invalid start limit
    And an ogapi "entities search" util
    And the start limit by "null" and size limit by "5"
    When I build it
    And I execute it
    Then response code should be: 200
    Then does not throws an error

  Scenario: Execute searching with a flattened response
    And an ogapi "entities search" util
    When I build it with flattened response
    And I execute it
    Then response code should be: 200
    Then does not throws an error

  Scenario: I want to obtain the summary
    And an ogapi "entities search" util
    When I build it with summary response
    And I execute it
    Then response code should be: 200
    Then does not throws an error

  Scenario: I want to download csv
    And an ogapi "entities search" util with "entities_organization_searching"
    When I add a filter and with
      | operator | key                                   | value                           |
      | eq       | provision.administration.organization | entities_organization_searching |

    When I build it with select...
      | datastreamId                         | fields                                   |
      | provision.device.administrativeState | [{"field" : "value", "alias": "state"} ] |
    And I download csv it
    Then response code should be: 200
    Then does not throws an error
    Then the content of file "search.csv" must be:
      """
      state
      ACTIVE

      """


  Scenario: I want to delete the entity
    Given the entity of type "devices builder" with "entities_organization_searching"
    When I try to define the entity with...
      | datastream                  | typeFunction | value             | parent |
      | provision.device.identifier | simple       | entity_ogapi_srch |        |
    And I delete it
    Then response code should be: 200
  Scenario: Deleting an organization
    Given an ogapi "organizations builder" util
    Then I want to delete an "organization"
    And the "name" "entities_organization_searching"
    Then I delete it
    And response code should be: 200