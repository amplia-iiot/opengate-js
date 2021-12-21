# features/searching_executions.feature
@device_builder
@operations
@searching
@searching_executions
@prueba23
Feature: Searching operation's executions
As a user of JsApi
I want to search operation's executions

    Background:
        Given an apikey user by "620567f8-cfc6-4707-a6a7-8206052e5c4a"

    Scenario: Creating an organization to use in create device
        Given an ogapi "executions history builder" util
        When I build it
        And I execute it
        Then does not throws an error
