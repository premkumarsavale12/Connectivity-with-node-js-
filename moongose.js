import mongoose from "mongoose";
import express from 'express'
import demomedel from "./model/demomedel.js";

const app = express();

await mongoose.connect("mongodb://localhost:27017/pratices").then(() => {
    console.log("--------connected--------");

})

app.use(express.json());

app.get("/", async (req, res) => {

    const demomodel = await demomedel.find();

    res.send(demomodel)

});

app.post("/save", async (req, res) => {

    console.log(req.body);

    const { FirstName, LastName } = req.body;

    if (!req.body || !FirstName || !LastName) {

        res.send({
            message: "Data not  Stored....",
            success: false,
            storedInfo: null
        })

    }

    const demodata = await demomedel.create(req.body)
    res.send({
        message: "Data Stored....",
        success: true,
        storedInfo: demodata
    })

});

app.put("/update/:id", async (req, res) => {

    const id = req.params.id;
    console.log(req.body, id);
    const demodata = await demomedel.findByIdAndUpdate(id, { ...req.body })

    const { FirstName, LastName } = req.body;

    if (!req.body || !FirstName || !LastName) {

        res.send({
            message: "Data not  updated ....",
            success: false,
            storedInfo: null
        })
    }
    res.send({

        message: "Data Updated ....",
        success: true,
        storedInfo: demodata

    })

})

app.delete("/delete/:id", async (req, res) => {

    const id = req.params.id;

    const demodata = await demomedel.findByIdAndDelete(id)

    const { FirstName, LastName } = req.body;

    if (!req.body || !FirstName || !LastName) {

        res.send({
            message: "Datad not  delete ....",
            success: false,
            storedInfo: null
        })
    }
    res.send({

        message: "Data delete ....",
        success: true,
        storedInfo: demodata

    })

})

app.listen(2300);
