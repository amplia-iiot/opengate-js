# features/create_bundles.feature
@create_provision
@create_bundles
@bundles
Feature: Create a bundle 
  As a user of JsApi
  I want to create a bundle
  So I can create a bundle

  Background:
    Given an apikey user by "require-real-apikey"
  	And an ogapi "bundles builder" util 
    And I want to create a "bundle"

  Scenario: Checking parameter name
    And the "name" 1
    Then throws an error equal to "Parameter name must be a string and has a maximum length of 255"

  Scenario: Create a bundle with a deployment element
    Given the "name" "ogux_cucumber_bundle"
    And the "version" "1.0.0"
  	And the "hardware" "OpenGate"
  	And the "workgroup" "root"
    Then I delete it
    And I read the file from "/file_test/root.cer"
    And I create a "deployment element" from current "bundle" using previous file and next params:
    | field  | content |
    | name | cucumber_bundle_de_8 |
    | version | 0.0.1 |
    | type | FIRMWARE |
    | path | ./ |
    | order | 1 |
    | operation | INSTALL |
    | option | MANDATORY |
    Then I deploy it
    And response code should be: 201
    Then I delete it
    And response code should be: 200

  Scenario: Create a deployment element with TRUSTED_BOOT validator without FIRMWARE type selected
    Given the "name" "ogux_cucumber_single_bundle"
    And the "version" "1.0.0"
    And the "hardware" "OpenGate"
    And the "workgroup" "root"
    And I create a "deployment element" from current "bundle" using previous file and next params:
    | field  | content |
    | validators | [{"mode": "TRUSTED_BOOT","type":"SHA-1"}]  |
    Then throws an error equal to "TRUSTED_BOOT validator only allowed for FIRMWARE deployment element"

  Scenario: Create a deployment element with TRUSTED_BOOT validators with FIRMWARE type
    Given the "name" "ogux_cucumber_single_bundle"
    And the "version" "1.0.0"
    And the "hardware" "OpenGate"
    And the "workgroup" "root"
    And I create a "deployment element" from current "bundle" using previous file and next params:
    | field  | content |
    | type | FIRMWARE |
    | validators | [{"mode": "TRUSTED_BOOT","type":"SHA-1"},{"mode": "TRUSTED_BOOT","type":"SHA-1"}]  |
    Then throws an error equal to "Only one TRUSTED_BOOT validator allowed in a deployment element"

@bug 
  Scenario: Create a bundle with two deployment elements with same name
    Given the "name" "ogux_cucumber_bundle_bad_deployment"
    And the "version" "1.0.0"
    And the "hardware" "OpenGate"
    And the "workgroup" "root"
    Then I delete it
    And I read the file from "/file_test/root.cer"
    And I create a "deployment element" from current "bundle" using previous file and next params:
    | field  | content |
    | name | cucumber_deployment_1 |
    | version | 0.0.1 |
    | type | FIRMWARE |
    | path | ./1 |
    | order | 1 |
    | operation | INSTALL |
    | option | MANDATORY |
    And I create a "deployment element" from current "bundle" using previous file and next params:
    | field  | content |
    | name | cucumber_deployment_1 |
    | version | 0.0.1 |
    | type | FIRMWARE |
    | path | ./2 |
    | order | 1 |
    | operation | INSTALL |
    | option | MANDATORY |
    Then I deploy it
    And response code should be: 400

@solo
  Scenario: Create a bundle with 2 deployments elements in one step
    Given the "name" "ogux_cucumber_multi_bundle"
    And the "version" "1.0.0"
    And the "hardware" "OpenGate"
    And the "workgroup" "root"
    Then I delete it
    And I read the file from "/file_test/root.cer"
    And I create a "deployment element" from current "bundle" using previous file and next params:
    | field  | content |
    | name | cucumber_deployment_1 |
    | version | 0.0.1 |
    | type | FIRMWARE |
    | path | ./1 |
    | order | 1 |
    | operation | INSTALL |
    | option | MANDATORY |
    | validators | [{"mode": "TRUSTED_BOOT", "type" : "SHA-1"}]  |
    And I create a "deployment element" from current "bundle" using previous file and next params:
    | field  | content |
    | name | cucumber_deployment_2 |
    | version | 0.0.1 |
    | type | FIRMWARE |
    | path | ./1 |
    | order | 1 |
    | operation | INSTALL |
    | option | MANDATORY |
    And I deploy it
    Then upload percent is complete
    And response code should be: 201
    Then I delete the first deployment element from current bundle
    And response code should be: 200
    Then I delete it

  Scenario: Create 2 deployments elements with TRUSTED_BOOT 
    Given the "name" "ogux_cucumber_multi_bundle"
    And the "version" "1.0.0"
    And the "hardware" "OpenGate"
    And the "workgroup" "root"
    Then I delete it
    And I read the file from "/file_test/root.cer"
    And I create a "deployment element" from current "bundle" using previous file and next params:
    | field  | content |
    | name | cucumber_deployment_1 |
    | version | 0.0.1 |
    | type | FIRMWARE |
    | path | ./1 |
    | order | 1 |
    | operation | INSTALL |
    | option | MANDATORY |
    | validators | [{"mode": "TRUSTED_BOOT", "type" : "SHA-1"}]  |
    And I create a "deployment element" from current "bundle" using previous file and next params:
    | field  | content |
    | name | cucumber_deployment_2 |
    | version | 0.0.1 |
    | type | FIRMWARE |
    | path | ./1 |
    | order | 1 |
    | operation | INSTALL |
    | option | MANDATORY |
    | validators | [{"mode": "TRUSTED_BOOT", "type" : "SHA-256"}]  |
    Then I deploy it
    Then throws an error equal to "Only one TRUSTED_BOOT validator allowed in bundle"

  Scenario: Create a duplicated bundle
    Given the "name" "ogux_cucumber_bundle"
    And the "version" "1.0.0"
    And the "hardware" "OpenGate"
    And the "workgroup" "root"
    Then I delete it
    Then I create it
    And response code should be: 201
    Then I create it
    And response code should be: 400
    Then throws an error equal to "Bundle already exists"
    Then I delete it
    And response code should be: 200
    
  Scenario: Create a bundle with a deployment element, its activates and deactivates
    Given the "name" "ogux_cucumber_bundle_activation"
    And the "version" "1.0.0"
    And the "hardware" "OpenGate"
    And the "workgroup" "root"
    Then I delete it
    And I read the file from "/file_test/root.cer"
    And I create a "deployment element" from current "bundle" using previous file and next params:
    | field  | content |
    | name | cucumber_deployment_act |
    | version | 0.0.1 |
    | type | FIRMWARE |
    | path | ./ |
    | order | 1 |
    | operation | INSTALL |
    | option | MANDATORY |
    Then I deploy it
    And response code should be: 201
    And I deactivate it
    And response code should be: 200
    Then I activate it
    And response code should be: 200
    Then I delete it
    And response code should be: 200