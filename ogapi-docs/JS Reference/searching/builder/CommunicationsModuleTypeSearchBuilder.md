+++
title = "Communications Module Type Search Builder"
weight = 10
+++

**Class:** `CommunicationsModuleTypeSearchBuilder`

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
## withType(communicationsModuleType)


Sets id to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **communicationsModuleType** | `string` | ❌ | specific type |

### Retorna

{{% notice tip %}}
**Tipo:** `CommunicationsModuleTypeSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.communicationsModuleTypeSearchBuilder().withType('GENERIC').build()
```

---

