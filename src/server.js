require("babel-register")({
  presets: ["es2015", "react"],
});
var server = require('./server.jsx');
var port = process.env.PORT || 3000;

server.listen(port, function() {
    console.log('==> Server listened on port ', port);
});
