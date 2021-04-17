import { TareaRoute } from './routes/tarea.route';
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'reflect-metadata';
import { createConnection } from 'typeorm';


class Server {

    app: Application; //declaramos una variable app para usar

    tareaRoute = new TareaRoute(); //definimos la ruta de la tarea creando un nuevo objeto para poder usarlos

    routes(): void {
        this.app.use('/tarea', this.tareaRoute.router); //usamos las rutas creadas en router
    }

    constructor() { //creamos el constructor
        this.app = express(); //usarmos el marco de express
        this.config();//usamos las configuraciones definidas
        createConnection();//creamos la conexion con la base de datos con typeORM
        this.routes();//usamos las rutas
    }


    config(): void { //creamos el metodo de configuracion
        this.app.set('port', process.env.PORT || 3000); //establece el puerto en el definido por el servdidor o en el 3000
        this.app.use(cors()); //utilizamos cors para el cruce de datos http
        this.app.use(morgan('dev')); //middleware en modo de desarrollo
        this.app.use(express.json()); //definimos express para uso de json
        this.app.use(express.urlencoded({ extended: false })); //encode en vez de bodyparser
    }



    start(): void {//metodo para inicializar el servidor
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port`, this.app.get('port'));
        });
    }
}

const server = new Server(); //creamos un objeto de nuestro servdior
server.start(); //llamamos al metodo start para levantar el servidor; 