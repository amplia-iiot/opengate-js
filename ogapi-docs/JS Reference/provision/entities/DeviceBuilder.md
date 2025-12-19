+++
title = "Device Builder"
weight = 10
+++

DeviceBuilder

### DeviceBuilder Objects

```javascript
class DeviceBuilder()
```

Device builder. This builder give you the necessary tools to create a device using our OpenGate REST.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is ogapi instance
- `organization` _string_  - this is the organization name where device will be created
- `allowedDatastreams` _array_ (optional) - Allowed datastreams to add into the new device
- `definedSchemas` _array_ (optional) - Jsonschema about all OpenGate specific types
- `jsonSchemaValidator` _Validator_ (optional) - Json schema validator tool
- `ms` _number_  - timeout in milliseconds


---

##### create


```javascript
function create() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function create a entity of provision


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
 ogapi.organizationsBuilder().create()
~~~

---

##### update


```javascript
function update() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function updates a entity of provision and check if any subscriber/subscription exits or no. 
If a subscriber/subscription not exists then this entities will be created and after that will be added to entity box.


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
 ogapi.entityBuilder.devicesBuilder().update()
~~~

---

