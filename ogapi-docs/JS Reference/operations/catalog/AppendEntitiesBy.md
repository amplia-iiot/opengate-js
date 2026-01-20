+++
title = "Append Entities By"
weight = 10
+++

AppendEntitiesBy

### AppendEntitiesBy Objects

```javascript
class AppendEntitiesBy()
```

Util used into BaseOperationBuilder to append entities the three different ways. By filter, By tags, By entityList


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is configuration about Opengate North API.
- `parent` _BaseOperationBuilder_  - this is a instance of BaseOperationBuilder


---

##### filter


```javascript
function filter(filter: FilterBuilder,resourceType: string) -> 'BaseOperationBuilder'
```

Append filter to operation target

**Arguments**:

- `filter` _FilterBuilder_  
- `resourceType` _string_  

**Returns**:


- _`BaseOperationBuilder`_ 


---

##### list


```javascript
function list(entities: EntityListBuilder) -> 'BaseOperationBuilder'
```

Append entity list to operation target

**Arguments**:

- `entities` _EntityListBuilder_  

**Returns**:


- _`BaseOperationBuilder`_ 


---

##### tag


```javascript
function tag(tag: string) -> 'BaseOperationBuilder'
```

Set tag to operation target

**Arguments**:

- `tag` _string_  

**Returns**:


- _`BaseOperationBuilder`_ 


---

