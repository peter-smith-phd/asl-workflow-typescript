import {WorkflowBuilder} from "../../src/builders/WorkflowBuilder";
import {jsonataTag as j} from "../../src/builders/jsonataTag";

test('if statement with only true case', () => {
    const asl = WorkflowBuilder.build(w => {
        w.assign("a", 5)
        w.if(j`$a > 5`).then(w => {
            w.assign("a", 1)
        })
        w.assign("b", 2)
    }, {optimize: 'Off'})

    expect(asl).toStrictEqual(
        {
            "Version": "1.0",
            "QueryLanguage": "JSONata",
            "StartAt": "State0001",
            "States": {
                "State0001": {
                    "Type": "Pass",
                    "Assign": {
                        "a": 5
                    },
                    "Next": "State0004"
                },
                "State0004": {
                    "Type": "Choice",
                    "Choices": [
                        {
                            "Condition": "{% $not($a > 5) %}",
                            "Next": "State0002"
                        }
                    ],
                    "Default": "State0005"
                },
                "State0005": {
                    "Type": "Pass",
                    "Assign": {
                        "a": 1
                    },
                    "Next": "State0002"
                },
                "State0002": {
                    "Type": "Pass",
                    "Assign": {
                        "b": 2
                    },
                    "End": true
                }
            }
        }
    )
})

test('if statement with empty true case', () => {
    const asl = WorkflowBuilder.build(w => {
        w.assign("a", 5)
        w.if(j`$a > 5`).then(_w => {
            // empty - will default to `null` value
        })
        w.assign("b", 2)
    }, {optimize: 'Off'})

    expect(asl).toStrictEqual(
        {
            "Version": "1.0",
            "QueryLanguage": "JSONata",
            "StartAt": "State0001",
            "States": {
                "State0001": {
                    "Type": "Pass",
                    "Assign": {
                        "a": 5
                    },
                    "Next": "State0004"
                },
                "State0004": {
                    "Type": "Choice",
                    "Choices": [
                        {
                            "Condition": "{% $not($a > 5) %}",
                            "Next": "State0002"
                        }
                    ],
                    "Default": "State0005"
                },
                "State0005": {
                    "Type": "Pass",
                    "Output": "{% null %}",
                    "Next": "State0002",
                },
                "State0002": {
                    "Type": "Pass",
                    "Assign": {
                        "b": 2
                    },
                    "End": true
                }
            }
        }
    )
})

test('if statement with both true and false cases', () => {
    const asl = WorkflowBuilder.build(w => {
        w.assign("a", 5)
        w.if(j`$a > 5`).then(w => {
            w.assign("a", 10)
        }).else(w => {
            w.assign("a", 20)
        })
        w.assign("b", 2)
    }, {optimize: 'Off'})

    expect(asl).toStrictEqual(
        {
            "Version": "1.0",
            "QueryLanguage": "JSONata",
            "StartAt": "State0001",
            "States": {
                "State0001": {
                    "Type": "Pass",
                    "Assign": {
                        "a": 5
                    },
                    "Next": "State0004"
                },
                "State0004": {
                    "Type": "Choice",
                    "Choices": [
                        {
                            "Condition": "{% $not($a > 5) %}",
                            "Next": "State0002"
                        }
                    ],
                    "Default": "State0005"
                },
                "State0005": {
                    "Type": "Pass",
                    "Assign": {
                        "a": 10
                    },
                    "Next": "State0003"
                },
                "State0002": {
                    "Type": "Pass",
                    "Assign": {
                        "a": 20
                    },
                    "Next": "State0003"
                },
                "State0003": {
                    "Type": "Pass",
                    "Assign": {
                        "b": 2
                    },
                    "End": true
                }
            }
        })
})

test('if statement with non-empty true case and empty false case', () => {
    const asl = WorkflowBuilder.build(w => {
        w.assign("a", 5)
        w.if(j`$a > 5`).then(w => {
            w.assign("a", 10)
        }).else(_w => {
            // empty - default to null return
        })
        w.assign("b", 2)
    }, {optimize: 'Off'})

    expect(asl).toStrictEqual(
        {
            "Version": "1.0",
            "QueryLanguage": "JSONata",
            "StartAt": "State0001",
            "States": {
                "State0001": {
                    "Type": "Pass",
                    "Assign": {
                        "a": 5
                    },
                    "Next": "State0004"
                },
                "State0004": {
                    "Type": "Choice",
                    "Choices": [
                        {
                            "Condition": "{% $not($a > 5) %}",
                            "Next": "State0002"
                        }
                    ],
                    "Default": "State0005"
                },
                "State0005": {
                    "Type": "Pass",
                    "Assign": {
                        "a": 10
                    },
                    "Next": "State0003"
                },
                "State0002": {
                    "Type": "Pass",
                    "Output": "{% null %}",
                    "Next": "State0003"
                },
                "State0003": {
                    "Type": "Pass",
                    "Assign": {
                        "b": 2
                    },
                    "End": true
                }
            }
        }
    )
})

test('if statement with empty true case and non-empty false case', () => {
    const asl = WorkflowBuilder.build(w => {
        w.assign("a", 5)
        w.if(j`$a > 5`).then(_w => {
            // empty - default to null return
        }).else(w => {
            w.assign("a", 20)
        })
        w.assign("b", 2)
    }, {optimize: 'Off'})

    expect(asl).toStrictEqual(
        {
            "Version": "1.0",
            "QueryLanguage": "JSONata",
            "StartAt": "State0001",
            "States": {
                "State0001": {
                    "Type": "Pass",
                    "Assign": {
                        "a": 5
                    },
                    "Next": "State0004"
                },
                "State0004": {
                    "Type": "Choice",
                    "Choices": [
                        {
                            "Condition": "{% $not($a > 5) %}",
                            "Next": "State0002"
                        }
                    ],
                    "Default": "State0005"
                },
                "State0005": {
                    "Type": "Pass",
                    "Output": "{% null %}",
                    "Next": "State0003"
                },
                "State0002": {
                    "Type": "Pass",
                    "Assign": {
                        "a": 20
                    },
                    "Next": "State0003"
                },
                "State0003": {
                    "Type": "Pass",
                    "Assign": {
                        "b": 2
                    },
                    "End": true
                }
            }
        }
    )
})

test('if statement with empty true case and empty false case', () => {
    const asl = WorkflowBuilder.build(w => {
        w.assign("a", 5)
        w.if(j`$a > 5`).then(_w => {
            // empty - default to null return
        }).else(_w => {
            // empty - default to null return
        })
        w.assign("b", 2)
    }, {optimize: 'Off'})

    expect(asl).toStrictEqual(
        {
            "Version": "1.0",
            "QueryLanguage": "JSONata",
            "StartAt": "State0001",
            "States": {
                "State0001": {
                    "Type": "Pass",
                    "Assign": {
                        "a": 5
                    },
                    "Next": "State0004"
                },
                "State0004": {
                    "Type": "Choice",
                    "Choices": [
                        {
                            "Condition": "{% $not($a > 5) %}",
                            "Next": "State0002"
                        }
                    ],
                    "Default": "State0005"
                },
                "State0005": {
                    "Type": "Pass",
                    "Output": "{% null %}",
                    "Next": "State0003"
                },
                "State0002": {
                    "Type": "Pass",
                    "Output": "{% null %}",
                    "Next": "State0003"
                },
                "State0003": {
                    "Type": "Pass",
                    "Assign": {
                        "b": 2
                    },
                    "End": true
                }
            }
        }
    )
})

test('if statement with true case, but nothing following', () => {
    const asl = WorkflowBuilder.build(w => {
        w.assign("a", 5)
        w.if(j`$a > 5`).then(_w => {
            // empty
        })
    }, {optimize: 'Off'})

    expect(asl).toStrictEqual(
        {
            "Version": "1.0",
            "QueryLanguage": "JSONata",
            "StartAt": "State0001",
            "States": {
                "State0001": {
                    "Type": "Pass",
                    "Assign": {
                        "a": 5
                    },
                    "Next": "State0004"
                },
                "State0004": {
                    "Type": "Choice",
                    "Choices": [
                        {
                            "Condition": "{% $not($a > 5) %}",
                            "Next": "State0002"
                        }
                    ],
                    "Default": "State0005"
                },
                "State0005": {
                    "Type": "Pass",
                    "Output": "{% null %}",
                    "Next": "State0002"
                },
                "State0002": {
                    "Type": "Pass",
                    "End": true
                }
            }
        }
    )
})

test('if statement with true and false case, but nothing following', () => {
    const asl = WorkflowBuilder.build(w => {
        w.assign("a", 5)
        w.if(j`$a > 5`).then(w => {
            w.assign("a", 10)
        }).else(w => {
            w.assign("a", 20)
        })
    }, {optimize: 'Off'})

    expect(asl).toStrictEqual(
        {
            "Version": "1.0",
            "QueryLanguage": "JSONata",
            "StartAt": "State0001",
            "States": {
                "State0001": {
                    "Type": "Pass",
                    "Assign": {
                        "a": 5
                    },
                    "Next": "State0004"
                },
                "State0004": {
                    "Type": "Choice",
                    "Choices": [
                        {
                            "Condition": "{% $not($a > 5) %}",
                            "Next": "State0002"
                        }
                    ],
                    "Default": "State0005"
                },
                "State0005": {
                    "Type": "Pass",
                    "Assign": {
                        "a": 10
                    },
                    "Next": "State0003"
                },
                "State0002": {
                    "Type": "Pass",
                    "Assign": {
                        "a": 20
                    },
                    "Next": "State0003"
                },
                "State0003": {
                    "Type": "Pass",
                    "End": true
                }
            }
        }
    )
})

test('if statement that returns a value for the whole workflow', () => {
    const asl = WorkflowBuilder.build(w => {
        w.assign("a", 5)
        w.if(j`$a > 5`).then(w => {
            w.expr("true case")
        }).else(w => {
            w.expr("false case")
        })
    }, {optimize: 'Off'})

    expect(asl).toStrictEqual(
        {
            "Version": "1.0",
            "QueryLanguage": "JSONata",
            "StartAt": "State0001",
            "States": {
                "State0001": {
                    "Type": "Pass",
                    "Assign": {
                        "a": 5
                    },
                    "Next": "State0004"
                },
                "State0004": {
                    "Type": "Choice",
                    "Choices": [
                        {
                            "Condition": "{% $not($a > 5) %}",
                            "Next": "State0002"
                        }
                    ],
                    "Default": "State0005"
                },
                "State0005": {
                    "Type": "Pass",
                    "Output": "true case",
                    "Next": "State0003"
                },
                "State0002": {
                    "Type": "Pass",
                    "Output": "false case",
                    "Next": "State0003"
                },
                "State0003": {
                    "Type": "Pass",
                    "End": true
                }
            }
        }
    )
})
