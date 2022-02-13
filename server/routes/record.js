const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/constructions").get(function (req, res) {
    let db_connect = dbo.getDb("construction");
    db_connect
        .collection("constructions")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// Get all of the parts
recordRoutes.route("/parts").get(function (req, res) {
    let db_connect = dbo.getDb("Parts");
    db_connect
        .collection("Parts")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a single record by id
recordRoutes.route("/construction/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let qry = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("construction")
        .findOne(qry, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
recordRoutes.route("/construction/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let construction = {
        construction_name: req.body.name.name,
        part_a: req.body.part_a,
        part_b: req.body.part_b,
        part_c: req.body.part_c,
        total_count: req.body.total_count,
        volume: req.body.volume,
    };
    db_connect.collection("construction").insertOne(construction, function (err, res) {
        console.log(req.body);
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you update a record by id.
recordRoutes.route("/construction/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let qry = { _id: ObjectId(req.params.id) };
    let newValues = {
        $set: {
            part_a: req.body.part_a,
            part_b: req.body.part_b,
            part_c: req.body.part_c,
            total_count: req.body.total_count,
        },
    };
    db_connect
        .collection("construction")
        .updateOne(qry, newValues, function (err, res) {
            if (err) throw err;
            console.log("construction updated", req.params.id);
            response.json(res);
        });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("records").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.status(obj);
    });
});

module.exports = recordRoutes;