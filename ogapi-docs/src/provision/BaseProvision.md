+++
title = "Base Provision"
weight = 10
+++

This is an abstract class, it must be extended to another class that defines the different actions of a specific provision.
This class is responsible for managing the request to execute Norte OpenGate API

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is ogapi instance |
| **resource** | `string` | ❌ | this is a base url resource |
| **timeout** | `number` | ✅ | timeout on request |
| **requiredParameters** | `array` | ❌ |  |
| **serviceBaseURL** | `string` | ❌ | base of the uri petition |


---
## create()


This invoke a request to OpenGate North API and the callback is managed by promises
This function create a entity of provision


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.organizationsBuilder().create()
```

---
## delete(body)


This invoke a request to OpenGate North API and the callback is managed by promises
This function deletes a entity of provision

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **body** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
ogapi.organizationsBuilder().withName('delete_organization').delete();
ogapi.usersBuilder().withEmail('delete@user.com').delete();
ogapi.certificatesBuilder().withId('d3l3t3-c3rt1f1c4t3').delete();
```

---
## update()


This invoke a request to OpenGate North API and the callback is managed by promises
This function updates a entity of provision


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.organizationsBuilder().update()
```

---

