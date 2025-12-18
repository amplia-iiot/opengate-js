+++
title = "Manufacturer Finder"
weight = 10
+++

**Class:** `ManufacturerFinder`

  This class allow make get request to hardware manufacturers resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## administrable()


Marks visibility administrable for manufacturer list retrieval


### Retorna

{{% notice tip %}}
**Tipo:** `this`
<br>

{{% /notice %}}

---
## assignable()


Marks visibility assignable for manufacturer list retrieval


### Retorna

{{% notice tip %}}
**Tipo:** `this`
<br>

{{% /notice %}}

---
## findByOrganization(organization)


Retrieves all manufacturer from a organization

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


Retrieves a specific manufacturer

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | organization name . |
| **identifier** | `string` | ❌ | manufacturer name . |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---

