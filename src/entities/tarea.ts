import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tarea'})//definimos que es una entidad y que se relaciona con el la tabla llamada tarea

export class Tarea { //export para poder llamar la clase

    @PrimaryGeneratedColumn({name: 'id_tarea'}) //definimos que sera la clave primaria y que sera autogenerada
    codigo: number;
    
    @Column({name: 'titulo'}) //definimos que sera una columna con el nombre de titulo
    titulo: string;

    @Column() //si dejamos el campo de name vacio el toma como nombre del campo el mismo que el del atributo
    fecha_creacion: Date;
    
    @Column()
    descripcion: string;

    @Column({name: 'prioridad'})
    nivel_prioridad: number;

}