var { Then } = require('cucumber');

var typeMatch = {
    "entity.device": "onDevices",
    "entity.subscription": "subscriptionsSearchBuilder",
    "entity.subscriber": "subscribersSearchBuilder"
};

function _findEntityIntoOperationsResponse (operation) {
    return operation.entityId == this;
}

function findOperationsByJobId (jobId, resourceType) {
    var resourceFunction = typeMatch[resourceType];
    var ogapi = this.ogapi;
    var expect = this.expect;
    return ogapi.executionsSearchBuilder()[resourceFunction]().
        filter(
            ogapi.newFilterBuilder().and(ogapi.EX.eq("jobId", jobId))
        ).build().execute();
}

Then(/^response code should be: (\d+)$/, function (statusCode, callback) {
    // Write code here that turns the phrase above into concrete actions
    var data;
    data = this.responseData ? this.responseData.statusCode : this.data;
    var statusCodeResp = data;
    if (parseInt(statusCode) !== statusCodeResp && this.error) {
        throw new Error(Object.keys(this.error).length > 0 ? JSON.stringify(this.error) : this.error);
    }
    this.expect(parseInt(statusCode)).to.equal(statusCodeResp);

    callback();
});

Then(/^response code should be: "([^"]*)"$/, function (response, callback) {
    // Write code here that turns the phrase above into concrete actions
    var data;
    data = this.responseData && this.responseData.data ? this.responseData.data : this.responseData;
    var statusCodeResp = data;
    if (response !== statusCodeResp && this.error) {
        throw new Error(JSON.stringify(this.error));
    }
    this.expect(response).to.equal(statusCodeResp);

    callback();
});

Then(/^response data should has no elements$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    var data;
    data = this.responseData;
    this.expect(data.length).to.equal(0);
    callback();
});

Then(/^response data should has elements$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    var data;
    data = this.responseData;
    this.expect(data.length).to.not.equal(0);
    callback();
});



Then(/^throws an error\. the error message explain that a parameter with name "([^"]*)" is mandatory$/, function (parameterName, callback) {
    // Write code here that turns the phrase above into concrete actions
    this.expect(this.error).to.exist;
    this.expect(this.error).to.have.lengthOf(1);
    var errorText = this.error[0];
    this.expect(errorText).to.have.string(parameterName);
    callback();
});

Then(/^response error code sould be: (\d+)$/, function (statusCode, callback) {
    // Write code here that turns the phrase above into concrete actions     
    var response = this.responseData || this.error;
    if (typeof response.response !== "undefined") {
        response = response.response;
    }
    this.expect(response.statusCode).to.equal(parseInt(statusCode));
    callback();
});

Then(/^response must have attached "([^"]*)" as "([^"]*)" entity$/, function (provCustomId, resourceType) {
    // Write code here that turns the phrase above into concrete actions
    var expect = this.expect;
    var data;
    data = this.responseData.data;
    var jobId = data.id;
    return findOperationsByJobId.call(this, jobId, resourceType).
        then(function (response) {
            var responseData = response.data;
            var operationFound = responseData.operations.find(_findEntityIntoOperationsResponse, provCustomId);
            expect(operationFound).to.exist;

        }).
        catch(function (err) {
            expect(err).to.be.undefined;
        });
});

Then(/^response must have attached an entity list with "([^"]*)" type defined by:$/, function (resourceType, table) {
    // Write code here that turns the phrase above into concrete actions
    var expect = this.expect;
    var data;
    data = this.responseData.data;
    var jobId = data.id;
    return findOperationsByJobId.call(this, jobId, resourceType).
        then(function (response) {
            var responseData = response.data;
            for (var i = 0; i < table.raw().length; i++) {
                var provCustomId = table.raw()[i];
                var operationFound = responseData.operations.find(_findEntityIntoOperationsResponse, provCustomId);
                expect(operationFound).to.exist;
            }
        }).
        catch(function (err) {
            expect(err).to.be.undefined;
        });
});



Then('response specific error code sould be: {string}', function (statusCode, callback) {
    // Write code here that turns the phrase above into concrete actions     
    var response = this.responseData || this.error;
    if (typeof response.response !== "undefined") {
        response = response.response;
    }

    for (var i = 0; i < response.data.errors.length; i++) {
        this.expect(response.data.errors[i].code).to.equal(statusCode);
    }
    callback();
});

Then(/^response contains a parameter "([^"]*)" as name and "([^"]*)" as value$/, function (paramName, paramValue, callback) {
    // Write code here that turns the phrase above into concrete actions
    if (this.responseData.response) {
        this.expect(this.responseData.response.statusCode).to.equal(201);
    }
    var data;
    if (this.responseData.data)
        data = this.responseData.data;
    var parameters = data.request.parameters;
    
    this.expect(parameters[paramName]).to.equal(paramValue);

    callback();
});

Then('response contains a parameter {string} as name and {string} as json value', function (paramName, paramValue, callback) {
    // Write code here that turns the phrase above into concrete actions
    if (this.responseData.response) {
        this.expect(this.responseData.response.statusCode).to.equal(201);
    }
    var data;
    if (this.responseData.data)
        data = this.responseData.data;
    var parameters = data.request.parameters;
    this.expect(JSON.stringify(parameters[paramName])).to.equal(paramValue);

    callback();
});

Then(/^I can see into the post data a period by (\d+) minutes$/, function (minutes, callback) {
    // Write code here that turns the phrase above into concrete actions
    var period = this.build._postObj.task.schedule.repeating.period;
    this.expect(period).to.be.an('object');
    this.expect(period).to.deep.equal({
        unit: "MINUTES",
        each: eval(minutes)
    })
    callback();
});
Then(/^I can see into the post data a period by (\d+) hours/, function (hours, callback) {
    // Write code here that turns the phrase above into concrete actions
    var period = this.build._postObj.task.schedule.repeating.period;
    this.expect(period).to.be.an('object');
    this.expect(period).to.deep.equal({
        unit: "HOURS",
        each: eval(hours)
    })
    callback();
});
Then(/^I can see into the post data a period by (\d+) days/, function (days, callback) {
    // Write code here that turns the phrase above into concrete actions
    var period = this.build._postObj.task.schedule.repeating.period;
    this.expect(period).to.be.an('object');
    this.expect(period).to.deep.equal({
        unit: "DAYS",
        each: eval(days)
    })
    callback();
});

Then(/^I can not see into the post data a period by (\d+) hours$/, function (hours, callback) {
    // Write code here that turns the phrase above into concrete actions
    var period = this.build._postObj.task.schedule.repeating.period;
    this.expect(period).to.be.an('object');
    this.expect(period).to.deep.not.equal({
        unit: "HOURS",
        each: eval(hours)
    })
    callback();
});
Then(/^I can not see into the post data a period by (\d+) days/, function (days, callback) {
    // Write code here that turns the phrase above into concrete actions
    var period = this.build._postObj.task.schedule.repeating.period;
    this.expect(period).to.be.an('object');
    this.expect(period).to.deep.not.equal({
        unit: "DAYS",
        each: eval(days)
    })
    callback();
});
Then(/^I can not see into the post data a period by (\d+) minutes$/, function (minutes$, callback) {
    // Write code here that turns the phrase above into concrete actions
    var period = this.build._postObj.task.schedule.repeating.period;
    this.expect(period).to.be.an('object');
    this.expect(period).to.deep.not.equal({
        unit: "MINUTES",
        each: eval(minutes$)
    })
    callback();
});
Then(/^I can not see into the post data a period$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    var period = this.build._postObj.task.schedule.repeating.period;
    this.expect(period).to.be.undefined;
    callback();
});
Then(/^I can see into the post data a every day pattern$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    var pattern = this.build._postObj.task.schedule.repeating.pattern;
    this.expect(pattern).to.be.an('object');
    this.expect(pattern).to.have.all.keys('time');
    callback();
});

Then(/^I can see into the post data a every week pattern with days:$/, function (table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var days = [];
    for (var i = 0; i < table.raw().length; i++) {
        days.push(table.raw()[i][0]);
    }
    var pattern = this.build._postObj.task.schedule.repeating.pattern;
    this.expect(pattern).to.be.an('object');
    this.expect(pattern.weekly).to.be.an('object');
    this.expect(pattern.weekly).to.deep.equal({
        "days": days
    });
    callback();
});

Then(/^I can see into the post data a every month pattern at day (\d+) and months:$/, function (day, table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var months = [];
    for (var i = 0; i < table.raw().length; i++) {
        months.push(table.raw()[i][0]);
    }
    var pattern = this.build._postObj.task.schedule.repeating.pattern;
    this.expect(pattern).to.be.an('object');
    this.expect(pattern.monthly).to.be.an('object');
    this.expect(pattern.monthly).to.deep.equal({
        "months": months,
        "day": eval(day)
    });
    callback();
});

Then(/^I can see into the post data a every month pattern at day (\d+) and month "([^"]*)"$/, function (day, month, callback) {
    // Write code here that turns the phrase above into concrete actions
    var pattern = this.build._postObj.task.schedule.repeating.pattern;
    this.expect(pattern).to.be.an('object');
    this.expect(pattern.yearly).to.be.an('object');
    this.expect(pattern.yearly).to.deep.equal({
        "month": month,
        "day": eval(day)
    });
    callback();
});

Then(/^I can see into the post data a job timeout by (\d+) minutes$/, function (minutes, callback) {
    var milliseconds = (eval(minutes) * 60 * 1000) - 1000;
    var stop = this.build._postObj.task.job.request.schedule.stop;
    this.expect(stop).to.be.an('object');
    var jobTimeout = stop.delayed;
    this.expect(jobTimeout).to.equal(milliseconds);
    callback();
});

Then(/^this builder configuration throw a error equal to "([^"]*)"$/, function (errorText, callback) {
    this.expect(this.error).to.equal(errorText);
    callback();
});

Then(/^I can see into the post data a start date as "([^"]*)"$/, function (when, callback) {
    // Write code here that turns the phrase above into concrete actions     
    var schedule = (this.build._postObj.task || this.build._postObj.job.request).schedule;
    if (when === "now") {
        this.expect(schedule.start).to.be.undefined;
    } else {
        var date = new Date(Date.parse(when));
        this.expect(schedule.start.date).to.equal(when);
    }
    callback();
});

Then(/^throws an error equal to "([^"]*)"$/, function (errorMessage, callback) {
    this.expect(this.error).to.exist;
    var errorText;
    var _errorText;
    switch (this.error.constructor) {
        case Array:
            this.expect(this.error).to.have.lengthOf(1);
            errorText = this.error[0].description || this.error[0].message || this.error[0];    
            break;
        case Error: 
            errorText = this.error.message
            break;
        case String: 
            errorText = JSON.parse(this.error)
            //NO BREAK!!!!!
        case Object:
            _errorText = errorText || this.error
            if (_errorText.message) {
                errorText = _errorText.message;
            } else if (_errorText.data) {
                errorText = _errorText.data;
                if (errorText.errors) {
                    errorText = errorText.errors[0].message;
                }
            } else {
                errorText = _errorText;
            }
            break;
    }
    
    this.expect(errorText).to.equal(errorMessage);

    callback();
});

Then(/^does not throws an error$/, function (callback) {
    this.expect(this.error).not.to.exist;
    callback();
});

Then(/^an error is thrown$/, function (callback) {
    this.expect(this.error).to.exist;
    callback();
});