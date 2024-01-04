import mongoose from "mongoose";

const AlumnoSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
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
    edad:{
        type:String,
        // required:true,
        trim:true,
    },
    telefono:{
        type:String,
        // required:true,
        trim:true,
        // unique:true
    },
    asesor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Asesores'
    },
},
    {
        timestamps:true
    }

);

export default mongoose.model('Alumnos',AlumnoSchema);