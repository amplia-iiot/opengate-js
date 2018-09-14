# features/provision/entities/create_delete_ticket_bulk_json.feature
@provision
@create_provision
@tickets_provision
@bulk_ticket_json
@bulk_json
@bulk
@bulk_ticket
Feature: Delete and Create a ticket
  As a ticket of JsApi
  I want to create a ticket using json file
  So, I can create a new user with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"

  Scenario: Creating an organization to use in create ticket
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "organization_bulk"
    And the "description" "ticket organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1
    Then I delete it
    And I create it
    And response code should be: 201

  Scenario: I want to create an asset
    Given the entity of type "asset builder" with "organization_bulk"
    And I get allowed Datastreams fields
    And I can found "provision.asset.identifier" as datastream name
    When I try to define the entity with...
      | datastream                            | typeFunction | value                          | parent |
      | provision.administration.channel      | simple       | default_channel                |        |
      | provision.administration.organization | simple       | organization_bulk              |        |
      | provision.administration.serviceGroup | simple       | emptyServiceGroup              |        |
      | provision.asset.identifier            | simple       | reprtr_ticket_bulk_json_simple |        |
    Then I delete it
    Then I create it
    And response code should be: 201

  Scenario: I want to create an asset
    Given the entity of type "asset builder" with "organization_bulk"
    And I get allowed Datastreams fields
    And I can found "provision.asset.identifier" as datastream name
    When I try to define the entity with...
      | datastream                            | typeFunction | value                         | parent |
      | provision.administration.channel      | simple       | default_channel               |        |
      | provision.administration.organization | simple       | organization_bulk             |        |
      | provision.administration.serviceGroup | simple       | emptyServiceGroup             |        |
      | provision.asset.identifier            | simple       | assgn_ticket_bulk_json_simple |        |
    Then I delete it
    Then I create it
    And response code should be: 201

  Scenario: Create and delete a device that not exists
    Given the entity of type "devices builder" with "organization_bulk"
    Then I get allowed Datastreams fields
    And I can found "provision.device.identifier" as datastream name
    When I try to define the entity with...
      | datastream                            | typeFunction | value                        | parent |
      | provision.administration.channel      | simple       | default_channel              |        |
      | provision.administration.organization | simple       | organization_bulk            |        |
      | provision.administration.serviceGroup | simple       | emptyServiceGroup            |        |
      | provision.device.identifier           | simple       | entt_ticket_bulk_json_simple |        |
    Then I delete it
    And I create it
    And response code should be: 201

  #No se puede desglosar en mas escenarios debido a que de esta manera se puede compartir la información
  #de respuesta entre cada una de las definiciones de los steps
  #y así poder recuperar el id del ticket (autogenerado) de forma sencilla
  Scenario: I want to create update and delete a ticket from json file
    Given an ogapi "json bulk builder" util with "organization_bulk" and "tickets"
    And I read the file from "/file_test/bulk_simple_tickets.json" for provision tickets
    And I "create" it with bulk
    Then does not throws an error
    Given an ogapi "json bulk builder" util with "organization_bulk" and "tickets"
    And I read the file from "/file_test/bulk_simple_tickets.json" for provision tickets
    And I "update" it with bulk
    Then does not throws an error
    Given an ogapi "json bulk builder" util with "organization_bulk" and "tickets"
    And I read the file from "/file_test/bulk_simple_tickets.json" for provision tickets
    And I "delete" it with bulk
    And response code should be: 200


  Scenario: I want to delete the entity
    Given the entity of type "asset builder" with "organization_bulk"
    When I try to define the entity with...
      | datastream                            | typeFunction | value                          | parent |
      | provision.administration.channel      | simple       | default_channel                |        |
      | provision.administration.organization | simple       | organization_bulk              |        |
      | provision.asset.identifier            | simple       | reprtr_ticket_bulk_json_simple |        |
    Then I delete it

  Scenario: I want to delete the entity
    Given the entity of type "asset builder" with "organization_bulk"
    When I try to define the entity with...
      | datastream                            | typeFunction | value                         | parent |
      | provision.administration.channel      | simple       | default_channel               |        |
      | provision.administration.organization | simple       | organization_bulk             |        |
      | provision.asset.identifier            | simple       | assgn_ticket_bulk_json_simple |        |
    Then I delete it
  Scenario: I want to delete the entity
    Given the entity of type "devices builder" with "organization_bulk"
    When I try to define the entity with...
      | datastream                            | typeFunction | value                        | parent |
      | provision.administration.channel      | simple       | default_channel              |        |
      | provision.administration.organization | simple       | organization_bulk            |        |
      | provision.device.identifier           | simple       | entt_ticket_bulk_json_simple |        |
    Then I delete it

  Scenario: Delete the organization
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "organization_bulk"
    Then I delete it
    And response code should be: 200