import { SITE } from "@/lib/site";

export type BlogCategoryId = "ciudades" | "tips" | "costos" | "whatsapp";

export type BlogCategory = {
  id: BlogCategoryId;
  label: string;
  description: string;
};

export type BlogSection = {
  heading: string;
  body: string[];
  list?: string[];
  note?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: BlogCategoryId;
  city?: string;
  intent: string;
  date: string;
  updated: string;
  readTime: string;
  keywords: string[];
  heroStat: string;
  featured?: boolean;
  sections: BlogSection[];
  checklist?: string[];
};

export const blogCategories: BlogCategory[] = [
  {
    id: "ciudades",
    label: "Ciudades",
    description: "Guías locales para vender domicilios directos en mercados colombianos sin crear páginas vacías.",
  },
  {
    id: "tips",
    label: "Tips operativos",
    description: "Procesos, métricas y checklists para que el canal directo no dependa de improvisación.",
  },
  {
    id: "costos",
    label: "Costos y margen",
    description: "Números claros para entender comisiones, ticket promedio, recompra y rentabilidad.",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    description: "Flujos de bot, pagos, atención humana y seguimiento de pedidos por conversación.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "domicilios-por-whatsapp-medellin-restaurantes",
    title: "Domicilios por WhatsApp en Medellín: guía para restaurantes que quieren vender directo",
    description:
      "Cómo montar un canal de domicilios por WhatsApp en Medellín con menú, pagos, zonas, tiempos de cocina y recompra sin depender de comisiones por pedido.",
    excerpt:
      "Una guía local para restaurantes de Medellín que quieren vender directo por WhatsApp sin convertir el canal en una operación manual imposible de sostener.",
    category: "ciudades",
    city: "Medellín",
    intent: "Restaurantes en Medellín buscando vender domicilios por WhatsApp",
    date: "2026-07-03",
    updated: "2026-07-03",
    readTime: "7 min",
    featured: true,
    keywords: [
      "domicilios por WhatsApp Medellín",
      "restaurantes Medellín domicilios",
      "vender comida por WhatsApp",
      "delivery sin comisiones Medellín",
    ],
    heroStat: "Medellín compra rápido, pero repite donde le cumplen.",
    sections: [
      {
        heading: "Por qué Medellín necesita un canal directo, no solo más apps",
        body: [
          "En Medellín el cliente ya está acostumbrado a pedir comida por chat, comparar tiempos y pagar digitalmente. El problema para el restaurante no es la demanda: es que buena parte de esa demanda queda dentro de canales donde el margen, la información del cliente y la recompra no están bajo su control.",
          "Un canal directo por WhatsApp funciona cuando no es solamente un número recibiendo mensajes. Debe conectar menú, dirección, cobertura, pago, cocina, despacho y seguimiento. Si cualquiera de esas piezas queda manual, el cliente siente fricción y vuelve a la app que ya conoce.",
        ],
        list: [
          "Usa WhatsApp como entrada principal, pero lleva el carrito y el pago a una experiencia ordenada.",
          "Define zonas por barrio o radio real de entrega, no por promesas generales.",
          "Mide tiempos de cocina por hora pico para prometer una entrega que sí puedes cumplir.",
        ],
      },
      {
        heading: "Zonas y promesa de entrega: el SEO local también vive en la operación",
        body: [
          "Una página que dice 'domicilios en Medellín' no posiciona por arte de magia. La intención local se gana respondiendo preguntas reales: en qué zonas entregas, cuánto tarda, cómo paga el cliente, qué pasa si llueve y cómo se confirma el pedido.",
          "Para restaurantes en El Poblado, Laureles, Envigado, Belén o Robledo, la promesa debe ser específica. No todos los barrios tienen el mismo costo de domicilio ni el mismo tiempo de ruta. Cuando el contenido explica esa realidad, ayuda al cliente y también le da señales más claras a Google.",
        ],
        list: [
          "Publica zonas de cobertura reales y actualizadas.",
          "Incluye horarios de alta demanda y recomendaciones para pedir a tiempo.",
          "Evita duplicar la misma página para cada barrio si el contenido no cambia de verdad.",
        ],
      },
      {
        heading: "El flujo mínimo para no perder pedidos por chat",
        body: [
          "El cliente no debería tener que escribir cinco veces lo mismo. El flujo ideal pregunta lo necesario, crea el pedido y mantiene al usuario informado sin saturarlo. La conversación debe sentirse natural, pero el sistema por detrás debe ser estructurado.",
          "En la práctica, el canal directo necesita un bot para responder lo repetitivo y una salida humana para casos especiales. Ese equilibrio protege al equipo, reduce errores y mantiene la experiencia cercana.",
        ],
        list: [
          "Saludo y menú con categorías claras.",
          "Carrito editable con productos, adicionales y notas.",
          "Dirección, zona, costo de domicilio y tiempo estimado.",
          "Pago digital y confirmación automática del estado del pedido.",
          "Mensaje de recompra después de la entrega.",
        ],
      },
      {
        heading: "Qué medir desde la primera semana",
        body: [
          "El beneficio de vender directo no se mide solamente por pedidos recibidos. Se mide por margen recuperado, clientes identificados, tickets repetidos y velocidad del equipo. Si el restaurante no mide, termina copiando el caos de las apps en su propio WhatsApp.",
          "La primera semana debe servir para encontrar cuellos de botella: cuántos chats se convierten en pedido, qué productos se venden mejor por canal directo, qué horarios saturan cocina y qué clientes vuelven sin descuento.",
        ],
        list: [
          "Conversión de chat a pedido pagado.",
          "Ticket promedio por zona y por hora.",
          "Comisiones evitadas frente al canal intermediado.",
          "Tiempo desde pago hasta cocina y desde cocina hasta ruta.",
          "Clientes que vuelven en menos de 30 días.",
        ],
      },
    ],
    checklist: [
      "Publica un menú corto y comprensible antes de crecerlo.",
      "Configura mínimo tres zonas reales con costo y tiempo.",
      "Activa pagos digitales para no confirmar pedidos manualmente.",
      "Define cuándo el bot debe pasar a un humano.",
      "Mide recompra desde el primer mes.",
    ],
  },
  {
    slug: "como-vender-comida-por-whatsapp-sin-comisiones",
    title: "Cómo vender comida por WhatsApp sin comisiones: flujo completo para restaurantes",
    description:
      "Paso a paso para vender comida por WhatsApp sin comisión por pedido: bot, menú, carrito, pago, cocina, ruta y mensajes de recompra.",
    excerpt:
      "Vender por WhatsApp no es responder mensajes más rápido. Es diseñar un sistema completo para convertir conversaciones en pedidos pagados.",
    category: "whatsapp",
    intent: "Dueños buscando vender por WhatsApp sin comisión",
    date: "2026-07-03",
    updated: "2026-07-03",
    readTime: "8 min",
    featured: true,
    keywords: [
      "vender comida por WhatsApp",
      "WhatsApp para restaurantes",
      "pedidos por WhatsApp",
      "restaurantes sin comisiones",
    ],
    heroStat: "El chat vende cuando el pedido queda cerrado, pagado y visible para cocina.",
    sections: [
      {
        heading: "La diferencia entre atender por WhatsApp y vender por WhatsApp",
        body: [
          "Atender por WhatsApp es recibir mensajes y responderlos uno a uno. Vender por WhatsApp es convertir esa conversación en un flujo medible: menú, carrito, dirección, pago, cocina, despacho y recompra.",
          "El primer modelo depende de una persona pendiente del celular. El segundo puede crecer porque cada paso queda registrado y el equipo ve el pedido en una pantalla, no en capturas sueltas.",
        ],
        list: [
          "El cliente entra por un mensaje sencillo.",
          "El bot resuelve dudas frecuentes y guía el pedido.",
          "El pago confirma la orden antes de mover cocina.",
          "El tablero operativo evita que los pedidos se pierdan.",
        ],
      },
      {
        heading: "El flujo recomendado para restaurantes",
        body: [
          "El mejor flujo es corto, pero no incompleto. Pedir menos datos puede parecer más rápido, hasta que el domiciliario no encuentra la dirección o cocina prepara un producto sin notas importantes.",
          "La clave es pedir información una sola vez y reutilizarla. Si el cliente ya compró antes, el sistema debería reconocerlo, ofrecerle repetir su pedido o actualizar la dirección sin empezar de cero.",
        ],
        list: [
          "Inicio: saludo, horarios y menú.",
          "Selección: productos, cantidades, adicionales y notas.",
          "Entrega: dirección, zona, costo y tiempo estimado.",
          "Pago: link seguro y confirmación automática.",
          "Operación: kanban de cocina, empaque y ruta.",
          "Recompra: mensaje útil después de la entrega, no spam.",
        ],
      },
      {
        heading: "Cómo evitar que el bot dañe la experiencia",
        body: [
          "Un bot bueno no intenta sonar inteligente todo el tiempo. Su trabajo es quitar fricción: responder horarios, mostrar menú, tomar datos y avisar estados. Cuando el cliente pregunta algo sensible, el bot debe pasar a una persona.",
          "Los mejores flujos tienen reglas claras de transferencia humana. Por ejemplo: quejas, cambios después del pago, direcciones ambiguas, alergias, pedidos corporativos o clientes molestos.",
        ],
        list: [
          "Respuestas cortas y en español natural.",
          "Botones o enlaces cuando el cliente necesita decidir rápido.",
          "Historial visible para que el humano no pida todo de nuevo.",
          "Estados automáticos para que el cliente no pregunte '¿ya salió?'.",
        ],
      },
      {
        heading: "El canal directo también necesita marketing",
        body: [
          "Si el restaurante solo publica el número una vez, el canal directo no despega. Hay que moverlo en empaques, historias, QR en mesa, tarjetas de domicilio, Google Business Profile y mensajes de recompra.",
          "La promesa debe ser concreta: pedir directo puede dar mejor seguimiento, beneficios propios y comunicación más rápida. No se trata de pelear con las apps, sino de enseñarle al cliente cuándo conviene comprarle directo al restaurante.",
        ],
        list: [
          "QR en el empaque con beneficio para la segunda compra.",
          "Historias destacadas con 'Pide directo'.",
          "Mensaje postventa con cupón de recompra propio.",
          "Landing o blog explicando zonas, horarios y cómo pedir.",
        ],
      },
    ],
    checklist: [
      "Define el saludo y las preguntas mínimas del bot.",
      "Ten menú y precios actualizados antes de activar tráfico.",
      "Conecta pago digital para confirmar automáticamente.",
      "Entrena al equipo sobre cuándo intervenir.",
      "Mide chats, pedidos pagados y recompra semanalmente.",
    ],
  },
  {
    slug: "cuanto-cobran-las-apps-de-domicilios-a-restaurantes",
    title: "Cuánto cobran las apps de domicilios a restaurantes y cómo calcular el margen real",
    description:
      "Guía para calcular el impacto de las comisiones de delivery en restaurantes: ticket promedio, costos, promociones, margen y pedidos directos.",
    excerpt:
      "Una comisión no se entiende mirando solo el porcentaje. El margen real aparece cuando sumas descuentos, empaques, operación y recompra perdida.",
    category: "costos",
    intent: "Restaurantes comparando comisiones de apps de domicilios",
    date: "2026-07-03",
    updated: "2026-07-03",
    readTime: "7 min",
    featured: true,
    keywords: [
      "comisiones apps domicilios restaurantes",
      "cuanto cobran las apps de delivery",
      "margen restaurantes domicilios",
      "delivery sin comisiones",
    ],
    heroStat: "La comisión visible casi nunca es el costo completo del canal.",
    sections: [
      {
        heading: "Por qué el porcentaje de comisión no cuenta toda la historia",
        body: [
          "Muchos restaurantes miran la comisión del marketplace como si fuera el único costo. Pero un pedido intermediado también puede traer descuentos obligados, empaques adicionales, tiempos de espera, menor control del cliente y poca posibilidad de recompra directa.",
          "El cálculo correcto compara canal contra canal: cuánto entra, cuánto cuesta producir, cuánto cobra el intermediario y cuánto valor de cliente queda para el restaurante después de la venta.",
        ],
        list: [
          "Comisión o tarifa del canal.",
          "Promociones subsidiadas por el restaurante.",
          "Costo de empaque y ajustes para delivery.",
          "Costo de atención por reclamos o reenvíos.",
          "Pérdida de información del cliente y recompra.",
        ],
      },
      {
        heading: "Fórmula simple para calcular margen por pedido",
        body: [
          "No necesitas un modelo financiero complejo para empezar. Basta con separar ventas, costos variables y costo del canal. Lo importante es usar pesos reales, no intuición.",
          "Haz el cálculo por producto estrella y por ticket promedio. A veces un combo rentable en salón deja de serlo cuando entra una comisión alta, un descuento agresivo y el domicilio llega tarde.",
        ],
        list: [
          "Ingreso neto del pedido = venta bruta - descuentos - comisión del canal.",
          "Margen bruto = ingreso neto - costo de ingredientes - empaque.",
          "Margen operativo = margen bruto - costo de preparación, errores y soporte.",
          "Valor futuro = margen operativo + probabilidad de recompra directa.",
        ],
      },
      {
        heading: "Cuándo conviene mantener apps y cuándo empujar venta directa",
        body: [
          "Las apps pueden ayudar a descubrir una marca, llenar demanda en ciertos horarios o llegar a clientes que todavía no conocen el restaurante. El problema aparece cuando el negocio depende de ese canal para todos los pedidos.",
          "Una estrategia sana separa adquisición y recompra. Puedes usar canales externos para aparecer, pero deberías tener un canal directo para que el cliente vuelva sin volver a pagar una comisión por la misma relación.",
        ],
        list: [
          "Usa marketplaces para descubrimiento, no como único CRM.",
          "Promueve recompra directa en empaque y postventa.",
          "Lleva clientes frecuentes a WhatsApp con beneficios propios.",
          "Revisa productos que pierden margen al entrar por apps.",
        ],
      },
      {
        heading: "Qué métricas mirar cada semana",
        body: [
          "La meta no es apagar todos los canales externos de un día para otro. La meta es que el porcentaje de pedidos directos crezca sin sacrificar experiencia ni volumen.",
          "Cuando el restaurante mide por canal, puede decidir con calma: qué promociones mantener, qué productos publicar y cuánto vale recuperar un cliente frecuente.",
        ],
        list: [
          "Pedidos por canal.",
          "Margen promedio por canal.",
          "Costo de adquisición por cliente nuevo.",
          "Pedidos repetidos por cliente.",
          "Comisiones evitadas por venta directa.",
        ],
      },
    ],
    checklist: [
      "Calcula el margen de tus 10 productos más vendidos.",
      "Separa pedidos nuevos de clientes recurrentes.",
      "Mide comisiones evitadas mensualmente.",
      "Crea una oferta de recompra directa que no destruya margen.",
    ],
  },
  {
    slug: "bot-de-whatsapp-para-restaurantes-guia",
    title: "Bot de WhatsApp para restaurantes: qué debe responder y cuándo pasar a un humano",
    description:
      "Guía práctica para diseñar un bot de WhatsApp para restaurantes: menú, preguntas frecuentes, pagos, estados de pedido y escalamiento humano.",
    excerpt:
      "El bot ideal no reemplaza al equipo: lo protege de lo repetitivo y le avisa cuando una conversación necesita criterio humano.",
    category: "whatsapp",
    intent: "Restaurantes evaluando bot de WhatsApp",
    date: "2026-07-03",
    updated: "2026-07-03",
    readTime: "6 min",
    keywords: [
      "bot de WhatsApp para restaurantes",
      "automatizar pedidos WhatsApp",
      "chatbot restaurantes",
      "WhatsApp Business restaurantes",
    ],
    heroStat: "Un bot útil resuelve lo repetible y escala lo delicado.",
    sections: [
      {
        heading: "Qué debe automatizar un bot de restaurante",
        body: [
          "El bot debe encargarse de las preguntas repetidas que frenan al equipo: horario, menú, cobertura, medios de pago, estado del pedido y promociones vigentes. No necesita improvisar cada respuesta si el flujo está bien diseñado.",
          "La automatización más valiosa no es responder más mensajes, sino cerrar pedidos con menos errores. Para eso el bot debe capturar datos en formato útil para cocina y operación.",
        ],
        list: [
          "Mostrar menú y categorías.",
          "Tomar productos, adicionales y notas.",
          "Validar dirección y zona de entrega.",
          "Enviar link de pago.",
          "Confirmar estado: recibido, cocina, ruta y entregado.",
        ],
      },
      {
        heading: "Cuándo debe intervenir una persona",
        body: [
          "La peor experiencia es un bot insistiendo cuando el cliente necesita ayuda real. Por eso el restaurante debe definir reglas de escalamiento antes de activar el canal.",
          "Una conversación puede pasar a humano por palabras clave, por intención detectada o por estado del pedido. Lo importante es que el equipo vea el contexto completo para responder sin pedirle al cliente que repita todo.",
        ],
        list: [
          "Quejas o reclamos.",
          "Cambios después del pago.",
          "Alergias o restricciones críticas.",
          "Pedidos grandes o corporativos.",
          "Direcciones que el sistema no puede validar.",
        ],
      },
      {
        heading: "Cómo escribir mensajes que convierten",
        body: [
          "Los mensajes deben ser cortos, claros y orientados a la acción. En WhatsApp, una respuesta larga parece ruido. El bot debe dar una opción concreta y reducir decisiones innecesarias.",
          "También conviene mantener el tono de la marca. Un restaurante rápido puede sonar directo; uno premium puede sonar más cuidadoso. Lo que no cambia es la claridad.",
        ],
        list: [
          "Una pregunta por mensaje cuando se necesita dato exacto.",
          "Opciones visibles para evitar respuestas ambiguas.",
          "Confirmación final antes de pagar.",
          "Mensajes de estado que bajen ansiedad al cliente.",
        ],
      },
      {
        heading: "Errores frecuentes al lanzar un bot",
        body: [
          "El error más común es lanzar el bot sin una operación lista detrás. Si cocina no ve los pedidos, si el menú está desactualizado o si nadie revisa excepciones, el bot solo acelera el desorden.",
          "Otro error es intentar automatizar todo desde el primer día. Es mejor empezar con el flujo de pedido y luego sumar recompra, promociones, encuestas y segmentación.",
        ],
        list: [
          "No conectar el bot con un tablero de pedidos.",
          "No revisar horarios y productos agotados.",
          "No tener fallback humano.",
          "No medir tasa de conversión por conversación.",
        ],
      },
    ],
    checklist: [
      "Escribe un árbol de conversación antes de configurar herramientas.",
      "Define palabras que escalan a humano.",
      "Conecta cada pedido con cocina y empaque.",
      "Revisa conversaciones no resueltas cada semana.",
    ],
  },
  {
    slug: "como-reducir-comisiones-de-delivery-en-colombia",
    title: "Cómo reducir comisiones de delivery en Colombia sin perder pedidos",
    description:
      "Estrategia para restaurantes en Colombia que quieren reducir dependencia de apps de domicilios y aumentar pedidos directos por WhatsApp.",
    excerpt:
      "Bajar comisiones no significa desaparecer de todos los canales. Significa recuperar la relación con los clientes que ya te compran.",
    category: "costos",
    intent: "Restaurantes en Colombia buscando reducir comisiones de delivery",
    date: "2026-07-03",
    updated: "2026-07-03",
    readTime: "7 min",
    keywords: [
      "reducir comisiones delivery Colombia",
      "apps de domicilios Colombia restaurantes",
      "pedidos directos restaurantes Colombia",
      "delivery sin comisiones Colombia",
    ],
    heroStat: "La transición debe mover recompra, no apagar adquisición.",
    sections: [
      {
        heading: "Empieza separando adquisición de recompra",
        body: [
          "Un restaurante puede aceptar que ciertos canales sirven para descubrimiento, pero no debería pagar comisión indefinidamente por clientes que ya conocen la marca. Esa separación cambia la estrategia.",
          "La recompra directa se gana después de una buena experiencia: empaque, tiempos, estado del pedido, beneficio propio y una forma fácil de volver a pedir.",
        ],
        list: [
          "Identifica pedidos nuevos y recurrentes.",
          "Pon QR de pedido directo en empaques.",
          "Ofrece beneficios propios que no destruyan margen.",
          "Haz seguimiento por WhatsApp después de la entrega.",
        ],
      },
      {
        heading: "Construye una razón para pedir directo",
        body: [
          "El cliente no cambia de canal solo porque al restaurante le conviene. Cambia cuando el canal directo también le da valor: mejor seguimiento, promociones propias, atención más cercana o velocidad.",
          "La comunicación debe ser honesta. No prometas descuentos eternos si el objetivo es cuidar margen. A veces basta con una experiencia más clara y un beneficio pequeño para la siguiente compra.",
        ],
        list: [
          "Pedido directo con pago seguro.",
          "Estado del pedido por WhatsApp.",
          "Beneficio de recompra para clientes frecuentes.",
          "Menú actualizado y menos fricción que escribir todo a mano.",
        ],
      },
      {
        heading: "Haz el cambio por etapas",
        body: [
          "Mover clientes a un canal directo toma semanas, no una publicación. Empieza con clientes frecuentes, luego productos de alto margen y después campañas por zona u horario.",
          "El equipo debe saber explicar el canal directo en llamadas, empaques y mostrador. Si solo marketing lo entiende, la operación no lo sostiene.",
        ],
        list: [
          "Semana 1: activar WhatsApp, menú y pagos.",
          "Semana 2: QR en empaque y mensajes postventa.",
          "Semana 3: medir recompra directa.",
          "Semana 4: ajustar promociones y zonas.",
        ],
      },
      {
        heading: "No sacrifiques experiencia por ahorrar comisión",
        body: [
          "Si el canal directo es lento, confuso o manual, el cliente volverá a la app aunque el restaurante quiera evitar comisiones. La experiencia debe sentirse igual o mejor.",
          "Eso implica ordenar el back-office: cocina, empaque, rutas y cierre de caja. El ahorro se vuelve sostenible cuando el equipo opera con menos errores.",
        ],
        list: [
          "Pedidos visibles en un tablero.",
          "Notificaciones de estado automáticas.",
          "Roles claros para cocina y empaque.",
          "Métricas por canal para decidir sin intuición.",
        ],
      },
    ],
    checklist: [
      "Define el porcentaje objetivo de pedidos directos por mes.",
      "Crea una oferta de recompra para clientes actuales.",
      "Mide ahorro de comisiones, no solo volumen.",
      "Mantén la experiencia directa igual o mejor que la app.",
    ],
  },
  {
    slug: "checklist-para-lanzar-canal-directo-de-domicilios",
    title: "Checklist para lanzar un canal directo de domicilios en un restaurante",
    description:
      "Lista práctica para abrir canal directo de domicilios: WhatsApp, menú, pagos, zonas, cocina, datos, SEO local y métricas de lanzamiento.",
    excerpt:
      "Antes de publicar 'pide por WhatsApp', revisa estas piezas. Son las que separan un canal directo rentable de un chat saturado.",
    category: "tips",
    intent: "Restaurantes preparando su canal directo de domicilios",
    date: "2026-07-03",
    updated: "2026-07-03",
    readTime: "6 min",
    keywords: [
      "checklist canal directo domicilios",
      "abrir domicilios restaurante",
      "pedidos directos por WhatsApp",
      "lanzar delivery restaurante",
    ],
    heroStat: "Un buen lanzamiento evita que WhatsApp se convierta en otro cuello de botella.",
    sections: [
      {
        heading: "Antes de abrir el canal",
        body: [
          "La preparación inicial define si el canal directo crece o se desordena. Antes de anunciarlo, el restaurante debe tener claro qué vende, dónde entrega, cómo cobra y quién responde excepciones.",
          "No hace falta empezar con todo perfecto. Sí hace falta tener los mínimos operativos para no fallarle a los primeros clientes que prueban el canal.",
        ],
        list: [
          "Menú actualizado con fotos, precios y disponibilidad.",
          "Zonas de cobertura con costo y tiempo estimado.",
          "Medios de pago definidos.",
          "Roles internos para cocina, empaque y despacho.",
        ],
      },
      {
        heading: "Durante el lanzamiento",
        body: [
          "El lanzamiento debe concentrar tráfico en una promesa simple. Evita publicar diez beneficios a la vez. El cliente necesita entender cómo pedir y por qué le conviene hacerlo directo.",
          "Usa los puntos de contacto que ya tienes: empaque, mostrador, Instagram, Google Business Profile y clientes frecuentes.",
        ],
        list: [
          "QR visible en empaques y mesas.",
          "Historia destacada con el paso a paso.",
          "Mensaje de WhatsApp de bienvenida corto.",
          "Beneficio de segunda compra para clientes nuevos.",
        ],
      },
      {
        heading: "La primera semana de operación",
        body: [
          "La primera semana no es para crecer a toda velocidad. Es para encontrar fricción. Revisa conversaciones perdidas, direcciones confusas, productos agotados y tiempos reales.",
          "Haz ajustes pequeños todos los días. Un texto más claro, una categoría menos, una zona mejor definida o un mensaje de estado pueden mejorar la conversión rápido.",
        ],
        list: [
          "Cuántos chats entraron.",
          "Cuántos terminaron en pago.",
          "Cuáles preguntas se repitieron.",
          "Dónde se demoró cocina o ruta.",
          "Qué clientes volvieron a escribir.",
        ],
      },
      {
        heading: "SEO local y contenido útil",
        body: [
          "El blog y las páginas locales ayudan cuando responden dudas reales de clientes y dueños de restaurantes. No conviene crear muchas páginas iguales por ciudad o barrio: eso puede verse como contenido de baja utilidad.",
          "Empieza con guías profundas: cómo pedir directo, zonas de cobertura, horarios, costos de domicilio y beneficios del canal. Ese contenido ayuda a Google y también reduce preguntas repetidas.",
        ],
        list: [
          "Crea una guía local por ciudad solo si puedes hacerla realmente específica.",
          "Incluye preguntas frecuentes que el equipo recibe por WhatsApp.",
          "Actualiza fechas y datos cuando cambien horarios, zonas o precios.",
          "Conecta el contenido con una llamada clara a pre-registro o demo.",
        ],
      },
    ],
    checklist: [
      "Menú publicado y probado.",
      "Pago digital probado con un pedido real.",
      "Zonas configuradas.",
      "Equipo entrenado en estados del pedido.",
      "QR y enlace de WhatsApp listos.",
      "Métricas semanales definidas.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const sameCategory = blogPosts.filter((item) => item.slug !== post.slug && item.category === post.category);
  const otherPosts = blogPosts.filter((item) => item.slug !== post.slug && item.category !== post.category);

  return [...sameCategory, ...otherPosts].slice(0, limit);
}

export function getCategoryLabel(category: BlogCategoryId): string {
  return blogCategories.find((item) => item.id === category)?.label ?? category;
}

export function getBlogUrl(slug: string): string {
  return `${SITE.url}/blog/${slug}`;
}
