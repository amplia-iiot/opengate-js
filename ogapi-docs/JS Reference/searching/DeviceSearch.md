+++
title = "Device Search"
weight = 10
+++

DeviceSearch

### DeviceSearch Objects

```javascript
class DeviceSearch()
```

This extends Search and allow make request to any available resource into Opengate North API.


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
- `sort` _object_  - this defined parameters to order the result of search
- `group` _object_  - this defined the group by


---

##### execute


```javascript
function execute() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises


**Returns**:


- _`Promise`_ 


---

