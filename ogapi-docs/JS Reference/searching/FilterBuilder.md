+++
title = "Filter Builder"
weight = 10
+++

FilterBuilder

### FilterBuilder Objects

```javascript
class FilterBuilder()
```




##### constructor


```javascript
function constructor()
```




**Example**:

~~~javascript
var fb = ogapi.newFilterBuilder()
~~~

---

##### and


```javascript
function and(args: [Expression]) -> '*'
```


**Arguments**:

- `args` _[Expression]_  - The parameters will be operators of the class Expression

**Returns**:


- _`*`_ 


**Example**:

~~~javascript
fb.and(Ex.like("collected.serialNumber", "SN"), Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"))
~~~

---

##### or


```javascript
function or(args: [Expression]) -> '*'
```


**Arguments**:

- `args` _[Expression]_  - The parameters will be operators of the class Expression

**Returns**:


- _`*`_ 


**Example**:

~~~javascript
fb.or(Ex.like("collected.serialNumber", "SN"), Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"))
~~~

---

