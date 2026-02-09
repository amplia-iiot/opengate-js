+++
title = "User Profiles Search Builder"
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
  ogapi.userProfileSearchBuilder().filter({and:[]}).build()
```

---
## customFilters





---
## withId(userProfileId)


Sets id to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **userProfileId** | `string` | ❌ | user profile id |

### Retorna

{{% notice tip %}}
**Tipo:** `userProfileSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.userProfileSearchBuilder().withId('myId').build()
```

---

