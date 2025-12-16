+++
title = "Timeseries"
weight = 10
+++

This is a base object that contains all you can do about Timeseries.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## onlyPlan()




### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

---
## withBucketColumn(bucketColumn)


Name of generated column with bucket date.Required if timeBucket &gt; 0.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **bucketColumn** | `string` | ❌ | pattern: ^[a-zA-Z0-9 _-]*$ |

### Retorna

{{% notice tip %}}
**Tipo:** `Timeseries`
<br>

{{% /notice %}}

---
## withBucketInitColumn(bucketInitColumn)


Name of generated column with bucket init date.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **bucketInitColumn** | `string` | ❌ | pattern: ^[a-zA-Z0-9 _-]*$ |

### Retorna

{{% notice tip %}}
**Tipo:** `Timeseries`
<br>

{{% /notice %}}

---
## withColumns(columns)


List of data that is needed for each entity.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **columns** | `array` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Timeseries`
<br>

{{% /notice %}}

---
## withContext(context)


List of data that is needed for each entity.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **context** | `array` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Timeseries`
<br>

{{% /notice %}}

---
## withDescription(description)


Long text to explain timeserie definition

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **description** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Timeseries`
<br>

{{% /notice %}}

---
## withIdentifier(identifier)


Set the identifier attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **identifier** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Timeseries`
<br>

{{% /notice %}}

---
## withIdentifierColumn(identifierColumn)


Set the identifierColumn attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **identifierColumn** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Datasets`
<br>

{{% /notice %}}

---
## withName(name)


Name which will be unique in each organization

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **name** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Timeseries`
<br>

{{% /notice %}}

---
## withOrganization(organization)


Set the organization attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Timeseries`
<br>

{{% /notice %}}

---
## withOrigin(origin)


Initial date to first bucket with ISO date time format. Next bucket will be calcullated from this date. Default value is created date with time equals 00:00:00.000Z

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **origin** | `string` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Timeseries`
<br>

{{% /notice %}}

---
## withRetention(retention)


Time that a row is stored to be got in searching.  Default value is 1 month

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **retention** | `number` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Timeseries`
<br>

{{% /notice %}}

---
## withTimeBucket(timeBucket)


Duration of buckets in seconds.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **timeBucket** | `integer` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Timeseries`
<br>

{{% /notice %}}

---

