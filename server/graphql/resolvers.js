import Asesores from "../models/Asesores.js";
import Alumnos from '../models/Alumnos.js';
import Niveles from "../models/Niveles.js";
import Actividades from "../models/Actividades.js";
// import Avances from "../models/Avances.js";
import ActividadAvance from '../models/ActividadAvance.js';
import bcryptjs from 'bcryptjs';
import 'dotenv/config.js';
import jwt from 'jsonwebtoken';

const crearToken = (usuario, secreta, expiresIn)=>{
  //tomamos los datos del usuario para hacer la encriptación
  const {id, email, nombre, apellidoP,apellidoM} = usuario;
  
  return jwt.sign({id, nombre, apellidoP,apellidoM}, secreta, {expiresIn});
}

export const resolvers = {
  Query:{
      hello:()=>"Hello world",
      asesores:async ()=> {
          try {
              return await Asesores.find();    
          } catch (error) {
              throw new Error ('No existen asesores registrados');
          }            
      },
      obtenerAsesor:async (_,{},ctx)=> {
          try {
              return await Asesores.findById(ctx.id)
          } catch (error) {
              throw new Error('No existe el asesor');
          }    
      },
      alumnos:async (_,{},ctx)=> {
          try {
              console.log(ctx);
              return await Alumnos.find();    
          } catch (error) {
              throw new Error('No existen alumnos registrados');
          }
      },
      obtenerAlumno:async (_,{id},ctx)=> {
          try {
              return await Alumnos.findById(id)
          } catch (error) {
              throw new Error ('No existe el alumno');
          }            
      },
      obtenerAlumnoID:async (_,{},ctx)=>{
          try {
              const alumno = await Alumnos.findById(ctx.id);
              return alumno;
          } catch (error) {
              throw new Error('No existe el alumno');
          }
      },
      niveles:async ()=> {
          try {
              return await Niveles.find();    
          } catch (error) {
              throw new Error('No existen niveles registrados');
          }        
      },
      actividadAvance:async (_,{alumno}, ctx)=> {
          try {
              const actiAvance = await ActividadAvance.find({idAlumno:alumno});
              return actiAvance;    
          } catch (error) {
              throw new Error('No hay avances que mostrar');
          }
      },
      obtenerAlumnosAsesor:async (_,{},ctx)=>{
          try {
              const alumnos = await Alumnos.find({asesor:ctx.id.toString()});
              console.log(alumnos);
              return alumnos;
          } catch (error) {
              console.log(error) ;
          }
      },
      obtenerActividadAvanceID:async (_,{nomActividad,palabraGen,},ctx)=> {
          try {
              const actiAvanceAlumno = await ActividadAvance.findOne({idAlumno:ctx.id,nomActividad:nomActividad, palabraGen:palabraGen});
              return actiAvanceAlumno;    
          } catch (error) {
              throw new Error('No existe un avance para este alumno');
          }
      },
      obtenerUsuario:async(_,{token})=>{
          const usuarioID = await jwt.verify(token, process.env.PALABRA_SECRETA );
          console.log(usuarioID);

          return usuarioID;
      },
      obtenerNivel:async(_,{nivel})=>{
          const nivelActual = await Niveles.findOne ({nivel:nivel});
          return nivelActual;
      }
  },

  Mutation:{
    agregarAsesor:async (_, {input})=>{
      console.log(input);
      const {email, password} = input;
      //revisar si el usuario está registrado
      const existeAsesor = await Asesores.findOne({email});
      if (existeAsesor) {
          throw new Error('Este correo ya esta registrado');
      }

      //Contraseña
      const salt = await bcryptjs.genSaltSync(10);
      input.password = await bcryptjs.hashSync(password, salt);

      try {
          //Guardar en la base de datos
          const asesor= new Asesores(input);
          asesor.save();//guardar
          return asesor;
      } catch (error) {
          console.log(error);
      }
    },
    autenticarAsesor:async(_,{input},ctx)=>{
      const {email, password} = input;

      //Si el usuario existe
      const existeAsesor = await Asesores.findOne({email});
      if (!existeAsesor) {
          throw new Error('El usuario no existe');
      }

      //Contraseña incorrecta
      const passwordCorrecto = await bcryptjs.compare(password, existeAsesor.password);

      if (!passwordCorrecto) {
          throw new Error('La contraseña es incorrecta');
      }

      //Crear token
      return {
          token:crearToken(existeAsesor, process.env.PALABRA_SECRETA,'24h',),
      }
    },
    agregarAlumno:async(_,{input},ctx)=>{
      // console.log(input);
      //revisar si el alumno ya esta registrado
      const {nombre, apellidoP} = input;
      const existeAlumno = await Alumnos.findOne({nombre,apellidoP});
      
      if (existeAlumno) {
          throw new Error('Este alumno ya esta registrado');
      }
      const alumno = new Alumnos(input);
      
      //asignar el asesor
      console.log("agregarAlumno ",ctx);
      alumno.asesor = ctx.id;
                  

      try {
          const nuevoAlumno = await alumno.save();
          return nuevoAlumno;
      } catch (error) {
          console.log(error);
      }

    },
    autenticarAlumno:async(_,{input},ctx)=>{
      const {nombre, apellidoP,apellidoM} = input;

      //Si el usuario existe
      const existeAlumno = await Alumnos.findOne({nombre:nombre,apellidoP, apellidoP});
      if (!existeAlumno) {
          throw new Error('El usuario no existe');
      }

      //Crear token
      return {
          token:crearToken(existeAlumno, process.env.PALABRA_SECRETA,'24h'),
      }
    },
    actualizarAlumno:async (_,{id,input},ctx)=>{
      //Verificar si existe o no
      let alumno = await Alumnos.findById(id);
      if (!alumno) {
          throw new Error ('No existe el alumno');
      }
      //verificar si el asesor es quien edita
      if (alumno.asesor.toString() !== ctx.id) {
          throw new Error ('No tienes las credenciales');
      }
      //guardar el cliente
      alumno = await Alumnos.findOneAndUpdate({_id:id}, input,{new:true});
      return alumno;
    },
    eliminarAlumno:async (_,{id},ctx)=>{
      //Verificar si existe o no
      let alumno = await Alumnos.findById(id);

      if(!alumno){
          throw new Error ('Este alumno no existe');
      }

      //Verificar si es el asesor quien edita
      if(alumno.asesor.toString()!==ctx.id ){
          throw new Error ('No tienes las credenciales');
      }
      //eliminar el alumno
      await Alumnos.findOneAndDelete({_id:id});
      return 'Alumno Eliminado';
    },
    agregarNivel:async (_,{input})=> {
      console.log(input);
      const nivel = new Niveles(input);

      const nuevoNivel = nivel.save();
      return nuevoNivel;
    },
    agregarActividad:async (_,{input})=>{
      console.log(input);
      const actividad = new Actividades(input);


      const nuevaActividad = actividad.save();
      return nuevaActividad;
    },
    agregarActividadAvance:async(_,{input},ctx)=>{
      const {nomActividad,palabraGen} = input;
      //revisar si existe la actividad
      const datos = await ActividadAvance.findOne({idAlumno:ctx.id, nomActividad:nomActividad, palabraGen:palabraGen});
      if (!datos) {
          try {
            let nuevosDatos = {
                idAlumno:ctx.id,
                nomActividad:nomActividad,
                nombreAlumno:ctx.nombre,
                avance:1,
                palabraGen:palabraGen
              }
              const nuevoAvance = new ActividadAvance(nuevosDatos);
              await nuevoAvance.save();
              return nuevoAvance;
          } catch (error) {
              console.log(error);
          }
      }else{
        //   throw new Error ('Ya existe este avance')
        try {
            let numero = parseInt(datos.avance)
            datos.avance = `${(numero + 1)}` ;
            console.log();    
            return await datos.save();
          } catch (error) {
            throw new Error('No se pudo guardar la nueva informaciónn');
            console.log(error)
          }
      }       
    },
    actualizarActividadAvance:async(_,{input},ctx)=>{
      const {nomActividad, avance, palabraGen} = input;
      const act = await ActividadAvance.findOne({idAlumno:ctx.id, nomActividad:nomActividad, palabraGen:palabraGen});
      if (act) {
        try {
          let numUno,numDos;
          numUno = parseInt(avance);
          numDos= parseInt(act.avance)
          act.avance = numUno + numDos;
          console.log(act);    
          return await act.save();
        } catch (error) {
          throw new Error('No se pudo guardar la nueva informaciónn');
          console.log(error)
        }
      }      
    }
  },
  
}