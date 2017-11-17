# features/find_user.feature
@provision
@finder
@find_provision
@users
Feature: Find an user 
  As a user of JsApi
  I want to find an user
  So I can check if a user exists and get their information

  Background:
  	Given an apikey user by "require-real-apikey"
    And an ogapi "user finder" util 
    Given I want to read a "user"

  Scenario: Find an user that exists
  	When I try to find by...
  	| field   | content                |
 	| email   | victor.gutierrez@amplia.es |
    Then I can see into the result an "user email" as "victor.gutierrez@amplia.es"

  Scenario: Find an user that not exists
 	When I try to find by...
  	| field   | content            |
 	| email   | user@inventado.com |
    Then response code should be: 404    
