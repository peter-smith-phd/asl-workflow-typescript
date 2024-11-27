import {WorkflowBuilder, Workflow, jsonataTag as j} from "../src/asl-workflow";

function helper(w : Workflow): void {
    w.assign("a", 5);
}

test('basic workflow', () => {
    WorkflowBuilder.build(w => {
        w.assign("a", 1);
        w.assign('b', 5);
        w.if(j`$a = $b`).then(w => {
            w.fail("MyError", "bad stuff happened")
        }).else(w => {
            w.expr(j`$a`)
        })
        w.include(helper);
        w.fail("MyError", "bad stuff happened")
        w.assign("parallelResult", w.parallel('a', [
            w => w.include(helper),
            w => {
                w.return(5);
            },
        ]).retry("States.All", {
            intervalSeconds: 5
        }).retry("States.Timeout", {
            intervalSeconds: 5
        }).catch("States.All", w => {

        }).catch("States.Timeout", w => {

        }))
        w.if('$a = $b').then(w => {});
    })
})