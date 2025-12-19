+++
title = "Select Element"
weight = 10
+++

SelectElement

### SelectElement Objects

```javascript
class SelectElement()
```




##### element


```javascript
function element(name: String,fields: [{field: field, alias:alias}]) -> 'Object'
```


**Arguments**:

- `name` _String_  - Indicates the datastream to show
- `fields` _[{field: field, alias:alias}]_  - The fields that you want to show from that datastream

**Returns**:


- _`Object`_ - This returns a json with the object element built.


**Example**:

~~~javascript
 SE.element('provision.device.identifier', ['value'], 'identifier')
 returns:
 {
     name : 'provision.device.identifier',
     fields: ['value'],
     alias: 'identifier
 }

 SE.element('provision.device.identifier', ['value'])
 returns:
 {
     name : 'provision.device.identifier',
     fields: ['value']
 }
~~~

---

