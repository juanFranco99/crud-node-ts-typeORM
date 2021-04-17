import { TareaController } from './../controllers/tarea.controller';
import { Router } from "express";

export class TareaRoute {
    
    public router : Router = Router(); //definimos el atributo router usando el router del express
    
    public tareaContrller = new TareaController(); //creamos un objeto del tipo tarea contrller para poder utilizar sus metodos

    constructor() { //definimos el constructor
        this.config();//llamaos al metodo con las rutas
    }

    config(): void {
        this.router.get('/', this.tareaContrller.getAllTareas);//obtiene todas las tareas en la ruta principal
        this.router.get('/:codigo', this.tareaContrller.getTareaById); //obtiene la trea con el parametro codigo que debemos pasarle
        this.router.put('/', this.tareaContrller.addTarea); //crea la tarea con los datos que pasemos en el body
        this.router.post('/:codigo', this.tareaContrller.updateTarea);//actualiza la tarea en base al codigo y los parametros del body
        this.router.delete('/:codigo', this.tareaContrller.deleteTarea) //elimina la tarea en base al codigo
    }

}