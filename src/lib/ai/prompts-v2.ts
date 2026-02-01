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
    "category": "Una de estas opciones: nootropicos, sueno, longevidad, nutricion, fitness",
    "faq": [
      {
        "question": "¿Pregunta frecuente relevante al tema?",
        "answer": "Respuesta detallada y completa (2-3 párrafos)"
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

  TONO: Científico, empoderador, directo, "tú" en lugar de "usted".
  IMPORTANTE: Responde ÚNICAMENTE con el JSON válido.
`
