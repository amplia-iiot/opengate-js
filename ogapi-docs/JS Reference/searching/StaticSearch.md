+++
title = "Static Search"
weight = 10
+++

StaticSearch

### StaticSearch Objects

```javascript
class StaticSearch()
```

This extends Search and it allow make request to any available resource into static resources for Opengate North API


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is configuration about Opengate North API.
- `url` _string_  - this define a specific resource to make the search
- `filter` _object_  - this is the filter


---

##### execute


```javascript
function execute() -> 'Promise'
```

This invoke a dummy request to OpenGate North API and the callback is managed by promises


**Returns**:


- _`Promise`_ 


---

