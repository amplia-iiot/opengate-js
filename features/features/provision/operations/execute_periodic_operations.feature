# features/execute_periodic_operations.feature
@provision
@operations
@periodic_operation
@urlParameters
@done
Feature: Execute ADMINISTRATIVE_STATUS_CHANGE periodic operation
    As a user of JsApi
    I want to execute an ADMINISTRATIVE_STATUS_CHANGE periodic operation
    So that I can change the administrative status to some devices/subscriptions/subscribers/communications module

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Precondition - Creating an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "execute_periodic_organization_10"
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
        And the "workgroup" "execute_periodic_organization_10"
        And the "domain" "execute_periodic_organization_10"
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

    Scenario: Precondition - I want to create an entity
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the entity of type "devices builder" with "execute_periodic_organization_10"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                            | parent |
            | provision.administration.channel      | simple       | default_channel                  |        |
            | provision.administration.organization | simple       | execute_periodic_organization_10 |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup                |        |
            | provision.device.identifier           | simple       | execute_periodic_device_C          |        |
            | provision.device.operationalStatus    | simple       | NORMAL                           |        |
            | provision.device.administrativeState  | simple       | ACTIVE                           |        |

        Then I create it
        And response code should be: 201


    
    Scenario: Precondition - I want to create an operation Type
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given an ogapi "operation type" util with "execute_periodic_organization_10"
        Then I want to create an "operation type"
        And the "name" "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the "title" "Administrative status change test"
        And the "description" "Allows to change the administrative status of an entity"
        And the "fromCatalog" "ADMINISTRATIVE_STATUS_CHANGE"
        Then I create it
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
        And append entities by "{}" as filter with "entity.device" as resourceType
        When I build it
        And I execute it
        Then response code should be: 201
        When I try to find an operation for its id of periodicity and save its id
        And an ogapi "operation finder" util
        And I want to read a "periodicity"
        When I try to find by operation's id
        Then I can see into the result an "periodic schedule - repeating" as
            """
            {"period":null,"pattern":{"time":"22:44:13+01:00","definedPatternNumber":0}}
            """

    Scenario: Execute periodic operation every week
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        And execute every week at "2020-01-10T21:44:13Z" on days:
            | MON |
            | WED |
            | FRI |
        And append entities by "{}" as filter with "entity.device" as resourceType
        When I build it
        And I execute it
        Then response code should be: 201
        When I try to find an operation for its id of periodicity and save its id
        And an ogapi "operation finder" util
        And I want to read a "periodicity"
        When I try to find by operation's id
        Then I can see into the result an "periodic schedule - repeating" as
            """
            {"period":null,"pattern":{"time":"22:44:13+01:00","weekly":{"days":["MON","WED","FRI"]},"definedPatternNumber":1}}
            """

    Scenario: Execute periodic operation every week and fail
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        When execute every week at on days:
            | FRI |
            | SUN |
        Then throws an error equal to "Parameter date must be typeof Date"

    Scenario: Execute periodic operation every month
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        And execute every month at "2020-01-10T21:44:13Z" at day 3 on months:
            | JAN |
            | MAR |
            | MAY |
        And append entities by "{}" as filter with "entity.device" as resourceType
        When I build it
        And I execute it
        Then response code should be: 201
        When I try to find an operation for its id of periodicity and save its id
        And an ogapi "operation finder" util
        And I want to read a "periodicity"
        When I try to find by operation's id
        Then I can see into the result an "periodic schedule - repeating" as
            """
            {"period":null,"pattern":{"time":"22:44:13+01:00","monthly":{"day":3,"months":["JAN","MAR","MAY"]},"definedPatternNumber":1}}
            """

    Scenario: Execute periodic operation every month without day and fail
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        And execute every month at "2020-02-10T21:44:13Z" on months:
            | FEB |
            | APR |
            | JUN |
        And append entities by:
            | execute_periodic_device_C |
        When I build it
        And I execute it
        Then response code should be: 201
        When I try to find an operation for its id of periodicity and save its id
        And an ogapi "operation finder" util
        And I want to read a "periodicity"
        When I try to find by operation's id
        Then response code should be: 404

    Scenario: Execute periodic operation every month without months and fail
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        When execute every month at "2020-03-10T21:44:13Z" at day 5
        Then throws an error equal to "Parameter months must be typeof Array"

    Scenario: Execute periodic operation every month without start and fail
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        When execute every month at day 29 on months:
            | DEC |
            | OCT |
            | AUG |
        Then throws an error equal to "Parameter date must be typeof Date"

    Scenario: Execute periodic operation every month without start and month and fail
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        When execute every month at day 18
        Then throws an error equal to "Parameter date must be typeof Date"

    Scenario: Execute periodic operation every month without start and day and fail
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        When execute every month on months:
            | NOV |
            | SEP |
            | JUL |
        Then throws an error equal to "Parameter date must be typeof Date"


    Scenario: Execute periodic operation every year
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        And execute every year at "2020-01-10T21:44:13Z" at day 4 on month "JAN"
        And append entities by "{}" as filter with "entity.device" as resourceType
        When I build it
        And I execute it
        Then response code should be: 201
        And I try to find an operation for its id of periodicity and save its id
        And an ogapi "operation actions" util with responseId
        And I want "pause periodicity" of a operation
        Then response code should be: 200
        And an ogapi "operation finder" util
        And I want to read a "periodicity"
        When I try to find by operation's id
        Then I can see into the result an "periodic schedule - repeating" as
            """
            {"period":null,"pattern":{"time":"22:44:13+01:00","yearly":{"day":4,"month":"JAN"},"definedPatternNumber":1}}
            """

    Scenario: Execute periodic operation every year without day and fail
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        And execute every year at "2020-02-10T21:44:13Z" on month "FEB"
        And append entities by:
            | execute_periodic_device_C |
        When I build it
        And I execute it
        Then response code should be: 201
        When I try to find an operation for its id of periodicity and save its id
        And an ogapi "operation finder" util
        And I want to read a "periodicity"
        When I try to find by operation's id
        Then response code should be: 404


    Scenario: Execute periodic operation every year without month and fail
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        And execute every year at "2020-03-10T21:44:13Z" at day 5
        And append entities by:
            | execute_periodic_device_C |
        When I build it
        And I execute it
        Then response code should be: 201
        When I try to find an operation for its id of periodicity and save its id
        And an ogapi "operation finder" util
        And I want to read a "periodicity"
        When I try to find by operation's id
        Then response code should be: 404


    Scenario: Execute periodic operation every year without start and fail
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        When execute every year at day 29 on month "MAR"
        Then throws an error equal to "Parameter date must be typeof Date"

    Scenario: Execute periodic operation every year without start and month fail
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        When execute every year at day 18
        Then throws an error equal to "Parameter date must be typeof Date"

    Scenario: Execute periodic operation every year without start and day fail
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the operation by "ADMINISTRATIVE_STATUS_CHANGE_TEST"
        And the notes by ""
        And the timeout by 120000
        And the ackTimeout by 0
        And the retries by 0
        And the retriesDelay by 0
        And the parameters "{ \"admsts\" : \"ACTIVE\" }"
        And the job timeout by 300 seconds
        When execute every year on month "APR"
        Then throws an error equal to "Parameter date must be typeof Date"


    Scenario: Postcondition - I want to delete the entity
        Given an email "ogux_ogapi@amplia.com" and password "Nvoiqewvouoiu32j@#!!" the user logs in
        Given the entity of type "devices builder" with "execute_periodic_organization_10"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                  | typeFunction | value                   | parent |
            | provision.device.identifier | simple       | execute_periodic_device_C |        |
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
        And the "name" "execute_periodic_organization_10"
        Then I delete it
        And response code should be: 200