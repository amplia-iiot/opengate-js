# features/provision/entities/create_delete_2tickets_bulk_json.feature
@provision
@create_provision
@tickets_provision
@bulk_ticket_json
@bulk_json
@bulk
@bulk_ticket
@OUW-1750
@OUW-1807
@urlParameters

Feature: Delete and Create a ticket
  As a ticket of JsApi
  I want to create a ticket using json file
  So, I can create a new user with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"

  Scenario: Creating an organization to use in create ticket
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "organization_bulk_10"
    And the "description" "ticket organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1
    And the "plan" "TRIAL"
    Then I delete it
    And I create it
    And response code should be: 201

  Scenario: I want to create an asset
    Given the entity of type "asset builder" with "organization_bulk_10"
    And I get allowed Datastreams fields
    And I can found "provision.asset.identifier" as datastream name
    When I try to define the entity with...
      | datastream                            | typeFunction | value                          | parent |
      | provision.administration.channel      | simple       | default_channel                |        |
      | provision.administration.organization | simple       | organization_bulk_10           |        |
      | provision.administration.serviceGroup | simple       | emptyServiceGroup              |        |
      | provision.asset.identifier            | simple       | reprtr_ticket_bulk_json_simple |        |
    Then I delete it
    Then I create it
    And response code should be: 201

  Scenario: I want to create an asset
    Given the entity of type "asset builder" with "organization_bulk_10"
    And I get allowed Datastreams fields
    And I can found "provision.asset.identifier" as datastream name
    When I try to define the entity with...
      | datastream                            | typeFunction | value                         | parent |
      | provision.administration.channel      | simple       | default_channel               |        |
      | provision.administration.organization | simple       | organization_bulk_10          |        |
      | provision.administration.serviceGroup | simple       | emptyServiceGroup             |        |
      | provision.asset.identifier            | simple       | assgn_ticket_bulk_json_simple |        |
    Then I delete it
    Then I create it
    And response code should be: 201

  Scenario: Create and delete a device that not exists
    Given the entity of type "devices builder" with "organization_bulk_10"
    Then I get allowed Datastreams fields
    And I can found "provision.device.identifier" as datastream name
    When I try to define the entity with...
      | datastream                            | typeFunction | value                        | parent |
      | provision.administration.channel      | simple       | default_channel              |        |
      | provision.administration.organization | simple       | organization_bulk_10         |        |
      | provision.administration.serviceGroup | simple       | emptyServiceGroup            |        |
      | provision.device.identifier           | simple       | entt_ticket_bulk_json_simple |        |
    Then I delete it
    And I create it
    And response code should be: 201

  #No se puede desglosar en mas escenarios debido a que de esta manera se puede compartir la información
  #de respuesta entre cada una de las definiciones de los steps
  #y así poder recuperar el id del ticket (autogenerado) de forma sencilla
  Scenario: I want to create a ticket from json file
    Given an ogapi "json bulk builder" util with "organization_bulk_10" and "tickets"
    And I read the file from "/file_test/bulk_double_tickets.json" for provision tickets
    And I "create" it with bulk
    Then does not throws an error
    Given an ogapi "json bulk builder" util with "organization_bulk_10" and "tickets"
    And I read the file from "/file_test/bulk_double_tickets.json" for provision tickets
    And I "create" it with bulk
    Then does not throws an error
    Given an ogapi "json bulk builder" util with "organization_bulk_10" and "tickets"
    And I read the file from "/file_test/bulk_double_tickets.json" for provision tickets
    And I "update" it with bulk
    Then does not throws an error

  Scenario: I want to delete a ticket from json file
    Given an ogapi "json bulk builder" util with "organization_bulk_10" and "tickets"
    And I read the file from "/file_test/bulk_double_tickets.json"
    And I "deleteAll" it with bulk
    And response code should be: 200

  Scenario: I want to delete the entity
    Given the entity of type "asset builder" with "organization_bulk_10"
    When I try to define the entity with...
      | datastream                            | typeFunction | value                          | parent |
      | provision.administration.channel      | simple       | default_channel                |        |
      | provision.administration.organization | simple       | organization_bulk_10           |        |
      | provision.asset.identifier            | simple       | reprtr_ticket_bulk_json_simple |        |
    Then I delete it

  Scenario: I want to delete the entity
    Given the entity of type "asset builder" with "organization_bulk_10"
    When I try to define the entity with...
      | datastream                            | typeFunction | value                         | parent |
      | provision.administration.channel      | simple       | default_channel               |        |
      | provision.administration.organization | simple       | organization_bulk_10          |        |
      | provision.asset.identifier            | simple       | assgn_ticket_bulk_json_simple |        |
    Then I delete it
  Scenario: I want to delete the entity
    Given the entity of type "devices builder" with "organization_bulk_10"
    When I try to define the entity with...
      | datastream                            | typeFunction | value                        | parent |
      | provision.administration.channel      | simple       | default_channel              |        |
      | provision.administration.organization | simple       | organization_bulk_10         |        |
      | provision.device.identifier           | simple       | entt_ticket_bulk_json_simple |        |
    Then I delete it

  Scenario: Delete the organization
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "organization_bulk_10"
    Then I delete it
    And response code should be: 200