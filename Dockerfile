# Utiliza una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia todos los archivos de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que se ejecutará la aplicación (por ejemplo, el puerto 3000)
EXPOSE 3000

# Comando para iniciar la aplicación (asegúrate de que coincida con el comando de inicio en tu package.json)
CMD ["npm", "run", "dev"]
    