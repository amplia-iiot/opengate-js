# features/create_delete_workgroup.feature
@create_provision
@workgroup
Feature: Delete and Create a workgroup
  As a user of JsApi
  I want to create a workgroup
  So, I can create a new user with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"
    
  Scenario: Create a domain
    Given an ogapi "domains builder" util
    Then I want to create an "domain"
  	And the "name" "domainWorkgroup_test_ogapi"
    And the "description" "Domain created for testing ogapi workgroups"
  	And the "parentDomain" "root"
    Then I delete it
    And I create it
 	  And response code should be: 201
  
  #http://cm.amplia.es/jira/browse/OUW-526
  @OUW-526
  Scenario: Create and delete a workgroup that does not exist
    And an ogapi "workgroups builder" util 
    And I want to create a "workgroup"
    And the "domain name" "domainWorkgroup_test_ogapi"
    And the "name" "workgroupUxTestName"
    And the "description" "workgroup description"
    And the "administrative" true
    Then I create it
    And response code should be: 201
    And I delete it
    Then response code should be: 200

  #http://cm.amplia.es/jira/browse/OUW-526
  @OUW-526
  Scenario: Create a workgroup that already exists
    And an ogapi "workgroups builder" util 
    And I want to create a "workgroup"
    And the "domain name" "domainWorkgroup_test_ogapi"
    And the "name" "workgroupUxTestName"
    And the "description" "workgroup description"
    Then I create it
    Then response code should be: 201
    Then I create it
    And response code should be: 400

  #http://cm.amplia.es/jira/browse/OUW-526
  @OUW-526
   Scenario: Update a workgroup that already exists
    And an ogapi "workgroups builder" util 
    And I want to update a "workgroup"
    And the "domain name" "domainWorkgroup_test_ogapi"
    And the "name" "workgroupUxTestName"
    And the "description" "workgroup description new"
    Then I update it
    And response code should be: 200
    Then I delete it
    And response code should be: 200

  Scenario: Create workgroup with incomplete parameters
    And an ogapi "workgroups builder" util 
    And I want to create a "workgroup"
    Then I create it
    And throws an error equal to "There are required parameters that have not been set. Missing parameters: [name,domainName]" 

  Scenario: Deleting a domain
    Given an ogapi "domains builder" util
    Then I want to create an "domain"
  	And the "name" "domainWorkgroup_test_ogapi"
 	  Then I delete it
 	  And response code should be: 200
