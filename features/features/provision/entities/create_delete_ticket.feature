# features/provision/entities/create_delete_ticket.feature
@provision
@create_provision
@create_ticket
@ticket
@entities_provision
@create_delete_ticket
@OUW-1750
@OUW-1807
@urlParameters

Feature: Delete and Create a ticket
    As a user of JsApi
    I want to create a ticket
    So, I can create a new ticket with the parametres that I have been defined

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Creating an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "orticket_organization_10"
        And the "description" "device organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        And I create it
        And response code should be: 201


    Scenario: Create and delete a device that not exists
        Given the entity of type "devices builder" with "orticket_organization_10"
        Then I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                                | parent |
            | provision.administration.channel      | simple       | default_channel                      |        |
            | provision.administration.organization | simple       | orticket_organization_10             |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup                    |        |
            | provision.administration.defaultFeed  | simple       | feed_1                               |        |
            | provision.device.identifier           | simple       | device_ticket_testing_cucumber_ogapi |        |
            | provision.device.operationalStatus    | simple       | TEST                                 |        |
            | provision.device.serialNumber         | simple       | serialNumber_TEST                    |        |
            | provision.device.administrativeState  | simple       | TESTING                              |        |
            | provision.device.name                 | simple       | OGUX Device GATEWAY tester           |        |
            | provision.device.specificType         | simple       | CONCENTRATOR                         |        |
        Then I delete it
        And I create it
        And response code should be: 201
        When I wait 10 seconds

    Scenario: Create and delete a ticket that not exists
        Given the entity of type "tickets builder" with "orticket_organization_10"
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
        And I can found "provision.ticket.parentTicket" as datastream name
        And I can found "provision.ticket.isOnSLA" as datastream name
        And I can not found "provision.ticket.assignationTime" as datastream name
        And I can not found "provision.ticket.answeringTime" as datastream name
        And I can not found "provision.ticket.restorationTime" as datastream name
        And I can not found "provision.ticket.resolutionTime" as datastream name
        And I can not found "provision.ticket.closedDate" as datastream name
        And I can not found "provision.ticket.confirmationTime" as datastream name


        When I try to define the ticket with...
            | datastream                            | typeFunction | value                                | parent |
            | provision.administration.organization | simple       | orticket_organization_10             |        |
            | provision.administration.identifier   | simple       | ticket_cucumber                      |        |
            | provision.ticket.name                 | simple       | ticket_cucumber                      |        |
            | provision.ticket.description          | simple       | TEST                                 |        |
            | provision.ticket.type                 | simple       | TEST                                 |        |
            | provision.ticket.severity             | simple       | CRITICAL                             |        |
            | provision.ticket.priority             | simple       | CRITICAL                             |        |
            | provision.ticket.reporter             | simple       | device_ticket_testing_cucumber_ogapi |        |
            | provision.ticket.status               | simple       | CREATED                              |        |
            | provision.ticket.reporterDate         | simple       | 2017-12-15T11:06:29.179Z             |        |
            | provision.ticket.specificType         | simple       | WORKORDER                            |        |
        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: I want to delete the ticket CREATED
        And an ogapi "ticket search" util with "orticket_organization_10"
        When I add a filter and with
            | operator | key                                   | value                    |
            | eq       | provision.administration.organization | orticket_organization_10 |
            | eq       | provision.ticket.name                 | ticket_cucumber          |
        When I build it
        And I execute it
        Then response code should be: 200
        Given the entity of type "tickets builder" with "orticket_organization_10"
        When I try to define the ticket with...
            | datastream                            | typeFunction | value                    | parent |
            | provision.administration.organization | simple       | orticket_organization_10 |        |
        When I try to define the datastream ticket "provision.ticket.identifier" with "provision.ticket.identifier._current.value" path of the previous response
        And I delete it
        Then response code should be: 200

    Scenario: I want to delete the entity
        Given the entity of type "devices builder" with "orticket_organization_10"
        When I try to define the entity with...
            | datastream                            | typeFunction | value                                | parent |
            | provision.administration.channel      | simple       | default_channel                      |        |
            | provision.administration.organization | simple       | orticket_organization_10             |        |
            | provision.device.identifier           | simple       | device_ticket_testing_cucumber_ogapi |        |
        Then I delete it

    Scenario: Deleting an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "orticket_organization_10"
        Then I delete it
