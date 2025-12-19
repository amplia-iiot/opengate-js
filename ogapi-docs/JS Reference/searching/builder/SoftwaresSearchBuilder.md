+++
title = "Softwares Search Builder"
weight = 10
+++

SoftwaresSearchBuilder

### SoftwaresSearchBuilder Objects

```javascript
class SoftwaresSearchBuilder()
```

Defined a search over Datastreams    


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `parent` _InternalOpenGateAPI_  - Instance of our InternalOpenGateAPI


---

##### fluentFilter


```javascript
function fluentFilter()
```




---

##### tagsFilter


```javascript
function tagsFilter()
```




---

##### withHardwareId


```javascript
function withHardwareId(hardwareId: string) -> 'SoftwaresSearchBuilder'
```

Sets hardware id to search

**Arguments**:

- `hardwareId` _string_  - hardware id

**Returns**:


- _`SoftwaresSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.hardwareSearchBuilder().withHardwareId('myHardware').build()
~~~

---

##### withId


```javascript
function withId(softwareId: string) -> 'SoftwaresSearchBuilder'
```

Sets softwareId to search

**Arguments**:

- `softwareId` _string_  - software id

**Returns**:


- _`SoftwaresSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.softwareSearchBuilder().withId('mySoftwareId').build()
~~~

---

##### withManufacturer


```javascript
function withManufacturer(manufacturerName: string) -> 'SoftwaresSearchBuilder'
```

Set feedName to search

**Arguments**:

- `manufacturerName` _string_  - manufacturer name

**Returns**:


- _`SoftwaresSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.softwareSearchBuilder().withManufacturer('myManufacturer').build()
~~~

---

##### withModel


```javascript
function withModel(modelName: string) -> 'SoftwaresSearchBuilder'
```

Set modelName to search

**Arguments**:

- `modelName` _string_  - model name

**Returns**:


- _`SoftwaresSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.softwareSearchBuilder().withModel('myModel').build()
~~~

---

##### withModelVersion


```javascript
function withModelVersion(modelVersion: string) -> 'SoftwaresSearchBuilder'
```

Set modelVersion to search

**Arguments**:

- `modelVersion` _string_  - model version

**Returns**:


- _`SoftwaresSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.softwareSearchBuilder().withModelVersion('myModelVersion).build()
~~~

---

##### withName


```javascript
function withName(softwareName: string) -> 'SoftwaresSearchBuilder'
```

Set softwareName to search

**Arguments**:

- `softwareName` _string_  - software name

**Returns**:


- _`SoftwaresSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.softwareSearchBuilder().withName('mySoftware').build()
~~~

---

##### withType


```javascript
function withType(softwareType: string) -> 'SoftwaresSearchBuilder'
```

Set softwareType to search

**Arguments**:

- `softwareType` _string_  - software version

**Returns**:


- _`SoftwaresSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.softwareSearchBuilder().withType('mySoftwareType).build()
~~~

---

##### withVersion


```javascript
function withVersion(softwareVersion: string) -> 'SoftwaresSearchBuilder'
```

Set softwareVersion to search

**Arguments**:

- `softwareVersion` _string_  - software version

**Returns**:


- _`SoftwaresSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.softwareSearchBuilder().withVersion('mySoftwareVersion).build()
~~~

---

