+++
title = "Administrative State Search Builder"
weight = 10
+++

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
  ogapi.administrativeStateSearchBuilder().filter({and:[]}).build()
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
**Tipo:** `AdministrativeStateSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.administrativeStateSearchBuilder().withEntityType('myEntityType').build()
```

---
## withId(administrativeStateId)


Sets id to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **administrativeStateId** | `string` | ❌ | specific type id |

### Retorna

{{% notice tip %}}
**Tipo:** `AdministrativeStateSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.administrativeStateSearchBuilder().withId('myId').build()
```

---

