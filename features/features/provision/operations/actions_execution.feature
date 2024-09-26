# features/actions_execution.feature
@provision
@operations
@actions_execution
@urlParameters
@revisar
Feature: Execute actions on a particular execution
    As a user of JsApi
    I want to execute actions on a particular operation
    So I can check if the actions run correctly

    Background:
        Given an apikey user by "require-real-apikey"
    @execution
    Scenario: Precondition - Creating an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "actions_execution_organization_10"
        And the "description" "actions execution organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        Then I create it
        And response code should be: 201

    Scenario: Precondition - Create and delete an user that does not exist
        And an ogapi "users builder" util
        And I want to create a "user"
        And the "email" "ogux_ogapi@amplia.com"
        And the "password" "Nvoiqewvouoiu32j@#!!"
        And the "workgroup" "actions_execution_organization_10"
        And the "domain" "actions_execution_organization_10"
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
        Given an ogapi "operation type" util with "actions_execution_organization_10"
        Then I want to create an "operation type"
        And the "name" "REFRESH_INFO_TEST"
        And the "title" "Refresh Information"
        And the "description" "On demand retrieving the Info"
        And the "fromCatalog" "REFRESH_INFO"
        Then I create it
        And response code should be: 201
        Given an ogapi "operation type" util with "actions_execution_organization_10"
        Then I want to create an "operation type"
        And the "name" "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the "title" "Administrative status change test"
        And the "description" "Allows to change the administrative status of an entity"
        And the "fromCatalog" "ADMINISTRATIVE_STATUS_CHANGE"
        Then I create it
        And response code should be: 201

    Scenario: Precondition - I want to create an entity
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the entity of type "devices builder" with "actions_execution_organization_10"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                             | parent |
            | provision.administration.channel      | simple       | default_channel                   |        |
            | provision.administration.organization | simple       | actions_execution_organization_10 |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup                 |        |
            | provision.device.identifier           | simple       | actions_execution_device_26          |        |
            | provision.device.operationalStatus    | simple       | NORMAL                            |        |
            | provision.device.administrativeState  | simple       | ACTIVE                            |        |

        Then I create it
        And response code should be: 201

    Scenario: Execute operation with default values and pause and active operation
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "REFRESH_INFO_TEST"
        And the timeout by 30000
        And the job timeout by 300 seconds
        And execute in 10 minutes
        #And append entities by "{}" as filter with "entity.device" as resourceType
        And append entities by:
            | actions_execution_device_26 |
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
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "REFRESH_INFO_TEST"
        And the timeout by 30000
        And the job timeout by 300 seconds
        And execute in 10 minutes
        #And append entities by "{}" as filter with "entity.device" as resourceType
        And append entities by:
            | actions_execution_device_26 |
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
        Then I can see into the result an "operation status" as "CANCELLED"

    #http://cm.amplia.es/jira/browse/ODMQA-1064
    @ignore
    Scenario: Execute operation with default values and delayed and execute later
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "REFRESH_INFO_TEST"
        And the timeout by 30000
        And the job timeout by 300 seconds
        And execute in 10 minutes
        #And append entities by "{}" as filter with "entity.device" as resourceType
        And append entities by:
            | actions_execution_device_26 |
        When I build it
        And I execute it
        Then response code should be: 201
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "SCHEDULED"
        And an ogapi "operation actions" util with responseId
        And I want "execute later" 10 minutes operation
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "SCHEDULED"

    #http://cm.amplia.es/jira/browse/ODMQA-1064
    @ignore
    Scenario: Execute operation with default values and delayed and execute now
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "REFRESH_INFO_TEST"
        And the timeout by 30000
        And the job timeout by 300 seconds
        And execute in 10 minutes
        And append entities by "{}" as filter with "entity.device" as resourceType
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
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "REFRESH_INFO_TEST"
        And the timeout by 30000
        And the job timeout by 300 seconds
        And the callback by "http://change"
        And execute in 10 minutes
        And append entities by "{}" as filter with "entity.device" as resourceType
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
        And I want "change callback" for this url "http://not_exists" for operation
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "SCHEDULED"

    @execution
    @ignore
    Scenario: Execute operation with default values and pause and active an operation inmediatly
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "REFRESH_INFO_TEST"
        And the timeout by 30000
        And the job timeout by 60 seconds
        And execute immediately
        #And append entities by "{}" as filter with "entity.device" as resourceType
        And append entities by:
            | actions_execution_device_26 |
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
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "REFRESH_INFO_TEST"
        And the timeout by 30000
        And the job timeout by 60 seconds
        And execute immediately
        #And append entities by "{}" as filter with "entity.device" as resourceType
        And append entities by:
            | actions_execution_device_26 |
        When I build it
        And I execute it
        Then response code should be: 201
        And I wait 55 seconds
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "FINISHED"
        And an ogapi "operation actions" util with responseId
        And I want "pause" a operation
        And throws an error equal to "Job state transition error."

    @execution
    Scenario: Execute operation with default values and cancel an operation finished
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "REFRESH_INFO_TEST"
        And the timeout by 30000
        And the job timeout by 60 seconds
        And execute immediately
        #And append entities by "{}" as filter with "entity.device" as resourceType
        And append entities by:
            | actions_execution_device_26 |
        When I build it
        And I execute it
        Then response code should be: 201
        And I wait 55 seconds
        And an ogapi "operation finder" util
        And I want to read a "operation"
        When I try to find by operation's id
        Then I can see into the result an "operation status" as "FINISHED"
        And an ogapi "operation actions" util with responseId
        And I want "cancel" a operation
        And throws an error equal to "Job state transition error."

    Scenario: Execute periodic operation every day and cancel
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the timeout by 120000
        And the notes by ""
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        And execute every day at "now"
        #And append entities by "{}" as filter with "entity.device" as resourceType
        And append entities by:
            | actions_execution_device_26 |
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
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        And execute every day at "now"
        #And append entities by "{}" as filter with "entity.device" as resourceType
        And append entities by:
            | actions_execution_device_26 |
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
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        And execute every day at "now"
        #And append entities by "{}" as filter with "entity.device" as resourceType
        And append entities by:
            | actions_execution_device_26 |
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


    Scenario: Postcondition - I want to delete the entity
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the entity of type "devices builder" with "actions_execution_organization_10"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                  | typeFunction | value                    | parent |
            | provision.device.identifier | simple       | actions_execution_device_26 |        |
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
        And the "name" "actions_execution_organization_10"
        Then I delete it
        And response code should be: 200