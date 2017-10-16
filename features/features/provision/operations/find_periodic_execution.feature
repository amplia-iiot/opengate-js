# features/find_periodic_execution.feature
@operations
@finder
@periodic_operation
Feature: Find an operation
  As a user of JsApi
  I want to find an operation
  So I can check if a operation exists and get their information

  Background:
    Given an apikey user by "require-real-apikey"

Scenario: Execute operation with default values and find operation
Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    And execute each 2 days
    And append entities by "{}" as filter with "ASSET" as entityType
    When I build it
    And I execute it
    Then response code should be: 201
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
    When I try to find by operation's id
    Then I can see into the result an "periodic operation type" as "ADMINISTRATIVE_STATUS_CHANGE"

Scenario: Find a operation that not exists
Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    And append entities by "{}" as filter with "ASSET" as entityType
    When I build it
    And I execute it
    Then response code should be: 201
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
    When I try to find by operation's id
    Then response code should be: 404
