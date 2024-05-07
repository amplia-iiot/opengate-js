# features/provision/users/update_password.feature
@provision
@users
@update_password
@wip

Feature: Update password with logged in user or because it is not secure
    As a user of JsApi
    I want to reset password
    So, I can change the password while logged in or because it is insecure


    Scenario: Precondition - Prepare scenario
        Given an email "YOUR_EMAIL" and password "YOUR_PASSWORD" the user logs in
        Then an ogapi "organizations builder" util
        And I want to create a "organization"
        And the "name" "user_organization"
        And the "description" "Organization test"
        And the "country code" "ES"
        And the "lang code" "es"
        And the "time zone" "Europe/Andorra"
        And the "zoom" 10
        And the "location" with 1 and 1
        Then I delete it
        Then I create it
        Then response code should be: 201
        Given an ogapi "users builder" util
        Then I want to create a "user"
        And the "email" "ogux_ogapi@amplia.com"
        And the "workgroup" "user_organization"
        And the "domain" "user_organization"
        And the "password" "Nvoiqewvouoiu32j@#!!"
        And the "profile" "admin"
        And the "countryCode" "ES"
        And the "langCode" "en"
        And the "name" "test name"
        And the "surname" "test surname"
        And the "description" "user description"
        Then I delete it
        And I create it
        Then response code should be: 201

    Scenario: Update password because it is insecure
        Given an user remove her authorization options
        Then an ogapi "users builder" util
        Then I want to update a "user"
        And the "email" "ogux_ogapi@amplia.com"
        And the "password" "Nvoiqewvouoiu32j@#!!"
        Then I update password with "Nvoiqewvouoiu32j@"
        Then response code should be: 200

    Scenario: Update password with logged in user
        Given an email "YOUR_EMAIL" and password "YOUR_PASSWORD" the user logs in
        Given an ogapi "users builder" util
        Then I want to update a "user"
        And the "email" "ogux_ogapi@amplia.com"
        And the "password" "Nvoiqewvouoiu32j@"
        Then I update password with "Nvoiqewvouoiu32j@#!!"
        And response code should be: 200

    Scenario: Update apiKey
        Given an user remove her authorization options
        Given an ogapi "users builder" util
        Then I want to update a "user"
        And the "email" "ogux_ogapi@amplia.com"
        And the "password" "Nvoiqewvouoiu32j@"
        #npx uuid v4 for generate UUID
        Then I update apiKey with "7d58d9e2-c372-4792-b87e-f9b368dc46b7"
        And response code should be: 200

    Scenario: Deleting an user and organization to use
        Given an email "YOUR_EMAIL" and password "YOUR_PASSWORD" the user logs in
        And an ogapi "users builder" util
        Then I want to delete a "user"
        And the "email" "ogux_ogapi@amplia.com"
        Then I delete it
        Given an ogapi "organizations builder" util
        Then I want to delete an "organization"
        And the "name" "user_organization"
        Then I delete it

