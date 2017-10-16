# features/execute_periodic_operations.feature

@operations
@periodic_operation
Feature: Execute ADMINISTRATIVE_STATUS_CHANGE periodic operation
  As a user of JsApi
  I want to execute an ADMINISTRATIVE_STATUS_CHANGE periodic operation
  So that I can change the administrative status to some devices/subscriptions/subscribers/communications module

  Background:
    Given an apikey user by "require-real-apikey"

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
    And append entities by "{}" as filter with "ASSET" as entityType
    When I build it
    And I execute it
    Then response code should be: 201
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
    When I try to find by operation's id
    Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-01-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","definedPatternNumber":0}}}
    """    

Scenario: Execute periodic operation every week
Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    And execute every week at "2020-01-10T21:44:13Z" on days:
    | MON  |
    | WED  |
    | FRI  |
    And append entities by "{}" as filter with "ASSET" as entityType
    When I build it
    And I execute it
    Then response code should be: 201
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
    When I try to find by operation's id
    Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-01-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","weekly":{"days":["MON","WED","FRI"]},"definedPatternNumber":0}}}
    """        

Scenario: Execute periodic operation every week and fail
Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    When execute every week at on days:
    | FRI  |
    | SUN  |
    Then throws an error equal to "Parameter date must be typeof Date"

Scenario: Execute periodic operation every month
Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    And execute every month at "2020-01-10T21:44:13Z" at day 3 on months:
    | JAN  |
    | MAR  |
    | MAY  |
    And append entities by "{}" as filter with "ASSET" as entityType
    When I build it
    And I execute it
    Then response code should be: 201
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
    When I try to find by operation's id
    Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-01-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","monthly":{"day":3,"months":["JAN","MAR","MAY"]},"definedPatternNumber":0}}}
    """        

Scenario: Execute periodic operation every month without day and fail
Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    And execute every month at "2020-02-10T21:44:13Z" on months:
    | FEB  |
    | APR  |
    | JUN  |
    And append entities by "{}" as filter with "ASSET" as entityType
    When I build it
    And I execute it
    Then response code should be: 201    
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
    When I try to find by operation's id
    Then response code should be: 404    

Scenario: Execute periodic operation every month without months and fail
Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    When execute every month at "2020-03-10T21:44:13Z" at day 5
    Then throws an error equal to "Parameter months must be typeof Array"
        
Scenario: Execute periodic operation every month without start and fail
Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    When execute every month at day 29 on months:
    | DEC  |
    | OCT  |
    | AUG  |
    Then throws an error equal to "Parameter date must be typeof Date"
       
Scenario: Execute periodic operation every month without start and month and fail
Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    When execute every month at day 18
    Then throws an error equal to "Parameter date must be typeof Date"

Scenario: Execute periodic operation every month without start and day and fail
Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    When execute every month on months:
    | NOV  |
    | SEP  |
    | JUL  |
    Then throws an error equal to "Parameter date must be typeof Date"


Scenario: Execute periodic operation every year
Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    And execute every year at "2020-01-10T21:44:13Z" at day 4 on month "JAN"
    And append entities by "{}" as filter with "ASSET" as entityType
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
    Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-01-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","yearly":{"day":4,"month":"JAN"},"definedPatternNumber":0}}}
    """        

Scenario: Execute periodic operation every year without day and fail
Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    And execute every year at "2020-02-10T21:44:13Z" on month "FEB"
    And append entities by "{}" as filter with "ASSET" as entityType
    When I build it
    And I execute it
    Then response code should be: 201
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
    When I try to find by operation's id
    Then response code should be: 404


Scenario: Execute periodic operation every year without month and fail
Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    And execute every year at "2020-03-10T21:44:13Z" at day 5
    And append entities by "{}" as filter with "ASSET" as entityType
    When I build it
    And I execute it
    Then response code should be: 201
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
    When I try to find by operation's id
    Then response code should be: 404


Scenario: Execute periodic operation every year without start and fail
Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    When execute every year at day 29 on month "MAR"
    Then throws an error equal to "Parameter date must be typeof Date"

Scenario: Execute periodic operation every year without start and month fail
Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    When execute every year at day 18
    Then throws an error equal to "Parameter date must be typeof Date"

Scenario: Execute periodic operation every year without start and day fail
Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    When execute every year on month "APR"
    Then throws an error equal to "Parameter date must be typeof Date"
