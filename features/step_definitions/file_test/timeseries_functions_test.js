var newValue = receivedValues.length;
if (data.exists(currentValue)) {
    newValue = newValue + currentValue;
}
return result.ok(newValue);