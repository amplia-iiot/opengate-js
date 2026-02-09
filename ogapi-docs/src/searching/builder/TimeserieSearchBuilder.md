+++
title = "Timeserie Search Builder"
weight = 10
+++

Defined a search over timeseries	

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
 ogapi.timeserieSearchBuilder(organization, timeserieId).build()
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
**Tipo:** `TimeserieSearchBuilder`
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
**Tipo:** `TimeserieSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.timeserieSearchBuilder(organization, timeserieId).select(
     ogapi.newSelectBuilder().add(SE.element("Identifier", ["value"], "id"), SE.add("Temperature", ["value"]))
 ) // Setting SelectBuilder
 ogapi.timeserieSearchBuilder(organization, timeserieId).select({ "elements": [{"name": "Identifier",
	"fields": [{"field": "value","alias": "identifier"}]},
     {"name": "Temperature","fields": [{"field": "value","alias": "identifier"}]}]
  }) //Custom select
```

---

