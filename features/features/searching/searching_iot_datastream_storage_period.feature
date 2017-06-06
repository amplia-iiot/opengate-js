# features/searching/searching_iot_datastream_storage_period.feature

@iot
@IoT_datastream_storage_period
@iot_datastream
@catalogs
Feature: Searching IoT datastream storage period provider in catalog
  As a user of JsApi
  I want to search into IoT datastream storage period provider catalog
  
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "IoT datastream storage period search" util
    Given I want to search a "IoT datastream storage period provider"
@fail
  Scenario: Execute searching
    When I build it
  	And I execute it
    Then response code should be: 200
    And the result contains:
    """
{"ioTDatastreamStoragePeriod":["DAYS","MONTHS","YEARS","FOREVER","NEVER"]}
    """
