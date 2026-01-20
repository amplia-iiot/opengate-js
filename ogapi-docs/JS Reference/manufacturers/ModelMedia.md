+++
title = "Model Media"
weight = 10
+++

ModelMedia

### ModelMedia Objects

```javascript
class ModelMedia()
```

This is a base object that contains all you can do about ModelMedia.


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
function withFile(file: string) -> 'ModelMedia'
```

Set the file attribute

**Arguments**:

- `file` _string_  - required field

**Returns**:


- _`ModelMedia`_ 


---

##### withFileName


```javascript
function withFileName(fileName: string) -> 'ModelMedia'
```

Set the file name attribute

**Arguments**:

- `fileName` _string_  - required field

**Returns**:


- _`ModelMedia`_ 


---

##### withIdentifier


```javascript
function withIdentifier(id: string) -> 'ModelMedia'
```

Set the identifier attribute

**Arguments**:

- `id` _string_  - required field

**Returns**:


- _`ModelMedia`_ 


---

##### withName


```javascript
function withName(name: string) -> 'ModelMedia'
```

Set the name attribute

**Arguments**:

- `name` _string_  - required field

**Returns**:


- _`ModelMedia`_ 


---

