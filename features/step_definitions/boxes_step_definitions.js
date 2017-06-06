'use strict';

module.exports = function() {

    this.Then(/^I create a "([^"]*)" from current "([^"]*)" with next params:$/, function(setterName, currentEntity, table, callback) {
        var _this = this;
        _this.error = undefined;

        var model = "create";
        var dependantObject = undefined;

        try {
            //console.log("datos dependantObjects");
            var method = _this.model_match(_this.currentModel).setters(currentEntity)[setterName];
            dependantObject = _this.util[method](this.uploadProgress);

            var data = table.hashes();

            for (var i = 0; i < data.length; i++) {
                // se valida si se inyectan validators
                var submethod = _this.model_match(model).setters(setterName)[data[i].field];

                if (data[i].field !== 'validators') {
                    dependantObject = dependantObject[submethod](data[i].content);
                } else {
                    // el parametro tiene que ser un array de objetos validator
                    dependantObject = dependantObject[submethod](JSON.parse(data[i].content));
                }
            };
        } catch (err) {
            _this.error = err;

            callback();
        }
    });
};
