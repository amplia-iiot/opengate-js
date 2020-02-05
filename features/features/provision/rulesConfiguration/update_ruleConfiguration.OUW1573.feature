#features/update_ruleConfiguration.OUW1573.feature
@provision
@update_ruleConfiguration
@rulesConfiguration
@OUW-1573
@OUW-1911
Feature: Managing a rule configuration - OUW-1573
    As a user of JsApi
    I want to update a rule configuration
    So I can update a rule configuration

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

    Scenario: updating a rule - OUW-1573
        And I want to update a "rule configuration"
        When I want to manage the next rule configuration from organization "rule_organization" and channel "default_channel":
            """
            {
            "name": "datastreamCurrentValueThreshold",
            "enabled": false,
            "severity": "URGENT",
            "open": false,
            "groupParent": false,
            "description": "Current value of datastream has an unusual value during a period",
            "conditions": [{
            "name": "datastreamCurrentValueThreshold",
            "delay": 15000,
            "parameters": [{
            "name": "datastream_name",
            "value": "DATASTREAM"
            }, {
            "name": "operator",
            "value": ">"
            }, {
            "name": "threshold",
            "value": "0"
            }, {
            "name": "curvalue_operator"
            }, {
            "name": "prevalue_operator"
            }
            ]
            }
            ],
            "notifications": [{
            "name": "datastreamCurrentValueThreshold",
            "enabled": false,
            "bearers": [{
            "name": "email",
            "enabled": false
            }, {
            "name": "snmp",
            "enabled": false
            }
            ]
            }
            ]
            }
            """
        And response code should be: 200

    Scenario: Deleting an organization to use in create device
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "rule_organization"
        Then I delete it