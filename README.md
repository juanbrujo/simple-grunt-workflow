Automatización de tareas para proyectos en Front-End | CSSLab.cl
=====================

`Basic and simple GruntJS workflow for front-end projects`

![Automatización de tareas para proyectos en Front-End](http://www.csslab.cl/wp-content/uploads/2014/04/grunt.jpg)

**Artículo:** [Automatización de tareas para proyectos en Front-End | CSSLab.cl](http://www.csslab.cl/2014/04/07/automatizacion-de-tareas-para-proyectos-en-front-end/)

**GruntJS** es la herramienta de automatización de tareas escrita en **JavaScript** que más crece actualmente. Es robusta y está activamente siendo mejorada, y sólo requiere **NodeJS** para funcionar. Su fortaleza está en crear rutinas automatizadas para procesos repetitivos, como por ejemplo: compilar un archivo **LESS/SCSS/HAML/Handlebars/Liquid**, minificar archivos **.css** y **.js**, concatenar librerías **.js**, crear *sprites* y comprimir imágenes, recargar el browser cada vez que hayan nuevos cambios entre muchos otros que se te puedan ocurrir.

Este es un sencillo flujo que pueden utilizar para proyectos front-end; es un buen comienzo para quienes no están familiarizados aún con su utilidad y el uso cotidiano del Terminal/Consola.

Primero, debes tener lo fundamental para funcionar:

- [NodeJS](http://nodejs.org/download/)
- [LiveReload](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions)
- *Grunt command line interface* (CLI): se instala a través del comando de terminal:

	`$ sudo npm install -g grunt-cli`
	
- [Bower](http://bower.io/):
	
	`$ sudo npm install -g bower`


### package.json

Es el archivo que contiene los nombres de las librerías **Node** que utilizaremos para automatizar nuestras tareas recurrentes y que reside en la raíz del proyecto. Aquí están el nombre y la versión de cada plugin que necesitaremos, de una larga lista de plugins existentes.

### bower.json

Archivo json que contiene las librerías **JavaScript** utilizadas para este proyecto. A través de ella se realiza el traspaso desde cada repositorio y se descarga las últimas versiones disponibles a `bower_components` y que posteriormente serán procesadas.

### Gruntfile.js

Es el archivo base con el cual crearemos las tareas que necesitamos corra **GruntJS** por nosotros y que reside en la raíz del proyecto junto a **package.json**. En este archivo están definidas los plugins que utilizaremos y cómo deben trabajar, en esta ocasión incluyo los siguientes:

- **concat**: concatena y minifica librerías JavaScript
- **jshint**: busca y sugiere mejoras en tu JavaScript
- **uglify**: minifica archivos JavaScript
- **spritesmith**: crea una imagen y una hoja de estilos sprite a partir de varios íconos
- **image**: comprime imágenes
- **less**: compila y minifica archivos .less
- **bowercopy**: copia las librerías JS en /src/js/libs para su uso
- **watch**: corre tareas definidas cada vez que se realizan cambios a ellas, en este caso todas las anteriores.

### Uso

El directorio base se llama `/simple-grunt-workflow` y contiene todo lo necesario para comenzar a trabajar. Suponiendo que trabajas en un servidor local, la estructura básica de archivos es la siguiente:

	/simple-grunt-workflow/Gruntfile.js
	/simple-grunt-workflow/package.json
	/simple-grunt-workflow/dist/index.html
	

El directorio donde trabajarás tus assets se llama `/src ` y contiene:

	/simple-grunt-workflow/src/js/
	/simple-grunt-workflow/src/less/
	/simple-grunt-workflow/src/less/inc/
	/simple-grunt-workflow/src/images/
	/simple-grunt-workflow/src/images/sprites/
	

Los que después de procesados por **GruntJS** residirán en `/assets` y son los que debes llamar desde tus archivos **HTML**:

	/simple-grunt-workflow/dist/assets/js/
	/simple-grunt-workflow/dist/assets/js/libs/
	/simple-grunt-workflow/dist/assets/css/
	/simple-grunt-workflow/dist/assets/images/
	

Para comenzar a trabajar, en Terminal/Consola debes estar en el directorio que estés trabajando:

	$ cd /path/to/simple-grunt-workflow/

Para instalar los plugins a utilizarse y que están definidos en **package.json**:

	$ sudo npm install
	
![](http://www.csslab.cl/wp-content/uploads/2014/04/1npm.png)

Con esto se llamarán a todos los repositorios e instalará los paquetes necesarios para hacer las tareas que tenemos asignadas. Esto puede tomar unos minutos y creará un directorio `/node_modules` en la raíz de tu proyecto. Este directorio sólo le es útil a **GruntJS**, no debemos utilizarlo en ambiente productivo.

Luego es hora de descargar las librerías **JavaScript** base y sus dependencias a través de **Bower**:

	$ sudo bower install

Antes de correr **GruntJS**, abre **Gruntfile.js** y revisa los path que concuerden con los que estés trabajando. Si todo concuerda, acciona el comando:

	$ grunt init

![](http://www.csslab.cl/wp-content/uploads/2014/04/2watch.png)

El cual comenzará a procesar las tareas iniciales principalmente de relocar los archivos .js descargados mediante bower al directorio `src/js` correspondiente. Luego para comenzar a trabajar, acciona:

	$ grunt

El que quedará en **watch** esperando cambios o actualizaciones en los archivos. En este momento debes llamar el directorio de trabajo en tu browser (a través de tu servidor web local) y activar **LiveReload**. Cuando el ícono cambie es porque está sincronizado con **GruntJS** y a cada cambio en archivos **html/less/js/images** en tu proyecto, **watch** hará que se actualicen los archivos y **LiveReload** recargará el browser por tí.

![](http://www.csslab.cl/wp-content/uploads/2014/04/Screen-Shot-2014-04-03-at-5.12.04-PM.png)![](http://www.csslab.cl/wp-content/uploads/2014/04/Screen-Shot-2014-04-03-at-5.13.24-PM.png)

Si hay un error en tu sintaxis lo más probable es que **GruntJS** te avise y deje de correr, por lo que debes corregirlo antes de continuar.

![](http://www.csslab.cl/wp-content/uploads/2014/04/3error.png)

### Test

A través de un nueva tarea de **GruntJS** se prueba el archivo **JavaScript** en búsqueda de errores de sintaxis y mejoras en él:

	$ grunt testjs


**Happy Coding :)**
