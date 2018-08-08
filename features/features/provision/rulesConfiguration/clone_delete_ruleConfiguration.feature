# features/update_ruleConfiguration.feature
@provision
@clone_ruleConfiguration
@delete_ruleConfiguration
@rulesConfiguration
Feature: Cloning and deleting a rule configuration
    As a user of JsApi
    I want to clone a rule configuration and then delete

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: try cloning a rule with the same name
        Given an ogapi "rule configuration actions" util with...
            | param               |
            | base_organization   |
            | base_channel        |
            | magneticTamperEvent |
        Then I clone it with...
            | param               |
            | magneticTamperEvent |
            | true                |
            | magneticTamperEvent |
            | true                |
        Then throws an error equal to "Parameter newRuleName must be a string, different than the original, cannot be empty and has a maximum length of 50"

    Scenario: try cloning a rule without all required params
        Given an ogapi "rule configuration actions" util with...
            | param               |
            | base_organization   |
            | base_channel        |
            | magneticTamperEvent |
        Then I clone it with...
            | param                     |
            | magneticTamperEvent_tests |
        Then throws an error equal to "Parameters newRuleName and one of newRuleOpenAction, newRuleCloseAction or newRuleNotifications must be defined"


    Scenario: cloning a rule
        Given an ogapi "rule configuration actions" util with...
            | param               |
            | base_organization   |
            | base_channel        |
            | magneticTamperEvent |
        Then I clone it with...
            | param                     |
            | magneticTamperEvent_tests |
            | true                      |
            | magneticTamperEvent       |
            | true                      |
        And response code should be: 201

    Scenario: deleting a rule
        When I want to delete the next rule configuration from organization "base_organization" and channel "base_channel":
            """
            {
            "name": "magneticTamperEvent_tests",
            "enabled": true,
            "severity": "URGENT",
            "open": true,
            "close": "magneticTamperEvent",
            "groupParent": false,
            "groupRule": "eventReceived",
            "description": "magneticTamperEvent evento",
            "conditions": [{
            "name": "magneticTamperEvent"
            }],
            "notifications": [{
            "name": "magneticTamperEvent",
            "enabled": false,
            "bearers": [{
            "name": "email",
            "enabled": false
            }, {
            "name": "snmp",
            "enabled": false
            }]
            }]
            }
            """
        And response code should be: 200
