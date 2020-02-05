define(function() {
    mocha.setup('bdd');
    /** @test {InternalOpenGateAPI#certificatesBuilder()} */
    describe('Check funcionality certificates:', function() {
        var certificates;
        before(function() {
            certificates = ogapi.certificatesBuilder();
        });
        /** @test {InternalOpenGateAPI#bundlesBuilder} */
        describe('Check basic parameters:', function() {

            it('Name is not a String', function() {
                assert.throws(function() {
                    certificates.withName(11);
                }, "Parameter name must be a string, cannot be empty and has a maximum length of 50");
            });
            it('Name max length', function() {
                assert.throws(function() {
                    certificates.withName(11);
                }, "Parameter name must be a string, cannot be empty and has a maximum length of 50");
            });

            it('administrativeState is not a String', function() {
                assert.throws(function() {
                    certificates.withAdministrativeState(1);
                }, "Parameter administrativeState must be typeof string and cannot be empty");

            });

            it('administrativeState is not a String', function() {
                assert.throws(function() {
                    certificates.withAdministrativeState("NOT_ACTIVE");
                }, "Parameter administrativeState must be typeof string and cannot be empty");

            });

            it('hardwares is not a String', function() {
                assert.throws(function() {
                    certificates.withHardwares([{}]);
                }, "Parameter administrativeState must be typeof string and cannot be empty");

            });

        });

        describe('Create:', function() {

            var certificates;
            before(function() {
                certificates = ogapi.certificatesBuilder();
            });

            it('Create a certificate', function() {
                var file = "-----BEGIN CERTIFICATE-----\n" +
                    "MIIFXDCCA0SgAwIBAgIEV+4AwzANBgkqhkiG9w0BAQsFADBwMQswCQYDVQQGEwJF" +
                    "UzEPMA0GA1UECAwGTWFkcmlkMQ8wDQYDVQQHDAZNYWRyaWQxEjAQBgNVBAoMCUFt" +
                    "cGxpYSkpKTESMBAGA1UECwwJQW1wbGlhKSkpMRcwFQYDVQQDDA5wcm92LnRlc3Qu" +
                    "cm9vdDAeFw0xNjA5MzAwNjA2NDFaFw0xNzA5MzAwNjA2NDFaMHAxCzAJBgNVBAYT" +
                    "AkVTMQ8wDQYDVQQIDAZNYWRyaWQxDzANBgNVBAcMBk1hZHJpZDESMBAGA1UECgwJ" +
                    "QW1wbGlhKSkpMRIwEAYDVQQLDAlBbXBsaWEpKSkxFzAVBgNVBAMMDnByb3YudGVz" +
                    "dC5yb290MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAqBhgGrHTLmk0" +
                    "F1Rq6qFkBHGF5ZNQ9Ira4v1jTJfMr5ppB/HplXqrjiamstJ1K4pcLoeLQOcMMWmk" +
                    "GKF8EV1UTD+pqSXo6j0f8I6UGqGwNiHAYlL3CwWsQ0rZSSNQfW03myfpVo3yDLlR" +
                    "BiFH+fVwjHnaNrRHlQ8vzHfYUqXpU04DinONhM2avaDQjfbS/2Pu4Qb9sMPF1SYb" +
                    "eTx8fAmBg8u7jlbcZsQaPdvUPURhXK5q/5kN/8wxM8suKSc6iOQzzbrbVI8lr+ZT" +
                    "Bcw2D2uRbQ9nCQAiQTJ7OENq5JLYM58sop7ZSRfRLKkb6GnLHTG9cio1Yro2cAGI" +
                    "G8p+6paNRajmV9KOkGG0xTEBkYs7lhnxQp692QnMq/bNOjX9QW/xb+T+IrG0t9bK" +
                    "h08Ll9A+HvWvePcOdZfiJbEdr+mWNUEArxcxnKgS9QruWtLpGh5UjYQcnf/XjnSR" +
                    "EucDIB0mDPyJerVat1p7Mvu2tdnvxLCQmBIeyO0FpSaeOLENIZ68jEzZNGEFdPim" +
                    "Sqb4vjRoV+5QQmHNIIb8rZswsFbBCK/yVnnJ4j3Kd0mmsQGDYeHAYOvjw7mT9AU4" +
                    "qgB49q34FsLo3vale9ayPnHHWZ7OUIjlHgVSmAzjohI+0b6IgWF3bLgTCeVu1LKe" +
                    "g0aCTiQeWEhdk/kJ7EVV8pbNVHGnbgsCAwEAATANBgkqhkiG9w0BAQsFAAOCAgEA" +
                    "OCg0ek9bSeWg9zCpxIDGD+TI2VtnfeHkVgUMg13a8old9gsAIpb4X75m8jfBcF1P" +
                    "LOmjCXVzr8Eun4LNpJs+pwnVTQPYbx1RPzKLXJzBCBAtX4FgQmRdYBp2J/THR/6N" +
                    "mWh6ZCxhL9MZpwG1RIsxot65RacImLkqsVre37Ry4AHrLkkXfd1csaNEvAK+Dd2u" +
                    "o+3mMYR3U62bn2nAAPHFbQ9yOIIjiJMmqcBei1dxfBdUcus2l+HacWqjeRu3PZoz" +
                    "gNXWE7k7x+nUn/OqmR717F8BQqgQrtzV6R6juQmYfmghUJA1RUFBvVpm9ytRZry4" +
                    "S/3iHdgm+k3N7oAYtEJANaokZk+CrDUUB7mjleHsmApNw6ZC0Zh1T7MrK73g37Ke" +
                    "t7FsD1w06w//D5p/gD5dFJP6Zhcqb9EJSGFn6wfwagbNor0eA0QCpx8ZgUDb3n06" +
                    "0zGBlyTFxG9QVmhoVQt6GQrUSypaYfuC+nVjQV4eAVZQVN9HgyTj77uj/wRBzY5S" +
                    "EqX0xyjAj/cRDwKGgblr1XIlZD24MkxPX6uuOJENwrFEBg1I9jLeZgEjJy0ITzqa" +
                    "hWrN+Q95QjBR6FAUH7bl2x6UJef4uZQZaT0NNclV65mAdOptLoNyd9BN25pqz7Rb" +
                    "NIDI0Q9rTAjHLOtxHnVb746T27kER0MiiUiMGf6C1Q8=\n" +
                    "-----END CERTIFICATE-----";

                certificates.withName("Karma_Testing_Name");
                certificates.withDescription("Karma_Testing_Name description");
                certificates.withAdministrativeState("ACTIVE");
                certificates.withUsages(["CERT_SIGN"]);
                certificates.withTags(["tag1", "tag2"]);
                certificates.withHardware([{
                    "hardwareId": "OpenGateSecure"
                }]);
                assert.doesNotThrow(function() {
                    certificates.create(file);
                });

            });
        });

        describe('Delete:', function() {

            var certificates;
            var id = "n0t-3x15t5";
            before(function() {
                certificates = ogapi.certificatesBuilder();
            });

            it('Delete a not exists certificate', function() {
                return certificates.withId(id).delete().then(function(){
                    assert.isTrue(false, "");
                    return;
                }).catch(function(err) {
                    console.log(JSON.stringify(err));
                    assert.isTrue(true, "");
                    return;
            });
            });

            it('Create a certificate', function() {
                var file = "-----BEGIN CERTIFICATE-----\n" +
                    "MIIFXDCCA0SgAwIBAgIEV+4AwzANBgkqhkiG9w0BAQsFADBwMQswCQYDVQQGEwJF" +
                    "UzEPMA0GA1UECAwGTWFkcmlkMQ8wDQYDVQQHDAZNYWRyaWQxEjAQBgNVBAoMCUFt" +
                    "cGxpYSkpKTESMBAGA1UECwwJQW1wbGlhKSkpMRcwFQYDVQQDDA5wcm92LnRlc3Qu" +
                    "cm9vdDAeFw0xNjA5MzAwNjA2NDFaFw0xNzA5MzAwNjA2NDFaMHAxCzAJBgNVBAYT" +
                    "AkVTMQ8wDQYDVQQIDAZNYWRyaWQxDzANBgNVBAcMBk1hZHJpZDESMBAGA1UECgwJ" +
                    "QW1wbGlhKSkpMRIwEAYDVQQLDAlBbXBsaWEpKSkxFzAVBgNVBAMMDnByb3YudGVz" +
                    "dC5yb290MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAqBhgGrHTLmk0" +
                    "F1Rq6qFkBHGF5ZNQ9Ira4v1jTJfMr5ppB/HplXqrjiamstJ1K4pcLoeLQOcMMWmk" +
                    "GKF8EV1UTD+pqSXo6j0f8I6UGqGwNiHAYlL3CwWsQ0rZSSNQfW03myfpVo3yDLlR" +
                    "BiFH+fVwjHnaNrRHlQ8vzHfYUqXpU04DinONhM2avaDQjfbS/2Pu4Qb9sMPF1SYb" +
                    "eTx8fAmBg8u7jlbcZsQaPdvUPURhXK5q/5kN/8wxM8suKSc6iOQzzbrbVI8lr+ZT" +
                    "Bcw2D2uRbQ9nCQAiQTJ7OENq5JLYM58sop7ZSRfRLKkb6GnLHTG9cio1Yro2cAGI" +
                    "G8p+6paNRajmV9KOkGG0xTEBkYs7lhnxQp692QnMq/bNOjX9QW/xb+T+IrG0t9bK" +
                    "h08Ll9A+HvWvePcOdZfiJbEdr+mWNUEArxcxnKgS9QruWtLpGh5UjYQcnf/XjnSR" +
                    "EucDIB0mDPyJerVat1p7Mvu2tdnvxLCQmBIeyO0FpSaeOLENIZ68jEzZNGEFdPim" +
                    "Sqb4vjRoV+5QQmHNIIb8rZswsFbBCK/yVnnJ4j3Kd0mmsQGDYeHAYOvjw7mT9AU4" +
                    "qgB49q34FsLo3vale9ayPnHHWZ7OUIjlHgVSmAzjohI+0b6IgWF3bLgTCeVu1LKe" +
                    "g0aCTiQeWEhdk/kJ7EVV8pbNVHGnbgsCAwEAATANBgkqhkiG9w0BAQsFAAOCAgEA" +
                    "OCg0ek9bSeWg9zCpxIDGD+TI2VtnfeHkVgUMg13a8old9gsAIpb4X75m8jfBcF1P" +
                    "LOmjCXVzr8Eun4LNpJs+pwnVTQPYbx1RPzKLXJzBCBAtX4FgQmRdYBp2J/THR/6N" +
                    "mWh6ZCxhL9MZpwG1RIsxot65RacImLkqsVre37Ry4AHrLkkXfd1csaNEvAK+Dd2u" +
                    "o+3mMYR3U62bn2nAAPHFbQ9yOIIjiJMmqcBei1dxfBdUcus2l+HacWqjeRu3PZoz" +
                    "gNXWE7k7x+nUn/OqmR717F8BQqgQrtzV6R6juQmYfmghUJA1RUFBvVpm9ytRZry4" +
                    "S/3iHdgm+k3N7oAYtEJANaokZk+CrDUUB7mjleHsmApNw6ZC0Zh1T7MrK73g37Ke" +
                    "t7FsD1w06w//D5p/gD5dFJP6Zhcqb9EJSGFn6wfwagbNor0eA0QCpx8ZgUDb3n06" +
                    "0zGBlyTFxG9QVmhoVQt6GQrUSypaYfuC+nVjQV4eAVZQVN9HgyTj77uj/wRBzY5S" +
                    "EqX0xyjAj/cRDwKGgblr1XIlZD24MkxPX6uuOJENwrFEBg1I9jLeZgEjJy0ITzqa" +
                    "hWrN+Q95QjBR6FAUH7bl2x6UJef4uZQZaT0NNclV65mAdOptLoNyd9BN25pqz7Rb" +
                    "NIDI0Q9rTAjHLOtxHnVb746T27kER0MiiUiMGf6C1Q8=\n" +
                    "-----END CERTIFICATE-----";

                certificates.withName("Karma_Testing_Name");
                certificates.withDescription("Karma_Testing_Name description");
                certificates.withAdministrativeState("ACTIVE");
                certificates.withUsages(["CERT_SIGN"]);
                return certificates.create(file).then(function(response){
                    console.log(JSON.stringify(response));
                    assert.equal(response.statusCode, 201);
                    var data = response.location;
                    id = data.substring(data.lastIndexOf("/") + 1);
                    return;
            });
            });

            it('Delete a certificate', function() {
                return certificates.withId(id).delete().then(function(response){
                        console.log(JSON.stringify(response));
                        assert.equal(response.statusCode, 200);
                        return;
                    }
                );
            });
        });

        describe('Update:', function() {

            var certificates;
            before(function() {
                certificates = ogapi.certificatesBuilder();
            });

            it('Update a certificate', function() {
                certificates.withId("f0564b4f-4044-4028-a062-0b502a410108");
                certificates.withName("Root_Name");
                certificates.withDescription("updating_root_from_Karma_prueba");
                certificates.withAdministrativeState("ACTIVE");
                certificates.withUsages(["CERT_SIGN"]);
                certificates.withTags(["tag1", "tag2"]);
                certificates.withHardware([{
                    "hardwareId": "OpenGateSecure"
                }]);
                assert.doesNotThrow(function() {
                    certificates.update();
                });
            });
        });

        describe('Finder:', function() {
            var certificates;
            var certificate;
            var id = "n0t-3x15t5";
            before(function() {
                certificate = ogapi.newCertificateFinder();
                certificates = ogapi.certificatesBuilder();
            });
            var file = "-----BEGIN CERTIFICATE-----\n" +
                "MIIFXDCCA0SgAwIBAgIEV+4AwzANBgkqhkiG9w0BAQsFADBwMQswCQYDVQQGEwJF" +
                "UzEPMA0GA1UECAwGTWFkcmlkMQ8wDQYDVQQHDAZNYWRyaWQxEjAQBgNVBAoMCUFt" +
                "cGxpYSkpKTESMBAGA1UECwwJQW1wbGlhKSkpMRcwFQYDVQQDDA5wcm92LnRlc3Qu" +
                "cm9vdDAeFw0xNjA5MzAwNjA2NDFaFw0xNzA5MzAwNjA2NDFaMHAxCzAJBgNVBAYT" +
                "AkVTMQ8wDQYDVQQIDAZNYWRyaWQxDzANBgNVBAcMBk1hZHJpZDESMBAGA1UECgwJ" +
                "QW1wbGlhKSkpMRIwEAYDVQQLDAlBbXBsaWEpKSkxFzAVBgNVBAMMDnByb3YudGVz" +
                "dC5yb290MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAqBhgGrHTLmk0" +
                "F1Rq6qFkBHGF5ZNQ9Ira4v1jTJfMr5ppB/HplXqrjiamstJ1K4pcLoeLQOcMMWmk" +
                "GKF8EV1UTD+pqSXo6j0f8I6UGqGwNiHAYlL3CwWsQ0rZSSNQfW03myfpVo3yDLlR" +
                "BiFH+fVwjHnaNrRHlQ8vzHfYUqXpU04DinONhM2avaDQjfbS/2Pu4Qb9sMPF1SYb" +
                "eTx8fAmBg8u7jlbcZsQaPdvUPURhXK5q/5kN/8wxM8suKSc6iOQzzbrbVI8lr+ZT" +
                "Bcw2D2uRbQ9nCQAiQTJ7OENq5JLYM58sop7ZSRfRLKkb6GnLHTG9cio1Yro2cAGI" +
                "G8p+6paNRajmV9KOkGG0xTEBkYs7lhnxQp692QnMq/bNOjX9QW/xb+T+IrG0t9bK" +
                "h08Ll9A+HvWvePcOdZfiJbEdr+mWNUEArxcxnKgS9QruWtLpGh5UjYQcnf/XjnSR" +
                "EucDIB0mDPyJerVat1p7Mvu2tdnvxLCQmBIeyO0FpSaeOLENIZ68jEzZNGEFdPim" +
                "Sqb4vjRoV+5QQmHNIIb8rZswsFbBCK/yVnnJ4j3Kd0mmsQGDYeHAYOvjw7mT9AU4" +
                "qgB49q34FsLo3vale9ayPnHHWZ7OUIjlHgVSmAzjohI+0b6IgWF3bLgTCeVu1LKe" +
                "g0aCTiQeWEhdk/kJ7EVV8pbNVHGnbgsCAwEAATANBgkqhkiG9w0BAQsFAAOCAgEA" +
                "OCg0ek9bSeWg9zCpxIDGD+TI2VtnfeHkVgUMg13a8old9gsAIpb4X75m8jfBcF1P" +
                "LOmjCXVzr8Eun4LNpJs+pwnVTQPYbx1RPzKLXJzBCBAtX4FgQmRdYBp2J/THR/6N" +
                "mWh6ZCxhL9MZpwG1RIsxot65RacImLkqsVre37Ry4AHrLkkXfd1csaNEvAK+Dd2u" +
                "o+3mMYR3U62bn2nAAPHFbQ9yOIIjiJMmqcBei1dxfBdUcus2l+HacWqjeRu3PZoz" +
                "gNXWE7k7x+nUn/OqmR717F8BQqgQrtzV6R6juQmYfmghUJA1RUFBvVpm9ytRZry4" +
                "S/3iHdgm+k3N7oAYtEJANaokZk+CrDUUB7mjleHsmApNw6ZC0Zh1T7MrK73g37Ke" +
                "t7FsD1w06w//D5p/gD5dFJP6Zhcqb9EJSGFn6wfwagbNor0eA0QCpx8ZgUDb3n06" +
                "0zGBlyTFxG9QVmhoVQt6GQrUSypaYfuC+nVjQV4eAVZQVN9HgyTj77uj/wRBzY5S" +
                "EqX0xyjAj/cRDwKGgblr1XIlZD24MkxPX6uuOJENwrFEBg1I9jLeZgEjJy0ITzqa" +
                "hWrN+Q95QjBR6FAUH7bl2x6UJef4uZQZaT0NNclV65mAdOptLoNyd9BN25pqz7Rb" +
                "NIDI0Q9rTAjHLOtxHnVb746T27kER0MiiUiMGf6C1Q8=\n" +
                "-----END CERTIFICATE-----";

            it('Create a certificate', function() {
                certificates.withName("Karma_Testing_Name");
                certificates.withDescription("Karma_Testing_Name description");
                certificates.withAdministrativeState("ACTIVE");
                certificates.withUsages(["CERT_SIGN"]);
                return certificates.create(file).then(function(response){
                    console.log(JSON.stringify(response));
                    assert.equal(response.statusCode, 201);
                    var data = response.location;
                    id = data.substring(data.lastIndexOf("/") + 1);
                    return;
                });
            });

            it('Download a certificate', function() {
                return certificate.findByIdAndFormat(id, 'x-pem-file').then(function(response){
                    console.log(response);
                    var headers = response.data.headers;
                    var blob = new Blob([response.data.text],{type:headers['content-type']});
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "Filename";
                    link.click();

                   return;
                });
            });
        });
    });
});