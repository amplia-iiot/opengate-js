# features/update_ruleConfiguration.feature
@provision
@update_ruleConfiguration
@rulesConfiguration
@OUW-1573
Feature: Managing a rule configuration - OUW-1573
    As a user of JsApi
    I want to update a rule configuration
    So I can update a rule configuration

    Background:
        Given an apikey user by "require-real-apikey"
        And I want to update a "rule configuration"

    Scenario: updating a rule - OUW-1573
        When I want to manage the next rule configuration from organization "base_organization" and channel "base_channel":
            """
            {
            "name": "datastreamCurrentValueThresholdTemp",
            "enabled": false,
            "severity": "URGENT",
            "open": true,
            "groupParent": false,
            "description": "Current value of datastream has an unusual value during a period",
            "conditions": [{
            "name": "datastreamCurrentValueThresholdTemp_2",
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
            }
            ]
            }, {
            "name": "datastreamCurrentValueThresholdTemp_1",
            "parameters": [{
            "name": "datastream_name"
            }, {
            "name": "curvalue_operator"
            }, {
            "name": "threshold"
            }, {
            "name": "prevalue_operator"
            }
            ]
            }
            ],
            "notifications": [{
            "name": "datastreamCurrentValueThresholdTemp",
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


