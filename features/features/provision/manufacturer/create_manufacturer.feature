# features/provision/manufacturer/create_manufactgurer.feature
@create_provision
@create_manufacturer
@manufacturer
@wip

Feature: Create a manufacturer
  As a user of JsApi
  I want to create a manufacturer
  So I can create a manufacturer

  Background:
    Given an apikey user by "require-real-apikey"

  Scenario: Checking parameter identifier
    Given an ogapi "manufacturers builder" util
    And I want to create a "manufacturer"
    Then the "identifier" 1
    Then throws an error equal to "OGAPI_STRING_PARAMETER_MAX_LENGTH_50"

  Scenario: Create a manufacturer
    Given an ogapi "manufacturers builder" util
    And I want to create a "manufacturer"
    Then the "identifier" "ogux_cucumber_manufacturer"
    And the "name" "ogux_cucumber_manufacturer"
    And the "telephone" "666555444"
    And the "address" "666555444"
    And the "fax" "666555444"
    And the "email" "email@email.email"
    And the "description" "666555444"
    And the "notes" "666555444"
    And the "url" "https://opengate.es"
    Then I delete it
    Then I create it
    And response code should be: 201

  Scenario: Create a manufacturer model
    Given an ogapi "manufacturers builder" util
    And I want to create a "manufacturer"
    Then the "identifier" "ogux_cucumber_manufacturer"
    And the "name" "ogux_cucumber_manufacturer"
    And I create a "manufacturer model" from current "manufacturer" using params:
      | field      | content              |
      | identifier | ogux_cucumber_model_id |
      | name       | ogux_cucumber_model_name |
      | version       | 0.1 |
      | description       | la descripcion |
      | notes       | las notas |
      | url       | urltest |    
  And response code should be: 201

  Scenario: Create a manufacturer media
    Given an ogapi "manufacturers builder" util
    And I want to create a "manufacturer"
    Then the "identifier" "ogux_cucumber_manufacturer"
    And I read the file from "/file_test/ampliaiioT.png"
    And I create a "manufacturer media" from current "manufacturer" using previous file and params:
      | field      | content              |
      | identifier | ogux_cucumber_manufacturer_media |
      | name       | ogux_cucumber_manufacturer_media_name |
    And response code should be: 201

  Scenario: Create a manufacturer model media
    Given an ogapi "manufacturer models builder" util
    And I want to create a "manufacturer model"
    Then the "identifier" "ogux_cucumber_model_id"
    And I read the file from "/file_test/ampliaiioT2.png"
    And I create a "manufacturer model media" from current "manufacturer model" using previous file and params:
      | field      | content              |
      | identifier | ogux_cucumber_model_media |
      | name       | ogux_cucumber_model_media_name |
    And response code should be: 201

  Scenario: Create another manufacturer model
    Given an ogapi "manufacturer models builder" util
    And I want to create a "manufacturer model"
    Then the "identifier" "ogux_cucumber_model_id_2"
    And the "name" "ogux_cucumber_model_name_2"
    And the "version" "0.2"
    And the "description" "la descripcion 2"
    And the "notes" "las notas"
    And the "url" "urltest2"
    Then the "manufacturer id" "ogux_cucumber_manufacturer"
    And the "manufacturer name" "ogux_cucumber_manufacturer"
    Then I delete it
    Then I create it
    And response code should be: 201
    Then I delete it
    And response code should be: 200

  Scenario: Delete previously created manufacturer
    Given an ogapi "manufacturers builder" util
    And I want to create a "manufacturer"
    Then the "identifier" "ogux_cucumber_manufacturer"
    Then I delete it
    And response code should be: 200
