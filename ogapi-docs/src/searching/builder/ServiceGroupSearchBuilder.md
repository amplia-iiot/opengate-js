+++
title = "Service Group Search Builder"
weight = 10
+++

Defined a search over service group catalogs    

## constructor



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parent** | `InternalOpenGateAPI` | ❌ | Instance of our InternalOpenGateAPI |


---
## build()


Build a instance of StaticSearch 


### Retorna

{{% notice tip %}}
**Tipo:** `StaticSearch`
<br>

{{% /notice %}}

### Ejemplos

```javascript
  ogapi.serviceGroupSearchBuilder().filter({and:[]}).build()
```

---
## customFilters





---
## withEntityType(entityType)


Set entityType to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **entityType** | `string` | ❌ | entity type |

### Retorna

{{% notice tip %}}
**Tipo:** `ServiceGroupSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.serviceGroupSearchBuilder().withEntityType('myEntityType').build()
```

---

