# features/find_workgroup.feature
@provision
@finder
@find_provision
@workgroupRelations
@workgroup
Feature: Find an workgroup 
  As a user of JsApi
  I want to find an workgroup
  So I can check if a workgroup exists and get their information

  Background:
  	Given an apikey user by "require-real-apikey"
    And an ogapi "workgroups finder" util 
    Given I want to read a "workgroup"

  Scenario: Find an workgroupRelations that exists
  	When I try to find by...
  	| field   | content                |
 	| domain   | root |
    | name   | root |
    Then I can see into the result an "workgroup name" as "root"

  Scenario: Find an workgroup that not exists
 	When I try to find by...
  	| field   | content            |
 	| domain   | root |
    | name   | not existing workgroup |
    Then response code should be: 404    
