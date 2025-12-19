+++
title = "Bulk Execution Builder"
weight = 10
+++

BulkExecutionBuilder

### BulkExecutionBuilder Objects

```javascript
class BulkExecutionBuilder()
```

This builder give you the necessary tools to create a bulk executions using our OpenGate REST


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - required field. This is ogapi instance
- `organization` _string_  - required field. This is the organization name
- `processorId` _string_  - required field. This is the provision processor use for bulk provision
- `timeout` _number_ (optional) - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception


---

##### bulk


```javascript
function bulk(rawFile: string,File,extension: string) -> '*'
```

Do a bulk using specific Provision Processor.

**Arguments**:

- `rawFile` _string,File_  - String with path of file or File (Blob)
- `extension` _string_ (optional) - File format

**Returns**:


- _`*`_ 


**Example**:

~~~javascript
 ogapi.bulkExecutionBuilder('orgname', 'processorId', 10000).bulk(rawFile, extension)
~~~

---

##### plan


```javascript
function plan(rawFile: string,File,extension: string,numberOfEntriesToProcess: number) -> '*'
```

Instead of creating a bulk process, return the provision process planning for specified entries. This is is synch process that does not cause changes in the database

**Arguments**:

- `rawFile` _string,File_  - String with path of file or File (Blob)
- `extension` _string_ (optional) - File format
- `numberOfEntriesToProcess` _number_ (optional) - Number of entries to be processed.

**Returns**:


- _`*`_ 


**Example**:

~~~javascript
 ogapi.bulkExecutionBuilder('orgname', 'processorId', 10000).plan(rawFile, extension)
 ogapi.bulkExecutionBuilder('orgname', 'processorId', 10000).plan(rawFile, extension, numberOfEntriesToProcess)
~~~

---

