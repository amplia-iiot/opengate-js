+++
title = "Expression"
weight = 10
+++



## and(args)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **args** | `...*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `object`
<br>
This returns a json with the query of the logical operator &quot;and&quot; built.
{{% /notice %}}

### Ejemplos

```javascript
Ex.and(Ex.like("collected.serialNumber", "SN"), Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"))


returns:

{
  and : [
    {
      like: {
        "collected.serialNumber": "SN"
      }
    },  
    {
      eq: {
        "entityId": "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"
      }
    }
  ]
}
```

---
## eq(key, value)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **key** | `String` | ❌ | This is the name of the field |
| **value** | `String` | ❌ | This is the value of the field |

### Retorna

{{% notice tip %}}
**Tipo:** `object`
<br>
This returns a json with the query of the operator &quot;eq&quot; built.
{{% /notice %}}

### Ejemplos

```javascript
Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25")


returns:

{
  eq : {
    "entityId": "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"
  }
}
```

---
## gt(key, value)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **key** | `String` | ❌ | This is the name of the field |
| **value** | `String` | ❌ | This is the value of the field |

### Retorna

{{% notice tip %}}
**Tipo:** `object`
<br>
This returns a json with the query of the operator &quot;gt&quot; built.
{{% /notice %}}

### Ejemplos

```javascript
Ex.gt("collected.imei", "123456786543210")


returns:

{
  gt : {
    "collected.imei": "123456786543210"
  }
}
```

---
## gte(key, value)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **key** | `String` | ❌ | This is the name of the field |
| **value** | `String` | ❌ | This is the value of the field |

### Retorna

{{% notice tip %}}
**Tipo:** `object`
<br>
This returns a json with the query of the operator &quot;gte&quot; built.
{{% /notice %}}

### Ejemplos

```javascript
Ex.gte("collected.imei", "123456786543210")


{
  gte : {
    "collected.imei": "123456786543210"
  }
}
```

---
## in(key, value)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **key** | `String` | ❌ | This is the name of the field |
| **value** | `String` | ❌ | This is the value of the field |

### Retorna

{{% notice tip %}}
**Tipo:** `object`
<br>
This returns a json with the query of the operator &quot;in&quot; built.
{{% /notice %}}

### Ejemplos

```javascript
Ex.in("entityId", ["e64ccd08-e302-4b65-b19d-e38eeb7b2d24","e64ccd08-e302-4b65-b19d-e38eeb7b2d25"])


{
  in : {
    "entityId": ["e64ccd08-e302-4b65-b19d-e38eeb7b2d24","e64ccd08-e302-4b65-b19d-e38eeb7b2d25"]
  }
}
```

---
## like(key, value)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **key** | `String` | ❌ | This is the name of the field |
| **value** | `String` | ❌ | This is the value of the field |

### Retorna

{{% notice tip %}}
**Tipo:** `object`
<br>
This returns a json with the query of the operator &quot;like&quot; built.
{{% /notice %}}

### Ejemplos

```javascript
Ex.like("collected.serialNumber", "SN")


returns:

{
  like : {
    "collected.serialNumber": "SN"
  }
}
```

---
## lt(key, value)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **key** | `String` | ❌ | This is the name of the field |
| **value** | `String` | ❌ | This is the value of the field |

### Retorna

{{% notice tip %}}
**Tipo:** `object`
<br>
This returns a json with the query of the operator &quot;lt&quot; built.
{{% /notice %}}

### Ejemplos

```javascript
Ex.lt("collected.imei", "123456786543210")


returns:

{
  lt : {
    "collected.imei": "123456786543210"
  }
}
```

---
## lte(key, value)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **key** | `String` | ❌ | This is the name of the field |
| **value** | `String` | ❌ | This is the value of the field |

### Retorna

{{% notice tip %}}
**Tipo:** `object`
<br>
This returns a json with the query of the operator &quot;lte&quot; built.
{{% /notice %}}

### Ejemplos

```javascript
Ex.lte("collected.imei", "123456786543210")


{
  lte : {
    "collected.imei": "123456786543210"
  }
}
```

---
## neq(key, value)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **key** | `String` | ❌ | This is the name of the field |
| **value** | `String` | ❌ | This is the value of the field |

### Retorna

{{% notice tip %}}
**Tipo:** `object`
<br>
This returns a json with the query of the operator &quot;neq&quot; built.
{{% /notice %}}

### Ejemplos

```javascript
Ex.neq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25")


returns:

{
  neq : {
    "entityId": "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"
  }
}
```

---
## or(args)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **args** | `...*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `object`
<br>
This returns a json with the query of the logical operator &quot;or&quot; built.
{{% /notice %}}

### Ejemplos

```javascript
Ex.or(Ex.like("collected.serialNumber", "SN"), Ex.eq("entityId", "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"))


returns:

{
  or : [
    {
      like: {
        "collected.serialNumber": "SN"
      }
    },  
    {
      eq: {
        "entityId": "e64ccd08-e302-4b65-b19d-e38eeb7b2d25"
      }
    }
  ]
}
```

---

