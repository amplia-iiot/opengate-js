+++
title = "Json Flattened Bulk Builder"
weight = 10
+++

JsonFlattenedBulkBuilder

### JsonFlattenedBulkBuilder Objects

```javascript
class JsonFlattenedBulkBuilder()
```

Json builder. This builder give you the necessary tools to create a json bulk using our OpenGate REST.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - required field. This is ogapi instance
- `organization` _string_  - required field. This is the organization name where entities will be created, updated or deleted
- `resource` _resource_  - required field. This is the resource used for the bulk provision
- `timeout` _number_ (optional) - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception
- `async` _boolean_ (optional) - forces async execution for the bulk operation


---

