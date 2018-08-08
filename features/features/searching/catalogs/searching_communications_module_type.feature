# features/searching_communications_module_type.feature
@searching_communications_module_type
@catalogs
@searching
@specificType
@sigfox
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
      | field | content |
      | type  | <type>  |
    And I build it
    And I execute it
    Then response code should be: 200
    And the result contains:
      """
      <result>
      """

    Examples:
      | type       | result                                                                                                                                                                                                                                                                                                                                                                                                           |
      | ADSL       | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey"],"optional":["IMEI","HARDWARE","SOFTWARE"]},"SUBSCRIPTION":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","ADDRESS","HOME_OPERATOR","LOCATION"]}}}                                                                                                                                                |
      | CAN        | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["entityKey"],"optional":[]}}}                                                                                                                                                                                                                                                                                                                 |
      | ETH        | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey"],"optional":["HARDWARE","SOFTWARE"]},"SUBSCRIPTION":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","ADDRESS"]}}}                                                                                                                                                                                  |
      | GENERIC    | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey"],"optional":["IMEI","HARDWARE","SOFTWARE"]},"SUBSCRIPTION":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","IMSI","ADDRESS","HOME_OPERATOR","REGISTER_OPERATOR","MSISDN","LOCATION"]},"SUBSCRIBER":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","ICC","SERIAL_NUMBER"]}}} |
      | GSM        | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey"],"optional":["IMEI","HARDWARE","SOFTWARE"]},"SUBSCRIPTION":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","IMSI","ADDRESS","HOME_OPERATOR","REGISTER_OPERATOR","MSISDN","LOCATION"]},"SUBSCRIBER":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","ICC"]}}}                 |
      | HAN        | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["entityKey"],"optional":[]}}}                                                                                                                                                                                                                                                                                                                 |
      | I2C        | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["entityKey"],"optional":[]}}}                                                                                                                                                                                                                                                                                                                 |
      | LOWPAN     | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey"],"optional":["HARDWARE","SOFTWARE"]},"SUBSCRIPTION":{"mandatory":["generatedEntityKey"],"optional":["administrativeState"]}}}                                                                                                                                                                                            |
      | LTE_M      | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey"],"optional":["IMEI","HARDWARE","SOFTWARE"]},"SUBSCRIPTION":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","IMSI","ADDRESS","HOME_OPERATOR","REGISTER_OPERATOR","MSISDN","LOCATION"]},"SUBSCRIBER":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","ICC"]}}}                 |
      | MESH       | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey"],"optional":["HARDWARE","SOFTWARE"]}}}                                                                                                                                                                                                                                                                                   |
      | MOBILE     | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey"],"optional":["IMEI","HARDWARE","SOFTWARE"]},"SUBSCRIPTION":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","IMSI","ADDRESS","HOME_OPERATOR","REGISTER_OPERATOR","MSISDN","LOCATION"]},"SUBSCRIBER":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","ICC"]}}}                 |
      | NARROWBAND | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey"],"optional":["IMEI","HARDWARE","SOFTWARE"]},"SUBSCRIPTION":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","IMSI","ADDRESS","HOME_OPERATOR","REGISTER_OPERATOR","LOCATION"]},"SUBSCRIBER":{"mandatory":["generatedEntityKey"],"optional":["administrativeState","ICC"]}}}                          |
      | PLC        | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey"],"optional":["HARDWARE","SOFTWARE"]},"SUBSCRIPTION":{"mandatory":["generatedEntityKey"],"optional":["administrativeState"]}}}                                                                                                                                                                                            |
      | RS232      | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["entityKey"],"optional":[]}}}                                                                                                                                                                                                                                                                                                                 |
      | RS422      | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["entityKey"],"optional":[]}}}                                                                                                                                                                                                                                                                                                                 |
      | RS485      | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["entityKey"],"optional":[]}}}                                                                                                                                                                                                                                                                                                                 |
      | SIGFOX     | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["entityKey"],"optional":["PAC"]},"SUBSCRIPTION":{"mandatory":["generatedEntityKey","HOME_OPERATOR","administrativeState","SIGFOX_DEVICE_TYPE"]}}}                                                                                                                                                                                             |
      | ZIGBEE     | {"communicationsModuleType":{"COMMUNICATIONS_MODULE":{"mandatory":["generatedEntityKey"],"optional":["HARDWARE","SOFTWARE"]},"SUBSCRIPTION":{"mandatory":["generatedEntityKey"],"optional":["administrativeState"]}}}                                                                                                                                                                                            |