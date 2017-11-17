# features/setting_up_period-every_operation.feature
@execute_every_operation
@operations
@provision
Feature: Setting up period with every pattern to operations
  As a user of JsApi
  I want to execute an FACTORY_RESET operation with a specific every pattern period configuration 
  So that I can execute FACTORY_RESET to some devices/subscriptions/subscribers/communications module with an every pattern period

  Background:
      Given an apikey user by "require-real-apikey"

  Scenario: Set repeat every day at now
    Given the operation by "FACTORY_RESET"
    And execute every day at "now"
    And append entities by:
        |   device_689_DEMO    |
    When I build it     
    Then I can not see into the post data a period   
  Scenario: Set repeat every day at now
    Given the operation by "FACTORY_RESET"
    And execute every day at "now"
    And append entities by:
        |   device_689_DEMO    |
    When I build it     
    Then I can see into the post data a every day pattern
  Scenario: Set repeat every week at now
    Given the operation by "FACTORY_RESET"
    And execute every week at "now" on days:
        |   MON     |
        |   FRI     |
    And append entities by:
        |   device_689_DEMO    |
    When I build it     
    Then I can see into the post data a every week pattern with days:
        |   MON     |
        |   FRI     |
  Scenario: Set repeat every month at now
    Given the operation by "FACTORY_RESET"
    And execute every month at "now" at day 5 on months:
        |   FEB     |
    And append entities by:
        |   device_689_DEMO    |
    When I build it     
    Then I can see into the post data a every month pattern at day 5 and months:
        |   FEB     |        
  Scenario: Set repeat every year at now
    Given the operation by "FACTORY_RESET"
    And execute every year at "now" at day 5 on month "FEB"
    And append entities by:
        |   device_689_DEMO    |
    When I build it     
    Then I can see into the post data a every month pattern at day 5 and month "FEB"

  Scenario: Set repeat every day at date before now
    Given the operation by "FACTORY_RESET"
    And execute every day at "2015-09-29T14:37:06+02:00"
    And append entities by:
        |   device_689_DEMO    |
    When I build it     
    Then I can see into the post data a start date as "now"

  Scenario: Set repeat every day at date after now
    Given the operation by "FACTORY_RESET"
    And execute every day at "2017-09-29T14:37:06+02:00"
    And append entities by:
        |   device_689_DEMO    |
    When I build it     
    Then I can see into the post data a start date as "2017-09-29T14:37:06+02:00"