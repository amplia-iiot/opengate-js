# features/searching_periodic_operations.feature
@device_builder
@operations
@searching
@searching_periodic_operations
@wip
Feature: Searching operation's executions
As a user of JsApi
I want to search periodic operations

    Scenario: Creating an organization to use in create device
        Given an email and password the user logs in
        And an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "executions_organization"
        And the "description" "device organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: Create an user to use in test
        Given an email and password the user logs in
		And an ogapi "users builder" util
		And I want to create a "user"
		And the "email" "ogux_ogapi@amplia.com"
		And the "password" "Nvoiqewvouoiu32j@#!!"
		And the "workgroup" "executions_organization"
		And the "domain" "executions_organization"
		And the "profile" "admin_domain"
		And the "countryCode" "ES"
		And the "langCode" "en"
		Then I delete it
		And I create it
		Then response code should be: 201

    Scenario: I want to create the entity
        Given an email and password the user logs in
        Given the entity of type "devices builder" with "executions_organization"
        Then I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                                       | parent |
            | provision.administration.channel      | simple       | default_channel                             |        |
            | provision.administration.organization | simple       | executions_organization                     |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup                           |        |
            | provision.device.identifier           | simple       | device_executions_tests                     |        |
        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: I want to create the operation type ADMINISTRATIVE_STATUS_CHANGE
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        And an ogapi "operationType builder" util with...
         | param |
         |  executions_organization |
         |  ADMINISTRATIVE_STATUS_CHANGE_TEST | 
         |  {"name":"ADMINISTRATIVE_STATUS_CHANGE_TEST","title":"Administrative status change test","description":"Allows to change the administrative status of an entity","fromCatalog":"ADMINISTRATIVE_STATUS_CHANGE"} | 
        And I want to create a "operationType"
        Then I delete it
		And I create it
		And response code should be: 201

    Scenario: Execute periodic operation every day
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And parameter "admsts" by "ACTIVE"
        And the job timeout by 5 minutes
        And execute every day at "2020-01-10T21:44:13Z"
         And append entities by:
            | search_periodic_oper_dev |
        When I build it
        And I execute it
        Then response code should be: 201

    Scenario: Searching for periodic operations
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given an ogapi "periodic operations search" util
        When I build it
        And I execute it
        Then response code should be: 200

    Scenario: Download csv for periodic operations
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given an ogapi "periodic operations search" util
        When I build it
        And I download csv it
        Then response code should be: 200

     Scenario: I want to delete the entity
        Given an email and password the user logs in
        Given the entity of type "devices builder" with "executions_organization"
        When I try to define the entity with...
            | datastream                            | typeFunction | value                   | parent |
            | provision.administration.channel      | simple       | default_channel         |        |
            | provision.administration.organization | simple       | executions_organization |        |
            | provision.device.identifier           | simple       | device_executions_tests |        |
        Then I delete it

    Scenario: Deleting an organization to use in create device
        Given an email and password the user logs in
        Given an ogapi "users builder" util
        Then I want to delete a "user"
        And the "email" "ogux_ogapi@amplia.com"
        Then I delete it
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "executions_organization"
        Then I delete it