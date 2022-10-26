const newman = require('newman');
const config = require('./config.json')

const async = require('async')

newmanRunner = function (done) 
{
    newman.run({
        collection: config.baseDir + folder + collection,
        environment: config.baseDir + folder+ environment,
        reporters,
        reporter: {
            "json": {
                "export": "./results/"+folder+collection
            }
        }
    }, function (err) {
        if (err) { throw err; }
        console.log('Collection run complete!');
    });
}

let commands = []
   
config.runs.forEach(run => {
   commands.push(newmanRunner(run.folderName, run.setup, run.environment, ["json"]);
    commands.push(newmanRunner(run.folderName, run.cache, run.environment,[]));
    commands.push(newmanRunner(run.folderName, run.txn, run.environment,["json", "json-summary"]));
});

async.parallel(
    commands,
    (err, results) => {
        err && console.error(err);

        results.forEach(function (result) {
            var failures = result.run.failures;
            console.info(failures.length ? JSON.stringify(failures.failures, null, 2) :
                `${result.collection.name} ran successfully.`);
        });
    });
