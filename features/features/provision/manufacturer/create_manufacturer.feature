# features/provision/manufacturer/create_manufactgurer.feature
@create_provision
@create_manufacturer
@manufacturer

@chema

Feature: Create a manufacturer
  As a user of JsApi
  I want to create a manufacturer
  So I can create a manufacturer

  Background:
    Given an apikey user by "2829be88-a7d7-4f51-aefc-3cc2385b6506"

  Scenario: Checking parameter identifier
    Given an ogapi "manufacturers builder" util
    And I want to create a "manufacturer"
    Then the "identifier" 1
    Then throws an error equal to "OGAPI_STRING_PARAMETER_MAX_LENGTH_50"

  Scenario: Create a manufacturer
    Given an ogapi "manufacturers builder" util
    And I want to create a "manufacturer"
    # Then the "identifier" "ogux_cucumber_manufacturer"
    And the "name" "ogux_cucumber_manufacturer"
    And the "telephone" "666555444"
    And the "address" "666555444"
    And the "fax" "666555444"
    And the "email" "email@email.email"
    And the "description" "666555444"
    And the "notes" "666555444"
    And the "url" "https://opengate.es"
    # Then I delete it
    Then I create it
    And response code should be: 201
    And I delete it with location as a identifier
    And response code should be: 200

  Scenario: Create a manufacturer model
    Given an ogapi "manufacturers builder" util
    And I want to create a "manufacturer"
    # Then the "identifier" "ogux_cucumber_manufacturer"
    And the "name" "ogux_cucumber_manufacturer"
    Then I create it
    And response code should be: 201
    Then I fill identifier using location
    And I create a "manufacturer model" from current "manufacturer" using params:
      | field      | content              |
      | name       | ogux_cucumber_model_name |
      | version       | 0.1 |
      | description       | la descripcion |
      | notes       | las notas |
      | url       | urltest |    
  And response code should be: 201
  And I delete it
  And response code should be: 200

