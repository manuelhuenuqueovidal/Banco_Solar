**Banco Solar**

Este proyecto consiste en un servidor Express que gestiona una base de datos de un banco ficticio llamado "Banco Solar". Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre usuarios y transferencias, así como realizar transferencias de saldo entre usuarios.

### Archivos principales

- **server.js**: Este archivo contiene la lógica del servidor Express. Define las rutas para manejar las solicitudes HTTP, como agregar, consultar, editar y eliminar usuarios, realizar transferencias y consultar historial de transferencias.

- **consultas.js**: Aquí se encuentran las funciones que realizan consultas y operaciones en la base de datos. Incluye funciones para insertar, consultar, editar y eliminar usuarios, así como para realizar transferencias y consultar historial de transferencias.

- **config.js**: Contiene la configuración de la conexión a la base de datos PostgreSQL.

### Funcionamiento

1. **Servidor Express**: El archivo `server.js` utiliza Express para crear un servidor web. Define las rutas y maneja las solicitudes HTTP.

2. **Consultas a la base de datos**: En `consultas.js`, se definen funciones para realizar operaciones en la base de datos, como insertar, consultar, editar y eliminar registros de usuarios, así como funciones para realizar y consultar transferencias de saldo.

3. **Conexión a la base de datos**: En `config.js`, se configura la conexión a la base de datos PostgreSQL utilizando el módulo `pg`.

### Uso

1. **Instalación de dependencias**: Antes de ejecutar el servidor, asegúrate de tener instaladas todas las dependencias del proyecto. Puedes instalarlas ejecutando `npm install` en la terminal.

2. **Ejecución del servidor**: Una vez instaladas las dependencias, puedes ejecutar el servidor ejecutando `node server.js` en la terminal. El servidor estará disponible en `http://localhost:3000`.

3. **Interacción con el servidor**: Puedes realizar solicitudes HTTP a las rutas definidas en el servidor para realizar operaciones CRUD sobre los usuarios, realizar transferencias de saldo y consultar el historial de transferencias.

Este proyecto proporciona una base sólida para construir una aplicación web de gestión bancaria con funcionalidades básicas. 