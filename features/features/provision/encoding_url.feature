# features/encoding_url.feature

@encoding
Feature: Create an organization with a name that contains special characters
  As a user of JsApi
  I want to create and delete an organization with name that contains special characters

  Background:
    Given an apikey user by "require-real-apikey"
    Given an ogapi "organizations builder" util
    Given I want to create a "organization"

  Scenario: Creating an organization that NOT exists with all params
   Given the "name" "mi@organization"
    And the "description" "JsApi tests organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
	And the "zoom" 10
    And the "location" with 1 and 1  	
    Then I create it
 	And response code should be: 201
    And I delete it
 	And response code should be: 200
  