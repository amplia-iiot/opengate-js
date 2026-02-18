+++
title = "Organization Plans Finder"
weight = 10
+++

  This class allow make get request to organization plans resource into Opengate North API.

## constructor


    

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## administrable()


Marks visibility administrable for organization plans list retrieval.
  ogapi.newOrganizationPlansFinder().administrable().findByOrganization(&#x27;organization&#x27;).then().catch();


### Retorna

{{% notice tip %}}
**Tipo:** `this`
<br>

{{% /notice %}}

---
## assignable()


Marks visibility assignable for organization plans list retrieval
  ogapi.newOrganizationPlansFinder().assignable().findByOrganization(&#x27;organization&#x27;).then().catch();


### Retorna

{{% notice tip %}}
**Tipo:** `this`
<br>

{{% /notice %}}

---
## default()


Marks visibility default for plans list list retrieval.
  ogapi.newOrganizationPlansFinder().default().findByOrganization(&#x27;organization&#x27;).then().catch();


### Retorna

{{% notice tip %}}
**Tipo:** `this`
<br>

{{% /notice %}}

---
## findByOrganization(organization)


Retrieves all plans from a organization
  ogapi.newOrganizationPlansFinder().findByOrganization(&#x27;organization&#x27;).then().catch();

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


Retrieves a specific plan from a organization
  ogapi.newOrganizationPlansFinder().findByOrganizationAndId(&#x27;organization&#x27;, &#x27;identifier&#x27;).then().catch();

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

