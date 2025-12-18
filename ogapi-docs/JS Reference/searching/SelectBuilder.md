+++
title = "Select Builder"
weight = 10
+++

**Class:** `SelectBuilder`



## constructor





### Ejemplos

```javascript
var sb = ogapi.newSelectBuilder()
```

---
## add(args)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **args** | `SelectElement` | ❌ | The parameters will be operators of the class SelectElement |

### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

### Ejemplos

```javascript
sb.add(Se.element('provision.device.identifier', ['value'], 'identifier'), sb.add(Se.element('device.temperature.value', ['value'])))
```

---

