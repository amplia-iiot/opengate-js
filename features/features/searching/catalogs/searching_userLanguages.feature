# features/searching/catalogs/searching_userLanguages.feature

@catalogs
@searching
@searching_userLanguages
Feature: Searching User Languages  provider in catalog
  As a user of JsApi
  I want to search into User Languages  provider catalog
  
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "User Languages search" util

  Scenario: Execute searching
    When I build it
  	And I execute it
    Then response code should be: 200
    And the result contains:
"""
{"userLanguages":[{"code":"es","language":"Español/Spanish"},{"code":"en","language":"Inglés/English"}]}
"""
