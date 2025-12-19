+++
title = "Notebook Scheduler"
weight = 10
+++

NotebookScheduler

### NotebookScheduler Objects

```javascript
class NotebookScheduler()
```

This is a base object that contains all you can do about Bundles.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `Reference` _InternalOpenGateAPI_  - to the API object.


---

##### create


```javascript
function create() -> '*'
```



**Returns**:


- _`*`_ 


---

##### generateReport


```javascript
function generateReport(generateReport: boolean) -> 'NotebookScheduler'
```

Sets the generateReport attribute

**Arguments**:

- `generateReport` _boolean_  

**Returns**:


- _`NotebookScheduler`_ 


---

##### update


```javascript
function update()
```




---

##### withCronPattern


```javascript
function withCronPattern(cronPattern: string) -> 'NotebookScheduler'
```

Sets the crontab pattern

**Arguments**:

- `cronPattern` _string_  

**Returns**:


- _`NotebookScheduler`_ 


---

##### withIdentifier


```javascript
function withIdentifier(identifier: string) -> 'NotebookScheduler'
```

Sets the identifier attribute

**Arguments**:

- `identifier` _string_  

**Returns**:


- _`NotebookScheduler`_ 


---

##### withNotebookId


```javascript
function withNotebookId(notebookId: string) -> 'NotebookScheduler'
```

Sets the notebookId attribute

**Arguments**:

- `notebookId` _string_  

**Returns**:


- _`NotebookScheduler`_ 


---

##### withParams


```javascript
function withParams(params: *) -> '*'
```


**Arguments**:

- `params` _*_  

**Returns**:


- _`*`_ 


---

##### withReportRetentionDays


```javascript
function withReportRetentionDays(reportRetentionDays: number) -> 'NotebookScheduler'
```

Sets the reportRetentionDays attribute

**Arguments**:

- `reportRetentionDays` _number_  

**Returns**:


- _`NotebookScheduler`_ 


---

