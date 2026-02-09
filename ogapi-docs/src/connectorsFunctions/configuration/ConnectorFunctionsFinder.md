+++
title = "Connector Functions Finder"
weight = 10
+++

  This class allow make get request to ConnectorFunctions resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | Reference to the API object. |


---
## findByOrganizationAndChannel(organization, channel)


Performs a get that returns connectors functions related

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | organization |
| **channel** | `string` | ❌ | channel. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findByOrganizationAndChannelAndName(organization, channel, name)


Performs a get that returns connectors functions related

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | organization |
| **channel** | `string` | ❌ | channel. |
| **name** | `string` | ❌ | Connector function name |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---

