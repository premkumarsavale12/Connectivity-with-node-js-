
import mongoose from "mongoose";

const  demoshema = mongoose.Schema({
    FirstName: String,
    LastName: String

}, { collection: "demo" });
 
 export default demoshema;
  