// features/step_definitions/given_step_definitions.js
var moment = require("moment");
var assert = require('chai').assert;
var { Given } = require('cucumber');

var builderNameSkeleton = "new$1ParamBuilder";
var paramSingleNameSkeleton = "with$1";
var paramMultipleNameSkeleton = "add$1";

function getParameterName (paramName) {
    return paramName[0].toUpperCase() + paramName.slice(1);
}

function getBuilderParam (paramName) {
    return this.util.paramBuilderFactory[builderNameSkeleton.replace("$1", paramName)]();
}

function setSingleValueToParameter (_paramName, value) {
    var paramName = getParameterName(_paramName);
    var paramBuilder = getBuilderParam.call(this, paramName);
    paramBuilder[paramSingleNameSkeleton.replace("$1", paramName)](value);
    paramBuilder.buildAndAppend();
}

function setMultipleValueToParameter (_paramName, values) {
    var paramName = getParameterName(_paramName);
    var paramBuilder = getBuilderParam.call(this, paramName);
    for (var i = 0; i < values.length; i++) {
        paramBuilder[paramMultipleNameSkeleton.replace("$1", paramName)](values[i]);
    }
    paramBuilder.buildAndAppend();
}

Given(/^the start limit by "([^"]*)" and size limit by "([^"]*)"$/, function (start, size, callback) {
    start = eval(start);
    size = eval(size);
    try {
        this.util = this.util.limit(size, start);
    } catch (err) {
        this.error = err;
    }
    callback();
});

Given(/^the resource by "([^"]*)"$/, function (resource, callback) {
    try {
        this.util.resource = resource;
    } catch (err) {
        this.error = err;
    }
    callback();
});


Given(/^parameter "([^"]*)" by "([^"]*)" not allowed$/, function (paramName, value, callback) {
    // Write code here that turns the phrase above into concrete actions

    var _this = this;

    function MyFun () {
        setSingleValueToParameter.call(_this, paramName, value);
    }
    this.expect(MyFun).to.not.increase(this.util._build.parameters, 'length');

    callback();
});


Given(/^parameter "([^"]*)" as object by:$/, function (paramName, table, callback) {
    // Write code here that turns the phrase above into concrete actions
    setMultipleValueToParameter.call(this, paramName, table.hashes());
    callback();
});


Given(/^parameter "([^"]*)" by:$/, function (paramName, table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var values = [];
    if (table.raw()[0].length === 1) {
        var rows = table.raw();
        for (var i = 0; i < rows.length; i++) {
            values.push(rows[i][0]);
        }
    } else {
        values = table.hashes();
    }
    setMultipleValueToParameter.call(this, paramName, values);
    callback();
});

Given(/^parameter "([^"]*)" by "([^"]*)"$/, function (paramName, value, callback) {
    // Write code here that turns the phrase above into concrete actions
    setSingleValueToParameter.call(this, paramName, value);
    callback();
});

Given(/^parameter "([^"]*)" by "([^"]*)" as */, function (paramName, value, callback) {
    // Write code here that turns the phrase above into concrete actions
    setSingleValueToParameter.call(this, paramName, eval(value));
    callback();
});

Given(/^the path "([^"]*)"$/, function (pathName, callback) {
    // Write code here that turns the phrase above into concrete actions
    this.util.withPath(pathName);
    callback();
});

Given(/^the operation by "([^"]*)"$/, function (builderName) {
    // Write code here that turns the phrase above into concrete actions        
    var _this = this;
    try {
        return this.ogapi.operations.builderByOperationName(builderName).then(function (builder) {
            _this.util = builder;
        }).catch(function (err) {

        });
    } catch (err) {
        return;
    }
});

Given(/^an update periodicity by operation's id$/, function () {
    // Write code here that turns the phrase above into concrete actions        
    var _this = this;

    var data;
    data = _this.responseData.data;
    var jobId = data.job ? data.job.id : data.id;
    try {
        return this.ogapi.operations.updatePeriodicityBuilder(jobId).then(function (builder) {
            _this.util = builder;
        }).catch(function (err) {
            console.error('ERROR: ', err)
        });
    } catch (err) {
        console.error('ERROR: ', err)
        return;
    }
});

Given(/^execute immediately$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    this.util.executeImmediately();
    callback();
});

Given(/^append entities by "([^"]*)" as filter with "([^"]*)" as resourceType$/, function (filter, resourceType, callback) {
    // Write code here that turns the phrase above into concrete actions
    this.util.appendEntitiesBy.filter(JSON.parse(filter), resourceType);
    callback();
});


Given(/^append entities by "([^"]*)" as tag$/, function (tag, callback) {
    // Write code here that turns the phrase above into concrete actions
    this.util.appendEntitiesBy.tag(tag);
    callback();
});

Given(/^append entities by:$/, function (table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var position_of_entity_key_into_array = 0;
    var entityList = [];
    for (var i = 0; i < table.raw().length; i++) {
        entityList.push(table.raw()[i][position_of_entity_key_into_array]);
    }
    this.util.appendEntitiesBy.list(entityList);
    callback();
});

Given(/^the job timeout by (\d+) seconds$/, function (seconds, callback) {
    seconds = eval(seconds);
    this.util.withJobTimeout(seconds, 'seconds');
    callback();
});


Given(/^the retriesDelay by (\d+)$/, function (milliseconds, callback) {
    // Write code here that turns the phrase above into concrete actions
    milliseconds = eval(milliseconds);
    this.util.withRetriesDelay(milliseconds);
    callback();
});

Given('the parameters {string}', function (parameters, callback) {
    // Write code here that turns the phrase above into concrete actions
    parameters = JSON.parse(parameters);
    this.util.withParameters(parameters);
    callback();
});

Given(/^the retries by (\d+)$/, function (retries, callback) {
    // Write code here that turns the phrase above into concrete actions
    retries = eval(retries);
    this.util.withRetries(retries);
    callback();
});

Given(/^the ackTimeout by (\d+)$/, function (milliseconds, callback) {
    // Write code here that turns the phrase above into concrete actions
    milliseconds = eval(milliseconds);
    this.util.withAckTimeout(milliseconds);
    callback();
});

Given('the operationRetries by {string}', function (operationRetries, callback) {
    // Write code here that operationRetries
    this.util.withOperationRetries(JSON.parse(operationRetries));
    callback();
});

Given(/^the timeout by (\d+)$/, function (milliseconds, callback) {
    // Write code here that turns the phrase above into concrete actions
    milliseconds = eval(milliseconds);
    this.util
        .withTimeout(milliseconds);
    callback();
});

Given(/^the notes by "([^"]*)"$/, function (notes, callback) {
    // Write code here that turns the phrase above into concrete actions
    if (eval(notes) === null) {
        notes = eval(notes);
    }
    this.util.withNotes(notes)
    callback();
});

Given(/^the callback by "([^"]*)"$/, function (url, callback) {
    // Write code here that turns the phrase above into concrete actions
    this.util.withCallback(url)
    callback();
});

Given(/^the email by "([^"]*)"$/, function (email, callback) {
    // Write code here that turns the phrase above into concrete actions
    if (eval(email) === null) {
        email = eval(email);
    }
    this.util.withEmail(email);
    callback();
});

Given(/^the password by "([^"]*)"$/, function (password, callback) {
    // Write code here that turns the phrase above into concrete actions
    if (eval(password) === null) {
        password = eval(password);
    }
    this.util.withPassword(password);
    callback();
});

Given(/^execute in (\d+) minutes$/, function (minutes, callback) {
    minutes = eval(minutes);
    this.util.executeLater(minutes);
    callback();
});

Given(/^execute each (\d+) minutes$/, function (minutes, callback) {
    // Write code here that turns the phrase above into concrete actions
    minutes = eval(minutes);
    this.util.executeEach(new Date, "task_name").minutes(minutes);
    callback();
});
Given(/^execute each (\d+) days/, function (days, callback) {
    // Write code here that turns the phrase above into concrete actions
    days = eval(days);
    this.util.executeEach(new Date, "task_name").days(days);
    callback();
});
Given(/^execute each (\d+) hours/, function (hours, callback) {
    // Write code here that turns the phrase above into concrete actions
    hours = eval(hours);
    this.util.executeEach(new Date, "task_name").hours(hours);
    callback();
});

Given(/^execute every day at "([^"]*)"$/, function (when, callback) {
    // Write code here that turns the phrase above into concrete actions
    var date;
    if (when === "now") {
        date = new Date();
    } else {
        date = new Date(Date.parse(when));
    }
    this.util.executeEvery(date, "task_name").day();
    callback();
});

Given(/^update execute every day at "([^"]*)"$/, function (when, callback) {
    // Write code here that turns the phrase above into concrete actions
    var date;
    if (when === "now") {
        date = new Date();
    } else {
        date = new Date(Date.parse(when));
    }

    this.util.executeEvery(date);
    callback();
});

Given(/^execute every week at "([^"]*)" on days:$/, function (when, table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var date;
    if (when === "now") {
        date = new Date();
    } else {
        date = new Date(Date.parse(when));
    }
    var days = [];
    for (var i = 0; i < table.raw().length; i++) {
        days.push(table.raw()[i][0]);
    }
    this.util.executeEvery(date, "task_name").week.days(days);
    callback();
});

Given(/^update execute every week at on days:$/, function (table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var days = [];
    for (var i = 0; i < table.raw().length; i++) {
        days.push(table.raw()[i][0]);
    }
    this.util.executeEvery().week.days(days);
    callback();
});

Given(/^execute every week at on days:$/, function (table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var days = [];
    for (var i = 0; i < table.raw().length; i++) {
        days.push(table.raw()[i][0]);
    }
    try {
        this.util.executeEvery("task_name").week.days(days);
    } catch (error) {
        this.error = error;
    }
    callback();
});

Given(/^update execute every week at "([^"]*)" on days:$/, function (when, table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var date;
    if (when === "now") {
        date = new Date();
    } else {
        date = new Date(Date.parse(when));
    }
    var days = [];
    for (var i = 0; i < table.raw().length; i++) {
        days.push(table.raw()[i][0]);
    }
    this.util.executeEvery(date).week.days(days);
    callback();
});

Given(/^execute every month at "([^"]*)" at day (\d+) on months:$/, function (when, day, table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var date;
    if (when === "now") {
        date = new Date();
    } else {
        date = new Date(Date.parse(when));
    }
    var months = [];
    for (var i = 0; i < table.raw().length; i++) {
        months.push(table.raw()[i][0]);
    }
    this.util.executeEvery(date, "task_name").month(months).day(eval(day));
    callback();
});

Given(/^update execute every month at "([^"]*)" at day (\d+) on months:$/, function (when, day, table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var date;
    if (when === "now") {
        date = new Date();
    } else {
        date = new Date(Date.parse(when));
    }
    var months = [];
    for (var i = 0; i < table.raw().length; i++) {
        months.push(table.raw()[i][0]);
    }
    this.util.executeEvery(date).month(months).day(eval(day));
    callback();
});

Given(/^update execute every month at "([^"]*)" on months:$/, function (when, table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var date;
    if (when === "now") {
        date = new Date();
    } else {
        date = new Date(Date.parse(when));
    }
    var months = [];
    for (var i = 0; i < table.raw().length; i++) {
        months.push(table.raw()[i][0]);
    }
    this.util.executeEvery(date).month(months);
    callback();
});

Given(/^execute every month at "([^"]*)" on months:$/, function (when, table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var date;
    if (when === "now") {
        date = new Date();
    } else {
        date = new Date(Date.parse(when));
    }
    var months = [];
    for (var i = 0; i < table.raw().length; i++) {
        months.push(table.raw()[i][0]);
    }
    this.util.executeEvery(date, "task_name").month(months);
    callback();
});

Given(/^update execute every month at "([^"]*)" at day (\d+)$/, function (when, day, callback) {
    // Write code here that turns the phrase above into concrete actions
    var date;
    if (when === "now") {
        date = new Date();
    } else {
        date = new Date(Date.parse(when));
    }

    this.util.executeEvery(date).month().day(eval(day));
    callback();
});

Given(/^execute every month at "([^"]*)" at day (\d+)$/, function (when, day, callback) {
    // Write code here that turns the phrase above into concrete actions
    var date;
    if (when === "now") {
        date = new Date();
    } else {
        date = new Date(Date.parse(when));
    }
    try {
        this.util.executeEvery(date, "task_name").month().day(eval(day));
    } catch (error) {
        this.error = error;
    }
    callback();
});

Given(/^update execute every month at day (\d+) on months:$/, function (day, table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var months = [];
    for (var i = 0; i < table.raw().length; i++) {
        months.push(table.raw()[i][0]);
    }
    this.util.executeEvery().month(months).day(eval(day));
    callback();
});

Given(/^execute every month at day (\d+) on months:$/, function (day, table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var months = [];
    for (var i = 0; i < table.raw().length; i++) {
        months.push(table.raw()[i][0]);
    }
    try {
        this.util.executeEvery("task_name").month(months).day(eval(day));
    } catch (error) {
        this.error = error;
    }
    callback();
});

Given(/^update execute every month on months:$/, function (table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var months = [];
    for (var i = 0; i < table.raw().length; i++) {
        months.push(table.raw()[i][0]);
    }
    this.util.executeEvery().month(months);
    callback();
});

Given(/^execute every month on months:$/, function (table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var months = [];
    for (var i = 0; i < table.raw().length; i++) {
        months.push(table.raw()[i][0]);
    }
    try {
        this.util.executeEvery("task_name").month(months);
    } catch (error) {
        this.error = error;
    }
    callback();
});

Given(/^update execute every month at day (\d+)$/, function (day, callback) {
    // Write code here that turns the phrase above into concrete actions
    this.util.executeEvery().month().day(eval(day));
    callback();
});

Given(/^execute every month at day (\d+)$/, function (day, callback) {
    // Write code here that turns the phrase above into concrete actions
    try {
        this.util.executeEvery("task_name").month().day(eval(day));
    } catch (error) {
        this.error = error;
    }
    callback();
});

Given(/^execute every year at "([^"]*)" at day (\d+) on month "([^"]*)"$/, function (when, day, month, callback) {
    // Write code here that turns the phrase above into concrete actions
    var date;
    if (when === "now") {
        date = new Date();
    } else {
        date = new Date(Date.parse(when));
    }

    this.util.executeEvery(date, "task_name").year.month(month).day(eval(day));
    callback();
});

Given(/^update execute every year at "([^"]*)" at day (\d+) on month "([^"]*)"$/, function (when, day, month, callback) {
    // Write code here that turns the phrase above into concrete actions
    var date;
    if (when === "now") {
        date = new Date();
    } else {
        date = new Date(Date.parse(when));
    }

    this.util.executeEvery(date).year.month(month).day(eval(day));
    callback();
});

Given(/^update execute every year at "([^"]*)" on month "([^"]*)"$/, function (when, month, callback) {
    // Write code here that turns the phrase above into concrete actions
    var date;
    if (when === "now") {
        date = new Date();
    } else {
        date = new Date(Date.parse(when));
    }

    this.util.executeEvery(date).year.month(month);
    callback();
});

Given(/^execute every year at "([^"]*)" on month "([^"]*)"$/, function (when, month, callback) {
    // Write code here that turns the phrase above into concrete actions
    var date;
    if (when === "now") {
        date = new Date();
    } else {
        date = new Date(Date.parse(when));
    }

    this.util.executeEvery(date, "task_name").year.month(month);
    callback();
});

Given(/^update execute every year at "([^"]*)" at day (\d+)$/, function (when, day, callback) {
    // Write code here that turns the phrase above into concrete actions
    var date;
    if (when === "now") {
        date = new Date();
    } else {
        date = new Date(Date.parse(when));
    }

    this.util.executeEvery(date).year.day(eval(day));
    callback();
});

Given(/^execute every year at "([^"]*)" at day (\d+)$/, function (when, day, callback) {
    // Write code here that turns the phrase above into concrete actions
    var date;
    if (when === "now") {
        date = new Date();
    } else {
        date = new Date(Date.parse(when));
    }

    this.util.executeEvery(date, "task_name").year.day(eval(day));
    callback();
});

Given(/^update execute every year at day (\d+) on month "([^"]*)"$/, function (day, month, callback) {
    // Write code here that turns the phrase above into concrete actions
    this.util.executeEvery().year.month(month).day(eval(day));
    callback();
});

Given(/^execute every year at day (\d+) on month "([^"]*)"$/, function (day, month, callback) {
    // Write code here that turns the phrase above into concrete actions
    try {
        this.util.executeEvery("task_name").year.month(month).day(eval(day));
    } catch (error) {
        this.error = error;
    }
    callback();
});

Given(/^update execute every year on month "([^"]*)"$/, function (month, callback) {
    // Write code here that turns the phrase above into concrete actions

    this.util.executeEvery().year.month(month);
    callback();
});

Given(/^execute every year on month "([^"]*)"$/, function (month, callback) {
    // Write code here that turns the phrase above into concrete actions
    try {
        this.util.executeEvery("task_name").year.month(month);
    } catch (error) {
        this.error = error;
    }
    callback();
});

Given(/^update execute every year at day (\d+)$/, function (day, callback) {
    // Write code here that turns the phrase above into concrete actions

    this.util.executeEvery().year.day(eval(day));
    callback();
});

Given(/^execute every year at day (\d+)$/, function (day, callback) {
    // Write code here that turns the phrase above into concrete actions
    try {
        this.util.executeEvery("task_name").year.day(eval(day));
    } catch (error) {
        this.error = error;
    }
    callback();
});


Given(/^execute each with stop date (\d+) "([^"]*)" earlier than current date$/, function (stopDelay, delayType, callback) {
    try {
        executeEachNowEarlierThan.call(this, stopDelay, delayType);
    } catch (err) {
        this.error = err.message;
    }
    callback();
});


Given(/^execute each with (\d+) as a number of repetitions$/, function (repetitions, callback) {
    var start = moment(new Date());
    try {
        this.util.executeEach(start.toDate(), eval(repetitions));
    } catch (err) {
        this.error = err.message;
    }
    callback();
});

Given(/^execute each with stop date (\d+) "([^"]*)" later than the start date as now$/, function (stopDelay, delayType, callback) {
    try {
        executeEachNowLaterThan.call(this, stopDelay, delayType);
    } catch (err) {
        console.error('ERROR: ', err);
        this.error = err.message;
    }
    callback();
});

Given(/^execute each (\d+) "([^"]*)" with stop date (\d+) "([^"]*)" later than the start date as now$/, function (eachValue, eachType, stopDelay, delayType, callback) {
    executeEachNowLaterThan.call(this, stopDelay, delayType)[eachType](eval(eachValue));
    callback();
});

Given(/^I wait (\d+) seconds$/, {timeout: 60*1000}, function (seconds, callback) {
    setTimeout(callback, seconds * 1000);
});

Given(/^I wait for DONE every (\d+) seconds, maximum (\d+) seconds$/, {timeout: 60*1000}, function (every_seconds, seconds, callback) {
    var _this = this;
    assert.isAbove(seconds * 1000, every_seconds * 1000, 'Maximum seconds must be strictly greater than every second');
    var everyTimeout;
    var globalTimeout = setTimeout(
        function () {
            clearTimeout(everyTimeout);
            callback();
        }, seconds * 1000);

    function isDone () {
        if (this.responseData !== 'DONE')
            everyTimeout = setTimeout(isDone, every_seconds * seconds);
        else
            clearTimeout(globalTimeout);
    }
    isDone();
});


function executeEachNowLaterThan (stopDelay, delayType) {
    var start = moment(new Date());
    var stop = moment(new Date()).add(stopDelay, delayType);
    return executeEach.call(this, start, stop);
}

function executeEachNowEarlierThan (stopDelay, delayType) {
    var start = moment(new Date());
    var stop = moment(new Date()).subtract(stopDelay, delayType);
    return executeEach.call(this, start, stop);
}

function executeEach (start, stop) {
    return this.util.executeEach(start.toDate(), stop.toDate());
}