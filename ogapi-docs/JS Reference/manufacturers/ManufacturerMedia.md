+++
title = "Manufacturer Media"
weight = 10
+++

ManufacturerMedia

### ManufacturerMedia Objects

```javascript
class ManufacturerMedia()
```

This is a base object that contains all you can do about ManufacturerMedia.


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
This method create an element deploymentElement

**Arguments**:

- `rawFile` _File_  - this File is the deployment element

**Returns**:


- _`Promise`_ 


---

##### update


```javascript
function update()
```




---

##### withFile


```javascript
function withFile(file: string) -> 'ManufacturerMedia'
```

Set the file attribute

**Arguments**:

- `file` _string_  - required field

**Returns**:


- _`ManufacturerMedia`_ 


---

##### withIdentifier


```javascript
function withIdentifier(id: string) -> 'ManufacturerMedia'
```

Set the identifier attribute

**Arguments**:

- `id` _string_  - required field

**Returns**:


- _`ManufacturerMedia`_ 


---

##### withName


```javascript
function withName(name: string) -> 'ManufacturerMedia'
```

Set the name attribute

**Arguments**:

- `name` _string_  - required field

**Returns**:


- _`ManufacturerMedia`_ 


---

