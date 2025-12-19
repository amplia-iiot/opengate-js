+++
title = "Generic Finder"
weight = 10
+++

GenericFinder

### GenericFinder Objects

```javascript
class GenericFinder()
```

  This class allow make get request to user resource into Opengate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - Reference to the API object.
- `source` _string_  - Relative url where is located the resource.
- `reponseJsonData` _string_  - Relative url where is located the resource. Can be null
- `error_not_found` _string_  - String error which will be thrown on not_found error.
- `serviceBaseURL` _string_  - base of the uri petition


---

