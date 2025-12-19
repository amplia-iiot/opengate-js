+++
title = "Device Message"
weight = 10
+++

DeviceMessage

### DeviceMessage Objects

```javascript
class DeviceMessage()
```

This is a base object contains methods to send unstructured IoT information to be processed & collected by the platform.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `Reference` _InternalOpenGateAPI_  - to the API object.


---

##### create


```javascript
function create() -> '*'
```



**Returns**:


- _`*`_ 


---

##### withDataStream


```javascript
function withDataStream(datastream: Datastream) -> 'deviceMessages'
```

Set the datastream attribute

**Arguments**:

- `datastream` _Datastream_  - required field

**Returns**:


- _`deviceMessages`_ 


---

##### withDataStreamVersion


```javascript
function withDataStreamVersion(version: string) -> 'deviceMessages'
```

Set the dataStream version attribute

**Arguments**:

- `version` _string_  - required field

**Returns**:


- _`deviceMessages`_ 


---

##### withDeviceId


```javascript
function withDeviceId(deviceId: string) -> 'deviceMessages'
```

Set the deviceId attribute

**Arguments**:

- `deviceId` _string_  - optional field

**Returns**:


- _`deviceMessages`_ 


---

##### withDmmVersion


```javascript
function withDmmVersion(version: string) -> 'deviceMessages'
```

Set the version attribute

**Arguments**:

- `version` _string_  - required field

**Returns**:


- _`deviceMessages`_ 


---

##### withId


```javascript
function withId(id: string) -> 'deviceMessages'
```

Set the id attribute

**Arguments**:

- `id` _string_  - required field

**Returns**:


- _`deviceMessages`_ 


---

