+++
title = "Device Plans Finder"
weight = 10
+++

  This class allow make get request to organization device plans resource into Opengate North API.

## constructor


    

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## administrable()


Marks visibility administrable for organization device plans list retrieval.
  ogapi.newDevicePlansFinder().administrable().findByOrganization(&#x27;organization&#x27;).then().catch();


### Retorna

{{% notice tip %}}
**Tipo:** `this`
<br>

{{% /notice %}}

---
## assignable()


Marks visibility assignable for organization device plans list retrieval
  ogapi.newDevicePlansFinder().assignable().findByOrganization(&#x27;organization&#x27;).then().catch();


### Retorna

{{% notice tip %}}
**Tipo:** `this`
<br>

{{% /notice %}}

---
## default()


Marks visibility default for organization device plans list list retrieval.
  ogapi.newDevicePlansFinder().default().findByOrganization(&#x27;organization&#x27;).then().catch();


### Retorna

{{% notice tip %}}
**Tipo:** `this`
<br>

{{% /notice %}}

---
## findByOrganization(organization)


Retrieves all device plans from a organization
  ogapi.newDevicePlansFinder().findByOrganization(&#x27;organization&#x27;).then().catch();

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


Retrieves a specific device plan from a organization
  ogapi.newDevicePlansFinder().findByOrganizationAndId(&#x27;organization&#x27;, &#x27;identifier&#x27;).then().catch();

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organization** | `string` | ❌ | organization name . |
| **identifier** | `string` | ❌ | plan name. |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

---

