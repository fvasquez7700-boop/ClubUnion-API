# API REST - Club Unión Vóley

## Evidencia
GA7-220501096-AA5-EV03

## Descripción
Este proyecto consiste en el desarrollo de servicios web
para el Club Unión Vóley.

La API permite registrar usuarios, iniciar sesión y
gestionar la información de los jugadores del club.

## Tecnologías utilizadas
- Node.js
- Express
- bcryptjs
- Postman
- GitHub

## Dirección del servidor
http://localhost:3000

## Servicios web

### 1. Registro de usuarios
Método: POST
Ruta: /registro

Permite registrar usuarios con nombre de usuario
y contraseña.

### 2. Inicio de sesión
Método: POST
Ruta: /login

Permite autenticar usuarios registrados.

### 3. Consultar jugadores
Método: GET
Ruta: /jugadores

Devuelve la lista de jugadores registrados.

Respuesta correcta: 200 OK.

### 4. Registrar jugadores
Método: POST
Ruta: /jugadores

Ejemplo de solicitud:
{
  "nombre": "Juan Felipe Vasquez",
  "edad": 19,
  "posicion": "Punta receptor"
}

Respuesta correcta: 201 Created.
Datos inválidos: 400 Bad Request.

### 5. Actualizar jugadores
Método: PUT
Ruta: /jugadores/:id

Permite modificar el nombre, la edad y la
posición de un jugador.

Respuesta correcta: 200 OK.
Jugador no encontrado: 404 Not Found.
Datos inválidos: 400 Bad Request.

### 6. Eliminar jugadores
Método: DELETE
Ruta: /jugadores/:id

Permite eliminar un jugador mediante su ID.

Respuesta correcta: 200 OK.
Jugador no encontrado: 404 Not Found.
ID inválido: 400 Bad Request.

## Validaciones
La API verifica los datos recibidos y rechaza
las solicitudes que no cumplen los requisitos.

También controla los intentos de inicio de sesión
incorrectos y evita registrar usuarios duplicados.

## Ejecución
1. Abrir la carpeta del proyecto.
2. Ejecutar npm install.
3. Ejecutar node server.js.
4. Probar los servicios desde Postman.

## Observaciones
Los datos se almacenan temporalmente en memoria,
por lo que se reinician al detener el servidor.

## Conclusión
Se desarrollaron servicios web REST para el proyecto
Club Unión Vóley, utilizando métodos GET, POST,
PUT y DELETE.

Las pruebas realizadas en Postman permitieron
comprobar las operaciones principales y la
validación de datos.