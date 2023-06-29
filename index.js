import { config } from 'dotenv'
import app from './app.js'
import { PORT } from  './config.js'
import {sequelize} from './database/db.js'

async function main(){
    try{
        app.listen(PORT)
        console.log('Config', config())
        console.log('Server running on', PORT)
        await sequelize.authenticate();
        console.log('Nos hemos conectado a la base de datos')
    }catch(error){
        console.log('Se ha producido un error', error)
    }

} 

main();