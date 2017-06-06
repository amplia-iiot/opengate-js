# features/update_periodic_operation.feature

@operations
@update_periodic_operation
Feature: Update periodic operation
  As a user of JsApi
  I want to update periodic operation
 So I can check if a periodic run update is performed correctly

  Background:
  Given an apikey user by "require-real-apikey"

Scenario: Execute periodic operation every day, and change time
  Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    And execute every day at "now"
    And append entities by "{}" as filter with "ASSET" as entityType
   When I build it
    And I execute it
   Then response code should be: 201
   When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation actions" util with responseId
    And I want "pause periodicity" of a operation
   Then response code should be: 200
    And an update periodicity by operation's id
    And update execute every day at "2020-01-10T21:44:13Z"
    And I build it
    And I update periodicity
   Then response code should be: 200
   When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
   When I try to find by operation's id
   Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-01-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","definedPatternNumber":0}}}
    """    

Scenario: Execute periodic operation every week, and change time
  Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    And execute every day at "now"
    And append entities by "{}" as filter with "ASSET" as entityType
   When I build it
    And I execute it
   Then response code should be: 201
   When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation actions" util with responseId
    And I want "pause periodicity" of a operation
   Then response code should be: 200
    And an update periodicity by operation's id
    And update execute every week at "2020-01-10T21:44:13Z" on days:
|MON|
|WED|
|FRI|
    And I build it
    And I update periodicity
   Then response code should be: 200
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
   When I try to find by operation's id
   Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-01-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","weekly":{"days":["MON","WED","FRI"]},"definedPatternNumber":0}}}
    """        
   When I try to find an operation for its id of periodicity and save its id
    And an update periodicity by operation's id
    And update execute every week at on days:
|FRI|
|SUN|
    And I build it
    And I update periodicity
   Then response code should be: 200
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
   When I try to find by operation's id
   Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-01-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","weekly":{"days":["FRI","SUN"]},"definedPatternNumber":0}}}
    """        

Scenario: Execute periodic operation every month, and change time
  Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    And execute every day at "now"
    And append entities by "{}" as filter with "ASSET" as entityType
   When I build it
    And I execute it
   Then response code should be: 201
   Then I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation actions" util with responseId
    And I want "pause periodicity" of a operation
   Then response code should be: 200

    And an update periodicity by operation's id
    And update execute every month at "2020-01-10T21:44:13Z" at day 3 on months:
|JAN|
|MAR|
|MAY|
    And I build it
    And I update periodicity
   Then response code should be: 200
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
   When I try to find by operation's id
   Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-01-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","monthly":{"day":3,"months":["JAN","MAR","MAY"]},"definedPatternNumber":0}}}
    """        
    
   When I try to find an operation for its id of periodicity and save its id
    And an update periodicity by operation's id
    And update execute every month at "2020-02-10T21:44:13Z" on months:
|FEB|
|APR|
|JUN|
    And I build it
    And I update periodicity
   Then response code should be: 200
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
   When I try to find by operation's id
   Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-02-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","monthly":{"day":3,"months":["FEB","APR","JUN"]},"definedPatternNumber":0}}}
    """        

   When I try to find an operation for its id of periodicity and save its id
    And an update periodicity by operation's id
    And update execute every month at "2020-03-10T21:44:13Z" at day 5
    And I build it
    And I update periodicity
   Then response code should be: 200
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
   When I try to find by operation's id
   Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-03-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","monthly":{"day":5,"months":["FEB","APR","JUN"]},"definedPatternNumber":0}}}
    """

   When I try to find an operation for its id of periodicity and save its id
    And an update periodicity by operation's id
    And update execute every month at day 29 on months:
|DEC|
|OCT|
|AUG|
    And I build it
    And I update periodicity
   Then response code should be: 200
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
   When I try to find by operation's id
   Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-03-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","monthly":{"day":29,"months":["DEC","OCT","AUG"]},"definedPatternNumber":0}}}
    """        

   When I try to find an operation for its id of periodicity and save its id
    And an update periodicity by operation's id
    And update execute every month at day 18
    And I build it
    And I update periodicity
   Then response code should be: 200
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
   When I try to find by operation's id
   Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-03-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","monthly":{"day":18,"months":["DEC","OCT","AUG"]},"definedPatternNumber":0}}}
    """       

   When I try to find an operation for its id of periodicity and save its id
    And an update periodicity by operation's id
    And update execute every month on months:
|NOV|
|SEP|
|JUL|
    And I build it
    And I update periodicity
   Then response code should be: 200
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
   When I try to find by operation's id
   Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-03-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","monthly":{"day":18,"months":["NOV","SEP","JUL"]},"definedPatternNumber":0}}}
    """ 

Scenario: Execute periodic operation every year, and change time
  Given the operation by "ADMINISTRATIVE_STATUS_CHANGE"
    And the notes by ""
    And the timeout by 120000
    And the ackTimeout by 0
    And the retries by 0
    And the retriesDelay by 0
    And parameter "admsts" by "inventado"
    And the job timeout by 5 minutes
    And execute every day at "now"
    And append entities by "{}" as filter with "ASSET" as entityType
   When I build it
    And I execute it
   Then response code should be: 201
   When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation actions" util with responseId
    And I want "pause periodicity" of a operation
   Then response code should be: 200
    And an update periodicity by operation's id
    And update execute every year at "2020-01-10T21:44:13Z" at day 4 on month "JAN"
    And I build it
    And I update periodicity
   Then response code should be: 200
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
   When I try to find by operation's id
   Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-01-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","yearly":{"day":4,"month":"JAN"},"definedPatternNumber":0}}}
    """        
    
   When I try to find an operation for its id of periodicity and save its id
    And an update periodicity by operation's id
    And update execute every year at "2020-02-10T21:44:13Z" on month "FEB"
    And I build it
    And I update periodicity
   Then response code should be: 200
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
   When I try to find by operation's id
   Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-02-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","yearly":{"day":4,"month":"FEB"},"definedPatternNumber":0}}}
    """        

   When I try to find an operation for its id of periodicity and save its id
    And an update periodicity by operation's id
    And update execute every year at "2020-03-10T21:44:13Z" at day 5
    And I build it
    And I update periodicity
   Then response code should be: 200
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
   When I try to find by operation's id
   Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-03-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","yearly":{"day":5,"month":"FEB"},"definedPatternNumber":0}}}
    """

   When I try to find an operation for its id of periodicity and save its id
    And an update periodicity by operation's id
    And update execute every year at day 29 on month "MAR"
    And I build it
    And I update periodicity
   Then response code should be: 200
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
   When I try to find by operation's id
   Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-03-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","yearly":{"day":29,"month":"MAR"},"definedPatternNumber":0}}}
    """        

   When I try to find an operation for its id of periodicity and save its id
    And an update periodicity by operation's id
    And update execute every year at day 18
    And I build it
    And I update periodicity
   Then response code should be: 200
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
   When I try to find by operation's id
   Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-03-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","yearly":{"day":18,"month":"MAR"},"definedPatternNumber":0}}}
    """       

   When I try to find an operation for its id of periodicity and save its id
    And an update periodicity by operation's id
    And update execute every year on month "APR"
    And I build it
    And I update periodicity
   Then response code should be: 200
    When I try to find an operation for its id of periodicity and save its id
    And an ogapi "operation finder" util
    And I want to read a "periodicity"
   When I try to find by operation's id
   Then I can see into the result an "periodic schedule" as
    """
    {"start":{"date":"2020-03-10T21:44:13Z"},"repeating":{"period":null,"pattern":{"time":"22:44:13+01:00","yearly":{"day":18,"month":"APR"},"definedPatternNumber":0}}}
    """ 

