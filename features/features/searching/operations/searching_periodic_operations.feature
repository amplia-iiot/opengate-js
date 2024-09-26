# features/searching_periodic_operations.feature
@device_builder
@operations
@searching
@searching_periodic_operations
@done
Feature: Searching operation's executions
As a user of JsApi
I want to search periodic operations

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Precondition - Creating an organization to use in create device
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

    Scenario: Precondition - Create and delete an user that does not exist
        And an ogapi "users builder" util
        And I want to create a "user"
        And the "email" "ogux_ogapi@amplia.com"
        And the "password" "Nvoiqewvouoiu32j@#!!"
        And the "workgroup" "search_periodic_organization"
        And the "domain" "search_periodic_organization"
        And the "profile" "admin_domain"
        And the "countryCode" "ES"
        And the "langCode" "en"
        And the "name" "test name"
        And the "surname" "test surname"
        And the "description" "user description"
        And the "forcePasswordChange" false
        Then I delete it
        And I create it
        Then response code should be: 201

    
    Scenario: Precondition - I want to create an operation Type
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given an ogapi "operation type" util with "search_periodic_organization"
        Then I want to create an "operation type"
        And the "name" "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the "title" "Administrative status change test"
        And the "description" "Allows to change the administrative status of an entity"
        And the "fromCatalog" "ADMINISTRATIVE_STATUS_CHANGE"
        Then I create it
        And response code should be: 201
    
    Scenario: Precondition - I want to create an entity
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the entity of type "devices builder" with "search_periodic_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                         | parent |
            | provision.administration.channel      | simple       | default_channel               |        |
            | provision.administration.organization | simple       | search_periodic_organization |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup             |        |
            | provision.device.identifier           | simple       | search_periodic_oper_dev_a          |        |
            | provision.device.operationalStatus    | simple       | NORMAL                        |        |
            | provision.device.administrativeState  | simple       | ACTIVE                        |        |

        Then I delete it
        And I create it
        And response code should be: 201

    Scenario: Execute periodic operation every day
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        And execute every day at "2020-01-10T21:44:13Z"
         And append entities by:
            | search_periodic_oper_dev_a |
        When I build it
        And I execute it
        Then response code should be: 201

    Scenario: Searching for periodic operations
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given an ogapi "periodic operations search" util
        When I build it
        And I execute it
        Then response code should be: 200


    Scenario: Postcondition - I want to delete the entity
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the entity of type "devices builder" with "search_periodic_organization"
        When I try to define the entity with...
            | datastream                            | typeFunction | value                   | parent |
            | provision.administration.channel      | simple       | default_channel         |        |
            | provision.administration.organization | simple       | search_periodic_organization |        |
            | provision.device.identifier           | simple       | search_periodic_oper_dev_a |        |
        Then I delete it

    Scenario: Postcondition - Deleting an user
        Given an apikey user by "1e0a6fa7-d770-4072-ab4e-f98581522a65"
		Given an ogapi "users builder" util
        Then I want to delete a "user"
        And the "email" "ogux_ogapi@amplia.com"
        Then I delete it

    Scenario: Postcondition - Deleting an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "search_periodic_organization"
        Then I delete it
