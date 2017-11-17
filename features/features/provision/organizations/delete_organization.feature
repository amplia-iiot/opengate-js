# features/delete_organization.feature
@provision
@delete_provision
@organizations
Feature: Delete an organization 
  As a user of JsApi
  I want to delete an organization

  Background:
  Given an apikey user by "require-real-apikey"
  Given an ogapi "organizations builder" util

Scenario: Try to deleting an organization
  Given I want to delete a "organization"
    And the "name" "JsApiFullOrganization"
   Then I delete it

  Scenario: Deleting an organization that exists
  Given I want to create a "organization"
    And the "name" "JsApiFullOrganization"
    And the "description" "JsApi tests organization"
    And the "country code" "ES"
    And the "lang code" "es"
    And the "time zone" "Europe/Andorra"
    And the "zoom" 10
    And the "location" with 1 and 1 
   Then I create it
    And response code should be: 201
    And I want to delete a "organization"
    And the "name" "JsApiFullOrganization"
   Then I delete it
   Then response code should be: 200
 
 Scenario: Try to deleting an organization
  Given I want to delete a "organization"
    And the "name" "JsApiPartialOrganization"
   Then I delete it

 Scenario: Deleting an organization that exists from previous tests
  Given I want to create a "organization"
    And the "name" "JsApiPartialOrganization"
    And the "country code" "ES"
    And the "lang code" "es"
   Then I create it
    And response code should be: 201
    And I want to delete a "organization"
    And the "name" "JsApiPartialOrganization"
   Then I delete it
   Then response code should be: 200
  
  Scenario: Deleting an organization that not exists
  Given I want to delete a "organization"
    And the "name" "JsApi not existing organization"
   Then I delete it
   Then response code should be: 400
