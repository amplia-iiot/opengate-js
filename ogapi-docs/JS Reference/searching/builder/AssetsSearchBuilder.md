+++
title = "Assets Search Builder"
weight = 10
+++

**Class:** `AssetsSearchBuilder`

Defined a search over Assets	

## constructor



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parent** | `InternalOpenGateAPI` | ❌ | Instance of our InternalOpenGateAPI |


---
## build()


Build a instance of Search 


### Retorna

{{% notice tip %}}
**Tipo:** `Search`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.assetsSearchBuilder().onProvisioned().build()
```

---
## group(group)


The search request will have this group by 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **group** | `object` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `AssetsSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript

```

---
## select(select)


The search request will have this filter 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **select** | `SelectBuilder,object` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `AssetsSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.assetsSearchBuilder().select(
     ogapi.newSelectBuilder().add(SE.element("provision.device.identifier", ["value"], "id"), SE.add("device.temperature.value", ["value"]))
 ) // Setting SelectBuilder
 ogapi.assetsSearchBuilder().select({ "elements": [{"name": "provision.device.identifier",
	"fields": [{"field": "value","alias": "identifier"}]},
     {"name": "device.temperature.value","fields": [{"field": "value","alias": "identifier"}]}]
  }) //Custom select
```

---
## summary()


The response will only have a summary information 


### Retorna

{{% notice tip %}}
**Tipo:** `AssetsSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.assetsSearchBuilder().summary() 
```

---

