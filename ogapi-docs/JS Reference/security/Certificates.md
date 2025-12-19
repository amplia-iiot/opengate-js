+++
title = "Certificates"
weight = 10
+++

Certificates

### Certificates Objects

```javascript
class Certificates()
```

This is a base object that contains all you can do about Certificates.


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
function create(rawFile: File) -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This method create an element certificate

**Arguments**:

- `rawFile` _File_  - this File is the certificate

**Returns**:


- _`Promise`_ 


---

##### update


```javascript
function update() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This method update an element certificate


**Returns**:


- _`Promise`_ 


---

##### withAdministrativeState


```javascript
function withAdministrativeState(administrativeState: string) -> 'Certificates'
```

Set the administrativeState attribute

**Arguments**:

- `administrativeState` _string_  

**Returns**:


- _`Certificates`_ 


---

##### withDescription


```javascript
function withDescription(description: string) -> 'Certificates'
```

Set the description attribute

**Arguments**:

- `description` _string_  - optional field

**Returns**:


- _`Certificates`_ 


---

##### withDomains


```javascript
function withDomains(domains: Array) -> 'Certificates'
```

Set the domains attribute

**Arguments**:

- `domains` _Array_  

**Returns**:


- _`Certificates`_ 


---

##### withId


```javascript
function withId(id: string) -> 'Certificates'
```

Set the id attribute

**Arguments**:

- `id` _string_  - required field on delete

**Returns**:


- _`Certificates`_ 


---

##### withName


```javascript
function withName(name: string) -> 'Certificates'
```

Set the name attribute

**Arguments**:

- `name` _string_  - required field

**Returns**:


- _`Certificates`_ 


---

##### withParameters


```javascript
function withParameters(parameters: string) -> 'Certificates'
```

Set the parameters attribute

**Arguments**:

- `parameters` _string_  - optional field

**Returns**:


- _`Certificates`_ 


---

##### withTags


```javascript
function withTags(tags: Array) -> 'Certificates'
```

Set the tags attribute

**Arguments**:

- `tags` _Array_  

**Returns**:


- _`Certificates`_ 


---

##### withUsages


```javascript
function withUsages(usages: Array) -> 'Certificates'
```

Set the usages attribute

**Arguments**:

- `usages` _Array_  

**Returns**:


- _`Certificates`_ 


---

