# Code challenge
Para la administración de paquetes de node.js se utiliza Yarn.
 
Para la creación de la aplicación se utilizó la herramienta create-react-app para crear una configuración local rápida.
 
Paquetes relevantes que se agregaron:
* bootstrap
* Sass
 
### Rutas de carpetas:
Por las dudas, create-react-app organiza 3 carpetas principales: public (con los archivos que no se modifican), src (donde se desarrolla la aplicación) y build.
Acá la idea es explicar la organización de las carpetas dentro de src.
  
    Src:
       - components
       - features
       - fonts
       - icons
       - images
       - reducer
       - services
       - state
       App.js
       index.js
       index.scss
 
##### Components:
La carpeta componentes almacena componentes reusables, genéricos, por otros componentes específicos. Es decir, archivos .js y/o .scss. Por la cantidad de elementos no se dividió en subcarpetas. 
 
##### Features:
Almacena los componentes específicos. Está subdividido en carpetas que definen las secciones de la aplicación, salvo por la carpeta Card (podría haberla puesto en componentes, pero por la especificidad decidí que no).
Suele existir un archivo utils.js donde se escriben funciones útiles que se pueden utilizar para tal sección o subdivisión.
 
##### Fonts:
Se guardan las fuentes que se utilizan. Se inicializan en index.scss.
 
##### Icons:
Se guardan los componentes vsg, que se utilizan como iconos.
 
##### Images:
Se guardan las imágenes utilizadas. Las imágenes que se encuentran en esta carpeta, son solo para emular las imágenes necesarias para este challenge.
 
##### Reducer:
Acá se guardan las lógicas de los reductores, de los estados. Se creó solo un solo reductor para el estado de toda la app.
 
##### Services:
Acá se guardan los servicios de la aplicación, como también funciones globales que pueden utilizarse por toda la aplicación. En este caso, solo se encuentran las funciones para adquirir la información de la api.
 
##### State:
Se guardan los estados de la aplicación. Aquí se encuentran el estado de la aplicación, y un estado del usuario. El estado del usuario es una emulación simple para tener algo de información como los géneros favoritos, películas vistas, cuánto fue visto de estas películas, cuando fue la última vez que se vio y cuántos amigos ven estas películas.
 
##### App.js:
Es el archivo que tiene la estructura principal de la aplicación. Aquí se llaman a las funciones fetch para adquirir información de la api.
 
##### index.js:
Donde se llama a renderizar la app.
 
##### index.scss:
El archivo principal de estilo. Se inicializan las fuentes; se agregan ciertas configuraciones personalizadas (sobre body, button, titulos); se sobreescriben ciertas variables de boostrap; se añaden variables; se crean clases de estilos personalizadas.

### Estados
El estado general de la app es el siguiente:

    state: {
      section: "movie" | "tvShow",
      type:"home" | "search",
      searchText: string,
      search: any, /*depende de la api*/
      searchAreLoading: boolean,
      movieGenres: {
          <id:number>:string,
          ...
      },
      movieGenresAreLoading: boolean,
      tvShowGenres: {
          <id:number>:string,
          ...
      },
      tvShowGenresAreLoading: boolean,
      discover: any, /*depende de la api*/
      discoverAreLoading: boolean,
      movieUser: array<any>, /*depende de la api*/
      movieUserAreLoading: boolean,
      tvShowUser: array<any>, /*depende de la api*/
      tvShowUserAreLoading: boolean,
      showAllUserSection: boolean,
      showPopularSection: boolean,
    }
Tanto $search$, $movieUser$ y $tvShowUser$ guardan información que se pida a la api. Su estructura depende de la api.
 
El estado emulado del usuario es:
 
    userState: {
       movie: {
           watching: [
               {
                   id: number,
                   friends: number,
                   timeView: number, //sec
                   lastView: number  //min
               },
               ...
           ],
           genres: number[]
       },
       tvShow:{
           watching: [
               {
                   id: number,
                   friends: number,
                   timeView: number, //sec
                   lastView: number  //min
               },
               ...
           ],
           genres: number[]
       }
   }
 
*watching* son las películas o series que está viendo el usuario. Y *genres* son los géneros preferidos del usuario.
 
Esta diferenciacion general entre *movie* y *tvShow* está dada por la api.
 
### Acciones
Se enumeran las distintas acciones que cambian el estado de la aplicación. Estas acciones son las acciones que ejecuta el reductor. También, con las acciones, se enumeran a grandes rasgos el comportamiento de la aplicación en cada estado.
 
- **"movie/home"**: pantalla de inicio de películas.
 
- **"movie/search"**: pantalla de películas buscadas.
 
- **"movie/addGenres"**: añade al estado de la app (a *movieGenres*) la información de la api sobre los géneros posibles de películas.
 
- **"movie/addUser"**: añade al estado de la app (a *movieUser*) la información de la api sobre las películas que está viendo el usuario.
 
- **"tvShow/home"**: pantalla de inicio de series.
 
- **"tvShow/search"**: pantalla de series buscadas.
 
- **"tvShow/addGenres"**: añade al estado de la app (a *tvShowGenres*) la información de la api sobre los géneros posibles de series.
 
- **"tvShow/addUser"**: añade al estado de la app (a *tvShowUser*) la información de la api sobre las series que está viendo el usuario.
 
- **"addDiscover"**: añade películas o series (depende del valor de *section* en el estado de la app) por descubrir, información de la api, al estado de la app (a *discover*). 
 
- **"addSearch"**: añade películas o series (depende del valor de *section* en el estado de la app) relacionadas con la búsqueda, información de la api, al estado de la app (a *search*). 
 
- **"showAllUserSection"**: mostrar todas las películas o series que está viendo el usuario.
 
- **"showPopularSection"**: mostrar todas las películas o series populares.

### Funcionamiento
Cuando se carga la página, (el estado inicial de la aplicación está en src/state/app.js), se pide datos a la api se realizan las siguientes acciones:

- Se usa la función $fetchGenres$ (src/services/fetch/index.js), para adquirir los géneros disponibles de películas de la api. Se ejecuta la acción *movie/addGenres*.

- Se usa la función $fetchDiscover$, para adquirir las películas a descubrir de la api. Se ejecuta la acción *addDiscover*.

- Se usa la función $fetchUser$, para adquirir la información de las películas que está viendo el usuario de la api. Se ejecuta la acción *movie/addUser*.

Esta lógica se encuentra en src/app.js. También en este archivo se encuentra el estado de la aplicación, creado utilizando el hook de React *usereducer* (tal vez, podría ser mejor utilizar un contexto).

Cuando se hace **click** sobre el botón *tv show* en el encabezado (header) se realiza la misma operación pero buscando información sobre las series y muestra la pantalla correspondiente.
 
Cuando se busca un texto se realiza la acción *movie/search* o *tvShow/search*, depende de el valor de *section* en el estado de la app (es decir si se visualizan películas o series).
 
Cuando se realiza **click** sobre los botones *Show all* dependiendo de la sección en la que se ejecuta (si dice "Continue Watching" o "Popular movies 2022"), en la sección Main, se ejecuta la acción *showAllUserSection* o *showPopularSection*.

Cabe señalar que una vez que añadida la información en *movieGenres*, en *tvShowGenres*, en *movieUser* y en *tvShowUser*, no se vuelve a solicitar. Mientras que la información almacenada en *discover* y en *search* son solicitadas cada vez que se ejecuta la acción *addDiscover* o *addSearch*.

### Detalles sobre secciones
 
#### Header:
Se encuentran 3 botones:
- Movies: (por defecto) que al accionarlo ejecuta la acción *movie/home*.
- Tv Show: que ejecuta la acción *tvShow/home*.
- Input search: que ejecuta la acción *addSearch*.
 
Se posiciona arriba y ocupa todo el width de la pantalla. No está fijado.
 
Cuando el width de la pantalla es menor a **768px** los botones se guardan en una ventana que se abre con un botón hamburguesa.
 
#### Aside:
El aside se divide en dos partes. La sección que muestra trailers y la configuración de géneros.
 
Se encuentra a la izquierda de la pantalla y es ocultable. Se abre y cierra de manera horizontal.
 
La sección de trailers obtiene información de *discover*. Y la sección de géneros obtiene información de  *movieGenres* o *tvShowGenres*.
 
Cuando el width de la pantalla es menor a **1200px** se posiciona por debajo del header y por encima del main. Cambia la manera de abrir y cerrar a vertical.
 
Cuando el width de la pantalla es menor a **768px** la sección de trailers se elimina.
 
#### Main:
El main se divide en tres tipos de pantallas distintas: Home, Search y ShowAll (Search y ShollAll son dos componentes distintos pero tienen el mismo resultado visual).
 
Home tiene tres subsecciones donde muestran cartas distribuidas horizontalmente. Las secciones "Continue Watching" y "Popular movies 2022", tienen un botón "Show all" que accionan la pantalla ShowAll.
 
Para las tres pantalla si el width es menor a **768px**, las cartas asumen el total de width y se distribuyen de manera vertical.
 
En la pantalla Home, cuando el width es menor a **992px** la sección de "Popular movies 2022" muestra solo 2 cards.
 
#### Cards:
Las cartas se crean a partir de subcomponentes. Se distinguen 4 tipos distintos de cards.
 
Las "CardUserWatch", que están en la sección "Continue Watching" y en la pantalla de ShowAll correspondiente, muestran en particular: 
- cuantos amigos ven tal película o serie,
- hace cuanto el usuario vio por última vez la pelicula o serie
- y cuanto tiempo de visualización existe
 
Las "Card1" son estándar, están en la sección "Popular movies 2022", en la pantalla de ShowAll correspondiente y en la pantalla de Search. Muestran en particular:
- dos géneros de la pelicula o serie
- y el promedio de votos positivos.
 
Ambas cartas "CardUserWatch" y "Card1" muestran si una película es trending según si la cantidad de votos es mayor igual a 5000. Además, tienen un hover, donde muestran la descripción de la película o serie.
 
Las "Card2" están en la sección de Trailers, y muestran:
- dos géneros de la pelicula o serie
- cantidad de visualizaciones (la api no daba esa informacion asi que utilice la cantidad de votos positivos)
 
Por último, la "CardFull" es la que se muestra en la primera sección de la pantalla Home de main.
