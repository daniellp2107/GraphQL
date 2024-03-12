import {gql} from 'graphql-tag';

export const typeDefs = gql`
    type Query {
        hello:String
        asesores:[Asesor]
        alumnos:[Alumno]
        niveles:[Nivel]
        actividadAvance(alumno:ID):[ActividadAvance]
        obtenerAlumno(id:ID):Alumno
        obtenerAlumnoID:Alumno
        obtenerAsesor(id:ID):Asesor
        obtenerActividadAvanceID(nomActividad:String,palabraGen:String):ActividadAvance
        obtenerUsuario(token:String):Alumno
        obtenerAlumnosAsesor:[Alumno]
        obtenerNivel(nivel:String):Nivel
        
    }
    type Mutation{
        agregarAsesor(input:AsesorInput):Asesor
        autenticarAsesor(input:AuthAsesorInput):Token
        agregarAlumno(input:AlumnoInput):Alumno
        autenticarAlumno(input:AuthAlumnoInput):Token
        actualizarAlumno(id:ID!, input:AlumnoInput):Alumno
        eliminarAlumno(id:ID):String
        agregarNivel(input:NivelesInput):Nivel
        agregarActividad(input:ActividadInput):Actividad      
        agregarActividadAvance(input:ActividadAvanceInput):ActividadAvance  
        actualizarActividadAvance(input:actualizarActividadAvanceInput):ActividadAvance
    }

    type Alumno {
        _id:ID
        id:ID
        nombre:String!
        apellidoP:String
        apellidoM:String
        edad:String
        telefono:String
        asesor: ID!
        
    }

    input AlumnoInput{
        nombre:String
        apellidoP:String
        apellidoM:String
        edad:String
        telefono:String
        # asesor: ID!
    }

    type Asesor{
        _id:ID
        id:ID
        nombre:String
        apellidoP:String
        apellidoM:String
        email:String
        ciudad:String
        password:String
    }

    input AsesorInput{
        nombre:String
        apellidoP:String
        apellidoM:String
        email:String
        ciudad:String
        password:String
    }

    type Nivel{
        _id:ID
        id:ID
        nivel:String
        palabraGen:String
        palabrasClave:String
        nombresClave:String
        createdAt:String
        letra:String
        silabas:String
    }

    input NivelesInput{
        nivel:String
        palabraGen:String
        palabrasClave:String
        nombresClave:String
        letra:String
        silabas:String
    }

    type Actividad{
        _id:ID
        id:ID
        nombre:String
        descripcion:String
        numActividad:String
    }

    input ActividadInput{
        nombre:String
        descripcion:String
        numActividad:String
        
    }

    type ActividadAvance{
        # _id:ID
        id:ID
        idAlumno:ID
        nombreAlumno:String
        nomActividad:String
        avance:String
        palabraGen:String
        createdAt:String
    }

    input ActividadAvanceInput{
        nomActividad:String
        avance:String
        palabraGen:String
    }

    input actualizarActividadAvanceInput{
        nomActividad:String
        avance:String
        palabraGen:String
    }

    type Token{
        token:String
    }


    input AuthAsesorInput{
        email:String
        password:String
    }

    input AuthAlumnoInput{
        nombre:String
        apellidoP:String
    }

    

    enum NumAct{
        actUno
        actDos
        actTres
        actCuatro
        actCinco
        actSeis
        actSiete
        actOcho
    }

    
`;