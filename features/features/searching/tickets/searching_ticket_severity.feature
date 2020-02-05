# features/searching/tickets/searching_ticket_severity.feature

@ticket
@ticket_search
@ticket_severity_search
@catalogs
@searching
@OUW-1807
Feature: Searching ticket severity in catalog
  As a user of JsApi
  I want to search into ticket severity catalog
  
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "Ticket severity search" util
    Given I want to search a "Ticket severity"

  Scenario: Execute searching
    When I build it
  	And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"ticketSeverity":["CRITICAL","URGENT","WARNING","NORMAL"]}
    """
