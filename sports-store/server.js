var connect = require('connect');
connect.createServer(
    connect.static("./angularjs")
).listen(5000);
console.log("Server listening on port 5000...");