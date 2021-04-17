# CRUD TYPESCRIPT
Este es un CRUD sencillo usando typescript con typeORM como mapeador de objeto relacional

## _HERRAMIENTAS NECESARIAS_
- Node.js intalado.
- typescript.
- PostgreSQL

## PAQUETES UTILIZADOS
- cors
- express
- morgan
- pg //controlador de posgresql
- typeorm //mapeamiento de objetos

## Comandos
compilar el proyecto a javascript
```
    npm run build
```
ejecutar el servidor
```
    npm run start
```
compilar y levantar el servidor, también actualiza con los cambios
```
    npm run dev
```

## Pasos para levantar el proyecto
- En la base de datos Postgres crear una base llamada *ts_node*.
- Crear la tabla de *tarea* ejecutando el siguiente script
```
    CREATE TABLE public.tarea
(
    id_tarea bigint NOT NULL DEFAULT nextval('tarea_id_tarea_seq'::regclass),
    titulo character varying,
    fecha_creacion date,
    descripcion character varying,
    prioridad integer,
    CONSTRAINT tarea_pkey PRIMARY KEY (id_tarea)
)
```
- Clonar el proyecto con https://github.com/juanFranco99/crud-node-ts-typeORM.git o descargando
- Configurar el archivo *ormconfig.json* con las credenciales de acceso

```
{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "TU_NOMBRE_DE_USUARIO",
    "password": "TU_CONTRASENHA",
    "database": "ts_node",
    "entities": ["dist/entities/**/*.js"],
    "synchronize": false //si coloca el sincronize como true creara automaticamente las tablas
}
```
- Una vez realizado estas configuraciones ejecura el comando:
```
    npm run dev
```
para levantar el proyecto

La ruta será en http://localhost:3000/tarea 
pueden utilizar herramientas como postman u otros para probar los servicios
