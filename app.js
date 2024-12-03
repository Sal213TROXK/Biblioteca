const express = require("express") //este es el framework
const mysql = require("mysql2")// esta es la libreria para conectarse a la base de datos

const app = express() //iniciamos un objeto de express
const port = 4000 //definimos el puerto donde va a correr la api

app.use(express.json())



//COmo insertar en la base
//1Defibnir la conxión
//2 ejecutar el comando sql
//3 cerrar la conexión

//Paso 1

const mysqlConecction = mysql.createConnection(
    {user: "root",
    password: "mypass",
    host: "localhost",
    port: 3306,
    database: "Biblioteca"}
)

function nuevoLibro(request, response){
    console.log("Este es el endpoint para registrar nuevos libros")

    console.log(request.body)

const titulo = request.body.titulo
const autor = request.body.autor

mysqlConecction.query(
"insert into Libro (titulo,nombre) VALUES (?,?)",[titulo, autor])
    response.send("se registro el nuevo libro")
}

//end point
app.post("/nuevoLibro",nuevoLibro
)


app.listen(port,()=> {
    console.log("api corriendo en el puerto");

}) //inicializar api