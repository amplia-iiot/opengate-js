# features/update_user.feature
@provision
@users
@resetpassword
@wip

Feature: Reset password when the user forgets it
  As a user of JsApi
  I want to reset password
  So, I can change the password when dthe user forgets it.
  
  Scenario: Read mail, save token and set new password
    And I read reset password mail and save token
