# features/create_delete_subscriber.feature

@create_provision
@subscriber
Feature: Delete and Create a subscriber 
  As a user of JsApi
  I want to create an subscriber
  So, I can create a new subscriber with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "subscribers builder" util 
    And I want to create a "_subscriber"

 Scenario: Create and delete a subscriber that not exists 
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "entity key" "OGUX_EntityKey_SUBSCRIBER"
    And the "name" "OGUX Subscription tester"
    And the "icc" "123456789456"
    And the "description" "OGUX Subscription tester full description"
    And the "specific type" "ADSL"
    Then I create it
    And response code should be: 201
    And I delete it
   Then response code should be: 200
    #And I delete it
    #
 
  Scenario: Create an subscriber with incorrect specific type
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "entity key" "OGUX_EntityKey_SUBSCRIBER"
    And the "name" "OGUX Subscription tester"
    And the "icc" "123456789456"
    And the "description" "OGUX Subscription tester full description"
    And the "specific type" "CONCENTRATORE"
    Then I create it
    And an error is thrown
    
  Scenario: Try to create a subscriber without the mandatory fields
    When I create it
    Then throws an error equal to "There are required parameters that have not been set. Missing parameters: [channel,organization,specificType,entityKey]"