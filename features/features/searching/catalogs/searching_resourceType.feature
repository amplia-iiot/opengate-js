# features/searching/catalogs/searching_resourceType.feature

@catalogs
@searching
@searching_resourceType

Feature: Searching Resource Type provider in catalog
  As a user of JsApi
  I want to search into Resource Type provider catalog
  
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "Resource Type search" util

  Scenario: Execute searching
    When I build it
  	And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"resourceType":[{"identifier":"entity.asset"},{"identifier":"entity.device"},{"identifier":"entity.subscriber"},{"identifier":"entity.subscription"},{"identifier":"ticket"}]}
    """
