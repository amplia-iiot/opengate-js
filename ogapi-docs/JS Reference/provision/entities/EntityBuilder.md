+++
title = "Entity Builder"
weight = 10
+++

EntityBuilder

### EntityBuilder Objects

```javascript
class EntityBuilder()
```

This is a base object that contains all you can do about Devices.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `Reference` _InternalOpenGateAPI_  - to the API object.


---

##### assetsBuilder


```javascript
function assetsBuilder(organization: string,timeout: number) -> 'Promise'
```

Get a AssetBuilder for operate with entities of type asset

**Arguments**:

- `organization` _string_  - required field
- `timeout` _number_ (optional) - timeout on request

**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
ogapi.assetsBuilder('orgname').then(function(assetBuilder){//...}).catch()
~~~

---

##### devicesBuilder


```javascript
function devicesBuilder(organization: string,timeout: number) -> 'Promise'
```

Get a DeviceBuilder for operate with entities of type device

**Arguments**:

- `organization` _string_  - required field
- `timeout` _number_ (optional) - timeout on request

**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
ogapi.devicesBuilder('orgname').then(function(deviceBuilder){//...}).catch()
~~~

---

##### newCsvBulkBuilder


```javascript
function newCsvBulkBuilder(organization: string,resource: string,timeout: number,async: boolean) -> 'CsvBulkBuilder'
```

Get a new CsvBulkBuilder 

**Arguments**:

- `organization` _string_  - required field.
- `resource` _string_  - required field. Type of resource: entities or tickets
- `timeout` _number_ (optional) - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception
- `async` _boolean_ (optional) - forces async execution for the bulk operation

**Returns**:


- _`CsvBulkBuilder`_ 


**Example**:

~~~javascript
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000, false)
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000, true)
~~~

---

##### newJsonBulkBuilder


```javascript
function newJsonBulkBuilder(organization: string,resource: string,timeout: number,async: boolean) -> 'JsonBulkBuilder'
```

Get a new JsonBulkBuilder 

**Arguments**:

- `organization` _string_  - required field.
- `resource` _string_  - required field. Type of resource: entities or tickets
- `timeout` _number_ (optional) - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception
- `async` _boolean_ (optional) - forces async execution for the bulk operation

**Returns**:


- _`JsonBulkBuilder`_ 


**Example**:

~~~javascript
 ogapi.newJsonBulkBuilder('orgname', 'entities', 10000)
~~~

---

##### newJsonFlattenedBulkBuilder


```javascript
function newJsonFlattenedBulkBuilder(organization: string,resource: string,timeout: number,async: boolean) -> 'JsonFlattenedBulkBuilder'
```

Get a new JsonFlattenedBulkBuilder 

**Arguments**:

- `organization` _string_  - required field.
- `resource` _string_  - required field. Type of resource: entities or tickets
- `timeout` _number_ (optional) - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception
- `async` _boolean_ (optional) - forces async execution for the bulk operation

**Returns**:


- _`JsonFlattenedBulkBuilder`_ 


**Example**:

~~~javascript
 ogapi.newJsonFlattenedBulkBuilder('orgname', 'entities', 10000)
~~~

---

##### subscribersBuilder


```javascript
function subscribersBuilder(organization: string,timeout: number) -> 'Promise'
```

Get a SubscriberBuilder for operate with entities of type subscriber

**Arguments**:

- `organization` _string_  - required field
- `timeout` _number_ (optional) - timeout on request

**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
ogapi.subscribersBuilder('orgname').then(function(subscriberBuilder){//...}).catch()
~~~

---

##### subscriptionsBuilder


```javascript
function subscriptionsBuilder(organization: string,timeout: number) -> 'Promise'
```

Get a SubscriptionBuilder for operate with entities of type subscription

**Arguments**:

- `organization` _string_  - required field
- `timeout` _number_ (optional) - timeout on request

**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
ogapi.subscriptionsBuilder('orgname').then(function(subscriptionBuilder){//...}).catch()
~~~

---

##### ticketsBuilder


```javascript
function ticketsBuilder(organization: string,timeout: number) -> 'Promise'
```

Get a TicketBuilder for operate with entities of type ticket

**Arguments**:

- `organization` _string_  - required field
- `timeout` _number_ (optional) - timeout on request

**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
ogapi.ticketsBuilder('orgname').then(function(ticketBuilder){//...}).catch()
~~~

---

