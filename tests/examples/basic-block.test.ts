import {WorkflowBuilder, jsonataTag as j} from "../../src/asl-workflow";

test('basic sequence of assigns and expr', () => {
    const asl = WorkflowBuilder.build(w => {
        w.assign("a", 1);
        w.assign("b", 5);
        w.expr(j`$a + $b`)
    }, { optimize: 'Off' })

    expect(asl).toStrictEqual(
        JSON.parse(`
        {
            "Version": "1.0",
            "QueryLanguage": "JSONata",
            "StartAt": "State0001",
            "States": {
                "State0001": {
                    "Type": "Pass",
                    "Assign": {
                        "a": 1
                    },
                    "Next": "State0002"
                },
                "State0002": {
                    "Type": "Pass",
                    "Assign": {
                        "b": 5
                    },
                    "Next": "State0003"
                },
                "State0003": {
                    "Type": "Pass",
                    "Output": "{% $a + $b %}",
                    "End": true
                }
            }
        }`)
    )
})

// TODO: error checks for var name
// TODO: error checks for input type
// TODO: validate JSONata.
// TODO: return must be at the end of a block (top-level or include)
// TODO: expr must be at the end of a block