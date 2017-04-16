var mongoose = require( "mongoose" );

var dbURI = "mongodb://localhost/loc8r";
mongoose.connect(dbURI);

mongoose.connection.on("connected", function(){
console.log("Mongoose connected to " + dbURI);
});

mongoose.connection.on("error", function(err){
console.log("Mongoose connected error: " + err);
});

mongoose.connection.on("disconnected", function(){
console.log("Mongoose disconnected" );
});

var graceFulShutdown = function (msg, callback) {
mongoose.connection.close( function(){
console.log("Mongoose disconnected through" + msg);
callback();
  });
};

process.once("SIGUSR2", function (){
graceFulShutdown("nodemon restart", function () {
  process.kill(process.pid, "SIGUSR2");
  });
});


process.on("SIGINT", function (){
graceFulShutdown("app terminatiob", function () {
  process.exit(0);
  });
});

process.on("SIGTERM", function (){
graceFulShutdown("Heroku app shutdown", function () {
  process.exist(0);
  });
});

require("./locations");
