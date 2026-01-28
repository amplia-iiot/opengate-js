+++
title = "Organizations Search Builder"
weight = 10
+++

Defined a search over organizations

## constructor



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parent** | `InternalOpenGateAPI` | ❌ | Instance of our InternalOpenGateAPI |


---
## build()




### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

---
## fluentFilter





---
## tagsFilter





---
## withChannelName(channelName)


Sets de organization name to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **channelName** | `string` | ❌ | hardware id |

### Retorna

{{% notice tip %}}
**Tipo:** `OrganizationsSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.organizationsSearchBuilder().withChannelName('myOrganization').build()
```

---
## withDomain(domainName)


Sets de domain name to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **domainName** | `string` | ❌ | domain name |

### Retorna

{{% notice tip %}}
**Tipo:** `OrganizationsSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.organizationsSearchBuilder().withDomain('myDomain').build()
```

---
## withName(organizationName)


Sets de organization name to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **organizationName** | `string` | ❌ | hardware id |

### Retorna

{{% notice tip %}}
**Tipo:** `OrganizationsSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.organizationsSearchBuilder().withName('myOrganization').build()
```

---
## withWorkgroup(workgroupName)


Sets de workgroup name to search

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **workgroupName** | `string` | ❌ | workgroup name |

### Retorna

{{% notice tip %}}
**Tipo:** `OrganizationsSearchBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.organizationsSearchBuilder().withWorkgroup('myWorkgroup').build()
```

---

