import mongoose from "mongoose";

const ActividadAvancesSchema = new mongoose.Schema({
    idAlumno:{
        type:mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:'Alumnos'
    },
    nombreAlumno:{
        type:String,
        trim:true
    },
    numActividad:{
        type:String,
    },
    nivel:{
        type:String,
    },
    avance:{
        type:String,
    },

},
    {
        timestamps:true   
    }
);

export default mongoose.model('ActividadAvance', ActividadAvancesSchema);