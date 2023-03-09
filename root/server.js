const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");
const nunjucks = require("nunjucks");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("connect-flash");

const Sys = new require("../root/sys");
const env = require("../configs/env");
Sys.App = express();
Sys.App.use(cors());
Sys.App.use(bodyParser.json());
Sys.App.use(bodyParser.urlencoded({ extended: true }));

Sys.App.set("trust proxy", 1);
var fileStoreOptions = {};
Sys.App.use(
  session({
  //  store: new FileStore(fileStoreOptions),
    secret: "Ais_technolabs_Products",
    resave: false,
    saveUninitialized: false,
  })
);
Sys.App.use(flash());
console.log("session", session);

Sys.App.use(express.static("./public"));
nunjucks.configure("./app/views", {
  autoescape: true,
  express: Sys.App,
  watch: false,
});
Sys.App.set("view engine", "html");

Sys.App.use("/node_modules", express.static("./node_modules"));

Sys.Server = http.createServer(Sys.App);

Sys.App.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

console.log("Initializing Server...");

//setting up config files
Sys.Config = new Array();
console.log("Loading Config files...");
fs.readdirSync(path.join(__dirname, "../configs"))
  .filter((file) => ~file.search(/^[^\.].*\.js$/))
  .forEach(function (file) {
    Sys.Config[file.split(".")[0]] = require(path.join(
      path.join(__dirname, "../configs"),
      file
    ));
  });
console.log("Sys.Config", Sys.Config);

//setting up app folder
console.log("Loading app folder...");
let insidePath = null;
// console.log(path.join(__dirname,"../app"))
// console.log(path.join(__dirname,'../',"./app"))
fs.readdirSync(path.join(__dirname, "../", "./app"))
  .filter(function (file) {
    return file.indexOf(".") !== 0 && file.indexOf(".") === -1;
  })
  .forEach(function (dir) {
    if (dir != "views") {
      // Ignore Load Views & Routes in Sys Object
      Sys.App[dir] = {};
      console.log("Loading..." + dir);
      fs.readdirSync(path.join(__dirname, "../", "./app", dir))
        .filter(function (file) {
          return file.indexOf(".") !== 0;
        })
        .forEach(function (subDir) {
          insidePath = dir + "/" + subDir;
          if (fs.existsSync(path.join(__dirname, "../", "./app", insidePath))) {
            if (
              fs
                .lstatSync(path.join(__dirname, "../", "./app", insidePath))
                .isFile()
            ) {
              Sys.App[dir][subDir.split(".")[0]] = require(path.join(
                __dirname,
                "../",
                "./app",
                dir,
                subDir
              )); // Add File in Sub Folder Object
            } else {
              Sys.App[dir][subDir] = {};
              fs.readdirSync(path.join(__dirname, "../", "./app", insidePath))
                .filter(function (file) {
                  return file.indexOf(".") !== 0;
                })
                .forEach(function (subInnerDir) {
                  insidePath = dir + "/" + subDir + "/" + subInnerDir;
                  Sys.App[dir][subDir][
                    subInnerDir.split(".")[0]
                  ] = require(path.join(
                    __dirname,
                    "../",
                    "./app",
                    dir + "/" + subDir,
                    subInnerDir
                  )); // Add File in Sub Folder Object
                });
            }
          }
        });
    }
  });
// Load Router
console.log("Loading... Router");
fs.readdirSync(path.join(__dirname, "../routes"))
  .filter((file) => ~file.search(/^[^\.].*\.js$/))
  .forEach(function (file) {
    Sys.App.use(
      "/",
      require(path.join(path.join(__dirname, "../routes"), file))
    ); // Register Router to app.use
  });

let dbURI = "";

if (Sys.Config.database.connectionType == "local") {
  dbURI =
    "mongodb://" +
    Sys.Config.database[Sys.Config.database.connectionType].mongo.host +
    ":" +
    +Sys.Config.database[Sys.Config.database.connectionType].mongo.port +
    "/" +
    Sys.Config.database[Sys.Config.database.connectionType].mongo.database;
} else {
  dbURI =
    "mongodb://" +
    Sys.Config.database[Sys.Config.database.connectionType].mongo.user +
    ":" +
    Sys.Config.database[Sys.Config.database.connectionType].mongo.password +
    "@" +
    Sys.Config.database[Sys.Config.database.connectionType].mongo.host +
    ":" +
    Sys.Config.database[Sys.Config.database.connectionType].mongo.port +
    "/" +
    Sys.Config.database[Sys.Config.database.connectionType].mongo.database;
}

mongoose.set("strictQuery", true);
mongoose.connect(dbURI, Sys.Config.database.option);
mongoose.connection.on("connected", async function () {
  try {
    console.log("Database connection established :: ", dbURI);
    Sys.Server.listen(env.port, function () {
      console.log(
        "(---------------------------------------------------------------)"
      );
      console.log(
        " |                    Server Started...                        |"
      );
      console.log(
        " |                  http://" +
          Sys.Config.database[Sys.Config.database.connectionType].mongo.host +
          ":" +
          env.port +
          "                      |"
      );
      console.log(
        "(---------------------------------------------------------------)"
      );
    });
  } catch (error) {}
});

//when the connection throws error
mongoose.connection.on("error", async function () {
  console.log("Mongoose default connection error: " + err);
});

//when the connection is disconnected
mongoose.connection.on("disconnected", async function () {
  console.log("Mongoose default connection disconnected");
});

//if the node process ends, close the mongoose connection
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

// module.exports = { app: Sys.App, server: Sys.Server };
module.exports = { App: Sys.App, Server: Sys.Server };
