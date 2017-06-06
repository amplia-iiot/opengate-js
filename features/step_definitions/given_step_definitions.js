// features/step_definitions/given_step_definitions.js
var moment = require("moment");


module.exports = function () {
    var builderNameSkeleton = "new$1ParamBuilder";
    var paramSingleNameSkeleton = "with$1";
    var paramMultipleNameSkeleton = "add$1";

    function getParameterName(paramName) {
        return paramName[0].toUpperCase() + paramName.slice(1);
    }

    function getBuilderParam(paramName) {
        return this.util.paramBuilderFactory[builderNameSkeleton.replace("$1", paramName)]();
    }

    function setSingleValueToParameter(_paramName, value) {
        var paramName = getParameterName(_paramName);
        var paramBuilder = getBuilderParam.call(this, paramName);
        paramBuilder[paramSingleNameSkeleton.replace("$1", paramName)](value);
        paramBuilder.buildAndAppend();
    }

    function setMultipleValueToParameter(_paramName, values) {
        var paramName = getParameterName(_paramName);
        var paramBuilder = getBuilderParam.call(this, paramName);
        for (var i = 0; i < values.length; i++) {
            paramBuilder[paramMultipleNameSkeleton.replace("$1", paramName)](values[i]);
        }
        paramBuilder.buildAndAppend();
    }

    this.Given(/^the start limit by "([^"]*)" and size limit by "([^"]*)"$/, function (start, size, callback) {
        var start = eval(start);
        var size = eval(size);
        try {
            this.util = this.util.limit(size, start);
        } catch (err) {
            this.error = err;
        }
        callback();
    });


    this.Given(/^parameter "([^"]*)" by "([^"]*)" not allowed$/, function (paramName, value, callback) {
        // Write code here that turns the phrase above into concrete actions

        var _this = this;

        function MyFun() {
            setSingleValueToParameter.call(_this, paramName, value);
        }
        this.expect(MyFun).to.not.increase(this.util._build.parameters, 'length');

        callback();
    });


    this.Given(/^parameter "([^"]*)" as object by:$/, function (paramName, table, callback) {
        // Write code here that turns the phrase above into concrete actions
        setMultipleValueToParameter.call(this, paramName, table.hashes());
        callback();
    });


    this.Given(/^parameter "([^"]*)" by:$/, function (paramName, table, callback) {
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

    this.Given(/^parameter "([^"]*)" by "([^"]*)"$/, function (paramName, value, callback) {
        // Write code here that turns the phrase above into concrete actions
        setSingleValueToParameter.call(this, paramName, value);
        callback();
    });

    this.Given(/^parameter "([^"]*)" by "([^"]*)" as */, function (paramName, value, callback) {
        // Write code here that turns the phrase above into concrete actions
        setSingleValueToParameter.call(this, paramName, eval(value));
        callback();
    });

    this.Given(/^the operation by "([^"]*)"$/, function (builderName) {
        // Write code here that turns the phrase above into concrete actions        
        var _this = this;
        return this.ogapi.operations.builderByOperationName(builderName).then(function (builder) {
            _this.util = builder;
        });
    });

    this.Given(/^an update periodicity by operation's id$/, function () {
        // Write code here that turns the phrase above into concrete actions        
        var _this = this;

        var data = undefined;
        //console.log("JOB: " + JSON.stringify(_this.responseData));
        data = _this.responseData.data;
        var jobId = data.job ? data.job.id : data.id;
        //console.log("JOB_ID: " + jobId);
        return this.ogapi.operations.updatePeriodicityBuilder(jobId).then(function (builder) {
            _this.util = builder;
        });
    });

    this.Given(/^execute immediately$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        this.util.executeImmediately();
        callback();
    });

    this.Given(/^append entities by "([^"]*)" as filter with "([^"]*)" as entityType$/, function (filter, entityType, callback) {
        // Write code here that turns the phrase above into concrete actions
        this.util.appendEntitiesBy.filter(JSON.parse(filter), entityType);
        callback();
    });


    this.Given(/^append entities by "([^"]*)" as tag$/, function (tag, callback) {
        // Write code here that turns the phrase above into concrete actions
        this.util.appendEntitiesBy.tag(tag);
        callback();
    });

    this.Given(/^append entities by:$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        var position_of_entity_key_into_array = 0;
        var entityList = [];
        for (var i = 0; i < table.raw().length; i++) {
            entityList.push(table.raw()[i][position_of_entity_key_into_array]);
        }
        this.util.appendEntitiesBy.list(entityList);
        callback();
    });

    this.Given(/^the job timeout by (\d+) minutes$/, function (minutes, callback) {
        var minutes = eval(minutes);
        this.util.withJobTimeout(minutes);
        callback();
    });


    this.Given(/^the retriesDelay by (\d+)$/, function (milliseconds, callback) {
        // Write code here that turns the phrase above into concrete actions
        var milliseconds = eval(milliseconds);
        this.util.withRetriesDelay(milliseconds);
        callback();
    });

    this.Given(/^the retries by (\d+)$/, function (retries, callback) {
        // Write code here that turns the phrase above into concrete actions
        var retries = eval(retries);
        this.util.withRetries(retries);
        callback();
    });

    this.Given(/^the ackTimeout by (\d+)$/, function (milliseconds, callback) {
        // Write code here that turns the phrase above into concrete actions
        var milliseconds = eval(milliseconds);
        this.util.withAckTimeout(milliseconds);
        callback();
    });

    this.Given(/^the timeout by (\d+)$/, function (milliseconds, callback) {
        // Write code here that turns the phrase above into concrete actions
        var milliseconds = eval(milliseconds);
        this.util
            .withTimeout(milliseconds);
        callback();
    });

    this.Given(/^the notes by "([^"]*)"$/, function (notes, callback) {
        // Write code here that turns the phrase above into concrete actions
        if (eval(notes) === null) {
            notes = eval(notes);
        }
        this.util.withNotes(notes)
        callback();
    });

    this.Given(/^the callback by "([^"]*)"$/, function (url, callback) {
        // Write code here that turns the phrase above into concrete actions
        this.util.withCallback(url)
        callback();
    });

    this.Given(/^the email by "([^"]*)"$/, function (email, callback) {
        // Write code here that turns the phrase above into concrete actions
        if (eval(email) === null) {
            email = eval(email);
        }
        this.util.withEmail(email);
        callback();
    });

    this.Given(/^the password by "([^"]*)"$/, function (password, callback) {
        // Write code here that turns the phrase above into concrete actions
        if (eval(password) === null) {
            password = eval(password);
        }
        this.util.withPassword(password);
        callback();
    });

    this.Given(/^execute in (\d+) minutes$/, function (minutes, callback) {
        minutes = eval(minutes);
        this.util.executeLater(minutes);
        callback();
    });

    this.Given(/^execute each (\d+) minutes$/, function (minutes, callback) {
        // Write code here that turns the phrase above into concrete actions
        minutes = eval(minutes);
        this.util.executeEach(new Date, "task_name").minutes(minutes);
        callback();
    });
    this.Given(/^execute each (\d+) days/, function (days, callback) {
        // Write code here that turns the phrase above into concrete actions
        days = eval(days);
        this.util.executeEach(new Date, "task_name").days(days);
        callback();
    });
    this.Given(/^execute each (\d+) hours/, function (hours, callback) {
        // Write code here that turns the phrase above into concrete actions
        hours = eval(hours);
        this.util.executeEach(new Date, "task_name").hours(hours);
        callback();
    });

    this.Given(/^execute every day at "([^"]*)"$/, function (when, callback) {
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

    this.Given(/^update execute every day at "([^"]*)"$/, function (when, callback) {
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

    this.Given(/^execute every week at "([^"]*)" on days:$/, function (when, table, callback) {
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

    this.Given(/^update execute every week at on days:$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        var days = [];
        for (var i = 0; i < table.raw().length; i++) {
            days.push(table.raw()[i][0]);
        }
        this.util.executeEvery().week.days(days);
        callback();
    });

    this.Given(/^execute every week at on days:$/, function (table, callback) {
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

    this.Given(/^update execute every week at "([^"]*)" on days:$/, function (when, table, callback) {
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

    this.Given(/^execute every month at "([^"]*)" at day (\d+) on months:$/, function (when, day, table, callback) {
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

    this.Given(/^update execute every month at "([^"]*)" at day (\d+) on months:$/, function (when, day, table, callback) {
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

    this.Given(/^update execute every month at "([^"]*)" on months:$/, function (when, table, callback) {
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

    this.Given(/^execute every month at "([^"]*)" on months:$/, function (when, table, callback) {
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
        this.util.executeEvery(date, "task_name").month(months)
        callback();
    });

    this.Given(/^update execute every month at "([^"]*)" at day (\d+)$/, function (when, day, callback) {
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

    this.Given(/^execute every month at "([^"]*)" at day (\d+)$/, function (when, day, callback) {
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

    this.Given(/^update execute every month at day (\d+) on months:$/, function (day, table, callback) {
        // Write code here that turns the phrase above into concrete actions
        var months = [];
        for (var i = 0; i < table.raw().length; i++) {
            months.push(table.raw()[i][0]);
        }
        this.util.executeEvery().month(months).day(eval(day));
        callback();
    });

    this.Given(/^execute every month at day (\d+) on months:$/, function (day, table, callback) {
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

    this.Given(/^update execute every month on months:$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        var months = [];
        for (var i = 0; i < table.raw().length; i++) {
            months.push(table.raw()[i][0]);
        }
        this.util.executeEvery().month(months);
        callback();
    });

    this.Given(/^execute every month on months:$/, function (table, callback) {
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

    this.Given(/^update execute every month at day (\d+)$/, function (day, callback) {
        // Write code here that turns the phrase above into concrete actions
        this.util.executeEvery().month().day(eval(day));
        callback();
    });

    this.Given(/^execute every month at day (\d+)$/, function (day, callback) {
        // Write code here that turns the phrase above into concrete actions
        try {
            this.util.executeEvery("task_name").month().day(eval(day));
        } catch (error) {
            this.error = error;
        }
        callback();
    });

    this.Given(/^execute every year at "([^"]*)" at day (\d+) on month "([^"]*)"$/, function (when, day, month, callback) {
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

    this.Given(/^update execute every year at "([^"]*)" at day (\d+) on month "([^"]*)"$/, function (when, day, month, callback) {
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

    this.Given(/^update execute every year at "([^"]*)" on month "([^"]*)"$/, function (when, month, callback) {
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

    this.Given(/^execute every year at "([^"]*)" on month "([^"]*)"$/, function (when, month, callback) {
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

    this.Given(/^update execute every year at "([^"]*)" at day (\d+)$/, function (when, day, callback) {
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

    this.Given(/^execute every year at "([^"]*)" at day (\d+)$/, function (when, day, callback) {
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

    this.Given(/^update execute every year at day (\d+) on month "([^"]*)"$/, function (day, month, callback) {
        // Write code here that turns the phrase above into concrete actions
        this.util.executeEvery().year.month(month).day(eval(day));
        callback();
    });

    this.Given(/^execute every year at day (\d+) on month "([^"]*)"$/, function (day, month, callback) {
        // Write code here that turns the phrase above into concrete actions
        try {
            this.util.executeEvery("task_name").year.month(month).day(eval(day));
        } catch (error) {
            this.error = error;
        }
        callback();
    });

    this.Given(/^update execute every year on month "([^"]*)"$/, function (month, callback) {
        // Write code here that turns the phrase above into concrete actions

        this.util.executeEvery().year.month(month);
        callback();
    });

    this.Given(/^execute every year on month "([^"]*)"$/, function (month, callback) {
        // Write code here that turns the phrase above into concrete actions
        try {
            this.util.executeEvery("task_name").year.month(month);
        } catch (error) {
            this.error = error;
        }
        callback();
    });

    this.Given(/^update execute every year at day (\d+)$/, function (day, callback) {
        // Write code here that turns the phrase above into concrete actions

        this.util.executeEvery().year.day(eval(day));
        callback();
    });

    this.Given(/^execute every year at day (\d+)$/, function (day, callback) {
        // Write code here that turns the phrase above into concrete actions
        try {
            this.util.executeEvery("task_name").year.day(eval(day));
        } catch (error) {
            this.error = error;
        }
        callback();
    });


    this.Given(/^execute each with stop date (\d+) "([^"]*)" earlier than current date$/, function (stopDelay, delayType, callback) {
        try {
            executeEachNowEarlierThan.call(this, stopDelay, delayType);
        } catch (err) {
            this.error = err.message;
        }
        callback();
    });


    this.Given(/^execute each with (\d+) as a number of repetitions$/, function (repetitions, callback) {
        var start = moment(new Date());
        try {
            this.util.executeEach(start.toDate(), eval(repetitions));
        } catch (err) {
            this.error = err.message;
        }
        callback();
    });

    this.Given(/^execute each with stop date (\d+) "([^"]*)" later than the start date as now$/, function (stopDelay, delayType, callback) {
        try {
            executeEachNowLaterThan.call(this, stopDelay, delayType);
        } catch (err) {
            //console.log(err);
            this.error = err.message;
        }
        callback();
    });

    this.Given(/^execute each (\d+) "([^"]*)" with stop date (\d+) "([^"]*)" later than the start date as now$/, function (eachValue, eachType, stopDelay, delayType, callback) {
        executeEachNowLaterThan.call(this, stopDelay, delayType)[eachType](eval(eachValue));
        callback();
    });

    this.Given(/^I wait (\d+) seconds$/, function (seconds, callback) {
        setTimeout(callback, seconds * 1000);
    });


    function executeEachNowLaterThan(stopDelay, delayType) {
        var start = moment(new Date());
        var stop = moment(new Date()).add(stopDelay, delayType);
        return executeEach.call(this, start, stop);
    }

    function executeEachNowEarlierThan(stopDelay, delayType) {
        var start = moment(new Date());
        var stop = moment(new Date()).subtract(stopDelay, delayType);
        return executeEach.call(this, start, stop);
    }

    function executeEach(start, stop) {
        return this.util.executeEach(start.toDate(), stop.toDate());
    }
};