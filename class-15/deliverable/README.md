## Empezando
### Pre requisitos
* Node
* Pm2
* Forever

### Correr localmente
Instalar dependencias
```sh
npm install
```

Correr localmente en desarrollo
```
npm run dev
```

## Ejercicio 1

Vista info con procesadores presentes en el servidor
```bash
curl https://localhost:3000/info
```

Ejecutar el servidor (modos FORK y CLUSTER) con nodemon.
```sh
npm run dev -- --MODE FORK
npm run dev -- --MODE CLUSTER
```

Verificar el número de procesos tomados por node.
```sh
sudo ps
```

Ejecutar el servidor (con los parámetros adecuados) utilizando Forever.

```sh
forever server.js --MODE FORK
forever server.js --MODE CLUSTER
```

Verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.

```sh
forever list
sudo ps
```

Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster.

```sh
pm2 start server.js --MODE FORK
pm2 start server.js --MODE CLUSTER
```

Listar los procesos por PM2 y por sistema operativo.
```sh
pm2 list
sudo ps
```

Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.

```sh
pm2 start server.js --watch -- --MODE FORK
forever server.js --watch -- --MODE FORK
```

Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.

```sh
pm2 start server.js --MODE FORK --PORT 3000
pm2 start server.js --MODE CLUSTER --PORT 3001

fuser 3000/tpc -k
fuser 3001/tpc -k
```

## Ejercicio 2
Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:

Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.

El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.

```nginx.conf
server {
    listen          80;
    server_name     localhost;
    include         mime.types;
    default_type    application/octet-stream;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;

        proxy_pass http://localhost:8081;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location /api/randoms {
        proxy_pass http://localhost:8080/api/randoms;
    }
}
```

Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

```nginx.conf
upstream node_app {
    server localhost:8082;
    server localhost:8083;
    server localhost:8084;
    server localhost:8085;
}


server {
    listen          80;
    server_name     localhost;
    include         mime.types;
    default_type    application/octet-stream;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;

        proxy_pass http://localhost:8081;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location /api/randoms {
        proxy_pass http://node_app/api/randoms;
    }
}
```

