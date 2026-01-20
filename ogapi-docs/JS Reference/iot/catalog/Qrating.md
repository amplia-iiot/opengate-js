+++
title = "Qrating"
weight = 10
+++

Qrating

### Qrating Objects

```javascript
class Qrating()
```

Defines the builder to configure a qurating of datastream of IoT datamodel. With this builder you can configure a qrating


##### constructor


```javascript
function constructor()
```




---

##### build


```javascript
function build() -> 'Object'
```

Build a Qrating json object


**Returns**:


- _`Object`_ - Datastream json object


**Example**:

~~~javascript
ogapi.QratingsBuilder().build()
~~~

---

##### withConversionMatrix


```javascript
function withConversionMatrix(conversionMatrix: Object) -> 'Qrating'
```

Set the conversionMatrix attribute

**Arguments**:

- `conversionMatrix` _Object_  

**Returns**:


- _`Qrating`_ 


---

##### withCumulativePeriodDivisor


```javascript
function withCumulativePeriodDivisor(cumulativePeriodDivisor: string) -> 'Qrating'
```

Set the cumulativePeriodDivisor attribute

**Arguments**:

- `cumulativePeriodDivisor` _string_  

**Returns**:


- _`Qrating`_ 


---

##### withIdeal


```javascript
function withIdeal(label: string,value: number) -> 'Qrating'
```

Set the ideal attribute

**Arguments**:

- `label` _string_  - required field
- `value` _number_  - required field

**Returns**:


- _`Qrating`_ 


---

##### withMaxAllowed


```javascript
function withMaxAllowed(label: string,value: number) -> 'Qrating'
```

Set the maxAllowed attribute

**Arguments**:

- `label` _string_  - required field
- `value` _number_  - required field

**Returns**:


- _`Qrating`_ 


---

##### withMaxDesired


```javascript
function withMaxDesired(label: string,value: number) -> 'Qrating'
```

Set the maxDesired attribute

**Arguments**:

- `label` _string_  - required field
- `value` _number_  - required field

**Returns**:


- _`Qrating`_ 


---

##### withMaxScore


```javascript
function withMaxScore(maxScore: number) -> 'Qrating'
```

Set the maxScore attribute

**Arguments**:

- `maxScore` _number_  - required field

**Returns**:


- _`Qrating`_ 


---

##### withMinDesired


```javascript
function withMinDesired(label: string,value: number) -> 'Qrating'
```

Set the minDesired attribute

**Arguments**:

- `label` _string_  - required field
- `value` _number_  - required field

**Returns**:


- _`Qrating`_ 


---

##### withMinRequired


```javascript
function withMinRequired(label: string,value: number) -> 'Qrating'
```

Set the minRequired attribute

**Arguments**:

- `label` _string_  - required field
- `value` _number_  - required field

**Returns**:


- _`Qrating`_ 


---

##### withVersion


```javascript
function withVersion(version: string) -> 'Qrating'
```

Set the version attribute

**Arguments**:

- `version` _string_  - required field

**Returns**:


- _`Qrating`_ 


---

