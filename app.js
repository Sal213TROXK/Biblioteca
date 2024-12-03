const express = require("express"); // Este es el framework
const mysql = require("mysql2"); // Esta es la librería para conectarse a la base de datos

const app = express(); // Iniciamos un objeto de express
const port = 4000; // Definimos el puerto donde va a correr la API

app.use(express.json());

// Paso 1: Definir la conexión.
const mysqlConecction = mysql.createConnection({
  user: "root",
  password: "mypass",
  host: "localhost",
  port: 3306,
  database: "Biblioteca",
});

mysqlConecction.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos: ", err);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

// Función para registrar un nuevo libro
function nuevoLibro(request, response) {
  console.log("Este es el endpoint para registrar nuevos libros");
  console.log(request.body);

  const titulo = request.body.titulo;
  const autor = request.body.autor;

  mysqlConecction.query(
    "insert into Libro (titulo, nombre) VALUES (?, ?)",
    [titulo, autor],
    (err, result) => {
      if (err) {
        console.error("Error en la inserción:", err);
        response.status(500).send("Error al registrar el nuevo libro");
        return;
      }

      response.send("Se registró el nuevo libro");
    }
  );
}

// Función para obtener todos los libros
function obtenerLibros(request, response) {
  console.log("Este es el endpoint para seleccionar los libros");

  mysqlConecction.query("SELECT * FROM Libro", (err, rows) => {
    if (err) {
      console.error("Error en la consulta:", err);
      response.status(500).send("Error al obtener los libros de la base de datos.");
      return;
    }

    console.log(rows);
    response.json(rows);
  });
}

// Función para eliminar un libro por id
function eliminarLibro(request, response) {
  console.log("Este es el endpoint para eliminar un libro");

  const id = request.params.id; // Obtenemos el id del libro desde la URL

  mysqlConecction.query(
    "DELETE FROM Libro WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error al eliminar el libro:", err);
        response.status(500).send("Error al eliminar el libro");
        return;
      }

      if (result.affectedRows > 0) {
        response.send(`Libro con id ${id} eliminado exitosamente`);
      } else {
        response.status(404).send("No se encontró un libro con ese id");
      }
    }
  );
}

// Función para actualizar un libro (si lo necesitas)
function actualizarLibro(request, response) {
  console.log("Este es el endpoint para actualizar un libro");

  // Aquí puedes agregar la lógica para actualizar un libro
  mysqlConecction.query("SELECT * FROM Libro", (err, rows) => {
    if (err) {
      console.error("Error en la consulta:", err);
      response.status(500).send("Error al obtener los libros de la base de datos.");
      return;
    }

    console.log(rows);
    response.json(rows);
  });
}

// Endpoints
app.put("/Libros", actualizarLibro);
app.get("/Libro", obtenerLibros);
app.post("/nuevoLibro", nuevoLibro);
app.delete("/Libro/:id", eliminarLibro); // Endpoint DELETE para eliminar un libro

app.listen(port, () => {
  console.log("API corriendo en el puerto", port);
}); // Inicializar API
