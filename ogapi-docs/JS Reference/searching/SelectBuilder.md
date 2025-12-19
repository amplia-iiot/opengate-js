+++
title = "Select Builder"
weight = 10
+++

SelectBuilder

### SelectBuilder Objects

```javascript
class SelectBuilder()
```




##### constructor


```javascript
function constructor()
```




**Example**:

~~~javascript
var sb = ogapi.newSelectBuilder()
~~~

---

##### add


```javascript
function add(args: SelectElement) -> '*'
```


**Arguments**:

- `args` _SelectElement_  - The parameters will be operators of the class SelectElement

**Returns**:


- _`*`_ 


**Example**:

~~~javascript
sb.add(Se.element('provision.device.identifier', ['value'], 'identifier'), sb.add(Se.element('device.temperature.value', ['value'])))
~~~

---

