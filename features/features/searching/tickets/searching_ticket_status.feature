# features/searching/tickets/searching_ticket_status.feature

@ticket
@ticket_search
@ticket_status_search
@catalogs
@searching
Feature: Searching ticket status in catalog
  As a user of JsApi
  I want to search into ticket priority catalog
  
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "Ticket status search" util
    Given I want to search a "Ticket status"

  Scenario: Execute searching
    When I build it
  	And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"ticketStatus":["CREATED","ASSIGNED","ANSWERED","RESTORED","RESOLVED","CLOSED"]}
    """
