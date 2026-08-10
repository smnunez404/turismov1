import type { PreguntaRapida } from "./tipos";

// SPEC-19/20 — Banco SINTÉTICO de preguntas rápidas por categoría (6 por categoría).
const q = (
  id: string,
  categoriaId: string,
  enunciado: string,
  opciones: string[],
  correcta: number,
  retroalimentacion: string,
): PreguntaRapida => ({
  id,
  categoriaId,
  enunciado,
  opciones: opciones.map((texto, i) => ({ id: String.fromCharCode(97 + i), texto })),
  respuestaCorrectaId: String.fromCharCode(97 + correcta),
  retroalimentacion,
});

export const preguntasRapidas: PreguntaRapida[] = [
  // ---------- Historia ----------
  q("h1", "historia", "¿Quién fundó Santa Cruz de la Sierra?", ["Ñuflo de Chaves", "Pedro de Mendoza", "Andrés Manso", "Diego de Almagro"], 0, "Ñuflo de Chaves la fundó en 1561, lejos de donde está hoy."),
  q("h2", "historia", "¿Cuál fue el motivo principal del traslado de la ciudad?", ["Buscar agua y mejores tierras", "Una erupción volcánica", "Una orden del Papa", "Un terremoto"], 0, "Se movió hacia el río Piraí buscando agua y condiciones para crecer."),
  q("h3", "historia", "¿Qué se celebra el 24 de septiembre?", ["La efeméride departamental", "La fundación de Bolivia", "El día del Carnaval", "El día del maestro"], 0, "Es la efeméride de Santa Cruz, recordando el grito libertario de 1810."),
  q("h4", "historia", "¿Cómo se llamaba la región histórica que abarcaba el oriente?", ["Chiquitania", "Altiplano", "Yungas", "Chaco Central"], 0, "La Chiquitania fue clave en la historia misional del oriente."),
  q("h5", "historia", "Las misiones jesuíticas de Chiquitos son reconocidas por la UNESCO como…", ["Patrimonio de la Humanidad", "Reserva de la biósfera", "Sitio Ramsar", "Maravilla natural"], 0, "Son Patrimonio de la Humanidad desde 1990 por su arquitectura y música."),
  q("h6", "historia", "¿Qué río marcó el crecimiento urbano de la ciudad?", ["Piraí", "Beni", "Mamoré", "Desaguadero"], 0, "El Piraí acompaña el borde oeste de la ciudad."),
  // ---------- Naturaleza ----------
  q("n1", "naturaleza", "¿Cuál es el árbol emblemático cruceño?", ["Toborochi", "Quewiña", "Ceibo", "Algarrobo"], 0, "El toborochi, de tronco panzón, guarda una leyenda guaraní."),
  q("n2", "naturaleza", "El Parque Nacional Amboró destaca por…", ["Ser un cruce de tres ecosistemas", "Tener glaciares", "Ser un desierto salino", "Estar bajo el mar"], 0, "Amboró une Amazonía, Andes y Chaco: por eso su biodiversidad es enorme."),
  q("n3", "naturaleza", "¿Qué son las Lomas de Arena?", ["Dunas cerca de la ciudad", "Un cerro nevado", "Una laguna salada", "Un bosque de pinos"], 0, "Son dunas a pocos kilómetros del centro, ideales para el atardecer."),
  q("n4", "naturaleza", "¿Qué felino emblemático habita en la región?", ["Jaguar", "Puma andino", "Lince", "Leopardo de las nieves"], 0, "El jaguar (tigre americano) es símbolo de la fauna oriental."),
  q("n5", "naturaleza", "El Parque Nacional Noel Kempff Mercado está en…", ["El norte de Santa Cruz", "El altiplano paceño", "El valle cochabambino", "El sur de Tarija"], 0, "Está al norte del departamento, con las cataratas Arco Iris."),
  q("n6", "naturaleza", "¿Qué ave colorida es común en los parques cruceños?", ["Tucán", "Cóndor", "Pingüino", "Flamenco andino"], 0, "El tucán es fácil de reconocer por su pico enorme y colorido."),
  // ---------- Gastronomía ----------
  q("g1", "gastronomia", "¿Cuál es el desayuno cruceño más clásico?", ["Cuñapé con café", "Api con pastel", "Salteña de pollo con té", "Sopa de maní"], 0, "El cuñapé, de queso y almidón de yuca, es el clásico de la mañana."),
  q("g2", "gastronomia", "El majadito se prepara principalmente con…", ["Arroz y charque", "Papa y queso", "Fideo y carne molida", "Quinua y verduras"], 0, "Arroz, charque y plátano: el plato de casa por excelencia."),
  q("g3", "gastronomia", "¿Qué es el sonso?", ["Yuca con queso asada", "Un pan dulce", "Una sopa fría", "Un refresco de maíz"], 0, "Yuca molida con queso, asada al horno o a la parrilla."),
  q("g4", "gastronomia", "El horneado tradicional cruceño incluye…", ["Empanadas, cuñapés y masacos", "Sushi y ramen", "Tacos y arepas", "Pizza y focaccia"], 0, "El horneado es toda una vitrina: cuñapé, empanada de queso y más."),
  q("g5", "gastronomia", "¿Qué bebida refrescante se hace con arroz y canela?", ["Somó", "Chicha morada", "Mocochinchi", "Chufly"], 0, "El somó es la bebida fría que acompaña las tardes calurosas."),
  q("g6", "gastronomia", "El masaco se hace tradicionalmente con…", ["Plátano o yuca y charque", "Papa y huevo", "Arroz y leche", "Trigo y miel"], 0, "Se machaca en tacú: plátano o yuca con charque."),
  // ---------- Tradición y fiesta ----------
  q("t1", "tradicion", "El Carnaval cruceño elige cada año a…", ["La reina del Carnaval", "Un rey mago", "Un abanderado", "Un cacique"], 0, "La coronación de la reina abre oficialmente la temporada de comparsas."),
  q("t2", "tradicion", "¿Qué es una comparsa?", ["Un grupo que baila y organiza el Carnaval", "Un plato típico", "Un instrumento", "Un tipo de vivienda"], 0, "Las comparsas son grupos de amistades que participan todo el año."),
  q("t3", "tradicion", "El taquirari es…", ["Un ritmo tradicional del oriente", "Un baile andino", "Un tipo de tambor", "Una comida"], 0, "El taquirari es el ritmo que identifica la música cruceña."),
  q("t4", "tradicion", "El tipoy es…", ["Un vestido tradicional", "Un sombrero", "Una danza", "Un dulce"], 0, "Vestido largo y fresco, símbolo de la mujer camba."),
  q("t5", "tradicion", "El Festival de Música Barroca se realiza en…", ["Las misiones de Chiquitos", "El salar de Uyuni", "El lago Titicaca", "Los Yungas"], 0, "Cada dos años, las iglesias misionales se llenan de música barroca."),
  q("t6", "tradicion", "¿Qué instrumento acompaña casi siempre al taquirari?", ["Guitarra", "Charango andino", "Zampoña", "Bandoneón"], 0, "Guitarra y bombo marcan el ritmo de las fiestas cruceñas."),
  // ---------- Personajes ----------
  q("p1", "personajes", "Ñuflo de Chaves es recordado como…", ["El fundador de la ciudad", "Un músico barroco", "Un futbolista", "Un pintor"], 0, "Fundó Santa Cruz de la Sierra en 1561."),
  q("p2", "personajes", "Los Cambitas y Gladys Moreno son referentes de…", ["La música cruceña", "La gastronomía", "El deporte", "La política"], 0, "Gladys Moreno fue llamada 'la voz de Bolivia' por sus taquiraris."),
  q("p3", "personajes", "Un 'camba' es…", ["Alguien del oriente boliviano", "Un tipo de comida", "Un músico", "Un barrio"], 0, "Camba es la forma cariñosa de nombrar a la gente del oriente."),
  q("p4", "personajes", "Los pueblos chiquitanos destacan históricamente por…", ["Su música y talla en madera", "La pesca en altamar", "El tejido de alpaca", "La minería del estaño"], 0, "Las misiones formaron músicos y artesanos de renombre."),
  q("p5", "personajes", "El 'guardián' de los relatos de una comparsa suele llamarse…", ["Pasante", "Alcalde", "Cronista", "Regidor"], 0, "El pasante es quien apadrina y organiza la fiesta del año."),
  q("p6", "personajes", "La figura del 'anfitrión cruceño' se asocia a…", ["Recibir con calidez a quien llega", "Cobrar entradas", "Guiar en la montaña", "Vender artesanías"], 0, "La hospitalidad es parte de la identidad local."),
  // ---------- Santa Cruz hoy ----------
  q("y1", "hoy", "La ciudad crece organizada en…", ["Anillos concéntricos", "Cuadrículas numeradas", "Islas", "Terrazas"], 0, "Los anillos son la forma más fácil de ubicarse en la ciudad."),
  q("y2", "hoy", "La Feria Exposición (Expocruz) se realiza en…", ["Septiembre", "Enero", "Abril", "Julio"], 0, "Cada septiembre la ciudad recibe visitantes de todo el país."),
  q("y3", "hoy", "El Cristo Redentor cruceño está ubicado en…", ["El segundo anillo", "El Urubó", "Las Lomas de Arena", "Porongo"], 0, "Es el punto de encuentro más conocido de la avenida Monseñor Rivero."),
  q("y4", "hoy", "El Urubó se caracteriza por…", ["Vistas al río y zona residencial", "Ser un centro minero", "Tener nieve", "Ser una isla"], 0, "Al otro lado del Piraí, es una zona de miradores y restaurantes."),
  q("y5", "hoy", "El Parque Urbano Central sirve para…", ["Caminar, correr y eventos", "Estacionar buses", "Cultivar arroz", "Practicar esquí"], 0, "Es el pulmón verde en pleno centro de la ciudad."),
  q("y6", "hoy", "La avenida Monseñor Rivero es conocida por…", ["Cafés y vida nocturna", "Fábricas", "Puertos", "Minas"], 0, "Es el paseo gastronómico más popular del centro."),
];

export const preguntasDeCategoria = (categoriaId: string) =>
  preguntasRapidas.filter((p) => p.categoriaId === categoriaId);