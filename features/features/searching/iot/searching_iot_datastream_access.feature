# features/searching/searching_iot_datastream_access.feature

@iot
@datamodel
@IoT_datastream_access_provider
@iot_datastream
@catalogs
@searching
Feature: Searching IoT datastream access provider in catalog
  As a user of JsApi
  I want to search into IoT datastream access provider catalog
  
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "IoT datastream access search" util
    Given I want to search a "IoT datastream access provider"

  Scenario: Execute searching
    When I build it
  	And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"ioTDatastreamAccess":["READ","WRITE"]}
    """
