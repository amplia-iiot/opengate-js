define(function() {
    mocha.setup('bdd');
    /** @test {InternalOpenGateAPI#bundlesBuilder()} */
    describe('Check funcionality bundles module:', function() {
        var bundle;
        before(function() {
            bundle = ogapi.bundlesBuilder();
        });
        /** @test {InternalOpenGateAPI#bundlesBuilder} */
        describe('Check basic parameters:', function() {

            it('Name is not a String', function() {
                assert.throws(function() {
                    ogapi.bundlesBuilder().withName(11);
                }, "Parameter name must be a string and has a maximum length of 255");

            });

            it('version is not a String', function() {
                assert.throws(function() {
                    ogapi.bundlesBuilder().withVersion(1);
                }, "Parameter version must be a string and has a maximum length of 50");

            });

            it('Hardware is not a String', function() {
                assert.throws(function() {
                    ogapi.bundlesBuilder().withHardware(1);
                }, "Parameter hardware must be a string");

            });

            it('workgroup is not a String', function() {
                assert.throws(function() {
                    ogapi.bundlesBuilder().withWorkgroup(1);
                }, "Parameter workgroup must be a string");

            });

            it('description is not a String', function() {
                assert.throws(function() {
                    ogapi.bundlesBuilder().withDescription(1);
                }, "Parameter description must be a string and has a maximum length of 250");

            });

            it('UserNotes is not a String', function() {
                assert.throws(function() {
                    ogapi.bundlesBuilder().withUserNotes(1);
                }, "Parameter notes must be a string and has a maximum length of 250");

            });

            it('POSTACTION is not an Array', function() {
                assert.throws(function() {
                    ogapi.bundlesBuilder().withPreaction("");
                }, "Parameter preaction must be typeof Array");

            });

            it('POSTACTION does not have at least one element', function() {
                assert.doesNotThrow(function() {
                    ogapi.bundlesBuilder().withPreaction([]);
                });

            });

            it('POSTACTION does not have correct Elements', function() {
                assert.throws(function() {
                    ogapi.bundlesBuilder().withPreaction(["dd"]);
                }, 'Any action into parameter preaction is not allowed. Parameter value <\'["dd"]\'>, preaction allowed <\'["HARDWARE_RESET","SOFTWARE_RESET","COMMS_DOWN","COMMS_UP","COMMS_RESET"]\'>');

            });

            it('POSTACTION have correct Elements', function() {
                assert.doesNotThrow(function() {
                    ogapi.bundlesBuilder().withPreaction(["HARDWARE_RESET", "SOFTWARE_RESET", "COMMS_DOWN", "COMMS_UP", "COMMS_RESET"]);
                });
            });


            it('Required parameters', function() {
                assert.throws(function() {
                    ogapi.bundlesBuilder().create();
                }, "Parameters name, version, hardware, workgroup  must be defined");
            });

            it('Check parameters type', function() {
                assert.throws(function() {
                    ogapi.bundlesBuilder().withName(222);
                }, "Parameter name must be a string");
            });
        });
        describe('Create a Bundle:', function() {

            before(function() {
                bundle.withName('bundle_testing').withVersion('V1').withWorkgroup('baseWorkGroup');
            });

            it('Check basic parameters', function() {
                assert.throws(function() {
                    bundle.create();
                }, "Parameters name, version, hardware, workgroup  must be defined");
            });

            it('Create a bundle without Hardware', function() {
                assert.throws(function() {
                    bundle.create();
                }, "Parameters name, version, hardware, workgroup  must be defined");
            });

            it('Create a bundle', function() {
                assert.doesNotThrow(function() {
                    bundle.withHardware("OWA21").create();
                });
            });
            it('Activate a bundle', function() {
                assert.doesNotThrow(function() {
                    bundle.activate();
                });
            });
            /*
             it('Delete a bundle', function() {
                assert.doesNotThrow(function() {
                    bundle.delete();
                });
                
            });*/
        });

        describe('Check Deployment Element:', function() {

            it('Check constructor Deployment Element', function() {
                assert.throws(function() {
                    ogapi.bundlesBuilder().addDeploymentElement();
                }, "Parameters name, version must be defined");
            });

            it('Deploy element', function() {
                assert.doesNotThrow(function() {
                    ogapi.bundlesBuilder().withName('bundle_testing').withVersion('V1').addDeploymentElement();
                });
            });
            describe('Check Deployment Element basic elements:', function() {
                var deploymentElement;
                before(function() {
                    deploymentElement = ogapi.bundlesBuilder().withName('bundle_testing').withVersion('V1').addDeploymentElement();
                });

                it('Check parameter name', function() {
                    assert.throws(function() {
                        deploymentElement.withName(111);
                    }, "Parameter name must be a string and has a maximum length of 50");
                });
                it('Check parameter version', function() {
                    assert.throws(function() {
                        deploymentElement.withVersion(111);
                    }, "Parameter version must be a string and has a maximum length of 50");
                });
                it('Check parameter Type', function() {
                    assert.throws(function() {
                        deploymentElement.withType(111);
                    }, "Parameter type must be typeof string");
                });
                it('Check parameter Type', function() {
                    assert.throws(function() {
                        deploymentElement.withType("Type");
                    }, 'Parameter type is not allowed. Parameter value <\'"Type"\'>, type allowed <\'["SOFTWARE","FIRMWARE","CONFIGURATION","PARAMETERS"]\'>');
                });
                it('Check parameter Path', function() {
                    assert.throws(function() {
                        deploymentElement.withPath(111);
                    }, "Parameter path must be a string");
                });
                it('Check parameter Order', function() {
                    assert.doesNotThrow(function() {
                        deploymentElement.withOrder(111);
                    });
                });
                it('Check parameter Operation', function() {
                    assert.throws(function() {
                        deploymentElement.withOperation(111);
                    }, "Parameter operation must be typeof string");
                });
                it('Check parameter Operation', function() {
                    assert.throws(function() {
                        deploymentElement.withOperation("OPERATION");
                    }, 'Parameter operation is not allowed. Parameter value <\'"OPERATION"\'>, operation allowed <\'["INSTALL","UNINSTALL","UPGRADE"]\'>');
                });
                it('Check parameter Option', function() {
                    assert.throws(function() {
                        deploymentElement.withOption(111);
                    }, "Parameter option must be typeof string");
                });
                it('Check parameter Option', function() {
                    assert.throws(function() {
                        deploymentElement.withOption("option");
                    }, 'Parameter option is not allowed. Parameter value <\'"option"\'>, option allowed <\'["MANDATORY","OPTIONAL"]\'>');
                });
                it('Check parameter Validator is an Array', function() {
                    assert.throws(function() {
                        deploymentElement.withValidators("");
                    }, 'Parameter validators must be typeof Array');
                });
                it('Check parameter Validator have at least one element', function() {
                    assert.doesNotThrow(function() {
                        deploymentElement.withValidators([]);
                    });
                });

                it('Check parameter type in validator is a string', function() {
                    var validators = [{
                        type: 1,
                        value: "",
                        mode: ""
                    }];

                    assert.throws(function() {
                        deploymentElement.withValidators(validators);
                    }, 'Parameter type must be typeof string');
                });
                it('Check parameter type in validator have a correct value', function() {

                    var validators = [{
                        type: "SHA-1"
                    }];

                    assert.doesNotThrow(function() {
                        deploymentElement.withValidators(validators);
                    });
                });
                it('Check parameter type in validator is typeof string', function() {

                    var validators = [{
                        type: "SHA-1",
                        value: 1
                    }];

                    assert.throws(function() {
                        deploymentElement.withValidators(validators);
                    }, 'Parameter value must be a string');
                });
                it('Check parameter mode in validator is typeof string', function() {

                    var validators = [{
                        type: "SHA-1",
                        value: "",
                        mode: 1
                    }];

                    assert.throws(function() {
                        deploymentElement.withValidators(validators);
                    }, 'Parameter mode must be a string');
                });

                it('Check parameter mode in validator is typeof string', function() {

                    var validators = [{
                        type: "SHA-1",
                        value: "",
                        mode: ""
                    }, {
                        type: "MD5",
                        value: "",
                        mode: 1
                    }];

                    assert.throws(function() {
                        deploymentElement.withValidators(validators);
                    }, 'Parameter mode must be a string');
                });

                it('Check parameter DownloadUrl', function() {
                    assert.throws(function() {
                        deploymentElement.withDownloadUrl(111);
                    }, "Parameter downloadUrl must be a string");
                });
                it('Check parameter FileName', function() {
                    assert.throws(function() {
                        deploymentElement.withFileName(111);
                    }, "Parameter fileName must be a string");
                });
            });
            describe('Check DeploymentElement basic elements:', function() {
                var deploymentElement;
                before(function() {
                    bundle = ogapi.bundlesBuilder();
                    bundle.withName('bundle_testing_2').withVersion('V1').withWorkgroup('baseWorkGroup').withHardware("OWA21");
                    try {
                        bundle.delete();
                    } catch (error) {

                    };
                    bundle.create();
                    deploymentElement = bundle.addDeploymentElement();
                });

                it('Define a deployment element', function() {
                    assert.throws(function() {
                        deploymentElement.withName(1);
                    }, "Parameter name must be a string");
                });
                it('Create a deployment element', function() {
                    assert.throws(function() {
                        deploymentElement.withVersion("bundles-file-example").create();
                    }, "Method not allowed - You must define the basic element [name, version, type, path, order and operation]");
                });
                it('Check urls:', function() {
                    assert.strictEqual(deploymentElement._url, 'provision/bundles/bundle_testing_2/versions/V1/deploymentElements');
                });

                it('Create a deployment element', function() {
                    var file = new Blob(["bundle ejemplo"], {
                        type: 'text/plain'
                    });
                    assert.doesNotThrow(function() {
                        deploymentElement.withName("file_1").withVersion("1").withType("SOFTWARE")
                            .withPath("/").withOrder("1").withOperation("INSTALL").withDownloadUrl("/")
                            .withValidators([{ "type": "SHA-1", "value": "123" }]).withOption("OPTIONAL").create(file);
                    });
                    bundle.activate();

                });
            });

        });


    });
});
