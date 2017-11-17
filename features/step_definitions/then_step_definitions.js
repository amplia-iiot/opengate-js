module.exports = function () {

    var typeMatch = {
        "ASSET": "onDevices",
        "GATEWAY": "onDevices",
        "SUBSCRIPTION": "subscriptionsSearchBuilder",
        "SUBSCRIBER": "subscribersSearchBuilder"
    };

    function _findEntityIntoOperationsResponse(operation) {
        return operation.entityId == this;
    }

    function findOperationsByJobId(jobId, entityType) {
        var resourceFunction = typeMatch[entityType];
        var ogapi = this.ogapi;
        var expect = this.expect;
        return ogapi.executionsSearchBuilder()[resourceFunction]().
            filter(
            ogapi.newFilterBuilder().and(ogapi.EX.eq("jobId", jobId))
            ).build().execute();
    }

    this.Then(/^response code should be: (\d+)$/, function (statusCode, callback) {
        // Write code here that turns the phrase above into concrete actions
        var data = undefined;
        data = this.responseData ? this.responseData.statusCode : this.data;
        var statusCodeResp = data;
        //console.log("RESPONSE_: " + JSON.stringify(this.responseData));
        this.expect(parseInt(statusCode)).to.equal(statusCodeResp);

        callback();
    });

    this.Then(/^response code should be: "([^"]*)"$/, function (response, callback) {
        // Write code here that turns the phrase above into concrete actions
        var data = undefined;
        data = this.responseData && this.responseData.data ? this.responseData.data : this.responseData;
        var statusCodeResp = data;
        //console.log("RESPONSE_: " + JSON.stringify(this.responseData));
        this.expect(response).to.equal(statusCodeResp);

        callback();
    });

    this.Then(/^response data should has no elements$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        var data = undefined;
        data = this.responseData;
        //console.log("RESPONSE_: " + JSON.stringify(data));
        this.expect(data.length).to.equal(0);
        callback();
    });

    this.Then(/^response data should has elements$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        var data = undefined;
        data = this.responseData;
        //console.log("RESPONSE_: " + JSON.stringify(data));
        this.expect(data.length).to.not.equal(0);
        callback();
    });



    this.Then(/^throws an error\. the error message explain that a parameter with name "([^"]*)" is mandatory$/, function (parameterName, callback) {
        // Write code here that turns the phrase above into concrete actions
        this.expect(this.error).to.exist;
        this.expect(this.error).to.have.lengthOf(1);
        var errorText = this.error[0];
        this.expect(errorText).to.have.string(parameterName);
        callback();
    });

    this.Then(/^response error code sould be: (\d+)$/, function (statusCode, callback) {
        // Write code here that turns the phrase above into concrete actions     
        var response = this.responseData;
        if (typeof response.response !== "undefined") {
            response = response.response;
        }
        this.expect(response.statusCode).to.equal(parseInt(statusCode));
        callback();
    });

    this.Then(/^response must have attached "([^"]*)" as "([^"]*)" entity$/, function (provCustomId, entityType) {
        // Write code here that turns the phrase above into concrete actions
        var expect = this.expect;
        var data = undefined;
        data = this.responseData.data;
        var jobId = data.id;
        return findOperationsByJobId.call(this, jobId, entityType).
            then(function (response) {
                var responseData = response.data;
                var operationFound = responseData.operations.find(_findEntityIntoOperationsResponse, provCustomId);
                expect(operationFound).to.exist;

            }).
            catch(function (err) {
                expect(err).to.be.undefined;
            });
    });

    this.Then(/^response must have attached an entity list with "([^"]*)" type defined by:$/, function (entityType, table) {
        // Write code here that turns the phrase above into concrete actions
        var expect = this.expect;
        var data = undefined;
        data = this.responseData.data;
        var jobId = data.id;
        return findOperationsByJobId.call(this, jobId, entityType).
            then(function (response) {
                var responseData = response.data;
                for (var i = 0; i < table.raw().length; i++) {
                    var provCustomId = table.raw()[i];
                    var operationFound = responseData.operations.find(_findEntityIntoOperationsResponse, provCustomId);
                    //console.info("Trying to find operation with entity <'" + provCustomId + "'>");
                    expect(operationFound).to.exist;
                }
            }).
            catch(function (err) {
                expect(err).to.be.undefined;
            });
    });



    this.Then(/^response specific error code sould be: (\d+)$/, function (statusCode, callback) {
        // Write code here that turns the phrase above into concrete actions     
        var response = this.responseData;
        if (typeof response.response !== "undefined") {
            response = response.response;
        }

        for (var i = 0; i < response.data.errors.length; i++) {
            this.expect(response.data.errors[i].code).to.equal(parseInt(statusCode));
        }
        callback();
    });

    this.Then(/^response contains a parameter "([^"]*)" as name and "([^"]*)" as value$/, function (paramName, paramValue, callback) {
        // Write code here that turns the phrase above into concrete actions
        if (this.responseData.response) {
            this.expect(this.responseData.response.statusCode).to.equal(201);
        }
        var data = undefined;
        if (this.responseData.data)
            data = this.responseData.data;
        var parameters = data.request.parameters;
        var parameterNames = parameters.map(function (item) {
            return item.name
        });
        var isDuplicate = parameterNames.some(function (item, idx) {
            return parameterNames.indexOf(item) != idx
        });
        this.expect(isDuplicate).to.be.false;


        var parameter = parameters.find(function (param) {
            return param.name == this;
        }, paramName);
        this.expect(parameter).to.be.an('object');


        for (var key in parameter.value) {
            this.expect(parameter.value[key] == paramValue).to.be.true;
        }
        callback();
    });

    this.Then(/^I can see into the post data a period by (\d+) minutes$/, function (minutes, callback) {
        // Write code here that turns the phrase above into concrete actions
        var period = this.build._postObj.task.schedule.repeating.period;
        this.expect(period).to.be.an('object');
        this.expect(period).to.deep.equal({ unit: "MINUTES", each: eval(minutes) })
        callback();
    });
    this.Then(/^I can see into the post data a period by (\d+) hours/, function (hours, callback) {
        // Write code here that turns the phrase above into concrete actions
        var period = this.build._postObj.task.schedule.repeating.period;
        this.expect(period).to.be.an('object');
        this.expect(period).to.deep.equal({ unit: "HOURS", each: eval(hours) })
        callback();
    });
    this.Then(/^I can see into the post data a period by (\d+) days/, function (days, callback) {
        // Write code here that turns the phrase above into concrete actions
        var period = this.build._postObj.task.schedule.repeating.period;
        this.expect(period).to.be.an('object');
        this.expect(period).to.deep.equal({ unit: "DAYS", each: eval(days) })
        callback();
    });

    this.Then(/^I can not see into the post data a period by (\d+) hours$/, function (hours, callback) {
        // Write code here that turns the phrase above into concrete actions
        var period = this.build._postObj.task.schedule.repeating.period;
        this.expect(period).to.be.an('object');
        this.expect(period).to.deep.not.equal({ unit: "HOURS", each: eval(hours) })
        callback();
    });
    this.Then(/^I can not see into the post data a period by (\d+) days/, function (days, callback) {
        // Write code here that turns the phrase above into concrete actions
        var period = this.build._postObj.task.schedule.repeating.period;
        this.expect(period).to.be.an('object');
        this.expect(period).to.deep.not.equal({ unit: "DAYS", each: eval(days) })
        callback();
    });
    this.Then(/^I can not see into the post data a period by (\d+) minutes$/, function (minutes$, callback) {
        // Write code here that turns the phrase above into concrete actions
        var period = this.build._postObj.task.schedule.repeating.period;
        this.expect(period).to.be.an('object');
        this.expect(period).to.deep.not.equal({ unit: "MINUTES", each: eval(minutes$) })
        callback();
    });
    this.Then(/^I can not see into the post data a period$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        var period = this.build._postObj.task.schedule.repeating.period;
        this.expect(period).to.be.undefined;
        callback();
    });
    this.Then(/^I can see into the post data a every day pattern$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        var pattern = this.build._postObj.task.schedule.repeating.pattern;
        this.expect(pattern).to.be.an('object');
        this.expect(pattern).to.have.all.keys('time');
        callback();
    });

    this.Then(/^I can see into the post data a every week pattern with days:$/, function (table, callback) {
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

    this.Then(/^I can see into the post data a every month pattern at day (\d+) and months:$/, function (day, table, callback) {
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

    this.Then(/^I can see into the post data a every month pattern at day (\d+) and month "([^"]*)"$/, function (day, month, callback) {
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

    this.Then(/^I can see into the post data a job timeout by (\d+) minutes$/, function (minutes, callback) {
        var milliseconds = eval(minutes) * 60 * 1000;
        var stop = this.build._postObj.task.job.request.schedule.stop;
        this.expect(stop).to.be.an('object');
        var jobTimeout = stop.delayed;
        this.expect(jobTimeout).to.equal(milliseconds);
        callback();
    });

    this.Then(/^this builder configuration throw a error equal to "([^"]*)"$/, function (errorText, callback) {
        this.expect(this.error).to.equal(errorText);
        callback();
    });

    this.Then(/^I can see into the post data a start date as "([^"]*)"$/, function (when, callback) {
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

    this.Then(/^throws an error equal to "([^"]*)"$/, function (errorMessage, callback) {
        this.expect(this.error).to.exist;
        var errorText;
        if (this.error.constructor == Array) {
            this.expect(this.error).to.have.lengthOf(1);
            errorText = this.error[0].description || this.error[0].message || this.error[0];
        } else {
            if (this.error.message) {
                errorText = this.error.message;
            } else if (this.error.data) {
                errorText = this.error.data;
                if (errorText.errors) {
                    errorText = errorText.errors[0].message;
                }
            } else {
                errorText = this.error;
            }

        }

        this.expect(errorText).to.equal(errorMessage);

        callback();
    });

    this.Then(/^does not throws an error$/, function (callback) {
        this.expect(this.error).not.to.exist;
        callback();
    });

    this.Then(/^an error is thrown$/, function (callback) {
        this.expect(this.error).to.exist;
        callback();
    });
};
