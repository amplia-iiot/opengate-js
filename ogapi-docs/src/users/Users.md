+++
title = "User"
weight = 10
+++

  This class allow make get request to user resource into Opengate North API.

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **Reference** | `InternalOpenGateAPI` | ❌ | to the API object. |


---
## changeApiKey(apiKey)


This invoke a request to OpenGate North API and the callback is managed by promises
This function updates a apiKey of a user

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **apiKey** | `String` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.usersBuilder().withEmail(example@example.es).withPassword(oldPassword).changeApiKey(newPassword);
```

---
## changePassword(newPassword)


This invoke a request to OpenGate North API and the callback is managed by promises
This function updates a password of a user

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **newPassword** | `String` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.usersBuilder().withEmail(example@example.es).withPassword(oldPassword).changePassword(newPassword);
```

---
## generateApiKey()




### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

---
## login(email, password, twoFaCode)


This invoke a request to OpenGate North API and the callback is managed by promises
This function get a JWT for user with Two Factor Authorithation (optional)

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **email** | `String` | ❌ | required field |
| **password** | `String` | ❌ | required field |
| **twoFaCode** | `String` | ❌ | optional field |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.usersBuilder().login(email, password);
 ogapi.usersBuilder().login(email, password, twoFaCode);
```

---
## requestResetPassword()


This invoke a request to OpenGate North API and the callback is managed by promises
This function request for new password when the user forgets it. 
Sends a password recovery email


### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.usersBuilder().withEmail(example@example.es).requestResetPassword()
```

---
## updatePassword(newPassword, tokenId)


This invoke a request to OpenGate North API and the callback is managed by promises
This function updates a password of a user with a tokenId

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **newPassword** | `String` | ❌ | required field |
| **tokenId** | `String` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `Promise`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.usersBuilder().withEmail(example@example.es).updatePassword(newPassword, tokenid);
```

---
## with2FaType(twoFaType)


Set the 2FaType attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **twoFaType** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `User`
<br>

{{% /notice %}}

---
## withApiKey(apiKey)


Set the apiKey attribute. Only on update user

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **apiKey** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `User`
<br>

{{% /notice %}}

---
## withCountryCode(countryCode)


Set the countryCode attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **countryCode** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `User`
<br>

{{% /notice %}}

---
## withDescription(description)


Set the description attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **description** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `User`
<br>

{{% /notice %}}

---
## withDomain(domain)


Set the domain attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **domain** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `User`
<br>

{{% /notice %}}

---
## withEmail(email)


Set the email attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **email** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `User`
<br>

{{% /notice %}}

---
## withForcePasswordChange(forcePasswordChange)


Set the forcePasswordChange: if true Forces you to reset your password on your next login attempt.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **forcePasswordChange** | `boolean` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `User`
<br>

{{% /notice %}}

---
## withLangCode(langCode)


Set the langCode attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **langCode** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `User`
<br>

{{% /notice %}}

---
## withName(name)


Set the name attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **name** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `User`
<br>

{{% /notice %}}

---
## withPassword(password)


Set the password attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **password** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `User`
<br>

{{% /notice %}}

---
## withProfile(profile)


Set the profile attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **profile** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `User`
<br>

{{% /notice %}}

---
## withSurname(surname)


Set the surname attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **surname** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `User`
<br>

{{% /notice %}}

---
## withTimezone(timezone)


Set the timezone attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **timezone** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `User`
<br>

{{% /notice %}}

---
## withWorkgroup(workgroup)


Set the workgroup attribute

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **workgroup** | `string` | ❌ | required field |

### Retorna

{{% notice tip %}}
**Tipo:** `User`
<br>

{{% /notice %}}

---

