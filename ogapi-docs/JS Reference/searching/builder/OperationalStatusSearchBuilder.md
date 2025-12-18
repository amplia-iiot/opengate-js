+++
title = "Operational Status Search Builder"
weight = 10
+++

**Class:** `OperationalStatusSearchBuilder`

Defined a search over operational status catalogs    

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
  ogapi.operationalStatusSearchBuilder().filter({and:[]}).build()
```

---
## customFilters





---
## withEntityType(entityType)


Set entityType to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **entityType** | `string` | ❌ | model name |

### Retorna

{{% notice tip %}}
**Tipo:** `OperationalStatusSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.operationalStatusSearchBuilder().withEntityType('myEntityType').build()
```

---
## withId(operationalStatusId)


Sets id to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **operationalStatusId** | `string` | ❌ | operational status id |

### Retorna

{{% notice tip %}}
**Tipo:** `OperationalStatusSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.operationalStatusSearchBuilder().withId('myId').build()
```

---

