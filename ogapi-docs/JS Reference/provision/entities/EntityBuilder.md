+++
title = "Entity Builder"
weight = 10
+++

**Class:** `EntityBuilder`

This is a base object that contains all you can do about Devices.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## assetsBuilder(organization, timeout)


Get a AssetBuilder for operate with entities of type asset

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | required field |
| **timeout** | `number` | ✅ | timeout on request |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.assetsBuilder('orgname').then(function(assetBuilder){//...}).catch()
```

---
## devicesBuilder(organization, timeout)


Get a DeviceBuilder for operate with entities of type device

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | required field |
| **timeout** | `number` | ✅ | timeout on request |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.devicesBuilder('orgname').then(function(deviceBuilder){//...}).catch()
```

---
## newCsvBulkBuilder(organization, resource, timeout, async)


Get a new CsvBulkBuilder 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | required field. |
| **resource** | `string` | ❌ | required field. Type of resource: entities or tickets |
| **timeout** | `number` | ✅ | timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception |
| **async** | `boolean` | ✅ | forces async execution for the bulk operation |

### Retorna

{{% notice tip %}}
**Tipo:** `CsvBulkBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000, false)
 ogapi.newCsvBulkBuilder('orgname', 'entities', 10000, true)
```

---
## newJsonBulkBuilder(organization, resource, timeout, async)


Get a new JsonBulkBuilder 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | required field. |
| **resource** | `string` | ❌ | required field. Type of resource: entities or tickets |
| **timeout** | `number` | ✅ | timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception |
| **async** | `boolean` | ✅ | forces async execution for the bulk operation |

### Retorna

{{% notice tip %}}
**Tipo:** `JsonBulkBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.newJsonBulkBuilder('orgname', 'entities', 10000)
```

---
## newJsonFlattenedBulkBuilder(organization, resource, timeout, async)


Get a new JsonFlattenedBulkBuilder 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | required field. |
| **resource** | `string` | ❌ | required field. Type of resource: entities or tickets |
| **timeout** | `number` | ✅ | timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception |
| **async** | `boolean` | ✅ | forces async execution for the bulk operation |

### Retorna

{{% notice tip %}}
**Tipo:** `JsonFlattenedBulkBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.newJsonFlattenedBulkBuilder('orgname', 'entities', 10000)
```

---
## subscribersBuilder(organization, timeout)


Get a SubscriberBuilder for operate with entities of type subscriber

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | required field |
| **timeout** | `number` | ✅ | timeout on request |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.subscribersBuilder('orgname').then(function(subscriberBuilder){//...}).catch()
```

---
## subscriptionsBuilder(organization, timeout)


Get a SubscriptionBuilder for operate with entities of type subscription

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | required field |
| **timeout** | `number` | ✅ | timeout on request |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.subscriptionsBuilder('orgname').then(function(subscriptionBuilder){//...}).catch()
```

---
## ticketsBuilder(organization, timeout)


Get a TicketBuilder for operate with entities of type ticket

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | required field |
| **timeout** | `number` | ✅ | timeout on request |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.ticketsBuilder('orgname').then(function(ticketBuilder){//...}).catch()
```

---

