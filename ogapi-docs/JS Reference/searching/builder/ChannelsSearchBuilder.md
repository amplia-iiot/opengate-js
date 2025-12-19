+++
title = "Channels Search Builder"
weight = 10
+++

ChannelsSearchBuilder

### ChannelsSearchBuilder Objects

```javascript
class ChannelsSearchBuilder()
```

Defined a search over Channels	


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `parent` _InternalOpenGateAPI_  - Instance of our InternalOpenGateAPI


---

##### disableDefaultSorted


```javascript
function disableDefaultSorted() -> 'ChannelsSearchBuilder'
```

The response will return a response without sorted


**Returns**:


- _`ChannelsSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.channelsSearchBuilder().disableDefaultSorted() 
~~~

---

##### summary


```javascript
function summary() -> 'SearchWithSummaryBuilder'
```

The response will only have a summary information 


**Returns**:


- _`SearchWithSummaryBuilder`_ 


**Example**:

~~~javascript
ogapi.channelsSearchBuilder().summary() 
~~~

---

