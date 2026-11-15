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

// Iniciar el servidor web.
app.listen(3000, () => {
  console.log("API Club Unión Vóley: http://localhost:3000");
});