const express = require("express");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

// Proyecto: Club Unión Vóley
// Lista temporal donde se guardan los usuarios.
const usuarios = [];

// Servicio web para registrar usuarios.
app.post("/registro", async (req, res) => {
  const { usuario, contrasena } = req.body || {};

  // Verificar que los datos sean válidos.
  if (
    typeof usuario !== "string" ||
    typeof contrasena !== "string" ||
    usuario.trim().length < 3 ||
    contrasena.length < 8
  ) {
    return res.status(400).json({
      mensaje: "Usuario mínimo 3 caracteres y contraseña mínimo 8."
    });
  }

  const nombre = usuario.trim();

  // Comprobar si el usuario ya está registrado.
  const existe = usuarios.some(u => u.usuario === nombre);

  if (existe) {
    return res.status(409).json({
      mensaje: "El usuario ya existe."
    });
  }

  // Proteger la contraseña antes de guardarla.
  const hash = await bcrypt.hash(contrasena, 10);

  usuarios.push({
    usuario: nombre,
    contrasena: hash
  });

  return res.status(201).json({
    mensaje: "Usuario registrado satisfactoriamente."
  });
});

// Servicio web para iniciar sesión.
app.post("/login", async (req, res) => {
  const { usuario, contrasena } = req.body || {};

  // Validar que se reciban las credenciales.
  if (
    typeof usuario !== "string" ||
    typeof contrasena !== "string"
  ) {
    return res.status(400).json({
      mensaje: "Debe ingresar usuario y contraseña."
    });
  }

  // Buscar el usuario registrado.
  const encontrado = usuarios.find(
    u => u.usuario === usuario.trim()
  );

  // Comparar la contraseña ingresada con la guardada.
  const valido = encontrado
    ? await bcrypt.compare(contrasena, encontrado.contrasena)
    : false;

  if (!valido) {
    return res.status(401).json({
      mensaje: "Error en la autenticación."
    });
  }

  return res.status(200).json({
    mensaje: "Autenticación satisfactoria."
  });
});

// SERVICIOS WEB - CLUB UNION VOLEY
 // Lista temporal de jugadores
 const jugadores = [];

 // Consultar todos los jugadores
 app.get("/jugadores", (req, res) => {
   return res.status(200).json({
     mensaje: "Lista de jugadores del Club Unión Vóley",
     jugadores: jugadores
   });
 });

 // Registrar un jugador
 app.post("/jugadores", (req, res) => {
   const { nombre, edad, posicion } = req.body || {};

   if (
     typeof nombre !== "string" ||
     !nombre.trim() ||
     !Number.isInteger(edad) ||
     edad < 6 ||
     edad > 100 ||
     typeof posicion !== "string" ||
     !posicion.trim()
   ) {
     return res.status(400).json({
       mensaje: "Datos del jugador inválidos."
     });
   }

   const jugador = {
     id: jugadores.length
       ? Math.max(...jugadores.map(j => j.id)) + 1
       : 1,
     nombre: nombre.trim(),
     edad,
     posicion: posicion.trim()
   };

   jugadores.push(jugador);

   return res.status(201).json({
     mensaje: "Jugador registrado satisfactoriamente.",
     jugador
   });
 });

 // Actualizar los datos de un jugador
 app.put("/jugadores/:id", (req, res) => {
   const id = Number(req.params.id);
   const { nombre, edad, posicion } = req.body || {};

   if (!Number.isInteger(id) || id < 1) {
     return res.status(400).json({
       mensaje: "ID inválido."
     });
   }

   const jugador = jugadores.find(j => j.id === id);

   if (!jugador) {
     return res.status(404).json({
       mensaje: "Jugador no encontrado."
     });
   }

   if (
     typeof nombre !== "string" ||
     !nombre.trim() ||
     !Number.isInteger(edad) ||
     edad < 6 ||
     edad > 100 ||
     typeof posicion !== "string" ||
     !posicion.trim()
   ) {
     return res.status(400).json({
       mensaje: "Datos del jugador inválidos."
     });
   }

   jugador.nombre = nombre.trim();
   jugador.edad = edad;
   jugador.posicion = posicion.trim();

   return res.status(200).json({
     mensaje: "Jugador actualizado satisfactoriamente.",
     jugador
   });
 });

 // Eliminar un jugador por su ID
 app.delete("/jugadores/:id", (req, res) => {
   const id = Number(req.params.id);

   if (!Number.isInteger(id) || id < 1) {
     return res.status(400).json({
       mensaje: "ID inválido."
     });
   }

   const indice = jugadores.findIndex(j => j.id === id);

   if (indice === -1) {
     return res.status(404).json({
       mensaje: "Jugador no encontrado."
     });
   }

   jugadores.splice(indice, 1);

   return res.status(200).json({
     mensaje: "Jugador eliminado satisfactoriamente."
   });
 });

// Iniciar el servidor web.
app.listen(3000, () => {
  console.log("API Club Unión Vóley: http://localhost:3000");
});