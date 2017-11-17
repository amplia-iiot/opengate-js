# features/create_organization.feature
@provision
@create_provision
@organizations
Feature: Create an organization 
  As a user of JsApi
  I want to create or delete an organization

  Background:
  Given an apikey user by "require-real-apikey"
  Given an ogapi "organizations builder" util
  Given I want to create a "organization"

  Scenario: Creating an organization without mandatory fields
   Then I create it
    And throws an error equal to "Parameters name, country code and lang code must be defined" 
  
  Scenario: Creating an organization with an invalid field
    And the "lang code" ""
   Then throws an error equal to "Lang code must be a string and cannot be empty" 

  Scenario: Creating an organization with invalid zoom
    And the "zoom" 21
    And throws an error equal to "Parameter zoom must be a number between 0 and 19" 
  
  Scenario: Creating an organization that NOT exists with all params
    And the "name" "JsApiFullOrganization"
    And the "description" "JsApi tests organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "plan" "BASIC"
    And the "only assigned domain certificates" false
    And the "location" with 1 and 1 
   Then I delete it
   Then I create it
    And response code should be: 201
   Then I delete it
    And response code should be: 200
  
  Scenario: Creating an organization that NOT exists with mandatory params
    And the "name" "JsApiPartialOrganization"
    And the "country code" "ES"
    And the "lang code" "es"
   Then I delete it
   Then I create it
    And response code should be: 201