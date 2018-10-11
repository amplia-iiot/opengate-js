# features/actions_execution.feature
@provision
@operations
@actions_execution
@fail
Feature: Execute actions on a particular execution
    As a user of JsApi
    I want to execute actions on a particular operation
    So I can check if the actions run correctly

    Background:
        Given an apikey user by "require-real-apikey"

    @execution

    Scenario: Creating an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "actions_execution_organization"
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
        Given the entity of type "devices builder" with "actions_execution_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                          | parent |
            | provision.administration.channel      | simple       | default_channel                |        |
            | provision.administration.organization | simple       | actions_execution_organization |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup              |        |
            | provision.device.identifier           | simple       | actions_execution_device       |        |
            | provision.device.operationalStatus    | simple       | NORMAL                         |        |
            | provision.device.administrativeState  | simple       | ACTIVE                         |        |

        Then I create it
        And response code should be: 201

    Scenario: Execute operation with default values and pause and active operation
        Given the operation by "REFRESH_INFO"
        And the timeout by 30000
        And the job timeout by 5 minutes
        And execute in 10 minutes
        #And append entities by "{}" as filter with "ASSET" as entityType
        And append entities by:
            | actions_execution_device |
        When I build it
        And I execute it
        Then response code should be: 201
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "SCHEDULED"
        And an ogapi "operation actions" util with responseId
        And I want "pause" a operation
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "IDLE"
        And an ogapi "operation actions" util with responseId
        And I want "active" a operation
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "SCHEDULED"

    @execution
    Scenario: Execute operation with default values and cancel execution
        Given the operation by "REFRESH_INFO"
        And the timeout by 30000
        And the job timeout by 5 minutes
        And execute in 10 minutes
        #And append entities by "{}" as filter with "ASSET" as entityType
        And append entities by:
            | actions_execution_device |
        When I build it
        And I execute it
        Then response code should be: 201
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "SCHEDULED"
        And an ogapi "operation actions" util with responseId
        And I want "cancel" a operation
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "CANCELLING"

    #http://cm.amplia.es/jira/browse/ODMQA-1064
    @ignore
    Scenario: Execute operation with default values and delayed and execute later
        Given the operation by "REFRESH_INFO"
        And the timeout by 30000
        And the job timeout by 5 minutes
        And execute in 10 minutes
        #And append entities by "{}" as filter with "ASSET" as entityType
        And append entities by:
            | actions_execution_device |
        When I build it
        And I execute it
        Then response code should be: 201
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "SCHEDULED"
        And an ogapi "operation actions" util with responseId
        And I want "execute later" 10 minutesa operation
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "SCHEDULED"

    #http://cm.amplia.es/jira/browse/ODMQA-1064
    @ignore
    Scenario: Execute operation with default values and delayed and execute now
        Given the operation by "REFRESH_INFO"
        And the timeout by 30000
        And the job timeout by 5 minutes
        And execute in 10 minutes
        And append entities by "{}" as filter with "ASSET" as entityType
        #And append entities by:
        #    |   device_689_DEMO  |
        When I build it
        And I execute it
        Then response code should be: 201
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "SCHEDULED"
        And an ogapi "operation actions" util with responseId
        And I want "execute now" a operation
        #And I wait 15 seconds
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "IN_PROGRESS"

    #http://cm.amplia.es/jira/browse/ODMQA-1065
    @ignore
    Scenario: Execute operation with default values and delayed and change callback
        Given the operation by "REFRESH_INFO"
        And the timeout by 30000
        And the job timeout by 5 minutes
        And the callback by "http://change"
        And execute in 10 minutes
        And append entities by "{}" as filter with "ASSET" as entityType
        #And append entities by:
        #    |   device_689_DEMO  |
        When I build it
        And I execute it
        Then response code should be: 201
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "SCHEDULED"
        And an ogapi "operation actions" util with responseId
        And I want "change callback" for this url "http://not_exists" for a operation
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "SCHEDULED"

    @execution
    Scenario: Execute operation with default values and pause and active an operation inmediatly
        Given the operation by "REFRESH_INFO"
        And the timeout by 30000
        And the job timeout by 1 minutes
        And execute immediately
        #And append entities by "{}" as filter with "ASSET" as entityType
        And append entities by:
            | actions_execution_device |
        When I build it
        And I execute it
        Then response code should be: 201
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "IN_PROGRESS"
        And an ogapi "operation actions" util with responseId
        And I want "pause" a operation
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "PAUSED"
        And an ogapi "operation actions" util with responseId
        And I want "active" a operation
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "IN_PROGRESS"

    @execution
    Scenario: Execute operation with default values and pause and active an operation finished
        Given the operation by "REFRESH_INFO"
        And the timeout by 30000
        And the job timeout by 1 minutes
        And execute immediately
        #And append entities by "{}" as filter with "ASSET" as entityType
        And append entities by:
            | actions_execution_device |
        When I build it
        And I execute it
        Then response code should be: 201
        And I wait 70 seconds
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "FINISHED"
        And an ogapi "operation actions" util with responseId
        And I want "pause" a operation
        And throws an error equal to "Job state transition error"

    @execution
    Scenario: Execute operation with default values and cancel an operation finished
        Given the operation by "REFRESH_INFO"
        And the timeout by 30000
        And the job timeout by 1 minutes
        And execute immediately
        #And append entities by "{}" as filter with "ASSET" as entityType
        And append entities by:
            | actions_execution_device |
        When I build it
        And I execute it
        Then response code should be: 201
        And I wait 70 seconds
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "FINISHED"
        And an ogapi "operation actions" util with responseId
        And I want "cancel" a operation
        And throws an error equal to "Job state transition error"

    Scenario: Execute periodic operation every day and cancel
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And parameter "admsts" by "inventado"
        And the job timeout by 5 minutes
        And execute every day at "now"
        #And append entities by "{}" as filter with "ASSET" as entityType
        And append entities by:
            | actions_execution_device |
        When I build it
        And I execute it
        Then response code should be: 201
        When I try to find an operation for its id of periodicity and save its id
        And an ogapi "operation actions" util with responseId
        And I want "cancel periodicity" of a operation
        Then response code should be: 200
        When I try to find an operation for its id of periodicity and save its id
        Then response code should be: 404

    Scenario: Execute periodic operation every day and pause
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And parameter "admsts" by "inventado"
        And the job timeout by 5 minutes
        And execute every day at "now"
        #And append entities by "{}" as filter with "ASSET" as entityType
        And append entities by:
            | actions_execution_device |
        When I build it
        And I execute it
        Then response code should be: 201
        When I try to find an operation for its id of periodicity and save its id
        And an ogapi "operation actions" util with responseId
        And I want "pause periodicity" of a operation
        Then response code should be: 200
        And an ogapi "operation finder" util
        And I want to read a "periodicity"
        When I try to find by operation's id
        Then I can see into the result an "periodic status" as "INACTIVE"

    Scenario: Execute periodic operation every day and pause and active
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And parameter "admsts" by "inventado"
        And the job timeout by 5 minutes
        And execute every day at "now"
        #And append entities by "{}" as filter with "ASSET" as entityType
        And append entities by:
            | actions_execution_device |
        When I build it
        And I execute it
        Then response code should be: 201
        When I try to find an operation for its id of periodicity and save its id
        And an ogapi "operation actions" util with responseId
        And I want "pause periodicity" of a operation
        Then response code should be: 200
        And an ogapi "operation finder" util
        And I want to read a "periodicity"
        When I try to find by operation's id
        Then I can see into the result an "periodic status" as "INACTIVE"
        When I try to find an operation for its id of periodicity and save its id
        And an ogapi "operation actions" util with responseId
        And I want "active periodicity" of a operation
        Then response code should be: 200
        And an ogapi "operation finder" util
        And I want to read a "periodicity"
        When I try to find by operation's id
        Then I can see into the result an "periodic status" as "ACTIVE"


    Scenario: I want to delete the entity
        Given the entity of type "devices builder" with "base_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                  | typeFunction | value                    | parent |
            | provision.device.identifier | simple       | actions_execution_device |        |
        And I delete it
        Then response code should be: 200

    Scenario: Deleting an organization
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "actions_execution_organization"
        Then I delete it
        And response code should be: 200