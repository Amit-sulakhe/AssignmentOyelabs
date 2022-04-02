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

app.get("/getcustomers", (request, response) => {
  mongoClient.connect(connectionString, (err, clientObj) => {
    if (!err) {
      var dbo = clientObj.db("adminCustomerdb");
      dbo
        .collection("customerdeta")
        .find()
        .toArray((err, document) => {
          if (!err) {
            response.send(document);
          }
        });
    }
  });
});

app.post("/registercustomer", (request, response) => {
    mongoClient.connect(connectionString, (err, clientObj) => {
      if (!err) {
        var dbo = clientObj.db("adminCustomerdb");
        var data = {
          Mobile: request.body.Mobile,
          Password: request.body.Password,
        };
        dbo.collection("customerdeta").insertOne(data, (err, result) => {
          if (!err) {
            console.log(`Record inserted`);
            // response.send(result)
            response.send({
              status: true,
              message: "Customer registerd Succesfully",
            });
          }else{
              
          }
        });
      }
    });
  });

app.listen(3300);
console.log(`Server started:http://127.0.0.1:3300`);
