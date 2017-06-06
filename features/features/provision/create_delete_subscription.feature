# features/create_delete_subscription.feature
@create_provision
@subscription
Feature: Delete and Create a subscription 
  As a user of JsApi
  I want to create an subscription
  So, I can create a new subscription with the parametres that I have been defined

  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "subscriptions builder" util 
    And I want to create a "_subscription"


 Scenario: Create and delete a subscription that not exists 
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "entity key" "OGUX_EntityKey_SUBSCRIPTION"
    And the "name" "OGUX Subscription tester"
    And the "description" "OGUX Subscription tester full description"
    And the "msisdn" "625360041"
    And the "imsi" "1234657984512"
    And the "homeoperator" "Cableuropa, SAU"
    And the "registered operator" "Cableuropa, SAU"
    And the "ip address" "172.19.1.224"
    And the "apn" "movistar.es"
    And the "specific type" "ADSL"
    And I delete it
    Then I create it
    And response code should be: 201
    And I delete it
    Then response code should be: 200
 
 #http://cm.amplia.es/jira/browse/OUW-523
 @OUW-523
  Scenario: Create an subscription with incorrect specific type
    Given the "organization" "base_organization"
    And the "channel" "base_channel"
    And the "administrative state" "TESTING"
    And the "entity key" "OGUX_EntityKey_SUBSCRIPTION"
    And the "name" "OGUX Subscription tester"
    And the "description" "OGUX Subscription tester full description"
    And the "msisdn" "625360041"
    And the "imsi" "1234657984512"
    And the "homeoperator" "Cableuropa, SAU"
    And the "registered operator" "Cableuropa, SAU"
    And the "ip address" "172.19.1.224"
    And the "mobile phone provider" "Cableuropa, SAU"
    And the "specific type" "CONCENTRATORE"
    Then I create it
    And an error is thrown
    
  Scenario: Try to create a subscription without the mandatory fields
    When I create it
    Then throws an error equal to "There are required parameters that have not been set. Missing parameters: [channel,organization,specificType,entityKey]"