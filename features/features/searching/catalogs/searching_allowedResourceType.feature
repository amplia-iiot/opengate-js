# features/searching/catalogs/searching_allowedResourceType.feature

@catalogs
@searching
@searching_allowedResourceType
@allowedResourceType
Feature: Searching Allowed Resource Type provider in catalog
  As a user of JsApi
  I want to search into Allowed Resource Type provider catalog
  
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "Allowed Resource Type search" util

  Scenario: Execute searching
    When I build it
  	And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"allowedResourceType":["entity.asset","entity.device","entity.subscriber","entity.subscription","ticket","organization","channel"]}
    """
