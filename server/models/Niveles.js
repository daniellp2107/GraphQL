import mongoose from "mongoose";

const NivelesSchema = new mongoose.Schema({
    nivel:{
        type:String,
        // required:true,
        trim:true,
    },
    palabraGen:{
        type:String,
        // required:true,
        trim:true,
    },
    palabrasClave:{
        type:String,
        // required:true,
        trim:true,
    },
    nombresClave:{
        type:String,
        // required:true,
        trim:true,
    },
    letra:{
        type:String,
        //required:true,
        trim:true
    },
    silabas:{
        type:String,
        //required:true,
        trim:true
    }
},
{
    timestamps:true
}
);

export default mongoose.model('Niveles', NivelesSchema);