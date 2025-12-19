+++
title = "WP Search"
weight = 10
+++

WPSearch

### WPSearch Objects

```javascript
class WPSearch()
```

This extends BaseSearch and allow make request to any available resource into Opengate North API.
The resource does not have the 'search' prefix. For this, use class Search


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is configuration about Opengate North API.
- `url` _string_  - this define a specific resource to make the search
- `filter` _object_  - this is the filter
- `limit` _object_  - this is the pagination about the search
- `sort` _object_  - this defined parameters to order the result of search
- `group` _object_  
- `select` _object_  
- `timeout` _nubmer_  


---

