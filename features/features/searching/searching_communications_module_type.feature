# features/searching_communications_module_type.feature
@communications_module_type
@catalogs
@searching
Feature: Searching communications module type in catalog
  As a user of JsApi
  I want to search into communications module type catalog
  So I can add filter, sorting, limit to search
  
  Background:
    Given an apikey user by "require-real-apikey"
    And an ogapi "communications module type search" util
    Given I want to search a "communications module type"

  Scenario: Execute searching
    When I build it
  	And I execute it
  	Then response code should be: 200

  Scenario Outline: Execute searching with parameter entityType
    When I try to search with...
    | field   | content |
    | type    | <type>  |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
    """
<result>
    """

  Examples:
    | type      | result |
    | GENERIC   | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","IMEI","MAC","HARDWARE","SOFTWARE"]},"SUBSCRIPTION":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","IMSI","ADDRESS","HOME_OPERATOR","REGISTER_OPERATOR","MSISDN","LOCATION"]},"SUBSCRIBER":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","ICC"]}}} |
    | WIFI      | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey","MAC"],"optional":["administrativeState","HARDWARE","SOFTWARE"]}}} |
    | ETH       | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey","MAC"],"optional":["administrativeState","HARDWARE","SOFTWARE"]}}} |
#   | BLUETOOTH | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey","MAC"],"optional":["administrativeState","HARDWARE","SOFTWARE"]}}} |
    | MESH      | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey","MAC"],"optional":["administrativeState","HARDWARE","SOFTWARE"]}}} |
    | LOWPAN    | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey","MAC"],"optional":["administrativeState","HARDWARE","SOFTWARE"]}}} |
    | PLC       | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey","MAC"],"optional":["administrativeState","HARDWARE","SOFTWARE"]}}} |
    | ZIGBEE    | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey","MAC"],"optional":["administrativeState","HARDWARE","SOFTWARE"]}}} |
    | ADSL      | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","MAC"]},"SUBSCRIPTION":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","ADDRESS","REGISTER_OPERATOR"]}}} |
    | MOBILE    | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey","IMEI"],"optional":["administrativeState","HARDWARE","SOFTWARE"]},"SUBSCRIPTION":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","IMSI","MSISDN"]},"SUBSCRIBER":{"mandatory":["generatedEntityKey","ICC"],"optional":["administrativeState"]}}} |
    | GSM       | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey","IMEI"],"optional":["administrativeState","HARDWARE","SOFTWARE"]},"SUBSCRIPTION":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","IMSI","MSISDN"]},"SUBSCRIBER":{"mandatory":["generatedEntityKey","ICC"],"optional":["administrativeState"]}}} |
    | UMTS      | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey","IMEI"],"optional":["administrativeState","HARDWARE","SOFTWARE"]},"SUBSCRIPTION":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","IMSI","MSISDN"]},"SUBSCRIBER":{"mandatory":["generatedEntityKey","ICC"],"optional":["administrativeState"]}}} |
    | CAN       | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["entityKey"],"optional":["administrativeState"]}}} |
    | I2C       | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["entityKey"],"optional":["administrativeState"]}}} |
    | RS232     | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["entityKey"],"optional":["administrativeState"]}}} |
    | RS422     | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["entityKey"],"optional":["administrativeState"]}}} |
    | RS485     | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["entityKey"],"optional":["administrativeState"]}}} |
    | SIGFOX    | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["entityKey"],"optional":["administrativeState"]}}} |