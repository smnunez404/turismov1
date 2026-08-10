import type { Pregunta } from "./tipos";

// Contenido SINTÉTICO de muestra — SPEC-10 / docs/08-contenido-muestra.md
// Cada misión (m1..m4) tiene 8 preguntas y cubre las variantes de interacción.
export const preguntas: Pregunta[] = [
  // ---------- Misión 1: Los Orígenes ----------
  {
    id: "m1p1",
    misionId: "m1",
    tipo: "multiple",
    enunciado: "¿En qué año fue fundada Santa Cruz de la Sierra?",
    opciones: [
      { id: "a", texto: "1561" },
      { id: "b", texto: "1548" },
      { id: "c", texto: "1610" },
      { id: "d", texto: "1492" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "Fue fundada en 1561 por Ñuflo de Chaves, primero a más de 200 km de donde está hoy.",
    puntaje: 10,
  },
  {
    id: "m1p2",
    misionId: "m1",
    tipo: "verdadero-falso",
    enunciado: "La ciudad fue trasladada de su ubicación original.",
    opciones: [
      { id: "v", texto: "Verdadero" },
      { id: "f", texto: "Falso" },
    ],
    respuestaCorrectaId: "v",
    retroalimentacion:
      "Sí: la ciudad se movió hacia el río Piraí buscando mejores condiciones para vivir.",
    puntaje: 10,
  },
  {
    id: "m1p3",
    misionId: "m1",
    tipo: "multiple",
    enunciado: "¿Cómo se llama al gentilicio popular del cruceño del oriente?",
    opciones: [
      { id: "a", texto: "Camba" },
      { id: "b", texto: "Colla" },
      { id: "c", texto: "Chapaco" },
      { id: "d", texto: "Valluno" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "Camba es la forma cariñosa y orgullosa de nombrar a la gente del oriente boliviano.",
    puntaje: 10,
  },
  {
    id: "m1p4",
    misionId: "m1",
    tipo: "imagen",
    enunciado: "¿Cuál de estos símbolos representa al árbol emblema de Santa Cruz?",
    opciones: [
      { id: "a", texto: "🌵 Cactus" },
      { id: "b", texto: "🌳 Toborochi" },
      { id: "c", texto: "🌴 Palmera datilera" },
      { id: "d", texto: "🍁 Arce" },
    ],
    respuestaCorrectaId: "b",
    retroalimentacion:
      "El toborochi, con su tronco panzón, es el árbol más identificado con la identidad cruceña.",
    puntaje: 10,
  },
  {
    id: "m1p5",
    misionId: "m1",
    tipo: "multiple",
    enunciado: "Cañoto es recordado principalmente por…",
    opciones: [
      { id: "a", texto: "Su guitarra y su valentía en la guerra de la independencia" },
      { id: "b", texto: "Fundar la primera universidad" },
      { id: "c", texto: "Diseñar la Catedral" },
      { id: "d", texto: "Escribir el himno nacional" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "El Cañoto es el guerrillero-músico que animaba a las tropas con su guitarra. Hoy da nombre a una plaza.",
    puntaje: 10,
  },
  {
    id: "m1p6",
    misionId: "m1",
    tipo: "verdadero-falso",
    enunciado: "El 24 de septiembre se recuerda la gesta libertaria cruceña de 1810.",
    opciones: [
      { id: "v", texto: "Verdadero" },
      { id: "f", texto: "Falso" },
    ],
    respuestaCorrectaId: "v",
    retroalimentacion:
      "Es la fecha más importante del calendario cruceño: la plaza principal lleva su nombre.",
    puntaje: 10,
  },
  {
    id: "m1p7",
    misionId: "m1",
    tipo: "caso",
    enunciado:
      "Un turista te pregunta por qué a Santa Cruz le dicen 'la ciudad de los anillos'. ¿Qué le respondés?",
    opciones: [
      { id: "a", texto: "Porque la ciudad crece en avenidas circulares concéntricas" },
      { id: "b", texto: "Por una leyenda sobre joyas coloniales" },
      { id: "c", texto: "Porque hay muchas joyerías en el centro" },
      { id: "d", texto: "Por la forma del escudo departamental" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "Los 'anillos' son avenidas en anillos concéntricos alrededor del casco viejo: así se ordena la ciudad.",
    puntaje: 10,
  },
  {
    id: "m1p8",
    misionId: "m1",
    tipo: "multiple",
    enunciado: "El río que marca el límite oeste tradicional de la ciudad es…",
    opciones: [
      { id: "a", texto: "El Piraí" },
      { id: "b", texto: "El Mamoré" },
      { id: "c", texto: "El Ichilo" },
      { id: "d", texto: "El Grande" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "El Piraí acompaña a la ciudad desde su traslado y hoy es paseo de fin de semana.",
    puntaje: 10,
  },

  // ---------- Misión 2: El Corazón de Santa Cruz ----------
  {
    id: "m2p1",
    misionId: "m2",
    tipo: "multiple",
    enunciado: "¿Cómo se llama la plaza principal de la ciudad?",
    opciones: [
      { id: "a", texto: "Plaza 24 de Septiembre" },
      { id: "b", texto: "Plaza Murillo" },
      { id: "c", texto: "Plaza del Estudiante" },
      { id: "d", texto: "Plaza Cañoto" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "Lleva el nombre de la fecha libertaria de 1810 y es el punto cero de la ciudad.",
    puntaje: 10,
  },
  {
    id: "m2p2",
    misionId: "m2",
    tipo: "imagen",
    enunciado: "¿Qué animalito es famoso por vivir en los árboles de la plaza principal?",
    opciones: [
      { id: "a", texto: "🦥 Perezoso" },
      { id: "b", texto: "🐒 Mono araña" },
      { id: "c", texto: "🦩 Flamenco" },
      { id: "d", texto: "🐢 Tortuga" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "Los perezosos de la Plaza 24 de Septiembre son una postal viva del centro cruceño.",
    puntaje: 10,
  },
  {
    id: "m2p3",
    misionId: "m2",
    tipo: "verdadero-falso",
    enunciado: "La Catedral Basílica de San Lorenzo mira hacia la plaza principal.",
    opciones: [
      { id: "v", texto: "Verdadero" },
      { id: "f", texto: "Falso" },
    ],
    respuestaCorrectaId: "v",
    retroalimentacion:
      "Está en el costado este de la plaza y su campanario ofrece una vista del casco viejo.",
    puntaje: 10,
  },
  {
    id: "m2p4",
    misionId: "m2",
    tipo: "multiple",
    enunciado: "Los corredores con columnas típicos del casco viejo se llaman…",
    opciones: [
      { id: "a", texto: "Galerías" },
      { id: "b", texto: "Portales" },
      { id: "c", texto: "Balcones" },
      { id: "d", texto: "Atrios" },
    ],
    respuestaCorrectaId: "b",
    retroalimentacion:
      "Los portales protegen del sol y de la lluvia: arquitectura pensada para el clima cruceño.",
    puntaje: 10,
  },
  {
    id: "m2p5",
    misionId: "m2",
    tipo: "caso",
    enunciado:
      "Tenés dos horas con un visitante en el centro. ¿Cuál es el recorrido más representativo?",
    opciones: [
      {
        id: "a",
        texto: "Plaza 24 de Septiembre, Catedral, Manzana Uno y calles del casco viejo",
      },
      { id: "b", texto: "Un centro comercial del cuarto anillo" },
      { id: "c", texto: "Solo la terminal de buses" },
      { id: "d", texto: "El aeropuerto y volver" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "El casco viejo concentra historia, arte y vida cotidiana: es el mejor primer contacto con la ciudad.",
    puntaje: 10,
  },
  {
    id: "m2p6",
    misionId: "m2",
    tipo: "multiple",
    enunciado: "La Manzana Uno, junto a la plaza, es hoy un espacio de…",
    opciones: [
      { id: "a", texto: "Arte y exposiciones" },
      { id: "b", texto: "Oficinas bancarias" },
      { id: "c", texto: "Mercado de abasto" },
      { id: "d", texto: "Estacionamiento municipal" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "Es un espacio cultural con muestras que cambian: siempre vale la pena asomarse.",
    puntaje: 10,
  },
  {
    id: "m2p7",
    misionId: "m2",
    tipo: "verdadero-falso",
    enunciado: "El primer anillo rodea justamente al casco viejo.",
    opciones: [
      { id: "v", texto: "Verdadero" },
      { id: "f", texto: "Falso" },
    ],
    respuestaCorrectaId: "v",
    retroalimentacion:
      "Todo lo que está dentro del primer anillo es el centro histórico de la ciudad.",
    puntaje: 10,
  },
  {
    id: "m2p8",
    misionId: "m2",
    tipo: "multiple",
    enunciado: "Un buen dato para contar del casco viejo es que…",
    opciones: [
      { id: "a", texto: "Conserva casas con portales y patios interiores" },
      { id: "b", texto: "Fue construido en el siglo XXI" },
      { id: "c", texto: "No tiene edificios patrimoniales" },
      { id: "d", texto: "Está deshabitado" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "Las casas de patio y portal son la huella arquitectónica más reconocible del centro.",
    puntaje: 10,
  },

  // ---------- Misión 3: Explorador del Destino ----------
  {
    id: "m3p1",
    misionId: "m3",
    tipo: "multiple",
    enunciado: "¿Cuál es el parque nacional más cercano a la ciudad?",
    opciones: [
      { id: "a", texto: "Amboró" },
      { id: "b", texto: "Madidi" },
      { id: "c", texto: "Sajama" },
      { id: "d", texto: "Torotoro" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "El Amboró está en el 'codo de los Andes': junta Amazonía, Yungas y Chaco en un solo lugar.",
    puntaje: 10,
  },
  {
    id: "m3p2",
    misionId: "m3",
    tipo: "imagen",
    enunciado: "¿Qué paisaje corresponde a las Lomas de Arena?",
    opciones: [
      { id: "a", texto: "🏜️ Dunas de arena con lagunas" },
      { id: "b", texto: "🏔️ Nevados de alta montaña" },
      { id: "c", texto: "🧊 Salar blanco infinito" },
      { id: "d", texto: "🌊 Playa de mar" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "Dunas a 15 km de la ciudad: un desierto pequeño rodeado de vegetación tropical.",
    puntaje: 10,
  },
  {
    id: "m3p3",
    misionId: "m3",
    tipo: "multiple",
    enunciado: "Las Misiones Jesuíticas de Chiquitos son…",
    opciones: [
      { id: "a", texto: "Patrimonio de la Humanidad de la UNESCO" },
      { id: "b", texto: "Un parque de diversiones" },
      { id: "c", texto: "Ruinas incaicas" },
      { id: "d", texto: "Un barrio de la ciudad" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "Declaradas Patrimonio en 1990, siguen vivas: se habitan, se restauran y suenan con música barroca.",
    puntaje: 10,
  },
  {
    id: "m3p4",
    misionId: "m3",
    tipo: "verdadero-falso",
    enunciado: "Samaipata está a unas tres horas de la ciudad y tiene un sitio arqueológico.",
    opciones: [
      { id: "v", texto: "Verdadero" },
      { id: "f", texto: "Falso" },
    ],
    respuestaCorrectaId: "v",
    retroalimentacion:
      "El Fuerte de Samaipata, roca tallada precolombina, también es Patrimonio de la Humanidad.",
    puntaje: 10,
  },
  {
    id: "m3p5",
    misionId: "m3",
    tipo: "multiple",
    enunciado: "El Festival Internacional de Música Renacentista y Barroca se celebra en…",
    opciones: [
      { id: "a", texto: "Los pueblos de la Chiquitania" },
      { id: "b", texto: "El altiplano" },
      { id: "c", texto: "El lago Titicaca" },
      { id: "d", texto: "Los valles cochabambinos" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "Cada dos años las iglesias misionales se llenan de música: uno de los eventos culturales más fuertes del país.",
    puntaje: 10,
  },
  {
    id: "m3p6",
    misionId: "m3",
    tipo: "caso",
    enunciado:
      "Un visitante tiene un solo día libre y quiere naturaleza sin viajar lejos. ¿Qué le recomendás?",
    opciones: [
      { id: "a", texto: "Lomas de Arena o el Jardín Botánico" },
      { id: "b", texto: "Viajar a San José de Chiquitos ida y vuelta" },
      { id: "c", texto: "Ir hasta el salar de Uyuni" },
      { id: "d", texto: "Quedarse en el hotel" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "Ambos están a menos de una hora: naturaleza real sin necesidad de planificar un viaje largo.",
    puntaje: 10,
  },
  {
    id: "m3p7",
    misionId: "m3",
    tipo: "multiple",
    enunciado: "El Biocentro Güembé es conocido por…",
    opciones: [
      { id: "a", texto: "Su mariposario y lagunas" },
      { id: "b", texto: "Ser un museo de historia" },
      { id: "c", texto: "Un observatorio astronómico" },
      { id: "d", texto: "Un estadio deportivo" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "Mariposario, orquideario y lagunas: un clásico para recibir visitas con poco tiempo.",
    puntaje: 10,
  },
  {
    id: "m3p8",
    misionId: "m3",
    tipo: "verdadero-falso",
    enunciado: "Santa Cruz es el departamento más extenso de Bolivia.",
    opciones: [
      { id: "v", texto: "Verdadero" },
      { id: "f", texto: "Falso" },
    ],
    respuestaCorrectaId: "v",
    retroalimentacion:
      "Con más de 370.000 km², Santa Cruz es el departamento más grande del país.",
    puntaje: 10,
  },

  // ---------- Misión 4: Soy un Buen Anfitrión ----------
  {
    id: "m4p1",
    misionId: "m4",
    tipo: "caso",
    enunciado:
      "Alguien te pregunta por una dirección que no conocés bien. ¿Cuál es la mejor respuesta?",
    opciones: [
      { id: "a", texto: "Decirle que no estás seguro y ayudarle a confirmarla" },
      { id: "b", texto: "Inventar una indicación para no quedar mal" },
      { id: "c", texto: "Ignorar la pregunta" },
      { id: "d", texto: "Decirle que use su celular y seguir de largo" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "La honestidad amable deja mejor recuerdo que una indicación equivocada.",
    puntaje: 10,
  },
  {
    id: "m4p2",
    misionId: "m4",
    tipo: "multiple",
    enunciado: "Un turista quiere probar un plato típico cruceño. ¿Qué le sugerís?",
    opciones: [
      { id: "a", texto: "Majadito o sonso" },
      { id: "b", texto: "Sopa de maní paceña" },
      { id: "c", texto: "Silpancho cochabambino" },
      { id: "d", texto: "Pique macho de La Paz" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "Majadito, sonso, cuñapé y masaco: la mesa cruceña se explica sola.",
    puntaje: 10,
  },
  {
    id: "m4p3",
    misionId: "m4",
    tipo: "verdadero-falso",
    enunciado: "Recomendar horarios por el calor es parte de ser buen anfitrión.",
    opciones: [
      { id: "v", texto: "Verdadero" },
      { id: "f", texto: "Falso" },
    ],
    respuestaCorrectaId: "v",
    retroalimentacion:
      "Avisar que conviene caminar temprano o al atardecer evita que la visita la pase mal.",
    puntaje: 10,
  },
  {
    id: "m4p4",
    misionId: "m4",
    tipo: "imagen",
    enunciado: "¿Qué llevarías siempre a un paseo con visitantes en Santa Cruz?",
    opciones: [
      { id: "a", texto: "💧 Agua y protector solar" },
      { id: "b", texto: "🧤 Guantes de nieve" },
      { id: "c", texto: "⛷️ Esquís" },
      { id: "d", texto: "🧣 Bufanda gruesa" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "Calor y humedad: hidratarse y cubrirse del sol es el consejo número uno.",
    puntaje: 10,
  },
  {
    id: "m4p5",
    misionId: "m4",
    tipo: "caso",
    enunciado:
      "Una familia con niños te pide una recomendación de tarde. ¿Qué proponés?",
    opciones: [
      { id: "a", texto: "El Jardín Botánico o el Güembé" },
      { id: "b", texto: "Una discoteca" },
      { id: "c", texto: "Una reunión de negocios" },
      { id: "d", texto: "Un recorrido por oficinas públicas" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "Leer a quién tenés adelante es la mitad del trabajo de un buen anfitrión.",
    puntaje: 10,
  },
  {
    id: "m4p6",
    misionId: "m4",
    tipo: "multiple",
    enunciado: "Si te preguntan '¿qué es un cuñapé?', la mejor respuesta es…",
    opciones: [
      { id: "a", texto: "Un panecillo de queso y almidón de yuca" },
      { id: "b", texto: "Una bebida caliente" },
      { id: "c", texto: "Un baile tradicional" },
      { id: "d", texto: "Un tipo de sombrero" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "Cuñapé: queso, almidón de yuca y horno. Explicarlo bien ya es promoción del destino.",
    puntaje: 10,
  },
  {
    id: "m4p7",
    misionId: "m4",
    tipo: "verdadero-falso",
    enunciado: "Hablar mal de la ciudad frente a un visitante también comunica.",
    opciones: [
      { id: "v", texto: "Verdadero" },
      { id: "f", texto: "Falso" },
    ],
    respuestaCorrectaId: "v",
    retroalimentacion:
      "Lo que decimos de nuestra ciudad forma la primera impresión de quien la visita.",
    puntaje: 10,
  },
  {
    id: "m4p8",
    misionId: "m4",
    tipo: "multiple",
    enunciado: "La actitud que mejor define a un embajador es…",
    opciones: [
      { id: "a", texto: "Curiosidad y ganas de contar lo propio" },
      { id: "b", texto: "Saberse todos los datos de memoria" },
      { id: "c", texto: "Hablar solo cuando le preguntan" },
      { id: "d", texto: "Trabajar en turismo" },
    ],
    respuestaCorrectaId: "a",
    retroalimentacion:
      "No hace falta ser guía: alcanza con conocer, cuidar y contar con orgullo.",
    puntaje: 10,
  },

  // ---------- Misión 5: reto presencial (SPEC-13, se construye en Sprint 3) ----------
  {
    id: "m5p1",
    misionId: "m5",
    tipo: "reto",
    enunciado:
      "Visitá un lugar emblemático de Santa Cruz, tomá una foto y contá tu experiencia.",
    opciones: [],
    respuestaCorrectaId: "",
    retroalimentacion:
      "El reto se completa en el mundo real: es la misión final de la temporada.",
    puntaje: 50,
  },
];

export const preguntasDeMision = (misionId: string) =>
  preguntas.filter((p) => p.misionId === misionId);
