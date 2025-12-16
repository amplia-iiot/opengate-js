+++
title = "Software Finder"
weight = 10
+++

  This class allow make get request to hardware softwares resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## administrable()


Marks visibility administrable for software list retrieval


### Retorna

{{% notice tip %}}
**Tipo:** `this`
<br>

{{% /notice %}}

---
## assignable()


Marks visibility assignable for software list retrieval


### Retorna

{{% notice tip %}}
**Tipo:** `this`
<br>

{{% /notice %}}

---
## findByOrganization(organization)


Retrieves all software from a organization

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | organization name . |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---
## findByOrganizationAndId(organization, identifier)


Retrieves a specific software

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | organization name . |
| **identifier** | `string` | ❌ | software name . |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---

