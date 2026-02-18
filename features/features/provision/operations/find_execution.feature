# features/find_execution.feature
@provision
@find_execution
@operations
@finder
@operation
@urlParameters
@done
Feature: Find an operation
    As a user of JsApi
    I want to find an opreation
    So I can check if a operation exists and get their information

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Precondition - Creating an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "find_execution_organization_10"
        And the "description" "find execution organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        And the "plan" "TRIAL"
        Then I delete it
        Then I create it
        And response code should be: 201

    Scenario: Precondition - Create and delete an user that does not exist
        And an ogapi "users builder" util
        And I want to create a "user"
        And the "email" "ogux_ogapi@amplia.com"
        And the "password" "Nvoiqewvouoiu32j@#!!"
        And the "workgroup" "find_execution_organization_10"
        And the "domain" "find_execution_organization_10"
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
        Given an ogapi "operation type" util with "find_execution_organization_10"
        Then I want to create an "operation type"
        And the "name" "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the "title" "Administrative status change test"
        And the "description" "Allows to change the administrative status of an entity"
        And the "fromCatalog" "ADMINISTRATIVE_STATUS_CHANGE"
        Then I create it
        And response code should be: 201
        
    Scenario: Precondition - I want to create an entity
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in    
        Given the entity of type "devices builder" with "find_execution_organization_10"
        Then I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                          | parent |
            | provision.administration.channel      | simple       | default_channel                |        |
            | provision.administration.organization | simple       | find_execution_organization_10 |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup              |        |
            | provision.device.identifier           | simple       | find_execution_device_a          |        |
            | provision.device.operationalStatus    | simple       | NORMAL                         |        |
            | provision.device.administrativeState  | simple       | ACTIVE                         |        |

        Then I create it
        And response code should be: 201


    Scenario: Execute operation with default values and find operation
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        And execute immediately
        And append entities by:
            | find_execution_device_a |
        When I build it
        And I execute it
        Then response code should be: 201
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation type" as "ADMINISTRATIVE_STATUS_CHANGE_TEST"

    Scenario: Find a operation that not exists
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by...
            | field | content    |
            | id    | not_exists |
        Then response code should be: 200

    Scenario: Postcondition - I want to delete the entity
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the entity of type "devices builder" with "find_execution_organization_10"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                  | typeFunction | value                 | parent |
            | provision.device.identifier | simple       | find_execution_device_a |        |
        And I delete it
        Then response code should be: 200

     Scenario: Postcondition - Deleting an user
        Given an ogapi "users builder" util
        Then I want to delete a "user"
        And the "email" "ogux_ogapi@amplia.com"
        Then I delete it

    Scenario: Postcondition - Deleting an organization
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "find_execution_organization_10"
        Then I delete it
        And response code should be: 200