# features/provision/entities/create_update_entities.OUW-1873.feature
@provision
@create_provision
@entities_provision
@OUW-1873
@entity_finder
@urlParameters

Feature: Create and update subscription and ticket on mode no flattened
    As a user of JsApi
    I want to create and update a subscription and ticket on mode no flattened
    So, I can solved the bug OUW-1873

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Creating an organization to use in create subscription and ticket
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "organization_1873_10"
        And the "description" "subscription organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: Create subscription
        Given the entity of type "subscriptions builder" with "organization_1873_10"
        Then I get allowed Datastreams fields
        And I can found "provision.device.communicationModules[].subscription.identifier" as datastream name
        When I try to define the entity with...
            | datastream                                                               | typeFunction | value                | parent |
            | provision.administration.channel                                         | simple       | default_channel      |        |
            | provision.administration.organization                                    | simple       | organization_1873_10 |        |
            | provision.administration.serviceGroup                                    | simple       | emptyServiceGroup    |        |
            | provision.device.communicationModules[].subscription.administrativeState | simple       | ACTIVE               |        |
            | provision.device.communicationModules[].subscription.identifier          | simple       | tsubscription_1873   |        |
        Then I delete it
        Then I create it
        And response code should be: 201


    Scenario: Update a subscription from no flattened
        Given an ogapi "entity finder" util
        And I want to read a "subscription"
        When I try to find by...
            | field        | content              |
            | organization | organization_1873_10 |
            | id           | tsubscription_1873   |
        And response code should be: 200
        Given the entity of type "subscriptions builder" with "organization_1873_10"
        When I try to define the entity with GET previous json response
        When I try to define the entity with...
            | datastream                                                        | typeFunction | value                   | parent |
            | provision.device.communicationModules[].subscription.specificType | simple       | ADSL                    |        |
            | provision.device.communicationModules[].subscription.name         | simple       | subscription_ogapi name |        |
        And I update it
        Then response code should be: 200

    Scenario: I want to delete the subscription
        Given an ogapi "entity finder" util
        And I want to read a "subscription"
        When I try to find by...
            | field        | content              |
            | organization | organization_1873_10 |
            | id           | tsubscription_1873   |
        And response code should be: 200
        Given the entity of type "subscriptions builder" with "organization_1873_10"
        When I try to define the entity with GET previous json response
        And I delete it
        Then response code should be: 200


    Scenario: I want to create an asset
        Given the entity of type "asset builder" with "organization_1873_10"
        And I get allowed Datastreams fields
        And I can found "provision.asset.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                | parent |
            | provision.administration.channel      | simple       | default_channel      |        |
            | provision.administration.organization | simple       | organization_1873_10 |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup    |        |
            | provision.asset.identifier            | simple       | asset_1873           |        |
        Then I delete it
        Then I create it
        And response code should be: 201

    Scenario: Create and update a ticket from no flattened
        Given the entity of type "tickets builder" with "organization_1873_10"

        When I try to define the ticket with...
            | datastream                            | typeFunction | value                    | parent |
            | provision.administration.organization | simple       | organization_1873_10     |        |
            | provision.administration.identifier   | simple       | ticket_1873              |        |
            | provision.ticket.name                 | simple       | ticket_1873              |        |
            | provision.ticket.description          | simple       | TEST                     |        |
            | provision.ticket.type                 | simple       | TEST                     |        |
            | provision.ticket.severity             | simple       | CRITICAL                 |        |
            | provision.ticket.priority             | simple       | CRITICAL                 |        |
            | provision.ticket.reporter             | simple       | asset_1873               |        |
            | provision.ticket.status               | simple       | CREATED                  |        |
            | provision.ticket.reporterDate         | simple       | 2017-12-15T11:06:29.179Z |        |
            | provision.ticket.specificType         | simple       | WORKORDER                |        |
        Then I delete it
        And I create it
        And response code should be: 201

        Given an ogapi "ticket finder" util
        And I want to read a "ticket"
        When I try to find by...
            | field        | content                         |
            | organization | organization_1873_10            |
            | id           | from_location_previous_response |
        And response code should be: 200
        Given the entity of type "tickets builder" with "organization_1873_10"
        When I try to define the ticket with GET previous json response
        And I update it
        Then response code should be: 200


    Scenario: I want to delete the ticket CREATED
        And an ogapi "ticket search" util with "organization_1873_10"
        When I add a filter and with
            | operator | key                                   | value                |
            | eq       | provision.administration.organization | organization_1873_10 |
            | eq       | provision.ticket.name                 | ticket_1873          |
        When I build it
        And I execute it
        Then response code should be: 200
        Given the entity of type "tickets builder" with "organization_1873_10"
        When I try to define the ticket with...
            | datastream                            | typeFunction | value                | parent |
            | provision.administration.organization | simple       | organization_1873_10 |        |
        When I try to define the datastream ticket "provision.ticket.identifier" with "provision.ticket.identifier._current.value" path of the previous response
        And I delete it
        Then response code should be: 200

    Scenario: I want to delete the entity
        Given the entity of type "asset builder" with "organization_1873_10"
        When I try to define the entity with...
            | datastream                            | typeFunction | value                | parent |
            | provision.administration.organization | simple       | organization_1873_10 |        |
            | provision.asset.identifier            | simple       | asset_1873           |        |
        Then I delete it
        And response code should be: 200

    Scenario: Delete the organization
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "organization_1873_10"
        Then I delete it
        And response code should be: 200
