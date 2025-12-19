+++
title = "Devices Plans Search Builder"
weight = 10
+++

DevicesPlansSearchBuilder

### DevicesPlansSearchBuilder Objects

```javascript
class DevicesPlansSearchBuilder()
```

Defined a search over DevicePlansSearchBuilder	


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `parent` _InternalOpenGateAPI_  - Instance of our InternalOpenGateAPI


---

##### withDomain


```javascript
function withDomain(domainName: string) -> 'DevicePlansSearchBuilder'
```

Sets de domain name to search

**Arguments**:

- `domainName` _string_  - domain name

**Returns**:


- _`DevicePlansSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.plansSearchBuilder().withDomain('myDomain').build()
~~~

---

