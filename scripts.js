/* ===========================
   REFERENCIAS DEL DOM
=========================== */

const jugador =
document.getElementById(
"jugador"
);

const tuboSup1 =
document.getElementById(
"tuboSuperior1"
);

const tuboInf1 =
document.getElementById(
"tuboInferior1"
);

const tuboSup2 =
document.getElementById(
"tuboSuperior2"
);

const tuboInf2 =
document.getElementById(
"tuboInferior2"
);

const puntajeTexto =
document.getElementById(
"puntaje"
);

/* ======================    =====
   VARIABLES DEL JUEGO
=========================== */

let y = 200;

let gravedad = 3;

let salto = 45;

let puntos = 0;

let juegoActivo = true;

/* dificultad */

let hueco = 150;

/* alturas permitidas */

let alturaMinima = 80;

let alturaMaxima = 220;

/* separación entre obstáculos */

let separacion = 500;

/* posiciones iniciales */

let tuboX1 =
window.innerWidth;

let tuboX2 =
window.innerWidth +
separacion;

/* ===========================
   GENERADOR DE TUBOS
=========================== */

function generarTubo(
tuboSuperior,
tuboInferior
){

let alturaSuperior =

Math.floor(

Math.random() *

(
alturaMaxima -
alturaMinima
)

)

+

alturaMinima;

let alturaInferior =

window.innerHeight

-

alturaSuperior

-

hueco;

/* evitar valores negativos */

if(
alturaInferior < 50
){

alturaInferior = 50;

}

tuboSuperior.style.height =

alturaSuperior + "px";

tuboInferior.style.height =

alturaInferior + "px";

}

/* generar tubos iniciales */

generarTubo(
tuboSup1,
tuboInf1
);

generarTubo(
tuboSup2,
tuboInf2
);

/* ===========================
   SALTO
=========================== */

function brincar(){

if(
juegoActivo
){

y -= salto;

}

}

/* ===========================
   TECLADO
=========================== */

document.addEventListener(

"keydown",

function(event){

if(
event.code ==
"Space"
){

brincar();

}

}

);

/* ===========================
   CLICK PARA MOVIL
=========================== */

document.addEventListener(

"click",

brincar

);

/* ===========================
   BUCLE PRINCIPAL
=========================== */

function actualizar(){

if(
!juegoActivo
){

return;

}

/* gravedad */

y += gravedad;

jugador.style.top =
y + "px";

/* mover tubos */

tuboX1 -= 5;

tuboX2 -= 5;

/* actualizar posición */

tuboSup1.style.left =
tuboX1 + "px";

tuboInf1.style.left =
tuboX1 + "px";

tuboSup2.style.left =
tuboX2 + "px";

tuboInf2.style.left =
tuboX2 + "px";

/* =======================
   REINICIO TUBO 1
======================= */

if(
tuboX1 < -100
){

tuboX1 =

tuboX2 +

separacion;

generarTubo(

tuboSup1,

tuboInf1

);

puntos++;

puntajeTexto.innerHTML =

"Puntos: " +

puntos;

}

/* =======================
   REINICIO TUBO 2
======================= */

if(
tuboX2 < -100
){

tuboX2 =

tuboX1 +

separacion;

generarTubo(

tuboSup2,

tuboInf2

);

puntos++;

puntajeTexto.innerHTML =

"Puntos: " +

puntos;

}

/* =======================
   COLISIÓN SUELO
======================= */

if(
y >
window.innerHeight - 60
){

finJuego();

}

/* =======================
   COLISIÓN TECHO
======================= */

if(
y < 0
){

finJuego();

}

/* =======================
   COLISIÓN TUBOS
======================= */

let jugadorRect =

jugador.getBoundingClientRect();

if(

intersecta(

jugadorRect,

tuboSup1.getBoundingClientRect()

)

||

intersecta(

jugadorRect,

tuboInf1.getBoundingClientRect()

)

||

intersecta(

jugadorRect,

tuboSup2.getBoundingClientRect()

)

||

intersecta(

jugadorRect,

tuboInf2.getBoundingClientRect()

)

){

finJuego();

}

}

/* ===========================
   DETECCIÓN DE COLISIÓN
=========================== */

function intersecta(
a,
b
){

return !(

a.right < b.left ||

a.left > b.right ||

a.bottom < b.top ||

a.top > b.bottom

);

}

/* ===========================
   FIN DEL JUEGO
=========================== */

function finJuego(){

juegoActivo = false;

alert(

"Juego terminado\nPuntos: "

+

puntos

);

location.reload();

}

/* ===========================
   VELOCIDAD DEL JUEGO
=========================== */

setInterval(

actualizar,

25

);