+++
title = "Timeserie Search Builder"
weight = 10
+++

TimeserieSearchBuilder

### TimeserieSearchBuilder Objects

```javascript
class TimeserieSearchBuilder()
```

Defined a search over timeseries	


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
 ogapi.timeserieSearchBuilder(organization, timeserieId).build()
~~~

---

##### group


```javascript
function group(group: object) -> 'TimeserieSearchBuilder'
```

The search request will have this group by 

**Arguments**:

- `group` _object_  

**Returns**:


- _`TimeserieSearchBuilder`_ 


**Example**:

~~~javascript

~~~

---

##### select


```javascript
function select(select: SelectBuilder,object) -> 'TimeserieSearchBuilder'
```

The search request will have this filter 

**Arguments**:

- `select` _SelectBuilder,object_  

**Returns**:


- _`TimeserieSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.timeserieSearchBuilder(organization, timeserieId).select(
     ogapi.newSelectBuilder().add(SE.element("Identifier", ["value"], "id"), SE.add("Temperature", ["value"]))
 ) // Setting SelectBuilder
 ogapi.timeserieSearchBuilder(organization, timeserieId).select({ "elements": [{"name": "Identifier",
	"fields": [{"field": "value","alias": "identifier"}]},
     {"name": "Temperature","fields": [{"field": "value","alias": "identifier"}]}]
  }) //Custom select
~~~

---

