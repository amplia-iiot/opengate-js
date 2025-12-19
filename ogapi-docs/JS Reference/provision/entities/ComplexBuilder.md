+++
title = "Complex Builder"
weight = 10
+++

ComplexBuilder

### ComplexBuilder Objects

```javascript
class ComplexBuilder()
```

This class extends SimpleBuilder to allow set complex values. What is a complex value? It is simple, It is a value 
that need a communications module identifier to allow set into the box.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is ogapi instance
- `resource` _string_  - this is the resource url where can be create/delete/update/read the entity
- `allowedDatastreams` _array_ (optional) - Allowed datastreams to add into the new entity
- `definedSchemas` _array_ (optional) - Jsonschema about all OpenGate specific types
- `jsonSchemaValidator` _Validator_ (optional) - Json schema validator tool


---

##### initFromFlattened


```javascript
function initFromFlattened()
```


**Arguments**:

- `_flattenedEntityData` _*_  


---

##### initFromJson


```javascript
function initFromJson()
```


**Arguments**:

- `_jsonEntityData` _*_  


---

##### withComplex


```javascript
function withComplex(_id: string,idCommunicationModules: string,val: object) -> '*'
```

Set a complex value to entity

**Arguments**:

- `_id` _string_  - Datastream identifier
- `idCommunicationModules` _string_  - Communications module identifier
- `val` _object_  - Value to set.

**Returns**:


- _`*`_ 


---

