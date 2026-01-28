+++
title = "Filter Builder"
weight = 10
+++



## constructor





### Ejemplos

```javascript
var fb = ogapi.newFilterBuilder()
```

---
## and(args)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **args** | `[Expression]` | ❌ | The parameters will be operators of the class Expression |

### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

### Ejemplos

```javascript
fb.and(Ex.like("collected.serialNumber", "SN"), Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"))
```

---
## or(args)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **args** | `[Expression]` | ❌ | The parameters will be operators of the class Expression |

### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

### Ejemplos

```javascript
fb.or(Ex.like("collected.serialNumber", "SN"), Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"))
```

---

