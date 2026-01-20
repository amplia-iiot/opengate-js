+++
title = "Category"
weight = 10
+++

Category

### Category Objects

```javascript
class Category()
```

Defines the builder to configure a category of a datamodel. With this builder you can configure a category


##### constructor


```javascript
function constructor()
```

   

**Arguments**:

- `Reference` _InternalOpenGateAPI_  - to the API object.
- `identifier` _identifier_  - of category
- `datastreams` _Array_  - of category


---

##### addDatastream


```javascript
function addDatastream(datastream: Object) -> 'Category'
```

Add a datastream to the category 

**Arguments**:

- `datastream` _Object_  - json object

**Returns**:


- _`Category`_ 


---

##### addDatastreams


```javascript
function addDatastreams(datastreams: Object) -> 'Category'
```

Add a datastreams to the category 

**Arguments**:

- `datastreams` _Object_  - of datastream json object

**Returns**:


- _`Category`_ 


---

##### withName


```javascript
function withName(name: *) -> '*'
```


**Arguments**:

- `name` _*_  

**Returns**:


- _`*`_ 


---

