import { Tarea } from './../entities/tarea';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

export class TareaController { //definimos nuestra clase controller
    
    //metodo para recuperar todas las tareas
    async getAllTareas (req: Request, res: Response) { 
        try {
            const tareas = await getRepository(Tarea).find(); //busca en la tabla de tarea realacionada con la entidad 
                                                        //con el metodo find retorna los resultados y los almacenamos en un constante
              
                                                        console.log(tareas);
            return res.json(tareas); //retornamos las tareas en formato json
            
        } catch (error) {
            return res.json(error); // reot
        }
    }

    //metodo para recuperar una tarea por su id
    async getTareaById (req: Request, res: Response) {
        let codigo = req.params.codigo;
        if (codigo) {//verificamos si econtro un codigo entre los parametros
            try {
                const tarea = await getRepository(Tarea).findOne(codigo); //busca la tarea por id con el metodo findOne
                                                                            //retorna el resultado y la almacena un la constante
                return res.json(tarea); //retornamos el resultado en formato json
            } catch (err) {
                return res.json(err);//retornamos el error si ocurre algun fallo
            }
        } else {
            return res.json({error: 'Código no encontrado'}); //retornamos mensaje caso no se encuentre codigo entre los parametros enviados
        }
    }

    ///METODO PARA CREAR UNA NUEVA TAREA
    async addTarea (req: Request, res: Response) {
        let tareaData = req.body;//recuperamos los datos que se pasan por el body

        let newTarea = getRepository(Tarea).create(tareaData); //creamos la tarea con el repository

        if (newTarea) { //verificamos si la tarea fue creada correctamente
            try {
                const tareaGuardada = await getRepository(Tarea).save(newTarea); //guardmso la tarea con el metodo save
                return res.json(tareaGuardada); //retornamos la tarea en formato json
            } catch (err) {
                return res.json(err); //retornamos el error si ocurre algun fallo al guardar
            }
        } else {
            return res.json({error: 'Error al registrar la tarea'}); //retornamos el error si ocurre algun fallo al crear la tarea
        }
    }

    //METODO PARA ACTUALIZAR LA TAREA
    async updateTarea (req: Request, res: Response) {

        let codigo = req.params.codigo; //recuperamos el id de la tarea
        const newTarea = req.body; //recuparmos los nuevos datos de la tarea a ser gaurdadas
                                    //le ponemos el nombre de new porque son los nuevos datos que queremos guardar

        const tarea = await getRepository(Tarea).findOne(codigo); //recuperamos la informacion de la tarea con su id  
                                                                    //son los datos que queremos actualizar
        if (tarea) {//si se encontraron datos
            try {
                getRepository(Tarea).merge(tarea, newTarea); //hacemos el merge entre la vieja tarea y la nueva
                                                            //esto compara y reemplaza los datos por los nuevos

                const result = await getRepository(Tarea).save(tarea);//guardamos las actualizaciones con el metodo save

                return res.json(result);//retornamos los resultados en formatos json
            } catch (error) {
                return res.json(error); //retornamos el error si ocurre algun fallo al actualizar
            }
    
        } else {
            return res.json({ error: 'Tarea no encontrada' }); //retormanos si la tarea no fue encontrada
        }
    }

    //METODO PARA ELIMINAR LAS TAREAS POR ID
    async deleteTarea (req: Request, res: Response) {
        const codigo = req.params.codigo; //recuperamos el id de la tarea

        if (codigo) {//si se pudo recuprar el codigo
            try {
                await getRepository(Tarea).delete(codigo);//eliminamos la tarea por el id a traves del metodo delete

                return res.json({info: 'Tarea eliminada'});//retornamos el resultado
            } catch (error) {
                return res.json(error); //retornamos el error si ocurre algun fallo al eliminar
            }
        } else {
            return res.json({error: 'Codigo no encontrado'}); // retoramos si el codigo no fue encontrado
        }
    }
}
