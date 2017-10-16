# features/update_ruleConfiguration.feature
@provision
@update_ruleConfiguration
@rulesConfiguration
Feature: Managing a rule configuration
  As a user of JsApi
  I want to update a rule configuration
  So I can update a rule configuration

  Background:
    Given an apikey user by "require-real-apikey"
  	#And an ogapi "rule configuration builder" util 
    And I want to update a "rule configuration"

 # Scenario: Checking parameter description
  #  And the "description" 3232
   # Then throws an error equal to "Parameter description must be a string and has a maximum length of 250"

  Scenario: updating a rule
    When I want to manage the next rule configuration from organization "base_organization" and channel "base_channel":
    """
    {
        "name": "mobileCoverageLow",
        "enabled": true,
        "severity": "INFORMATIVE",
        "description": "Cobertura más baja que un umbral",
        "conditions": [
            {
                "name": "mobileCoverageLow_1",
                "parameters": [
                    {
                        "name": "threshold",
                        "value": "-93"
                    }
                ]
            },
            {
                "name": "mobileCoverageLow_2",
                "delay": 300000,
                "parameters": [
                    {
                        "name": "threshold",
                        "value": "-93"
                    }
                ]
            }
        ],
        "notifications": [
            {
                "name": "mobileCoverageLow",
                "enabled": true,
                "bearers": [
                    {
                        "name": "snmp",
                        "enabled": true,
                        "recipients": [
                            "172.19.17.80;162"
                        ]
                    }
                ]
            }
        ]
    }
"""
  #Then I update it
  And response code should be: 200 
