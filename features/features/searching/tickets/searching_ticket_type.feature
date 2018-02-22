#features/searching/tickets/searching_ticket_type.feature

@ticket
@ticket_search
@ticket_type_search
@catalogs
@searching
Feature: Searching ticket type in catalog
  As a user of JsApi
  I want to search into ticket type catalog
  
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "Ticket type search" util
    Given I want to search a "Ticket type"

  Scenario: Execute searching
    When I build it
  	And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"ticketType":["WORKORDER","INCIDENT"]}
    """
