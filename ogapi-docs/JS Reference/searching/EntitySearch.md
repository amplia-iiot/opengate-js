+++
title = "Entity Search"
weight = 10
+++

EntitySearch

### EntitySearch Objects

```javascript
class EntitySearch()
```

This extends Search and it allow make request to any available resource into /entities resource at Opengate North API


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is configuration about Opengate North API.
- `url` _string_  - this define a specific resource to make the search
- `filter` _object_  - this is the filter
- `limit` _object_  - this is the pagination about the search
- `sort` _object_  - this define parameters to order the result of search
- `group` _object_  - this define parameters to group
- `select` _object_  - this define fields to retrieve


---

##### execute


```javascript
function execute() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises


**Returns**:


- _`Promise`_ 


---

