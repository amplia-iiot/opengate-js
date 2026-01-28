+++
title = "Channel Finder"
weight = 10
+++

  This class allow make get request to channel resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | Reference to the API object. |


---
## findByDomainAndWorkgroup(domain, workgroup)


Performs a get that returns channels related

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **domain** | `string` | ❌ | domain |
| **workgroup** | `string` | ❌ | workgroup. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findByDomainAndWorkgroupAndOrganization(domain, workgroup, organization)


Performs a get that returns channels related

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **domain** | `string` | ❌ | domain |
| **workgroup** | `string` | ❌ | workgroup. |
| **organization** | `string` | ❌ | organization. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findByOrganizationAndName(organization, name)


Download a specific channel by its organization and id. This execute a GET http method

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | channel organization . |
| **name** | `string` | ❌ | channel name. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---

