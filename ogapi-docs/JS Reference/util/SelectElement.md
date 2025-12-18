+++
title = "Select Element"
weight = 10
+++

**Class:** `SelectElement`



## element(name, fields)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **name** | `String` | ❌ | Indicates the datastream to show |
| **fields** | `[{field: field, alias:alias}]` | ❌ | The fields that you want to show from that datastream |

### Retorna

{{% notice tip %}}
**Tipo:** `Object`
<br>
This returns a json with the object element built.
{{% /notice %}}

### Ejemplos

```javascript
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
```

---

