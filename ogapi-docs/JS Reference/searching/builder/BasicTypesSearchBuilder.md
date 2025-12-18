+++
title = "Basic Types Search Builder"
weight = 10
+++

**Class:** `BasicTypesSearchBuilder`

This is a abstract class, it must be extended to another class that defined the specific search.
This class is responsible to manage execute request to OpenGate North API

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is ogapi instance |
| **timeout** | `number` | ✅ | timeout on request |


---
## build()




### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

---
## execute()


This invoke a request to OpenGate North API and the callback is managed by promises


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## path





---
## publicParameters





---
## publicParameters





---
## withPath(path)


Sets path to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **path** | `string` | ❌ | jsonSchemaPath |

### Retorna

{{% notice tip %}}
**Tipo:** `BasicTypesSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.basicTypesSearchBuilder().withPath('string').build()
```

---
## withPublicParameters(publicParameters)


Sets publicParameters to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **publicParameters** | `boolean` | ❌ | boolean |

### Retorna

{{% notice tip %}}
**Tipo:** `BasicTypesSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.basicTypesSearchBuilder().withPublicParameters(true).build()
```

---

