# features/create_delete_workgroupRelations.feature
@provision
@create_provision
@workgroupRelations
@workgroup
@create_workgroupRelations
Feature: Delete and Create a workgroupRelations
  As a user of JsApi
  I want to create a workgroupRelations
  So, I can create a new workgroup relation with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"

    Scenario: Creating an organization to use in create device
      Given an ogapi "organizations builder" util
      Then I want to create an "organization"
      And the "name" "workgroupRelations_organization"
      And the "description" "workgroup Relations organization"
      And the "country code" "ES"
      And the "lang code" "es"
      And the "time zone" "Europe/Andorra"
      And the "zoom" 10
      And the "location" with 1 and 1 
      And the "plan" "TRIAL"
      Then I delete it
      And I create it
      And response code should be: 201
  
   Scenario: Create workgroup Relations with incomplete parameters
    And an ogapi "workgroup relations builder" util 
    And I want to create a "workgroup relations"
    Then I create it
    And throws an error equal to "There are required parameters that have not been set. Missing parameters: [workgroup,channels]" 
  
    
  Scenario: Create and delete a workgroup Relations that does not exist
    Given an ogapi "workgroups builder" util as "workgroupRelations"
    Then I want to create a "workgroup"
    And the "domain name" "workgroupRelations_organization" on util "workgroupRelations"
    And the "name" "workgroupRelations_organization" on util "workgroupRelations"
    Given an ogapi "channels builder" util as "channel_workgroupRelations"
    Then I want to create a "channel"
    And the "organization" "workgroupRelations_organization" on util "channel_workgroupRelations"
    And the "name" "default_channel" on util "channel_workgroupRelations"

    Given an ogapi "workgroup relations builder" util 
    Then I want to create a "workgroup relations"
    Then the util "workgroupRelations" into "workgroup"
    Then the util "channel_workgroupRelations" into "channel"
    Then I create it
    And response code should be: 201
    And I delete it
    Then response code should be: 200

  
  Scenario: Create twice and delete twice with error in the second delete workgroupRelations
    Given an ogapi "workgroups builder" util as "workgroupRelations"
    Then I want to create a "workgroup"
    And the "domain name" "workgroupRelations_organization" on util "workgroupRelations"
    And the "name" "workgroupRelations_organization" on util "workgroupRelations"
    Given an ogapi "channels builder" util as "channel_workgroupRelations"
    Then I want to create a "channel"
    And the "organization" "workgroupRelations_organization" on util "channel_workgroupRelations"
    And the "name" "default_channel" on util "channel_workgroupRelations"
    Given an ogapi "workgroup relations builder" util 
    Then I want to create a "workgroup relations"
    Then the util "workgroupRelations" into "workgroup"
    Then the util "channel_workgroupRelations" into "channel"
    Then I create it
    And response code should be: 201
    Then I create it
    And response code should be: 201
    And I delete it
    Then response code should be: 200
    And I delete it
    Then response code should be: 400
    Then I create it
    And response code should be: 201
  
  Scenario: Create workgroupRelations that does not exist
    Given an ogapi "workgroups builder" util as "workgroupRelations"
    Then I want to create a "workgroup"
    And the "domain name" "workgroupRelations_organization" on util "workgroupRelations"
    And the "name" "workgroupRelations_organization" on util "workgroupRelations"
    Given an ogapi "channels builder" util as "channel_workgroupRelations"
    Then I want to create a "channel"
    And the "organization" "workgroupRelations_organization" on util "channel_workgroupRelations"
    And the "name" "default_channel" on util "channel_workgroupRelations"
    Given an ogapi "workgroup relations builder" util 
    Then I want to create a "workgroup relations"
    Then the util "workgroupRelations" into "workgroup"
    Then the util "channel_workgroupRelations" into "channel"
    Then I create it
    And response code should be: 201

    Scenario: Delete the organization
      Given an ogapi "organizations builder" util
      Then I want to create an "organization"
      And the "name" "workgroupRelations_organization"
      Then I delete it
      And response code should be: 200