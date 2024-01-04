import mongoose from "mongoose";

const AvancesSchema = new mongoose.Schema({
    idAlumno:{
        type:mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:'Alumnos'
    },
    nombreAlumno:{
        type:String,
        // required:true,
        trim:true
    },
    progreso:{
        type:[]
    }
},
    {
        timestamps:true
    }

);

export default mongoose.model('Avances',AvancesSchema);