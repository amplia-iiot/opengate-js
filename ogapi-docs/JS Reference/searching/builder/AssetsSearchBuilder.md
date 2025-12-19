+++
title = "Assets Search Builder"
weight = 10
+++

AssetsSearchBuilder

### AssetsSearchBuilder Objects

```javascript
class AssetsSearchBuilder()
```

Defined a search over Assets	


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `parent` _InternalOpenGateAPI_  - Instance of our InternalOpenGateAPI


---

##### build


```javascript
function build() -> 'Search'
```

Build a instance of Search 


**Returns**:


- _`Search`_ 


**Example**:

~~~javascript
 ogapi.assetsSearchBuilder().onProvisioned().build()
~~~

---

##### group


```javascript
function group(group: object) -> 'AssetsSearchBuilder'
```

The search request will have this group by 

**Arguments**:

- `group` _object_  

**Returns**:


- _`AssetsSearchBuilder`_ 


**Example**:

~~~javascript

~~~

---

##### select


```javascript
function select(select: SelectBuilder,object) -> 'AssetsSearchBuilder'
```

The search request will have this filter 

**Arguments**:

- `select` _SelectBuilder,object_  

**Returns**:


- _`AssetsSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.assetsSearchBuilder().select(
     ogapi.newSelectBuilder().add(SE.element("provision.device.identifier", ["value"], "id"), SE.add("device.temperature.value", ["value"]))
 ) // Setting SelectBuilder
 ogapi.assetsSearchBuilder().select({ "elements": [{"name": "provision.device.identifier",
	"fields": [{"field": "value","alias": "identifier"}]},
     {"name": "device.temperature.value","fields": [{"field": "value","alias": "identifier"}]}]
  }) //Custom select
~~~

---

##### summary


```javascript
function summary() -> 'AssetsSearchBuilder'
```

The response will only have a summary information 


**Returns**:


- _`AssetsSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.assetsSearchBuilder().summary() 
~~~

---

