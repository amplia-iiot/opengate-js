+++
title = "Datastream"
weight = 10
+++

**Class:** `Datastream`

Defines the builder to configure a datastream of IoT datamodel. With this builder you can configure a datastream

## constructor





---
## addQrating(qrating)


Set the qrating attribute. Use {Qrating} utility for create this object

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **qrating** | `Object` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Datastream`
<br>

{{% /notice %}}

---
## build()


Build a Datastream json object


### Retorna

{{% notice tip %}}
**Tipo:** `Object`
<br>
Datastream json object
{{% /notice %}}

### Ejemplos

```javascript
ogapi.DatastreamsBuilder().build()
```

---
## withAccess(access)


Set the access object. Possible values: [READ, WRITE], [READ], [WRITE], []

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **access** | `Array` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Datastream`
<br>

{{% /notice %}}

---
## withDescription(description)


Set the description attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **description** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Datastream`
<br>

{{% /notice %}}

---
## withId(id)


Set the id attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **id** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Datastream`
<br>

{{% /notice %}}

---
## withName(name)


Set the name attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **name** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Datastream`
<br>

{{% /notice %}}

---
## withPeriod(period)


Set the period attribute. Possible values: PULSE, CUMULATIVE, INSTANT

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **period** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Datastream`
<br>

{{% /notice %}}

---
## withSchema(schema)


Set the schema object attribute.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **schema** | `Object` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Datastream`
<br>

{{% /notice %}}

---
## withStorage(period, total)


Set the storage object.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **period** | `string` | ❌ |  |
| **total** | `number` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Datastream`
<br>

{{% /notice %}}

---
## withTags(tags)


Set the tags attribute.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **tags** | `Array` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Datastream`
<br>

{{% /notice %}}

---
## withUnit(type, label, symbol)


Set the unit object attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **type** | `string` | ❌ | required field |
| **label** | `string` | ❌ | required field |
| **symbol** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Datastream`
<br>

{{% /notice %}}

---

