+++
title = "User Profiles Search Builder"
weight = 10
+++

UserProfilesSearchBuilder

### UserProfilesSearchBuilder Objects

```javascript
class UserProfilesSearchBuilder()
```

Defined a search over operational status catalogs    


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `parent` _InternalOpenGateAPI_  - Instance of our InternalOpenGateAPI


---

##### build


```javascript
function build() -> 'StaticSearch'
```

Build a instance of StaticSearch 


**Returns**:


- _`StaticSearch`_ 


**Example**:

~~~javascript
  ogapi.userProfileSearchBuilder().filter({and:[]}).build()
~~~

---

##### customFilters


```javascript
function customFilters()
```




---

##### withId


```javascript
function withId(userProfileId: string) -> 'userProfileSearchBuilder'
```

Sets id to search

**Arguments**:

- `userProfileId` _string_  - user profile id

**Returns**:


- _`userProfileSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.userProfileSearchBuilder().withId('myId').build()
~~~

---

