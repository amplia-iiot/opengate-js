+++
title = "Devices Search Builder"
weight = 10
+++

DevicesSearchBuilder

### DevicesSearchBuilder Objects

```javascript
class DevicesSearchBuilder()
```

Defined a search over Devices	


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `parent` _InternalOpenGateAPI_  - Instance of our InternalOpenGateAPI


---

##### group


```javascript
function group(group: object) -> 'DevicesSearchBuilder'
```

The search request will have this group by 

**Arguments**:

- `group` _object_  

**Returns**:


- _`DevicesSearchBuilder`_ 


**Example**:

~~~javascript

~~~

---

##### summary


```javascript
function summary() -> 'DevicesSearchBuilder'
```

The response will only have a summary information 


**Returns**:


- _`DevicesSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.devicesSearchBuilder().summary() 
~~~

---

