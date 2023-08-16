import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { corsOptions } from "./config.js";

import './models/asocciations.js'

//Rutas 
import authRoutes from './router/auth.routes.js'
import rolRoutes from './router/rol.routes.js'
import formRoutes from './router/formulario.routes.js'
import userRoutes from './router/usuario.routes.js'
 


const app = express();

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(authRoutes)
app.use(rolRoutes);
app.use(formRoutes);
app.use(userRoutes);


export default app 