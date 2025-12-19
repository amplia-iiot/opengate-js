+++
title = "Connector Functions"
weight = 10
+++

ConnectorFunctions

### ConnectorFunctions Objects

```javascript
class ConnectorFunctions()
```

This is a base object than contains all you can about connector functions catalog


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  
- `identifier` _String_  
- `connectorFunction` _Object_  


---

##### addNorthCriteria


```javascript
function addNorthCriteria(northCriteria: Object) -> 'ConnectorFunctionsCatalog'
```

Add northCriteria to parameter northCriterias. Each element is defined by path and value 

**Arguments**:

- `northCriteria` _Object_  

**Returns**:


- _`ConnectorFunctionsCatalog`_ 


---

##### addSouthCriteria


```javascript
function addSouthCriteria(southCriteria: String) -> '*'
```

Add southCriteria to parameter southCriterias. Each string can represent an URI, topic, OID...

**Arguments**:

- `southCriteria` _String_  

**Returns**:


- _`*`_ 


---

##### create


```javascript
function create() -> 'Promise'
```

Create a new connector function catalog


**Returns**:


- _`Promise`_ 


---

##### withCloneable


```javascript
function withCloneable(cloneable: Boolean) -> 'ConnectorFunctionsCatalog'
```

Indicates whether or not the Connector Function is cloneable.

**Arguments**:

- `cloneable` _Boolean_  

**Returns**:


- _`ConnectorFunctionsCatalog`_ 


---

##### withDescription


```javascript
function withDescription(description: String) -> 'ConnectorFunctionsCatalog'
```

Description of the connector function. This field is optional.

**Arguments**:

- `description` _String_  

**Returns**:


- _`ConnectorFunctionsCatalog`_ 


---

##### withIdentifier


```javascript
function withIdentifier(identifier: String) -> 'ConnectorFunctionsCatalog'
```

Set the identifier 

**Arguments**:

- `identifier` _String_  

**Returns**:


- _`ConnectorFunctionsCatalog`_ 


---

##### withJavascript


```javascript
function withJavascript(javascript: String) -> 'ConnectorFunctionsCatalog'
```

Connector function javascript code

**Arguments**:

- `javascript` _String_  

**Returns**:


- _`ConnectorFunctionsCatalog`_ 


---

##### withName


```javascript
function withName(name: String) -> 'ConnectorFunctionsCatalog'
```

Descriptive and unique name

**Arguments**:

- `name` _String_  

**Returns**:


- _`ConnectorFunctionsCatalog`_ 


---

##### withNorthCriterias


```javascript
function withNorthCriterias(northCriterias: Array) -> 'ConnectorFunctionsCatalog'
```

Connector Function selection criteria for operation requests. This field is mandatory if Connector Function type is REQUEST. ⮕ [ each element is defined by path and value ]

**Arguments**:

- `northCriterias` _Array_  

**Returns**:


- _`ConnectorFunctionsCatalog`_ 


---

##### withOperationalStatus


```javascript
function withOperationalStatus(operationalStatus: String) -> 'ConnectorFunctionsCatalog'
```


Connector Function status
Allowed: DISABLED┃PRODUCTION┃TEST

**Arguments**:

- `operationalStatus` _String_  

**Returns**:


- _`ConnectorFunctionsCatalog`_ 


---

##### withOperationName


```javascript
function withOperationName(operationName: String) -> 'ConnectorFunctionsCatalog'
```

Used to filter connector functions by operation name. If Connector Function type is REQUEST, this field is mandatory and defined name must be an operation name available for specified Api Key. If the type is COLLECTION or RESPONSE, this field must be null.

**Arguments**:

- `operationName` _String_  

**Returns**:


- _`ConnectorFunctionsCatalog`_ 


---

##### withPayloadType


```javascript
function withPayloadType(payloadType: String) -> 'ConnectorFunctionsCatalog'
```

Enum of allowed types for connector function&#x27;s payload data. Request Connector Functions only accept JSON. 
Allowed: TEXT┃JSON┃BINARY

**Arguments**:

- `payloadType` _String_  

**Returns**:


- _`ConnectorFunctionsCatalog`_ 


---

##### withSouthCriterias


```javascript
function withSouthCriterias(southCriterias: Array) -> 'ConnectorFunctionsCatalog'
```

Connector Function selection criteria for operation responses and data collection. This field is mandatory if Connector Function type is COLLECTION or RESPONSE. ⮕ [ each string can represent an URI, topic, OID... ]. Each string can represent an URI, topic, OID...

**Arguments**:

- `southCriterias` _Array_  

**Returns**:


- _`ConnectorFunctionsCatalog`_ 


---

##### withType


```javascript
function withType(type: String) -> 'ConnectorFunctionsCatalog'
```


Type of connector function, this is mandatory. Keep in mind that you will be not allowed to modify it.
Allowed: COLLECTION┃REQUEST┃RESPONSE

**Arguments**:

- `type` _String_  

**Returns**:


- _`ConnectorFunctionsCatalog`_ 


---

