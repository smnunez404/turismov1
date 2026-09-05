// Historias episódicas estructuradas en Diapositivas / Pasos (Story Cards)
// Diseñadas para móviles: lectura paso a paso, con imagen temática por parte, sin scroll infinito.

export type DiapositivaHistoria = {
  parte: number;
  tituloParte: string;
  imagen: string;
  pieDeFoto: string;
  narrativa: string;
  datoClave?: { titulo: string; detalle: string };
};

export type CapituloHistoriaPasoAPaso = {
  misionId: string;
  tituloEpisodio: string;
  subtitulo: string;
  totalPartes: number;
  diapositivas: DiapositivaHistoria[];
  leccionFinal: string;
};

export const historiasPasoAPaso: Record<string, CapituloHistoriaPasoAPaso> = {
  m1: {
    misionId: "m1",
    tituloEpisodio: "Capítulo I · Los Orígenes",
    subtitulo: "La Travesía y la Fundación en la Selva",
    totalPartes: 3,
    leccionFinal:
      "Un verdadero Embajador no solo sabe cuándo se fundó Santa Cruz, sino que honra el espíritu de hospitalidad y valentía de quienes abrieron camino en la selva.",
    diapositivas: [
      {
        parte: 1,
        tituloParte: "1. La Gran Travesía en la Selva",
        imagen: "/camino/historia_m1_1.jpg",
        pieDeFoto: "Expedición de Ñuflo de Chaves y pueblos originarios aliados a través de los ríos amazónicos.",
        narrativa:
          "En el siglo XVI, el capitán extremeño Ñuflo de Chaves lideró una colosal expedición desde Asunción adentrándose por ríos bravos y selvas inexploradas. Su misión era encontrar el mítico Gran Paitití y forjar una nueva tierra de encuentro y hermandad en el corazón del continente.",
        datoClave: {
          titulo: "¿Sabías que...?",
          detalle:
            "La expedición recorrió miles de kilómetros conviviendo y aliándose con comunidades indígenas de la Chiquitania y el Chaco.",
        },
      },
      {
        parte: 2,
        tituloParte: "2. La Fundación en San José (1561)",
        imagen: "/camino/historia_m1_2.jpg",
        pieDeFoto: "26 de febrero de 1561: Fundación de Santa Cruz de la Sierra a orillas del arroyo Sutó.",
        narrativa:
          "El 26 de febrero de 1561, a orillas del arroyo Sutó y al pie de las serranías chiquitanas, Ñuflo de Chaves clavó la cruz fundacional y bautizó la nueva urbe como 'Santa Cruz de la Sierra', en honor a su pueblo natal en Extremadura. Nació así un hogar de libertad y hospitalidad.",
        datoClave: {
          titulo: "Curiosidad geográfica",
          detalle:
            "Lleva el nombre 'de la Sierra' porque su fundación original fue al pie de los cerros de San José de Chiquitos, antes de trasladarse a la llanura.",
        },
      },
      {
        parte: 3,
        tituloParte: "3. El Asentamiento Definitivo y la Identidad Camba",
        imagen: "/camino/historia_m1_3.jpg",
        pieDeFoto: "1595: Consolidación de la ciudad a orillas del río Piraí, cuna de las tradiciones cruceñas.",
        narrativa:
          "Tras sequías y dificultades, el pueblo cruzó valles hasta asentarse en 1595 en la Punta de San Bartolomé, a orillas del río Piraí. Aquí germinó la identidad 'camba': una unión de culturas amante de la vida al aire libre, alegre y hospitalaria, inmortalizada por héroes y cantores como Cañoto.",
        datoClave: {
          titulo: "El término 'Camba'",
          detalle:
            "Viene de voces indígenas que significan compañero y habitante de las llanuras cálidas de los llanos de Grigotá.",
        },
      },
    ],
  },

  m2: {
    misionId: "m2",
    tituloEpisodio: "Capítulo II · El Corazón de Santa Cruz",
    subtitulo: "El Casco Viejo y los Campanarios de San Lorenzo",
    totalPartes: 2,
    leccionFinal:
      "Caminar por el casco viejo es escuchar el eco de nuestras raíces. Cuidar su arquitectura colonial es el deber cívico de todo cruceño.",
    diapositivas: [
      {
        parte: 1,
        tituloParte: "1. El Damero y los Horcones Coloniales",
        imagen: "/camino/historia_m2.jpg",
        pieDeFoto: "Plaza 24 de Septiembre: centro histórico con galerías exteriores y flores de toborochi.",
        narrativa:
          "La Plaza Principal 24 de Septiembre fue trazada como centro cívico y de encuentro social. Sus casonas coloniales con amplias galerías y horcones de madera labrada fueron ideadas para proteger al caminante de las lluvias tropicales y del cálido sol de la tarde.",
        datoClave: {
          titulo: "Arquitectura inteligente",
          detalle:
            "Los horcones de cuchi y tajibo son troncos nativos ultra resistentes que han sostenido las aceras cruceñas por siglos.",
        },
      },
      {
        parte: 2,
        tituloParte: "2. La Basílica Menor y el Reloj Histórico",
        imagen: "/camino/historia_m2.jpg",
        pieDeFoto: "Catedral de San Lorenzo: monumento en ladrillo visto reconstruido por Felipe Bertrés.",
        narrativa:
          "Frente a la plaza se levanta la majestuosa Catedral de San Lorenzo, reconstruida en el siglo XIX. Su torre mirador custodia el histórico reloj traído en carretas desde Inglaterra y el Museo de Arte Sacro con piezas de plata y madera chiquitana de incalculable valor.",
        datoClave: {
          titulo: "El Museo Sacro",
          detalle:
            "Alberga custodias de plata y tallados misionales que representan la cumbre del arte barroco mestizo en Bolivia.",
        },
      },
    ],
  },

  m3: {
    misionId: "m3",
    tituloEpisodio: "Capítulo III · Explorador del Destino",
    subtitulo: "Maravillas Naturales: Del Amboró a la Chiquitania",
    totalPartes: 2,
    leccionFinal:
      "Conocer Santa Cruz es defender su biodiversidad, valorar sus misiones vivas y promover un turismo consciente y respetuoso.",
    diapositivas: [
      {
        parte: 1,
        tituloParte: "1. El Codo de los Andes: Parque Nacional Amboró",
        imagen: "/camino/historia_m3.jpg",
        pieDeFoto: "Farallones rojizos del Amboró donde convergen la Amazonía, los Andes y el Chaco.",
        narrativa:
          "El Parque Nacional Amboró es una joya ecológica mundial. Sus farallones rojizos y bosques nublados de helechos gigantes albergan más de 800 especies de aves, convirtiéndolo en un verdadero paraíso de biodiversidad y senderismo de aventura.",
        datoClave: {
          titulo: "Santuario de Aves",
          detalle:
            "Es uno de los lugares con mayor concentración de especies de fauna y orquídeas por kilómetro cuadrado en el mundo.",
        },
      },
      {
        parte: 2,
        tituloParte: "2. Misiones Jesuíticas: Patrimonio Vivo de la Humanidad",
        imagen: "/camino/historia_m3.jpg",
        pieDeFoto: "Templos barrocos de madera tallada en la Chiquitania, declarados Patrimonio Mundial por UNESCO.",
        narrativa:
          "En la Chiquitania se conservan las únicas misiones jesuíticas intactas de América. Sus templos de madera no son ruinas sino centros de fe y cultura viva, donde jóvenes orquestas continúan interpretando partituras barrocas compuestas en la selva en el siglo XVII.",
        datoClave: {
          titulo: "Patrimonio UNESCO",
          detalle:
            "San Javier, Concepción, Santa Ana, San Rafael, San Miguel y San José son reconocidas mundialmente por su arquitectura y música barroca viva.",
        },
      },
    ],
  },
};
