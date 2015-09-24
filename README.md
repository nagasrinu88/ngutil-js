# ngutil-js
This is set of java script API's will be useful while developing any java script related app

This library has method to control the ajax execution flow.
some one can execute set of ajax calls synchronously or asynchronously, the below example will give you an idea how to use this API's
# Async Example
```javascript
NgUtil.async().
                    join(function (cb) { // adding first task
                        setTimeout(function () {
                            console.log("1 (async)");
                            cb();
                        }, 5000 * Math.random());
                    }).
                    join(function (cb) {// adding second task
                        setTimeout(function () {
                            console.log("2 (async)");
                            cb();
                        }, 5000 * Math.random());
                    }).
                    join(function (cb) {// adding third task
                        setTimeout(function () {
                            console.log("3 (async)");
                            cb();
                        }, 5000 * Math.random());
                    }).
                    perform().// finally performing the tasks
                    onComplete(function () { // on complete call back
                        console.log("Done (async)");
                    });
```

# Sync Example
``` javascript
NgUtil.sync().
                  join(function (cb) { // adding first task
                      setTimeout(function () {
                        console.log("1 (sync)");
                        cb();
                      }, 5000 * Math.random());
                    }).
                    join(function (cb) {// adding second task
                        setTimeout(function () {
                            console.log("2 (sync)");
                            cb();
                        }, 5000 * Math.random());
                    }).
                    join(function (cb) {// adding third task
                        setTimeout(function () {
                            console.log("3 (sync)");
                            cb();
                        }, 5000 * Math.random());
                    }).
                    perform().// finally performing the tasks
                    onComplete(function () { // on complete call back
                        console.log("Done (sync)");
                    });
```
