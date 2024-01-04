import mongoose from "mongoose";

const AsesorSchema = new mongoose.Schema({
    nombre:{
        type:String,
        // required:true,
        trim:true
    },
    apellidoP:{
        type:String,
        // required:true,
        trim:true
    },
    apellidoM:{
        type:String,
        // required:true,
        trim:true
    },
    email:{
        type:String,
        // required:true,
        trim:true,
        unique:true
    },
    ciudad:{
        type:String,
        // required:true,
        trim:true
    },
    password:{
        type:String,
        // required:true,
        trim:true
    }
},
    {
        timestamps:true
    }

);

export default mongoose.model('Asesores', AsesorSchema);