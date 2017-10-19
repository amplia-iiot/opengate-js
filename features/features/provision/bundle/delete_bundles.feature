# features/delete_bundles.feature
@provision
@delete_bundles
@bundles
Feature: Create a bundle 
  As a user of JsApi
  I want to delete a bundle
  So I can delete a bundle

  Background:
    Given an apikey user by "require-real-apikey"
  	And an ogapi "bundles builder" util 
    And I want to delete a "bundle"

  Scenario: deleting a not existing bundle with all required fields
    Given the "name" "ogux_cucumber_bundle_not_existing"
    And the "version" "not_existing_version"
  	Then I delete it
    And response code should be: 400

  Scenario: deleting a bundle without the required version field
    Given the "name" "ogux_cucumber_bundle_not_existing"
    Then I delete it
    And throws an error equal to "Parameters name, version must be defined"

  Scenario: deleting a bundle without the required name field
    Given the "version" "not_existing_version"
    Then I delete it
    And throws an error equal to "Parameters name, version must be defined"

  Scenario: deleting a bundle without the required fields
    Then I delete it
    And throws an error equal to "Parameters name, version must be defined"
