+++
title = "Tickets Search Builder"
weight = 10
+++

TicketsSearchBuilder

### TicketsSearchBuilder Objects

```javascript
class TicketsSearchBuilder()
```

Defined a search over Devices	


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `parent` _InternalOpenGateAPI_  - Instance of our InternalOpenGateAPI


---

##### disableDefaultSorted


```javascript
function disableDefaultSorted() -> 'TicketsSearchBuilder'
```

The response will return a response without sorted


**Returns**:


- _`TicketsSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.ticketsSearchBuilder().disableDefaultSorted() 
~~~

---

##### flattened


```javascript
function flattened() -> 'TicketsSearchBuilder'
```

The response will return a flattened response


**Returns**:


- _`TicketsSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.ticketsSearchBuilder().flattened() 
~~~

---

##### group


```javascript
function group(group: object) -> 'SearchBuilder'
```

The search request will have this group by 

**Arguments**:

- `group` _object_  

**Returns**:


- _`SearchBuilder`_ 


**Example**:

~~~javascript

~~~

---

##### select


```javascript
function select(select: SelectBuilder,object) -> 'SearchBuilder'
```

The search request will have this filter 

**Arguments**:

- `select` _SelectBuilder,object_  

**Returns**:


- _`SearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.ticketsSearchBuilder().select(
     ogapi.newSelectBuilder().add(SE.element("provision.ticket.identifier", [[{"field": "value","alias": "identifier"}], ), SE.add("device.temperature.value", [[{"field": "value"}]))
 ) // Setting SelectBuilder
 ogapi.ticketsSearchBuilder().select({ "elements": [{"name": "provision.device.identifier",
	"fields": [{"field": "value","alias": "identifier"}]},
     {"name": "provision.ticket.name","fields": [{"field": "value","alias": "identifier"}]}]
  }) //Custom select
~~~

---

##### summary


```javascript
function summary() -> 'TicketsSearchBuilder'
```

The response will only have a summary information 


**Returns**:


- _`TicketsSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.ticketsSearchBuilder().summary() 
~~~

---

