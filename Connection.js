import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();

const dbName = "pratices";
const url = "mongodb://localhost:27017";

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const client = new MongoClient(url);

client.connect().then((connection) => {

    console.log("Database Connected");

    app.get("/api", async (req, res) => {

        const db = connection.db(dbName);
        const collection = db.collection("demo");

        const items = await collection.find().toArray();

        res.send(items);
    });

    app.get("/ui", async (req, res) => {

        const db = connection.db(dbName);
        const collection = db.collection("demo");

        const data = await collection.find().toArray();

        res.render("students", { data });

    });

    app.get("/add", (req, res) => {


        res.render("add-student")
    });

    app.post("/add-student-api", async (req, res) => {

        if (!name || !age || !email) {
            res.send({ message: "operation failed", success: false })
            return false
        }
        const db = connection.db(dbName);
        const collection = db.collection("demo");

        const result = await collection.insertOne(req.body);

        res.redirect("ui");
        res.send({
            message: "data stored",
            success: true,
            result: result
        });
    });

    app.delete("/delete/:id", async (req, res) => {
        console.log(req.params.id);
        const db = connection.db(dbName);
        const collection = db.collection("demo")
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) })
        if (result) {
            res.send({
                message: "student data deleted",
                success: true
            })
        } else {
            res.send({
                message: "student data not deleted, try after sometime",
                success: false
            })
        }
    })

    app.get("/ui/delete/:id", async (req, resp) => {

        console.log(req.params.id);
        const db = connection.db(dbName);

        const collection = db.collection("demo")

        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) })

        if (result) {

            resp.send("<h1>Student record deleted<h1>")

        } else {

            resp.send("<h1>Student record  not deleted<h1>")
        }
    })


}).catch((err) => {
    console.log("Database connection error:", err);
});

app.listen(4200, () => {
    console.log("Server running on port 4200");
});