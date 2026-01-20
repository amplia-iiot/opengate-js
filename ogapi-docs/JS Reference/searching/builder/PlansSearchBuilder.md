+++
title = "Plans Search Builder"
weight = 10
+++

PlansSearchBuilder

### PlansSearchBuilder Objects

```javascript
class PlansSearchBuilder()
```

Defined a search over PlansSearchBuilder	


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `parent` _InternalOpenGateAPI_  - Instance of our InternalOpenGateAPI


---

##### withDomain


```javascript
function withDomain(domainName: string) -> 'PlansSearchBuilder'
```

Sets de domain name to search

**Arguments**:

- `domainName` _string_  - domain name

**Returns**:


- _`PlansSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.plansSearchBuilder().withDomain('myDomain').build()
~~~

---

