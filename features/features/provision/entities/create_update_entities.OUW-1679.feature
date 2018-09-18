# features/provision/entities/create_update_entities.OUW-1679.feature
@provision
@create_provision
@create_ticket
@ticket
@entities_provision
@create_delete_ticket
@OUW-1679
Feature: Create and update tickets with calculated datastreams
    As a user of JsApi
    I want to create and update a ticket
    So, I can solved the bug OUW-1679

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Creating an organization to use in create ticket
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "ticket_organization"
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
        Given the entity of type "asset builder" with "ticket_organization"
        And I get allowed Datastreams fields
        And I can found "provision.asset.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                              | parent |
            | provision.administration.channel      | simple       | default_channel                    |        |
            | provision.administration.organization | simple       | ticket_organization                |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup                  |        |
            | provision.asset.identifier            | simple       | assigned_6_ticket_bulk_json_simple |        |
        Then I delete it
        Then I create it
        And response code should be: 201


    Scenario: Create and update a ticket
        Given the entity of type "tickets builder" with "ticket_organization"
        Then I get allowed Datastreams fields
        And I can found "provision.administration.identifier" as datastream name
        And I can found "provision.administration.organization" as datastream name
        And I can found "provision.ticket.identifier" as datastream name
        And I can found "provision.ticket.name" as datastream name
        And I can found "provision.ticket.description" as datastream name
        And I can found "provision.ticket.label" as datastream name
        And I can found "provision.ticket.type" as datastream name
        And I can found "provision.ticket.severity" as datastream name
        And I can found "provision.ticket.priority" as datastream name
        And I can found "provision.ticket.reporter" as datastream name
        And I can found "provision.ticket.assignee" as datastream name
        And I can found "provision.ticket.status" as datastream name
        And I can found "provision.ticket.specificType" as datastream name
        And I can found "provision.ticket.section" as datastream name
        And I can found "provision.ticket.entity" as datastream name
        And I can found "provision.ticket.reporterDate" as datastream name
        And I can not found "provision.ticket.owner" as datastream name
        And I can not found "provision.ticket.creationDate" as datastream name
        And I can not found "provision.ticket.assignedDate" as datastream name
        And I can not found "provision.ticket.answeredDate" as datastream name
        And I can not found "provision.ticket.updatedDate" as datastream name
        And I can not found "provision.ticket.restorationDate" as datastream name
        And I can not found "provision.ticket.resolutionDate" as datastream name
        And I can not found "provision.ticket.closedDate" as datastream name

        When I try to define the ticket with...
            | datastream                            | typeFunction | value                              | parent |
            | provision.administration.organization | simple       | ticket_organization                |        |
            | provision.administration.identifier   | simple       | ticket_cucumber                    |        |
            | provision.ticket.name                 | simple       | ticket_cucumber                    |        |
            | provision.ticket.description          | simple       | TEST                               |        |
            | provision.ticket.type                 | simple       | INCIDENT                           |        |
            | provision.ticket.severity             | simple       | CRITICAL                           |        |
            | provision.ticket.priority             | simple       | CRITICAL                           |        |
            | provision.ticket.reporter             | simple       | assigned_6_ticket_bulk_json_simple |        |
            | provision.ticket.status               | simple       | CREATED                            |        |
            | provision.ticket.reporterDate         | simple       | 2017-12-15T11:06:29.179Z           |        |
        Then I delete it
        And I create it
        And response code should be: 201

        Given an ogapi "ticket finder" util
        And I want to read a "ticket"
        When I try to find by...
            | field        | content                         |
            | organization | ticket_organization             |
            | id           | from_location_previous_response |
            | flattened    | true                            |
        And response code should be: 200
        Given the entity of type "tickets builder" with "ticket_organization"
        When I try to define the ticket with GET previous flattened response
        And I update it
        Then response code should be: 200

    Scenario: I want to delete the ticket CREATED
        And an ogapi "ticket search" util with "ticket_organization"
        When I add a filter and with
            | operator | key                                   | value               |
            | eq       | provision.administration.organization | ticket_organization |
            | eq       | provision.ticket.name                 | ticket_cucumber     |
        When I build it
        And I execute it
        Then response code should be: 200
        Given the entity of type "tickets builder" with "ticket_organization"
        When I try to define the ticket with...
            | datastream                            | typeFunction | value               | parent |
            | provision.administration.organization | simple       | ticket_organization |        |
        When I try to define the datastream ticket "provision.ticket.identifier" with "provision.ticket.identifier._current.value" path of the previous response
        And I delete it
        Then response code should be: 200

    Scenario: I want to delete the entity
        Given the entity of type "asset builder" with "ticket_organization"
        When I try to define the entity with...
            | datastream                            | typeFunction | value                              | parent |
            | provision.administration.channel      | simple       | default_channel                    |        |
            | provision.administration.organization | simple       | ticket_organization                |        |
            | provision.asset.identifier            | simple       | assigned_6_ticket_bulk_json_simple |        |
        Then I delete it
        And response code should be: 200

    Scenario: Delete the organization
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "ticket_organization"
        Then I delete it
        And response code should be: 200
