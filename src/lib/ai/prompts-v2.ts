export const SINGLE_SHOT_BLOG_PROMPT = (topic: string, additionalPrompt?: string) => `
  Actúa como un experto en Biohacking, Longevidad y Optimización del Rendimiento Humano.
  Redacta un post completo para el blog "Biohacking Lab 3.0".
  
  TEMA: "${topic}"
  ${additionalPrompt ? `INSTRUCCIONES EXTRA: ${additionalPrompt}` : ""}

  Genera un objeto JSON con la siguiente estructura exacta:
  {
    "title": "Un título viral y optimizado SEO (max 60 chars)",
    "content": "El contenido completo del artículo en formato Markdown (usa H2, H3, **negritas para resaltar palabras clave**, listas). NO uses H1. Mínimo 1200 palabras.",
    "excerpt": "Un resumen atractivo de 140-160 caracteres.",
    "category": "Una de estas opciones EXACTAMENTE (no uses tildes ni mayúsculas): nootropicos, sueno, longevidad, nutricion, fitness, longevidad-femenina, biohacking-hogar",
    "tags": ["Etiqueta 1", "Etiqueta 2", "Etiqueta 3", "Etiqueta 4", "Etiqueta 5"],
    "faq": [
      {
        "question": "¿Pregunta frecuente relevante al tema?",
        "answer": "Respuesta detallada y completa (2-3 párrafos)"
      }
    ],
    "references": [
      {
        "title": "Título del estudio científico",
        "authors": "Apellido A, Apellido B, et al.",
        "journal": "Nombre de la revista científica",
        "year": 2023,
        "url": "https://pubmed.ncbi.nlm.nih.gov/...",
        "doi": "10.1234/ejemplo"
      }
    ]
  }

  ESTRUCTURA DEL CONTENIDO (Markdown):
  1. H2: Introducción (Pain Point + Solución prometida)
  2. H2: La Ciencia Detrás (Mecanismos biológicos explicados simple)
  3. H2: Protocolos Prácticos (Qué hacer, dosis, herramientas)
  4. H2: Biohack del Día (Tip rápido accionable)
  5. H2: Conclusión

  ESTRUCTURA FAQ:
  - Genera exactamente 5 preguntas frecuentes
  - Cada pregunta debe ser algo que la gente buscaría en Google
  - Las respuestas deben ser completas (150-200 palabras cada una)
  - Usa palabras clave long-tail para SEO
  - Formato de pregunta: "¿Cómo...", "¿Qué es...", "¿Por qué...", "¿Cuándo..."

  ETIQUETAS SEO (SISTEMA DE CLÚSTERES):
  - Genera un array "tags" con exactamente 5 etiquetas cortas (ej: "Luz Roja", "Ayuno de Dopamina", "Ritmo Circadiano").
  - Deben ser específicas del nicho abordado en este post, para poder conectarlas como Clústeres Semánticos.

  REFERENCIAS CIENTÍFICAS (OBLIGATORIO - SISTEMA CRÍTICO):
  - DEBES generar un array "references" con exactamente 3 a 5 estudios.
  - El sistema fallará si este campo no existe o está vacío.
  - Prioriza estudios de PubMed, Nature, Science, JAMA, The Lancet
  - Incluye DOI cuando sea posible
  - Las URLs deben ser a estudios reales (verifica que existan)
  - Cita estudios de los últimos 5 años preferentemente
  - Asegúrate de que las referencias respalden las afirmaciones del artículo

  TONO: Científico, empoderador, directo, "tú" en lugar de "usted".
  IMPORTANTE: Responde ÚNICAMENTE con el JSON válido.
`

export const SINGLE_SHOT_TAG_PROMPT = (topic: string, additionalPrompt?: string) => `
  Actúa como un experto en Biohacking, Longevidad y Optimización del Rendimiento Humano.
  Redacta un ensayo estructurado tipo "Hub SGO" o glosario experto sobre la etiqueta: "${topic}".
  ${additionalPrompt ? `INSTRUCCIONES EXTRA: ${additionalPrompt}` : ""}

  Genera un objeto JSON con la siguiente estructura exacta:
  {
    "content": "El contenido en formato Markdown (usa H2, H3, **negritas para enfatizar**). NO uses H1. Mínimo 500 palabras."
  }

  ESTRUCTURA DEL CONTENIDO (Markdown):
  1. H2: ¿Qué es ${topic}? (Definición clara y directa para SEO).
  2. H2: Mecanismo de Acción (Cómo funciona biológicamente de forma sencilla).
  3. H2: Beneficios Principales (Lista de viñetas).
  4. H2: Relación con el Biohacking / Longevidad.

  TONO: Científico, empoderador, enciclopédico pero fácil de leer (como una Wiki de nicho).
  IMPORTANTE: No saludes, no confirmes, responde ÚNICAMENTE con el objeto JSON válido.
`

export const SINGLE_SHOT_NEUROAUDIO_PROMPT = (topic: string, category: string, additionalPrompt?: string) => `
  Actúa como un experto en Neurociencia, Biohacking y Frecuencias Acústicas (Solfeggio, Binaural Beats, Ondas Cerebrales).
  Redacta la descripción científica y los beneficios de un track de audio para la plataforma "NeuroAudio" de Biohacking Lab 3.0.
  
  TEMA / ENFOQUE DEL AUDIO: "${topic}"
  CATEGORÍA ASIGNADA: "${category}"
  ${additionalPrompt ? 'INSTRUCCIONES EXTRA: ' + additionalPrompt : ""}

  Genera un objeto JSON con la siguiente estructura exacta:
  {
    "title": "Un título atractivo y misterioso/científico (max 60 chars)",
    "content": "El contenido en formato Markdown (usa H2, H3, **negritas para resaltar palabras clave como frecuencias, Hz, neurotransmisores, beneficios**). NO uses H1. NO lo hagas excesivamente largo, debe ser conciso, estructurado y enfocado a mantener la retención del usuario que lo va a escuchar.",
    "excerpt": "Un resumen atractivo de 140-160 caracteres sobre qué hace este audio a tu cerebro.",
    "tags": ["Frecuencia", "Beneficio Principal", "Estado Mental"]
  }

  ESTRUCTURA DEL CONTENIDO (Markdown):
  1. H2: ¿Qué le hace esta frecuencia a tu cerebro? (Explicación científica breve pero impactante).
  2. H2: Beneficios Comprobados (Lista de viñetas con **palabras clave** marcadas en negrita).
  3. H2: Protocolo de Escucha (Cuándo y cómo escucharlo: Ej. con audífonos, antes de dormir, trabajando).

  TONO: Muy científico pero accesible, directo, "tú" en lugar de "usted". Usa jerga de biohacking (optimización, down-regulation, up-regulation, neuroplasticidad).
  IMPORTANTE: Responde ÚNICAMENTE con el objeto JSON válido.
`
