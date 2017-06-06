# features/find_bundle.feature

@finder
@find_provision
@findbundle
Feature: Find a bundle
  As a user of JsApi
  I want to find a bundle
  So I can check if a bundle exists and get their information

  Background:
    Given an apikey user by "require-real-apikey"

  Scenario: Find a bundle that exists
	Given an ogapi "bundles builder" util 
    And I want to create a "bundle"
    Given the "name" "ogux_cucumber_bundle_find"
    And the "version" "1.0.0"
    And the "hardware" "OpenGate"
    And the "workgroup" "root"
    Then I delete it
    Then I create it
    And response code should be: 201
    Given an ogapi "bundle finder" util
    And I want to read a "bundle"
 	When I try to find by...
		| field   | content            |
		| name    | ogux_cucumber_bundle_find |
		| version    | 1.0.0 |
	And response code should be: 200
	Then I can see into the result an "bundle name" as "ogux_cucumber_bundle_find"
 	Given an ogapi "bundles builder" util 
    And I want to create a "bundle"
    Given the "name" "ogux_cucumber_bundle_find"
    And the "version" "1.0.0"
    And the "hardware" "OpenGate"
    And the "workgroup" "root"
    Then I delete it
    Then response code should be: 200