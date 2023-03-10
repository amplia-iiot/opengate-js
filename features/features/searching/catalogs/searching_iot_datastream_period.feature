# features/searching/catalogs/searching_iot_datastream_period.feature

@iot
@ioT_datastream_period_provider
@searching
@catalogs
Feature: Searching IoT datastream period provider in catalog
  As a user of JsApi
  I want to search into IoT datastream period provider catalog
  
  Background:
    # Given an apikey user by "require-real-apikey"
    Given an jwt user by "require-real-jwt"
    And an ogapi "IoT datastream period search" util
    Given I want to search a "IoT datastream period provider"

  Scenario: Execute searching
    When I build it
  	And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"ioTDatastreamPeriod":["PULSE","CUMULATIVE","INSTANT"]}
    """
