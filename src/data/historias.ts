// Historias episódicas completas y detalladas de Santa Cruz para el Modo Historia / Descubrir
// Diseñadas para brindar una inmersión rica en patrimonio, orígenes, naturaleza e identidad cruceña.

export type CapituloHistoria = {
  misionId: string;
  tituloEpisodio: string;
  subtitulo: string;
  tiempoLectura: string;
  imagenHistoria: string;
  pieDeFoto: string;
  introduccion: string;
  parrafos: string[];
  datosCuriosos: { titulo: string; detalle: string }[];
  moralejaEmbajador: string;
};

export const historiasMisiones: Record<string, CapituloHistoria> = {
  m1: {
    misionId: "m1",
    tituloEpisodio: "Capítulo I · La Travesía y la Fundación en la Selva",
    subtitulo: "De Asunción a las faldas de la Chiquitania: el sueño de Ñuflo de Chaves",
    tiempoLectura: "3 min de lectura",
    imagenHistoria: "/camino/historia_m1.jpg",
    pieDeFoto: "26 de febrero de 1561: Capitán Ñuflo de Chaves funda Santa Cruz de la Sierra a orillas del arroyo Sutó.",
    introduccion:
      "Corría el siglo XVI cuando expedicionarios españoles e indígenas aliados se internaron por ríos y selvas desconocidas en busca del mítico Gran Paitití o 'El Dorado'. Al mando de esta colosal travesía estaba el capitán extremeño Ñuflo de Chaves.",
    parrafos: [
      "El 26 de febrero de 1561, a orillas del arroyo Sutó y muy cerca de lo que hoy conocemos como San José de Chiquitos, Ñuflo de Chaves clavó la cruz fundacional y bautizó la nueva urbe con el nombre de su pueblo natal en Extremadura: Santa Cruz de la Sierra. No fue una fundación común: nació como una avanzada fronteriza de hospitalidad y convivencia con los pueblos originarios de la Chiquitania.",
      "La ciudad original vivió años de intensos desafíos, sequías y traslados. Años más tarde, los pobladores migraron hacia Cotoca y finalmente se asentaron en su ubicación definitiva a orillas del río Piraí (Punta de San Bartolomé) en 1595, fusionándose con San Lorenzo Real de la Frontera.",
      "Aquí germinó la auténtica identidad 'camba': una simbiosis entre la cosmovisión guaraní y chiquitana con el espíritu explorador, dando lugar a una sociedad cálida, amante de la libertad y profundamente arraigada a su selva y sus costumbres.",
    ],
    datosCuriosos: [
      {
        titulo: "¿Por qué 'Santa Cruz de la Sierra' si hoy es llana?",
        detalle: "Porque la ciudad original fue fundada al pie de las serranías chiquitanas en San José, antes de trasladarse al valle llano del Piraí.",
      },
      {
        titulo: "El origen de la palabra 'Camba'",
        detalle: "Deriva de voces indígenas que aludían al habitante de las llanuras cálidas y a la hermandad entre pobladores de la selva.",
      },
      {
        titulo: "El héroe Cañoto",
        detalle: "José Manuel Baca 'Cañoto', guerrillero y cantor que con su guitarra y valentía inspiró las luchas por la independencia cruceña.",
      },
    ],
    moralejaEmbajador:
      "Un verdadero Embajador no solo sabe cuándo se fundó Santa Cruz, sino que honra el espíritu de hospitalidad y resiliencia que sus primeros exploradores forjaron en el corazón del continente.",
  },

  m2: {
    misionId: "m2",
    tituloEpisodio: "Capítulo II · El Casco Viejo y los Campanarios de San Lorenzo",
    subtitulo: "La Plaza 24 de Septiembre: epicentro de la vida social, cultural y cívica",
    tiempoLectura: "3 min de lectura",
    imagenHistoria: "/camino/historia_m2.jpg",
    pieDeFoto: "La Basílica Menor de San Lorenzo y la Plaza 24 de Septiembre rodeada de toborochis en flor.",
    introduccion:
      "Si las calles de Santa Cruz pudieran hablar, empezarían contando historias desde la sombra de los toborochis y palmeras de la Plaza 24 de Septiembre, testigo mudo de revoluciones, fiestas patronales y tertulias de café bajo los horcones coloniales.",
    parrafos: [
      "Diseñada bajo la clásica cuadrícula de damero hispano, la plaza principal cruceña ha sido el corazón palpitante del oriente boliviano. A su alrededor floreció la arquitectura de galerías techadas con horcones de madera labrada, pensadas sabiamente para resguardar a los peatones del intenso sol tropical y de las lluvias torrenciales del verano.",
      "Imponente frente a la plaza se erige la Basílica Menor de San Lorenzo, reconstruida en su majestuosa fábrica de ladrillo visto por el insigne arquitecto Felipe Bertrés a mediados del siglo XIX. Su torre mirador ofrece una panorámica única donde el casco antiguo se funde con los modernos rascacielos que hoy miran hacia el horizonte.",
      "En sus bancos de madera, generaciones de abuelos, poetas y jóvenes han compartido una taza de café con cuñapé caliente mientras escuchan el rumor de las campanas y las anécdotas de la revolución del 24 de Septiembre de 1810.",
    ],
    datosCuriosos: [
      {
        titulo: "El Museo de Arte Sacro",
        detalle: "Dentro de la Catedral se custodia una de las platerías coloniales y tallados jesuíticos más valiosos de Sudamérica.",
      },
      {
        titulo: "Los Horcones de Madera",
        detalle: "Estructuras de cuchi y tajibo que sostienen las galerías exteriores, icono indiscutible del urbanismo tradicional cruceño.",
      },
      {
        titulo: "El Reloj de la Torre",
        detalle: "Fabricado en Inglaterra y trasladado en carretas durante meses a través de la selva hasta llegar a Santa Cruz.",
      },
    ],
    moralejaEmbajador:
      "Caminar por el casco viejo es escuchar el eco de nuestras raíces. Cuidar su patrimonio arquitectónico es el deber cívico de todo cruceño.",
  },

  m3: {
    misionId: "m3",
    tituloEpisodio: "Capítulo III · Maravillas Naturales: Del Amboró a la Chiquitania",
    subtitulo: "Un territorio megadiverso donde los Andes abrazan a la Amazonía y al Chaco",
    tiempoLectura: "3 min de lectura",
    imagenHistoria: "/camino/historia_m3.jpg",
    pieDeFoto: "Farallones rojizos del Parque Nacional Amboró y la arquitectura viva de las Misiones Jesuíticas.",
    introduccion:
      "Santa Cruz posee una geografía prodigiosa y diversa. En cuestión de pocas horas de viaje, se puede pasar de dunas de arena brillante a bosques nublados de helechos gigantes o a templos barrocos de madera en medio de la Chiquitania.",
    parrafos: [
      "Al oeste se levanta el majestuoso Parque Nacional Amboró, un 'codo de los Andes' donde convergen tres ecosistemas: la cuenca amazónica, el bosque chaqueño y los valles interandinos. Con más de 800 especies de aves registradas, es uno de los santuarios biológicos más ricos y fascinantes del planeta Tierra.",
      "Hacia el este se extiende la Gran Chiquitania, hogar de las únicas Misiones Jesuíticas de Sudamérica que no quedaron en ruinas tras la expulsión de la orden en 1767. Gracias a la devoción y maestría de los indígenas chiquitanos, sus templos barrocos de madera tallada continúan intactos, albergando una tradición musical viva de partituras barrocas que asombran a orquestas del mundo entero.",
      "Más al sur, las Lomas de Arena ofrecen un paisaje desértico natural esculpido por los vientos 'surazos', rodeado de lagunas estacionales y sabanas que demuestran la inagotable variedad de esta tierra bendecida.",
    ],
    datosCuriosos: [
      {
        titulo: "Patrimonio Cultural de la Humanidad UNESCO",
        detalle: "Las iglesias de San Javier, Concepción, Santa Ana, San Rafael, San Miguel y San José fueron declaradas Patrimonio Mundial en 1990.",
      },
      {
        titulo: "El Archivo de Música de Chiquitos",
        detalle: "Conserva miles de partituras originales de música barroca compuestas en la selva en los siglos XVII y XVIII.",
      },
      {
        titulo: "El Guardián Alado: El Tucán Toco",
        detalle: "Habitante insignia de las copas de los árboles, esencial para la dispersión de semillas nativas en la región.",
      },
    ],
    moralejaEmbajador:
      "Conocer Santa Cruz es defender su biodiversidad, valorar a sus comunidades originarias y promover un turismo consciente y respetuoso.",
  },
};
