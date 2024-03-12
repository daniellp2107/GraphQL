// import express from 'express';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import  jwt from 'jsonwebtoken';
import 'dotenv/config';

export async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({
        typeDefs,
        resolvers, 

    });
    const {url} = await startStandaloneServer(server,{
        listen:{port:4000},
        context:async({req})=>{
            // authScope: getScope(req.headers.authorization);
            // console.log(authScope);
            console.log(req.headers['authorization']);
            const token= req.headers['authorization'] || '';
            console.log("token: ",token);
            try {
                const usuario =jwt.verify(token.replace('Bearer ',''),process.env.PALABRA_SECRETA);
                console.log('usuario ctx ',usuario);
                return usuario;
            } catch (error) {
                console.log('Hubo un error');
                console.log(error);
            }
            
        }
    });
    console.log(`🚀  Server ready at: ${url}`);
}