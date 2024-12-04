import ChoiceState from "../../src/asl-model/ChoiceState";
import PassState from "../../src/asl-model/PassState";
import ChoiceRule from "../../src/asl-model/ChoiceRule";
import {jsonataTag as j} from "../../src/asl-workflow";

test("Choice state with two branches", () => {
    const passState1 = new PassState("Pass1");
    const passState2 = new PassState("Pass2");

    const choiceState = new ChoiceState("MyChoice")
    choiceState.addChoiceRule(new ChoiceRule(j`$a < 5`, passState2.name))
    choiceState.next = passState1.name;

    expect(choiceState.toAsl()).toStrictEqual(
        JSON.parse(`
            {
                "Type": "Choice",
                "Choices": [
                    {
                        "Condition": "{% $a < 5 %}",
                        "Next": "Pass2"
                    }
                ],
                "Default": "Pass1"
            }
        `)
    )
})

test("Choice state with three branches, with Assign and Output fields", () => {
    const passState1 = new PassState("Pass1");
    const passState2 = new PassState("Pass2");
    const passState3 = new PassState("Pass3");

    const choiceRule1 = new ChoiceRule(j`$a < 5`, passState2.name)
    choiceRule1.assign = {"var": "choiceRule1"}
    choiceRule1.output = [1, 2, 3]

    const choiceRule2 = new ChoiceRule(j`$a > 10`, passState3.name)
    choiceRule2.assign = {"var": "choiceRule2"}
    choiceRule2.output = [4, 5, 6]

    const choiceState = new ChoiceState("MyChoice")
    choiceState.assign = {"var": "defaultChoice"}
    choiceState.output = [7, 8, 9]
    choiceState.addChoiceRule(choiceRule1)
    choiceState.addChoiceRule(choiceRule2)
    choiceState.next = passState1.name;

    expect(choiceState.toAsl()).toStrictEqual(
        JSON.parse(`
            {
                "Type": "Choice",
                "Choices": [
                    {
                        "Condition": "{% $a < 5 %}",
                        "Assign": {
                            "var": "choiceRule1"
                        },
                        "Output": [1, 2, 3],
                        "Next": "Pass2"
                    },
                    {
                        "Condition": "{% $a > 10 %}",
                        "Assign": {
                            "var": "choiceRule2"
                        },
                        "Output": [4, 5, 6],
                        "Next": "Pass3"
                    }
                ],
                "Assign": {
                    "var": "defaultChoice"
                },
                "Output": [7, 8, 9],
                "Default": "Pass1"
            }
        `)
    )
})

