# features/find_organization.feature
@provision
@finder
@find_provision
@organizations
Feature: Find an organization 
  As a user of JsApi
  I want to find an organization
  So I can check if a organization exists and get their information

  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "organization finder" util
    And I want to read a "organization"

   Scenario: Find an organization that exists
    When I try to find by...
      | field  | content                |
      | name   | base_organization |
     Then I can see into the result an "organization name" as "base_organization"

  Scenario: Find an organization that not exists
   # And the "name" "organization_inventada"
 	When I try to find by... 
  	| field   | content            |
 	  | name    | organization_inventada |
    Then response code should be: 404  

  Scenario: Find an organizations by domain and workgroup
    When I try to find by...
      | field  | content                |
      | domain   | root |
      | workgroup   | root |
    Then response code should be: 200  
