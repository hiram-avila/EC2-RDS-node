# EC2(docker) + RDS(MySQL) + node  

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

-API RESTful de autenticación construida con Node.js, Express, bcrypt, JWT y SQL.

-Esta API permite realizar operaciones CRUD y autenticación de usuarios. Utiliza Docker para la contenedorización, Amazon RDS para la base de datos y Amazon EC2 para el despliegue. Además, incluye un flujo de trabajo CI/CD para el despliegue automático.

## Características

- **Registro de usuarios**: Permite a los usuarios registrarse con una contraseña segura.
- **Autenticación de usuarios**: Los usuarios pueden iniciar sesión y recibir un token JWT.
- **Operaciones CRUD**: Permite crear, leer, actualizar y eliminar recursos en la base de datos.
- **Seguridad**: Las contraseñas se almacenan de manera segura utilizando bcrypt.
- **Contenedorización**: Utiliza Docker para la gestión de contenedores.
- **Base de Datos en la Nube**: Utiliza Amazon RDS para el almacenamiento de datos.
- **Despliegue en la Nube**: Utiliza Amazon EC2 para alojar la aplicación.
- **CI/CD**: Implementación continua y despliegue continuo utilizando GitHub Actions.
  

## Tecnologías Utilizadas

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) 
- ![bcrypt](https://img.shields.io/badge/bcrypt-3C3C3D?style=for-the-badge&logo=lock&logoColor=white) 
- ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white) 
- ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) 
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) 
- ![AWS](https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
- ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white) 

## Requisitos Previos

- Node.js instalado
- Docker instalado
- Cuenta de AWS con acceso a RDS y EC2
- MySQL u otro sistema de gestión de bases de datos SQL instalado (opcional para desarrollo local)
- Postman u otra herramienta para probar la API

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/EC2-api-sql.git
    cd EC2-api-sql
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Configura la base de datos:
    - Crea una base de datos en Amazon RDS.
    - Ejecuta el script SQL para crear las tablas necesarias (ver archivo `schema.sql`).
    - Configura las credenciales de la base de datos en el archivo `.env` (ver sección [Configuración](#configuración)).

4. Configura las variables de entorno:
    Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
    ```env
    DB_HOST=nombre_del_host_de_tu_rds
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_de_tu_base_de_datos
    JWT_SECRET=tu_secreto_jwt
    ```

5. Inicia el servidor usando Docker:
    ```bash
    docker build -t ec2-api-sql .
    docker run -p 3000:3000 --env-file .env ec2-api-sql
    ```

## Despliegue en EC2

1. Configura una instancia de EC2 en tu cuenta de AWS.
2. Conéctate a la instancia y clona el repositorio.
3. Instala Docker en la instancia de EC2.
4. Sigue los pasos de instalación usando Docker descritos anteriormente en la instancia de EC2.

## CI/CD con GitHub Actions

Este proyecto utiliza GitHub Actions para CI/CD. El flujo de trabajo está definido en `.github/workflows/deploy.yml`.

- El flujo de trabajo se activa en cada push a la rama principal.
- Construye la imagen de Docker y la despliega en la instancia de EC2.

Asegúrate de configurar los secretos de GitHub Actions en tu repositorio (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `EC2_HOST`, `EC2_USER`, etc.).


