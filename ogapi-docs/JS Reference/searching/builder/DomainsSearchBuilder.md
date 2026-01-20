+++
title = "Domains Search Builder"
weight = 10
+++

DomainsSearchBuilder

### DomainsSearchBuilder Objects

```javascript
class DomainsSearchBuilder()
```

Defined a search over Domains	


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `parent` _InternalOpenGateAPI_  - Instance of our InternalOpenGateAPI


---

##### summary


```javascript
function summary() -> 'SearchWithSummaryBuilder'
```

The response will only have a summary information 


**Returns**:


- _`SearchWithSummaryBuilder`_ 


**Example**:

~~~javascript
ogapi.domainsSearchBuilder().summary() 
~~~

---

