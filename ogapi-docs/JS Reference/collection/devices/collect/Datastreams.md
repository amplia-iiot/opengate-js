+++
title = "Datastream"
weight = 10
+++

Datastream

### Datastream Objects

```javascript
class Datastream()
```

This is a base object that allows the user to create a Datastream.


##### constructor


```javascript
function constructor()
```




---

##### composeElement


```javascript
function composeElement() -> '*'
```



**Returns**:


- _`*`_ 


---

##### withDatapoint


```javascript
function withDatapoint(datapoint: Datapoint) -> 'Datastream'
```

Add a datapoint in datapoints

**Arguments**:

- `datapoint` _Datapoint_  - required field

**Returns**:


- _`Datastream`_ 


---

##### withFeed


```javascript
function withFeed(feed: string) -> 'Datastream'
```

Set the feed attribute

**Arguments**:

- `feed` _string_  - optionals field

**Returns**:


- _`Datastream`_ 


---

##### withId


```javascript
function withId(id: string) -> 'Datastream'
```

Set the id attribute

**Arguments**:

- `id` _string_  - required field

**Returns**:


- _`Datastream`_ 


---

