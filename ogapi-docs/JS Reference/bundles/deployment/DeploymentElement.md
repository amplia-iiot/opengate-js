+++
title = "Deployment Element"
weight = 10
+++

DeploymentElement

### DeploymentElement Objects

```javascript
class DeploymentElement()
```

This is a base object that contains all you can do about Deployment Element.


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `context` _*_  
- `ogapi` _*_  
- `url` _*_  
- `progressEvent` _*_  


---

##### createWithFile


```javascript
function createWithFile(rawFile: File) -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This method create an element deploymentElement

**Arguments**:

- `rawFile` _File_  - this File is the deployment element

**Returns**:


- _`Promise`_ 


---

##### deploy


```javascript
function deploy() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This method create an element deploymentElement with previously assignated file


**Returns**:


- _`Promise`_ 


---

##### update


```javascript
function update()
```

This method invalidates the update option



---

##### validation


```javascript
function validation()
```




---

##### validation


```javascript
function validation()
```




---

##### withDownloadUrl


```javascript
function withDownloadUrl(downloadUrl: string) -> 'DeploymentElement'
```

Set the downloadUrl attribute

**Arguments**:

- `downloadUrl` _string_  

**Returns**:


- _`DeploymentElement`_ 


---

##### withFile


```javascript
function withFile(rawFile: object) -> 'DeploymentElement'
```

Sets the file to upload

**Arguments**:

- `rawFile` _object_  

**Returns**:


- _`DeploymentElement`_ 


---

##### withFileName


```javascript
function withFileName(fileName: string) -> 'DeploymentElement'
```

Set the fileName attribute

**Arguments**:

- `fileName` _string_  

**Returns**:


- _`DeploymentElement`_ 


---

##### withName


```javascript
function withName(name: string) -> 'DeploymentElement'
```

Set the name attribute

**Arguments**:

- `name` _string_  - required field

**Returns**:


- _`DeploymentElement`_ 


---

##### withOldName


```javascript
function withOldName(name: string) -> 'DeploymentElement'
```

Sets the old name attribute

**Arguments**:

- `name` _string_  

**Returns**:


- _`DeploymentElement`_ 


---

##### withOldPath


```javascript
function withOldPath(path: string) -> 'DeploymentElement'
```

Sets the old path attribute

**Arguments**:

- `path` _string_  

**Returns**:


- _`DeploymentElement`_ 


---

##### withOldVersion


```javascript
function withOldVersion(version: string) -> 'DeploymentElement'
```

Sets the old version attribute

**Arguments**:

- `version` _string_  

**Returns**:


- _`DeploymentElement`_ 


---

##### withOperation


```javascript
function withOperation(operation: string) -> 'DeploymentElement'
```

Set the operation attribute

**Arguments**:

- `operation` _string_  - required field

**Returns**:


- _`DeploymentElement`_ 


---

##### withOption


```javascript
function withOption(option: string) -> 'DeploymentElement'
```

Set the option attribute

**Arguments**:

- `option` _string_  

**Returns**:


- _`DeploymentElement`_ 


---

##### withOrder


```javascript
function withOrder(order: string) -> 'DeploymentElement'
```

Set the order attribute

**Arguments**:

- `order` _string_  - required field

**Returns**:


- _`DeploymentElement`_ 


---

##### withPath


```javascript
function withPath(path: string) -> 'DeploymentElement'
```

Set the path attribute

**Arguments**:

- `path` _string_  - required field

**Returns**:


- _`DeploymentElement`_ 


---

##### withTimeout


```javascript
function withTimeout(ms: number) -> 'Bundles'
```

The request will have a specific time out if it will be exceeded then the promise throw an exception

**Arguments**:

- `ms` _number_  - timeout in milliseconds

**Returns**:


- _`Bundles`_ 


---

##### withType


```javascript
function withType(type: string) -> 'DeploymentElement'
```

Set the type attribute

**Arguments**:

- `type` _string_  - required field

**Returns**:


- _`DeploymentElement`_ 


---

##### withValidation


```javascript
function withValidation(validation: string) -> 'DeploymentElement'
```

Set the validation attribute

**Arguments**:

- `validation` _string_  

**Returns**:


- _`DeploymentElement`_ 


---

##### withValidators


```javascript
function withValidators(validators: Array) -> 'DeploymentElement'
```

Set the validators attribute

**Arguments**:

- `validators` _Array_  

**Returns**:


- _`DeploymentElement`_ 


---

##### withVersion


```javascript
function withVersion(version: string) -> 'DeploymentElement'
```

Set the version attribute

**Arguments**:

- `version` _string_  - required field

**Returns**:


- _`DeploymentElement`_ 


---

