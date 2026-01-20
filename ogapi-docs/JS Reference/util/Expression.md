+++
title = "Expression"
weight = 10
+++

Expression

### Expression Objects

```javascript
class Expression()
```




##### and


```javascript
function and(args: ...*) -> 'object'
```


**Arguments**:

- `args` _...*_  

**Returns**:


- _`object`_ - This returns a json with the query of the logical operator &quot;and&quot; built.


**Example**:

~~~javascript
Ex.and(Ex.like("collected.serialNumber", "SN"), Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"))


returns:

{
  and : [
    {
      like: {
        "collected.serialNumber": "SN"
      }
    },  
    {
      eq: {
        "entityId": "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"
      }
    }
  ]
}
~~~

---

##### eq


```javascript
function eq(key: String,value: String) -> 'object'
```


**Arguments**:

- `key` _String_  - This is the name of the field
- `value` _String_  - This is the value of the field

**Returns**:


- _`object`_ - This returns a json with the query of the operator &quot;eq&quot; built.


**Example**:

~~~javascript
Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25")


returns:

{
  eq : {
    "entityId": "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"
  }
}
~~~

---

##### gt


```javascript
function gt(key: String,value: String) -> 'object'
```


**Arguments**:

- `key` _String_  - This is the name of the field
- `value` _String_  - This is the value of the field

**Returns**:


- _`object`_ - This returns a json with the query of the operator &quot;gt&quot; built.


**Example**:

~~~javascript
Ex.gt("collected.imei", "123456786543210")


returns:

{
  gt : {
    "collected.imei": "123456786543210"
  }
}
~~~

---

##### gte


```javascript
function gte(key: String,value: String) -> 'object'
```


**Arguments**:

- `key` _String_  - This is the name of the field
- `value` _String_  - This is the value of the field

**Returns**:


- _`object`_ - This returns a json with the query of the operator &quot;gte&quot; built.


**Example**:

~~~javascript
Ex.gte("collected.imei", "123456786543210")


{
  gte : {
    "collected.imei": "123456786543210"
  }
}
~~~

---

##### in


```javascript
function in(key: String,value: String) -> 'object'
```


**Arguments**:

- `key` _String_  - This is the name of the field
- `value` _String_  - This is the value of the field

**Returns**:


- _`object`_ - This returns a json with the query of the operator &quot;in&quot; built.


**Example**:

~~~javascript
Ex.in("entityId", ["e64ccd08-e302-4b65-b19d-e38eeb7b2d24","e64ccd08-e302-4b65-b19d-e38eeb7b2d25"])


{
  in : {
    "entityId": ["e64ccd08-e302-4b65-b19d-e38eeb7b2d24","e64ccd08-e302-4b65-b19d-e38eeb7b2d25"]
  }
}
~~~

---

##### like


```javascript
function like(key: String,value: String) -> 'object'
```


**Arguments**:

- `key` _String_  - This is the name of the field
- `value` _String_  - This is the value of the field

**Returns**:


- _`object`_ - This returns a json with the query of the operator &quot;like&quot; built.


**Example**:

~~~javascript
Ex.like("collected.serialNumber", "SN")


returns:

{
  like : {
    "collected.serialNumber": "SN"
  }
}
~~~

---

##### lt


```javascript
function lt(key: String,value: String) -> 'object'
```


**Arguments**:

- `key` _String_  - This is the name of the field
- `value` _String_  - This is the value of the field

**Returns**:


- _`object`_ - This returns a json with the query of the operator &quot;lt&quot; built.


**Example**:

~~~javascript
Ex.lt("collected.imei", "123456786543210")


returns:

{
  lt : {
    "collected.imei": "123456786543210"
  }
}
~~~

---

##### lte


```javascript
function lte(key: String,value: String) -> 'object'
```


**Arguments**:

- `key` _String_  - This is the name of the field
- `value` _String_  - This is the value of the field

**Returns**:


- _`object`_ - This returns a json with the query of the operator &quot;lte&quot; built.


**Example**:

~~~javascript
Ex.lte("collected.imei", "123456786543210")


{
  lte : {
    "collected.imei": "123456786543210"
  }
}
~~~

---

##### neq


```javascript
function neq(key: String,value: String) -> 'object'
```


**Arguments**:

- `key` _String_  - This is the name of the field
- `value` _String_  - This is the value of the field

**Returns**:


- _`object`_ - This returns a json with the query of the operator &quot;neq&quot; built.


**Example**:

~~~javascript
Ex.neq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25")


returns:

{
  neq : {
    "entityId": "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"
  }
}
~~~

---

##### or


```javascript
function or(args: ...*) -> 'object'
```


**Arguments**:

- `args` _...*_  

**Returns**:


- _`object`_ - This returns a json with the query of the logical operator &quot;or&quot; built.


**Example**:

~~~javascript
Ex.or(Ex.like("collected.serialNumber", "SN"), Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"))


returns:

{
  or : [
    {
      like: {
        "collected.serialNumber": "SN"
      }
    },  
    {
      eq: {
        "entityId": "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"
      }
    }
  ]
}
~~~

---

