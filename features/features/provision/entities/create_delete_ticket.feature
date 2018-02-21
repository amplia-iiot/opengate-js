# features/provision/entities/create_delete_ticket.feature
@provision
@create_provision
@create_ticket
@entities_provision
@create_delete_ticket
Feature: Delete and Create a device
As a device of JsApi
I want to create an device
So, I can create a new ticket with the parametres that I have been defined

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Creating an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "ticket_organization"
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
        Given the entity of type "devices builder" with "ticket_organization"
        Then I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                                       | parent |
            | provision.administration.channel      | simple       | default_channel                             |        |
            | provision.administration.organization | simple       | ticket_organization                         |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup                           |        |
            | provision.administration.defaultFeed  | simple       | feed_1                                      |        |
            | provision.device.identifier           | simple       | device_ticket_testing_cucumber_ogapi        |        |
            | provision.device.operationalStatus    | simple       | TEST                                        |        |
            | provision.device.serialNumber         | simple       | serialNumber_TEST                           |        |
            | provision.device.administrativeState  | simple       | TESTING                                     |        |
            | provision.device.name                 | simple       | OGUX Device GATEWAY tester                  |        |
            | provision.device.specificType         | simple       | CONCENTRATOR                                |        |
        Then I delete it
        And I create it
        And response code should be: 201
         When I wait 20 seconds

    Scenario: Create and delete a ticket that not exists
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
        And I can found "provision.ticket.owner" as datastream name
        And I can found "provision.ticket.assignee" as datastream name
        And I can found "provision.ticket.status" as datastream name
        And I can found "provision.ticket.specificType" as datastream name
        And I can found "provision.ticket.section" as datastream name
        And I can found "provision.ticket.entity" as datastream name
        And I can found "provision.ticket.creationDate" as datastream name
        And I can found "provision.ticket.reporterDate" as datastream name
        And I can found "provision.ticket.assignedDate" as datastream name
        And I can found "provision.ticket.answeredDate" as datastream name
        And I can found "provision.ticket.updatedDate" as datastream name
        And I can found "provision.ticket.restorationDate" as datastream name
        And I can found "provision.ticket.resolutionDate" as datastream name
        And I can found "provision.ticket.closedDate" as datastream name

        When I try to define the ticket with...
            | datastream                            | typeFunction | value                                       | parent |
            | provision.administration.organization | simple       | ticket_organization                         |        |
            | provision.administration.identifier   | simple       | ticket_cucumber                             |        |
            | provision.ticket.name                 | simple       | ticket_cucumber                             |        |
            | provision.ticket.description          | simple       | TEST                                        |        |
            | provision.ticket.type                 | simple       | INCIDENT                                    |        |
            | provision.ticket.severity             | simple       | CRITICAL                                    |        |
            | provision.ticket.priority             | simple       | CRITICAL                                    |        |
            | provision.ticket.reporter             | simple       | device_ticket_testing_cucumber_ogapi        |        |
            | provision.ticket.status               | simple       | CREATED                                     |        |
            | provision.ticket.reporterDate         | simple       | 2017-12-15T11:06:29.179Z                    |        |
        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: I want to delete the ticket
        Given the entity of type "devices builder" with "ticket_organization"
        When I try to define the entity with...
            | datastream                            | typeFunction | value                         | parent |
            | provision.administration.channel      | simple       | default_channel               |        |
            | provision.administration.organization | simple       | ticket_organization           |        |
            | provision.device.identifier           | simple       | device_ticket_testing_cucumber_ogapi |        |
        Then I delete it

    Scenario: I want to delete the entity
        Given the entity of type "devices builder" with "ticket_organization"
        When I try to define the entity with...
            | datastream                            | typeFunction | value                         | parent |
            | provision.administration.channel      | simple       | default_channel               |        |
            | provision.administration.organization | simple       | ticket_organization           |        |
            | provision.device.identifier           | simple       | device_ticket_testing_cucumber_ogapi |        |
        Then I delete it

    Scenario: Deleting an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "ticket_organization"
        Then I delete it