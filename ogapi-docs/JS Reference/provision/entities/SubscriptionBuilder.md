+++
title = "Subscription Builder"
weight = 10
+++

SubscriptionBuilder

### SubscriptionBuilder Objects

```javascript
class SubscriptionBuilder()
```

Subscription builder. This builder give you the necessary tools to create a subscription using our OpenGate REST.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is ogapi instance
- `organization` _string_  - this is the organization name where subscription will be created
- `allowedDatastreams` _array_ (optional) - Allowed datastreams to add into the new subscription
- `definedSchemas` _array_ (optional) - Jsonschema about all OpenGate specific types
- `jsonSchemaValidator` _Validator_ (optional) - Json schema validator tool


---

