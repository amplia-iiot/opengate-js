# features/searching/entities/searching_tickets.feature
@searching
@searching_tickets
@ticket
@download_csv
@csv
Feature: Searching tickets
  As a user of JsApi
  I want to search into tickets collection
  So I can add filter, sorting, limit, select to search any device

  Background:
    Given an apikey user by "require-real-apikey"


  Scenario: Execute searching with a timeout less than expected
    And an ogapi "ticket search" util
    And the timeout by 10
    When I build it
    And I execute it
    Then response code should be: 408

  Scenario: Creating an organization to use in create device
    Given an ogapi "organizations builder" util
    Then I want to create an "organization"
    And the "name" "ticket_organization_searching"
    And the "description" "ticket organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1
    Then I create it
    And response code should be: 201

  Scenario: I want to create an asset to asociate it with the ticket
    Given the entity of type "asset builder" with "ticket_organization_searching"
    And I get allowed Datastreams fields
    And I can found "provision.asset.identifier" as datastream name
    When I try to define the entity with...
      | datastream                            | typeFunction | value                         | parent |
      | provision.administration.channel      | simple       | default_channel               |        |
      | provision.administration.organization | simple       | ticket_organization_searching |        |
      | provision.administration.serviceGroup | simple       | emptyServiceGroup             |        |
      | provision.asset.identifier            | simple       | asset_to_ticket               |        |
    Then I delete it
    Then I create it
    And response code should be: 201


  Scenario: I want to create a ticket
    Given the entity of type "tickets builder" with "ticket_organization_searching"
    Then I get allowed Datastreams fields
    And I can found "provision.ticket.description" as datastream name
    When I try to define the ticket with...
      | datastream                            | typeFunction | value                         | parent |
      | provision.administration.organization | simple       | ticket_organization_searching |        |
      | provision.administration.identifier   | simple       | ticket_cucumber               |        |
      | provision.ticket.name                 | simple       | ticket_cucumber_search        |        |
      | provision.ticket.description          | simple       | TEST                          |        |
      | provision.ticket.type                 | simple       | INCIDENT                      |        |
      | provision.ticket.severity             | simple       | CRITICAL                      |        |
      | provision.ticket.priority             | simple       | CRITICAL                      |        |
      | provision.ticket.reporter             | simple       | asset_to_ticket               |        |
      | provision.ticket.status               | simple       | CREATED                       |        |
      | provision.ticket.reporterDate         | simple       | 2018-02-15T11:06:29.179Z      |        |
    Then I delete it
    And I create it
    And response code should be: 201

  Scenario: Execute searching with a invalid start limit
    And an ogapi "ticket search" util
    And the start limit by "null" and size limit by "5"
    When I build it
    And I execute it
    Then response code should be: 200
    Then does not throws an error

  Scenario: Execute searching with a flattened response
    And an ogapi "ticket search" util
    When I build it with flattened response
    And I execute it
    Then response code should be: 200
    Then does not throws an error

  Scenario: I want to obtain the summary
    And an ogapi "ticket search" util
    When I build it with summary response
    And I execute it
    Then response code should be: 200
    Then does not throws an error

  Scenario: I want to download csv
    And an ogapi "ticket search" util with "ticket_organization_searching"
    When I add a filter and with
      | operator | key                                   | value                         |
      | eq       | provision.administration.organization | ticket_organization_searching |
      | eq       | provision.ticket.name                 | ticket_cucumber_search        |

    When I build it with select...
      | datastreamId          | fields                                  |
      | provision.ticket.name | [{"field" : "value", "alias": "name"} ] |

    And I download csv it
    Then response code should be: 200
    Then does not throws an error
    Then the content of file "search.csv" must be:
      """
      name
      ticket_cucumber_search

      """

  Scenario: I want to delete the ticket CREATED
    And an ogapi "ticket search" util with "ticket_organization_searching"
    When I add a filter and with
      | operator | key                                   | value                         |
      | eq       | provision.administration.organization | ticket_organization_searching |
      | eq       | provision.ticket.name                 | ticket_cucumber_search        |
    When I build it
    And I execute it
    Then response code should be: 200
    Given the entity of type "tickets builder" with "ticket_organization_searching"
    When I try to define the ticket with...
      | datastream                            | typeFunction | value                         | parent |
      | provision.administration.organization | simple       | ticket_organization_searching |        |
    When I try to define the datastream ticket "provision.ticket.identifier" with "provision.ticket.identifier._current.value" path of the previous response
    And I delete it
    Then response code should be: 200


  Scenario: I want to delete the entity
    Given the entity of type "asset builder" with "ticket_organization_searching"
    When I try to define the entity with...
      | datastream                 | typeFunction | value           | parent |
      | provision.asset.identifier | simple       | asset_to_ticket |        |
    And I delete it
    Then response code should be: 200


  Scenario: Deleting an organization to use in create device
    Given an ogapi "organizations builder" util
    Then I want to delete an "organization"
    And the "name" "ticket_organization_searching"
    Then I delete it