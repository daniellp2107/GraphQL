import mongoose from "mongoose";

const ActividadSchema = new mongoose.Schema({
    nombre:{
        type:String,
        // required:true,
        trim:true
    },
    descripcion:{
        type:String,
        // required:true,
        trim:true
    },
    numActividad:{
        type:String,
        // required:true,
        trim:true
    }

},
    {timestamps:true}
);

export default mongoose.model('Actividades',ActividadSchema);