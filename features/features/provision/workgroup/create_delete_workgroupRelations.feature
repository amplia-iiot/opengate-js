# features/create_delete_workgroupRelations.feature

@create_provision
@workgroupRelations
Feature: Delete and Create a workgroupRelations
  As a user of JsApi
  I want to create a workgroupRelations
  So, I can create a new workgroup relation with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"
  
   Scenario: Create workgroupRelations with incomplete parameters
    And an ogapi "workgroup relations builder" util 
    And I want to create a "workgroup relations"
    Then I create it
    And throws an error equal to "There are required parameters that have not been set. Missing parameters: [workgroup,channels]" 

   Scenario: Delete all workgroupRelations that exists
    Given an ogapi "workgroups builder" util as "workgroup1"
    Then I want to create a "workgroup"
    And the "domain name" "root" on util "workgroup1"
    And the "name" "root" on util "workgroup1"
    Given an ogapi "workgroup relations builder" util 
    Then I want to create a "workgroup relations"
    Then the util "workgroup1" into "workgroup"
    And I delete it
    Then response code should be: 200
    
  Scenario: Create and delete a workgroupRelations that does not exist
    Given an ogapi "workgroups builder" util as "workgroup1"
    Then I want to create a "workgroup"
    And the "domain name" "root" on util "workgroup1"
    And the "name" "root" on util "workgroup1"
    Given an ogapi "channels builder" util as "channel1"
    Then I want to create a "channel"
    And the "organization" "base_organization" on util "channel1"
    And the "name" "base_channel" on util "channel1"
    Given an ogapi "workgroup relations builder" util 
    Then I want to create a "workgroup relations"
    Then the util "workgroup1" into "workgroup"
    Then the util "channel1" into "channel"
    Then I create it
    And response code should be: 201
    And I delete it
    Then response code should be: 200

  
  Scenario: Create twice and delete twice with error in the second delete workgroupRelations
    Given an ogapi "workgroups builder" util as "workgroup1"
    Then I want to create a "workgroup"
    And the "domain name" "root" on util "workgroup1"
    And the "name" "root" on util "workgroup1"
    Given an ogapi "channels builder" util as "channel1"
    Then I want to create a "channel"
    And the "organization" "base_organization" on util "channel1"
    And the "name" "base_channel" on util "channel1"
    Given an ogapi "workgroup relations builder" util 
    Then I want to create a "workgroup relations"
    Then the util "workgroup1" into "workgroup"
    Then the util "channel1" into "channel"
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
    Given an ogapi "workgroups builder" util as "workgroup1"
    Then I want to create a "workgroup"
    And the "domain name" "root" on util "workgroup1"
    And the "name" "root" on util "workgroup1"
    Given an ogapi "channels builder" util as "channel1"
    Then I want to create a "channel"
    And the "organization" "base_organization" on util "channel1"
    And the "name" "base_channel" on util "channel1"
    Given an ogapi "workgroup relations builder" util 
    Then I want to create a "workgroup relations"
    Then the util "workgroup1" into "workgroup"
    Then the util "channel1" into "channel"
    Then I create it
    And response code should be: 201

