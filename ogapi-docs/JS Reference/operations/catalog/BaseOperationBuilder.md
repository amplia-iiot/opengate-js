+++
title = "Base Operation Builder"
weight = 10
+++

BaseOperationBuilder

### BaseOperationBuilder Objects

```javascript
class BaseOperationBuilder()
```

Defines the builder to execute an operation that is into catalog


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is configuration about Opengate North API.
- `config` _object_  - this is configuration about operation.


---

##### appendEntitiesBy


```javascript
function appendEntitiesBy()
```

Util used into BaseOperationBuilder to append entities the three different ways. By filter, By tags, By entityList



---

##### build


```javascript
function build() -> 'Operation'
```

Build a instance of Operation 


**Returns**:


- _`Operation`_ 


**Example**:

~~~javascript
 ogapi.operations.builderFactory.newXXXBuilder().build()
~~~

---

##### executeAtDate


```javascript
function executeAtDate(date: Date,active: boolean) -> 'BaseOperationBuilder,CronExpressionBuilder'
```

The operation will be created with delayed start or if you not pass any argument then the method return a cron expression builder.

**Arguments**:

- `date` _Date_  
- `active` _boolean_  - If active is false, an operation is created in paused

**Returns**:


- _`BaseOperationBuilder,CronExpressionBuilder`_ 


---

##### executeEach


```javascript
function executeEach(date: Date,name: string,end: number or Date,active: boolean,description: string) -> 'ExecuteEachBuilder'
```

The operation will execute with a period that you must define with ExecuteEachBuilder 

**Arguments**:

- `date` _Date_  - Date when operation will be executed
- `name` _string_  - Name associated to periodicity
- `end` _number or Date_  - When periodicity ends. By repetitions or by date
- `active` _boolean_  - If active is false, an operation is created in paused
- `description` _string_  - Description associated to periodicity

**Returns**:


- _`ExecuteEachBuilder`_ 


---

##### executeEvery


```javascript
function executeEvery(date: Date,name: string,end: number or Date,active: boolean,description: string) -> 'ExecuteEveryBuilder'
```

The operation will execute with a period that you must define with ExecuteEveryBuilder 

**Arguments**:

- `date` _Date_  - Date when operation will be executed
- `name` _string_  - Name associated to periodicity
- `end` _number or Date_  - When periodicity ends. By repetitions or by date
- `active` _boolean_  - If active is false, an operation is created in paused
- `description` _string_  - Description associated to periodicity

**Returns**:


- _`ExecuteEveryBuilder`_ 


---

##### executeIDLE


```javascript
function executeIDLE() -> 'BaseOperationBuilder'
```

The operation will be created in IDLE state


**Returns**:


- _`BaseOperationBuilder`_ 


---

##### executeImmediately


```javascript
function executeImmediately() -> 'BaseOperationBuilder'
```

The operation will be execute immediately.


**Returns**:


- _`BaseOperationBuilder`_ 


---

##### executeLater


```javascript
function executeLater(minutes: number,active: boolean) -> 'BaseOperationBuilder,CronExpressionBuilder'
```

The operation will be created with delayed start or if you not pass any argument then the method return a cron expression builder.

**Arguments**:

- `minutes` _number_  
- `active` _boolean_  - If active is false, an operation is created in paused

**Returns**:


- _`BaseOperationBuilder,CronExpressionBuilder`_ 


---

##### withAckTimeout


```javascript
function withAckTimeout(milliseconds: number,format: string) -> 'BaseOperationBuilder'
```

Set ackTimeout to operation.

**Arguments**:

- `milliseconds` _number_  
- `format` _string_  - Can be &#x27;milliseconds&#x27; || &#x27;ms&#x27; ,&#x27;seconds&#x27; || &#x27;s&#x27;, &#x27;minutes&#x27; || &#x27;m&#x27;, &#x27;hours&#x27; || &#x27;h&#x27;, &#x27;days&#x27; || &#x27;d&#x27;, &#x27;weeks&#x27; || &#x27;w&#x27;, &#x27;months&#x27; || &#x27;M&#x27;

**Returns**:


- _`BaseOperationBuilder`_ 


**Example**:

~~~javascript
 ogapi.operations.builderFactory.newXXXBuilder().withAckTimeout(11)
~~~

---

##### withCallback


```javascript
function withCallback(url: string) -> 'BaseOperationBuilder'
```

Set a callback to operation. If it is set also will be set notify with true value

**Arguments**:

- `url` _string_  - If null then parameter will be removed into builder

**Returns**:


- _`BaseOperationBuilder`_ 


**Example**:

~~~javascript
 ogapi.operations.builderFactory.newXXXBuilder().withCallback("http://my.web")
~~~

---

##### withJobTimeout


```javascript
function withJobTimeout(milliseconds: number,format: string) -> 'BaseOperationBuilder'
```

Set a timeout of job.

**Arguments**:

- `milliseconds` _number_  - if null then parameter will be removed into builder
- `format` _string_  - Can be &#x27;milliseconds&#x27; || &#x27;ms&#x27; ,&#x27;seconds&#x27; || &#x27;s&#x27;, &#x27;mintutes&#x27; || &#x27;m&#x27;, &#x27;hours&#x27; || &#x27;h&#x27;, &#x27;days&#x27; || &#x27;d&#x27;, &#x27;weeks&#x27; || &#x27;w&#x27;, &#x27;months&#x27; || &#x27;M&#x27;

**Returns**:


- _`BaseOperationBuilder`_ 


**Example**:

~~~javascript
 ogapi.operations.builderFactory.newXXXBuilder().withJobTimeout(180)
~~~

---

##### withNotes


```javascript
function withNotes(notes: string) -> 'BaseOperationBuilder'
```

Set notes to operation

**Arguments**:

- `notes` _string_  - If null then parameter will be removed into builder

**Returns**:


- _`BaseOperationBuilder`_ 


**Example**:

~~~javascript
 ogapi.operations.builderFactory.newXXXBuilder().withNotes("own notes")
~~~

---

##### withOperationRetries


```javascript
function withOperationRetries(operationRetries: Array) -> 'BaseOperationBuilder'
```

Set operation retries

**Arguments**:

- `operationRetries` _Array_  

**Returns**:


- _`BaseOperationBuilder`_ 


**Example**:

~~~javascript
 ogapi.operations.builderFactory.newXXXBuilder().withOperationRetries(11)
~~~

---

##### withParameter


```javascript
function withParameter(parameter: *,value: *) -> '*'
```


**Arguments**:

- `parameter` _*_  
- `value` _*_  

**Returns**:


- _`*`_ 


---

##### withParameters


```javascript
function withParameters(parameters: object) -> 'BaseOperationBuilder'
```

Set parameters of the operation

**Arguments**:

- `parameters` _object_  

**Returns**:


- _`BaseOperationBuilder`_ 


**Example**:

~~~javascript
 ogapi.operations.builderFactory.newXXXBuilder().withParameters({ param1: 'value1', param2: 'value2'})
~~~

---

##### withRetries


```javascript
function withRetries(retriesNumber: number) -> 'BaseOperationBuilder'
```

Set number of retries that operation will have.

**Arguments**:

- `retriesNumber` _number_  

**Returns**:


- _`BaseOperationBuilder`_ 


**Example**:

~~~javascript
 ogapi.operations.builderFactory.newXXXBuilder().withRetries(2)
~~~

---

##### withRetriesDelay


```javascript
function withRetriesDelay(milliseconds: number,format: string) -> 'BaseOperationBuilder'
```

Set delay between operation retries.

**Arguments**:

- `milliseconds` _number_  
- `format` _string_  - Can be &#x27;milliseconds&#x27; || &#x27;ms&#x27; ,&#x27;seconds&#x27; || &#x27;s&#x27;, &#x27;minutes&#x27; || &#x27;m&#x27;, &#x27;hours&#x27; || &#x27;h&#x27;, &#x27;days&#x27; || &#x27;d&#x27;, &#x27;weeks&#x27; || &#x27;w&#x27;, &#x27;months&#x27; || &#x27;M&#x27;

**Returns**:


- _`BaseOperationBuilder`_ 


**Example**:

~~~javascript
 ogapi.operations.builderFactory.newXXXBuilder().withRetriesDelay(11)
~~~

---

##### withScatteringMaxSpread


```javascript
function withScatteringMaxSpread(percentage: number) -> 'BaseOperationBuilder'
```

Set a scattering max spread to operation.

**Arguments**:

- `percentage` _number_  - if null then parameter will be removed into builder

**Returns**:


- _`BaseOperationBuilder`_ 


**Example**:

~~~javascript
 ogapi.operations.builderFactory.newXXXBuilder().withScatteringMaxSpread(20)
~~~

---

##### withScatteringStrategy


```javascript
function withScatteringStrategy(factor: number,warningMaxRate: number) -> 'BaseOperationBuilder'
```

Set a scattering strategy to operation.

**Arguments**:

- `factor` _number_  - if null then parameter will be removed into builder
- `warningMaxRate` _number_  

**Returns**:


- _`BaseOperationBuilder`_ 


**Example**:

~~~javascript
 ogapi.operations.builderFactory.newXXXBuilder().withScatteringStrategy(20,4)
~~~

---

##### withTimeout


```javascript
function withTimeout(milliseconds: number,format: string) -> 'BaseOperationBuilder'
```

Set timeout to operation.

**Arguments**:

- `milliseconds` _number_  
- `format` _string_  - Can be &#x27;milliseconds&#x27; || &#x27;ms&#x27; ,&#x27;seconds&#x27; || &#x27;s&#x27;, &#x27;minutes&#x27; || &#x27;m&#x27;, &#x27;hours&#x27; || &#x27;h&#x27;, &#x27;days&#x27; || &#x27;d&#x27;, &#x27;weeks&#x27; || &#x27;w&#x27;, &#x27;months&#x27; || &#x27;M&#x27;

**Returns**:


- _`BaseOperationBuilder`_ 


**Example**:

~~~javascript
 ogapi.operations.builderFactory.newXXXBuilder().withTimeout(11)
~~~

---

