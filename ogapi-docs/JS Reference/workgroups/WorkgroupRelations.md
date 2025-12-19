+++
title = "Workgroup Relations"
weight = 10
+++

WorkgroupRelations

### WorkgroupRelations Objects

```javascript
class WorkgroupRelations()
```

This is a base object that contains all you can do about workgroups.


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

##### delete


```javascript
function delete() -> '*'
```



**Returns**:


- _`*`_ 


---

##### update


```javascript
function update()
```

Update not allowed



---

##### withChannel


```javascript
function withChannel(channel: string) -> 'WorkgroupRelations'
```

Set the channel attribute

**Arguments**:

- `channel` _string_  - required field for creation or update

**Returns**:


- _`WorkgroupRelations`_ 


---

##### withWorkgroup


```javascript
function withWorkgroup(workgroup: string) -> 'WorkgroupRelations'
```

Set the workgroup attribute

**Arguments**:

- `workgroup` _string_  - required field

**Returns**:


- _`WorkgroupRelations`_ 


---

