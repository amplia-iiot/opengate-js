+++
title = "Fields Definition Search Builder"
weight = 10
+++

**Class:** `FieldsDefinitionSearchBuilder`

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
  ogapi.FieldsDefinitionSearchBuilder().build()
```

---
## customFilters





---
## withType(fieldDefinitionType)


Sets id to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **fieldDefinitionType** | `string` | ❌ | specific type |

### Retorna

{{% notice tip %}}
**Tipo:** `fieldsDefinitionSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.fieldsDefinitionSearchBuilder().withType('string').build()
```

---

