+++
title = "User"
weight = 10
+++

User

### User Objects

```javascript
class User()
```

  This class allow make get request to user resource into Opengate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `Reference` _InternalOpenGateAPI_  - to the API object.


---

##### changeApiKey


```javascript
function changeApiKey(apiKey: String) -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function updates a apiKey of a user

**Arguments**:

- `apiKey` _String_  - required field

**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
 ogapi.usersBuilder().withEmail(example@example.es).withPassword(oldPassword).changeApiKey(newPassword);
~~~

---

##### changePassword


```javascript
function changePassword(newPassword: String) -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function updates a password of a user

**Arguments**:

- `newPassword` _String_  - required field

**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
 ogapi.usersBuilder().withEmail(example@example.es).withPassword(oldPassword).changePassword(newPassword);
~~~

---

##### generateApiKey


```javascript
function generateApiKey() -> '*'
```



**Returns**:


- _`*`_ 


---

##### login


```javascript
function login(email: String,password: String,twoFaCode: String) -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function get a JWT for user with Two Factor Authorithation (optional)

**Arguments**:

- `email` _String_  - required field
- `password` _String_  - required field
- `twoFaCode` _String_  - optional field

**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
 ogapi.usersBuilder().login(email, password);
 ogapi.usersBuilder().login(email, password, twoFaCode);
~~~

---

##### requestResetPassword


```javascript
function requestResetPassword() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function request for new password when the user forgets it. 
Sends a password recovery email


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
 ogapi.usersBuilder().withEmail(example@example.es).requestResetPassword()
~~~

---

##### updatePassword


```javascript
function updatePassword(newPassword: String,tokenId: String) -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function updates a password of a user with a tokenId

**Arguments**:

- `newPassword` _String_  - required field
- `tokenId` _String_  - required field

**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
 ogapi.usersBuilder().withEmail(example@example.es).updatePassword(newPassword, tokenid);
~~~

---

##### with2FaType


```javascript
function with2FaType(twoFaType: string) -> 'User'
```

Set the 2FaType attribute

**Arguments**:

- `twoFaType` _string_  - required field

**Returns**:


- _`User`_ 


---

##### withApiKey


```javascript
function withApiKey(apiKey: string) -> 'User'
```

Set the apiKey attribute. Only on update user

**Arguments**:

- `apiKey` _string_  - required field

**Returns**:


- _`User`_ 


---

##### withCountryCode


```javascript
function withCountryCode(countryCode: string) -> 'User'
```

Set the countryCode attribute

**Arguments**:

- `countryCode` _string_  - required field

**Returns**:


- _`User`_ 


---

##### withDescription


```javascript
function withDescription(description: string) -> 'User'
```

Set the description attribute

**Arguments**:

- `description` _string_  - required field

**Returns**:


- _`User`_ 


---

##### withDomain


```javascript
function withDomain(domain: string) -> 'User'
```

Set the domain attribute

**Arguments**:

- `domain` _string_  - required field

**Returns**:


- _`User`_ 


---

##### withEmail


```javascript
function withEmail(email: string) -> 'User'
```

Set the email attribute

**Arguments**:

- `email` _string_  - required field

**Returns**:


- _`User`_ 


---

##### withForcePasswordChange


```javascript
function withForcePasswordChange(forcePasswordChange: boolean) -> 'User'
```

Set the forcePasswordChange: if true Forces you to reset your password on your next login attempt.

**Arguments**:

- `forcePasswordChange` _boolean_  

**Returns**:


- _`User`_ 


---

##### withLangCode


```javascript
function withLangCode(langCode: string) -> 'User'
```

Set the langCode attribute

**Arguments**:

- `langCode` _string_  - required field

**Returns**:


- _`User`_ 


---

##### withName


```javascript
function withName(name: string) -> 'User'
```

Set the name attribute

**Arguments**:

- `name` _string_  - required field

**Returns**:


- _`User`_ 


---

##### withPassword


```javascript
function withPassword(password: string) -> 'User'
```

Set the password attribute

**Arguments**:

- `password` _string_  - required field

**Returns**:


- _`User`_ 


---

##### withProfile


```javascript
function withProfile(profile: string) -> 'User'
```

Set the profile attribute

**Arguments**:

- `profile` _string_  - required field

**Returns**:


- _`User`_ 


---

##### withSurname


```javascript
function withSurname(surname: string) -> 'User'
```

Set the surname attribute

**Arguments**:

- `surname` _string_  - required field

**Returns**:


- _`User`_ 


---

##### withTimezone


```javascript
function withTimezone(timezone: string) -> 'User'
```

Set the timezone attribute

**Arguments**:

- `timezone` _string_  - required field

**Returns**:


- _`User`_ 


---

##### withWorkgroup


```javascript
function withWorkgroup(workgroup: string) -> 'User'
```

Set the workgroup attribute

**Arguments**:

- `workgroup` _string_  - required field

**Returns**:


- _`User`_ 


---

