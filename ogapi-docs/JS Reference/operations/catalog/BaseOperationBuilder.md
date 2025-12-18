+++
title = "Base Operation Builder"
weight = 10
+++

**Class:** `BaseOperationBuilder`

Defines the builder to execute an operation that is into catalog

## constructor


Constructor

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **ogapi** | `InternalOpenGateAPI` | ❌ | this is configuration about Opengate North API. |
| **config** | `object` | ❌ | this is configuration about operation. |


---
## appendEntitiesBy


Util used into BaseOperationBuilder to append entities the three different ways. By filter, By tags, By entityList



---
## build()


Build a instance of Operation 


### Retorna

{{% notice tip %}}
**Tipo:** `Operation`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.operations.builderFactory.newXXXBuilder().build()
```

---
## executeAtDate(date, active)


The operation will be created with delayed start or if you not pass any argument then the method return a cron expression builder.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **date** | `Date` | ❌ |  |
| **active** | `boolean` | ❌ | If active is false, an operation is created in paused |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder,CronExpressionBuilder`
<br>

{{% /notice %}}

---
## executeEach(date, name, end, active, description)


The operation will execute with a period that you must define with ExecuteEachBuilder 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **date** | `Date` | ❌ | Date when operation will be executed |
| **name** | `string` | ❌ | Name associated to periodicity |
| **end** | `number or Date` | ❌ | When periodicity ends. By repetitions or by date |
| **active** | `boolean` | ❌ | If active is false, an operation is created in paused |
| **description** | `string` | ❌ | Description associated to periodicity |

### Retorna

{{% notice tip %}}
**Tipo:** `ExecuteEachBuilder`
<br>

{{% /notice %}}

---
## executeEvery(date, name, end, active, description)


The operation will execute with a period that you must define with ExecuteEveryBuilder 

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **date** | `Date` | ❌ | Date when operation will be executed |
| **name** | `string` | ❌ | Name associated to periodicity |
| **end** | `number or Date` | ❌ | When periodicity ends. By repetitions or by date |
| **active** | `boolean` | ❌ | If active is false, an operation is created in paused |
| **description** | `string` | ❌ | Description associated to periodicity |

### Retorna

{{% notice tip %}}
**Tipo:** `ExecuteEveryBuilder`
<br>

{{% /notice %}}

---
## executeIDLE()


The operation will be created in IDLE state


### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

---
## executeImmediately()


The operation will be execute immediately.


### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

---
## executeLater(minutes, active)


The operation will be created with delayed start or if you not pass any argument then the method return a cron expression builder.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **minutes** | `number` | ❌ |  |
| **active** | `boolean` | ❌ | If active is false, an operation is created in paused |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder,CronExpressionBuilder`
<br>

{{% /notice %}}

---
## withAckTimeout(milliseconds, format)


Set ackTimeout to operation.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **milliseconds** | `number` | ❌ |  |
| **format** | `string` | ❌ | Can be &#x27;milliseconds&#x27; || &#x27;ms&#x27; ,&#x27;seconds&#x27; || &#x27;s&#x27;, &#x27;minutes&#x27; || &#x27;m&#x27;, &#x27;hours&#x27; || &#x27;h&#x27;, &#x27;days&#x27; || &#x27;d&#x27;, &#x27;weeks&#x27; || &#x27;w&#x27;, &#x27;months&#x27; || &#x27;M&#x27; |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.operations.builderFactory.newXXXBuilder().withAckTimeout(11)
```

---
## withCallback(url)


Set a callback to operation. If it is set also will be set notify with true value

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **url** | `string` | ❌ | If null then parameter will be removed into builder |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.operations.builderFactory.newXXXBuilder().withCallback("http://my.web")
```

---
## withJobTimeout(milliseconds, format)


Set a timeout of job.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **milliseconds** | `number` | ❌ | if null then parameter will be removed into builder |
| **format** | `string` | ❌ | Can be &#x27;milliseconds&#x27; || &#x27;ms&#x27; ,&#x27;seconds&#x27; || &#x27;s&#x27;, &#x27;mintutes&#x27; || &#x27;m&#x27;, &#x27;hours&#x27; || &#x27;h&#x27;, &#x27;days&#x27; || &#x27;d&#x27;, &#x27;weeks&#x27; || &#x27;w&#x27;, &#x27;months&#x27; || &#x27;M&#x27; |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.operations.builderFactory.newXXXBuilder().withJobTimeout(180)
```

---
## withNotes(notes)


Set notes to operation

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **notes** | `string` | ❌ | If null then parameter will be removed into builder |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.operations.builderFactory.newXXXBuilder().withNotes("own notes")
```

---
## withOperationRetries(operationRetries)


Set operation retries

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **operationRetries** | `Array` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.operations.builderFactory.newXXXBuilder().withOperationRetries(11)
```

---
## withParameter(parameter, value)



### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parameter** | `*` | ❌ |  |
| **value** | `*` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `*`
<br>

{{% /notice %}}

---
## withParameters(parameters)


Set parameters of the operation

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **parameters** | `object` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.operations.builderFactory.newXXXBuilder().withParameters({ param1: 'value1', param2: 'value2'})
```

---
## withRetries(retriesNumber)


Set number of retries that operation will have.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **retriesNumber** | `number` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.operations.builderFactory.newXXXBuilder().withRetries(2)
```

---
## withRetriesDelay(milliseconds, format)


Set delay between operation retries.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **milliseconds** | `number` | ❌ |  |
| **format** | `string` | ❌ | Can be &#x27;milliseconds&#x27; || &#x27;ms&#x27; ,&#x27;seconds&#x27; || &#x27;s&#x27;, &#x27;minutes&#x27; || &#x27;m&#x27;, &#x27;hours&#x27; || &#x27;h&#x27;, &#x27;days&#x27; || &#x27;d&#x27;, &#x27;weeks&#x27; || &#x27;w&#x27;, &#x27;months&#x27; || &#x27;M&#x27; |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.operations.builderFactory.newXXXBuilder().withRetriesDelay(11)
```

---
## withScatteringMaxSpread(percentage)


Set a scattering max spread to operation.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **percentage** | `number` | ❌ | if null then parameter will be removed into builder |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.operations.builderFactory.newXXXBuilder().withScatteringMaxSpread(20)
```

---
## withScatteringStrategy(factor, warningMaxRate)


Set a scattering strategy to operation.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **factor** | `number` | ❌ | if null then parameter will be removed into builder |
| **warningMaxRate** | `number` | ❌ |  |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.operations.builderFactory.newXXXBuilder().withScatteringStrategy(20,4)
```

---
## withTimeout(milliseconds, format)


Set timeout to operation.

### Parámetros

| Nombre | Tipo | Opcional | Descripción |
| :--- | :--- | :---: | :--- |
| **milliseconds** | `number` | ❌ |  |
| **format** | `string` | ❌ | Can be &#x27;milliseconds&#x27; || &#x27;ms&#x27; ,&#x27;seconds&#x27; || &#x27;s&#x27;, &#x27;minutes&#x27; || &#x27;m&#x27;, &#x27;hours&#x27; || &#x27;h&#x27;, &#x27;days&#x27; || &#x27;d&#x27;, &#x27;weeks&#x27; || &#x27;w&#x27;, &#x27;months&#x27; || &#x27;M&#x27; |

### Retorna

{{% notice tip %}}
**Tipo:** `BaseOperationBuilder`
<br>

{{% /notice %}}

### Ejemplos

```javascript
 ogapi.operations.builderFactory.newXXXBuilder().withTimeout(11)
```

---

