import mongoose from "mongoose";
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import  jwt from 'jsonwebtoken';
import cors from 'cors';
import 'dotenv/config';
import {expressMiddleware} from '@apollo/server/express4';
import {typeDefs} from '../server/graphql/typeDefs.js';
import {resolvers} from '../server/graphql/resolvers.js';
import http from 'http';

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect('mongodb+srv://Dan0207:admin@cluster0.u7lbfjt.mongodb.net/ApprendeV2');
        console.log(`Mongodb conneted ${conn.connection.name}`)    
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
    
}

async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const httpServer = http.createServer(app);

    app.get('/',(req,res)=>res.send('Bienvenido')); 

    const server = new ApolloServer({
        typeDefs,
        resolvers, 
        

    });
    await server.start();
    app.use('/graphql',cors(),express.json(), expressMiddleware(server));

    await new Promise(resolve =>httpServer.listen({port:4001},resolve));
    console.log('Servidor listo en el puerto 4001');
    // const {url} = await startStandaloneServer(server,{
    //     listen:{port:4000},
    //     context:({req})=>{
    //         // console.log(req.headers['authorization']);
    //         const token= req.headers['authorization'] || '';
    //         try {
    //             const usuario = jwt.verify(token, process.env.PALABRA_SECRETA );
    //             console.log('usuario ctx ',usuario);
    //             return usuario;
    //         } catch (error) {
    //             console.log('Hubo un error');
    //             console.log(error);
    //         }
            
    //     }

    // });
    // console.log(`🚀  Server ready at: ${url}`);
}
connectDB();
startApolloServer(typeDefs, resolvers)