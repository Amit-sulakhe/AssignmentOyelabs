var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const { application } = require("express");
const req = require("express/lib/request");

var connectionString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/getemail", (request, response) => {
  mongoClient.connect(connectionString, (err, clientObj) => {
    if (!err) {
      var dbo = clientObj.db("adminCustomerdb");
      dbo
        .collection("emaildb")
        .find()
        .toArray((err, document) => {
          if (!err) {
            response.send(document);
          }
        });
    }
  });
});

app.post("/registeremail", (request, response) => {
  mongoClient.connect(connectionString, (err, clientObj) => {
    if (!err) {
      var dbo = clientObj.db("adminCustomerdb");
      var data = {
        email: request.body.email,
        name: request.body.name,
      };
      dbo.collection("emaildb").insertOne(data, (err, document) => {
        if (!err) {
          console.log(`Record inserted`);
          response.send({
            status: true,
            message: "email registerded succesfully",
          });
        }
      });
    }
  });
});

app.listen(3434);
console.log(`Server started:http://127.0.0.1:3434`);
