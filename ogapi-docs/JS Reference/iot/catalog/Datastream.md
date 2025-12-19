+++
title = "Datastream"
weight = 10
+++

Datastream

### Datastream Objects

```javascript
class Datastream()
```

Defines the builder to configure a datastream of IoT datamodel. With this builder you can configure a datastream


##### constructor


```javascript
function constructor()
```




---

##### addQrating


```javascript
function addQrating(qrating: Object) -> 'Datastream'
```

Set the qrating attribute. Use {Qrating} utility for create this object

**Arguments**:

- `qrating` _Object_  

**Returns**:


- _`Datastream`_ 


---

##### build


```javascript
function build() -> 'Object'
```

Build a Datastream json object


**Returns**:


- _`Object`_ - Datastream json object


**Example**:

~~~javascript
ogapi.DatastreamsBuilder().build()
~~~

---

##### withAccess


```javascript
function withAccess(access: Array) -> 'Datastream'
```

Set the access object. Possible values: [READ, WRITE], [READ], [WRITE], []

**Arguments**:

- `access` _Array_  

**Returns**:


- _`Datastream`_ 


---

##### withDescription


```javascript
function withDescription(description: string) -> 'Datastream'
```

Set the description attribute

**Arguments**:

- `description` _string_  

**Returns**:


- _`Datastream`_ 


---

##### withId


```javascript
function withId(id: string) -> 'Datastream'
```

Set the id attribute

**Arguments**:

- `id` _string_  - required field

**Returns**:


- _`Datastream`_ 


---

##### withName


```javascript
function withName(name: string) -> 'Datastream'
```

Set the name attribute

**Arguments**:

- `name` _string_  - required field

**Returns**:


- _`Datastream`_ 


---

##### withPeriod


```javascript
function withPeriod(period: string) -> 'Datastream'
```

Set the period attribute. Possible values: PULSE, CUMULATIVE, INSTANT

**Arguments**:

- `period` _string_  - required field

**Returns**:


- _`Datastream`_ 


---

##### withSchema


```javascript
function withSchema(schema: Object) -> 'Datastream'
```

Set the schema object attribute.

**Arguments**:

- `schema` _Object_  

**Returns**:


- _`Datastream`_ 


---

##### withStorage


```javascript
function withStorage(period: string,total: number) -> 'Datastream'
```

Set the storage object.

**Arguments**:

- `period` _string_  
- `total` _number_  

**Returns**:


- _`Datastream`_ 


---

##### withTags


```javascript
function withTags(tags: Array) -> 'Datastream'
```

Set the tags attribute.

**Arguments**:

- `tags` _Array_  

**Returns**:


- _`Datastream`_ 


---

##### withUnit


```javascript
function withUnit(type: string,label: string,symbol: string) -> 'Datastream'
```

Set the unit object attribute

**Arguments**:

- `type` _string_  - required field
- `label` _string_  - required field
- `symbol` _string_  - required field

**Returns**:


- _`Datastream`_ 


---

