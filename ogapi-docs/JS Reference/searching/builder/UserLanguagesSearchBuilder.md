+++
title = "User Languages Search Builder"
weight = 10
+++

UserLanguagesSearchBuilder

### UserLanguagesSearchBuilder Objects

```javascript
class UserLanguagesSearchBuilder()
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
  ogapi.userLanguagesSearchBuilder().filter({and:[]}).build()
~~~

---

##### customFilters


```javascript
function customFilters()
```




---

