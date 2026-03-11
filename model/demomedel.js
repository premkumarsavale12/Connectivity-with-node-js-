
import mongoose from "mongoose";
import demoshema from "../schema/demoschema.js";
 
const  demomedel = mongoose.model("demo", demoshema)


export default demomedel ;
