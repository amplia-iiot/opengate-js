+++
title = "User Finder"
weight = 10
+++

UserFinder

### UserFinder Objects

```javascript
class UserFinder()
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

##### findByEmail


```javascript
function findByEmail(email: string) -> 'Promise'
```

Find a specify user by a email. This execute a GET http method

**Arguments**:

- `email` _string_  - Email of the user.

**Returns**:


- _`Promise`_ 


---

##### findByEmailAndPassword


```javascript
function findByEmailAndPassword(email: string,password: string) -> 'Promise'
```

Find a specific user with apiKey by a email and password. This execute a GET http method

**Arguments**:

- `email` _string_  - Email of the user.
- `password` _string_  - password of the user.

**Returns**:


- _`Promise`_ 


---

