+++
title = "Base Parameter Builder With Parent"
weight = 10
+++

BaseParameterBuilderWithParent

### BaseParameterBuilderWithParent Objects

```javascript
class BaseParameterBuilderWithParent()
```

This class generate a builder by a dynamic content about specific parameter to an operation.


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is configuration about Opengate North API.
- `config` _object_  - this is configuration about parameter operation.
- `parent` _BaseOperationBuilder_  - this is a instance of BaseOperationBuilder


---

##### [createSetterNameMethod(config)]


```javascript
function [createSetterNameMethod(config)]()
```




---

##### build


```javascript
function build() -> 'object'
```

This has all knowledge to make a object.


**Returns**:


- _`object`_ 


---

##### buildAndAppend


```javascript
function buildAndAppend() -> 'BaseOperationBuilder'
```

This method will invoke build and then it will append the parameter to operationBuilder with the correct way


**Returns**:


- _`BaseOperationBuilder`_ 


---

