# features/setting_up_period-every_operation.feature
@execute_each_operation
@operations
@provision
Feature: Setting up period with each pattern to operations
As a user of JsApi
I want to execute an FACTORY_RESET operation with a specific each pattern period configuration
So that I can execute FACTORY_RESET to some devices/subscriptions/subscribers/communications module with an each pattern period

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Creating an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "setting_up_period_each_organization"
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
        Given the entity of type "devices builder" with "setting_up_period_each_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                            | typeFunction | value                               | parent |
            | provision.administration.channel      | simple       | default_channel                     |        |
            | provision.administration.organization | simple       | setting_up_period_each_organization |        |
            | provision.administration.serviceGroup | simple       | emptyServiceGroup                   |        |
            | provision.device.identifier           | simple       | setting_up_period_each_device       |        |
            | provision.device.operationalStatus    | simple       | NORMAL                              |        |
            | provision.device.administrativeState  | simple       | ACTIVE                              |        |

        Then I create it
        And response code should be: 201


    Scenario: Set each 5 minutes as period
        Given the operation by "FACTORY_RESET"
        And execute each 5 minutes
        And append entities by:
            | device_689_DEMO |
        When I build it
        Then I can see into the post data a period by 5 minutes
    Scenario: Set each 5 hours as period
        Given the operation by "FACTORY_RESET"
        And execute each 5 hours
        And append entities by:
            | device_689_DEMO |
        When I build it
        Then I can see into the post data a period by 5 hours
    Scenario: Set each 5 days as period
        Given the operation by "FACTORY_RESET"
        And execute each 5 days
        And append entities by:
            | device_689_DEMO |
        When I build it
        Then I can see into the post data a period by 5 days
    Scenario: Set each 5 days as period but I can not found 5 hours
        Given the operation by "FACTORY_RESET"
        And execute each 5 days
        And append entities by:
            | device_689_DEMO |
        When I build it
        Then I can not see into the post data a period by 5 hours
    Scenario: Set each 5 minutes as period and not job timeout defined. Then the default job timeout will be less than the selected period
        Given the operation by "FACTORY_RESET"
        And execute each 5 minutes
        And append entities by:
            | device_689_DEMO |
        When I build it
        Then I can see into the post data a job timeout by 4 minutes
    Scenario: Set each 5 minutes as period with job timeout greater than the selected period
        Given the operation by "FACTORY_RESET"
        And execute each 5 minutes
        And the job timeout by 6 minutes
        And append entities by:
            | device_689_DEMO |
        When I build it
        Then throws an error equal to "You can not execute an operation with a job timeout greater than the repetition period."
    Scenario: Set each 5 minutes as period with job timeout equals than the selected period
        Given the operation by "FACTORY_RESET"
        And execute each 5 minutes
        And the job timeout by 5 minutes
        And append entities by:
            | device_689_DEMO |
        When I build it
        Then throws an error equal to "You can not execute an operation with a job timeout greater than the repetition period."
    Scenario: Set each as period but stop date earlier than current date
        Given the operation by "FACTORY_RESET"
        When execute each with stop date 5 "minutes" earlier than current date
        Then this builder configuration throw a error equal to "Invalid stop date on executeEach method. Start date must be earlier than stop date."
    Scenario: Set each as period with stop date later than start date but start date is earlier than current date
        Given the operation by "FACTORY_RESET"
        And append entities by:
            | device_689_DEMO |
        And execute each 5 "minutes" with stop date 5 "seconds" later than the start date as now
        When I wait 7 seconds
        And I build it
        Then throws an error equal to "Can not create operation object because stop operation period is earlier than current date. It happened because you passed a lot of time between configuration of an operation and create the operation."

    @CORE_BUG
    Scenario: Set each 5 minutes as period with stop date later than start date
        Given the operation by "FACTORY_RESET"
        And append entities by:
            | setting_up_period_each_device |
        And execute each 5 "minutes" with stop date 10 "hours" later than the start date as now
        When I build it
        And I execute it
        Then response code should be: 201

    @CORE_BUG
    Scenario: Set each 5 minutes as period with stop date later than start date earlier than current date
        Given the operation by "FACTORY_RESET"
        And append entities by:
            | setting_up_period_each_device |
        And execute each 5 "minutes" with stop date 10 "hours" later than the start date as now
        And I wait 5 seconds
        When I build it
        And I execute it
        Then response code should be: 201

    @CORE_BUG
    Scenario: Set each as period and stop by number repetitions greater than 1
        Given the operation by "FACTORY_RESET"
        And execute each with 5 as a number of repetitions
        And append entities by:
            | setting_up_period_each_device |
        When I build it
        And I execute it
        Then response code should be: 201

    @CORE_BUG
    Scenario: Set each as period and stop by number repetitions equals than 1
        Given the operation by "FACTORY_RESET"
        And execute each with 1 as a number of repetitions
        And append entities by:
            | setting_up_period_each_device |
        When I build it
        And I execute it
        Then response code should be: 201
    Scenario: Set each as period and stop by number repetitions less than 1
        Given the operation by "FACTORY_RESET"
        When execute each with 0 as a number of repetitions
        Then this builder configuration throw a error equal to "Invalid stop value. Number of repetitions must be greater than 0."


    Scenario: I want to delete the entity
        Given the entity of type "devices builder" with "setting_up_period_each_organization"
        And I get allowed Datastreams fields
        And I can found "provision.device.identifier" as datastream name
        When I try to define the entity with...
            | datastream                  | typeFunction | value                         | parent |
            | provision.device.identifier | simple       | setting_up_period_each_device |        |
        And I delete it
        Then response code should be: 200

    Scenario: Deleting an organization
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "setting_up_period_each_organization"
        Then I delete it
        And response code should be: 200