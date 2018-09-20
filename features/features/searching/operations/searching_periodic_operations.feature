# features/searching_periodic_operations.feature
@device_builder
@operations
@searching
@searching_periodic_operations
Feature: Searching operation's executions
As a user of JsApi
I want to search periodic operations

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Creating an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "search_periodic_organization"
        And the "description" "device organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        And I create it
        And response code should be: 201
    
    Scenario: I want to create an entity
        Given the entity of type "devices builder" with "search_periodic_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                         | parent |
            | provision.administration.channel      | simple       | default_channel               |        |
            | provision.administration.organization | simple       | search_periodic_organization |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup             |        |
            | provision.device.identifier           | simple       | search_periodic_oper_dev          |        |
            | provision.device.operationalStatus    | simple       | NORMAL                        |        |
            | provision.device.administrativeState  | simple       | ACTIVE                        |        |

        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: Execute periodic operation every day
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And parameter "admsts" by "inventado"
        And the job timeout by 5 minutes
        And execute every day at "2020-01-10T21:44:13Z"
         And append entities by:
            | search_periodic_oper_dev |
        When I build it
        And I execute it
        Then response code should be: 201

    Scenario: Searching for periodic operations
        Given an ogapi "periodic operations search" util
        When I build it
        And I execute it
        Then response code should be: 200


    Scenario: I want to delete the entity
        Given the entity of type "devices builder" with "search_periodic_organization"
        When I try to define the entity with...
            | datastream                            | typeFunction | value                   | parent |
            | provision.administration.channel      | simple       | default_channel         |        |
            | provision.administration.organization | simple       | search_periodic_organization |        |
            | provision.device.identifier           | simple       | device_executions_tests |        |
        Then I delete it

    Scenario: Deleting an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "search_periodic_organization"
        Then I delete it
