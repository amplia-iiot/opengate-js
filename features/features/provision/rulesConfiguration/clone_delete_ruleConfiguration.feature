#features/clone_delete_ruleConfiguration.feature
@provision
@clone_ruleConfiguration
@delete_ruleConfiguration
@rulesConfiguration
@OUW-1911
Feature: Cloning and deleting a rule configuration
    As a user of JsApi
    I want to clone a rule configuration and then delete

    Background:
        Given an apikey user by "require-real-apikey"

    Scenario: Creating an organization to use in test
        Given an ogapi "organizations builder" util
        Then I want to create an "organization"
        And the "name" "rule_organization"
        And the "description" "device organization"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        Then I create it
        And response code should be: 201

    Scenario: try deleting a rule
        And I want to update a "rule configuration"
        When I want to delete the next rule configuration from organization "rule_organization" and channel "default_channel":
            """
            {
            "name": "diagnosticFailed_tests"
            }
            """

    Scenario: try cloning a rule with the same name
        Given an ogapi "rule configuration actions" util with...
            | param             |
            | rule_organization |
            | default_channel   |
            | diagnosticFailed  |
        Then I clone it with...
            | param            |
            | diagnosticFailed |
            | true             |
            | diagnosticFailed |
            | true             |
        Then throws an error equal to "Parameter newRuleName must be a string, different than the original, cannot be empty and has a maximum length of 50"

    Scenario: try cloning a rule without all required params
        Given an ogapi "rule configuration actions" util with...
            | param             |
            | rule_organization |
            | default_channel   |
            | diagnosticFailed  |
        Then I clone it with...
            | param                  |
            | diagnosticFailed_tests |
        Then throws an error equal to "Parameters newRuleName and one of newRuleOpenAction, newRuleCloseAction or newRuleNotifications must be defined"


    Scenario: cloning a rule
        Given an ogapi "rule configuration actions" util with...
            | param             |
            | rule_organization |
            | default_channel   |
            | diagnosticFailed  |
        Then I clone it with...
            | param                  |
            | diagnosticFailed_tests |
            | true                   |
            | diagnosticFailed_tests |
            | true                   |
        And response code should be: 201

    Scenario: deleting a rule
        When I want to delete the next rule configuration from organization "rule_organization" and channel "default_channel":
            """
            {
            "name": "diagnosticFailed_tests"
            }
            """
        And response code should be: 200

    Scenario: Deleting an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "rule_organization"
        Then I delete it