# features/searching/tickets/searching_ticket_priority.feature

@ticket
@ticket_search
@ticket_priority_search
@catalogs
@searching
@OUW-1807
Feature: Searching ticket priority in catalog
  As a user of JsApi
  I want to search into ticket priority catalog
  
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "Ticket priority search" util
    Given I want to search a "Ticket priority"

  Scenario: Execute searching
    When I build it
  	And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"ticketPriority":["MAJOR","MINOR","CRITICAL","BLOCKER"]}
    """
