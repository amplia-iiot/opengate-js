+++
title = "Qrating"
weight = 10
+++

**Class:** `Qrating`

Defines the builder to configure a qurating of datastream of IoT datamodel. With this builder you can configure a qrating

## constructor





---
## build()


Build a Qrating json object


### Retorna

{{% notice tip %}}
**Tipo:** `Object`
<br>
Datastream json object
{{% /notice %}}

### Ejemplos

```javascript
ogapi.QratingsBuilder().build()
```

---
## withConversionMatrix(conversionMatrix)


Set the conversionMatrix attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **conversionMatrix** | `Object` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Qrating`
<br>

{{% /notice %}}

---
## withCumulativePeriodDivisor(cumulativePeriodDivisor)


Set the cumulativePeriodDivisor attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **cumulativePeriodDivisor** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Qrating`
<br>

{{% /notice %}}

---
## withIdeal(label, value)


Set the ideal attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **label** | `string` | ❌ | required field |
| **value** | `number` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Qrating`
<br>

{{% /notice %}}

---
## withMaxAllowed(label, value)


Set the maxAllowed attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **label** | `string` | ❌ | required field |
| **value** | `number` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Qrating`
<br>

{{% /notice %}}

---
## withMaxDesired(label, value)


Set the maxDesired attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **label** | `string` | ❌ | required field |
| **value** | `number` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Qrating`
<br>

{{% /notice %}}

---
## withMaxScore(maxScore)


Set the maxScore attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **maxScore** | `number` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Qrating`
<br>

{{% /notice %}}

---
## withMinDesired(label, value)


Set the minDesired attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **label** | `string` | ❌ | required field |
| **value** | `number` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Qrating`
<br>

{{% /notice %}}

---
## withMinRequired(label, value)


Set the minRequired attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **label** | `string` | ❌ | required field |
| **value** | `number` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Qrating`
<br>

{{% /notice %}}

---
## withVersion(version)


Set the version attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **version** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Qrating`
<br>

{{% /notice %}}

---

