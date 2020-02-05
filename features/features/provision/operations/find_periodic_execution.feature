# features/find_periodic_execution.feature
@operations
@provision
@finder
@periodic_operation
@urlParameters

Feature: Find an operation
    As a user of JsApi
    I want to find an operation
    So I can check if a operation exists and get their information

    Background:
        Given an apikey user by "require-real-apikey"


    Scenario: Creating an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "find_periodic_organization_10"
        And the "description" "actions execution organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        Then I create it
        And response code should be: 201

    Scenario: I want to create an entity
        Given the entity of type "devices builder" with "find_periodic_organization_10"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                         | parent |
            | provision.administration.channel      | simple       | default_channel               |        |
            | provision.administration.organization | simple       | find_periodic_organization_10 |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup             |        |
            | provision.device.identifier           | simple       | find_periodic_device          |        |
            | provision.device.operationalStatus    | simple       | NORMAL                        |        |
            | provision.device.administrativeState  | simple       | ACTIVE                        |        |

        Then I create it
        And response code should be: 201


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
        And append entities by:
            | find_periodic_device |
        When I build it
        And I execute it
        Then response code should be: 201
        When I try to find an operation for its id of periodicity and save its id
        And an ogapi "operation finder" util
        And I want to read a "periodicity"
        When I try to find by operation's id
        Then response code should be: 404

    Scenario: I want to delete the entity
        Given the entity of type "devices builder" with "find_periodic_organization_10"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                  | typeFunction | value                | parent |
            | provision.device.identifier | simple       | find_periodic_device |        |
        And I delete it
        Then response code should be: 200

    Scenario: Deleting an organization
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "find_periodic_organization_10"
        Then I delete it
        And response code should be: 200